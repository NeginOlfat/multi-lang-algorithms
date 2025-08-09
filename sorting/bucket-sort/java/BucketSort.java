import java.util.*;

/**
 * Sorts an array using Bucket Sort.
 */
public class BucketSort {

    /**
     * Sorts an array using Bucket Sort.
     *
     * @param arr         The array of doubles to sort.
     * @param numBuckets  Number of buckets to use (default: 5).
     * @return            A new sorted array.
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
    public static double[] bucketSort(double[] arr, int numBuckets) {
        // Handle edge cases
        if (arr == null || arr.length <= 1) {
            return arr == null ? null : arr.clone();
        }

        // Find min and max to determine range
        double min = Arrays.stream(arr).min().orElse(0.0);
        double max = Arrays.stream(arr).max().orElse(0.0);
        double range = max - min;

        // Avoid division by zero if all elements are the same
        if (range == 0.0) {
            return arr.clone();
        }

        // Create k empty buckets
        List<List<Double>> buckets = new ArrayList<>();
        for (int i = 0; i < numBuckets; i++) {
            buckets.add(new ArrayList<>());
        }

        // Distribute elements into buckets
        for (double num : arr) {
            // Normalize value to bucket index: [0, numBuckets)
            int bucketIndex = (int) Math.floor((num - min) / range * (numBuckets - 1));

            // Clamp index to [0, numBuckets - 1]
            bucketIndex = Math.max(0, Math.min(bucketIndex, numBuckets - 1));

            buckets.get(bucketIndex).add(num);
        }

        // Sort each bucket using Insertion Sort
        for (List<Double> bucket : buckets) {
            insertionSort(bucket);
        }

        // Concatenate all buckets into output
        List<Double> sortedList = new ArrayList<>();
        for (List<Double> bucket : buckets) {
            sortedList.addAll(bucket);
        }

        // Convert back to array
        double[] sorted = new double[sortedList.size()];
        for (int i = 0; i < sorted.length; i++) {
            sorted[i] = sortedList.get(i);
        }

        return sorted;
    }

    // Note: For integers, cast to double or overload method
    public static int[] bucketSort(int[] arr, int numBuckets) {
        double[] doubleArr = Arrays.stream(arr).mapToDouble(x -> x).toArray();
        double[] sortedDoubles = bucketSort(doubleArr, numBuckets);
        return Arrays.stream(sortedDoubles).mapToInt(x -> (int) x).toArray();
    }

    /**
     * Sorts a list in-place using Insertion Sort.
     *
     * @param bucket The list to sort (modified in-place).
     */
    private static void insertionSort(List<Double> bucket) {
        for (int i = 1; i < bucket.size(); i++) {
            double key = bucket.get(i);
            int j = i - 1;

            while (j >= 0 && bucket.get(j) > key) {
                j--;
            }
            bucket.add(j + 1, bucket.remove(i));
        }
    }

    // Example Usage
    public static void main(String[] args) {
        double[] numbers = {0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(bucketSort(numbers, 5)));

        // Test with already sorted
        double[] sortedArr = {0.1, 0.2, 0.3, 0.4, 0.5};
        System.out.println("Already Sorted: " + Arrays.toString(bucketSort(sortedArr, 5)));

        // Test with reverse order
        double[] reverse = {0.9, 0.8, 0.7, 0.6, 0.5};
        System.out.println("Reverse Sorted: " + Arrays.toString(bucketSort(reverse, 5)));

        // Test with duplicates
        double[] duplicates = {0.3, 0.1, 0.4, 0.1, 0.5, 0.9, 0.2, 0.6, 0.5, 0.3};
        System.out.println("With Duplicates: " + Arrays.toString(bucketSort(duplicates, 5)));

        // Test with all same values
        double[] same = {0.5, 0.5, 0.5};
        System.out.println("All Same: " + Arrays.toString(bucketSort(same, 5)));

        // Test with integers
        int[] integers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Integers (Uniformly distributed?): " + Arrays.toString(bucketSort(integers, 5)));
    }
}