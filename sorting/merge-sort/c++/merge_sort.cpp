#include <iostream>
#include <vector>

/**
 * Merge Sort Algorithm (C++)
 *
 * A divide-and-conquer sorting algorithm that:
 * 1. Divides the array into two halves
 * 2. Recursively sorts each half
 * 3. Merges the two sorted halves
 *
 * Time Complexity:
 *   Best, Average, Worst: O(n log n)
 * Space Complexity: O(n) - due to auxiliary arrays during merge
 *
 * Note: This version returns a new sorted vector (non-mutating).
 * The original vector remains unchanged.
 */

/**
 * Merges two sorted vectors into one sorted vector.
 *
 * @param left  Left sorted subvector
 * @param right Right sorted subvector
 * @return Merged sorted vector
 */
std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> result;
    size_t i = 0; // Pointer for left vector
    size_t j = 0; // Pointer for right vector

    // Compare elements and add the smaller one to result
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i]);
            i++;
        } else {
            result.push_back(right[j]);
            j++;
        }
    }

    // Append remaining elements from left (if any)
    while (i < left.size()) {
        result.push_back(left[i]);
        i++;
    }

    // Append remaining elements from right (if any)
    while (j < right.size()) {
        result.push_back(right[j]);
        j++;
    }

    return result;
}

/**
 * Sorts a vector using the Merge Sort algorithm.
 *
 * @param arr The vector of comparable elements to be sorted.
 * @return A new sorted vector.
 */
std::vector<int> mergeSort(const std::vector<int>& arr) {
    // Base case: vectors with 0 or 1 element are already sorted
    if (arr.size() <= 1) {
        return arr;
    }

    // Divide: split the vector into two halves
    size_t mid = arr.size() / 2;
    std::vector<int> leftHalf(arr.begin(), arr.begin() + mid);
    std::vector<int> rightHalf(arr.begin() + mid, arr.end());

    // Conquer: recursively sort both halves
    std::vector<int> leftSorted = mergeSort(leftHalf);
    std::vector<int> rightSorted = mergeSort(rightHalf);

    // Combine: merge the two sorted halves
    return merge(leftSorted, rightSorted);
}

// Helper function to print a vector
void printVector(const std::vector<int>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); i++) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]";
}

// Example Usage
int main() {
    std::vector<int> numbers = {38, 27, 43, 3, 9, 82, 10};

    std::cout << "Original Array: ";
    printVector(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = mergeSort(numbers);

    std::cout << "Sorted Array: ";
    printVector(sorted);
    std::cout << std::endl;

    // Verify original is unchanged
    std::cout << "Original After Sort: ";
    printVector(numbers);
    std::cout << std::endl;

    // Test edge cases
    std::cout << "Already Sorted: ";
    printVector(mergeSort({1, 2, 3, 4, 5}));
    std::cout << std::endl;

    std::cout << "Reverse Sorted: ";
    printVector(mergeSort({5, 4, 3, 2, 1}));
    std::cout << std::endl;

    std::cout << "Single Element: ";
    printVector(mergeSort({42}));
    std::cout << std::endl;

    std::cout << "Empty Array: ";
    printVector(mergeSort({}));
    std::cout << std::endl;

    return 0;
}