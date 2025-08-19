"""
Sorts a list using Comb Sort.

Args:
    arr (list): The list of comparable elements to be sorted (modified in-place).

Returns:
    list: The sorted list.

Time Complexity:
    - Best/Average: O(n log n) with shrink factor 1.3
    - Worst: O(n²)

Space Complexity: O(1) — in-place sorting

✅ Improves Bubble Sort by eliminating "turtles" (small values near the end)
✅ Uses shrink factor of 1.3 (empirically optimal)
❌ Not stable
"""


def comb_sort(arr):
    if len(arr) <= 1:
        return arr

    n = len(arr)
    gap = n
    shrink_factor = 1.3
    swapped = True

    # Continue until gap is 1 AND no swaps occurred
    while gap > 1 or swapped:
        # Shrink gap by shrink factor
        gap = int(gap / shrink_factor)
        if gap < 1:
            gap = 1

        swapped = False

        # Compare elements with current gap
        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                # Swap elements
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True

    return arr


def comb_sort_stable(arr):
    """
    Returns a new sorted list (non-mutating).

    Args:
        arr (list): The input list.

    Returns:
        list: A new sorted list.
    """
    sorted_arr = arr.copy()
    comb_sort(sorted_arr)
    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original Array:", numbers)
    print("Sorted Array:", comb_sort_stable(numbers))

    # Test with already sorted
    sorted_arr = [1, 2, 3, 4, 5]
    print("\nAlready Sorted:", comb_sort_stable(sorted_arr))

    # Test with reverse order
    reverse = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    print("Reverse Sorted:", comb_sort_stable(reverse))

    # Test with duplicates
    duplicates = [5, 2, 8, 2, 9, 1, 5]
    print("With Duplicates:", comb_sort_stable(duplicates))

    # Test with single element
    single = [42]
    print("Single Element:", comb_sort_stable(single))

    # Test with empty array
    empty = []
    print("Empty Array:", comb_sort_stable(empty))

    # Test with two elements
    two = [2, 1]
    print("Two Elements:", comb_sort_stable(two))