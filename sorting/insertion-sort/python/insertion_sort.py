"""
Insertion Sort Algorithm (Python) - Non-Mutating Version

Sorts an array by building a sorted section one element at a time.
This version does NOT modify the original list.

Time Complexity:
    Best Case:  O(n)     - when array is already sorted
    Average Case: O(n²)
    Worst Case: O(n²)    - when array is reverse sorted
Space Complexity: O(n)   - due to copying the input
"""


def insertion_sort(arr):
    """
    Sorts a list using the Insertion Sort algorithm.
    
    This version creates a copy of the input list, so the original
    remains unchanged.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Returns:
        list: A new list that is sorted.
    """
    # Create a copy to avoid mutating the original array
    sorted_arr = arr.copy()
    n = len(sorted_arr)

    # If array has 0 or 1 element, it's already sorted
    if n < 2:
        return sorted_arr

    # Traverse from the second element (index 1) to the end
    for i in range(1, n):
        key = sorted_arr[i]  # Current element to be positioned
        j = i - 1            # Index of the last element in the sorted portion

        # Move elements greater than key one position ahead
        while j >= 0 and sorted_arr[j] > key:
            sorted_arr[j + 1] = sorted_arr[j]
            j -= 1

        # Insert the key at its correct position
        sorted_arr[j + 1] = key

    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [12, 11, 13, 5, 6]
    print("Original Array:", numbers)  # Remains unchanged

    sorted_numbers = insertion_sort(numbers)  # Safe: original not modified
    print("Sorted Array:", sorted_numbers)

    # Verify original is unchanged
    print("Original After Sort:", numbers)

    # Test other cases
    print("Already Sorted:", insertion_sort([1, 2, 3, 4, 5]))
    print("Reverse Sorted:", insertion_sort([5, 4, 3, 2, 1]))
    print("Single Element:", insertion_sort([42]))
    print("Empty Array:", insertion_sort([]))