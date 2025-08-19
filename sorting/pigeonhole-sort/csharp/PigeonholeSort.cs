using System;
using System.Collections.Generic;
using System.Linq;

/**
 * Sorts an array using Pigeonhole Sort.
 */
public class PigeonholeSort
{
    /**
     * Sorts an array using Pigeonhole Sort.
     *
     * @param arr The array to be sorted.
     * @return    A new sorted array (original is not modified).
     *
     * Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
     * Space Complexity: O(n + k) for the pigeonholes
     *
     * ✅ Stable: preserves relative order of equal elements
     * ✅ Works with negative numbers
     * ❌ Not in-place
     * ❌ Only efficient when range k is small and close to n
     */
    public static int[] PigeonholeSortArray(int[] arr)
    {
        // Handle edge cases
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        // Find min and max to determine range
        int min = arr.Min();
        int max = arr.Max();
        int range = max - min + 1;

        // Step 1: Create pigeonholes (one for each possible value)
        List<List<int>> pigeonholes = new List<List<int>>();
        for (int i = 0; i < range; i++)
        {
            pigeonholes.Add(new List<int>());
        }

        // Step 2: Place each element in its corresponding pigeonhole
        foreach (int value in arr)
        {
            int index = value - min; // Map value to hole index
            pigeonholes[index].Add(value); // Preserve order (stable)
        }

        // Step 3: Reconstruct sorted array by iterating through holes
        List<int> sortedList = new List<int>();
        foreach (List<int> hole in pigeonholes)
        {
            sortedList.AddRange(hole);
        }

        return sortedList.ToArray();
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {8, 3, 5, 3, 1, 7};

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        Console.WriteLine("Sorted Array: [" + string.Join(", ", PigeonholeSortArray(numbers)) + "]");

        // Test with negative numbers
        int[] withNegatives = {-1, -5, 2, 0, 2, -5, 1};
        Console.WriteLine("\nWith Negatives: [" + string.Join(", ", withNegatives) + "]");
        Console.WriteLine("Sorted (handles negatives): [" + string.Join(", ", PigeonholeSortArray(withNegatives)) + "]");

        // Test with already sorted
        int[] alreadySorted = {1, 2, 3, 4, 5};
        Console.WriteLine("\nAlready Sorted: [" + string.Join(", ", alreadySorted) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", PigeonholeSortArray(alreadySorted)) + "]");

        // Test with reverse order
        int[] reverse = {5, 4, 3, 2, 1};
        Console.WriteLine("\nReverse Order: [" + string.Join(", ", reverse) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", PigeonholeSortArray(reverse)) + "]");

        // Test with duplicates
        int[] duplicates = {4, 2, 8, 2, 9, 1, 5};
        Console.WriteLine("\nWith Duplicates: [" + string.Join(", ", duplicates) + "]");
        Console.WriteLine("Sorted: [" + string.Join(", ", PigeonholeSortArray(duplicates)) + "]");

        // Test with single element
        int[] single = {42};
        Console.WriteLine("\nSingle Element: [" + string.Join(", ", PigeonholeSortArray(single)) + "]");

        // Test with empty array
        int[] empty = {};
        Console.WriteLine("Empty Array: [" + string.Join(", ", PigeonholeSortArray(empty)) + "]");

        // Test with all same values
        int[] same = {3, 3, 3};
        Console.WriteLine("All Same: [" + string.Join(", ", PigeonholeSortArray(same)) + "]");
    }
}