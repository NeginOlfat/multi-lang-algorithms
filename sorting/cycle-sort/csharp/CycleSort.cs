using System;

/**
 * Sorts an array using Cycle Sort.
 */
public class CycleSort
{
    /**
     * Sorts an array using Cycle Sort.
     *
     * @param arr The array to be sorted (modified in-place).
     * @return    Number of writes performed (for analysis).
     *
     * Time Complexity: O(n²) — due to nested loops
     * Space Complexity: O(1)
     *
     * ✅ Minimizes memory writes — ideal for flash/EPPROM
     * ✅ Each element written at most once to final position
     * ❌ Not stable
     */
    public static int CycleSortArray(int[] arr)
    {
        if (arr == null || arr.Length <= 1)
            return 0;

        int writes = 0;
        int n = arr.Length;

        // Traverse the array and cycle-sort each element
        for (int cycleStart = 0; cycleStart < n - 1; cycleStart++)
        {
            int item = arr[cycleStart];
            int pos = cycleStart;

            // Step 1: Count how many elements are smaller than `item`
            for (int i = cycleStart + 1; i < n; i++)
            {
                if (arr[i] < item)
                {
                    pos++;
                }
            }

            // If item is already in correct position, skip
            if (pos == cycleStart)
                continue;

            // Skip duplicates: elements equal to `item` that are already placed
            while (pos < n && arr[pos] == item)
            {
                pos++;
            }

            // Place `item` in its correct position
            if (pos < n)
            {
                (arr[pos], item) = (item, arr[pos]); // Swap
                writes++;
            }

            // Step 2: Complete the cycle
            // Continue until we return to the starting position
            while (pos != cycleStart)
            {
                pos = cycleStart;

                // Recalculate correct position for current `item`
                for (int i = cycleStart + 1; i < n; i++)
                {
                    if (arr[i] < item)
                    {
                        pos++;
                    }
                }

                // Skip duplicates
                while (pos < n && arr[pos] == item)
                {
                    pos++;
                }

                // Place `item` in its correct position
                if (pos < n)
                {
                    (arr[pos], item) = (item, arr[pos]); // Swap
                    writes++;
                }
            }
        }

        return writes;
    }

    /**
     * Returns a new sorted array (non-mutating).
     *
     * @param arr The input array.
     * @return    A new sorted array.
     */
    public static int[] CycleSortStable(int[] arr)
    {
        if (arr == null) return null;
        int[] sorted = (int[])arr.Clone();
        CycleSortArray(sorted);
        return sorted;
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {3, 2, 1, 4};

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        int[] sorted = CycleSortStable(numbers);
        Console.WriteLine("Sorted Array: [" + string.Join(", ", sorted) + "]");

        // Test with duplicates
        int[] withDuplicates = {4, 2, 1, 2, 3};
        Console.WriteLine("\nWith Duplicates - Original: [" + string.Join(", ", withDuplicates) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", CycleSortStable(withDuplicates)) + "]");

        // Test with already sorted
        int[] alreadySorted = {1, 2, 3, 4, 5};
        Console.WriteLine("\nAlready Sorted - Original: [" + string.Join(", ", alreadySorted) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", CycleSortStable(alreadySorted)) + "]");

        // Test with reverse order
        int[] reverse = {5, 4, 3, 2, 1};
        Console.WriteLine("\nReverse - Original: [" + string.Join(", ", reverse) + "]");
        int[] sortedReverse = (int[])reverse.Clone();
        int writeCount = CycleSortArray(sortedReverse);
        Console.WriteLine("Sorted: [" + string.Join(", ", sortedReverse) + "]");
        Console.WriteLine("Writes performed: " + writeCount);

        // Test with single element
        int[] single = {42};
        Console.WriteLine("\nSingle Element: [" + string.Join(", ", CycleSortStable(single)) + "]");

        // Test with empty array
        int[] empty = {};
        Console.WriteLine("Empty Array: [" + string.Join(", ", CycleSortStable(empty)) + "]");
    }
}