using System;

/**
 * Selection Sort Algorithm (C#)
 *
 * Sorts an array by repeatedly finding the minimum element from the unsorted part
 * and putting it at the beginning.
 *
 * Time Complexity:
 *   Best, Average, Worst: O(n²)
 * Space Complexity: O(1) — sorts in-place (if modifying original), or O(n) if copying
 *
 * Note: This version returns a new sorted array without modifying the original.
 */
public class SelectionSort
{
    /**
     * Sorts an array using the Selection Sort algorithm.
     *
     * @param arr The array of comparable elements to be sorted.
     * @return A new sorted array (original is not modified).
     */
    public static int[] SelectionSortArray(int[] arr)
    {
        // Handle null or small arrays
        if (arr == null || arr.Length < 2)
            return (int[])arr?.Clone() ?? new int[0];

        // Create a copy to avoid mutating the original array
        int[] sorted = (int[])arr.Clone();
        int n = sorted.Length;

        // Traverse through all array elements (except the last one)
        for (int i = 0; i < n - 1; i++)
        {
            // Assume the first unsorted element is the minimum
            int minIndex = i;

            // Find the actual minimum element in the remaining unsorted portion
            for (int j = i + 1; j < n; j++)
            {
                if (sorted[j] < sorted[minIndex])
                {
                    minIndex = j;
                }
            }

            // Swap only if a smaller element was found
            if (minIndex != i)
            {
                int temp = sorted[i];
                sorted[i] = sorted[minIndex];
                sorted[minIndex] = temp;
            }
        }

        return sorted;
    }

    // Helper method to print an array
    static void PrintArray(int[] arr)
    {
        Console.Write("[");
        for (int i = 0; i < arr.Length; i++)
        {
            Console.Write(arr[i]);
            if (i < arr.Length - 1)
                Console.Write(", ");
        }
        Console.Write("]");
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {64, 25, 12, 22, 11};

        Console.Write("Original Array: ");
        PrintArray(numbers);
        Console.WriteLine();

        int[] sorted = SelectionSortArray(numbers);

        Console.Write("Sorted Array: ");
        PrintArray(sorted);
        Console.WriteLine();

        // Test with already sorted array
        int[] sortedArray = {1, 2, 3, 4, 5};
        Console.Write("Already Sorted: ");
        PrintArray(SelectionSortArray(sortedArray));
        Console.WriteLine();

        // Test with single element
        int[] singleElement = {42};
        Console.Write("Single Element: ");
        PrintArray(SelectionSortArray(singleElement));
        Console.WriteLine();
    }
}