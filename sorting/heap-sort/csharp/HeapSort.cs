using System;

/**
 * Sorts an array using the Heap Sort algorithm.
 */
public class HeapSort
{
    /**
     * Sorts an array using the Heap Sort algorithm.
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity:
     * - Best/Average/Worst: O(n log n)
     * Space Complexity: O(n) due to copy, O(1) extra space
     */
    public static int[] HeapSortArray(int[] arr)
    {
        // Handle null or small arrays
        if (arr == null || arr.Length < 2)
            return (int[])arr?.Clone() ?? new int[0];

        // Create a copy to avoid mutating the original array
        int[] sorted = (int[])arr.Clone();
        int n = sorted.Length;

        // Build a max heap from the array
        // Start from the last non-leaf node
        for (int i = n / 2 - 1; i >= 0; i--)
        {
            Heapify(sorted, n, i);
        }

        // Extract elements from the heap one by one
        for (int i = n - 1; i > 0; i--)
        {
            // Move current root (max) to the end
            int temp = sorted[0];
            sorted[0] = sorted[i];
            sorted[i] = temp;

            // Restore heap property on the reduced heap (0 to i-1)
            Heapify(sorted, i, 0);
        }

        return sorted;
    }

    /**
     * Turns a subtree rooted at index 'i' into a max heap.
     *
     * @param heap      The array representing the heap.
     * @param heapSize  Current size of the heap.
     * @param i         Index of the root of the subtree.
     */
    private static void Heapify(int[] heap, int heapSize, int i)
    {
        int largest = i;        // Initialize largest as root
        int left = 2 * i + 1;   // Left child index
        int right = 2 * i + 2;  // Right child index

        // If left child exists and is greater than root
        if (left < heapSize && heap[left] > heap[largest])
        {
            largest = left;
        }

        // If right child exists and is greater than current largest
        if (right < heapSize && heap[right] > heap[largest])
        {
            largest = right;
        }

        // If the largest is not the root, swap and continue heapifying
        if (largest != i)
        {
            int temp = heap[i];
            heap[i] = heap[largest];
            heap[largest] = temp;

            // Recursively heapify the affected subtree
            Heapify(heap, heapSize, largest);
        }
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        Console.Write("Original Array: ");
        Console.WriteLine($"[{string.Join(", ", numbers)}]");

        int[] sorted = HeapSortArray(numbers);

        Console.Write("Sorted Array: ");
        Console.WriteLine($"[{string.Join(", ", sorted)}]");

        // Test with already sorted array
        int[] sortedArray = {1, 2, 3, 4, 5};
        Console.Write("Already Sorted: ");
        Console.WriteLine($"[{string.Join(", ", HeapSortArray(sortedArray))}]");
    }
}