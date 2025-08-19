using System;

/**
 * Sorts an array using Comb Sort.
 */
public class CombSort
{
    /**
     * Sorts an array using Comb Sort.
     *
     * @param arr The array to be sorted (modified in-place).
     * @return    The sorted array (for chaining).
     *
     * Time Complexity:
     * - Best/Average: O(n log n) with shrink factor 1.3
     * - Worst: O(n²)
     *
     * Space Complexity: O(1) — in-place sorting
     *
     * ✅ Improves Bubble Sort by eliminating "turtles" (small values near the end)
     * ✅ Uses shrink factor of 1.3 (empirically optimal)
     * ❌ Not stable
     */
    public static int[] CombSortArray(int[] arr)
    {
        // Handle edge cases
        if (arr == null || arr.Length <= 1)
            return arr;

        int n = arr.Length;
        int gap = n;
        const double SHRINK_FACTOR = 1.3;
        bool swapped = true;

        // Continue until gap is 1 AND no swaps occurred
        while (gap > 1 || swapped)
        {
            // Shrink gap by shrink factor
            gap = (int)(gap / SHRINK_FACTOR);
            if (gap < 1)
                gap = 1;

            swapped = false;

            // Compare elements with current gap
            for (int i = 0; i < n - gap; i++)
            {
                if (arr[i] > arr[i + gap])
                {
                    // Swap elements
                    int temp = arr[i];
                    arr[i] = arr[i + gap];
                    arr[i + gap] = temp;
                    swapped = true;
                }
            }
        }

        return arr;
    }

    /**
     * Returns a new sorted array (non-mutating).
     *
     * @param arr The input array.
     * @return    A new sorted array.
     */
    public static int[] CombSortStable(int[] arr)
    {
        if (arr == null) return null;
        int[] sorted = (int[])arr.Clone();
        CombSortArray(sorted);
        return sorted;
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        Console.WriteLine("Sorted Array: [" + string.Join(", ", CombSortStable(numbers)) + "]");

        // Test with already sorted
        int[] sortedArr = {1, 2, 3, 4, 5};
        Console.WriteLine("\nAlready Sorted: [" + string.Join(", ", CombSortStable(sortedArr)) + "]");

        // Test with reverse order
        int[] reverse = {9, 8, 7, 6, 5, 4, 3, 2, 1};
        Console.WriteLine("Reverse Sorted: [" + string.Join(", ", CombSortStable(reverse)) + "]");

        // Test with duplicates
        int[] duplicates = {5, 2, 8, 2, 9, 1, 5};
        Console.WriteLine("With Duplicates: [" + string.Join(", ", CombSortStable(duplicates)) + "]");

        // Test with single element
        int[] single = {42};
        Console.WriteLine("Single Element: [" + string.Join(", ", CombSortStable(single)) + "]");

        // Test with empty array
        int[] empty = {};
        Console.WriteLine("Empty Array: [" + string.Join(", ", CombSortStable(empty)) + "]");

        // Test with two elements
        int[] two = {2, 1};
        Console.WriteLine("Two Elements: [" + string.Join(", ", CombSortStable(two)) + "]");
    }
}