/**
 * Insertion Sort Algorithm (JavaScript)
 *
 * Sorts an array by building a sorted section one element at a time.
 * This version does NOT modify the original array (non-mutating).
 *
 * Time Complexity:
 *   Best Case:  O(n)     - when array is already sorted
 *   Average Case: O(n²)
 *   Worst Case: O(n²)    - when array is reverse sorted
 * Space Complexity: O(n) - due to copying the input
 */

/**
 * Sorts an array using Insertion Sort (non-mutating).
 *
 * @param {Array} arr - The array of comparable elements to be sorted.
 * @returns {Array} A new sorted array (original is not modified).
 */
function insertionSort(arr) {
    // Create a copy to avoid mutating the original array
    const sorted = [...arr]; // Equivalent to arr.slice() or arr.copy()
    const n = sorted.length;

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Traverse from the second element (index 1) to the end
    for (let i = 1; i < n; i++) {
        const key = sorted[i]; // Current element to position
        let j = i - 1;         // Index of last element in sorted portion

        // Move elements greater than key one position ahead
        while (j >= 0 && sorted[j] > key) {
            sorted[j + 1] = sorted[j];
            j--;
        }

        // Insert the key at its correct position
        sorted[j + 1] = key;
    }

    return sorted;
}

// Example Usage
const numbers = [12, 11, 13, 5, 6];
console.log("Original Array:", numbers); // Remains unchanged

const sortedNumbers = insertionSort(numbers);
console.log("Sorted Array:", sortedNumbers);

// Verify original is unchanged
console.log("Original After Sort:", numbers);

// Test other cases
console.log("Already Sorted:", insertionSort([1, 2, 3, 4, 5]));
console.log("Reverse Sorted:", insertionSort([5, 4, 3, 2, 1]));
console.log("Single Element:", insertionSort([42]));
console.log("Empty Array:", insertionSort([]));