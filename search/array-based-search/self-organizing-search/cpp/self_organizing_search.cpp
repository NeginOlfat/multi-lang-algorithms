#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

/**
 * A self-organizing list that adapts its structure based on access patterns.
 *
 * Supports three reorganization strategies:
 * 1. MOVE_TO_FRONT: Move accessed item to front
 * 2. TRANSPOSE: Swap with previous element
 * 3. COUNT: Sort by frequency descending, preserving original order on ties
 */
class SelfOrganizingList {
public:
    enum class Strategy {
        MOVE_TO_FRONT,
        TRANSPOSE,
        COUNT
    };

private:
    std::vector<std::string> items;
    Strategy strategy;

    // For COUNT strategy
    std::unordered_map<std::string, int> accessCount;
    std::unordered_map<std::string, int> insertionOrder;  // First-seen index

public:
    /**
     * Initialize the self-organizing list.
     *
     * @param data     Initial list of elements.
     * @param strategy One of MOVE_TO_FRONT, TRANSPOSE, COUNT
     */
    SelfOrganizingList(const std::vector<std::string>& data, Strategy strategy)
        : items(data), strategy(strategy) {

        // Record first-seen index for stable tie-breaking
        for (size_t i = 0; i < data.size(); ++i) {
            const auto& item = data[i];
            if (insertionOrder.find(item) == insertionOrder.end()) {
                insertionOrder[item] = static_cast<int>(i);
            }
        }

        // Initialize counts
        for (const auto& item : items) {
            accessCount[item] = 0;
        }
    }

    /**
     * Search for an item and reorganize the list based on strategy.
     *
     * @param target Element to search for.
     * @return Index where found before reorganization; -1 if not found.
     */
    int search(const std::string& target) {
        // Find index
        auto it = std::find(items.begin(), items.end(), target);
        if (it == items.end()) return -1;
        int idx = static_cast<int>(std::distance(items.begin(), it));

        switch (strategy) {
            case Strategy::COUNT:
                accessCount[target]++;
                reorder();
                break;

            case Strategy::MOVE_TO_FRONT:
                items.erase(it);
                items.insert(items.begin(), target);
                break;

            case Strategy::TRANSPOSE:
                if (idx > 0) {
                    std::swap(items[idx], items[idx - 1]);
                }
                break;
        }

        return idx;  // Return original index
    }

    /**
     * Reorder list by access count (descending), preserving insertion order on ties.
     */
    void reorder() {
        std::sort(items.begin(), items.end(), [this](const std::string& a, const std::string& b) {
            int freqDiff = accessCount[b] - accessCount[a];
            if (freqDiff != 0) return freqDiff > 0;  // Descending by frequency

            // Tie: use original insertion order
            return insertionOrder[a] < insertionOrder[b];
        });
    }

    /**
     * Get current list as string representation.
     */
    std::string toString() const {
        if (strategy == Strategy::COUNT) {
            std::string result = "[";
            for (size_t i = 0; i < items.size(); ++i) {
                result += items[i] + ":" + std::to_string(accessCount.at(items[i]));
                if (i < items.size() - 1) result += ", ";
            }
            result += "]";
            return result;
        } else {
            std::string result = "[";
            for (size_t i = 0; i < items.size(); ++i) {
                result += items[i];
                if (i < items.size() - 1) result += ", ";
            }
            result += "]";
            return result;
        }
    }

    /**
     * Get a copy of current items.
     */
    std::vector<std::string> getItems() const {
        return items;
    }

    /**
     * Get access count map (for testing).
     */
    const std::unordered_map<std::string, int>& getAccessCount() const {
        return accessCount;
    }
};

// Example usage and demonstration
int main() {
    std::cout << "🔍 Self-Organizing Search Examples\n\n";

    // --- Example 1: Move-to-Front ---
    std::cout << "🎯 Strategy: Move-to-Front\n";
    SelfOrganizingList mtflist(
        {"A", "B", "C", "D"},
        SelfOrganizingList::Strategy::MOVE_TO_FRONT
    );
    std::cout << "Initial: " << mtflist.toString() << "\n";

    std::vector<std::string> searches1 = {"C", "B", "C"};
    for (const auto& target : searches1) {
        int idx = mtflist.search(target);
        std::string status = (idx != -1) ? "Found at index " + std::to_string(idx) : "Not found";
        std::cout << "Search '" << target << "' → " << status << " → Now: " << mtflist.toString() << "\n";
    }

    std::cout << "\n";

    // --- Example 2: Transpose ---
    std::cout << "🎯 Strategy: Transpose\n";
    SelfOrganizingList transposelist(
        {"A", "B", "C", "D"},
        SelfOrganizingList::Strategy::TRANSPOSE
    );
    std::cout << "Initial: " << transposelist.toString() << "\n";

    std::vector<std::string> searches2 = {"C", "C", "C"};  // Repeated access
    for (const auto& target : searches2) {
        int idx = transposelist.search(target);
        std::string status = (idx != -1) ? "Found at index " + std::to_string(idx) : "Not found";
        std::cout << "Search '" << target << "' → " << status << " → Now: " << transposelist.toString() << "\n";
    }

    std::cout << "\n";

    // --- Example 3: Count Method ---
    std::cout << "🎯 Strategy: Count (Frequency-Based)\n";
    SelfOrganizingList countlist(
        {"A", "B", "C", "D"},
        SelfOrganizingList::Strategy::COUNT
    );
    std::cout << "Initial: " << countlist.toString() << "\n";

    std::vector<std::string> searches3 = {"A", "C", "A", "B", "A", "C"};
    for (const auto& target : searches3) {
        int idx = countlist.search(target);
        std::string status = (idx != -1) ? "Found at index " + std::to_string(idx) : "Not found";
        std::cout << "Search '" << target << "' → " << status << " → Now: " << countlist.toString() << "\n";
    }

    return 0;
}