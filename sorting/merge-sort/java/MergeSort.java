import java.util.Arrays;

/**
 * Merge Sort Algorithm (Java)
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
public class MergeSort {

    /**
     * Sorts an array using the Merge Sort algorithm.
     *
     * @param arr The array of comparable elements to be sorted.
     * @return A new sorted array.
     */
    public static int[] mergeSort(int[] arr) {
        // Base case: arrays with 0 or 1 element are already sorted
        if (arr == null || arr.length <= 1) {
            return arr == null ? null : arr.clone();
        }

        // Divide: split the array into two halves
        int mid = arr.length / 2;
        int[] leftHalf = Arrays.copyOfRange(arr, 0, mid);
        int[] rightHalf = Arrays.copyOfRange(arr, mid, arr.length);

        // Conquer: recursively sort both halves
        int[] leftSorted = mergeSort(leftHalf);
        int[] rightSorted = mergeSort(rightHalf);

        // Combine: merge the two sorted halves
        return merge(leftSorted, rightSorted);
    }

    /**
     * Merges two sorted arrays into one sorted array.
     *
     * @param left  Left sorted subarray
     * @param right Right sorted subarray
     * @return Merged sorted array
     */
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0; // Pointer for left array
        int j = 0; // Pointer for right array
        int k = 0; // Pointer for result array

        // Compare elements and add the smaller one to result
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }

        // Append remaining elements from left (if any)
        while (i < left.length) {
            result[k++] = left[i++];
        }

        // Append remaining elements from right (if any)
        while (j < right.length) {
            result[k++] = right[j++];
        }

        return result;
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
        int[] numbers = {38, 27, 43, 3, 9, 82, 10};

        System.out.print("Original Array: ");
        printArray(numbers);
        System.out.println();

        int[] sorted = mergeSort(numbers);

        System.out.print("Sorted Array: ");
        printArray(sorted);
        System.out.println();

        // Verify original is unchanged
        System.out.print("Original After Sort: ");
        printArray(numbers);
        System.out.println();

        // Test edge cases
        System.out.print("Already Sorted: ");
        printArray(mergeSort(new int[]{1, 2, 3, 4, 5}));
        System.out.println();

        System.out.print("Reverse Sorted: ");
        printArray(mergeSort(new int[]{5, 4, 3, 2, 1}));
        System.out.println();

        System.out.print("Single Element: ");
        printArray(mergeSort(new int[]{42}));
        System.out.println();

        System.out.print("Empty Array: ");
        printArray(mergeSort(new int[]{}));
        System.out.println();
    }
}