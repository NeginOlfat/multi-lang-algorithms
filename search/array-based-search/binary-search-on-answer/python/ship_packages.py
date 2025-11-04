def can_ship(weights, capacity, max_days):
    """
    Check if all packages can be shipped within 'max_days' using given 'capacity'.
    
    Simulates loading in order, starting new days when capacity is exceeded.
    
    Args:
        weights (list): List of package weights (in order)
        capacity (int): Ship capacity per day
        max_days (int): Maximum allowed days
    
    Returns:
        bool: True if shipping within max_days is possible
    """
    days_needed = 1
    current_load = 0
    
    for w in weights:
        if current_load + w <= capacity:
            current_load += w
        else:
            days_needed += 1
            current_load = w
            if days_needed > max_days:
                return False  # Early exit
    
    return days_needed <= max_days


def min_ship_capacity(weights, D):
    """
    Finds the minimum ship capacity required to ship all packages in exactly D days.
    
    Uses binary search on the answer (capacity) between:
      low = max(weights)  -> at least carry heaviest package
      high = sum(weights) -> ship all in one day
    
    Args:
        weights (list): Package weights in delivery order
        D (int): Number of days to ship all packages
    
    Returns:
        int: Minimum capacity required
    """
    if not weights or D <= 0:
        raise ValueError("Invalid input: weights must be non-empty and D > 0")
    if D > len(weights):
        raise ValueError("D cannot be greater than number of packages")

    low = max(weights)
    high = sum(weights)
    result = high

    print("\n🔍 Binary Search Trace:")
    print(f"{'Iter':<4} {'Low':<4} {'High':<4} {'Mid':<4} {'Feasible?':<10} Action")
    print("-" * 50)

    iter_count = 1
    while low <= high:
        mid = (low + high) // 2
        feasible = can_ship(weights, mid, D)
        mark = "✅" if feasible else "❌"
        status = "Yes" if feasible else "No"

        if feasible:
            txt = f"{iter_count:<4} {low:<4} {high:<4}"
            result = mid
            action = f"Try smaller → high = {mid - 1}"
            high = mid - 1
        else:
            txt = f"{iter_count:<4} {low:<4} {high:<4}"
            action = f"Need larger → low = {mid + 1}"
            low = mid + 1

        print(f"{txt} {mid:<4} "
              f"{mark + ' ' + status:<10} {action}")
        
        iter_count += 1

    return result


def simulate_shipping(weights, capacity, D):
    """
    Simulate and print how packages are shipped with given capacity.
    
    Args:
        weights (list): Package weights
        capacity (int): Ship capacity
        D (int): Allowed days
    """
    print(f"\n📦 Shipping Simulation (Capacity = {capacity}, Max Days = {D}):")
    day = 1
    current_load = 0
    daily_packages = [[]]

    for w in weights:
        if current_load + w <= capacity:
            current_load += w
            daily_packages[-1].append(w)
        else:
            day += 1
            current_load = w
            daily_packages.append([w])

    total_days = len(daily_packages)
    valid = total_days <= D

    for i, pkgs in enumerate(daily_packages, 1):
        load = sum(pkgs)
        print(f"  Day {i}: [{', '.join(map(str, pkgs))}] → Total = {load} {'✅' if load <= capacity else '❌'}")

    print(f"🎯 Total Days Used: {total_days} {'✅' if valid else '❌ Exceeds Limit'}")


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Binary Search on Answer: Ship Packages Within D Days\n")
    
    weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    D = 5
    
    print(f"Weights: {weights}")
    print(f"Days Available: {D}")
    print(f"Min Weight: {min(weights)} | Max Weight: {max(weights)} | Total: {sum(weights)}")

    min_capacity = min_ship_capacity(weights, D)
    print(f"\n✅ Minimum Required Capacity: {min_capacity}")

    simulate_shipping(weights, min_capacity, D)
    print(f"\n🎯 Final Answer: The smallest capacity that works is {min_capacity}.")