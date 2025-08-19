/**
 * Sorts an array using Comb Sort.
 *
 * @param {number[]} arr - The array to be sorted (modified in-place).
 * @returns {number[]} - The sorted array.
 *
 * Time Complexity:
 * - Best/Average: O(n log n) with shrink factor 1.3
 * - Worst: O(n²)
 *
 * Space Complexity: O(1) — in-place sorting
 *
 * ✅ Improves Bubble Sort by eliminating "turtles" (small values near the end)
 * ✅ Uses shrink factor of 1.3 (empirically optimal)
 * ❌ Not stable
 */
function combSort(arr) {
    if (arr.length <= 1) return arr;

    const n = arr.length;
    let gap = n;
    const shrinkFactor = 1.3;
    let swapped = true;

    // Continue until gap is 1 AND no swaps occurred
    while (gap > 1 || swapped) {
        // Shrink gap by shrink factor
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1;

        swapped = false;

        // Compare elements with current gap
        for (let i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                // Swap elements
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swapped = true;
            }
        }
    }

    return arr;
}

// Helper: Returns a new sorted array (non-mutating)
function combSortStable(arr) {
    return combSort([...arr]);
}

// Example Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original Array:", numbers);

const sorted = combSortStable(numbers);
console.log("Sorted Array:", sorted);

// Test with already sorted
const sortedArr = [1, 2, 3, 4, 5];
console.log("\nAlready Sorted:", combSortStable(sortedArr));

// Test with reverse order
const reverse = [9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log("Reverse Sorted:", combSortStable(reverse));

// Test with duplicates
const duplicates = [5, 2, 8, 2, 9, 1, 5];
console.log("With Duplicates:", combSortStable(duplicates));

// Test with single element
const single = [42];
console.log("Single Element:", combSortStable(single));

// Test with empty array
const empty = [];
console.log("Empty Array:", combSortStable(empty));

// Test with two elements
const two = [2, 1];
console.log("Two Elements:", combSortStable(two));