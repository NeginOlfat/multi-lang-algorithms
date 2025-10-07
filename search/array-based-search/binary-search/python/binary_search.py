def binary_search(arr, target):
    """
    Performs binary search on a sorted array (iterative version).

    Args:
        arr (list): Sorted list of elements.
        target: The value to search for.

    Returns:
        int: Index of the target if found; -1 otherwise.
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1


def binary_search_recursive(arr, target, left=0, right=None):
    """
    Performs binary search on a sorted array (recursive version).

    Args:
        arr (list): Sorted list of elements.
        target: The value to search for.
        left (int): Left bound of search (default is 0).
        right (int): Right bound of search (default is last index).

    Returns:
        int: Index of the target if found; -1 otherwise.
    """
    if right is None:
        right = len(arr) - 1

    if left > right:
        return -1  # Base case: not found

    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)


# Example usage and demonstration
if __name__ == "__main__":
     # Sample sorted data
    data = [10, 20, 30, 40, 50, 60, 70, 80]
    target_value = 60

    print("🔍 Binary Search Examples")
    print(f"Array: {data}")
    print(f"Target: {target_value}\n")

      # --- Iterative Version ---
    result_iter = binary_search(data, target_value)
    if result_iter != -1:
        print(f"✅ [Iterative] Found {target_value} at index {result_iter}.")
    else:
        print(f"❌ [Iterative] {target_value} not found.")

    # --- Recursive Version ---
    result_rec = binary_search_recursive(data, target_value)
    if result_rec != -1:
        print(f"✅ [Recursive] Found {target_value} at index {result_rec}.")
    else:
        print(f"❌ [Recursive] {target_value} not found.")