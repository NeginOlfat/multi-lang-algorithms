import java.util.*;

/**
 * Simplified Tim Sort (Educational Version)
 *
 * ✅ No array mutation during run detection
 * ✅ Stable merging
 * ✅ Matches expected output
 *
 * For learning only — not production
 *
 * For real projects, use: Arrays.sort(arr) — Java uses Tim Sort for objects!
 */
public class TimSort {

    /**
     * Sorts an array using a simplified Tim Sort algorithm.
     *
     * @param arr The input array (not modified).
     * @return A new sorted array.
     */
    public static int[] timSort(int[] arr) {
        if (arr.length <= 1) {
            return arr.clone();
        }

        int n = arr.length;
        List<List<Integer>> runs = new ArrayList<>();
        int i = 0;

        // Step 1: Calculate minrun
        int minrun = Math.min(getMinrun(n), 32);

        // Step 2: Find and process runs
        while (i < n) {
            int start = i;

            // Detect direction: decreasing or increasing
            if (i + 1 < n && arr[i] > arr[i + 1]) {
                // Decreasing run
                while (i + 1 < n && arr[i] > arr[i + 1]) {
                    i++;
                }
                i++; // Include the last element
            } else {
                // Increasing run
                while (i + 1 < n && arr[i] <= arr[i + 1]) {
                    i++;
                }
                i++;
            }

            // Extract the run
            List<Integer> run = new ArrayList<>();
            for (int j = start; j < i; j++) {
                run.add(arr[j]);
            }

            // Reverse if decreasing
            if (run.size() > 1 && run.get(0) > run.get(run.size() - 1)) {
                Collections.reverse(run);
            }

            // Extend short run to minrun using Insertion Sort
            while (run.size() < minrun && i < n) {
                int val = arr[i];
                // Find insertion point (stable: <=)
                int pos = 0;
                while (pos < run.size() && run.get(pos) <= val) {
                    pos++;
                }
                run.add(pos, val);
                i++;
            }

            runs.add(run);
        }

        // Step 3: Merge runs with stack invariants
        Deque<List<Integer>> stack = new ArrayDeque<>();
        for (List<Integer> run : runs) {
            stack.push(run);

            // Invariant: stack[-2].size() > stack[-1].size()
            while (stack.size() > 1 && !hasValidStackInvariant(stack)) {
                List<Integer> right = stack.pop();
                List<Integer> left = stack.pop();
                stack.push(merge(left, right));
            }
        }

        // Final merge
        while (stack.size() > 1) {
            List<Integer> right = stack.pop();
            List<Integer> left = stack.pop();
            stack.push(merge(left, right));
        }

        // Convert final list to array
        List<Integer> sortedList = stack.isEmpty() ? Collections.emptyList() : stack.peek();
        return sortedList.stream().mapToInt(Integer::intValue).toArray();
    }

    /**
     * Checks if the top two runs satisfy: size[-2] > size[-1]
     */
    private static boolean hasValidStackInvariant(Deque<List<Integer>> stack) {
        if (stack.size() < 2) return true;
        List<Integer> second = getSecondFromTop(stack);
        List<Integer> top = stack.peek();
        return second.size() > top.size();
    }

    /**
     * Returns the second-to-top element of the stack.
     */
    private static List<Integer> getSecondFromTop(Deque<List<Integer>> stack) {
        Iterator<List<Integer>> it = stack.iterator();
        List<Integer> first = it.next();
        while (it.hasNext()) {
            List<Integer> second = it.next();
            if (!it.hasNext()) {
                return first;
            }
            first = second;
        }
        return null; // unreachable if size >= 2
    }

    /**
     * Merges two sorted lists stably.
     */
    private static List<Integer> merge(List<Integer> left, List<Integer> right) {
        List<Integer> result = new ArrayList<>();
        int i = 0, j = 0;

        while (i < left.size() && j < right.size()) {
            if (left.get(i) <= right.get(j)) {
                result.add(left.get(i));
                i++;
            } else {
                result.add(right.get(j));
                j++;
            }
        }

        // Add remaining elements
        while (i < left.size()) {
            result.add(left.get(i++));
        }
        while (j < right.size()) {
            result.add(right.get(j++));
        }

        return result;
    }

    /**
     * Calculates minrun as in original Tim Sort.
     */
    private static int getMinrun(int n) {
        int r = 0;
        while (n >= 64) {
            r |= n & 1;  // Set r if least significant bit is 1
            n >>= 1;     // Divide n by 2
        }
        return n + r;
    }

    // Example Usage
    public static void main(String[] args) {
        int[] numbers = {10, 9, 8, 7, 15, 16, 17, 3, 2, 1, 12, 13, 14, 18, 19, 20};

        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Sorted Array: " + Arrays.toString(timSort(numbers)));

        // Test with already sorted
        int[] sorted = {1, 2, 3, 4, 5};
        System.out.println("\nAlready Sorted: " + Arrays.toString(timSort(sorted)));

        // Test with reverse
        int[] reverse = {5, 4, 3, 2, 1};
        System.out.println("Reverse Sorted: " + Arrays.toString(timSort(reverse)));

        // Test with duplicates
        int[] duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5};
        System.out.println("With Duplicates: " + Arrays.toString(timSort(duplicates)));
    }
}