/**
 * BinarySearch class provides static methods for binary search (iterative and recursive).
 */
public class BinarySearch {

    /**
     * Performs binary search on a sorted array (iterative version).
     *
     * @param arr    Sorted array of integers.
     * @param target The value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2; // Prevents overflow
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

    /**
     * Performs binary search on a sorted array (recursive version).
     *
     * @param arr    Sorted array of integers.
     * @param target The value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int binarySearchRecursive(int[] arr, int target) {
        return binarySearchRecursiveHelper(arr, target, 0, arr.length - 1);
    }

    /**
     * Helper method for recursive binary search.
     *
     * @param arr    Sorted array.
     * @param target Value to search.
     * @param left   Left bound.
     * @param right  Right bound.
     * @return Index of target or -1.
     */
    private static int binarySearchRecursiveHelper(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1; // Base case: not found
        }

        int mid = left + (right - left) / 2; // Prevent overflow
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursiveHelper(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursiveHelper(arr, target, left, mid - 1);
        }
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🔍 Binary Search Examples");

        int[] data = {10, 20, 30, 40, 50, 60, 70, 80};
        int targetValue = 60;

        System.out.println("Array: [" + String.join(", ", java.util.Arrays.stream(data).mapToObj(String::valueOf).toArray(String[]::new)) + "]");
        System.out.println("Target: " + targetValue);
        System.out.println();

        // --- Iterative Version ---
        int resultIter = binarySearch(data, targetValue);
        if (resultIter != -1) {
            System.out.println("✅ [Iterative] Found " + targetValue + " at index " + resultIter + ".");
        } else {
            System.out.println("❌ [Iterative] " + targetValue + " not found.");
        }

        // --- Recursive Version ---
        int resultRec = binarySearchRecursive(data, targetValue);
        if (resultRec != -1) {
            System.out.println("✅ [Recursive] Found " + targetValue + " at index " + resultRec + ".");
        } else {
            System.out.println("❌ [Recursive] " + targetValue + " not found.");
        }
    }
}