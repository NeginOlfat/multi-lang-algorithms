import java.util.Arrays;

/**
 * Sorts an array using the Bubble Sort algorithm.
 */
public class BubbleSort {

    /**
     * Sorts an array using the Bubble Sort algorithm.
     *
     * @param arr The array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity:
     * - Best Case: O(n) when array is already sorted (with optimization)
     * - Average/Worst Case: O(n²)
     * Space Complexity: O(n) due to array copy, O(1) extra space
     */
    public static int[] bubbleSort(int[] arr) {
        // Create a copy to avoid mutating the original array
        int[] sorted = arr.clone();
        int n = sorted.length;

        // If array has 0 or 1 element, it's already sorted
        if (n < 2) return sorted;

        // Outer loop: run for each element
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false; // Optimization flag

            // Inner loop: compare adjacent elements
            // After each pass, largest element "bubbles up"
            // So reduce range by i
            for (int j = 0; j < n - i - 1; j++) {
                if (sorted[j] > sorted[j + 1]) {
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

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(bubbleSort(numbers)));

        // Test with already sorted array (to show best-case O(n) behavior)
        int[] sortedArray = {1, 2, 3, 4, 5};
        System.out.println("Already Sorted: " + Arrays.toString(bubbleSort(sortedArray)));
    }
}