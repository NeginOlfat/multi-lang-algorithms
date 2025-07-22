/**
 * Merge Sort Algorithm (JavaScript)
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
 * Note: This version returns a new sorted array (non-mutating).
 * The original array remains unchanged.
 */

/**
 * Sorts an array using the Merge Sort algorithm.
 *
 * @param {Array} arr - The array of comparable elements to be sorted.
 * @returns {Array} A new sorted array.
 */
function mergeSort(arr) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Divide: split the array into two halves
    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    // Conquer: recursively sort both halves
    const leftSorted = mergeSort(leftHalf);
    const rightSorted = mergeSort(rightHalf);

    // Combine: merge the two sorted halves
    return merge(leftSorted, rightSorted);
}

/**
 * Merges two sorted arrays into one sorted array.
 *
 * @param {Array} left - Left sorted subarray
 * @param {Array} right - Right sorted subarray
 * @returns {Array} Merged sorted array
 */
function merge(left, right) {
    const result = [];
    let i = 0; // Pointer for left array
    let j = 0; // Pointer for right array

    // Compare elements and add the smaller one to result
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Append remaining elements from left (if any)
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // Append remaining elements from right (if any)
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

// Example Usage
const numbers = [38, 27, 43, 3, 9, 82, 10];
console.log("Original Array:", numbers);

const sortedNumbers = mergeSort(numbers);
console.log("Sorted Array:", sortedNumbers);

// Verify original is unchanged
console.log("Original After Sort:", numbers);

// Test edge cases
console.log("Already Sorted:", mergeSort([1, 2, 3, 4, 5]));
console.log("Reverse Sorted:", mergeSort([5, 4, 3, 2, 1]));
console.log("Single Element:", mergeSort([42]));
console.log("Empty Array:", mergeSort([]));
console.log("Two Elements:", mergeSort([2, 1]));