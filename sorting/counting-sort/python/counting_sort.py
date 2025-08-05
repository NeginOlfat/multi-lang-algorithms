"""
Sorts a list using the Counting Sort algorithm.

Args:
    arr (list of int): The list to be sorted.

Returns:
    list: A new sorted list (original is not modified).

Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
Space Complexity: O(k) for the count array

✅ Stable: preserves relative order of equal elements
✅ Works with negative numbers
❌ Not in-place
"""


def counting_sort(arr):
    # Handle edge cases
    if len(arr) <= 1:
        return arr.copy()

    # Find min and max to determine range
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val + 1  # Shift all values to non-negative indices

    # Step 1: Count frequency of each element
    count = [0] * range_val
    for value in arr:
        count[value - min_val] += 1  # Shift index by min_val

    # Step 2: Compute cumulative count
    # Now count[i] contains count of elements <= (i + min_val)
    for i in range(1, range_val):
        count[i] += count[i - 1]

    # Step 3: Build output array from right to left (for stability)
    output = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):  # Traverse backwards
        value = arr[i]
        count_index = value - min_val

        # Place element at its final position
        position = count[count_index] - 1
        output[position] = value

        # Decrement count for next occurrence of same value
        count[count_index] -= 1

    return output


# Example Usage
if __name__ == "__main__":
    numbers = [4, 2, 2, 8, 3, 3, 1]
    print("Original Array:", numbers)
    print("Sorted Array:", counting_sort(numbers))

    # Test with negative numbers
    with_negatives = [-1, -5, 2, 0, 2, -5, 1]
    print("With Negatives:", with_negatives)
    print("Sorted (handles negatives):", counting_sort(with_negatives))

    # Test stability with dictionary objects (simulating custom objects)
    def counting_sort_objects(arr, key_func):
        """
        Stable counting sort for objects using a key function.
        """
        if len(arr) <= 1:
            return [item for item in arr]

        # Extract key values
        values = [key_func(item) for item in arr]
        min_val = min(values)
        max_val = max(values)
        range_val = max_val - min_val + 1

        # Step 1: Count frequencies
        count = [0] * range_val
        for value in values:
            count[value - min_val] += 1

        # Step 2: Cumulative count
        for i in range(1, range_val):
            count[i] += count[i - 1]

        # Step 3: Build output from right to left (stable)
        output = [None] * len(arr)
        for i in range(len(arr) - 1, -1, -1):
            value = key_func(arr[i])
            pos = count[value - min_val] - 1
            output[pos] = arr[i]
            count[value - min_val] -= 1

        return output

    # Test stability
    people = [
        {"name": "Alice", "grade": 2},
        {"name": "Bob", "grade": 1},
        {"name": "Charlie", "grade": 2},
        {"name": "David", "grade": 1}
    ]

    sorted_people = counting_sort_objects(people, key_func=lambda x: x["grade"])
    print("\nStability Test (by grade):")
    for person in sorted_people:
        print(f"{person['name']}: {person['grade']}")