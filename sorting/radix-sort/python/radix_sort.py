"""
Sorts a list of non-negative integers using Radix Sort (LSD method).

Args:
    arr (list of int): The list to be sorted.

Returns:
    list: A new sorted list (original is not modified).

Time Complexity: O(d × n) where d = number of digits, n = length
Space Complexity: O(n + k) where k = base (10 for decimal)

✅ Stable: uses Counting Sort for each digit
✅ Efficient for fixed-length keys (e.g., phone numbers, IDs)
❌ Only works with non-negative integers
"""


def radix_sort(arr):
    # Handle edge cases
    if len(arr) <= 1:
        return arr.copy()

    # Find the maximum number to determine number of digits
    max_val = max(arr)
    digits = 1 if max_val == 0 else len(str(max_val))

    # Make a copy to avoid mutation
    sorted_arr = arr.copy()

    # Process each digit from least significant to most significant
    for digit in range(digits):
        sorted_arr = counting_sort_by_digit(sorted_arr, digit)

    return sorted_arr


def counting_sort_by_digit(arr, digit):
    """
    Stable counting sort based on the i-th digit (LSD, 0-indexed).

    Args:
        arr (list): List of integers to sort
        digit (int): Which digit to sort by (0 = ones, 1 = tens, etc.)

    Returns:
        list: New sorted list
    """
    base = 10
    count = [0] * base
    output = [0] * len(arr)

    # Step 1: Count frequency of each digit
    for num in arr:
        d = get_digit(num, digit)
        count[d] += 1

    # Step 2: Compute cumulative count
    for i in range(1, base):
        count[i] += count[i - 1]

    # Step 3: Build output array from right to left (for stability)
    for i in range(len(arr) - 1, -1, -1):
        num = arr[i]
        d = get_digit(num, digit)
        pos = count[d] - 1
        output[pos] = num
        count[d] -= 1

    return output


def get_digit(num, i):
    """
    Extracts the i-th digit from a number (from right, 0-indexed).

    Args:
        num (int): The number
        i (int): Digit position (0 = ones, 1 = tens, etc.)

    Returns:
        int: The digit value

    Example:
        get_digit(170, 0) → 0 (ones place)
        get_digit(170, 1) → 7 (tens place)
        get_digit(170, 2) → 1 (hundreds place)
    """
    return (num // (10 ** i)) % 10


# Example Usage
if __name__ == "__main__":
    numbers = [170, 45, 75, 90, 2, 802, 24, 66]
    print("Original Array:", numbers)
    print("Sorted Array:", radix_sort(numbers))

    # Test with single-digit and zeros
    small = [3, 1, 4, 1, 5, 9, 2, 6, 5]
    print("\nSmall Array:", small)
    print("Sorted:", radix_sort(small))

    # Test with all same digits
    repeated = [222, 111, 333, 121, 212]
    print("\nRepeated Digits:", repeated)
    print("Sorted:", radix_sort(repeated))

    # Test with zero and duplicates
    edge_case = [0, 0, 1, 10, 100]
    print("\nEdge Case:", edge_case)
    print("Sorted:", radix_sort(edge_case))