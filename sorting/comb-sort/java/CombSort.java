import java.util.Arrays;

/**
 * Sorts an array using Comb Sort.
 */
public class CombSort {

    /**
     * Sorts an array using Comb Sort.
     *
     * @param arr The array to be sorted (modified in-place).
     * @return    The sorted array (for chaining).
     *
     * Time Complexity:
     * - Best/Average: O(n log n) with shrink factor 1.3
     * - Worst: O(n²)
     *
     * Space Complexity: O(1) — in-place sorting
     *
     * ✅ Improves Bubble Sort by eliminating "turtles" (small values near the end)
     * ✅ Uses shrink factor of 1.3 (empirically optimal)
     * ❌ Not stable
     */
    public static int[] combSort(int[] arr) {
        // Handle edge cases
        if (arr == null || arr.length <= 1) {
            return arr;
        }

        int n = arr.length;
        int gap = n;
        final double SHRINK_FACTOR = 1.3;
        boolean swapped = true;

        // Continue until gap is 1 AND no swaps occurred
        while (gap > 1 || swapped) {
            // Shrink gap by shrink factor
            gap = (int) (gap / SHRINK_FACTOR);
            if (gap < 1) {
                gap = 1;
            }

            swapped = false;

            // Compare elements with current gap
            for (int i = 0; i < n - gap; i++) {
                if (arr[i] > arr[i + gap]) {
                    // Swap elements
                    int temp = arr[i];
                    arr[i] = arr[i + gap];
                    arr[i + gap] = temp;
                    swapped = true;
                }
            }
        }

        return arr;
    }

    /**
     * Returns a new sorted array (non-mutating).
     *
     * @param arr The input array.
     * @return    A new sorted array.
     */
    public static int[] combSortStable(int[] arr) {
        if (arr == null) return null;
        int[] sorted = arr.clone();
        combSort(sorted);
        return sorted;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(combSortStable(numbers)));

        // Test with already sorted
        int[] sortedArr = {1, 2, 3, 4, 5};
        System.out.println("\nAlready Sorted: " + Arrays.toString(combSortStable(sortedArr)));

        // Test with reverse order
        int[] reverse = {9, 8, 7, 6, 5, 4, 3, 2, 1};
        System.out.println("Reverse Sorted: " + Arrays.toString(combSortStable(reverse)));

        // Test with duplicates
        int[] duplicates = {5, 2, 8, 2, 9, 1, 5};
        System.out.println("With Duplicates: " + Arrays.toString(combSortStable(duplicates)));

        // Test with single element
        int[] single = {42};
        System.out.println("Single Element: " + Arrays.toString(combSortStable(single)));

        // Test with empty array
        int[] empty = {};
        System.out.println("Empty Array: " + Arrays.toString(combSortStable(empty)));

        // Test with two elements
        int[] two = {2, 1};
        System.out.println("Two Elements: " + Arrays.toString(combSortStable(two)));
    }
}