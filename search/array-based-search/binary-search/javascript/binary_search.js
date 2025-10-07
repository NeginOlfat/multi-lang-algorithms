/**
 * Performs binary search on a sorted array (iterative version).
 *
 * @param {number[]} arr - Sorted array of numbers.
 * @param {number} target - The value to search for.
 * @returns {number} - Index of the target if found; -1 otherwise.
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}


/**
 * Performs binary search on a sorted array (recursive version).
 *
 * @param {number[]} arr - Sorted array of numbers.
 * @param {number} target - The value to search for.
 * @param {number} left - Left bound of search (default is 0).
 * @param {number} right - Right bound of search (default is last index).
 * @returns {number} - Index of the target if found; -1 otherwise.
 */
function binarySearchRecursive(arr, target, left = 0, right = null) {
    if (right === null) {
        right = arr.length - 1;
    }

    if (left > right) {
        return -1; // Base case: not found
    }

    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}


// Example usage and demonstration
(() => {
    console.log("🔍 Binary Search Examples");
    const data = [10, 20, 30, 40, 50, 60, 70, 80];
    const targetValue = 60;

    console.log(`Array: [${data.join(", ")}]`);
    console.log(`Target: ${targetValue}\n`);

    // --- Iterative Version ---
    const resultIter = binarySearch(data, targetValue);
    if (resultIter !== -1) {
        console.log(`✅ [Iterative] Found ${targetValue} at index ${resultIter}.`);
    } else {
        console.log(`❌ [Iterative] ${targetValue} not found.`);
    }

    // --- Recursive Version ---
    const resultRec = binarySearchRecursive(data, targetValue);
    if (resultRec !== -1) {
        console.log(`✅ [Recursive] Found ${targetValue} at index ${resultRec}.`);
    } else {
        console.log(`❌ [Recursive] ${targetValue} not found.`);
    }
})();

module.exports = { binarySearch,binarySearchRecursive };