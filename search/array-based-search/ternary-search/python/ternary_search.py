def ternary_search_peak(arr):
    """
    Finds the index of the maximum element in a unimodal (mountain) array using iterative ternary search.
    
    A unimodal array increases first, then decreases.
    
    Args:
        arr (list): Unimodal list of numbers.
        
    Returns:
        int: Index of the peak element; -1 if invalid input.
    """
    if not arr or len(arr) == 0:
        return -1
    if len(arr) == 1:
        return 0

    left, right = 0, len(arr) - 1

    while left <= right:
        if right - left < 2:
            # Small range: check manually
            if left == right:
                return left
            else:
                return left if arr[left] >= arr[right] else right

        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3

        if arr[mid1] < arr[mid2]:
            # Peak is in the right two-thirds
            left = mid1 + 1
        else:
            # Peak is in the left two-thirds
            right = mid2 - 1

    return -1  # Should not reach here for valid input


def ternary_search_function_max(f, left, right, precision=1e-9):
    """
    Finds the x-value that maximizes a unimodal function f(x) within [left, right].
    
    Args:
        f (callable): Unimodal function to maximize.
        left (float): Left bound of search interval.
        right (float): Right bound of search interval.
        precision (float): Desired precision (tolerance).
        
    Returns:
        float: Approximate x-value where f(x) is maximum.
    """
    while right - left > precision:
        mid1 = left + (right - left) / 3
        mid2 = right - (right - left) / 3

        if f(mid1) < f(mid2):
            left = mid1
        else:
            right = mid2

    return (left + right) / 2


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Ternary Search Examples")

    # --- Example 1: Find peak in unimodal array ---
    print("\n🎯 Example 1: Finding Peak in Array")
    data = [1, 3, 5, 7, 8, 6, 4, 2]
    print(f"Array: {data}")
    peak_index = ternary_search_peak(data)
    if peak_index != -1:
        print(f"✅ Peak found at index {peak_index} → value = {data[peak_index]}")
    else:
        print("❌ No peak found.")

    # --- Example 2: Maximize a mathematical function ---
    print("\n📈 Example 2: Maximizing a Function")
    def f(x):
        return -x * x + 6 * x + 5  # Parabola with max at x=3

    print("Function: f(x) = -x² + 6x + 5")
    print("Searching maximum in range [0, 6]...")
    max_x = ternary_search_function_max(f, 0, 6)
    max_y = f(max_x)
    print(f"✅ Maximum at x ≈ {max_x:.6f}")
    print(f"   f({max_x:.6f}) = {max_y:.6f}")