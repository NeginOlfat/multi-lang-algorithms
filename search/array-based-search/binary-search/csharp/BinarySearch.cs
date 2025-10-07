using System;

/// <summary>
/// BinarySearch class provides static methods for binary search on sorted integer arrays.
/// </summary>
public class BinarySearch
{
    /// <summary>
    /// Performs binary search using an iterative approach.
    /// </summary>
    /// <param name="arr">Sorted array of integers.</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int BinarySearchIterative(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2; // Prevents overflow
            if (arr[mid] == target)
            {
                return mid;
            }
            else if (arr[mid] < target)
            {
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }

        return -1; // Not found
    }

    /// <summary>
    /// Public method for recursive binary search.
    /// </summary>
    /// <param name="arr">Sorted array of integers.</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int BinarySearchRecursive(int[] arr, int target)
    {
        return BinarySearchRecursiveHelper(arr, target, 0, arr.Length - 1);
    }

    /// <summary>
    /// Helper method for recursive binary search.
    /// </summary>
    /// <param name="arr">Sorted array.</param>
    /// <param name="target">Value to search.</param>
    /// <param name="left">Left bound.</param>
    /// <param name="right">Right bound.</param>
    /// <returns>Index of target or -1.</returns>
    private static int BinarySearchRecursiveHelper(int[] arr, int target, int left, int right)
    {
        if (left > right)
        {
            return -1; // Base case: not found
        }

        int mid = left + (right - left) / 2; // Overflow-safe midpoint
        if (arr[mid] == target)
        {
            return mid;
        }
        else if (arr[mid] < target)
        {
            return BinarySearchRecursiveHelper(arr, target, mid + 1, right);
        }
        else
        {
            return BinarySearchRecursiveHelper(arr, target, left, mid - 1);
        }
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Binary Search Examples");

        int[] data = { 10, 20, 30, 40, 50, 60, 70, 80 };
        int targetValue = 60;

        Console.WriteLine($"Array: [{string.Join(", ", data)}]");
        Console.WriteLine($"Target: {targetValue}");
        Console.WriteLine();

        // --- Iterative Version ---
        int resultIter = BinarySearchIterative(data, targetValue);
        if (resultIter != -1)
        {
            Console.WriteLine($"✅ [Iterative] Found {targetValue} at index {resultIter}.");
        }
        else
        {
            Console.WriteLine($"❌ [Iterative] {targetValue} not found.");
        }

        // --- Recursive Version ---
        int resultRec = BinarySearchRecursive(data, targetValue);
        if (resultRec != -1)
        {
            Console.WriteLine($"✅ [Recursive] Found {targetValue} at index {resultRec}.");
        }
        else
        {
            Console.WriteLine($"❌ [Recursive] {targetValue} not found.");
        }
    }
}