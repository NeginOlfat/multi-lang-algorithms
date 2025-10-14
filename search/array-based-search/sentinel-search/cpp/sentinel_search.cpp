#include <iostream>
#include <vector>

/**
 * Performs Sentinel Search on a vector by placing the target as a sentinel at the end.
 *
 * This eliminates the need for index-bound checks during iteration,
 * reducing comparisons per element from 2 to 1.
 *
 * @param arr    Vector of integers (does not need to be sorted).
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int sentinelSearch(std::vector<int>& arr, int target) {
    int n = static_cast<int>(arr.size());

    // Handle empty array
    if (n == 0) return -1;

    // Save the last element
    int lastElement = arr[n - 1];

    // Place the target as sentinel at the end
    arr[n - 1] = target;

    // Start searching from the beginning
    int i = 0;
    while (arr[i] != target) {
        i++;
    }

    // Restore the original last element
    arr[n - 1] = lastElement;

    // Check if the found element is valid
    if (i < n - 1 || lastElement == target) {
        return i; // Found in valid position
    } else {
        return -1; // Not present
    }
}

// Example usage and demonstration
int main() {
    std::cout << "🔍 Sentinel Search Example\n";

    std::vector<int> data = {10, 20, 35, 40, 50};
    int targetValue = 35;

    std::cout << "Original Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
    std::cout << "Target: " << targetValue << "\n\n";

    int result = sentinelSearch(data, targetValue);

    if (result != -1) {
        std::cout << "✅ Found " << targetValue << " at index " << result << ".\n";
    } else {
        std::cout << "❌ " << targetValue << " not found in the array.\n";
    }

    std::cout << "Array after search: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n"; // Should be unchanged

    return 0;
}