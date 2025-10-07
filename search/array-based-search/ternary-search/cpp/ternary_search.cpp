#include <iostream>
#include <vector>
#include <functional>

/**
 * Finds the index of the maximum element in a unimodal (mountain) array.
 * The array must first increase, then decrease.
 *
 * @param arr Sorted unimodal vector of integers.
 * @return Index of the peak element; -1 if input is invalid.
 */
int ternarySearchPeak(const std::vector<int>& arr) {
    // Handle edge cases
    if (arr.empty()) return -1;
    if (arr.size() == 1) return 0;

    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;

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
 * @param f         Unimodal function to maximize (as std::function).
 * @param left      Left bound of search interval.
 * @param right     Right bound of search interval.
 * @param precision Desired precision (e.g., 1e-9).
 * @return Approximate x-value where f(x) is maximum.
 */
double ternarySearchFunctionMax(
    const std::function<double(double)>& f,
    double left,
    double right,
    double precision = 1e-9
) {
    while (right - left > precision) {
        double mid1 = left + (right - left) / 3.0;
        double mid2 = right - (right - left) / 3.0;

        if (f(mid1) < f(mid2)) {
            left = mid1;
        } else {
            right = mid2;
        }
    }

    return (left + right) / 2;
}

// Example usage and demonstration
int main() {
    std::cout << "🔍 Ternary Search Examples\n";

    // --- Example 1: Find peak in unimodal array ---
    std::cout << "\n🎯 Example 1: Finding Peak in Array\n";
    std::vector<int> data = {1, 3, 5, 7, 8, 6, 4, 2};

    std::cout << "Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";

    int peakIndex = ternarySearchPeak(data);
    if (peakIndex != -1) {
        std::cout << "✅ Peak found at index " << peakIndex << " → value = " << data[peakIndex] << ".\n";
    } else {
        std::cout << "❌ No peak found.\n";
    }

    // --- Example 2: Maximize a mathematical function ---
    std::cout << "\n📈 Example 2: Maximizing a Function\n";
    auto f = [](double x) -> double {
        return -(x - 3) * (x - 3) + 10; // Parabola with max at x=3
    };
    std::cout << "Function: f(x) = -(x - 3)² + 10\n";
    std::cout << "Searching maximum in range [0, 6]...\n";

    double maxX = ternarySearchFunctionMax(f, 0, 6);
    double maxY = f(maxX);

    std::cout.precision(6);
    std::cout << std::fixed;
    std::cout << "✅ Maximum at x ≈ " << maxX << "\n";
    std::cout << "   f(" << maxX << ") = " << maxY << "\n";

    return 0;
}