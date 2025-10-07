/**
 * InterpolationSearch class provides a static method to perform interpolation search on a sorted array.
 */
public class InterpolationSearch {

    /**
     * Performs interpolation search on a sorted array.
     *
     * @param arr    Sorted array of integers (preferably uniformly distributed).
     * @param target Value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int interpolationSearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        // Handle empty array
        if (low > high) return -1;

        while (low <= high && arr[low] <= target && target <= arr[high]) {
            // Avoid division by zero when all values in the range are equal
            if (arr[high] == arr[low]) {
                return arr[low] == target ? low : -1;
            }

            // Estimate position using interpolation formula
            int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);

            // Safety: ensure pos is within bounds (prevent extrapolation errors)
            if (pos < low || pos > high) {
                break; // Likely due to non-uniform distribution
            }

            // Check if estimated position holds the target
            if (arr[pos] == target) {
                return pos;
            } else if (arr[pos] < target) {
                low = pos + 1; // Target is in the right subarray
            } else {
                high = pos - 1; // Target is in the left subarray
            }
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🔍 Interpolation Search Example");

        int[] data = {10, 20, 30, 40, 50, 60, 70, 80, 90};
        int targetValue = 70;

        System.out.print("Array: [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i < data.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println("Target: " + targetValue);
        System.out.println();

        int result = interpolationSearch(data, targetValue);

        if (result != -1) {
            System.out.println("✅ Found " + targetValue + " at index " + result + ".");
        } else {
            System.out.println("❌ " + targetValue + " not found in the array.");
        }
    }
}