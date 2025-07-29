using System;

/**
 * Sorts an array using the Quick Sort algorithm with Lomuto partition scheme.
 */
public class QuickSort
{
    /**
     * Sorts an array using Quick Sort (Lomuto partition).
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity:
     * - Best/Average: O(n log n)
     * - Worst: O(n²) — rare with random data
     * Space Complexity: O(log n) due to recursion stack
     */
    public static int[] QuickSortArray(int[] arr)
    {
        // Handle null or small arrays
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        // Create a copy to avoid mutating the original array
        int[] sorted = (int[])arr.Clone();

        // Sort the entire array
        Sort(sorted, 0, sorted.Length - 1);

        return sorted;
    }

    /**
     * Recursively sorts the subarray from low to high.
     */
    private static void Sort(int[] arr, int low, int high)
    {
        if (low < high)
        {
            // Partition the array and get pivot index
            int pivotIndex = Partition(arr, low, high);
            // Recursively sort left and right partitions
            Sort(arr, low, pivotIndex - 1);
            Sort(arr, pivotIndex + 1, high);
        }
    }

    /**
     * Partitions the array using Lomuto scheme (last element as pivot).
     *
     * @return The final index of the pivot element
     */
    private static int Partition(int[] arr, int low, int high)
    {
        int pivot = arr[high]; // Choose last element as pivot
        int i = low - 1;       // Index of smaller element

        for (int j = low; j < high; j++)
        {
            if (arr[j] <= pivot)
            {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Place pivot in correct position
        int pivotTemp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = pivotTemp;

        return i + 1; // Return pivot index
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {10, 80, 30, 90, 40, 50, 70};

        Console.WriteLine("Original Array: " + FormatArray(numbers));
        Console.WriteLine("Sorted Array:   " + FormatArray(QuickSortArray(numbers)));

        // Test edge cases
        Console.WriteLine("Empty Array:    " + FormatArray(QuickSortArray(new int[] {})));
        Console.WriteLine("Single Element: " + FormatArray(QuickSortArray(new int[] {42})));
        Console.WriteLine("Already Sorted: " + FormatArray(QuickSortArray(new int[] {1, 2, 3, 4, 5})));
        Console.WriteLine("Reverse Sorted: " + FormatArray(QuickSortArray(new int[] {5, 4, 3, 2, 1})));
    }

    // Helper method to format array output
    static string FormatArray(int[] arr)
    {
        return "[" + string.Join(", ", arr) + "]";
    }
}