"""
Sorts a list using the Bubble Sort algorithm.

Args:
    arr (list): The list of comparable elements to be sorted.

Returns:
    list: A new sorted list (original is not modified).

Time Complexity:
    - Best Case: O(n) when array is already sorted (with optimization)
    - Average/Worst Case: O(n²)
Space Complexity: O(1)
"""


def bubble_sort(arr):
    # Create a copy to avoid mutating the original list
    sorted_arr = arr.copy()
    n = len(sorted_arr)

    # If array has 0 or 1 element, it's already sorted
    if n < 2:
        return sorted_arr

    # Outer loop: run for each element
    for i in range(n - 1):
        swapped = False  # Optimization flag

        # Inner loop: compare adjacent elements
        # After each pass, largest element "bubbles up"
        # So we reduce the range by i
        for j in range(n - i - 1):
            if sorted_arr[j] > sorted_arr[j + 1]:
                # Swap elements
                sorted_arr[j], sorted_arr[j + 1] = sorted_arr[j + 1], sorted_arr[j]
                swapped = True

        # Early exit: if no swaps occurred, array is sorted
        if not swapped:
            break

    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original Array:", numbers)
    print("Sorted Array:", bubble_sort(numbers))

    # Test with already sorted array (to show best-case O(n) behavior)
    sorted_array = [1, 2, 3, 4, 5]
    print("Already Sorted:", bubble_sort(sorted_array))