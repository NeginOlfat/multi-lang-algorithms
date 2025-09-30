#include <iostream>
#include <vector>

/**
 * Performs linear search on a vector to find the index of the target value.
 *
 * @param arr    The vector to search in.
 * @param target The value to search for.
 * @return       Index of the target if found; -1 if not found.
 */
int linearSearch(const std::vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return static_cast<int>(i); // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Example usage and demonstration
int main() {
    // Sample data
    std::vector<int> data = {10, 50, 30, 70, 80, 20, 90, 40};
    int targetValue = 20;

    // Perform linear search
    int result = linearSearch(data, targetValue);

    // Output result
    if (result != -1) {
        std::cout << "✅ Found " << targetValue << " at index " << result << ".\n";
    } else {
        std::cout << "❌ " << targetValue << " not found in the array.\n";
    }

    return 0;
}