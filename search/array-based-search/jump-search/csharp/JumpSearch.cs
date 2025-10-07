using System;

/// <summary>
/// JumpSearch class provides a method to perform jump search on a sorted array.
/// </summary>
public class JumpSearch
{
    /// <summary>
    /// Performs jump search on a sorted array.
    /// </summary>
    /// <param name="arr">Sorted array of integers.</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int JumpSearchArray(int[] arr, int target)
    {
        int n = arr.Length;

        // Handle empty array
        if (n == 0) return -1;

        // Optimal jump size is √n
        int step = (int)Math.Floor(Math.Sqrt(n));
        int prev = 0; // Starting index of current block

        // Jump forward in blocks until arr[Math.Min(step, n) - 1] >= target
        while (step < n && arr[Math.Min(step, n) - 1] < target)
        {
            prev = step;
            step += (int)Math.Floor(Math.Sqrt(n));
        }

        // Perform linear search within the identified block
        for (int i = prev; i < Math.Min(step, n); i++)
        {
            if (arr[i] == target)
            {
                return i; // Return index if found
            }
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🚶‍♂️ Jump Search Example");

        int[] data = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int targetValue = 7;

        Console.WriteLine($"Array: [{string.Join(", ", data)}]");
        Console.WriteLine($"Target: {targetValue}");
        Console.WriteLine();

        int result = JumpSearchArray(data, targetValue);

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