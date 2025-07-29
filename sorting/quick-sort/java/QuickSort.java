import java.util.Arrays;

/**
 * Sorts an array using the Quick Sort algorithm with Lomuto partition scheme.
 */
public class QuickSort {

    /**
     * Sorts an array using Quick Sort (Lomuto partition).
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity:
     * - Best/Average: O(n log n)
     * - Worst: O(n²) — rare with random data
     * Space Complexity: O(log n) due to recursion stack
     */
    public static int[] quickSort(int[] arr) {
        // Handle null or small arrays
        if (arr == null || arr.length <= 1) {
            return arr == null ? new int[0] : arr.clone();
        }

        // Create a copy to avoid mutating the original array
        int[] sorted = arr.clone();

        // Sort the entire array
        sort(sorted, 0, sorted.length - 1);

        return sorted;
    }

    /**
     * Recursively sorts the subarray from low to high.
     */
    private static void sort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pivotIndex = partition(arr, low, high);
            // Recursively sort left and right partitions
            sort(arr, low, pivotIndex - 1);
            sort(arr, pivotIndex + 1, high);
        }
    }

    /**
     * Partitions the array using Lomuto scheme (last element as pivot).
     *
     * @return The final index of the pivot element
     */
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Choose last element as pivot
        int i = low - 1;       // Index of smaller element

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Place pivot in correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; // Return pivot index
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {10, 80, 30, 90, 40, 50, 70};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array:   " + Arrays.toString(quickSort(numbers)));

        // Test edge cases
        System.out.println("Empty Array:    " + Arrays.toString(quickSort(new int[]{})));
        System.out.println("Single Element: " + Arrays.toString(quickSort(new int[]{42})));
        System.out.println("Already Sorted: " + Arrays.toString(quickSort(new int[]{1, 2, 3, 4, 5})));
        System.out.println("Reverse Sorted: " + Arrays.toString(quickSort(new int[]{5, 4, 3, 2, 1})));
    }
}