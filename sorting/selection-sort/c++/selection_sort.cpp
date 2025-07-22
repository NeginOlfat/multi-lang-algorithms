#include <iostream>
#include <vector>

/**
 * Selection Sort Algorithm (C++)
 *
 * Sorts an array by repeatedly finding the minimum element from the unsorted part
 * and putting it at the beginning.
 *
 * Time Complexity:
 *   Best, Average, Worst: O(n²)
 * Space Complexity: O(1) — sorts in-place (if modifying), or O(n) if copying
 *
 * Note: This version returns a new sorted vector without modifying the original.
 */

/**
 * Sorts a vector using the Selection Sort algorithm.
 *
 * @param arr The input vector of comparable elements.
 * @return A new sorted vector (original is not modified).
 */
std::vector<int> selectionSort(const std::vector<int>& arr) {
    // Create a copy to avoid mutating the original array
    std::vector<int> sorted = arr;
    int n = sorted.size();

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Traverse through all elements (except the last one)
    for (int i = 0; i < n - 1; i++) {
        // Assume the first unsorted element is the minimum
        int minIndex = i;

        // Find the actual minimum in the remaining unsorted portion
        for (int j = i + 1; j < n; j++) {
            if (sorted[j] < sorted[minIndex]) {
                minIndex = j;
            }
        }

        // Swap only if a smaller element was found
        if (minIndex != i) {
            std::swap(sorted[i], sorted[minIndex]);
        }
    }

    return sorted;
}

// Helper function to print a vector
void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (int i = 0; i < arr.size(); i++) {
        std::cout << arr[i];
        if (i < arr.size() - 1) std::cout << ", ";
    }
    std::cout << "]";
}

// Example Usage
int main() {
    std::vector<int> numbers = {64, 25, 12, 22, 11};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = selectionSort(numbers);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted array
    std::vector<int> sortedArray = {1, 2, 3, 4, 5};
    std::cout << "Already Sorted: ";
    printArray(selectionSort(sortedArray));
    std::cout << std::endl;

    // Test with single element
    std::vector<int> singleElement = {42};
    std::cout << "Single Element: ";
    printArray(selectionSort(singleElement));
    std::cout << std::endl;

    return 0;
}