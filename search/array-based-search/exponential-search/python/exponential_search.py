def exponential_search(arr, target):
    """
    Performs exponential search on a sorted array.

    Steps:
    1. Find range where the target could be by doubling the index.
    2. Perform binary search within that range.

    Args:
        arr (list): Sorted list of elements.
        target: The value to search for.

    Returns:
        int: Index of the target if found; -1 otherwise.
    """
    n = len(arr)

    # Handle empty array
    if n == 0:
        return -1

    # Step 1: Find the range [i//2, min(i, n-1)] where target may lie
    if arr[0] == target:
        return 0  # Found at first element

    i = 1
    while i < n and arr[i] < target:
        i *= 2  # Double the index (exponential growth)

    # Now we have a range: [i//2, min(i, n-1)]
    left = i // 2
    right = min(i, n - 1)

    # Step 2: Perform binary search in the identified range
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Not found


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Exponential Search Example")

    # Sample sorted data
    data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    target_value = 70

    print(f"Array: {data}")
    print(f"Target: {target_value}")
    print()

    result = exponential_search(data, target_value)

    if result != -1:
        print(f"✅ Found {target_value} at index {result}.")
    else:
        print(f"❌ {target_value} not found in the array.")