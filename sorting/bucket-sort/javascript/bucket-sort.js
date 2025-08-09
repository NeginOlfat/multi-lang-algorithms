/**
 * Sorts an array using Bucket Sort.
 *
 * @param {number[]} arr - The array of numbers to sort (assumed to be in a known range).
 * @param {number} numBuckets - Number of buckets to use (default: 5).
 * @returns {number[]} - A new sorted array.
 *
 * Time Complexity:
 * - Best/Average: O(n + k) when data is uniformly distributed
 * - Worst: O(n²) when all elements fall into one bucket
 *
 * Space Complexity: O(n + k)
 *
 * ✅ Best for uniformly distributed data (e.g., random floats in [0,1))
 * ✅ Uses Insertion Sort for small buckets
 * ❌ Not stable if bucket sort method isn't stable
 * ❌ Extra space required
 */
function bucketSort(arr, numBuckets = 5) {
    // Handle edge cases
    if (arr.length <= 1) return [...arr];

    // Find min and max to determine range
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min;

    // Avoid division by zero if all elements are the same
    if (range === 0) return [...arr];

    // Create k empty buckets
    const buckets = Array.from({ length: numBuckets }, () => []);

    // Distribute elements into buckets
    for (const num of arr) {
        // Normalize value to bucket index: [0, numBuckets)
        let bucketIndex = Math.floor((num - min) / range * (numBuckets - 1));
        
        // Clamp index to [0, numBuckets - 1]
        bucketIndex = Math.max(0, Math.min(bucketIndex, numBuckets - 1));
        
        buckets[bucketIndex].push(num);
    }

    // Sort each bucket using Insertion Sort
    for (const bucket of buckets) {
        insertionSort(bucket);
    }

    // Concatenate all buckets into output
    const sorted = [];
    for (const bucket of buckets) {
        sorted.push(...bucket);
    }

    return sorted;
}

/**
 * Helper: Sorts an array in-place using Insertion Sort.
 *
 * @param {number[]} arr - Array to sort
 */
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Example Usage
const numbers = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
console.log("Original Array:", numbers);
console.log("Sorted Array:", bucketSort(numbers, 5));

// Test with already sorted
const sorted = [0.1, 0.2, 0.3, 0.4, 0.5];
console.log("Already Sorted:", bucketSort(sorted));

// Test with reverse order
const reverse = [0.9, 0.8, 0.7, 0.6, 0.5];
console.log("Reverse Sorted:", bucketSort(reverse));

// Test with duplicates
const duplicates = [0.3, 0.1, 0.4, 0.1, 0.5, 0.9, 0.2, 0.6, 0.5, 0.3];
console.log("With Duplicates:", bucketSort(duplicates, 5));

// Test with all same values
const same = [0.5, 0.5, 0.5];
console.log("All Same:", bucketSort(same));

// Test with integers
const integers = [64, 34, 25, 12, 22, 11, 90];
console.log("Integers (Uniformly distributed?):", bucketSort(integers, 5));