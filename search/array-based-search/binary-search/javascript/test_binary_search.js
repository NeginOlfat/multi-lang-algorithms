const { strictEqual } = require('assert');

// Import functions
const { binarySearch, binarySearchRecursive } = require('./binary_search');

console.log("🧪 Running Binary Search Tests...\n");

// Test: Target at beginning
strictEqual(binarySearch([1, 2, 3, 4, 5], 1), 0, "Should find at index 0");
strictEqual(binarySearchRecursive([1, 2, 3, 4, 5], 1), 0, "Recursive: should find at index 0");

// Test: Target in middle
strictEqual(binarySearch([10, 20, 30, 40, 50], 30), 2, "Should find at index 2");
strictEqual(binarySearchRecursive([10, 20, 30, 40, 50], 30), 2, "Recursive: should find at index 2");

// Test: Target at end
strictEqual(binarySearch([10, 20, 30, 40, 50], 50), 4, "Should find at last index");
strictEqual(binarySearchRecursive([10, 20, 30, 40, 50], 50), 4, "Recursive: should find at last index");

// Test: Not found
strictEqual(binarySearch([10, 20, 30], 40), -1, "Should return -1 if not found");
strictEqual(binarySearchRecursive([10, 20, 30], 40), -1, "Recursive: should return -1");

// Test: Empty array
strictEqual(binarySearch([], 10), -1, "Empty array should return -1");
strictEqual(binarySearchRecursive([], 10), -1, "Recursive: empty array returns -1");

// Test: Single element (found)
strictEqual(binarySearch([5], 5), 0, "Single element found → index 0");
strictEqual(binarySearchRecursive([5], 5), 0, "Recursive: single element found");

// Test: Single element (not found)
strictEqual(binarySearch([5], 10), -1, "Single element not found → -1");
strictEqual(binarySearchRecursive([5], 10), -1, "Recursive: single not found → -1");

// Test: Duplicates (should find one valid index)
const dupArr = [5, 5, 5, 5, 5];
const iterIndex = binarySearch(dupArr, 5);
const recIndex = binarySearchRecursive(dupArr, 5);
console.assert(iterIndex >= 0 && iterIndex < 5, "Duplicate test: iterative returned invalid index");
console.assert(recIndex >= 0 && recIndex < 5, "Duplicate test: recursive returned invalid index");

console.log("\n✅ All tests passed!");