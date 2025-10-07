/**
 * ExponentialSearch class provides a static method to perform exponential search on a sorted array.
 */
public class ExponentialSearch {

    /**
     * Performs exponential search on a sorted array.
     *
     * Steps:
     * 1. Find the range where the target could be by doubling the index.
     * 2. Perform binary search within that range.
     *
     * @param arr    Sorted array of integers.
     * @param target Value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int exponentialSearch(int[] arr, int target) {
        int n = arr.length;

        // Handle empty array
        if (n == 0) return -1;

        // Step 1: Check if the first element is the target
        if (arr[0] == target) return 0;

        // Find the range [i/2, min(i, n-1)] by doubling i
        int i = 1;
        while (i < n && arr[i] < target) {
            i *= 2; // Exponential growth: 1 → 2 → 4 → 8 → ...
        }

        // Now perform binary search in the range [i/2, min(i, n-1)]
        int left = i / 2;
        int right = Math.min(i, n - 1);

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🔍 Exponential Search Example");

        int[] data = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
        int targetValue = 70;

        System.out.print("Array: [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i < data.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println("Target: " + targetValue);
        System.out.println();

        int result = exponentialSearch(data, targetValue);

        if (result != -1) {
            System.out.println("✅ Found " + targetValue + " at index " + result + ".");
        } else {
            System.out.println("❌ " + targetValue + " not found in the array.");
        }
    }
}