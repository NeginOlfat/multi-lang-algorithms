using System;

/**
 * Sorts an array using the Bubble Sort algorithm.
 */
public class BubbleSort
{
    /**
     * Sorts an array using the Bubble Sort algorithm.
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity:
     * - Best Case: O(n) when array is already sorted (with optimization)
     * - Average/Worst Case: O(n²)
     * Space Complexity: O(n) due to array copy, O(1) extra space
     */
    public static int[] BubbleSortArray(int[] arr)
    {
        // Handle null or small arrays
        if (arr == null || arr.Length < 2)
            return (int[])arr?.Clone() ?? new int[0];

        // Create a copy to avoid mutating the original array
        int[] sorted = (int[])arr.Clone();
        int n = sorted.Length;

        // Outer loop: run for each element
        for (int i = 0; i < n - 1; i++)
        {
            bool swapped = false; // Optimization flag

            // Inner loop: compare adjacent elements
            // After each pass, largest element "bubbles up"
            // So reduce range by i
            for (int j = 0; j < n - i - 1; j++)
            {
                if (sorted[j] > sorted[j + 1])
                {
                    // Swap elements
                    int temp = sorted[j];
                    sorted[j] = sorted[j + 1];
                    sorted[j + 1] = temp;
                    swapped = true;
                }
            }

            // Early exit: if no swaps occurred, array is sorted
            if (!swapped) break;
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
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        Console.Write("Original Array: ");
        PrintArray(numbers);
        Console.WriteLine();

        int[] sorted = BubbleSortArray(numbers);

        Console.Write("Sorted Array: ");
        PrintArray(sorted);
        Console.WriteLine();

        // Test with already sorted array (to show best-case O(n) behavior)
        int[] sortedArray = {1, 2, 3, 4, 5};
        Console.Write("Already Sorted: ");
        PrintArray(BubbleSortArray(sortedArray));
        Console.WriteLine();
    }
}