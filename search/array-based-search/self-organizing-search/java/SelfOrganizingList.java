import java.util.*;

/**
 * A self-organizing list that adapts its structure based on access patterns.
 *
 * Supports three reorganization strategies:
 * 1. MOVE_TO_FRONT: Move accessed item to front
 * 2. TRANSPOSE: Swap with previous element
 * 3. COUNT: Maintain access frequency and sort by count (descending), preserving insertion order on ties
 *
 * This improves average search time for frequently accessed items.
 */
public class SelfOrganizingList {
    public enum Strategy {
        MOVE_TO_FRONT,
        TRANSPOSE,
        COUNT
    }

    private final List<String> items;
    private final Strategy strategy;
    private final Map<String, Integer> accessCount;
    private final Map<String, Integer> insertionOrder;

    /**
     * Initialize the self-organizing list.
     *
     * @param data     Initial list of elements.
     * @param strategy One of MOVE_TO_FRONT, TRANSPOSE, COUNT
     */
    public SelfOrganizingList(List<String> data, Strategy strategy) {
        this.items = new ArrayList<>(data);
        this.strategy = strategy;
        this.accessCount = new HashMap<>();
        this.insertionOrder = new HashMap<>();

        // Record insertion order (first occurrence index)
        for (int i = 0; i < data.size(); i++) {
            String item = data.get(i);
            if (!insertionOrder.containsKey(item)) {
                insertionOrder.put(item, i);
            }
        }

        // Initialize access counts for COUNT strategy
        if (strategy == Strategy.COUNT) {
            for (String item : data) {
                accessCount.put(item, 0);
            }
        } else {
            data.forEach(item -> accessCount.put(item, 0)); // Just initialize
        }
    }

    /**
     * Search for an item and reorganize the list based on strategy.
     *
     * @param target Element to search for
     * @return Index where found before reorganization; -1 if not found
     */
    public int search(String target) {
        int idx = items.indexOf(target);
        if (idx == -1) return -1; // Not found

        if (strategy == Strategy.COUNT) {
            accessCount.put(target, accessCount.get(target) + 1);
            reorder();
        } else if (strategy == Strategy.MOVE_TO_FRONT) {
            items.remove(idx);
            items.add(0, target);
        } else if (strategy == Strategy.TRANSPOSE && idx > 0) {
            Collections.swap(items, idx, idx - 1);
        }

        return idx; // Return original index
    }

    /**
     * Reorder list by access frequency (highest first),
     * preserving original insertion order for ties.
     */
    private void reorder() {
        items.sort((a, b) -> {
            int freqDiff = Integer.compare(accessCount.get(b), accessCount.get(a));
            if (freqDiff != 0) return freqDiff; // Descending by frequency
            // Tie: use original insertion order
            return Integer.compare(insertionOrder.get(a), insertionOrder.get(b));
        });
    }

    /**
     * Get current list state.
     */
    public List<String> getItems() {
        return new ArrayList<>(items); // Return copy
    }

    /**
     * Get access counts (for debugging/testing).
     */
    public Map<String, Integer> getAccessCount() {
        return new HashMap<>(accessCount);
    }

    @Override
    public String toString() {
        if (strategy == Strategy.COUNT) {
            List<String> withCounts = new ArrayList<>();
            for (String item : items) {
                withCounts.add(item + ":" + accessCount.get(item));
            }
            return withCounts.toString();
        }
        return items.toString();
    }

       public static void main(String[] args) {
        System.out.println("🔍 Self-Organizing Search Examples\n");

        // --- Example 1: Move-to-Front ---
        System.out.println("🎯 Strategy: Move-to-Front");
        SelfOrganizingList mtflist = new SelfOrganizingList(
            Arrays.asList("A", "B", "C", "D"),
            SelfOrganizingList.Strategy.MOVE_TO_FRONT
        );
        System.out.println("Initial: " + mtflist);

        for (String target : Arrays.asList("C", "B", "C")) {
            int idx = mtflist.search(target);
            String status = (idx != -1) ? "Found at index " + idx : "Not found";
            System.out.println("Search '" + target + "' → " + status + " → Now: " + mtflist);
        }

        System.out.println();

        // --- Example 2: Transpose ---
        System.out.println("🎯 Strategy: Transpose");
        SelfOrganizingList transposelist = new SelfOrganizingList(
            Arrays.asList("A", "B", "C", "D"),
            SelfOrganizingList.Strategy.TRANSPOSE
        );
        System.out.println("Initial: " + transposelist);

        for (String target : Arrays.asList("C", "C", "C")) {
            int idx = transposelist.search(target);
            String status = (idx != -1) ? "Found at index " + idx : "Not found";
            System.out.println("Search '" + target + "' → " + status + " → Now: " + transposelist);
        }

        System.out.println();

        // --- Example 3: Count Method ---
        System.out.println("🎯 Strategy: Count (Frequency-Based)");
        SelfOrganizingList countlist = new SelfOrganizingList(
            Arrays.asList("A", "B", "C", "D"),
            SelfOrganizingList.Strategy.COUNT
        );
        System.out.println("Initial: " + countlist);

        for (String target : Arrays.asList("A", "C", "A", "B", "A", "C")) {
            int idx = countlist.search(target);
            String status = (idx != -1) ? "Found at index " + idx : "Not found";
            System.out.println("Search '" + target + "' → " + status + " → Now: " + countlist);
        }
    }
}