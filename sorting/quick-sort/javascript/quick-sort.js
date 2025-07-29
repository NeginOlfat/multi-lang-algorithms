/**
 * Sorts an array using the Quick Sort algorithm (Lomuto partition scheme).
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} A new sorted array (original is not modified).
 *
 * Time Complexity:
 * - Best/Average: O(n log n)
 * - Worst: O(n²) — rare with random data
 * Space Complexity: O(log n) due to recursion stack
 */
function quickSort(arr) {
    // Create a copy to avoid mutating the original array
    const sorted = [...arr];

    // Helper function to sort the array in-place using recursion
    function sort(low, high) {
        if (low < high) {
            // Partition the array and get the pivot index
            const pivotIndex = partition(low, high);
            // Recursively sort left and right partitions
            sort(low, pivotIndex - 1);
            sort(pivotIndex + 1, high);
        }
    }

    // Lomuto partition scheme: uses last element as pivot
    function partition(low, high) {
        const pivot = sorted[high]; // Choose last element as pivot
        let i = low - 1; // Index of smaller element

        for (let j = low; j < high; j++) {
            if (sorted[j] <= pivot) {
                i++;
                // Swap elements
                [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
            }
        }

        // Place pivot in correct position
        [sorted[i + 1], sorted[high]] = [sorted[high], sorted[i + 1]];
        return i + 1; // Return pivot index
    }

    // Start sorting from full array range
    if (sorted.length > 1) {
        sort(0, sorted.length - 1);
    }

    return sorted;
}

// Example Usage
const numbers = [10, 80, 30, 90, 40, 50, 70];
console.log("Original Array: ", numbers);
console.log("Sorted Array:   ", quickSort(numbers));

// Test with edge cases
console.log("Empty Array:    ", quickSort([]));
console.log("Single Element: ", quickSort([42]));
console.log("Already Sorted: ", quickSort([1, 2, 3, 4, 5]));
console.log("Reverse Sorted: ", quickSort([5, 4, 3, 2, 1]));