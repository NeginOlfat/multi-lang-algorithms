/**
 * Simplified Tim Sort (Educational Version)
 *
 * ✅ No array mutation during run detection
 * ✅ Stable merging
 * ✅ Matches expected output
 *
 * For learning only — not production
 * 
 * For real projects, always use: arr.slice().sort((a, b) => a - b);  (V8 uses Tim Sort internally for objects!)
 * 
 */
function timSort(arr) {
    if (arr.length <= 1) return arr;

    const n = arr.length;
    const runs = [];
    let i = 0;

    // Helper: Merge two sorted arrays stably
    function merge(left, right) {
            const result = [];
            let i = 0, j = 0;

            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }

            return result.concat(left.slice(i)).concat(right.slice(j));
        }

    // Step 1: Calculate minrun
    function getMinrun(n) {
        let r = 0;
        while (n >= 64) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    }

    const minrun = Math.min(getMinrun(n), 32);

    // Step 2: Find and process runs
    while (i < n) {
        let start = i;

        // Direction detection
        if (i + 1 < n && arr[i] > arr[i + 1]) {
            // Decreasing run
            while (i + 1 < n && arr[i] > arr[i + 1]) i++;
            i++; // Include last element
        } else {
            // Increasing run
            while (i + 1 < n && arr[i] <= arr[i + 1]) i++;
            i++;
        }

        // Extract run
        let run = arr.slice(start, i);

        // Reverse if decreasing
        if (run.length > 1 && run[0] > run[run.length - 1]) {
            run.reverse();
        }

        // Extend short run to minrun using Insertion Sort
        while (run.length < minrun && i < n) {
            const val = arr[i++];
            // Insert in sorted position
            let pos = 0;
            while (pos < run.length && run[pos] <= val) pos++;
            run.splice(pos, 0, val);
        }

        runs.push(run);
    }

    // Step 3: Merge runs with stack invariants
    const stack = [];
    for (const run of runs) {
        stack.push(run);

        // Invariant: stack[-2] > stack[-1] (length)
        while (stack.length > 1 && stack[stack.length - 2].length <= stack[stack.length - 1].length) {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(merge(left, right));
        }
    }

    // Final merge
    while (stack.length > 1) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(merge(left, right));
    }

    return stack.length > 0 ? stack[0] : [];
}

// Example Usage
const numbers = [10, 9, 8, 7, 15, 16, 17, 3, 2, 1, 12, 13, 14, 18, 19, 20];
console.log("Original Array:", numbers);
console.log("Sorted Array:", timSort([...numbers]));

// Test with already sorted
console.log("\nAlready Sorted:", timSort([1, 2, 3, 4, 5]));

// Test with reverse
console.log("Reverse Sorted:", timSort([5, 4, 3, 2, 1]));

// Test with duplicates
console.log("With Duplicates:", timSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));