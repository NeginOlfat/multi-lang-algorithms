/**
 * Performs Sentinel Search on an array by placing the target as a sentinel at the end.
 *
 * This eliminates the need for index-bound checks during iteration,
 * reducing comparisons per element from 2 to 1.
 *
 * @param {Array} arr - Array of elements (does not need to be sorted).
 * @param {*} target - The value to search for.
 * @returns {number} - Index of the target if found; -1 otherwise.
 */
function sentinelSearch(arr, target) {
    const n = arr.length;

    // Handle empty array
    if (n === 0) return -1;

    // Save the last element
    const lastElement = arr[n - 1];

    // Place the target as sentinel at the end
    arr[n - 1] = target;

    // Start searching from the beginning
    let i = 0;
    while (arr[i] !== target) {
        i++;
    }

    // Restore the original last element
    arr[n - 1] = lastElement;

    // Check if the found element is valid
    if (i < n - 1 || lastElement === target) {
        return i; // Found in valid position
    } else {
        return -1; // Not present
    }
}

// Example usage and demonstration
(() => {
    console.log("🔍 Sentinel Search Example");

    const data = [10, 20, 35, 40, 50];
    const targetValue = 35;

    console.log(`Original Array: [${data.join(", ")}]`);
    console.log(`Target: ${targetValue}`);
    console.log();

    const result = sentinelSearch(data, targetValue);

    if (result !== -1) {
        console.log(`✅ Found ${targetValue} at index ${result}.`);
    } else {
        console.log(`❌ ${targetValue} not found in the array.`);
    }

    console.log(`Array after search: [${data.join(", ")}]`); // Should be unchanged
})();

module.exports = {sentinelSearch}