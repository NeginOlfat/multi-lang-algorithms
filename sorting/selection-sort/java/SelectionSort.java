import java.util.Arrays;

/**
 * Selection Sort Algorithm (Java)
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
public class SelectionSort {

    /**
     * Sorts an array using the Selection Sort algorithm.
     *
     * @param arr The array of comparable elements to be sorted.
     * @return A new sorted array (original is not modified).
     */
    public static int[] selectionSort(int[] arr) {
        // Handle null or small arrays
        if (arr == null || arr.length < 2) {
            return arr == null ? null : arr.clone();
        }

        // Create a copy to avoid mutating the original array
        int[] sorted = arr.clone();
        int n = sorted.length;

        // Traverse through all array elements (except the last one)
        for (int i = 0; i < n - 1; i++) {
            // Assume the first unsorted element is the minimum
            int minIndex = i;

            // Find the actual minimum element in the remaining unsorted portion
            for (int j = i + 1; j < n; j++) {
                if (sorted[j] < sorted[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap only if a smaller element was found
            if (minIndex != i) {
                int temp = sorted[i];
                sorted[i] = sorted[minIndex];
                sorted[minIndex] = temp;
            }
        }

        return sorted;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(selectionSort(numbers)));

        // Test with already sorted array
        int[] sortedArray = {1, 2, 3, 4, 5};
        System.out.println("Already Sorted: " + Arrays.toString(selectionSort(sortedArray)));

        // Test with one element
        int[] singleElement = {42};
        System.out.println("Single Element: " + Arrays.toString(selectionSort(singleElement)));
    }
}