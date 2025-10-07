const { strictEqual, ok, equal } = require('assert');

// Import functions
const { ternarySearchPeak, ternarySearchFunctionMax } = require('./ternary_search');

console.log("🧪 Running Ternary Search Tests...\n");

// Test: Peak in middle
strictEqual(ternarySearchPeak([1, 3, 5, 7, 8, 6, 4, 2]), 4, "Should find peak at index 4");

// Test: Peak at beginning (descending)
strictEqual(ternarySearchPeak([10, 8, 6, 4]), 0, "Should find peak at start");

// Test: Peak at end (ascending)
strictEqual(ternarySearchPeak([1, 3, 5, 7]), 3, "Should find peak at end");

// Test: Single element
strictEqual(ternarySearchPeak([5]), 0, "Single element → index 0");

// Test: Two elements — first larger
strictEqual(ternarySearchPeak([7, 3]), 0, "Two elements: first larger → index 0");

// Test: Two elements — second larger
strictEqual(ternarySearchPeak([3, 7]), 1, "Two elements: second larger → index 1");

// Test: Empty array
strictEqual(ternarySearchPeak([]), -1, "Empty array should return -1");

// Test: Null/undefined input
strictEqual(ternarySearchPeak(null), -1, "Null input → -1");
strictEqual(ternarySearchPeak(undefined), -1, "Undefined input → -1");

// Test: Function maximization (parabola)
const f = (x) => -Math.pow(x - 3, 2) + 10; // Max at x=3
const resultX = ternarySearchFunctionMax(f, 0, 6);
console.assert(Math.abs(resultX - 3.0) < 1e-5, `Expected ~3.0, got ${resultX}`);

// Test: Flat plateau — any peak index is acceptable
const flatArr = [1, 5, 5, 5, 2];
const resultIdx = ternarySearchPeak(flatArr);
console.assert(resultIdx >= 1 && resultIdx <= 3, "Flat region: must return one of the peak indices");
console.assert(flatArr[resultIdx] === 5, "Flat region: returned value must be 5");

console.log("\n✅ All tests passed!");