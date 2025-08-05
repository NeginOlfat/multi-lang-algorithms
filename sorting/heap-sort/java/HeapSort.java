import java.util.Arrays;

/**
 * Sorts an array using the Heap Sort algorithm.
 */
public class HeapSort {

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
    public static int[] heapSort(int[] arr) {
        // Create a copy to avoid mutating the original array
        int[] sorted = arr.clone();
        int n = sorted.length;

        // If array has 0 or 1 element, it's already sorted
        if (n < 2) return sorted;

        // Build a max heap from the array
        // Start from the last non-leaf node
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(sorted, n, i);
        }

        // Extract elements from the heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (max) to the end
            int temp = sorted[0];
            sorted[0] = sorted[i];
            sorted[i] = temp;

            // Restore heap property on the reduced heap (0 to i-1)
            heapify(sorted, i, 0);
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
    private static void heapify(int[] heap, int heapSize, int i) {
        int largest = i;        // Initialize largest as root
        int left = 2 * i + 1;   // Left child index
        int right = 2 * i + 2;  // Right child index

        // If left child exists and is greater than root
        if (left < heapSize && heap[left] > heap[largest]) {
            largest = left;
        }

        // If right child exists and is greater than current largest
        if (right < heapSize && heap[right] > heap[largest]) {
            largest = right;
        }

        // If the largest is not the root, swap and continue heapifying
        if (largest != i) {
            int temp = heap[i];
            heap[i] = heap[largest];
            heap[largest] = temp;

            // Recursively heapify the affected subtree
            heapify(heap, heapSize, largest);
        }
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(heapSort(numbers)));

        // Test with already sorted array
        int[] sortedArray = {1, 2, 3, 4, 5};
        System.out.println("Already Sorted: " + Arrays.toString(heapSort(sortedArray)));
    }
}