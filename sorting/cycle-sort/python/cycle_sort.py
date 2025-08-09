"""
Sorts a list using Cycle Sort.

Args:
    arr (list): The list to be sorted (modified in-place).

Returns:
    int: Number of writes performed (for analysis).

Time Complexity: O(n²) — due to nested loops
Space Complexity: O(1)

✅ Minimizes memory writes — ideal for flash/EPPROM
✅ Each element written at most once to final position
❌ Not stable
"""


def cycle_sort(arr):
    writes = 0
    n = len(arr)

    # Traverse the array and cycle-sort each element
    for cycle_start in range(n - 1):
        item = arr[cycle_start]
        pos = cycle_start

        # Step 1: Count how many elements are smaller than `item`
        # This gives the correct position for `item`
        for i in range(cycle_start + 1, n):
            if arr[i] < item:
                pos += 1

        # If item is already in correct position, skip
        if pos == cycle_start:
            continue

        # Skip duplicates: elements equal to `item` that are already placed
        while pos < n and arr[pos] == item:
            pos += 1

        # Place `item` in its correct position
        if pos < n:
            arr[pos], item = item, arr[pos]
            writes += 1

        # Step 2: Complete the cycle
        # Continue until we return to the starting position
        while pos != cycle_start:
            pos = cycle_start

            # Recalculate correct position for current `item`
            for i in range(cycle_start + 1, n):
                if arr[i] < item:
                    pos += 1

            # Skip duplicates
            while pos < n and arr[pos] == item:
                pos += 1

            # Place `item` in its correct position
            if pos < n:
                arr[pos], item = item, arr[pos]
                writes += 1

    return writes


def cycle_sort_stable(arr):
    """
    Returns a new sorted list (non-mutating).

    Args:
        arr (list): The input list.

    Returns:
        list: A new sorted list.
    """
    sorted_arr = arr.copy()
    cycle_sort(sorted_arr)
    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [3, 2, 1, 4]
    print("Original Array:", numbers)
    print("Sorted Array:", cycle_sort_stable(numbers))

    # Test with duplicates
    with_duplicates = [4, 2, 1, 2, 3]
    print("\nWith Duplicates - Original:", with_duplicates)
    print("Sorted:", cycle_sort_stable(with_duplicates))

    # Test with already sorted
    already_sorted = [1, 2, 3, 4, 5]
    print("\nAlready Sorted - Original:", already_sorted)
    print("Sorted:", cycle_sort_stable(already_sorted))

    # Test with reverse order
    reverse = [5, 4, 3, 2, 1]
    print("\nReverse - Original:", reverse)
    sorted_reverse = reverse.copy()
    write_count = cycle_sort(sorted_reverse)
    print("Sorted:", sorted_reverse)
    print("Writes performed:", write_count)

    # Test with single element
    single = [42]
    print("\nSingle Element:", cycle_sort_stable(single))

    # Test with empty array
    empty = []
    print("Empty Array:", cycle_sort_stable(empty))