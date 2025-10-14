#include <iostream>
#include <vector>

/**
 * Performs Fibonacci Search on a sorted vector.
 *
 * The algorithm divides the array using Fibonacci numbers instead of halving,
 * avoiding division operations — making it suitable for embedded systems
 * or environments with slow division.
 *
 * @param arr    Sorted vector of integers.
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int fibonacciSearch(const std::vector<int>& arr, int target) {
    int n = static_cast<int>(arr.size());

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
        int i = (offset + fib2) < (n - 1) ? (offset + fib2) : (n - 1);

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
int main() {
    std::cout << "🔍 Fibonacci Search Example\n";

    std::vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80};
    int targetValue = 60;

    std::cout << "Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
    std::cout << "Target: " << targetValue << "\n\n";

    int result = fibonacciSearch(data, targetValue);

    if (result != -1) {
        std::cout << "✅ Found " << targetValue << " at index " << result << ".\n";
    } else {
        std::cout << "❌ " << targetValue << " not found in the array.\n";
    }

    return 0;
}