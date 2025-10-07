/**
 * JumpSearch class provides a static method to perform jump search on a sorted array.
 */
public class JumpSearch {

    /**
     * Performs jump search on a sorted array.
     *
     * @param arr    Sorted array of integers.
     * @param target Value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int jumpSearch(int[] arr, int target) {
        int n = arr.length;

        // Handle empty array
        if (n == 0) return -1;

        // Optimal jump size is √n
        int step = (int) Math.floor(Math.sqrt(n));
        int prev = 0; // Starting index of current block

        // Jump forward in blocks until arr[Math.min(step, n) - 1] >= target
        while (step < n && arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += (int) Math.floor(Math.sqrt(n));
        }

        // Perform linear search within the identified block
        for (int i = prev; i < Math.min(step, n); i++) {
            if (arr[i] == target) {
                return i; // Return index if found
            }
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🚶‍♂️ Jump Search Example");

        int[] data = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int targetValue = 7;

        System.out.println("Array: [" + String.join(", ", java.util.Arrays.stream(data)
                .mapToObj(String::valueOf).toArray(String[]::new)) + "]");
        System.out.println("Target: " + targetValue);
        System.out.println();

        int result = jumpSearch(data, targetValue);

        if (result != -1) {
            System.out.println("✅ Found " + targetValue + " at index " + result + ".");
        } else {
            System.out.println("❌ " + targetValue + " not found in the array.");
        }
    }
}