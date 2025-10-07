using System;

/// <summary>
/// TernarySearch class provides methods to perform ternary search for:
/// - Finding the peak in a unimodal (mountain) array
/// - Maximizing a unimodal function over a continuous interval
/// </summary>
public class TernarySearch
{
    /// <summary>
    /// Finds the index of the maximum element in a unimodal (mountain) array.
    /// The array must first increase, then decrease.
    /// </summary>
    /// <param name="arr">Sorted unimodal array of integers.</param>
    /// <returns>Index of the peak element; -1 if input is invalid.</returns>
    public static int TernarySearchPeak(int[] arr)
    {
        // Handle edge cases
        if (arr == null || arr.Length == 0) return -1;
        if (arr.Length == 1) return 0;

        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            // If range is small, resolve directly
            if (right - left < 2)
            {
                return arr[left] >= arr[right] ? left : right;
            }

            int mid1 = left + (right - left) / 3;
            int mid2 = right - (right - left) / 3;

            if (arr[mid1] < arr[mid2])
            {
                // Peak is in the right two-thirds
                left = mid1 + 1;
            }
            else
            {
                // Peak is in the left two-thirds
                right = mid2 - 1;
            }
        }

        return -1; // Should not reach here for valid input
    }

    /// <summary>
    /// Finds the x-value that maximizes a unimodal function f(x) within [left, right].
    /// </summary>
    /// <param name="f">Unimodal function to maximize (as Func delegate).</param>
    /// <param name="left">Left bound of search interval.</param>
    /// <param name="right">Right bound of search interval.</param>
    /// <param name="precision">Desired precision (e.g., 1e-9).</param>
    /// <returns>Approximate x-value where f(x) is maximum.</returns>
    public static double TernarySearchFunctionMax(Func<double, double> f, double left, double right, double precision = 1e-9)
    {
        while (right - left > precision)
        {
            double mid1 = left + (right - left) / 3.0;
            double mid2 = right - (right - left) / 3.0;

            if (f(mid1) < f(mid2))
            {
                left = mid1;
            }
            else
            {
                right = mid2;
            }
        }

        return (left + right) / 2;
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Ternary Search Examples");

        // --- Example 1: Find peak in unimodal array ---
        Console.WriteLine("\n🎯 Example 1: Finding Peak in Array");
        int[] data = { 1, 3, 5, 7, 8, 6, 4, 2 };
        Console.WriteLine($"Array: [{string.Join(", ", data)}]");

        int peakIndex = TernarySearchPeak(data);
        if (peakIndex != -1)
        {
            Console.WriteLine($"✅ Peak found at index {peakIndex} → value = {data[peakIndex]}");
        }
        else
        {
            Console.WriteLine("❌ No peak found.");
        }

        // --- Example 2: Maximize a mathematical function ---
        Console.WriteLine("\n📈 Example 2: Maximizing a Function");
        Func<double, double> f = x => -(x - 3) * (x - 3) + 10; // Parabola with max at x=3
        Console.WriteLine("Function: f(x) = -(x - 3)² + 10");
        Console.WriteLine("Searching maximum in range [0, 6]...");

        double maxX = TernarySearchFunctionMax(f, 0, 6);
        double maxY = f(maxX);

        Console.WriteLine($"✅ Maximum at x ≈ {maxX:F6}");
        Console.WriteLine($"   f({maxX:F6}) = {maxY:F6}");
    }
}