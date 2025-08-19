#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <functional>  // For std::function

/**
 * Simplified Intro Sort (Introspective Sort) - Educational Version
 *
 * Phases:
 * 1. Quick Sort (fast average case)
 * 2. Switch to Heap Sort if recursion depth is too deep
 * 3. Use Insertion Sort for small subarrays
 *
 * For learning only — not production
 *
 * In real projects, use: std::sort(arr.begin(), arr.end());
 * (C++ std::sort uses Intro Sort internally!)
 */

std::vector<int> introSort(const std::vector<int>& arr) {
    if (arr.size() <= 1) {
        return arr;
    }

    // Max allowed depth: 2 * floor(log2(n))
    int maxDepth = 2 * static_cast<int>(std::floor(std::log2(arr.size())));
    std::vector<int> sorted = arr; // Copy input (non-mutating)

    // Insertion Sort for small subarrays
    auto insertionSort = [](std::vector<int>& arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    };

    // Forward declaration for recursive heapify
    std::function<void(std::vector<int>&, int, int, int)> heapify;

    // Heapify a subtree (0-based index with offset)
    heapify = [&heapify](std::vector<int>& arr, int n, int i, int offset) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[offset + left] > arr[offset + largest]) {
            largest = left;
        }
        if (right < n && arr[offset + right] > arr[offset + largest]) {
            largest = right;
        }

        if (largest != i) {
            std::swap(arr[offset + i], arr[offset + largest]);
            heapify(arr, n, largest, offset);
        }
    };

    // Heap Sort
    auto heapSort = [&heapify](std::vector<int>& arr, int left, int right) {
        int n = right - left + 1;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, left);
        }

        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            std::swap(arr[left], arr[left + i]);
            heapify(arr, i, 0, left);
        }
    };

    // Median-of-three pivot and partition
    auto partition = [](std::vector<int>& arr, int left, int right) {
        int mid = (left + right) / 2;

        // Sort arr[left], arr[mid], arr[right] to get median at mid
        if (arr[mid] < arr[left]) std::swap(arr[left], arr[mid]);
        if (arr[right] < arr[left]) std::swap(arr[left], arr[right]);
        if (arr[right] < arr[mid]) std::swap(arr[mid], arr[right]);

        int pivot = arr[mid];
        std::swap(arr[mid], arr[right]); // Move pivot to end

        int i = left;
        for (int j = left; j < right; j++) {
            if (arr[j] <= pivot) {
                std::swap(arr[i], arr[j]);
                i++;
            }
        }
        std::swap(arr[i], arr[right]);
        return i;
    };

    // Forward declaration for recursive introSortLoop
    std::function<void(std::vector<int>&, int, int, int)> introSortLoop;

    // Recursive Intro Sort loop
    introSortLoop = [&introSortLoop, &insertionSort, &heapSort, &partition](std::vector<int>& arr, int left, int right, int depthLimit) {
        // Small array: use Insertion Sort
        if (right - left + 1 <= 16) {
            insertionSort(arr, left, right);
            return;
        }

        // Too deep: switch to Heap Sort
        if (depthLimit <= 0) {
            heapSort(arr, left, right);
            return;
        }

        // Otherwise: Quick Sort
        int pivotIndex = partition(arr, left, right);
        introSortLoop(arr, left, pivotIndex - 1, depthLimit - 1);
        introSortLoop(arr, pivotIndex + 1, right, depthLimit - 1);
    };

    // Start sorting
    introSortLoop(sorted, 0, sorted.size() - 1, maxDepth);
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

    std::vector<int> sorted = introSort(numbers);
    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted
    std::vector<int> sortedArr = {1, 2, 3, 4, 5};
    std::cout << "\nAlready Sorted: ";
    printArray(introSort(sortedArr));
    std::cout << std::endl;

    // Test with reverse
    std::vector<int> reverse = {5, 4, 3, 2, 1};
    std::cout << "Reverse Sorted: ";
    printArray(introSort(reverse));
    std::cout << std::endl;

    // Test with duplicates
    std::vector<int> duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    std::cout << "With Duplicates: ";
    printArray(introSort(duplicates));
    std::cout << std::endl;

    // Test with single element
    std::vector<int> single = {42};
    std::cout << "Single Element: ";
    printArray(introSort(single));
    std::cout << std::endl;

    // Test with two elements
    std::vector<int> two = {2, 1};
    std::cout << "Two Elements: ";
    printArray(introSort(two));
    std::cout << std::endl;

    return 0;
}