using System;

/**
 * Simplified Intro Sort (Introspective Sort) - Educational Version
 *
 * Phases:
 * 1. Quick Sort (fast average case)
 * 2. Switch to Heap Sort if recursion depth is too deep
 * 3. Use Insertion Sort for small subarrays
 *
 * For learning only — not production
 *
 * In real projects, use: Array.Sort(arr) — .NET uses highly optimized introspective sort!
 */
public class IntroSort
{
    /**
     * Sorts an array using Intro Sort (Introspective Sort).
     *
     * @param arr The input array (not modified).
     * @return A new sorted array.
     */
    public static int[] IntroSortArray(int[] arr)
    {
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        // Max allowed depth: 2 * floor(log2(n))
        int maxDepth = 2 * (int)Math.Floor(Math.Log(arr.Length) / Math.Log(2));
        int[] sorted = (int[])arr.Clone(); // Don't mutate input

        IntroSortLoop(sorted, 0, sorted.Length - 1, maxDepth);
        return sorted;
    }

    /**
     * Recursive sorting loop with depth control.
     */
    private static void IntroSortLoop(int[] arr, int left, int right, int depthLimit)
    {
        // Small array: use Insertion Sort
        if (right - left + 1 <= 16)
        {
            InsertionSort(arr, left, right);
            return;
        }

        // Too deep: switch to Heap Sort
        if (depthLimit <= 0)
        {
            HeapSort(arr, left, right);
            return;
        }

        // Otherwise: Quick Sort
        int pivotIndex = Partition(arr, left, right);
        IntroSortLoop(arr, left, pivotIndex - 1, depthLimit - 1);
        IntroSortLoop(arr, pivotIndex + 1, right, depthLimit - 1);
    }

    /**
     * Sorts small subarray using Insertion Sort.
     */
    private static void InsertionSort(int[] arr, int left, int right)
    {
        for (int i = left + 1; i <= right; i++)
        {
            int key = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    /**
     * Sorts subarray using Heap Sort.
     */
    private static void HeapSort(int[] arr, int left, int right)
    {
        int n = right - left + 1;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--)
        {
            Heapify(arr, n, i, left);
        }

        // Extract elements one by one
        for (int i = n - 1; i > 0; i--)
        {
            Swap(arr, left, left + i);
            Heapify(arr, i, 0, left);
        }
    }

    /**
     * Heapify a subtree rooted at index i with given offset.
     */
    private static void Heapify(int[] arr, int n, int i, int offset)
    {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[offset + left] > arr[offset + largest])
            largest = left;
        if (right < n && arr[offset + right] > arr[offset + largest])
            largest = right;

        if (largest != i)
        {
            Swap(arr, offset + i, offset + largest);
            Heapify(arr, n, largest, offset);
        }
    }

    /**
     * Partition using median-of-three pivot.
     */
    private static int Partition(int[] arr, int left, int right)
    {
        int mid = (left + right) / 2;

        // Sort arr[left], arr[mid], arr[right] to get median at mid
        if (arr[mid] < arr[left]) Swap(arr, left, mid);
        if (arr[right] < arr[left]) Swap(arr, left, right);
        if (arr[right] < arr[mid]) Swap(arr, mid, right);

        int pivot = arr[mid];
        Swap(arr, mid, right); // Move pivot to end

        int i = left;
        for (int j = left; j < right; j++)
        {
            if (arr[j] <= pivot)
            {
                Swap(arr, i, j);
                i++;
            }
        }
        Swap(arr, i, right);
        return i;
    }

    /**
     * Swaps two elements in the array.
     */
    private static void Swap(int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        Console.WriteLine("Sorted Array: [" + string.Join(", ", IntroSortArray(numbers)) + "]");

        // Test with already sorted
        int[] sorted = {1, 2, 3, 4, 5};
        Console.WriteLine("\nAlready Sorted: [" + string.Join(", ", IntroSortArray(sorted)) + "]");

        // Test with reverse
        int[] reverse = {5, 4, 3, 2, 1};
        Console.WriteLine("Reverse Sorted: [" + string.Join(", ", IntroSortArray(reverse)) + "]");

        // Test with duplicates
        int[] duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5};
        Console.WriteLine("With Duplicates: [" + string.Join(", ", IntroSortArray(duplicates)) + "]");

        // Test with single element
        int[] single = {42};
        Console.WriteLine("Single Element: [" + string.Join(", ", IntroSortArray(single)) + "]");

        // Test with two elements
        int[] two = {2, 1};
        Console.WriteLine("Two Elements: [" + string.Join(", ", IntroSortArray(two)) + "]");
    }
}