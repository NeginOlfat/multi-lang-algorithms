const { strictEqual } = require('assert');

// Import the function
const { sentinelSearch } = require('./sentinel_search');

console.log("🧪 Running Sentinel Search Tests...\n");

// Test: Target in middle
(() => {
    const arr = [10, 20, 35, 40, 50];
    strictEqual(sentinelSearch(arr, 35), 2, "Should find 35 at index 2");
    strictEqual(arr[4], 50, "Original last element should be restored");
})();

// Test: Target at beginning
(() => {
    const arr = [1, 2, 3, 4, 5];
    strictEqual(sentinelSearch(arr, 1), 0, "Should find first element");
    strictEqual(arr[4], 5, "Original last element should be preserved");
})();

// Test: Target at end
(() => {
    const arr = [1, 2, 3, 4, 5];
    strictEqual(sentinelSearch(arr, 5), 4, "Should find last element");
    strictEqual(arr[4], 5, "Last element should still be 5 after restore");
})();

// Test: Not present
(() => {
    const arr = [1, 2, 3, 4, 5];
    strictEqual(sentinelSearch(arr, 6), -1, "Should return -1 for missing element");
    strictEqual(arr[4], 5, "Array must remain unchanged");
})();

// Test: Empty array
strictEqual(sentinelSearch([], 10), -1, "Empty array should return -1");

// Test: Single element found
(() => {
    const arr = [5];
    strictEqual(sentinelSearch(arr, 5), 0, "Single element found → index 0");
    strictEqual(arr[0], 5, "Array should be unchanged");
})();

// Test: Single element not found
(() => {
    const arr = [5];
    strictEqual(sentinelSearch(arr, 10), -1, "Single element not found → -1");
    strictEqual(arr[0], 5, "Array should be unchanged");
})();

// Test: Two elements — first is target
(() => {
    const arr = [7, 3];
    strictEqual(sentinelSearch(arr, 7), 0, "First element is target → index 0");
    strictEqual(arr[1], 3, "Last element restored correctly");
})();

// Test: Two elements — second is target
(() => {
    const arr = [3, 7];
    strictEqual(sentinelSearch(arr, 7), 1, "Second element is target → index 1");
    strictEqual(arr[1], 7, "Last element was target → should still match");
})();

// Test: All duplicates
(() => {
    const arr = [5, 5, 5, 5];
    const result = sentinelSearch(arr, 5);
    strictEqual(arr[3], 5, "Last element must be restored");
    if (![0, 1, 2, 3].includes(result)) {
        throw new Error("Duplicate test: must return valid index");
    }
})();

console.log("\n✅ All tests passed!");