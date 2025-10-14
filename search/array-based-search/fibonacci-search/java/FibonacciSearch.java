/**
 * FibonacciSearch class provides a static method to perform Fibonacci search on a sorted array.
 * 
 * This algorithm uses Fibonacci numbers to divide the array into unequal parts,
 * avoiding division and reducing random memory access — making it cache-friendly
 * and suitable for external storage or systems where division is expensive.
 */
public class FibonacciSearch {

    /**
     * Performs Fibonacci Search on a sorted array.
     *
     * @param arr    Sorted array of integers.
     * @param target Value to search for.
     * @return Index of the target if found; -1 otherwise.
     */
    public static int fibonacciSearch(int[] arr, int target) {
        int n = arr.length;

        // Handle empty array
        if (n == 0) return -1;

        // Generate smallest Fibonacci number >= n
        int fib2 = 0;  // F(k-2)
        int fib1 = 1;  // F(k-1)
        int fib = fib1 + fib2;  // F(k)

        while (fib < n) {
            fib2 = fib1;
            fib1 = fib;
            fib = fib1 + fib2;
        }

        // Marks the eliminated range from front
        int offset = -1;

        // While there are elements to be inspected
        while (fib > 1) {
            // Check index: min(offset + fib2, n - 1)
            int i = Math.min(offset + fib2, n - 1);

            if (arr[i] < target) {
                // Target is in higher section; cut off front part
                fib = fib1;
                fib1 = fib2;
                fib2 = fib - fib1;
                offset = i;
            } else if (arr[i] > target) {
                // Target is in lower section; cut off rear part
                fib = fib2;
                fib1 = fib1 - fib2;
                fib2 = fib - fib1;
            } else {
                // Found the target
                return i;
            }
        }

        // Final check for last element
        if (fib1 == 1 && offset + 1 < n && arr[offset + 1] == target) {
            return offset + 1;
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🔍 Fibonacci Search Example");

        int[] data = {10, 20, 30, 40, 50, 60, 70, 80};
        int targetValue = 60;

        System.out.print("Array: [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i < data.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println("Target: " + targetValue);
        System.out.println();

        int result = fibonacciSearch(data, targetValue);

        if (result != -1) {
            System.out.println("✅ Found " + targetValue + " at index " + result + ".");
        } else {
            System.out.println("❌ " + targetValue + " not found in the array.");
        }
    }
}