using System;

/**
 * Merge Sort Algorithm (C#)
 *
 * A divide-and-conquer sorting algorithm that:
 * 1. Divides the array into two halves
 * 2. Recursively sorts each half
 * 3. Merges the two sorted halves
 *
 * Time Complexity:
 *   Best, Average, Worst: O(n log n)
 * Space Complexity: O(n) - due to auxiliary arrays during merge
 *
 * Note: This version returns a new sorted array (non-mutating).
 * The original array remains unchanged.
 */
public class MergeSort
{
    /**
     * Sorts an array using the Merge Sort algorithm.
     *
     * @param arr The array of comparable elements to be sorted.
     * @return A new sorted array.
     */
    public static int[] MergeSortArray(int[] arr)
    {
        // Handle null or small arrays
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        // Divide: split the array into two halves
        int mid = arr.Length / 2;
        int[] leftHalf = new int[mid];
        int[] rightHalf = new int[arr.Length - mid];

        Array.Copy(arr, 0, leftHalf, 0, mid);
        Array.Copy(arr, mid, rightHalf, 0, arr.Length - mid);

        // Conquer: recursively sort both halves
        int[] leftSorted = MergeSortArray(leftHalf);
        int[] rightSorted = MergeSortArray(rightHalf);

        // Combine: merge the two sorted halves
        return Merge(leftSorted, rightSorted);
    }

    /**
     * Merges two sorted arrays into one sorted array.
     *
     * @param left  Left sorted subarray
     * @param right Right sorted subarray
     * @return Merged sorted array
     */
    private static int[] Merge(int[] left, int[] right)
    {
        int[] result = new int[left.Length + right.Length];
        int i = 0; // Pointer for left array
        int j = 0; // Pointer for right array
        int k = 0; // Pointer for result array

        // Compare elements and add the smaller one to result
        while (i < left.Length && j < right.Length)
        {
            if (left[i] <= right[j])
            {
                result[k++] = left[i++];
            }
            else
            {
                result[k++] = right[j++];
            }
        }

        // Append remaining elements from left (if any)
        while (i < left.Length)
        {
            result[k++] = left[i++];
        }

        // Append remaining elements from right (if any)
        while (j < right.Length)
        {
            result[k++] = right[j++];
        }

        return result;
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
        int[] numbers = {38, 27, 43, 3, 9, 82, 10};

        Console.Write("Original Array: ");
        PrintArray(numbers);
        Console.WriteLine();

        int[] sorted = MergeSortArray(numbers);

        Console.Write("Sorted Array: ");
        PrintArray(sorted);
        Console.WriteLine();

        // Verify original is unchanged
        Console.Write("Original After Sort: ");
        PrintArray(numbers);
        Console.WriteLine();

        // Test edge cases
        Console.Write("Already Sorted: ");
        PrintArray(MergeSortArray(new int[] { 1, 2, 3, 4, 5 }));
        Console.WriteLine();

        Console.Write("Reverse Sorted: ");
        PrintArray(MergeSortArray(new int[] { 5, 4, 3, 2, 1 }));
        Console.WriteLine();

        Console.Write("Single Element: ");
        PrintArray(MergeSortArray(new int[] { 42 }));
        Console.WriteLine();

        Console.Write("Empty Array: ");
        PrintArray(MergeSortArray(new int[] { }));
        Console.WriteLine();
    }
}