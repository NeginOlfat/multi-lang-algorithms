/**
 * Sorts an array using the Counting Sort algorithm.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} - A new sorted array (original is not modified).
 *
 * Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
 * Space Complexity: O(k) for the count array
 *
 * ✅ Stable: preserves relative order of equal elements
 * ✅ Works with negative numbers
 * ❌ Not in-place
 */
function countingSort(arr) {
    // Handle edge cases
    if (arr.length <= 1) return [...arr];

    // Find min and max to determine range
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1; // Shift all values to non-negative indices

    // Step 1: Count frequency of each element
    const count = new Array(range).fill(0);
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++; // Shift index by min
    }

    // Step 2: Compute cumulative count
    // Now count[i] contains count of elements <= (i + min)
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build output array from right to left (for stability)
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const value = arr[i];
        const countIndex = value - min;

        // Place element at its final position
        const position = count[countIndex] - 1;
        output[position] = value;

        // Decrement count for next occurrence of same value
        count[countIndex]--;
    }

    return output;
}

// Example Usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
console.log("Original Array:", numbers);
console.log("Sorted Array:", countingSort(numbers));

// Test with negative numbers
const withNegatives = [-1, -5, 2, 0, 2, -5, 1];
console.log("With Negatives:", withNegatives);
console.log("Sorted (handles negatives):", countingSort(withNegatives));

// Test stability with objects (using value property)
function countingSortStableObjects(arr) {
    if (arr.length <= 1) return [...arr];

    const min = Math.min(...arr.map(item => item.value));
    const max = Math.max(...arr.map(item => item.value));
    const range = max - min + 1;

    const count = new Array(range).fill(0);
    for (let i = 0; i < arr.length; i++) {
        count[arr[i].value - min]++;
    }

    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const item = arr[i];
        const pos = count[item.value - min] - 1;
        output[pos] = item;
        count[item.value - min]--;
    }

    return output;
}

// Test stability
const people = [
    { name: "Alice", value: 2 },
    { name: "Bob", value: 1 },
    { name: "Charlie", value: 2 },
    { name: "David", value: 1 }
];
const sortedPeople = countingSortStableObjects(people);
console.log("Stability Test (by value):");
sortedPeople.forEach(p => console.log(`${p.name}: ${p.value}`));