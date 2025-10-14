/**
 * A self-organizing list that adapts its structure based on access patterns.
 *
 * Supports three reorganization strategies:
 * 1. Move-to-Front: Move accessed item to front
 * 2. Transpose: Swap with previous element
 * 3. Count: Maintain access frequency and sort accordingly
 *
 * This improves average search time for frequently accessed items.
 */
class SelfOrganizingList {
    /**
     * Initialize the self-organizing list.
     *
     * @param {Array} data - Initial list of elements.
     * @param {string} strategy - One of 'move_to_front', 'transpose', 'count'
     */
    constructor(data = [], strategy = 'move_to_front') {
        this.items = [...data]; // Copy to avoid mutation
        this.strategy = strategy.toLowerCase();
        this.accessCount = {};

        // Track when each item was first inserted (stable tie-breaker)
        this.insertionOrder = new Map();
        data.forEach((item, index) => {
            if (!this.insertionOrder.has(item)) {
                this.insertionOrder.set(item, index);
            }
        });

        if (this.strategy === 'count') {
            this.items.forEach(item => {
                this.accessCount[item] = 0;
            });
        }
    }

    /**
     * Search for an item and reorganize the list based on strategy.
     *
     * @param {*} target - Element to search for
     * @returns {number} - Index where found before reorganization; -1 if not found
     */
    search(target) {
        const idx = this.items.indexOf(target);
        if (idx === -1) return -1; // Not found

        if (this.strategy === 'count') {
            this.accessCount[target] = (this.accessCount[target] || 0) + 1;
            this._reorder();
        } else if (this.strategy === 'move_to_front') {
            this.items.splice(idx, 1);           // Remove from current position
            this.items.unshift(target);          // Insert at front
        } else if (this.strategy === 'transpose' && idx > 0) {
            // Swap with previous element
            [this.items[idx], this.items[idx - 1]] = [this.items[idx - 1], this.items[idx]];
        }

        return idx; // Return original index
    }

    /**
     * Reorder list by access frequency (highest first),
     * preserving original insertion order for ties.
     */
    _reorder() {
        const freq = item => this.accessCount[item] || 0;

        this.items.sort((a, b) => {
            const freqDiff = freq(b) - freq(a);
            if (freqDiff !== 0) return freqDiff; // Sort by frequency (desc)

            // Tie? Use original insertion order (stable)
            const orderA = this.insertionOrder.get(a) ?? Infinity;
            const orderB = this.insertionOrder.get(b) ?? Infinity;
            return orderA - orderB;
        });
    }

    toString() {
        if (this.strategy === 'count') {
            const counts = this.items.map(item => `${item}:${this.accessCount[item]}`);
            return `[${counts.join(', ')}]`;
        }
        return JSON.stringify(this.items);
    }

    toArray() {
        return [...this.items];
    }

    getCounts() {
        return { ...this.accessCount };
    }
}

// Example usage and demonstration
(() => {
    console.log("🔍 Self-Organizing Search Examples\n");

    // --- Example 1: Move-to-Front ---
    console.log("🎯 Strategy: Move-to-Front");
    const mtflist = new SelfOrganizingList(['A', 'B', 'C', 'D'], 'move_to_front');
    console.log(`Initial: ${mtflist}`);

    const searches1 = ['C', 'B', 'C'];
    for (const target of searches1) {
        const idx = mtflist.search(target);
        const status = idx !== -1 ? `Found at index ${idx}` : "Not found";
        console.log(`Search '${target}' → ${status} → Now: ${mtflist}`);
    }

    console.log();

    // --- Example 2: Transpose ---
    console.log("🎯 Strategy: Transpose");
    const transposelist = new SelfOrganizingList(['A', 'B', 'C', 'D'], 'transpose');
    console.log(`Initial: ${transposelist}`);

    const searches2 = ['C', 'C', 'C']; // Repeated access
    for (const target of searches2) {
        const idx = transposelist.search(target);
        const status = idx !== -1 ? `Found at index ${idx}` : "Not found";
        console.log(`Search '${target}' → ${status} → Now: ${transposelist}`);
    }

    console.log();

    // --- Example 3: Count Method ---
    console.log("🎯 Strategy: Count (Frequency-Based)");
    const countlist = new SelfOrganizingList(['A', 'B', 'C', 'D'], 'count');
    console.log(`Initial: ${countlist}`);

    const searches3 = ['A', 'C', 'A', 'B', 'A', 'C']; // A is most frequent
    for (const target of searches3) {
        const idx = countlist.search(target);
        const status = idx !== -1 ? `Found at index ${idx}` : "Not found";
        console.log(`Search '${target}' → ${status} → Now: ${countlist}`);
    }
})();

module.exports = { SelfOrganizingList };