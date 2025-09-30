def linear_search(arr, target):
    """
    Performs linear search on a list to find the index of the target value.

    Args:
        arr (list): The list to search in.
        target: The value to search for.

    Returns:
        int: Index of the target if found, otherwise -1.
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return the index if target is found
    return -1  # Return -1 if target is not found


# Example usage and demonstration
if __name__ == "__main__":
    # Sample data
    data = [10, 50, 30, 70, 80, 20, 90, 40]
    target_value = 20

    # Perform linear search
    result = linear_search(data, target_value)

    # Output result
    if result != -1:
        print(f"✅ Found {target_value} at index {result}.")
    else:
        print(f"❌ {target_value} not found in the array.")