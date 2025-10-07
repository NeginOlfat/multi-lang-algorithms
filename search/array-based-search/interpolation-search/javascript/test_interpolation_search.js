const { strictEqual, ok } = require('assert');

// Import the function
const { interpolationSearch } = require('./interpolation_search');

console.log("🧪 Running Interpolation Search Tests...\n");

// Test: Target found in uniform array
strictEqual(interpolationSearch([10, 20, 30, 40, 50, 60, 70, 80, 90], 70), 6, "Should find 70 at index 6");

// Test: Target at beginning
strictEqual(interpolationSearch([1, 2, 3, 4, 5], 1), 0, "Should find first element");

// Test: Target at end
strictEqual(interpolationSearch([1, 2, 3, 4, 5], 5), 4, "Should find last element");

// Test: Not present
strictEqual(interpolationSearch([1, 2, 3, 4, 5], 6), -1, "Should return -1 for missing element");

// Test: Empty array
strictEqual(interpolationSearch([], 10), -1, "Empty array should return -1");

// Test: Single element found
strictEqual(interpolationSearch([5], 5), 0, "Single element found → index 0");

// Test: Single element not found
strictEqual(interpolationSearch([5], 10), -1, "Single element not found → -1");

// Test: Duplicate values (all same)
strictEqual(interpolationSearch([5, 5, 5, 5], 5), 0, "All duplicates — should return first occurrence");
strictEqual(interpolationSearch([5, 5, 5, 5], 3), -1, "All duplicates — not found should return -1");

// Test: Non-uniform data (worst-case-like)
strictEqual(interpolationSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 1000], 9), 8, "Should still find even in skewed data");

// Test: Division-by-zero protection
strictEqual(interpolationSearch([7, 7, 7, 7], 7), 0, "Equal elements — should handle safely");
strictEqual(interpolationSearch([7, 7, 7, 7], 5), -1, "Equal elements — not found should return -1");

// Test: Bounds safety (extrapolation fails gracefully)
ok([0, 1, 2, 3, -1].includes(interpolationSearch([10, 20, 30], 25)), "Should not crash on bad estimate");

console.log("\n✅ All tests passed!");