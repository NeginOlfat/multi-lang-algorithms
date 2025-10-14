using System;

/// <summary>
/// FibonacciSearch class provides a method to perform Fibonacci search on a sorted integer array.
/// 
/// This algorithm divides the array using Fibonacci numbers instead of halving it,
/// avoiding division operations and improving cache efficiency in certain scenarios.
/// </summary>
public class FibonacciSearch
{
    /// <summary>
    /// Performs Fibonacci Search on a sorted array.
    /// </summary>
    /// <param name="arr">Sorted array of integers.</param>
    /// <param name="target">Value to search for.</param>
    /// <returns>Index of the target if found; -1 otherwise.</returns>
    public static int FibonacciSearchArray(int[] arr, int target)
    {
        // Handle empty array
        if (arr == null || arr.Length == 0) return -1;

        int n = arr.Length;

        // Generate smallest Fibonacci number >= n
        int fib2 = 0;  // F(k-2)
        int fib1 = 1;  // F(k-1)
        int fib = fib1 + fib2;  // F(k)

        while (fib < n)
        {
            fib2 = fib1;
            fib1 = fib;
            fib = fib1 + fib2;
        }

        // Marks the eliminated range from front
        int offset = -1;

        // While there are elements to be inspected
        while (fib > 1)
        {
            // Check index: min(offset + fib2, n - 1)
            int i = Math.Min(offset + fib2, n - 1);

            if (arr[i] < target)
            {
                // Target is in higher section; cut off front part
                fib = fib1;
                fib1 = fib2;
                fib2 = fib - fib1;
                offset = i;
            }
            else if (arr[i] > target)
            {
                // Target is in lower section; cut off rear part
                fib = fib2;
                fib1 = fib1 - fib2;
                fib2 = fib - fib1;
            }
            else
            {
                // Found the target
                return i;
            }
        }

        // Final check for last element
        if (fib1 == 1 && offset + 1 < n && arr[offset + 1] == target)
        {
            return offset + 1;
        }

        return -1; // Not found
    }

    // Example usage and demonstration
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Fibonacci Search Example");

        int[] data = { 10, 20, 30, 40, 50, 60, 70, 80 };
        int targetValue = 60;

        Console.WriteLine($"Array: [{string.Join(", ", data)}]");
        Console.WriteLine($"Target: {targetValue}");
        Console.WriteLine();

        int result = FibonacciSearchArray(data, targetValue);

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