/**
 * SentinelSearch class provides a static method to perform sentinel search on an array.
 *
 * This algorithm places the target as a "sentinel" at the end of the array,
 * eliminating the need for index-bound checks during iteration — reducing comparisons per step.
 */
public class SentinelSearch {

    /**
     * Performs Sentinel Search on an array by placing the target as a sentinel at the end.
     *
     * @param arr    Array of integers (does not need to be sorted).
     * @param target Value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int sentinelSearch(int[] arr, int target) {
        int n = arr.length;

        // Handle empty array
        if (n == 0) return -1;

        // Save the last element
        int lastElement = arr[n - 1];

        // Place the target as sentinel at the end
        arr[n - 1] = target;

        // Start searching from the beginning
        int i = 0;
        while (arr[i] != target) {
            i++;
        }

        // Restore the original last element
        arr[n - 1] = lastElement;

        // Check if the found element is valid
        if (i < n - 1 || lastElement == target) {
            return i; // Found in valid position
        } else {
            return -1; // Not present
        }
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🔍 Sentinel Search Example");

        int[] data = {10, 20, 35, 40, 50};
        int targetValue = 35;

        System.out.print("Original Array: [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i < data.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println("Target: " + targetValue);
        System.out.println();

        int result = sentinelSearch(data, targetValue);

        if (result != -1) {
            System.out.println("✅ Found " + targetValue + " at index " + result + ".");
        } else {
            System.out.println("❌ " + targetValue + " not found in the array.");
        }

        System.out.print("Array after search: [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i < data.length - 1) System.out.print(", ");
        }
        System.out.println("]"); // Should be unchanged
    }
}