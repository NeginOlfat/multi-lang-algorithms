const { strictEqual, deepEqual } = require('assert');

// Import the class
const { SelfOrganizingList } = require('./self_organizing_search');

console.log("🧪 Running Self-Organizing Search Tests...\n");

// Test: Move-to-Front - single access
(() => {
    const sol = new SelfOrganizingList(['A', 'B', 'C'], 'move_to_front');
    sol.search('B');
    deepEqual(sol.toArray(), ['B', 'A', 'C'], "Should move B to front");
})();

// Test: Move-to-Front - multiple accesses
(() => {
    const sol = new SelfOrganizingList(['A', 'B', 'C', 'D'], 'move_to_front');
    sol.search('C'); // → [C, A, B, D]
    sol.search('B'); // → [B, C, A, D]
    deepEqual(sol.toArray(), ['B', 'C', 'A', 'D'], "Should maintain move-to-front logic");
})();

// Test: Transpose - one swap
(() => {
    const sol = new SelfOrganizingList(['A', 'B', 'C'], 'transpose');
    sol.search('C'); // → [A, C, B]
    deepEqual(sol.toArray(), ['A', 'C', 'B'], "Should swap C with B");
})();

// Test: Transpose - repeated access
(() => {
    const sol = new SelfOrganizingList(['W', 'X', 'Y', 'Z'], 'transpose');
    sol.search('Z'); // no change
    sol.search('Y'); // → [W, X, Z, Y]
    sol.search('Z'); // → [W, X, Z, Y] (Z now before Y)
    deepEqual(sol.toArray(), ['W', 'X', 'Z', 'Y'], "Should improve position over time");
})();

// Test: Count - reorder by frequency
(() => {
    const sol = new SelfOrganizingList(['P', 'Q', 'R'], 'count');
    sol.search('R');
    sol.search('Q');
    sol.search('R');
    // R:2, Q:1, P:0 → [R, Q, P]
    deepEqual(sol.toArray(), ['R', 'Q', 'P'], "Should reorder by count");
    deepEqual(sol.getCounts(), { P: 0, Q: 1, R: 2 }, "Counts should be accurate");
})();

// Test: Count - stable with equal frequencies
(() => {
    const sol = new SelfOrganizingList(['X', 'Y'], 'count');
    sol.search('Y');
    sol.search('X');
    // Both have count 1 → order preserved
    deepEqual(sol.toArray(), ['X', 'Y'], "Equal frequencies should preserve order");
})();

// Test: Empty list returns -1
strictEqual(new SelfOrganizingList([], 'move_to_front').search('X'), -1, "Empty list → -1");

// Test: Not found returns -1 and doesn't modify
(() => {
    const sol = new SelfOrganizingList(['M', 'N'], 'move_to_front');
    strictEqual(sol.search('O'), -1, "Should return -1 for missing element");
    deepEqual(sol.toArray(), ['M', 'N'], "List should remain unchanged");
})();

// Test: Case sensitivity
(() => {
    const sol = new SelfOrganizingList(['a', 'A'], 'move_to_front');
    strictEqual(sol.search('A'), 1, "Should distinguish case");
    deepEqual(sol.toArray(), ['A', 'a'], "A moved to front");
})();

console.log("\n✅ All tests passed!");