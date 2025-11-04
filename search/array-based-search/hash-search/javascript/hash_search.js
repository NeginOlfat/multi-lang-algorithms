/**
 * A hash table implementation using separate chaining for collision resolution.
 * 
 * Supports O(1) average-case insert, search, and delete operations.
 * Automatically resizes when load factor exceeds threshold (0.75).
 */
class HashTable {
    /**
     * Initialize hash table with given initial size.
     * 
     * @param {number} initialSize - Initial number of buckets (should be power of 2)
     */
    constructor(initialSize = 8) {
        this.size = initialSize;
        this.count = 0;
        this.buckets = Array(this.size).fill(null).map(() => []);
        this.loadFactorThreshold = 0.75;
    }

    /**
     * Compute hash index for a given key.
     * Uses string hash if key is string, otherwise uses built-in toString().
     * 
     * @param {*} key - Hashable key (e.g., string, number)
     * @returns {number} - Index in range [0, size)
     */
    _hash(key) {
        let h = 0;
        const str = String(key);
        
        // Simple but effective string hashing
        for (let i = 0; i < str.length; i++) {
            h = (h << 5) - h + str.charCodeAt(i); // h * 31 + c
            h |= 0; // Convert to 32-bit integer
        }
        
        return Math.abs(h) % this.size; // Use mod since we don't enforce power-of-2
    }

    /**
     * Current load factor (count / size).
     */
    get loadFactor() {
        return this.count / this.size;
    }

    /**
     * Resize table to double current size and rehash all entries.
     */
    _resize() {
        const oldBuckets = this.buckets;
        this.size *= 2;
        this.count = 0;
        this.buckets = Array(this.size).fill(null).map(() => []);

        // Reinsert all existing items
        for (const chain of oldBuckets) {
            for (const [key, value] of chain) {
                this.insert(key, value);
            }
        }

        console.log(`🔁 Resized hash table → New size: ${this.size}, Load factor: ${this.loadFactor.toFixed(2)}`);
    }

    /**
     * Insert or update key-value pair.
     * 
     * @param {*} key - Hashable identifier
     * @param {*} value - Associated data
     */
    insert(key, value) {
        if (this.loadFactor >= this.loadFactorThreshold) {
            this._resize();
        }

        const index = this._hash(key);
        const chain = this.buckets[index];

        // Check if key already exists
        for (let i = 0; i < chain.length; i++) {
            if (chain[i][0] === key) {
                chain[i] = [key, value];
                return;
            }
        }

        // Key not found → append new entry
        chain.push([key, value]);
        this.count++;
    }

    /**
     * Find value by key.
     * 
     * @param {*} key - Key to search for
     * @returns {*} - Value if found, undefined otherwise
     */
    search(key) {
        const index = this._hash(key);
        const chain = this.buckets[index];

        for (const [k, v] of chain) {
            if (k === key) {
                return v;
            }
        }
        return undefined; // Not found
    }

    /**
     * Remove key-value pair by key.
     * 
     * @param {*} key - Key to remove
     * @returns {boolean} - True if deleted, false if not found
     */
    delete(key) {
        const index = this._hash(key);
        const chain = this.buckets[index];

        for (let i = 0; i < chain.length; i++) {
            if (chain[i][0] === key) {
                chain.splice(i, 1);
                this.count--;
                return true;
            }
        }
        return false; // Not found
    }

    /**
     * Get current number of entries.
     */
    get length() {
        return this.count;
    }

    /**
     * Check if key exists.
     */
    has(key) {
        return this.search(key) !== undefined;
    }

    /**
     * Print current state of hash table.
     */
    display() {
        console.log("\n📚 Hash Table State:");
        console.log(`Size: ${this.size} | Count: ${this.count} | Load Factor: ${this.loadFactor.toFixed(2)}`);
        this.buckets.forEach((chain, i) => {
            if (chain.length > 0) {
                const entries = chain.map(([k, v]) => `('${k}': '${v.title}')`).join(" → ");
                console.log(`  [${i}] ${entries}`);
            }
        });
    }
}

// Example usage: Library Book Lookup System
(() => {
    console.log("🔍 Hash Search Example: Library Book Lookup System\n");

    // Create hash table for books
    const library = new HashTable(4);

    // Sample books with ISBN as key
    const books = [
        ["978-0134685991", {
            title: "Effective Java",
            author: "Joshua Bloch",
            shelf: "A3"
        }],
        ["978-0596009205", {
            title: "Python Cookbook",
            author: "David Beazley",
            shelf: "B1"
        }],
        ["978-1449369415", {
            title: "Design Patterns",
            author: "Erich Gamma",
            shelf: "C7"
        }],
        ["978-0262033848", {
            title: "Introduction to Algorithms",
            author: "Cormen",
            shelf: "D2"
        }],
        ["978-0132350884", {
            title: "Clean Code",
            author: "Robert C. Martin",
            shelf: "A5"
        }]
    ];

    console.log("📥 Inserting books into library system...\n");

    for (const [isbn, info] of books) {
        console.log(`Inserting: '${info.title}' (ISBN: ${isbn})`);
        library.insert(isbn, info);
        library.display();
        console.log();
    }

    console.log("✅ All books inserted.\n");

    // Search examples
    console.log("🔍 Searching for books:\n");

    const searchIsbns = [
        "978-0134685991",  // Exists
        "978-0262033848",  // Exists
        "978-9999999999"   // Does not exist
    ];

    for (const isbn of searchIsbns) {
        const book = library.search(isbn);
        if (book) {
            console.log(`✅ Found: '${book.title}' by ${book.author} (Shelf: ${book.shelf})`);
        } else {
            console.log(`❌ ISBN '${isbn}' not found in library.`);
        }
    }

    console.log();

    // Delete example
    console.log("🗑️ Deleting 'Clean Code'...\n");
    const success = library.delete("978-0132350884");
    if (success) {
        console.log("✅ 'Clean Code' removed from library.");
    } else {
        console.log("❌ Book not found.");
    }

    library.display();

    console.log(`\n🎯 Final Stats: ${library.length} books in ${library.size} buckets`);
})();

module.exports = { HashTable }