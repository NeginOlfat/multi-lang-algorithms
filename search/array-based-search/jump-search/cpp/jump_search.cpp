#include <iostream>
#include <vector>
#include <cmath>

/**
 * Performs jump search on a sorted vector.
 *
 * @param arr    Sorted vector of integers.
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int jumpSearch(const std::vector<int>& arr, int target) {
    int n = arr.size();

    // Handle empty array
    if (n == 0) return -1;

    // Optimal jump size is √n
    int step = static_cast<int>(std::floor(std::sqrt(n)));
    int prev = 0; // Starting index of current block

    // Jump forward in blocks until arr[std::min(step, n) - 1] >= target
    while (step < n && arr[std::min(step, n) - 1] < target) {
        prev = step;
        step += static_cast<int>(std::floor(std::sqrt(n)));
    }

    // Perform linear search within the identified block
    for (int i = prev; i < std::min(step, n); ++i) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }

    return -1; // Not found
}

// Example usage and demonstration
int main() {
    std::cout << "🚶‍♂️ Jump Search Example\n";

    std::vector<int> data = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int targetValue = 7;

    std::cout << "Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
    std::cout << "Target: " << targetValue << "\n\n";

    int result = jumpSearch(data, targetValue);

    if (result != -1) {
        std::cout << "✅ Found " << targetValue << " at index " << result << ".\n";
    } else {
        std::cout << "❌ " << targetValue << " not found in the array.\n";
    }

    return 0;
}