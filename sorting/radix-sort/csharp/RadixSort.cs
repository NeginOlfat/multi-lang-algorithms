using System;
using System.Linq;

/**
 * Sorts an array of non-negative integers using Radix Sort (LSD method).
 */
public class RadixSort
{
    /**
     * Sorts an array using Radix Sort (LSD).
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity: O(d × n) where d = number of digits, n = length
     * Space Complexity: O(n + k) where k = base (10 for decimal)
     *
     * ✅ Stable: uses Counting Sort for each digit
     * ✅ Efficient for fixed-length keys (e.g., phone numbers, IDs)
     * ❌ Only works with non-negative integers
     */
    public static int[] RadixSortArray(int[] arr)
    {
        // Handle edge cases
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        // Find the maximum number to determine number of digits
        int max = arr.Max();
        int digits = max == 0 ? 1 : (int)Math.Floor(Math.Log10(max)) + 1;

        // Make a copy to avoid mutation
        int[] sorted = (int[])arr.Clone();

        // Process each digit from least significant to most significant
        for (int digit = 0; digit < digits; digit++)
        {
            sorted = CountingSortByDigit(sorted, digit);
        }

        return sorted;
    }

    /**
     * Stable counting sort based on the i-th digit (LSD, 0-indexed).
     *
     * @param arr    The array to sort
     * @param digit  Which digit to sort by (0 = ones, 1 = tens, etc.)
     * @return A new sorted array
     */
    private static int[] CountingSortByDigit(int[] arr, int digit)
    {
        const int BASE = 10;
        int[] count = new int[BASE];
        int[] output = new int[arr.Length];

        // Step 1: Count frequency of each digit
        foreach (int num in arr)
        {
            int d = GetDigit(num, digit);
            count[d]++;
        }

        // Step 2: Compute cumulative count
        for (int i = 1; i < BASE; i++)
        {
            count[i] += count[i - 1];
        }

        // Step 3: Build output array from right to left (for stability)
        for (int i = arr.Length - 1; i >= 0; i--)
        {
            int num = arr[i];
            int d = GetDigit(num, digit);
            int pos = count[d] - 1;
            output[pos] = num;
            count[d]--;
        }

        return output;
    }

    /**
     * Extracts the i-th digit from a number (from right, 0-indexed).
     *
     * @param num   The number
     * @param i     Digit position (0 = ones, 1 = tens, etc.)
     * @return      The digit value
     *
     * Example:
     *   GetDigit(170, 0) → 0 (ones place)
     *   GetDigit(170, 1) → 7 (tens place)
     *   GetDigit(170, 2) → 1 (hundreds place)
     */
    private static int GetDigit(int num, int i)
    {
        return (num / (int)Math.Pow(10, i)) % 10;
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = { 170, 45, 75, 90, 2, 802, 24, 66 };

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        int[] sorted = RadixSortArray(numbers);
        Console.WriteLine("Sorted Array: [" + string.Join(", ", sorted) + "]");

        // Test with single-digit and duplicates
        int[] small = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        Console.WriteLine("\nSmall Array: [" + string.Join(", ", small) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", RadixSortArray(small)) + "]");

        // Test with repeated patterns
        int[] repeated = { 222, 111, 333, 121, 212 };
        Console.WriteLine("\nRepeated Digits: [" + string.Join(", ", repeated) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", RadixSortArray(repeated)) + "]");

        // Test edge case with zeros
        int[] edgeCase = { 0, 0, 1, 10, 100 };
        Console.WriteLine("\nEdge Case: [" + string.Join(", ", edgeCase) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", RadixSortArray(edgeCase)) + "]");
    }
}