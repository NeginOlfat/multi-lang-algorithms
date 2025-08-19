/**
 * Simplified Intro Sort (Introspective Sort) - Educational Version
 *
 * Phases:
 * 1. Quick Sort (fast average case)
 * 2. Switch to Heap Sort if recursion depth is too deep
 * 3. Use Insertion Sort for small subarrays
 *
 * For learning only — not production
 */

function introSort(arr) {
    if (arr.length <= 1) return arr;

    // Get max allowed depth: 2 * log2(n)
    const maxDepth = 2 * Math.floor(Math.log2(arr.length));
    const sorted = [...arr]; // Don't mutate input

    function insertionSort(arr, left, right) {
        for (let i = left + 1; i <= right; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    function heapSort(arr, left, right) {
        const n = right - left + 1;
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i, left);
        }
        // Extract elements
        for (let i = n - 1; i > 0; i--) {
            [arr[left], arr[left + i]] = [arr[left + i], arr[left]];
            heapify(arr, i, 0, left);
        }
    }

    function heapify(arr, n, i, offset) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[offset + left] > arr[offset + largest]) {
            largest = left;
        }
        if (right < n && arr[offset + right] > arr[offset + largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[offset + i], arr[offset + largest]] = [arr[offset + largest], arr[offset + i]];
            heapify(arr, n, largest, offset);
        }
    }

    function quickSortLoop(arr, left, right, depth) {
        // Small array: use Insertion Sort
        if (right - left + 1 <= 16) {
            insertionSort(arr, left, right);
            return;
        }

        // Too deep: switch to Heap Sort
        if (depth <= 0) {
            heapSort(arr, left, right);
            return;
        }

        // Otherwise: Quick Sort
        const pivotIndex = partition(arr, left, right);
        quickSortLoop(arr, left, pivotIndex - 1, depth - 1);
        quickSortLoop(arr, pivotIndex + 1, right, depth - 1);
    }

    function partition(arr, left, right) {
        // Median-of-three pivot
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < arr[left]) [arr[left], arr[mid]] = [arr[mid], arr[left]];
        if (arr[right] < arr[left]) [arr[left], arr[right]] = [arr[right], arr[left]];
        if (arr[right] < arr[mid]) [arr[mid], arr[right]] = [arr[right], arr[mid]];

        const pivot = arr[mid];
        [arr[mid], arr[right]] = [arr[right], arr[mid]]; // Move pivot to end

        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] <= pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }

    // Start sorting
    quickSortLoop(sorted, 0, sorted.length - 1, maxDepth);
    return sorted;
}

// Example Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original Array:", numbers);
console.log("Sorted Array:", introSort(numbers));

// Test with already sorted
console.log("\nAlready Sorted:", introSort([1, 2, 3, 4, 5]));

// Test with reverse
console.log("Reverse Sorted:", introSort([5, 4, 3, 2, 1]));

// Test with duplicates
console.log("With Duplicates:", introSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));

// Test with single element
console.log("Single Element:", introSort([42]));

// Test with two elements
console.log("Two Elements:", introSort([2, 1]));