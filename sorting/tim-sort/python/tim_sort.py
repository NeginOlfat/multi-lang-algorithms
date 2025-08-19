"""
Simplified Tim Sort (Educational Version)

✅ No array mutation during run detection
✅ Stable merging
✅ Matches expected output

For learning only — not production

For real projects, use: sorted(arr) or arr.sort() — Python uses Tim Sort!
"""


def tim_sort(arr):
    if len(arr) <= 1:
        return arr.copy()

    n = len(arr)
    runs = []
    i = 0

    def merge(left, right):
        """Merge two sorted lists stably."""
        result = []
        i, j = 0, 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result

    def get_minrun(n):
        """Calculate minrun as in original Tim Sort."""
        r = 0
        while n >= 64:
            r |= n & 1
            n >>= 1
        return n + r

    minrun = min(get_minrun(n), 32)

    # Step 2: Find and process runs
    while i < n:
        start = i

        # Detect direction: decreasing or increasing
        if i + 1 < n and arr[i] > arr[i + 1]:
            # Decreasing run
            while i + 1 < n and arr[i] > arr[i + 1]:
                i += 1
            i += 1  # Include the last element
        else:
            # Increasing run
            while i + 1 < n and arr[i] <= arr[i + 1]:
                i += 1
            i += 1

        # Extract the run
        run = arr[start:i]

        # Reverse if decreasing
        if len(run) > 1 and run[0] > run[-1]:
            run.reverse()

        # Extend short run to minrun using Insertion Sort
        while len(run) < minrun and i < n:
            val = arr[i]
            # Find insertion point
            pos = 0
            while pos < len(run) and run[pos] <= val:
                pos += 1
            run.insert(pos, val)
            i += 1

        runs.append(run)

    # Step 3: Merge runs with stack invariants
    stack = []
    for run in runs:
        stack.append(run)

        # Invariant: stack[-2] > stack[-1] (by length)
        while len(stack) > 1 and len(stack[-2]) <= len(stack[-1]):
            right = stack.pop()
            left = stack.pop()
            stack.append(merge(left, right))

    # Final merge
    while len(stack) > 1:
        right = stack.pop()
        left = stack.pop()
        stack.append(merge(left, right))

    return stack[0] if stack else []


# Example Usage
if __name__ == "__main__":
    numbers = [10, 9, 8, 7, 15, 16, 17, 3, 2, 1, 12, 13, 14, 18, 19, 20]
    print("Original Array:", numbers)
    print("Sorted Array:", tim_sort(numbers))

    # Test with already sorted
    print("\nAlready Sorted:", tim_sort([1, 2, 3, 4, 5]))

    # Test with reverse
    print("Reverse Sorted:", tim_sort([5, 4, 3, 2, 1]))

    # Test with duplicates
    print("With Duplicates:", tim_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]))