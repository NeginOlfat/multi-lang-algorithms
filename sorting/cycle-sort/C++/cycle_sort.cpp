#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sorts a vector using Cycle Sort.
 *
 * @param arr The vector to be sorted (modified in-place).
 * @return    Number of writes performed (for analysis).
 *
 * Time Complexity: O(n²) — due to nested loops
 * Space Complexity: O(1)
 *
 * ✅ Minimizes memory writes — ideal for flash/EPPROM
 * ✅ Each element written at most once to final position
 * ❌ Not stable
 */
int cycleSort(std::vector<int>& arr) {
    int writes = 0;
    int n = arr.size();

    // Handle edge cases
    if (n <= 1) return writes;

    // Traverse the array and cycle-sort each element
    for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        int item = arr[cycleStart];
        int pos = cycleStart;

        // Step 1: Count how many elements are smaller than `item`
        for (int i = cycleStart + 1; i < n; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        // If item is already in correct position, skip
        if (pos == cycleStart) continue;

        // Skip duplicates: elements equal to `item` that are already placed
        while (pos < n && arr[pos] == item) {
            pos++;
        }

        // Place `item` in its correct position
        if (pos < n) {
            std::swap(arr[pos], item);
            writes++;
        }

        // Step 2: Complete the cycle
        // Continue until we return to the starting position
        while (pos != cycleStart) {
            pos = cycleStart;

            // Recalculate correct position for current `item`
            for (int i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            // Skip duplicates
            while (pos < n && arr[pos] == item) {
                pos++;
            }

            // Place `item` in its correct position
            if (pos < n) {
                std::swap(arr[pos], item);
                writes++;
            }
        }
    }

    return writes;
}

/**
 * Returns a new sorted vector (non-mutating).
 *
 * @param arr The input vector.
 * @return    A new sorted vector.
 */
std::vector<int> cycleSortStable(const std::vector<int>& arr) {
    std::vector<int> sorted = arr;
    cycleSort(sorted);
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
    std::vector<int> numbers = {3, 2, 1, 4};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = cycleSortStable(numbers);
    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with duplicates
    std::vector<int> withDuplicates = {4, 2, 1, 2, 3};
    std::cout << "\nWith Duplicates - Original: ";
    printArray(withDuplicates);
    std::cout << std::endl;
    std::cout << "Sorted: ";
    printArray(cycleSortStable(withDuplicates));
    std::cout << std::endl;

    // Test with already sorted
    std::vector<int> alreadySorted = {1, 2, 3, 4, 5};
    std::cout << "\nAlready Sorted - Original: ";
    printArray(alreadySorted);
    std::cout << std::endl;
    std::cout << "Sorted: ";
    printArray(cycleSortStable(alreadySorted));
    std::cout << std::endl;

    // Test with reverse order
    std::vector<int> reverse = {5, 4, 3, 2, 1};
    std::cout << "\nReverse - Original: ";
    printArray(reverse);
    std::cout << std::endl;

    std::vector<int> sortedReverse = reverse;
    int writeCount = cycleSort(sortedReverse);
    std::cout << "Sorted: ";
    printArray(sortedReverse);
    std::cout << std::endl;
    std::cout << "Writes performed: " << writeCount << std::endl;

    // Test with single element
    std::vector<int> single = {42};
    std::cout << "\nSingle Element: ";
    printArray(cycleSortStable(single));
    std::cout << std::endl;

    // Test with empty array
    std::vector<int> empty = {};
    std::cout << "Empty Array: ";
    printArray(cycleSortStable(empty));
    std::cout << std::endl;

    return 0;
}