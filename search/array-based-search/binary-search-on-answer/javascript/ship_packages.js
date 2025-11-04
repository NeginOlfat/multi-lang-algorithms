/**
 * Checks if all packages can be shipped within 'maxDays' using given 'capacity'.
 * Simulates loading in order, starting new days when capacity is exceeded.
 *
 * @param {number[]} weights - Array of package weights (in order)
 * @param {number} capacity - Ship capacity per day
 * @param {number} maxDays - Maximum allowed days
 * @returns {boolean} - True if shipping within maxDays is possible
 */
function canShip(weights, capacity, maxDays) {
    let daysNeeded = 1;
    let currentLoad = 0;

    for (const w of weights) {
        if (currentLoad + w <= capacity) {
            currentLoad += w;
        } else {
            daysNeeded++;
            currentLoad = w;
            // Early exit if already over limit
            if (daysNeeded > maxDays) return false;
        }
    }

    return daysNeeded <= maxDays;
}

/**
 * Finds the minimum ship capacity required to ship all packages in exactly D days.
 * Uses binary search on the answer (capacity) between:
 *   low = max(weights)  -> at least carry heaviest package
 *   high = sum(weights) -> ship all in one day
 *
 * @param {number[]} weights - List of package weights (in order)
 * @param {number} D - Number of days to ship all packages
 * @returns {number} - Minimum capacity required
 */
function minShipCapacity(weights, D) {
    if (!weights || weights.length === 0 || D <= 0) {
        throw new Error("Invalid input: weights must be non-empty and D > 0");
    }
    if (D > weights.length) {
        throw new Error("D cannot be greater than number of packages");
    }

    const low = Math.max(...weights);     // Must carry heaviest single package
    const high = weights.reduce((a, b) => a + b, 0); // Can ship all in one day

    let result = high;

    console.log(`\n🔍 Binary Search Trace:`);
    console.log(`${'Iter'.padEnd(4)} ${'Low'.padEnd(4)} ${'High'.padEnd(4)} ${'Mid'.padEnd(4)} ${'Feasible?'.padEnd(10)} Action`);
    console.log("-".repeat(50));

    let left = low;
    let right = high;
    let iter = 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const feasible = canShip(weights, mid, D);
        const mark = feasible ? "✅" : "❌";
        const status = feasible ? "Yes" : "No";
        let action;
        let txt;

        if (feasible) {
            txt =`${iter.toString().padEnd(4)} ${left.toString().padEnd(4)} ${right.toString().padEnd(4)}`
            result = mid;
            right = mid - 1;
            action = `Try smaller → high = ${right}`;
           } else {
            txt =`${iter.toString().padEnd(4)} ${left.toString().padEnd(4)} ${right.toString().padEnd(4)} `
            left = mid + 1;
            action = `Need larger → low = ${left}`;
        }

        console.log(`${txt}${mid.toString().padEnd(4)} ${mark + ' ' + status.padEnd(8)} ${action}`);
        iter++;
    }

    return result;
}

/**
 * Simulate and print how packages are shipped with given capacity.
 *
 * @param {number[]} weights - Package weights
 * @param {number} capacity - Ship capacity
 * @param {number} D - Allowed days
 */
function simulateShipping(weights, capacity, D) {
    console.log(`\n📦 Shipping Simulation (Capacity = ${capacity}, Max Days = ${D}):`);
    let day = 1;
    let currentLoad = 0;
    const dailyPackages = [[]];

    for (const w of weights) {
        if (currentLoad + w <= capacity) {
            currentLoad += w;
            dailyPackages[dailyPackages.length - 1].push(w);
        } else {
            day++;
            currentLoad = w;
            dailyPackages.push([w]);
        }
    }

    const totalDays = dailyPackages.length;
    const valid = totalDays <= D;

    dailyPackages.forEach((pkgs, i) => {
        const load = pkgs.reduce((a, b) => a + b, 0);
        console.log(`  Day ${i + 1}: [${pkgs.join(", ")}] → Total = ${load} ${load <= capacity ? '✅' : '❌'}`);
    });

    console.log(`🎯 Total Days Used: ${totalDays} ${valid ? '✅' : '❌ Exceeds Limit'}`);
}

// Example usage and demonstration
(() => {
    console.log("🔍 Binary Search on Answer: Ship Packages Within D Days\n");

    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const D = 5;

    console.log(`Weights: [${weights.join(", ")}]`);
    console.log(`Days Available: ${D}`);
    console.log(`Min Weight: ${Math.min(...weights)} | Max Weight: ${Math.max(...weights)} | Total: ${weights.reduce((a, b) => a + b, 0)}`);

    // Find minimum capacity
    const minCapacity = minShipCapacity(weights, D);
    console.log(`\n✅ Minimum Required Capacity: ${minCapacity}`);

    // Verify with simulation
    simulateShipping(weights, minCapacity, D);

    // Final confirmation
    console.log(`\n🎯 Final Answer: The smallest capacity that works is ${minCapacity}.`);
})();

module.exports ={minShipCapacity,canShip}