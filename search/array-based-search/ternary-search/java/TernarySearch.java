/**
 * TernarySearch class provides methods to perform ternary search for:
 * - Finding the peak in a unimodal (mountain) array
 * - Maximizing a unimodal function over a continuous interval
 */
public class TernarySearch {

    /**
     * Finds the index of the maximum element in a unimodal (mountain) array.
     * The array must first increase, then decrease.
     *
     * @param arr Sorted unimodal array of integers.
     * @return Index of the peak element; -1 if input is invalid.
     */
    public static int ternarySearchPeak(int[] arr) {
        // Handle edge cases
        if (arr == null || arr.length == 0) return -1;
        if (arr.length == 1) return 0;

        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            // If range is small, resolve directly
            if (right - left < 2) {
                return arr[left] >= arr[right] ? left : right;
            }

            int mid1 = left + (right - left) / 3;
            int mid2 = right - (right - left) / 3;

            if (arr[mid1] < arr[mid2]) {
                // Peak is in the right two-thirds
                left = mid1 + 1;
            } else {
                // Peak is in the left two-thirds
                right = mid2 - 1;
            }
        }

        return -1; // Should not reach here for valid input
    }

    /**
     * Finds the x-value that maximizes a unimodal function f(x) within [left, right].
     *
     * @param f         Unimodal function to maximize (implemented as Functional Interface).
     * @param left      Left bound of search interval.
     * @param right     Right bound of search interval.
     * @param precision Desired precision (e.g., 1e-9).
     * @return Approximate x-value where f(x) is maximum.
     */
    @FunctionalInterface
    public interface Function {
        double apply(double x);
    }

    public static double ternarySearchFunctionMax(Function f, double left, double right, double precision) {
        while (right - left > precision) {
            double mid1 = left + (right - left) / 3.0;
            double mid2 = right - (right - left) / 3.0;

            if (f.apply(mid1) < f.apply(mid2)) {
                left = mid1;
            } else {
                right = mid2;
            }
        }

        return (left + right) / 2;
    }

    // Example usage and demonstration
    public static void main(String[] args) {
        System.out.println("🔍 Ternary Search Examples");

        // --- Example 1: Find peak in unimodal array ---
        System.out.println("\n🎯 Example 1: Finding Peak in Array");
        int[] data = {1, 3, 5, 7, 8, 6, 4, 2};
        System.out.print("Array: [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i < data.length - 1) System.out.print(", ");
        }
        System.out.println("]");

        int peakIndex = ternarySearchPeak(data);
        if (peakIndex != -1) {
            System.out.printf("✅ Peak found at index %d → value = %d%n", peakIndex, data[peakIndex]);
        } else {
            System.out.println("❌ No peak found.");
        }

        // --- Example 2: Maximize a mathematical function ---
        System.out.println("\n📈 Example 2: Maximizing a Function");
        Function f = (x) -> -(x - 3)*(x - 3) + 10; // Parabola with max at x=3
        System.out.println("Function: f(x) = -(x - 3)² + 10");
        System.out.println("Searching maximum in range [0, 6]...");

        double maxX = ternarySearchFunctionMax(f, 0, 6, 1e-9);
        double maxY = f.apply(maxX);

        System.out.printf("✅ Maximum at x ≈ %.6f%n", maxX);
        System.out.printf("   f(%.6f) = %.6f%n", maxX, maxY);
    }
}