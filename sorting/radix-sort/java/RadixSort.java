import java.util.Arrays;

/**
 * Sorts an array of non-negative integers using Radix Sort (LSD method).
 */
public class RadixSort {

    /**
     * Sorts an array using Radix Sort (LSD).
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity: O(d × n) where d = number of digits, n = length
     * Space Complexity: O(n + k) where k = base (10 for decimal)
     *
     * ✅ Stable: uses Counting Sort for each digit
     * ✅ Efficient for fixed-length keys (e.g., phone numbers, IDs)
     * ❌ Only works with non-negative integers
     */
    public static int[] radixSort(int[] arr) {
        // Handle edge cases
        if (arr == null || arr.length <= 1) {
            return arr == null ? null : arr.clone();
        }

        // Find the maximum number to determine number of digits
        int max = Arrays.stream(arr).max().getAsInt();
        int digits = max == 0 ? 1 : (int) Math.floor(Math.log10(max)) + 1;

        // Make a copy to avoid mutation
        int[] sorted = arr.clone();

        // Process each digit from least significant to most significant
        for (int digit = 0; digit < digits; digit++) {
            sorted = countingSortByDigit(sorted, digit);
        }

        return sorted;
    }

    /**
     * Stable counting sort based on the i-th digit (LSD, 0-indexed).
     *
     * @param arr    The array to sort
     * @param digit  Which digit to sort by (0 = ones, 1 = tens, etc.)
     * @return A new sorted array
     */
    private static int[] countingSortByDigit(int[] arr, int digit) {
        final int BASE = 10;
        int[] count = new int[BASE];
        int[] output = new int[arr.length];

        // Step 1: Count frequency of each digit
        for (int num : arr) {
            int d = getDigit(num, digit);
            count[d]++;
        }

        // Step 2: Compute cumulative count
        for (int i = 1; i < BASE; i++) {
            count[i] += count[i - 1];
        }

        // Step 3: Build output array from right to left (for stability)
        for (int i = arr.length - 1; i >= 0; i--) {
            int num = arr[i];
            int d = getDigit(num, digit);
            int pos = count[d] - 1;
            output[pos] = num;
            count[d]--;
        }

        return output;
    }

    /**
     * Extracts the i-th digit from a number (from right, 0-indexed).
     *
     * @param num   The number
     * @param i     Digit position (0 = ones, 1 = tens, etc.)
     * @return      The digit value
     *
     * Example:
     *   getDigit(170, 0) → 0 (ones place)
     *   getDigit(170, 1) → 7 (tens place)
     *   getDigit(170, 2) → 1 (hundreds place)
     */
    private static int getDigit(int num, int i) {
        return (num / (int) Math.pow(10, i)) % 10;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {170, 45, 75, 90, 2, 802, 24, 66};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(radixSort(numbers)));

        // Test with single-digit and duplicates
        int[] small = {3, 1, 4, 1, 5, 9, 2, 6, 5};
        System.out.println("\nSmall Array: " + Arrays.toString(small));
        System.out.println("Sorted: " + Arrays.toString(radixSort(small)));

        // Test with repeated patterns
        int[] repeated = {222, 111, 333, 121, 212};
        System.out.println("\nRepeated Digits: " + Arrays.toString(repeated));
        System.out.println("Sorted: " + Arrays.toString(radixSort(repeated)));

        // Test edge case with zeros
        int[] edgeCase = {0, 0, 1, 10, 100};
        System.out.println("\nEdge Case: " + Arrays.toString(edgeCase));
        System.out.println("Sorted: " + Arrays.toString(radixSort(edgeCase)));
    }
}