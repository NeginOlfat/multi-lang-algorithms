import java.util.Arrays;

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
 * In real projects, use: Arrays.sort(arr) — Java uses Tim Sort for objects!
 */
public class IntroSort {

    /**
     * Sorts an array using Intro Sort (Introspective Sort).
     *
     * @param arr The input array (not modified).
     * @return A new sorted array.
     */
    public static int[] introSort(int[] arr) {
        if (arr.length <= 1) {
            return arr.clone();
        }

        // Max allowed depth: 2 * floor(log2(n))
        int maxDepth = 2 * (int)(Math.log(arr.length) / Math.log(2));
        int[] sorted = arr.clone(); // Don't mutate input

        introSortLoop(sorted, 0, sorted.length - 1, maxDepth);
        return sorted;
    }

    /**
     * Recursive sorting loop with depth control.
     */
    private static void introSortLoop(int[] arr, int left, int right, int depthLimit) {
        // Small array: use Insertion Sort
        if (right - left + 1 <= 16) {
            insertionSort(arr, left, right);
            return;
        }

        // Too deep: switch to Heap Sort
        if (depthLimit <= 0) {
            heapSort(arr, left, right);
            return;
        }

        // Otherwise: Quick Sort
        int pivotIndex = partition(arr, left, right);
        introSortLoop(arr, left, pivotIndex - 1, depthLimit - 1);
        introSortLoop(arr, pivotIndex + 1, right, depthLimit - 1);
    }

    /**
     * Sorts small subarray using Insertion Sort.
     */
    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    /**
     * Sorts subarray using Heap Sort.
     */
    private static void heapSort(int[] arr, int left, int right) {
        int n = right - left + 1;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, left);
        }

        // Extract elements one by one
        for (int i = n - 1; i > 0; i--) {
            swap(arr, left, left + i);
            heapify(arr, i, 0, left);
        }
    }

    /**
     * Heapify a subtree rooted at index i with given offset.
     */
    private static void heapify(int[] arr, int n, int i, int offset) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[offset + left] > arr[offset + largest]) {
            largest = left;
        }
        if (right < n && arr[offset + right] > arr[offset + largest]) {
            largest = right;
        }

        if (largest != i) {
            swap(arr, offset + i, offset + largest);
            heapify(arr, n, largest, offset);
        }
    }

    /**
     * Partition using median-of-three pivot.
     */
    private static int partition(int[] arr, int left, int right) {
        int mid = (left + right) / 2;

        // Sort arr[left], arr[mid], arr[right] to get median at mid
        if (arr[mid] < arr[left]) swap(arr, left, mid);
        if (arr[right] < arr[left]) swap(arr, left, right);
        if (arr[right] < arr[mid]) swap(arr, mid, right);

        int pivot = arr[mid];
        swap(arr, mid, right); // Move pivot to end

        int i = left;
        for (int j = left; j < right; j++) {
            if (arr[j] <= pivot) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, i, right);
        return i;
    }

    /**
     * Swaps two elements in the array.
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(introSort(numbers)));

        // Test with already sorted
        int[] sorted = {1, 2, 3, 4, 5};
        System.out.println("\nAlready Sorted: " + Arrays.toString(introSort(sorted)));

        // Test with reverse
        int[] reverse = {5, 4, 3, 2, 1};
        System.out.println("Reverse Sorted: " + Arrays.toString(introSort(reverse)));

        // Test with duplicates
        int[] duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5};
        System.out.println("With Duplicates: " + Arrays.toString(introSort(duplicates)));

        // Test with single element
        int[] single = {42};
        System.out.println("Single Element: " + Arrays.toString(introSort(single)));

        // Test with two elements
        int[] two = {2, 1};
        System.out.println("Two Elements: " + Arrays.toString(introSort(two)));
    }
}