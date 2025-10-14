/**
 * Performs Fibonacci Search on a sorted array.
 *
 * The algorithm uses Fibonacci numbers to divide the array into unequal parts,
 * avoiding division and reducing random memory access.
 *
 * @param {Array} arr - Sorted array of elements.
 * @param {*} target - The value to search for.
 * @returns {number} - Index of the target if found; -1 otherwise.
 */
function fibonacciSearch(arr, target) {
    const n = arr.length;

    // Handle empty array
    if (n === 0) return -1;

    // Generate smallest Fibonacci number >= n
    let fib2 = 0;  // F(k-2)
    let fib1 = 1;  // F(k-1)
    let fib = fib1 + fib2;  // F(k)

    while (fib < n) {
        fib2 = fib1;
        fib1 = fib;
        fib = fib1 + fib2;
    }

    // Marks the eliminated range from front
    let offset = -1;

    // While there are elements to be inspected
    while (fib > 1) {
        // Check index: min(offset + fib2, n - 1)
        const i = Math.min(offset + fib2, n - 1);

        if (arr[i] < target) {
            // Target is in higher section; cut off front part
            fib = fib1;
            fib1 = fib2;
            fib2 = fib - fib1;
            offset = i;
        } else if (arr[i] > target) {
            // Target is in lower section; cut off rear part
            fib = fib2;
            fib1 = fib1 - fib2;
            fib2 = fib - fib1;
        } else {
            // Found the target
            return i;
        }
    }

    // Final check for last element
    if (fib1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
        return offset + 1;
    }

    return -1; // Not found
}

// Example usage and demonstration
(() => {
    console.log("🔍 Fibonacci Search Example");

    const data = [10, 20, 30, 40, 50, 60, 70, 80];
    const targetValue = 60;

    console.log(`Array: [${data.join(", ")}]`);
    console.log(`Target: ${targetValue}`);
    console.log();

    const result = fibonacciSearch(data, targetValue);

    if (result !== -1) {
        console.log(`✅ Found ${targetValue} at index ${result}.`);
    } else {
        console.log(`❌ ${targetValue} not found in the array.`);
    }
})();

module.exports = {fibonacciSearch}