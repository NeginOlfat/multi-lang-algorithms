const { strictEqual } = require('assert');

// Import the function
const { jumpSearch } = require('./jump_search');

console.log("🧪 Running Jump Search Tests...\n");

// Test: Target in middle block
strictEqual(jumpSearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7), 7, "Should find 7 at index 7");

// Test: Target at beginning
strictEqual(jumpSearch([1, 2, 3, 4, 5], 1), 0, "Should find first element");

// Test: Target at end
strictEqual(jumpSearch([1, 2, 3, 4, 5], 5), 4, "Should find last element");

// Test: Not found
strictEqual(jumpSearch([1, 2, 3, 4, 5], 6), -1, "Should return -1 for missing element");

// Test: Empty array
strictEqual(jumpSearch([], 10), -1, "Empty array should return -1");

// Test: Single element found
strictEqual(jumpSearch([5], 5), 0, "Single element found → index 0");

// Test: Single element not found
strictEqual(jumpSearch([5], 10), -1, "Single element not found → -1");

// Test: Small array
strictEqual(jumpSearch([1, 3, 5, 7], 3), 1, "Should find 3 at index 1");
strictEqual(jumpSearch([1, 3, 5, 7], 7), 3, "Should find 7 at index 3");

// Test: Duplicate elements (should return first occurrence in block)
const dupArr = [2, 2, 2, 3, 3, 3, 4, 4];
const result = jumpSearch(dupArr, 3);
console.assert(result >= 3 && result <= 5, "Duplicate test: must return valid index for 3");

console.log("\n✅ All tests passed!");