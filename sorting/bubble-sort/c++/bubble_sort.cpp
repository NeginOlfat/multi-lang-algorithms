#include <iostream>
#include <vector>
#include <algorithm> // For std::copy

/**
 * Sorts an array using the Bubble Sort algorithm.
 *
 * @param arr The input vector to be sorted.
 * @return A new sorted vector (original is not modified).
 *
 * Time Complexity:
 * - Best Case: O(n) when array is already sorted (with optimization)
 * - Average/Worst Case: O(n²)
 * Space Complexity: O(n) due to copy, O(1) extra space
 */
std::vector<int> bubbleSort(const std::vector<int>& arr) {
    // Create a copy to avoid mutating the original array
    std::vector<int> sorted = arr;
    int n = sorted.size();

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Outer loop: run for each element
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false; // Optimization flag

        // Inner loop: compare adjacent elements
        // After each pass, largest element "bubbles up"
        // So reduce range by i
        for (int j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                // Swap elements
                std::swap(sorted[j], sorted[j + 1]);
                swapped = true;
            }
        }

        // Early exit: if no swaps occurred, array is sorted
        if (!swapped) break;
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
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = bubbleSort(numbers);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted array (to show best-case O(n) behavior)
    std::vector<int> sortedArray = {1, 2, 3, 4, 5};
    std::cout << "Already Sorted: ";
    printArray(bubbleSort(sortedArray));
    std::cout << std::endl;

    return 0;
}