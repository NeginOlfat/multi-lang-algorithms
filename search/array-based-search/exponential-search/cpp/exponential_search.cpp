#include <iostream>
#include <vector>

/**
 * Performs exponential search on a sorted vector.
 *
 * Steps:
 * 1. Find the range where the target could be by doubling the index.
 * 2. Perform binary search within that range.
 *
 * @param arr    Sorted vector of integers.
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int exponentialSearch(const std::vector<int>& arr, int target) {
    int n = static_cast<int>(arr.size());

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
    int right = (i < n) ? i : n - 1;

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
int main() {
    std::cout << "🔍 Exponential Search Example\n";

    std::vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int targetValue = 70;

    std::cout << "Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
    std::cout << "Target: " << targetValue << "\n\n";

    int result = exponentialSearch(data, targetValue);

    if (result != -1) {
        std::cout << "✅ Found " << targetValue << " at index " << result << ".\n";
    } else {
        std::cout << "❌ " << targetValue << " not found in the array.\n";
    }

    return 0;
}