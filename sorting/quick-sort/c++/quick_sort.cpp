#include <iostream>
#include <vector>
#include <functional>

/**
 * Sorts an array using the Quick Sort algorithm with Lomuto partition scheme.
 *
 * @param arr The input vector to be sorted.
 * @return A new sorted vector (original is not modified).
 *
 * Time Complexity:
 * - Best/Average: O(n log n)
 * - Worst: O(n²) — rare with random data
 * Space Complexity: O(log n) due to recursion stack
 */
std::vector<int> quickSort(std::vector<int> arr) {
    // Handle small arrays
    if (arr.size() <= 1) {
        return arr;
    }

    // Create a copy to avoid mutating the original
    std::vector<int> sorted = arr;

    // Lambda to partition the array (Lomuto scheme)
    std::function<int(int, int)> partition = [&](int low, int high) -> int {
        int pivot = sorted[high]; // Last element as pivot
        int i = low - 1;          // Index of smaller element

        for (int j = low; j < high; j++) {
            if (sorted[j] <= pivot) {
                i++;
                std::swap(sorted[i], sorted[j]);
            }
        }
        std::swap(sorted[i + 1], sorted[high]);
        return i + 1; // Return pivot index
    };

    // Recursive lambda to sort subarrays
    std::function<void(int, int)> sort = [&](int low, int high) {
        if (low < high) {
            int pivotIndex = partition(low, high);
            sort(low, pivotIndex - 1);
            sort(pivotIndex + 1, high);
        }
    };

    // Start sorting from full range
    sort(0, sorted.size() - 1);

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
    std::vector<int> numbers = {10, 80, 30, 90, 40, 50, 70};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = quickSort(numbers);

    std::cout << "Sorted Array:   ";
    printArray(sorted);
    std::cout << std::endl;

    // Test edge cases
    std::vector<int> empty = {};
    std::vector<int> single = {42};
    std::vector<int> sortedAsc = {1, 2, 3, 4, 5};
    std::vector<int> sortedDesc = {5, 4, 3, 2, 1};

    std::cout << "Empty Array:    ";
    printArray(quickSort(empty));
    std::cout << std::endl;

    std::cout << "Single Element: ";
    printArray(quickSort(single));
    std::cout << std::endl;

    std::cout << "Already Sorted: ";
    printArray(quickSort(sortedAsc));
    std::cout << std::endl;

    std::cout << "Reverse Sorted: ";
    printArray(quickSort(sortedDesc));
    std::cout << std::endl;

    return 0;
}