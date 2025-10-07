/**
 * Finds the index of the maximum element in a unimodal (mountain) array.
 * A unimodal array increases first, then decreases.
 *
 * @param {number[]} arr - Unimodal array of numbers.
 * @returns {number} - Index of the peak element; -1 if invalid input.
 */
function ternarySearchPeak(arr) {
    // Handle edge cases
    if (!arr || arr.length === 0) return -1;
    if (arr.length === 1) return 0;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // If range is small, resolve directly
        if (right - left < 2) {
            return arr[left] >= arr[right] ? left : right;
        }

        const mid1 = Math.floor(left + (right - left) / 3);
        const mid2 = Math.floor(right - (right - left) / 3);

        if (arr[mid1] < arr[mid2]) {
            // Peak is in the right two-thirds
            left = mid1 + 1;
        } else {
            // Peak is in the left two-thirds
            right = mid2 - 1;
        }
    }

    return -1; // Should not reach here for valid input
}

/**
 * Finds the x-value that maximizes a unimodal function f(x) within [left, right].
 *
 * @param {Function} f - Unimodal function to maximize.
 * @param {number} left - Left bound of search interval.
 * @param {number} right - Right bound of search interval.
 * @param {number} precision - Desired precision (default: 1e-9).
 * @returns {number} - Approximate x-value where f(x) is maximum.
 */
function ternarySearchFunctionMax(f, left, right, precision = 1e-9) {
    while (right - left > precision) {
        const mid1 = left + (right - left) / 3;
        const mid2 = right - (right - left) / 3;

        if (f(mid1) < f(mid2)) {
            left = mid1;
        } else {
            right = mid2;
        }
    }

    return (left + right) / 2;
}

// Example usage and demonstration
(() => {
    console.log("🔍 Ternary Search Examples");

    // --- Example 1: Find peak in unimodal array ---
    console.log("\n🎯 Example 1: Finding Peak in Array");
    const data = [1, 3, 5, 7, 8, 6, 4, 2];
    console.log(`Array: [${data.join(", ")}]`);

    const peakIndex = ternarySearchPeak(data);
    if (peakIndex !== -1) {
        console.log(`✅ Peak found at index ${peakIndex} → value = ${data[peakIndex]}`);
    } else {
        console.log("❌ No peak found.");
    }

    // --- Example 2: Maximize a mathematical function ---
    console.log("\n📈 Example 2: Maximizing a Function");
    const f = (x) => -x * x + 6 * x + 5; // Parabola with max at x=3
    console.log("Function: f(x) = -x² + 6x + 5");
    console.log("Searching maximum in range [0, 6]...");

    const maxX = ternarySearchFunctionMax(f, 0, 6);
    const maxY = f(maxX);

    console.log(`✅ Maximum at x ≈ ${maxX.toFixed(6)}`);
    console.log(`   f(${maxX.toFixed(6)}) = ${maxY.toFixed(6)}`);
})();

module.exports = { ternarySearchPeak,ternarySearchFunctionMax };