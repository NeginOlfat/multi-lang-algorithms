const { strictEqual } = require('assert');

// Import the function
const { fibonacciSearch } = require('./fibonacci_search');

console.log("🧪 Running Fibonacci Search Tests...\n");

// Test: Target in middle
strictEqual(fibonacciSearch([10, 20, 30, 40, 50, 60, 70, 80], 60), 5, "Should find 60 at index 5");

// Test: Target at beginning
strictEqual(fibonacciSearch([1, 2, 3, 4, 5], 1), 0, "Should find first element");

// Test: Target at end
strictEqual(fibonacciSearch([1, 2, 3, 4, 5], 5), 4, "Should find last element");

// Test: Not present
strictEqual(fibonacciSearch([1, 2, 3, 4, 5], 6), -1, "Should return -1 for missing element");

// Test: Empty array
strictEqual(fibonacciSearch([], 10), -1, "Empty array should return -1");

// Test: Single element found
strictEqual(fibonacciSearch([5], 5), 0, "Single element found → index 0");

// Test: Single element not found
strictEqual(fibonacciSearch([5], 10), -1, "Single element not found → -1");

// Test: Small array with Fibonacci size (5)
strictEqual(fibonacciSearch([10, 20, 30, 40, 50], 40), 3, "Should find 40 at index 3");

// Test: Duplicate elements — should return valid index
const dupArr = [5, 5, 5, 5, 5];
const result = fibonacciSearch(dupArr, 5);
console.assert(result >= 0 && result < 5, "Duplicate test: must return valid index");
console.assert(dupArr[result] === 5, "Duplicate test: returned value must be 5");

// Test: Target smaller than first
strictEqual(fibonacciSearch([10, 20, 30], 5), -1, "Should return -1 if target < min");

// Test: Target larger than last
strictEqual(fibonacciSearch([10, 20, 30], 40), -1, "Should return -1 if target > max");

console.log("\n✅ All tests passed!");