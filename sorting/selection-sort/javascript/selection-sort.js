/**
 * Selection Sort Algorithm (JavaScript)
 *
 * Sorts an array by repeatedly finding the minimum element from the unsorted part
 * and putting it at the beginning.
 *
 * Time Complexity:
 *   Best, Average, Worst: O(n²)
 * Space Complexity: O(1) — sorts in-place (if modifying original), or O(n) if copying
 *
 * Note: This version returns a new sorted array without modifying the original.
 */

/**
 * Sorts an array using the Selection Sort algorithm.
 *
 * @param {Array} arr - The array of comparable elements to be sorted.
 * @returns {Array} A new sorted array (original is not modified).
 */
function selectionSort(arr) {
    // Create a copy to avoid mutating the original array
    const sorted = [...arr];
    const n = sorted.length;

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Traverse through all array elements (except the last one)
    for (let i = 0; i < n - 1; i++) {
        // Assume the first unsorted element is the minimum
        let minIndex = i;

        // Find the actual minimum element in the remaining unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (sorted[j] < sorted[minIndex]) {
                minIndex = j;
            }
        }

        // Swap only if a smaller element was found
        if (minIndex !== i) {
            [sorted[i], sorted[minIndex]] = [sorted[minIndex], sorted[i]];
        }
    }

    return sorted;
}

// Example Usage
const numbers = [64, 25, 12, 22, 11];
console.log("Original Array:", numbers);
console.log("Sorted Array:", selectionSort(numbers));

// Test with already sorted array
const sortedArray = [1, 2, 3, 4, 5];
console.log("Already Sorted:", selectionSort(sortedArray));

// Test with one element
console.log("Single Element:", selectionSort([42]));