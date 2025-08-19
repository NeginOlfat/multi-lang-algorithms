"""
Sorts a list using Pigeonhole Sort.

Args:
    arr (list of int): The list to be sorted.

Returns:
    list: A new sorted list (original is not modified).

Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
Space Complexity: O(n + k) for the pigeonholes

✅ Stable: preserves relative order of equal elements
✅ Works with negative numbers
❌ Not in-place
❌ Only efficient when range k is small and close to n
"""


def pigeonhole_sort(arr):
    # Handle edge cases
    if len(arr) <= 1:
        return arr.copy()

    # Find min and max to determine range
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val + 1  # Shift all values to non-negative indices

    # Step 1: Create pigeonholes (one for each possible value)
    pigeonholes = [[] for _ in range(range_val)]

    # Step 2: Place each element in its corresponding pigeonhole
    for value in arr:
        index = value - min_val  # Map value to hole index
        pigeonholes[index].append(value)  # Preserve order (stable)

    # Step 3: Reconstruct sorted array by iterating through holes
    sorted_arr = []
    for hole in pigeonholes:
        sorted_arr.extend(hole)  # Append all elements in order

    return sorted_arr


# Example Usage
if __name__ == "__main__":
    numbers = [8, 3, 5, 3, 1, 7]
    print("Original Array:", numbers)
    print("Sorted Array:", pigeonhole_sort(numbers))

    # Test with negative numbers
    with_negatives = [-1, -5, 2, 0, 2, -5, 1]
    print("\nWith Negatives:", with_negatives)
    print("Sorted (handles negatives):", pigeonhole_sort(with_negatives))

    # Test with already sorted
    already_sorted = [1, 2, 3, 4, 5]
    print("\nAlready Sorted:", already_sorted)
    print("Sorted:", pigeonhole_sort(already_sorted))

    # Test with reverse order
    reverse = [5, 4, 3, 2, 1]
    print("\nReverse Order:", reverse)
    print("Sorted:", pigeonhole_sort(reverse))

    # Test with duplicates
    duplicates = [4, 2, 8, 2, 9, 1, 5]
    print("\nWith Duplicates:", duplicates)
    print("Sorted:", pigeonhole_sort(duplicates))

    # Test with single element
    single = [42]
    print("\nSingle Element:", pigeonhole_sort(single))

    # Test with empty array
    empty = []
    print("Empty Array:", pigeonhole_sort(empty))

    # Test with all same values
    same = [3, 3, 3]
    print("All Same:", pigeonhole_sort(same))