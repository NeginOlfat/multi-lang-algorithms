def interpolation_search(arr, target):
    """
    Performs interpolation search on a sorted array.

    Args:
        arr (list): Sorted list of elements (preferably uniformly distributed).
        target: The value to search for.

    Returns:
        int: Index of the target if found; -1 otherwise.
    """
    low = 0
    high = len(arr) - 1

    # Handle empty array
    if low > high:
        return -1

    while low <= high and arr[low] <= target <= arr[high]:
        # Avoid division by zero when all values in the range are equal
        if arr[high] == arr[low]:
            if arr[low] == target:
                return low  # All elements are same; check if it's the target
            else:
                return -1  # Not present

        # Estimate position using interpolation formula
        pos = low + ((target - arr[low]) * (high - low)) // (arr[high] - arr[low])

        # Ensure pos is within bounds
        if pos < low or pos > high:
            break  # Extrapolation failed due to non-uniform data

        # Check if the estimated position holds the target
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1  # Target is in the right subarray
        else:
            high = pos - 1  # Target is in the left subarray

    return -1  # Not found


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Interpolation Search Example")

    # Sample sorted and uniformly distributed data
    data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    target_value = 70

    print(f"Array: {data}")
    print(f"Target: {target_value}")
    print()

    result = interpolation_search(data, target_value)

    if result != -1:
        print(f"✅ Found {target_value} at index {result}.")
    else:
        print(f"❌ {target_value} not found in the array.")