/**
* Performs jump search on a sorted array.
*
* @param {Array} arr - Sorted array of elements.
* @param {*} target - The value to search for.
* @returns {number} - Index of the target if found; -1 otherwise.
*/
function jumpSearch(arr, target) {
    const n = arr.length;

    // Handle empty array
    if (n === 0) return -1;

    // Optimal jump size is √n
    let step = Math.floor(Math.sqrt(n));
    let prev = 0; // Starting index of current block

    // Jump forward in blocks until arr[Math.min(step, n) - 1] >= target
    while (step < n && arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
    }

    // Perform linear search within the identified block
    for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }

    return -1; // Not found
}

// Example usage and demonstration
(() => {
    console.log("🚶‍♂️ Jump Search Example");

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const targetValue = 7;

    console.log(`Array: [${data.join(", ")}]`);
    console.log(`Target: ${targetValue}\n`);

    const result = jumpSearch(data, targetValue);

    if (result !== -1) {
        console.log(`✅ Found ${targetValue} at index ${result}.`);
    } else {
        console.log(`❌ ${targetValue} not found in the array.`);
    }
})();

module.exports = { jumpSearch };