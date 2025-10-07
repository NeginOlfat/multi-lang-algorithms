using System;

/// <summary>
/// ExponentialSearch class provides a method to perform exponential search on a sorted integer array.
/// </summary>
public class ExponentialSearch
{
    /// <summary>
    /// Performs exponential search on a sorted array.
    /// Step 1: Find the range by doubling the index until arr[i] >= target.
    /// Step 2: Perform binary search within the identified range.
    /// </summary>
    /// <param name="arr">Sorted array of integers.</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int ExponentialSearchArray(int[] arr, int target)
    {
        // Handle empty array
        if (arr == null || arr.Length == 0) return -1;

        // Step 1: Check if the first element is the target
        if (arr[0] == target) return 0;

        int n = arr.Length;
        int i = 1; // Start with index 1

        // Double the index until we find a range that may contain the target
        while (i < n && arr[i] < target)
        {
            i *= 2; // Exponential growth: 1 → 2 → 4 → 8 → ...
        }

        // Now perform binary search in the range [i/2, min(i, n-1)]
        int left = i / 2;
        int right = Math.Min(i, n - 1);

        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target)
            {
                return mid; // Found!
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

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Exponential Search Example");

        int[] data = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
        int targetValue = 70;

        Console.WriteLine($"Array: [{string.Join(", ", data)}]");
        Console.WriteLine($"Target: {targetValue}");
        Console.WriteLine();

        int result = ExponentialSearchArray(data, targetValue);

        if (result != -1)
        {
            Console.WriteLine($"✅ Found {targetValue} at index {result}.");
        }
        else
        {
            Console.WriteLine($"❌ {targetValue} not found in the array.");
        }
    }
}