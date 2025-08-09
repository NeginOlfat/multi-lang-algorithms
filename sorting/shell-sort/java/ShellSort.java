import java.util.Arrays;

/**
 * Sorts an array using Shell Sort with Knuth's gap sequence.
 */
public class ShellSort {

    /**
     * Sorts an array using Shell Sort (Knuth's sequence).
     *
     * @param arr The array to be sorted (modified in-place).
     * @return The sorted array (for chaining).
     *
     * Time Complexity:
     * - Best: O(n log n)
     * - Average: O(n^1.3) approx
     * - Worst: O(n²) — depends on gap sequence
     *
     * Space Complexity: O(1) — in-place sorting
     *
     * ✅ Based on Insertion Sort but with decreasing gaps
     * ✅ Uses Knuth sequence: 1, 4, 13, 40, ... (gap = 3*gap + 1)
     * ❌ Not stable
     */
    public static int[] shellSort(int[] arr) {
        // Handle edge cases
        if (arr == null || arr.length <= 1) {
            return arr;
        }

        int n = arr.length;
        int gap = 1;

        // Find the largest gap in Knuth sequence: 1, 4, 13, 40, ...
        // Such that gap < n / 3
        while (gap < n / 3) {
            gap = 3 * gap + 1; // 1, 4, 13, 40, 121, ...
        }

        // Perform gapped insertion sort for each gap
        while (gap > 0) {
            // Do a gapped insertion sort for this gap size
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;

                // Shift elements that are `gap` apart until correct position is found
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }

                // Place temp in its correct location
                arr[j] = temp;
            }

            // Reduce gap using Knuth's formula: (gap - 1) / 3
            gap = (gap - 1) / 3;
        }

        return arr;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(shellSort(numbers.clone())));

        // Test with already sorted array
        int[] sortedArr = {1, 2, 3, 4, 5};
        System.out.println("Already Sorted: " + Arrays.toString(shellSort(sortedArr.clone())));

        // Test with reverse-sorted
        int[] reverse = {9, 8, 7, 6, 5, 4, 3, 2, 1};
        System.out.println("Reverse Sorted: " + Arrays.toString(shellSort(reverse.clone())));

        // Test with duplicates
        int[] duplicates = {5, 2, 8, 2, 9, 1, 5};
        System.out.println("With Duplicates: " + Arrays.toString(shellSort(duplicates.clone())));

        // Test with single element
        int[] single = {42};
        System.out.println("Single Element: " + Arrays.toString(shellSort(single.clone())));

        // Test with empty array
        int[] empty = {};
        System.out.println("Empty Array: " + Arrays.toString(shellSort(empty.clone())));
    }
}