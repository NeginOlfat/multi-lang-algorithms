/**
 * Performs interpolation search on a sorted array.
 *
 * @param {Array} arr - Sorted array of numbers (preferably uniformly distributed).
 * @param {*} target - The value to search for.
 * @returns {number} - Index of the target if found; -1 otherwise.
 */
function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    // Handle empty array
    if (low > high) return -1;

    while (low <= high && arr[low] <= target && target <= arr[high]) {
        // Avoid division by zero when all values in range are equal
        if (arr[high] === arr[low]) {
            return arr[low] === target ? low : -1;
        }

        // Estimate position using interpolation formula
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Safety: ensure pos is within bounds (avoid extrapolation errors)
        if (pos < low || pos > high) {
            break; // Likely due to non-uniform distribution
        }

        // Check if estimated position holds the target
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            low = pos + 1; // Target is in the right subarray
        } else {
            high = pos - 1; // Target is in the left subarray
        }
    }

    return -1; // Not found
}

// Example usage and demonstration
(() => {
    console.log("🔍 Interpolation Search Example");

    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    const targetValue = 70;

    console.log(`Array: [${data.join(", ")}]`);
    console.log(`Target: ${targetValue}`);
    console.log();

    const result = interpolationSearch(data, targetValue);

    if (result !== -1) {
        console.log(`✅ Found ${targetValue} at index ${result}.`);
    } else {
        console.log(`❌ ${targetValue} not found in the array.`);
    }
})();

module.exports ={interpolationSearch}