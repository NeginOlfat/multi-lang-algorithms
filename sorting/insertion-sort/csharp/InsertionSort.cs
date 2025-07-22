using System;

/**
 * Insertion Sort Algorithm (C#)
 *
 * Sorts an array by building a sorted section one element at a time.
 * This version does NOT modify the original array (non-mutating).
 *
 * Time Complexity:
 *   Best Case:  O(n)     - when array is already sorted
 *   Average Case: O(n²)
 *   Worst Case: O(n²)    - when array is reverse sorted
 * Space Complexity: O(n) - due to copying the input
 */
public class InsertionSort
{
    /**
     * Sorts an array using Insertion Sort (non-mutating).
     *
     * @param arr The array of comparable elements to be sorted.
     * @return A new sorted array (original is not modified).
     */
    public static int[] InsertionSortArray(int[] arr)
    {
        // Handle null or small arrays
        if (arr == null || arr.Length < 2)
            return (int[])arr?.Clone() ?? new int[0];

        // Create a copy to avoid mutating the original array
        int[] sorted = (int[])arr.Clone();
        int n = sorted.Length;

        // Traverse from the second element (index 1) to the end
        for (int i = 1; i < n; i++)
        {
            int key = sorted[i]; // Current element to position
            int j = i - 1;       // Index of last element in sorted portion

            // Move elements greater than key one position ahead
            while (j >= 0 && sorted[j] > key)
            {
                sorted[j + 1] = sorted[j];
                j--;
            }

            // Insert the key at its correct position
            sorted[j + 1] = key;
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
        int[] numbers = {12, 11, 13, 5, 6};

        Console.Write("Original Array: ");
        PrintArray(numbers);
        Console.WriteLine();

        int[] sorted = InsertionSortArray(numbers);

        Console.Write("Sorted Array: ");
        PrintArray(sorted);
        Console.WriteLine();

        // Verify original is unchanged
        Console.Write("Original After Sort: ");
        PrintArray(numbers);
        Console.WriteLine();

        // Test other cases
        Console.Write("Already Sorted: ");
        PrintArray(InsertionSortArray(new int[] { 1, 2, 3, 4, 5 }));
        Console.WriteLine();

        Console.Write("Reverse Sorted: ");
        PrintArray(InsertionSortArray(new int[] { 5, 4, 3, 2, 1 }));
        Console.WriteLine();

        Console.Write("Single Element: ");
        PrintArray(InsertionSortArray(new int[] { 42 }));
        Console.WriteLine();

        Console.Write("Empty Array: ");
        PrintArray(InsertionSortArray(new int[] { }));
        Console.WriteLine();
    }
}