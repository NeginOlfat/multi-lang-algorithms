/**
 * Sorts an array of non-negative integers using Radix Sort (LSD method).
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} - A new sorted array (original is not modified).
 *
 * Time Complexity: O(d × n) where d = number of digits, n = length
 * Space Complexity: O(n + k) where k = base (10 for decimal)
 *
 * ✅ Stable: uses Counting Sort for each digit
 * ✅ Efficient for fixed-length keys (e.g., phone numbers, IDs)
 * ❌ Only works with non-negative integers
 */
function radixSort(arr) {
    // Handle edge cases
    if (arr.length <= 1) return [...arr];

    // Find the maximum number to determine number of digits
    const max = Math.max(...arr);
    const digits = max === 0 ? 1 : Math.floor(Math.log10(max)) + 1;

    // Make a copy to avoid mutation
    let sorted = [...arr];

    // Process each digit from least significant to most significant
    for (let digit = 0; digit < digits; digit++) {
        sorted = countingSortByDigit(sorted, digit);
    }

    return sorted;
}

/**
 * Stable counting sort based on the i-th digit (LSD, 0-indexed).
 *
 * @param {number[]} arr - Array to sort
 * @param {number} digit - Which digit to sort by (0 = ones, 1 = tens, etc.)
 * @returns {number[]} - New sorted array
 */
function countingSortByDigit(arr, digit) {
    const base = 10;
    const count = new Array(base).fill(0);
    const output = new Array(arr.length);

    // Step 1: Count frequency of each digit
    for (let num of arr) {
        const d = getDigit(num, digit);
        count[d]++;
    }

    // Step 2: Compute cumulative count
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build output array from right to left (for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const d = getDigit(num, digit);
        const pos = count[d] - 1;
        output[pos] = num;
        count[d]--;
    }

    return output;
}

/**
 * Extracts the i-th digit from a number (from right, 0-indexed).
 *
 * @param {number} num - The number
 * @param {number} i - Digit position (0 = ones, 1 = tens, etc.)
 * @returns {number} - The digit value
 *
 * Example: getDigit(170, 0) → 0 (ones place)
 *          getDigit(170, 1) → 7 (tens place)
 *          getDigit(170, 2) → 1 (hundreds place)
 */
function getDigit(num, i) {
    return Math.floor(num / Math.pow(10, i)) % 10;
}

// Example Usage
const numbers = [170, 45, 75, 90, 2, 802, 24, 66];
console.log("Original Array:", numbers);
console.log("Sorted Array:", radixSort(numbers));

// Test with single-digit and zeros
const small = [3, 1, 4, 1, 5, 9, 2, 6, 5];
console.log("Small Array:", small);
console.log("Sorted:", radixSort(small));

// Test with all same digits
const repeated = [222, 111, 333, 121, 212];
console.log("Repeated Digits:", repeated);
console.log("Sorted:", radixSort(repeated));