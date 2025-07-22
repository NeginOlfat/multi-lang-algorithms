/**
 * Sorts an array using the Bubble Sort algorithm.
 * 
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} - A new sorted array (original is not modified).
 * 
 * Time Complexity:
 * - Best Case: O(n) when array is already sorted (with optimization)
 * - Average/Worst Case: O(n²)
 * Space Complexity: O(1)
 */
function bubbleSort(arr) {
    // Create a copy to avoid mutating the original array
    const sorted = [...arr];
    const n = sorted.length;

    // If array has 0 or 1 element, it's already sorted
    if (n < 2) return sorted;

    // Outer loop: run for each element
    for (let i = 0; i < n - 1; i++) {
        let swapped = false; // Optimization flag

        // Inner loop: compare adjacent elements
        // After each pass, largest element "bubbles up", so reduce range by i
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                // Swap elements
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                swapped = true;
            }
        }

        // Early exit: if no swaps occurred, array is sorted
        if (!swapped) break;
    }

    return sorted;
}

// Example Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original Array:", numbers);
console.log("Sorted Array:", bubbleSort(numbers));

// Test with already sorted array (to show best-case O(n) behavior)
const sortedArray = [1, 2, 3, 4, 5];
console.log("Already Sorted:", bubbleSort(sortedArray));