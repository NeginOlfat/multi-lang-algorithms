import math


def jump_search(arr, target):
    """
    Performs jump search on a sorted array.

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

    # Optimal block size is sqrt(n)
    step = int(math.sqrt(n))
    prev = 0  # Starting index of current block

    # Jump forward in blocks until arr[min(step, n)-1] >= target
    while step < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))

    # Now perform linear search within the identified block
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i  # Return index if found

    return -1  # Not found


# Example usage and demonstration
if __name__ == "__main__":
    # Sample sorted data
    data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target_value = 7

    print("🚶‍♂️ Jump Search Example")
    print(f"Array: {data}")
    print(f"Target: {target_value}\n")

    result = jump_search(data, target_value)

    if result != -1:
        print(f"✅ Found {target_value} at index {result}.")
    else:
        print(f"❌ {target_value} not found in the array.")