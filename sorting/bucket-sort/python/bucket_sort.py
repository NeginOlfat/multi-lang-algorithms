"""
Sorts a list using Bucket Sort.

Args:
    arr (list of float/int): The list of numbers to sort.
    num_buckets (int): Number of buckets to use (default: 5).

Returns:
    list: A new sorted list.

Time Complexity:
    - Best/Average: O(n + k) when data is uniformly distributed
    - Worst: O(n²) when all elements fall into one bucket

Space Complexity: O(n + k)

✅ Best for uniformly distributed data (e.g., random floats in [0,1))
✅ Uses Insertion Sort for small buckets
❌ Not stable if bucket sort method isn't stable
❌ Extra space required
"""


def bucket_sort(arr, num_buckets=5):
    # Handle edge cases
    if len(arr) <= 1:
        return arr.copy()

    # Find min and max to determine range
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val

    # Avoid division by zero if all elements are the same
    if range_val == 0:
        return arr.copy()

    # Create k empty buckets
    buckets = [[] for _ in range(num_buckets)]

    # Distribute elements into buckets
    for num in arr:
        # Normalize value to bucket index: [0, num_buckets)
        bucket_index = int((num - min_val) / range_val * (num_buckets - 1))

        # Clamp index to [0, num_buckets - 1]
        bucket_index = max(0, min(bucket_index, num_buckets - 1))

        buckets[bucket_index].append(num)

    # Sort each bucket using Insertion Sort
    for bucket in buckets:
        insertion_sort(bucket)

    # Concatenate all buckets into output
    sorted_arr = []
    for bucket in buckets:
        sorted_arr.extend(bucket)

    return sorted_arr


def insertion_sort(arr):
    """
    Sorts a list in-place using Insertion Sort.

    Args:
        arr (list): The list to sort (modified in-place).
    """
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key


# Example Usage
if __name__ == "__main__":
    numbers = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]
    print("Original Array:", numbers)
    print("Sorted Array:", bucket_sort(numbers, 5))

    # Test with already sorted
    sorted_arr = [0.1, 0.2, 0.3, 0.4, 0.5]
    print("Already Sorted:", bucket_sort(sorted_arr))

    # Test with reverse order
    reverse = [0.9, 0.8, 0.7, 0.6, 0.5]
    print("Reverse Sorted:", bucket_sort(reverse))

    # Test with duplicates
    duplicates = [0.3, 0.1, 0.4, 0.1, 0.5, 0.9, 0.2, 0.6, 0.5, 0.3]
    print("With Duplicates:", bucket_sort(duplicates, 5))

    # Test with all same values
    same = [0.5, 0.5, 0.5]
    print("All Same:", bucket_sort(same))

    # Test with integers
    integers = [64, 34, 25, 12, 22, 11, 90]
    print("Integers (Uniformly distributed?):", bucket_sort(integers, 5))