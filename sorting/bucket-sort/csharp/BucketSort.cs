using System;
using System.Collections.Generic;
using System.Linq;

/**
 * Sorts an array using Bucket Sort.
 */
public class BucketSort
{
    /**
     * Sorts an array using Bucket Sort.
     *
     * @param arr          The array of doubles to sort.
     * @param numBuckets   Number of buckets to use (default: 5).
     * @return             A new sorted array.
     *
     * Time Complexity:
     * - Best/Average: O(n + k) when data is uniformly distributed
     * - Worst: O(n²) when all elements fall into one bucket
     *
     * Space Complexity: O(n + k)
     *
     * ✅ Best for uniformly distributed data (e.g., random floats in [0,1))
     * ✅ Uses Insertion Sort for small buckets
     * ❌ Extra space required
     */
    public static double[] BucketSortArray(double[] arr, int numBuckets = 5)
    {
        // Handle edge cases
        if (arr == null || arr.Length <= 1)
            return (double[])arr?.Clone() ?? new double[0];

        // Find min and max to determine range
        double min = arr.Min();
        double max = arr.Max();
        double range = max - min;

        // Avoid division by zero if all elements are the same
        if (range == 0.0)
            return (double[])arr.Clone();

        // Create k empty buckets
        List<List<double>> buckets = new List<List<double>>();
        for (int i = 0; i < numBuckets; i++)
        {
            buckets.Add(new List<double>());
        }

        // Distribute elements into buckets
        foreach (double num in arr)
        {
            // Normalize value to bucket index: [0, numBuckets)
            int bucketIndex = (int)Math.Floor((num - min) / range * (numBuckets - 1));

            // Clamp index to [0, numBuckets - 1]
            bucketIndex = Math.Max(0, Math.Min(bucketIndex, numBuckets - 1));

            buckets[bucketIndex].Add(num);
        }

        // Sort each bucket using Insertion Sort
        foreach (List<double> bucket in buckets)
        {
            InsertionSort(bucket);
        }

        // Concatenate all buckets into output
        List<double> sortedList = new List<double>();
        foreach (List<double> bucket in buckets)
        {
            sortedList.AddRange(bucket);
        }

        return sortedList.ToArray();
    }

    public static int[] BucketSortArray(int[] arr, int numBuckets = 5)
    {
        double[] doubleArr = Array.ConvertAll(arr, x => (double)x);
        double[] sortedDoubles = BucketSortArray(doubleArr, numBuckets);
        return Array.ConvertAll(sortedDoubles, x => (int)x);
    }

    /**
     * Sorts a list in-place using Insertion Sort.
     *
     * @param bucket The list to sort (modified in-place).
     */
    private static void InsertionSort(List<double> bucket)
    {
        for (int i = 1; i < bucket.Count; i++)
        {
            double key = bucket[i];
            int j = i - 1;

            while (j >= 0 && bucket[j] > key)
            {
                j--;
            }
            // Remove and insert at correct position
            bucket.RemoveAt(i);
            bucket.Insert(j + 1, key);
        }
    }

    // Example Usage
    static void Main(string[] args)
    {
        double[] numbers = { 0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51 };

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        double[] sorted = BucketSortArray(numbers, 5);
        Console.WriteLine("Sorted Array: [" + string.Join(", ", sorted) + "]");

        // Test with already sorted
        double[] sortedArr = { 0.1, 0.2, 0.3, 0.4, 0.5 };
        Console.WriteLine("Already Sorted: [" + string.Join(", ", BucketSortArray(sortedArr, 5)) + "]");

        // Test with reverse order
        double[] reverse = { 0.9, 0.8, 0.7, 0.6, 0.5 };
        Console.WriteLine("Reverse Sorted: [" + string.Join(", ", BucketSortArray(reverse, 5)) + "]");

        // Test with duplicates
        double[] duplicates = { 0.3, 0.1, 0.4, 0.1, 0.5, 0.9, 0.2, 0.6, 0.5, 0.3 };
        Console.WriteLine("With Duplicates: [" + string.Join(", ", BucketSortArray(duplicates, 5)) + "]");

        // Test with all same values
        double[] same = { 0.5, 0.5, 0.5 };
        Console.WriteLine("All Same: [" + string.Join(", ", BucketSortArray(same, 5)) + "]");

        // Test with integers
        int[] integers = {64, 34, 25, 12, 22, 11, 90};
        Console.WriteLine("Integers (Uniformly distributed?): [" + string.Join(", ", BucketSortArray(integers, 5)) + "]");
    }
}