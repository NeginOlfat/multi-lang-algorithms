/**
 * LinearSearch class provides a static method to perform linear search on an array.
 */
public class LinearSearch {

    /**
     * Performs linear search on an array to find the index of the target value.
     *
     * @param arr    The array to search in.
     * @param target The value to search for.
     * @return Index of the target if found; -1 if not found.
     */
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return index if target is found
            }
        }
        return -1; // Return -1 if target is not found
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        // Sample data
        int[] data = {10, 50, 30, 70, 80, 20, 90, 40};
        int targetValue = 20;

        // Perform linear search
        int result = linearSearch(data, targetValue);

        // Output result 
        if (result != -1) {
            System.out.println("✅ Found " + targetValue + " at index " + result + ".");
        } else {
            System.out.println("❌ " + targetValue + " not found in the array.");
        }
    }
}