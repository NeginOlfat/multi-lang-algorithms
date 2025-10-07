const { strictEqual } = require('assert');

// Import the function
const { exponentialSearch } = require('./exponential_search');

console.log("🧪 Running Exponential Search Tests...\n");

// Test: Target found in middle
strictEqual(exponentialSearch([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 70), 6, "Should find 70 at index 6");

// Test: Target at beginning
strictEqual(exponentialSearch([1, 2, 3, 4, 5], 1), 0, "Should find first element");

// Test: Target at end
strictEqual(exponentialSearch([1, 2, 3, 4, 5], 5), 4, "Should find last element");

// Test: Not present
strictEqual(exponentialSearch([1, 2, 3, 4, 5], 6), -1, "Should return -1 for missing element");

// Test: Empty array
strictEqual(exponentialSearch([], 10), -1, "Empty array should return -1");

// Test: Single element found
strictEqual(exponentialSearch([5], 5), 0, "Single element found → index 0");

// Test: Single element not found
strictEqual(exponentialSearch([5], 10), -1, "Single element not found → -1");

// Test: Small array (power of two size)
strictEqual(exponentialSearch([1, 3, 5, 7], 7), 3, "Should find 7 at index 3");

// Test: Target larger than all elements
strictEqual(exponentialSearch([1, 2, 3, 4], 10), -1, "Should return -1 if target > max");

// Test: Target smaller than first element
strictEqual(exponentialSearch([10, 20, 30], 5), -1, "Should return -1 if target < min");

// Test: Duplicates — should return valid index
const dupArr = [2, 2, 2, 3, 3, 3, 4, 4];
const result = exponentialSearch(dupArr, 3);
console.assert(result >= 3 && result <= 5, "Duplicate test: must return one of the indices where 3 occurs");
console.assert(dupArr[result] === 3, "Duplicate test: returned value must be 3");

console.log("\n✅ All tests passed!");