/**
 * Sorts an array using Pigeonhole Sort.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} - A new sorted array (original is not modified).
 *
 * Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
 * Space Complexity: O(n + k) for the pigeonholes
 *
 * ✅ Stable: preserves relative order of equal elements
 * ✅ Works with negative numbers
 * ❌ Not in-place
 * ❌ Only efficient when range k is small and close to n
 */
function pigeonholeSort(arr) {
    // Handle edge cases
    if (arr.length <= 1) return [...arr];

    // Find min and max to determine range
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1; // Shift all values to non-negative indices

    // Step 1: Create pigeonholes (one for each possible value)
    const pigeonholes = Array.from({ length: range }, () => []);

    // Step 2: Place each element in its corresponding pigeonhole
    for (let value of arr) {
        const index = value - min; // Map value to hole index
        pigeonholes[index].push(value); // Preserve order (stable)
    }

    // Step 3: Reconstruct sorted array by iterating through holes
    const sorted = [];
    for (let hole of pigeonholes) {
        for (let value of hole) {
            sorted.push(value);
        }
    }

    return sorted;
}

// Example Usage
const numbers = [8, 3, 5, 3, 1, 7];
console.log("Original Array:", numbers);
console.log("Sorted Array:", pigeonholeSort(numbers));

// Test with negative numbers
const withNegatives = [-1, -5, 2, 0, 2, -5, 1];
console.log("\nWith Negatives:", withNegatives);
console.log("Sorted (handles negatives):", pigeonholeSort(withNegatives));

// Test with already sorted
const alreadySorted = [1, 2, 3, 4, 5];
console.log("\nAlready Sorted:", alreadySorted);
console.log("Sorted:", pigeonholeSort(alreadySorted));

// Test with reverse order
const reverse = [5, 4, 3, 2, 1];
console.log("\nReverse Order:", reverse);
console.log("Sorted:", pigeonholeSort(reverse));

// Test with duplicates
const duplicates = [4, 2, 8, 2, 9, 1, 5];
console.log("\nWith Duplicates:", duplicates);
console.log("Sorted:", pigeonholeSort(duplicates));

// Test with single element
const single = [42];
console.log("\nSingle Element:", pigeonholeSort(single));

// Test with empty array
const empty = [];
console.log("Empty Array:", pigeonholeSort(empty));

// Test with all same values
const same = [3, 3, 3];
console.log("All Same:", pigeonholeSort(same));