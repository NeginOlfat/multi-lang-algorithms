def fibonacci_search(arr, target):
    """
    Performs Fibonacci Search on a sorted array.

    The algorithm uses Fibonacci numbers to divide the array into unequal parts,
    avoiding division and reducing random memory access.

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

    # Generate smallest Fibonacci number >= n
    fib2 = 0  # F(k-2)
    fib1 = 1  # F(k-1)
    fib = fib1 + fib2  # F(k)

    while fib < n:
        fib2 = fib1
        fib1 = fib
        fib = fib1 + fib2

    # Marks the eliminated range from front
    offset = -1

    # While there are elements to be inspected
    while fib > 1:
        # Check index: min(offset + fib2, n-1)
        i = min(offset + fib2, n - 1)

        if arr[i] < target:
            # Target is in higher section; cut off front part
            fib = fib1
            fib1 = fib2
            fib2 = fib - fib1
            offset = i
        elif arr[i] > target:
            # Target is in lower section; cut off rear part
            fib = fib2
            fib1 = fib1 - fib2
            fib2 = fib - fib1
        else:
            # Found the target
            return i

    # Final check for last element
    if fib1 == 1 and offset + 1 < n and arr[offset + 1] == target:
        return offset + 1

    return -1  # Not found


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Fibonacci Search Example")

    # Sample sorted data
    data = [10, 20, 30, 40, 50, 60, 70, 80]
    target_value = 60

    print(f"Array: {data}")
    print(f"Target: {target_value}")
    print()

    result = fibonacci_search(data, target_value)

    if result != -1:
        print(f"✅ Found {target_value} at index {result}.")
    else:
        print(f"❌ {target_value} not found in the array.")