#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

/**
 * Extracts the i-th digit from a number (from right, 0-indexed).
 *
 * @param num   The number
 * @param i     Digit position (0 = ones, 1 = tens, etc.)
 * @return      The digit value
 *
 * Example: getDigit(170, 0) → 0 (ones place)
 *          getDigit(170, 1) → 7 (tens place)
 *          getDigit(170, 2) → 1 (hundreds place)
 */
int getDigit(int num, int i) {
    return (num / static_cast<int>(std::pow(10, i))) % 10;
}

/**
 * Stable counting sort based on the i-th digit (LSD, 0-indexed).
 *
 * @param arr    The vector to sort
 * @param digit  Which digit to sort by (0 = ones, 1 = tens, etc.)
 * @return       A new sorted vector
 */
std::vector<int> countingSortByDigit(const std::vector<int>& arr, int digit) {
    const int BASE = 10;
    std::vector<int> count(BASE, 0);
    std::vector<int> output(arr.size());

    // Step 1: Count frequency of each digit
    for (int num : arr) {
        int d = getDigit(num, digit);
        count[d]++;
    }

    // Step 2: Compute cumulative count
    for (int i = 1; i < BASE; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build output array from right to left (for stability)
    for (int i = arr.size() - 1; i >= 0; i--) {
        int num = arr[i];
        int d = getDigit(num, digit);
        int pos = count[d] - 1;
        output[pos] = num;
        count[d]--;
    }

    return output;
}

/**
 * Sorts a vector of non-negative integers using Radix Sort (LSD method).
 *
 * @param arr The input vector to be sorted.
 * @return    A new sorted vector (original is not modified).
 *
 * Time Complexity: O(d × n) where d = number of digits, n = length
 * Space Complexity: O(n + k) where k = base (10 for decimal)
 *
 * ✅ Stable: uses Counting Sort for each digit
 * ✅ Efficient for fixed-length keys (e.g., phone numbers, IDs)
 * ❌ Only works with non-negative integers
 */
std::vector<int> radixSort(const std::vector<int>& arr) {
    // Handle edge cases
    if (arr.size() <= 1) {
        return arr;
    }

    // Find the maximum number to determine number of digits
    int max = *std::max_element(arr.begin(), arr.end());
    int digits = (max == 0) ? 1 : static_cast<int>(std::floor(std::log10(max))) + 1;

    // Make a copy to avoid mutation
    std::vector<int> sorted = arr;

    // Process each digit from least significant to most significant
    for (int digit = 0; digit < digits; digit++) {
        sorted = countingSortByDigit(sorted, digit);
    }

    return sorted;
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
    std::vector<int> numbers = {170, 45, 75, 90, 2, 802, 24, 66};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = radixSort(numbers);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with single-digit and duplicates
    std::vector<int> small = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    std::cout << "\nSmall Array: ";
    printArray(small);
    std::cout << std::endl;

    std::cout << "Sorted: ";
    printArray(radixSort(small));
    std::cout << std::endl;

    // Test with repeated patterns
    std::vector<int> repeated = {222, 111, 333, 121, 212};
    std::cout << "\nRepeated Digits: ";
    printArray(repeated);
    std::cout << std::endl;

    std::cout << "Sorted: ";
    printArray(radixSort(repeated));
    std::cout << std::endl;

    // Test edge case with zeros
    std::vector<int> edgeCase = {0, 0, 1, 10, 100};
    std::cout << "\nEdge Case: ";
    printArray(edgeCase);
    std::cout << std::endl;

    std::cout << "Sorted: ";
    printArray(radixSort(edgeCase));
    std::cout << std::endl;

    return 0;
}