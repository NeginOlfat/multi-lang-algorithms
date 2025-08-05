#include <iostream>
#include <vector>

/**
 * Turns a subtree rooted at index 'i' into a max heap.
 *
 * @param heap      Reference to the vector representing the heap.
 * @param heapSize  Current size of the heap.
 * @param i         Index of the root of the subtree.
 */
void heapify(std::vector<int>& heap, int heapSize, int i) {
    int largest = i;           // Initialize largest as root
    int left = 2 * i + 1;      // Left child index
    int right = 2 * i + 2;     // Right child index

    // If left child exists and is greater than root
    if (left < heapSize && heap[left] > heap[largest]) {
        largest = left;
    }

    // If right child exists and is greater than current largest
    if (right < heapSize && heap[right] > heap[largest]) {
        largest = right;
    }

    // If the largest is not the root, swap and continue heapifying
    if (largest != i) {
        std::swap(heap[i], heap[largest]);
        heapify(heap, heapSize, largest); // Recursively heapify the affected subtree
    }
}

/**
 * Sorts a vector using the Heap Sort algorithm.
 *
 * @param arr The input vector to be sorted.
 * @return A new sorted vector (original is not modified).
 *
 * Time Complexity:
 * - Best/Average/Worst: O(n log n)
 * Space Complexity: O(n) due to copy, O(1) extra space
 */
std::vector<int> heapSort(const std::vector<int>& arr) {
    // Create a copy to avoid mutating the original vector
    std::vector<int> sorted = arr;
    int n = sorted.size();

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Build a max heap from the array
    // Start from the last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(sorted, n, i);
    }

    // Extract elements from the heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root (max) to the end
        std::swap(sorted[0], sorted[i]);

        // Restore heap property on the reduced heap (0 to i-1)
        heapify(sorted, i, 0);
    }

    return sorted;
}

// Helper function to print a vector
void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (int i = 0; i < arr.size(); ++i) {
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

    std::vector<int> sorted = heapSort(numbers);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted array
    std::vector<int> sortedArray = {1, 2, 3, 4, 5};
    std::cout << "Already Sorted: ";
    printArray(heapSort(sortedArray));
    std::cout << std::endl;

    return 0;
}