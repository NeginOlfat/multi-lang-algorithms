using System;

/// <summary>
/// InterpolationSearch class provides a method to perform interpolation search on a sorted array.
/// </summary>
public class InterpolationSearch
{
    /// <summary>
    /// Performs interpolation search on a sorted array.
    /// </summary>
    /// <param name="arr">Sorted array of integers (preferably uniformly distributed).</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int InterpolationSearchArray(int[] arr, int target)
    {
        int low = 0;
        int high = arr.Length - 1;

        // Handle empty array
        if (low > high) return -1;

        while (low <= high && arr[low] <= target && target <= arr[high])
        {
            // Avoid division by zero when all values in range are equal
            if (arr[high] == arr[low])
            {
                return arr[low] == target ? low : -1;
            }

            // Estimate position using interpolation formula
            int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);

            // Safety: ensure pos is within bounds (prevent extrapolation errors)
            if (pos < low || pos > high)
            {
                break; // Likely due to non-uniform distribution
            }

            // Check if estimated position holds the target
            if (arr[pos] == target)
            {
                return pos;
            }
            else if (arr[pos] < target)
            {
                low = pos + 1; // Target is in the right subarray
            }
            else
            {
                high = pos - 1; // Target is in the left subarray
            }
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Interpolation Search Example");

        int[] data = { 10, 20, 30, 40, 50, 60, 70, 80, 90 };
        int targetValue = 70;

        Console.WriteLine($"Array: [{string.Join(", ", data)}]");
        Console.WriteLine($"Target: {targetValue}");
        Console.WriteLine();

        int result = InterpolationSearchArray(data, targetValue);

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