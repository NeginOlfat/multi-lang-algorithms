import java.util.*;

/**
 * Sorts an array using the Counting Sort algorithm.
 */
public class CountingSort {

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
    public static int[] countingSort(int[] arr) {
        // Handle edge cases
        if (arr == null || arr.length <= 1) {
            return arr == null ? null : arr.clone();
        }

        // Find min and max to determine range
        int min = Arrays.stream(arr).min().getAsInt();
        int max = Arrays.stream(arr).max().getAsInt();
        int range = max - min + 1;

        // Step 1: Count frequency of each element
        int[] count = new int[range];
        for (int value : arr) {
            count[value - min]++; // Shift index by min
        }

        // Step 2: Compute cumulative count
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        // Step 3: Build output array from right to left (for stability)
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
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
     * Stable counting sort for objects using a key extractor.
     *
     * @param list     The list of objects to sort.
     * @param keyFunc  Function to extract integer key from object.
     * @return A new sorted list (stable).
     */
    public static <T> List<T> countingSortObjects(List<T> list, java.util.function.ToIntFunction<T> keyFunc) {
        if (list.size() <= 1) {
            return new ArrayList<>(list);
        }

        // Extract keys and find min/max
        List<Integer> keys = new ArrayList<>();
        for (T item : list) {
            keys.add(keyFunc.applyAsInt(item));
        }
        int min = keys.stream().mapToInt(Integer::intValue).min().orElse(0);
        int max = keys.stream().mapToInt(Integer::intValue).max().orElse(0);
        int range = max - min + 1;

        // Step 1: Count frequencies
        int[] count = new int[range];
        for (int key : keys) {
            count[key - min]++;
        }

        // Step 2: Cumulative count
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        // Step 3: Build output from right to left (stable)
        List<T> output = new ArrayList<>(Collections.nCopies(list.size(), null));
        for (int i = list.size() - 1; i >= 0; i--) {
            T item = list.get(i);
            int key = keyFunc.applyAsInt(item);
            int pos = count[key - min] - 1;
            output.set(pos, item);
            count[key - min]--;
        }

        return output;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {4, 2, 2, 8, 3, 3, 1};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(countingSort(numbers)));

        // Test with negative numbers
        int[] withNegatives = {-1, -5, 2, 0, 2, -5, 1};
        System.out.println("With Negatives: " + Arrays.toString(withNegatives));
        System.out.println("Sorted (handles negatives): " + Arrays.toString(countingSort(withNegatives)));

        // Test stability with objects
        class Person {
            String name;
            int grade;

            Person(String name, int grade) {
                this.name = name;
                this.grade = grade;
            }

            @Override
            public String toString() {
                return name + ": " + grade;
            }
        }

        List<Person> people = Arrays.asList(
            new Person("Alice", 2),
            new Person("Bob", 1),
            new Person("Charlie", 2),
            new Person("David", 1)
        );

        List<Person> sortedPeople = countingSortObjects(people, p -> p.grade);

        System.out.println("\nStability Test (by grade):");
        for (Person p : sortedPeople) {
            System.out.println(p);
        }
    }
}