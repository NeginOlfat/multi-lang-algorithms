"""
Selection Sort Algorithm (Python)

Sorts an array by repeatedly finding the minimum element from the unsorted part
and putting it at the beginning.

Time Complexity:
    Best, Average, Worst: O(n²)
Space Complexity: O(1) — sorts in-place (if modifying original), or O(n) if copying

Note: This version returns a new sorted list without modifying the original.
"""


def selection_sort(arr):
    """
    Sorts a list using the Selection Sort algorithm.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Returns:
        list: A new sorted list (original is not modified).
    """
    # Create a copy to avoid mutating the original list
    sorted_arr = arr.copy()
    n = len(sorted_arr)

    # If array has 0 or 1 element, it's already sorted
    if n < 2:
        return sorted_arr

    # Traverse through all array elements
    for i in range(n - 1):
        # Assume the first unsorted element is the minimum
        min_index = i

        # Find the actual minimum element in the remaining unsorted portion
        for j in range(i + 1, n):
            if sorted_arr[j] < sorted_arr[min_index]:
                min_index = j

        # Swap only if a smaller element was found
        if min_index != i:
            sorted_arr[i], sorted_arr[min_index] = sorted_arr[min_index], sorted_arr[i]

    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [64, 25, 12, 22, 11]
    print("Original Array:", numbers)
    print("Sorted Array:", selection_sort(numbers))

    # Test with already sorted array
    sorted_array = [1, 2, 3, 4, 5]
    print("Already Sorted:", selection_sort(sorted_array))

    # Test with one element
    print("Single Element:", selection_sort([42]))