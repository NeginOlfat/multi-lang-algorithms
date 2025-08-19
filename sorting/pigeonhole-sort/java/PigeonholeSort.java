import java.util.*;

/**
 * Sorts an array using Pigeonhole Sort.
 */
public class PigeonholeSort {

    /**
     * Sorts an array using Pigeonhole Sort.
     *
     * @param arr The array to be sorted.
     * @return    A new sorted array (original is not modified).
     *
     * Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
     * Space Complexity: O(n + k) for the pigeonholes
     *
     * ✅ Stable: preserves relative order of equal elements
     * ✅ Works with negative numbers
     * ❌ Not in-place
     * ❌ Only efficient when range k is small and close to n
     */
    public static int[] pigeonholeSort(int[] arr) {
        // Handle edge cases
        if (arr == null || arr.length <= 1) {
            return arr == null ? null : arr.clone();
        }

        // Find min and max to determine range
        int min = Arrays.stream(arr).min().getAsInt();
        int max = Arrays.stream(arr).max().getAsInt();
        int range = max - min + 1;

        // Step 1: Create pigeonholes (one for each possible value)
        List<List<Integer>> pigeonholes = new ArrayList<>();
        for (int i = 0; i < range; i++) {
            pigeonholes.add(new ArrayList<>());
        }

        // Step 2: Place each element in its corresponding pigeonhole
        for (int value : arr) {
            int index = value - min; // Map value to hole index
            pigeonholes.get(index).add(value); // Preserve order (stable)
        }

        // Step 3: Reconstruct sorted array by iterating through holes
        List<Integer> sortedList = new ArrayList<>();
        for (List<Integer> hole : pigeonholes) {
            sortedList.addAll(hole);
        }

        // Convert back to array
        return sortedList.stream().mapToInt(Integer::intValue).toArray();
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {8, 3, 5, 3, 1, 7};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(pigeonholeSort(numbers)));

        // Test with negative numbers
        int[] withNegatives = {-1, -5, 2, 0, 2, -5, 1};
        System.out.println("\nWith Negatives: " + Arrays.toString(withNegatives));
        System.out.println("Sorted (handles negatives): " + Arrays.toString(pigeonholeSort(withNegatives)));

        // Test with already sorted
        int[] alreadySorted = {1, 2, 3, 4, 5};
        System.out.println("\nAlready Sorted: " + Arrays.toString(alreadySorted));
        System.out.println("Sorted: " + Arrays.toString(pigeonholeSort(alreadySorted)));

        // Test with reverse order
        int[] reverse = {5, 4, 3, 2, 1};
        System.out.println("\nReverse Order: " + Arrays.toString(reverse));
        System.out.println("Sorted: " + Arrays.toString(pigeonholeSort(reverse)));

        // Test with duplicates
        int[] duplicates = {4, 2, 8, 2, 9, 1, 5};
        System.out.println("\nWith Duplicates: " + Arrays.toString(duplicates));
        System.out.println("Sorted: " + Arrays.toString(pigeonholeSort(duplicates)));

        // Test with single element
        int[] single = {42};
        System.out.println("\nSingle Element: " + Arrays.toString(pigeonholeSort(single)));

        // Test with empty array
        int[] empty = {};
        System.out.println("Empty Array: " + Arrays.toString(pigeonholeSort(empty)));

        // Test with all same values
        int[] same = {3, 3, 3};
        System.out.println("All Same: " + Arrays.toString(pigeonholeSort(same)));
    }
}