const { strictEqual } = require('assert');

const { linearSearch } = require('./linear_search');

console.log("Running Linear Search tests...");

// Test cases
strictEqual(linearSearch([1, 2, 3], 1), 0, "Should find target at beginning");
strictEqual(linearSearch([10, 20, 30, 40], 30), 2, "Should find target in middle");
strictEqual(linearSearch([10, 20, 30], 30), 2, "Should find target at end");
strictEqual(linearSearch([10, 20, 30], 40), -1, "Should return -1 if not found");
strictEqual(linearSearch([], 10), -1, "Should return -1 for empty array");
strictEqual(linearSearch([5], 5), 0, "Should find single element");
strictEqual(linearSearch([5], 10), -1, "Should return -1 for missing single");
strictEqual(linearSearch([5, 5, 5], 5), 0, "Should return first occurrence");

console.log("✅ All tests passed!");