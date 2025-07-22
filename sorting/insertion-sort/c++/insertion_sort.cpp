#include <iostream>
#include <vector>

/**
 * Insertion Sort Algorithm (C++)
 *
 * Sorts an array by building a sorted section one element at a time.
 * This version does NOT modify the original array (non-mutating).
 *
 * Time Complexity:
 *   Best Case:  O(n)     - when array is already sorted
 *   Average Case: O(n²)
 *   Worst Case: O(n²)    - when array is reverse sorted
 * Space Complexity: O(n) - due to copying the input
 */

/**
 * Sorts a vector using Insertion Sort (non-mutating).
 *
 * @param arr The input vector of comparable elements.
 * @return A new sorted vector (original is not modified).
 */
std::vector<int> insertionSort(const std::vector<int>& arr) {
    // Create a copy to avoid mutating the original array
    std::vector<int> sorted = arr;
    int n = sorted.size();

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Traverse from the second element (index 1) to the end
    for (int i = 1; i < n; i++) {
        int key = sorted[i]; // Current element to position
        int j = i - 1;       // Index of last element in sorted portion

        // Move elements greater than key one position ahead
        while (j >= 0 && sorted[j] > key) {
            sorted[j + 1] = sorted[j];
            j--;
        }

        // Insert the key at its correct position
        sorted[j + 1] = key;
    }

    return sorted;
}

// Helper function to print a vector
void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (int i = 0; i < arr.size(); i++) {
        std::cout << arr[i];
        if (i < arr.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]";
}

// Example Usage
int main() {
    std::vector<int> numbers = {12, 11, 13, 5, 6};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = insertionSort(numbers);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Verify original is unchanged
    std::cout << "Original After Sort: ";
    printArray(numbers);
    std::cout << std::endl;

    // Test other cases
    std::cout << "Already Sorted: ";
    printArray(insertionSort({1, 2, 3, 4, 5}));
    std::cout << std::endl;

    std::cout << "Reverse Sorted: ";
    printArray(insertionSort({5, 4, 3, 2, 1}));
    std::cout << std::endl;

    std::cout << "Single Element: ";
    printArray(insertionSort({42}));
    std::cout << std::endl;

    std::cout << "Empty Array: ";
    printArray(insertionSort({}));
    std::cout << std::endl;

    return 0;
}