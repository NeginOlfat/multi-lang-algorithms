#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

/**
 * Sorts a vector using Pigeonhole Sort.
 *
 * @param arr The vector to be sorted.
 * @return    A new sorted vector (original is not modified).
 *
 * Time Complexity: O(n + k) where n = size, k = range (max - min + 1)
 * Space Complexity: O(n + k) for the pigeonholes
 *
 * ✅ Stable: preserves relative order of equal elements
 * ✅ Works with negative numbers
 * ❌ Not in-place
 * ❌ Only efficient when range k is small and close to n
 */
std::vector<int> pigeonholeSort(const std::vector<int>& arr) {
    // Handle edge cases
    if (arr.size() <= 1) {
        return arr;
    }

    // Find min and max to determine range
    int min_val = *std::min_element(arr.begin(), arr.end());
    int max_val = *std::max_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;

    // Step 1: Create pigeonholes (one for each possible value)
    std::vector<std::vector<int>> pigeonholes(range);

    // Step 2: Place each element in its corresponding pigeonhole
    for (int value : arr) {
        int index = value - min_val; // Map value to hole index
        pigeonholes[index].push_back(value); // Preserve order (stable)
    }

    // Step 3: Reconstruct sorted array by iterating through holes
    std::vector<int> sorted;
    for (const auto& hole : pigeonholes) {
        for (int value : hole) {
            sorted.push_back(value);
        }
    }

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
    std::vector<int> numbers = {8, 3, 5, 3, 1, 7};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = pigeonholeSort(numbers);
    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with negative numbers
    std::vector<int> withNegatives = {-1, -5, 2, 0, 2, -5, 1};
    std::cout << "\nWith Negatives: ";
    printArray(withNegatives);
    std::cout << std::endl;
    std::cout << "Sorted (handles negatives): ";
    printArray(pigeonholeSort(withNegatives));
    std::cout << std::endl;

    // Test with already sorted
    std::vector<int> alreadySorted = {1, 2, 3, 4, 5};
    std::cout << "\nAlready Sorted: ";
    printArray(alreadySorted);
    std::cout << std::endl;
    std::cout << "Sorted: ";
    printArray(pigeonholeSort(alreadySorted));
    std::cout << std::endl;

    // Test with reverse order
    std::vector<int> reverse = {5, 4, 3, 2, 1};
    std::cout << "\nReverse Order: ";
    printArray(reverse);
    std::cout << std::endl;
    std::cout << "Sorted: ";
    printArray(pigeonholeSort(reverse));
    std::cout << std::endl;

    // Test with duplicates
    std::vector<int> duplicates = {4, 2, 8, 2, 9, 1, 5};
    std::cout << "\nWith Duplicates: ";
    printArray(duplicates);
    std::cout << std::endl;
    std::cout << "Sorted: ";
    printArray(pigeonholeSort(duplicates));
    std::cout << std::endl;

    // Test with single element
    std::vector<int> single = {42};
    std::cout << "\nSingle Element: ";
    printArray(pigeonholeSort(single));
    std::cout << std::endl;

    // Test with empty array
    std::vector<int> empty = {};
    std::cout << "Empty Array: ";
    printArray(pigeonholeSort(empty));
    std::cout << std::endl;

    // Test with all same values
    std::vector<int> same = {3, 3, 3};
    std::cout << "All Same: ";
    printArray(pigeonholeSort(same));
    std::cout << std::endl;

    return 0;
}