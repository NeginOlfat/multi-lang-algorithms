"""
Merge Sort Algorithm (Python)

A divide-and-conquer sorting algorithm that:
1. Divides the array into two halves
2. Recursively sorts each half
3. Merges the two sorted halves

Time Complexity:
    Best, Average, Worst: O(n log n)
Space Complexity: O(n) - due to auxiliary arrays during merge

Note: This version returns a new sorted list (non-mutating).
Original list remains unchanged.
"""


def merge_sort(arr):
    """
    Sorts a list using the Merge Sort algorithm (non-mutating).

    Args:
        arr (list): The list of comparable elements to be sorted.

    Returns:
        list: A new sorted list.
    """
    # Base case: lists with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr

    # Divide: split the array into two halves
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # Conquer: recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    # Combine: merge the two sorted halves
    return merge(left_sorted, right_sorted)


def merge(left, right):
    """
    Merges two sorted lists into one sorted list.

    Args:
        left (list): Left sorted sublist
        right (list): Right sorted sublist

    Returns:
        list: Merged sorted list
    """
    result = []
    i = j = 0  # Pointers for left and right arrays

    # Compare elements from both lists and add smaller one to result
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements (if any)
    while i < len(left):
        result.append(left[i])
        i += 1

    while j < len(right):
        result.append(right[j])
        j += 1

    return result


# Example Usage
if __name__ == "__main__":
    numbers = [38, 27, 43, 3, 9, 82, 10]
    print("Original Array:", numbers)

    sorted_numbers = merge_sort(numbers)
    print("Sorted Array:", sorted_numbers)

    # Verify original is unchanged
    print("Original After Sort:", numbers)

    # Test edge cases
    print("Already Sorted:", merge_sort([1, 2, 3, 4, 5]))
    print("Reverse Sorted:", merge_sort([5, 4, 3, 2, 1]))
    print("Single Element:", merge_sort([42]))
    print("Empty Array:", merge_sort([]))
    print("Two Elements:", merge_sort([2, 1]))