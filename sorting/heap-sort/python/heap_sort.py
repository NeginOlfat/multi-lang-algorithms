"""
Sorts a list using the Heap Sort algorithm.

Args:
    arr (list): The list of comparable elements to be sorted.

Returns:
    list: A new sorted list (original is not modified).

Time Complexity:
    - Best/Average/Worst: O(n log n)
Space Complexity: O(1) extra space (if in-place), O(n) if preserving input
"""


def heap_sort(arr):
    # Create a copy to avoid mutating the original list
    sorted_arr = arr.copy()
    n = len(sorted_arr)

    # If array has 0 or 1 element, it's already sorted
    if n < 2:
        return sorted_arr

    # Build a max heap from the array
    # Start from the last non-leaf node
    for i in range(n // 2 - 1, -1, -1):
        heapify(sorted_arr, n, i)

    # Extract elements from the heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root (max) to the end
        sorted_arr[0], sorted_arr[i] = sorted_arr[i], sorted_arr[0]

        # Restore the heap property on the reduced heap
        heapify(sorted_arr, i, 0)

    return sorted_arr


def heapify(heap, heap_size, i):
    """
    Turns a subtree rooted at index 'i' into a max heap.

    Args:
        heap (list): The array representing the heap.
        heap_size (int): Current size of the heap.
        i (int): Index of the root of the subtree.
    """
    largest = i  # Initialize largest as root
    left = 2 * i + 1      # Left child index
    right = 2 * i + 2     # Right child index

    # If left child exists and is greater than root
    if left < heap_size and heap[left] > heap[largest]:
        largest = left

    # If right child exists and is greater than current largest
    if right < heap_size and heap[right] > heap[largest]:
        largest = right

    # If the largest is not the root, swap and continue heapifying
    if largest != i:
        heap[i], heap[largest] = heap[largest], heap[i]  # Swap
        heapify(heap, heap_size, largest)  # Recursively heapify the affected subtree


# Example Usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original Array:", numbers)
    print("Sorted Array:", heap_sort(numbers))

    # Test with already sorted array
    sorted_array = [1, 2, 3, 4, 5]
    print("Already Sorted:", heap_sort(sorted_array))