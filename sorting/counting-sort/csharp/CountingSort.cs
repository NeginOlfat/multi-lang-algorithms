using System;
using System.Collections.Generic;
using System.Linq;

/**
 * Sorts an array using the Counting Sort algorithm.
 */
public class CountingSort
{
    public class Person
    {
        public string Name { get; }
        public int Grade { get; }

        public Person(string name, int grade)
        {
            Name = name;
            Grade = grade;
        }

        public override string ToString() => $"{Name}: {Grade}";
    }

    /**
     * Sorts an array using Counting Sort.
     *
     * @param arr The input array to be sorted.
     * @return A new sorted array (original is not modified).
     *
     * Time Complexity: O(n + k) where n = length, k = range (max - min + 1)
     * Space Complexity: O(k) for count array
     *
     * ✅ Stable: preserves relative order of equal elements
     * ✅ Works with negative numbers
     * ❌ Not in-place
     */
    public static int[] CountingSortArray(int[] arr)
    {
         // Handle edge cases
        if (arr == null || arr.Length <= 1)
            return (int[])arr?.Clone() ?? new int[0];

        // Find min and max to determine range
        int min = arr.Min();
        int max = arr.Max();
        int range = max - min + 1;

         // Step 1: Count frequency of each element
        int[] count = new int[range];
        foreach (int value in arr)
        {
            count[value - min]++;  // Shift index by min
        }

        // Step 2: Compute cumulative count
        for (int i = 1; i < range; i++)
        {
            count[i] += count[i - 1];
        }

        // Step 3: Build output array from right to left (for stability)
        int[] output = new int[arr.Length];
        for (int i = arr.Length - 1; i >= 0; i--)
        {
            int value = arr[i];
            int countIndex = value - min;

            // Place element at its final position
            int position = count[countIndex] - 1;
            output[position] = value;

            // Decrement count for next occurrence
            count[countIndex]--;
        }

        return output;
    }

    /**
     * Stable counting sort for objects using a key selector.
     *
     * @param list      The list of objects to sort.
     * @param keyFunc   Function to extract integer key from object.
     * @return A new sorted list (stable).
     */
    public static List<T> CountingSortObjects<T>(List<T> list, Func<T, int> keyFunc)
    {
        if (list == null || list.Count <= 1)
            return list?.ToList() ?? new List<T>();

        // Extract keys and find min/max
        var keys = list.Select(keyFunc).ToList();
        int min = keys.Min();
        int max = keys.Max();
        int range = max - min + 1;

         // Step 1: Count frequencies
        int[] count = new int[range];
        foreach (int key in keys)
        {
            count[key - min]++;
        }

        // Step 2: Cumulative count
        for (int i = 1; i < range; i++)
        {
            count[i] += count[i - 1];
        }

        // Step 3: Build output from right to left (stable)
        List<T> output = new List<T>(new T[list.Count]);
        for (int i = list.Count - 1; i >= 0; i--)
        {
            T item = list[i];
            int key = keyFunc(item);
            int pos = count[key - min] - 1;
            output[pos] = item;
            count[key - min]--;
        }

        return output;
    }

    // Example Usage
    static void Main(string[] args)
    {
        int[] numbers = { 4, 2, 2, 8, 3, 3, 1 };

        Console.WriteLine("Original Array: [" + string.Join(", ", numbers) + "]");int[] sorted = CountingSortArray(numbers);
        Console.WriteLine("Sorted Array: [" + string.Join(", ", sorted) + "]");

         // Test with negative numbers
        int[] withNegatives = { -1, -5, 2, 0, 2, -5, 1 };
        Console.WriteLine("With Negatives: [" + string.Join(", ", withNegatives) + "]");
        int[] sortedNeg = CountingSortArray(withNegatives);
        Console.WriteLine("Sorted (handles negatives): [" + string.Join(", ", sortedNeg) + "]");

        // Test stability with objects
        List<Person> people = new List<Person>
        {
            new Person("Alice", 2),
            new Person("Bob", 1),
            new Person("Charlie", 2),
            new Person("David", 1)
        };

        List<Person> sortedPeople = CountingSortObjects(people, p => p.Grade);

        Console.WriteLine("\nStability Test (by grade):");
        foreach (Person p in sortedPeople)
        {
            Console.WriteLine(p);
        }
    }
}