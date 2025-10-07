/**
 * Performs exponential search on a sorted array.
 *
 * Steps:
 * 1. Find the range where the target could be by doubling the index.
 * 2. Perform binary search within that range.
 *
 * @param {Array} arr - Sorted array of elements.
 * @param {*} target - The value to search for.
 * @returns {number} - Index of the target if found; -1 otherwise.
 */
function exponentialSearch(arr, target) {
    const n = arr.length;

    // Handle empty array
    if (n === 0) return -1;

    // Step 1: Check first element
    if (arr[0] === target) return 0;

    // Find range by doubling index
    let i = 1;
    while (i < n && arr[i] < target) {
        i *= 2; // Exponential growth: 1 → 2 → 4 → 8 → ...
    }

    // Now we have a range: [i/2, min(i, n-1)]
    const left = Math.floor(i / 2);
    const right = Math.min(i, n - 1);

    // Step 2: Binary search in the identified range
    let low = left;
    let high = right;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1; // Not found
}

// Example usage and demonstration
(() => {
    console.log("🔍 Exponential Search Example");

    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const targetValue = 70;

    console.log(`Array: [${data.join(", ")}]`);
    console.log(`Target: ${targetValue}`);
    console.log();

    const result = exponentialSearch(data, targetValue);

    if (result !== -1) {
        console.log(`✅ Found ${targetValue} at index ${result}.`);
    } else {
        console.log(`❌ ${targetValue} not found in the array.`);
    }
})();

module.exports = {exponentialSearch}