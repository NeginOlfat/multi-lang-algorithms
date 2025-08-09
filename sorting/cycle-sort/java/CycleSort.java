import java.util.Arrays;

/**
 * Sorts an array using Cycle Sort.
 */
public class CycleSort {

    /**
     * Sorts an array using Cycle Sort.
     *
     * @param arr The array to be sorted (modified in-place).
     * @return    Number of writes performed (for analysis).
     *
     * Time Complexity: O(n²) — due to nested loops
     * Space Complexity: O(1)
     *
     * ✅ Minimizes memory writes — ideal for flash/EPPROM
     * ✅ Each element written at most once to final position
     * ❌ Not stable
     */
    public static int cycleSort(int[] arr) {
        int writes = 0;
        int n = arr.length;

        // Traverse the array and cycle-sort each element
        for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
            int item = arr[cycleStart];
            int pos = cycleStart;

            // Step 1: Count how many elements are smaller than `item`
            for (int i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            // If item is already in correct position, skip
            if (pos == cycleStart) {
                continue;
            }

            // Skip duplicates: elements equal to `item` that are already placed
            while (pos < n && arr[pos] == item) {
                pos++;
            }

            // Place `item` in its correct position
            if (pos < n) {
                int temp = arr[pos];
                arr[pos] = item;
                item = temp;
                writes++;
            }

            // Step 2: Complete the cycle
            // Continue until we return to the starting position
            while (pos != cycleStart) {
                pos = cycleStart;

                // Recalculate correct position for current `item`
                for (int i = cycleStart + 1; i < n; i++) {
                    if (arr[i] < item) {
                        pos++;
                    }
                }

                // Skip duplicates
                while (pos < n && arr[pos] == item) {
                    pos++;
                }

                // Place `item` in its correct position
                if (pos < n) {
                    int temp = arr[pos];
                    arr[pos] = item;
                    item = temp;
                    writes++;
                }
            }
        }

        return writes;
    }

    /**
     * Returns a new sorted array (non-mutating).
     *
     * @param arr The input array.
     * @return    A new sorted array.
     */
    public static int[] cycleSortStable(int[] arr) {
        int[] sorted = arr.clone();
        cycleSort(sorted);
        return sorted;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {3, 2, 1, 4};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(cycleSortStable(numbers)));

        // Test with duplicates
        int[] withDuplicates = {4, 2, 1, 2, 3};
        System.out.println("\nWith Duplicates - Original: " + Arrays.toString(withDuplicates));
        System.out.println("Sorted: " + Arrays.toString(cycleSortStable(withDuplicates)));

        // Test with already sorted
        int[] alreadySorted = {1, 2, 3, 4, 5};
        System.out.println("\nAlready Sorted - Original: " + Arrays.toString(alreadySorted));
        System.out.println("Sorted: " + Arrays.toString(cycleSortStable(alreadySorted)));

        // Test with reverse order
        int[] reverse = {5, 4, 3, 2, 1};
        System.out.println("\nReverse - Original: " + Arrays.toString(reverse));
        int[] sortedReverse = reverse.clone();
        int writeCount = cycleSort(sortedReverse);
        System.out.println("Sorted: " + Arrays.toString(sortedReverse));
        System.out.println("Writes performed: " + writeCount);

        // Test with single element
        int[] single = {42};
        System.out.println("\nSingle Element: " + Arrays.toString(cycleSortStable(single)));

        // Test with empty array
        int[] empty = {};
        System.out.println("Empty Array: " + Arrays.toString(cycleSortStable(empty)));
    }
}