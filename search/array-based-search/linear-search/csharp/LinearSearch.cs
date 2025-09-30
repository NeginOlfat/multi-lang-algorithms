using System;

/// <summary>
/// LinearSearch class provides a method to perform linear search on an array.
/// </summary>
public class LinearSearch
{
    /// <summary>
    /// Performs linear search on an array to find the index of the target value.
    /// </summary>
    /// <param name="arr">The array to search in.</param>
    /// <param name="target">The value to search for.</param>
    /// <returns>Index of the target if found; -1 if not found.</returns>
    public static int LinearSearchArray(int[] arr, int target)
    {
        for (int i = 0; i < arr.Length; i++)
        {
            if (arr[i] == target)
            {
                return i; // Return index if target is found
            }
        }
        return -1; // Return -1 if target is not found
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        // Sample data
        int[] data = { 10, 50, 30, 70, 80, 20, 90, 40 };
        int targetValue = 20;

        // Perform linear search
        int result = LinearSearchArray(data, targetValue);

        // Output result 
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