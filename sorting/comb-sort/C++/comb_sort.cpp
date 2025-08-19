#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using Comb Sort.
 *
 * @param arr The vector to be sorted (modified in-place).
 *
 * Time Complexity:
 * - Best/Average: O(n log n) with shrink factor 1.3
 * - Worst: O(n²)
 *
 * Space Complexity: O(1) — in-place sorting
 *
 * ✅ Improves Bubble Sort by eliminating "turtles" (small values near the end)
 * ✅ Uses shrink factor of 1.3 (empirically optimal)
 * ❌ Not stable
 */
void combSort(std::vector<int>& arr) {
    // Handle edge cases
    if (arr.size() <= 1) return;

    int n = arr.size();
    int gap = n;
    const double SHRINK_FACTOR = 1.3;
    bool swapped = true;

    // Continue until gap is 1 AND no swaps occurred
    while (gap > 1 || swapped) {
        // Shrink gap by shrink factor
        gap = static_cast<int>(gap / SHRINK_FACTOR);
        if (gap < 1) {
            gap = 1;
        }

        swapped = false;

        // Compare elements with current gap
        for (int i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                // Swap elements
                std::swap(arr[i], arr[i + gap]);
                swapped = true;
            }
        }
    }
}

/**
 * Returns a new sorted vector (non-mutating).
 *
 * @param arr The input vector.
 * @return    A new sorted vector.
 */
std::vector<int> combSortStable(const std::vector<int>& arr) {
    std::vector<int> sorted = arr;
    combSort(sorted);
    return sorted;
}

// Helper: Print a vector
void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i];
        if (i < arr.size() - 1) std::cout << ", ";
    }
    std::cout << "]";
}

// Example Usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = combSortStable(numbers);
    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted
    std::vector<int> sortedArr = {1, 2, 3, 4, 5};
    std::cout << "\nAlready Sorted: ";
    printArray(combSortStable(sortedArr));
    std::cout << std::endl;

    // Test with reverse order
    std::vector<int> reverse = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    std::cout << "Reverse Sorted: ";
    printArray(combSortStable(reverse));
    std::cout << std::endl;

    // Test with duplicates
    std::vector<int> duplicates = {5, 2, 8, 2, 9, 1, 5};
    std::cout << "With Duplicates: ";
    printArray(combSortStable(duplicates));
    std::cout << std::endl;

    // Test with single element
    std::vector<int> single = {42};
    std::cout << "Single Element: ";
    printArray(combSortStable(single));
    std::cout << std::endl;

    // Test with empty array
    std::vector<int> empty = {};
    std::cout << "Empty Array: ";
    printArray(combSortStable(empty));
    std::cout << std::endl;

    // Test with two elements
    std::vector<int> two = {2, 1};
    std::cout << "Two Elements: ";
    printArray(combSortStable(two));
    std::cout << std::endl;

    return 0;
}