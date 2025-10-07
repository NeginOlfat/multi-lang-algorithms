#include <iostream>
#include <vector>

/**
 * Performs interpolation search on a sorted vector.
 *
 * @param arr    Sorted vector of integers (preferably uniformly distributed).
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int interpolationSearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    // Handle empty array
    if (low > high) return -1;

    while (low <= high && arr[low] <= target && target <= arr[high]) {
        // Avoid division by zero when all values in range are equal
        if (arr[high] == arr[low]) {
            return (arr[low] == target) ? low : -1;
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
int main() {
    std::cout << "🔍 Interpolation Search Example\n";

    std::vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    int targetValue = 70;

    std::cout << "Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
    std::cout << "Target: " << targetValue << "\n\n";

    int result = interpolationSearch(data, targetValue);

    if (result != -1) {
        std::cout << "✅ Found " << targetValue << " at index " << result << ".\n";
    } else {
        std::cout << "❌ " << targetValue << " not found in the array.\n";
    }

    return 0;
}