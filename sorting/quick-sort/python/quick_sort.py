"""
Sorts a list using the Quick Sort algorithm (Lomuto partition scheme).

Args:
    arr (list): The list of comparable elements to be sorted.

Returns:
    list: A new sorted list (original is not modified).

Time Complexity:
    - Best/Average: O(n log n)
    - Worst: O(n²) — rare with random data
Space Complexity: O(log n) due to recursion stack depth
"""


def quick_sort(arr):
    # Create a copy to avoid mutating the original list
    sorted_arr = arr.copy()

    def sort(low, high):
        """Recursively sort the subarray from low to high."""
        if low < high:
            # Partition the array and get the pivot index
            pivot_index = partition(low, high)
            # Recursively sort elements before and after partition
            sort(low, pivot_index - 1)
            sort(pivot_index + 1, high)

    def partition(low, high):
        """
        Partitions the array using Lomuto scheme (last element as pivot).
        Returns the final index of the pivot.
        """
        pivot = sorted_arr[high]  # Choose last element as pivot
        i = low - 1  # Index of smaller element

        for j in range(low, high):
            if sorted_arr[j] <= pivot:
                i += 1
                # Swap elements
                sorted_arr[i], sorted_arr[j] = sorted_arr[j], sorted_arr[i]

        # Place pivot in correct position
        sorted_arr[i + 1], sorted_arr[high] = sorted_arr[high], sorted_arr[i + 1]
        return i + 1  # Return pivot index

    # Only sort if there are at least 2 elements
    if len(sorted_arr) > 1:
        sort(0, len(sorted_arr) - 1)

    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [10, 80, 30, 90, 40, 50, 70]
    print("Original Array: ", numbers)
    print("Sorted Array:   ", quick_sort(numbers))

    # Test edge cases
    print("Empty Array:    ", quick_sort([]))
    print("Single Element: ", quick_sort([42]))
    print("Already Sorted: ", quick_sort([1, 2, 3, 4, 5]))
    print("Reverse Sorted: ", quick_sort([5, 4, 3, 2, 1]))