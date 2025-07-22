import java.util.Arrays;

/**
 * Insertion Sort Algorithm (Java)
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
public class InsertionSort {

    /**
     * Sorts an array using Insertion Sort (non-mutating).
     *
     * @param arr The array of comparable elements to be sorted.
     * @return A new sorted array (original is not modified).
     */
    public static int[] insertionSort(int[] arr) {
        // Handle null or small arrays
        if (arr == null || arr.length < 2) {
            return arr == null ? null : arr.clone();
        }

        // Create a copy to avoid mutating the original array
        int[] sorted = arr.clone();
        int n = sorted.length;

        // Traverse from the second element (index 1) to the end
        for (int i = 1; i < n; i++) {
            int key = sorted[i]; // Current element to position
            int j = i - 1;       // Index of last element in sorted portion

            // Move elements greater than key one position ahead
            while (j >= 0 && sorted[j] > key) {
                sorted[j + 1] = sorted[j];
                j--;
            }

            // Insert the key at its correct position
            sorted[j + 1] = key;
        }

        return sorted;
    }

    // Helper method to print an array
    static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.print("]");
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {12, 11, 13, 5, 6};

        System.out.print("Original Array: ");
        printArray(numbers);
        System.out.println();

        int[] sorted = insertionSort(numbers);

        System.out.print("Sorted Array: ");
        printArray(sorted);
        System.out.println();

        // Verify original is unchanged
        System.out.print("Original After Sort: ");
        printArray(numbers);
        System.out.println();

        // Test other cases
        System.out.print("Already Sorted: ");
        printArray(insertionSort(new int[]{1, 2, 3, 4, 5}));
        System.out.println();

        System.out.print("Reverse Sorted: ");
        printArray(insertionSort(new int[]{5, 4, 3, 2, 1}));
        System.out.println();

        System.out.print("Single Element: ");
        printArray(insertionSort(new int[]{42}));
        System.out.println();

        System.out.print("Empty Array: ");
        printArray(insertionSort(new int[]{}));
        System.out.println();
    }
}