using System;

/// <summary>
/// SentinelSearch class provides a method to perform sentinel search on an integer array.
///
/// This algorithm places the target as a "sentinel" at the end of the array,
/// eliminating the need for index-bound checks during iteration — reducing comparisons per step.
/// </summary>
public class SentinelSearch
{
    /// <summary>
    /// Performs Sentinel Search on an array by placing the target as a sentinel at the end.
    /// </summary>
    /// <param name="arr">Array of integers (does not need to be sorted).</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int SentinelSearchArray(int[] arr, int target)
    {
        // Handle empty array
        if (arr == null || arr.Length == 0) return -1;

        int n = arr.Length;

        // Save the last element
        int lastElement = arr[n - 1];

        // Place the target as sentinel at the end
        arr[n - 1] = target;

        // Start searching from the beginning
        int i = 0;
        while (arr[i] != target)
        {
            i++;
        }

        // Restore the original last element
        arr[n - 1] = lastElement;

        // Check if the found element is valid
        if (i < n - 1 || lastElement == target)
        {
            return i; // Found in valid position
        }
        else
        {
            return -1; // Not present
        }
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Sentinel Search Example");

        int[] data = { 10, 20, 35, 40, 50 };
        int targetValue = 35;

        Console.WriteLine($"Original Array: [{string.Join(", ", data)}]");
        Console.WriteLine($"Target: {targetValue}");
        Console.WriteLine();

        int result = SentinelSearchArray(data, targetValue);

        if (result != -1)
        {
            Console.WriteLine($"✅ Found {targetValue} at index {result}.");
        }
        else
        {
            Console.WriteLine($"❌ {targetValue} not found in the array.");
        }

        Console.WriteLine($"Array after search: [{string.Join(", ", data)}]"); // Should be unchanged
    }
}