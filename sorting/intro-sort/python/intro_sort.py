"""
Simplified Intro Sort (Introspective Sort) - Educational Version

Phases:
1. Quick Sort (fast average case)
2. Switch to Heap Sort if recursion depth is too deep
3. Use Insertion Sort for small subarrays

For learning only — not production
"""


def intro_sort(arr):
    if len(arr) <= 1:
        return arr.copy()

    import math

    # Max allowed depth: 2 * floor(log2(n))
    max_depth = 2 * math.floor(math.log2(len(arr)))
    sorted_arr = arr.copy()  # Don't mutate input

    def insertion_sort(arr, left, right):
        """Sort small subarrays using Insertion Sort."""
        for i in range(left + 1, right + 1):
            key = arr[i]
            j = i - 1
            while j >= left and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key

    def heapify(arr, n, i, offset):
        """Heapify a subtree rooted at index i with offset."""
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[offset + left] > arr[offset + largest]:
            largest = left
        if right < n and arr[offset + right] > arr[offset + largest]:
            largest = right

        if largest != i:
            arr[offset + i], arr[offset + largest] = arr[offset + largest], arr[offset + i]
            heapify(arr, n, largest, offset)

    def heap_sort(arr, left, right):
        """Sort subarray using Heap Sort."""
        n = right - left + 1
        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            heapify(arr, n, i, left)
        # Extract elements
        for i in range(n - 1, 0, -1):
            arr[left], arr[left + i] = arr[left + i], arr[left]
            heapify(arr, i, 0, left)

    def partition(arr, left, right):
        """Partition using median-of-three pivot."""
        mid = (left + right) // 2

        # Sort arr[left], arr[mid], arr[right] to get median at mid
        if arr[mid] < arr[left]:
            arr[left], arr[mid] = arr[mid], arr[left]
        if arr[right] < arr[left]:
            arr[left], arr[right] = arr[right], arr[left]
        if arr[right] < arr[mid]:
            arr[mid], arr[right] = arr[right], arr[mid]

        pivot = arr[mid]
        arr[mid], arr[right] = arr[right], arr[mid]  # Move pivot to end

        i = left
        for j in range(left, right):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[right] = arr[right], arr[i]
        return i

    def intro_sort_loop(arr, left, right, depth_limit):
        """Recursive loop with depth control."""
        # Small array: use Insertion Sort
        if right - left + 1 <= 16:
            insertion_sort(arr, left, right)
            return

        # Too deep: switch to Heap Sort
        if depth_limit <= 0:
            heap_sort(arr, left, right)
            return

        # Otherwise: Quick Sort
        pivot_index = partition(arr, left, right)
        intro_sort_loop(arr, left, pivot_index - 1, depth_limit - 1)
        intro_sort_loop(arr, pivot_index + 1, right, depth_limit - 1)

    # Start sorting
    intro_sort_loop(sorted_arr, 0, len(sorted_arr) - 1, max_depth)
    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original Array:", numbers)
    print("Sorted Array:", intro_sort(numbers))

    # Test with already sorted
    print("\nAlready Sorted:", intro_sort([1, 2, 3, 4, 5]))

    # Test with reverse
    print("Reverse Sorted:", intro_sort([5, 4, 3, 2, 1]))

    # Test with duplicates
    print("With Duplicates:", intro_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]))

    # Test with single element
    print("Single Element:", intro_sort([42]))

    # Test with two elements
    print("Two Elements:", intro_sort([2, 1]))