/**
 * Sorts an array using Cycle Sort.
 *
 * @param {number[]} arr - The array to be sorted (modified in-place).
 * @returns {number} - Number of writes performed.
 *
 * Time Complexity: O(n²) — due to nested loops
 * Space Complexity: O(1)
 *
 * ✅ Minimizes memory writes — ideal for flash/EPPROM
 * ✅ Each element written at most once to final position
 * ❌ Not stable
 */
function cycleSort(arr) {
    let writes = 0;
    const n = arr.length;

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;

        // Step 1: Find correct position by counting smaller elements
        for (let i = cycleStart + 1; i < n; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        // If already in correct position, skip
        if (pos === cycleStart) continue;

        // Skip duplicates: elements equal to `item` that are already placed
        while (pos < n && arr[pos] === item) {
            pos++;
        }

        // Place `item` in its correct position
        if (pos < n) {
            [item, arr[pos]] = [arr[pos], item];
            writes++;
        }

        // Step 2: Continue the cycle until we return to start
        while (pos !== cycleStart) {
            pos = cycleStart;

            // Recalculate correct position for current `item`
            for (let i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            // Skip duplicates
            while (pos < n && arr[pos] === item) {
                pos++;
            }

            // Place `item` in its correct position
            if (pos < n) {
                [item, arr[pos]] = [arr[pos], item];
                writes++;
            }
        }
    }

    return writes;
}

// Helper: Non-mutating version
function cycleSortStable(arr) {
    const sorted = [...arr];
    cycleSort(sorted);
    return sorted;
}

// Example Usage
const numbers = [3, 2, 1, 4];
console.log("Original Array:", numbers);
console.log("Sorted Array:", cycleSortStable(numbers));

// Test with duplicates
const withDuplicates = [4, 2, 1, 2, 3];
console.log("\nWith Duplicates - Original:", withDuplicates);
console.log("Sorted:", cycleSortStable(withDuplicates));

// Test with already sorted
const alreadySorted = [1, 2, 3, 4, 5];
console.log("\nAlready Sorted - Original:", alreadySorted);
console.log("Sorted:", cycleSortStable(alreadySorted));

// Test with reverse order
const reverse = [5, 4, 3, 2, 1];
console.log("\nReverse - Original:", reverse);
const sortedReverse = [...reverse];
const writeCount = cycleSort(sortedReverse);
console.log("Sorted:", sortedReverse);
console.log("Writes performed:", writeCount);

// Test with single element
const single = [42];
console.log("\nSingle Element:", cycleSortStable(single));

// Test with empty array
const empty = [];
console.log("Empty Array:", cycleSortStable(empty));