const { strictEqual, throws } = require('assert');

// Import functions
const { minShipCapacity, canShip } = require('./ship_packages');

console.log("🧪 Running Ship Packages Tests...\n");

// Test: Example case — should return 15
strictEqual(minShipCapacity([1,2,3,4,5,6,7,8,9,10], 5), 15, "Should find min capacity = 15");

// Test: canShip basic cases
strictEqual(canShip([1,2,3,4,5], 10, 3), true, "Should fit in 2 days: [1,2,3,4][5]");
strictEqual(canShip([1,2,3,4,5], 3, 3), false, "Needs 4 days: [1,2][3][4][5]");

// Test: Minimum capacity is max weight (one per day)
strictEqual(minShipCapacity([1, 1, 1, 1], 4), 1, "Each package one day → capacity = 1");

// Test: All in one day
strictEqual(minShipCapacity([1, 2, 3], 1), 6, "One day → capacity = sum");

// Test: Each package one day
strictEqual(minShipCapacity([5, 4, 3, 2, 1], 5), 5, "One per day → capacity = max");

// Test: Large gap in weights
strictEqual(minShipCapacity([1, 1, 1, 1, 10], 2), 10, "Must handle heavy last item");

// Test: Three days with balance — corrected to 6
strictEqual(minShipCapacity([3, 2, 2, 4, 1, 4], 3), 6, "Can split as [3,2],[2,4],[1,4] → capacity=6");

// Test: Invalid D greater than n
throws(
    () => minShipCapacity([1, 2, 3], 5),
    /greater than number of packages/,
    "Should reject D > n"
);

// Test: Empty weights
throws(
    () => minShipCapacity([], 1),
    /non-empty/,
    "Should reject empty weights"
);

console.log("\n✅ All tests passed!");