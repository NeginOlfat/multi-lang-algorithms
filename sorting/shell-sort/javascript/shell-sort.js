/**
 * Sorts an array using Shell Sort with Knuth's gap sequence.
 *
 * @param {number[]} arr - The array to be sorted (modified in-place).
 * @returns {number[]} - The sorted array.
 *
 * Time Complexity:
 * - Best: O(n log n)
 * - Average: O(n^1.3) approx
 * - Worst: O(n²) — depends on gap sequence
 *
 * Space Complexity: O(1) — in-place sorting
 *
 * ✅ Based on Insertion Sort but with decreasing gaps
 * ✅ Uses Knuth sequence: 1, 4, 13, 40, ... (gap = 3*gap + 1)
 * ❌ Not stable
 */
function shellSort(arr) {
    if (arr.length <= 1) return arr;

    let n = arr.length;
    let gap = 1;

    // Find the largest gap in Knuth sequence: 1, 4, 13, 40, ...
    // Such that gap < n / 3
    while (gap < Math.floor(n / 3)) {
        gap = 3 * gap + 1; // 1, 4, 13, 40, 121, ...
    }

    // Perform gapped insertion sort for each gap
    while (gap > 0) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;

            // Shift elements that are `gap` apart until correct position is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            // Place temp in its correct location
            arr[j] = temp;
        }

        // Reduce gap using Knuth's formula: (gap - 1) / 3
        gap = Math.floor((gap - 1) / 3);
    }

    return arr;
}

// Example Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original Array:", numbers);

// Use slice() to avoid mutating original
const sorted = shellSort([...numbers]);
console.log("Sorted Array:", sorted);

// Test with already sorted array
const sortedArr = [1, 2, 3, 4, 5];
console.log("Already Sorted:", shellSort([...sortedArr]));

// Test with reverse-sorted
const reverse = [9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log("Reverse Sorted:", shellSort([...reverse]));

// Test with duplicates
const duplicates = [5, 2, 8, 2, 9, 1, 5];
console.log("With Duplicates:", shellSort([...duplicates]));