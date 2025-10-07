#include <iostream>
#include <vector>

/**
 * Performs binary search on a sorted vector (iterative version).
 *
 * @param arr    Sorted vector of integers.
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int binarySearchIterative(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents overflow
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

/**
 * Helper function for recursive binary search.
 *
 * @param arr    Sorted vector.
 * @param target Value to search.
 * @param left   Left bound.
 * @param right  Right bound.
 * @return       Index of target or -1.
 */
int binarySearchRecursiveHelper(const std::vector<int>& arr, int target, int left, int right) {
    if (left > right) {
        return -1; // Base case: not found
    }

    int mid = left + (right - left) / 2; // Overflow-safe midpoint
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursiveHelper(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursiveHelper(arr, target, left, mid - 1);
    }
}

/**
 * Public wrapper for recursive binary search.
 *
 * @param arr    Sorted vector of integers.
 * @param target Value to search for.
 * @return       Index of the target if found; -1 otherwise.
 */
int binarySearchRecursive(const std::vector<int>& arr, int target) {
    return binarySearchRecursiveHelper(arr, target, 0, static_cast<int>(arr.size()) - 1);
}

// Example usage and demonstration
int main() {
    std::cout << "🔍 Binary Search Examples\n";

    std::vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80};
    int targetValue = 60;

    std::cout << "Array: [";
    for (size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i];
        if (i < data.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
    std::cout << "Target: " << targetValue << "\n\n";

    // --- Iterative Version ---
    int resultIter = binarySearchIterative(data, targetValue);
    if (resultIter != -1) {
        std::cout << "✅ [Iterative] Found " << targetValue << " at index " << resultIter << ".\n";
    } else {
        std::cout << "❌ [Iterative] " << targetValue << " not found.\n";
    }

    // --- Recursive Version ---
    int resultRec = binarySearchRecursive(data, targetValue);
    if (resultRec != -1) {
        std::cout << "✅ [Recursive] Found " << targetValue << " at index " << resultRec << ".\n";
    } else {
        std::cout << "❌ [Recursive] " << targetValue << " not found.\n";
    }

    return 0;
}