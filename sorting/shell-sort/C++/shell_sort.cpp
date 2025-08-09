#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using Shell Sort with Knuth's gap sequence.
 *
 * @param arr The vector to be sorted (modified in-place).
 *
 * Time Complexity:
 * - Best: O(n log n)
 * - Average: O(n^1.3) approx
 * - Worst: O(n²) — depends on gap sequence
 *
 * Space Complexity: O(1) — in-place sorting
 *
 * ✅ Based on Insertion Sort but with decreasing gaps
 * ✅ Uses Knuth sequence: 1, 4, 13, 40, ... (gap = 3*gap + 1)
 * ❌ Not stable
 */
void shellSort(std::vector<int>& arr) {
    // Handle edge cases
    if (arr.size() <= 1) return;

    int n = arr.size();
    int gap = 1;

    // Find the largest gap in Knuth sequence: 1, 4, 13, 40, ...
    // Such that gap < n / 3
    while (gap < n / 3) {
        gap = 3 * gap + 1; // 1, 4, 13, 40, 121, ...
    }

    // Perform gapped insertion sort for each gap
    while (gap > 0) {
        // Do a gapped insertion sort for this gap size
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;

            // Shift elements that are `gap` apart until correct position is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            // Place temp in its correct location
            arr[j] = temp;
        }

        // Reduce gap using Knuth's formula: (gap - 1) / 3
        gap = (gap - 1) / 3;
    }
}

// Helper function to print a vector
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

    std::vector<int> sorted = numbers; // Copy to avoid mutation
    shellSort(sorted);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted array
    std::vector<int> sortedArr = {1, 2, 3, 4, 5};
    std::cout << "Already Sorted: ";
    shellSort(sortedArr);
    printArray(sortedArr);
    std::cout << std::endl;

    // Test with reverse-sorted
    std::vector<int> reverse = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    std::cout << "Reverse Sorted: ";
    shellSort(reverse);
    printArray(reverse);
    std::cout << std::endl;

    // Test with duplicates
    std::vector<int> duplicates = {5, 2, 8, 2, 9, 1, 5};
    std::cout << "With Duplicates: ";
    shellSort(duplicates);
    printArray(duplicates);
    std::cout << std::endl;

    // Test with single element
    std::vector<int> single = {42};
    std::cout << "Single Element: ";
    shellSort(single);
    printArray(single);
    std::cout << std::endl;

    // Test with empty array
    std::vector<int> empty = {};
    std::cout << "Empty Array: ";
    shellSort(empty);
    printArray(empty);
    std::cout << std::endl;

    return 0;
}