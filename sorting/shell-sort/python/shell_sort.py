"""
Sorts a list using Shell Sort with Knuth's gap sequence.

Args:
    arr (list): The list of comparable elements to be sorted (modified in-place).

Returns:
    list: The sorted list.

Time Complexity:
    - Best: O(n log n)
    - Average: O(n^1.3) approx
    - Worst: O(n²) — depends on gap sequence

Space Complexity: O(1) — in-place sorting

✅ Based on Insertion Sort but with decreasing gaps
✅ Uses Knuth sequence: 1, 4, 13, 40, ... (gap = 3*gap + 1)
❌ Not stable
"""


def shell_sort(arr):
    if len(arr) <= 1:
        return arr

    n = len(arr)
    gap = 1

    # Find the largest gap in Knuth sequence: 1, 4, 13, 40, ...
    # Such that gap < n // 3
    while gap < n // 3:
        gap = 3 * gap + 1  # 1, 4, 13, 40, 121, ...

    # Perform gapped insertion sort for each gap
    while gap > 0:
        # Do a gapped insertion sort for this gap size
        for i in range(gap, n):
            temp = arr[i]
            j = i

            # Shift elements that are `gap` apart until correct position is found
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap

            # Place temp in its correct location
            arr[j] = temp

        # Reduce gap using Knuth's formula: (gap - 1) // 3
        gap = (gap - 1) // 3

    return arr


# Example Usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original Array:", numbers)

    # Use .copy() to avoid mutating original
    sorted_numbers = shell_sort(numbers.copy())
    print("Sorted Array:", sorted_numbers)

    # Test with already sorted array
    sorted_arr = [1, 2, 3, 4, 5]
    print("Already Sorted:", shell_sort(sorted_arr.copy()))

    # Test with reverse-sorted
    reverse = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    print("Reverse Sorted:", shell_sort(reverse.copy()))

    # Test with duplicates
    duplicates = [5, 2, 8, 2, 9, 1, 5]
    print("With Duplicates:", shell_sort(duplicates.copy()))

    # Test with single element
    single = [42]
    print("Single Element:", shell_sort(single.copy()))