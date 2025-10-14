def sentinel_search(arr, target):
    """
    Performs Sentinel Search on an array by placing the target as a sentinel at the end.

    This eliminates the need for index-bound checks during iteration,
    reducing comparisons per element from 2 to 1.

    Args:
        arr (list): Array of elements (does not need to be sorted).
        target: The value to search for.

    Returns:
        int: Index of the target if found; -1 otherwise.
    """
    n = len(arr)

    # Handle empty array
    if n == 0:
        return -1

    # Save the last element
    last_element = arr[-1]

    # Place the target as sentinel at the end
    arr[-1] = target

    # Start searching from the beginning
    i = 0
    while arr[i] != target:
        i += 1

    # Restore the original last element
    arr[-1] = last_element

    # Check if the found element is valid
    if i < n - 1 or last_element == target:
        return i  # Found in valid position
    else:
        return -1  # Not present


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Sentinel Search Example")

    # Sample unsorted data
    data = [10, 20, 35, 40, 50]
    target_value = 35

    print(f"Original Array: {data}")
    print(f"Target: {target_value}")
    print()

    result = sentinel_search(data, target_value)

    if result != -1:
        print(f"✅ Found {target_value} at index {result}.")
    else:
        print(f"❌ {target_value} not found in the array.")

    print(f"Array after search: {data}")  # Should be unchanged