/**
 * Performs linear search on an array to find the index of the target value.
 *
 * @param {Array} arr - The array to search in.
 * @param {*} target - The value to search for.
 * @returns {number} - Index of the target if found, otherwise -1.
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if target is found
        }
    }
    return -1; // Return -1 if target is not found
}

// Example usage and demonstration
const data = [10, 50, 30, 70, 80, 20, 90, 40];
const targetValue = 20;

// Perform linear search
const result = linearSearch(data, targetValue);

// Output result 
if (result !== -1) {
    console.log(`✅ Found ${targetValue} at index ${result}.`);
} else {
    console.log(`❌ ${targetValue} not found in the array.`);
}

module.exports = { linearSearch };