using System;
using System.Collections.Generic;
using System.Linq;

/**
 * Simplified Tim Sort (Educational Version)
 *
 * ✅ No array mutation during run detection
 * ✅ Stable merging
 * ✅ Matches expected output
 *
 * For learning only — not production
 *
 * For real projects, use: Array.Sort(arr) or arr.OrderBy(x => x) — .NET uses Tim Sort internally!
 */
public class TimSort
{
    /**
     * Sorts an array using a simplified Tim Sort algorithm.
     *
     * @param arr The input array (not modified).
     * @return A new sorted array.
     */
    public static int[] TimSortArray(int[] arr)
    {
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        int n = arr.Length;
        List<List<int>> runs = new List<List<int>>();
        int i = 0;

        // Step 1: Calculate minrun
        int minrun = Math.Min(GetMinrun(n), 32);

        // Step 2: Find and process runs
        while (i < n)
        {
            int start = i;

            // Detect direction: decreasing or increasing
            if (i + 1 < n && arr[i] > arr[i + 1])
            {
                // Decreasing run
                while (i + 1 < n && arr[i] > arr[i + 1])
                    i++;
                i++; // Include the last element
            }
            else
            {
                // Increasing run
                while (i + 1 < n && arr[i] <= arr[i + 1])
                    i++;
                i++;
            }

            // Extract the run
            List<int> run = new List<int>();
            for (int j = start; j < i; j++)
            {
                run.Add(arr[j]);
            }

            // Reverse if decreasing
            if (run.Count > 1 && run[0] > run[run.Count - 1])
            {
                run.Reverse();
            }

            // Extend short run to minrun using Insertion Sort
            while (run.Count < minrun && i < n)
            {
                int val = arr[i];
                // Find insertion point (stable: <=)
                int pos = 0;
                while (pos < run.Count && run[pos] <= val)
                {
                    pos++;
                }
                run.Insert(pos, val);
                i++;
            }

            runs.Add(run);
        }

        // Step 3: Merge runs with stack invariants
        Stack<List<int>> stack = new Stack<List<int>>();
        foreach (List<int> run in runs)
        {
            stack.Push(run);

            // Invariant: stack[-2].Count > stack[-1].Count
            while (stack.Count > 1 && !HasValidStackInvariant(stack))
            {
                List<int> right = stack.Pop();
                List<int> left = stack.Pop();
                stack.Push(Merge(left, right));
            }
        }

        // Final merge
        while (stack.Count > 1)
        {
            List<int> right = stack.Pop();
            List<int> left = stack.Pop();
            stack.Push(Merge(left, right));
        }

        // Convert final list to array
        List<int> sortedList = stack.Count > 0 ? stack.Peek() : new List<int>();
        return sortedList.ToArray();
    }

    /**
     * Checks if the top two runs satisfy: size[-2] > size[-1]
     */
    private static bool HasValidStackInvariant(Stack<List<int>> stack)
    {
        if (stack.Count < 2) return true;

        List<int>[] topTwo = GetTopTwo(stack);
        List<int> second = topTwo[1]; // second-to-top
        List<int> top = topTwo[0];    // top
        return second.Count > top.Count;
    }

    /**
     * Returns the top two elements from the stack without popping.
     * Returns [top, second] (in that order).
     */
    private static List<int>[] GetTopTwo(Stack<List<int>> stack)
    {
        List<int> top = null;
        List<int> second = null;
        foreach (List<int> run in stack)
        {
            second = top;
            top = run;
            if (second != null) break;
        }
        return new List<int>[] { top, second };
    }

    /**
     * Merges two sorted lists stably.
     */
    private static List<int> Merge(List<int> left, List<int> right)
    {
        List<int> result = new List<int>();
        int i = 0, j = 0;

        while (i < left.Count && j < right.Count)
        {
            if (left[i] <= right[j])
            {
                result.Add(left[i]);
                i++;
            }
            else
            {
                result.Add(right[j]);
                j++;
            }
        }

        // Add remaining elements
        while (i < left.Count)
            result.Add(left[i++]);
        while (j < right.Count)
            result.Add(right[j++]);

        return result;
    }

    /**
     * Calculates minrun as in original Tim Sort.
     */
    private static int GetMinrun(int n)
    {
        int r = 0;
        while (n >= 64)
        {
            r |= n & 1;  // Set r if least significant bit is 1
            n >>= 1;     // Divide n by 2
        }
        return n + r;
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = {10, 9, 8, 7, 15, 16, 17, 3, 2, 1, 12, 13, 14, 18, 19, 20};

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");
        Console.WriteLine("Sorted Array: [" + string.Join(", ", TimSortArray(numbers)) + "]");

        // Test with already sorted
        int[] sorted = {1, 2, 3, 4, 5};
        Console.WriteLine("\nAlready Sorted: [" + string.Join(", ", TimSortArray(sorted)) + "]");

        // Test with reverse
        int[] reverse = {5, 4, 3, 2, 1};
        Console.WriteLine("Reverse Sorted: [" + string.Join(", ", TimSortArray(reverse)) + "]");

        // Test with duplicates
        int[] duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5};
        Console.WriteLine("With Duplicates: [" + string.Join(", ", TimSortArray(duplicates)) + "]");
    }
}