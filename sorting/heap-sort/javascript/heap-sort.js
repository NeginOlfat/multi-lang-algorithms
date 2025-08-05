/**
 * Sorts an array using the Heap Sort algorithm.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} - A new sorted array (original is not modified).
 *
 * Time Complexity:
 * - Best/Average/Worst: O(n log n)
 * Space Complexity: O(1) extra space (if in-place), O(n) if preserving input
 */
function heapSort(arr) {
    // Create a copy to avoid mutating the original array
    const sorted = [...arr];
    const n = sorted.length;

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Build a max heap from the array
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(sorted, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root (max) to end
        [sorted[0], sorted[i]] = [sorted[i], sorted[0]];

        // Restore heap on the reduced heap (0 to i-1)
        heapify(sorted, i, 0);
    }

    return sorted;
}

/**
 * Turns a subtree rooted at index 'i' into a max heap.
 *
 * @param {number[]} heap - The array representing the heap.
 * @param {number} heapSize - Current size of the heap.
 * @param {number} i - Index of the root of the subtree.
 */
function heapify(heap, heapSize, i) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1;  // Left child index
    const right = 2 * i + 2; // Right child index

    // If left child exists and is greater than root
    if (left < heapSize && heap[left] > heap[largest]) {
        largest = left;
    }

    // If right child exists and is greater than current largest
    if (right < heapSize && heap[right] > heap[largest]) {
        largest = right;
    }

    // If the largest is not the root, swap and continue heapifying
    if (largest !== i) {
        [heap[i], heap[largest]] = [heap[largest], heap[i]]; // Swap
        heapify(heap, heapSize, largest); // Recursively heapify the affected subtree
    }
}

// Example Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original Array:", numbers);
console.log("Sorted Array:", heapSort(numbers));

// Test with already sorted array
const sortedArray = [1, 2, 3, 4, 5];
console.log("Already Sorted:", heapSort(sortedArray));