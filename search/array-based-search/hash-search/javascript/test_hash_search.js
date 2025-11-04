const { strictEqual, ok, deepEqual } = require('assert');

// Import the class
const { HashTable } = require('./hash_search');

console.log("🧪 Running Hash Search Tests...\n");

// Test: Insert and search
(() => {
    const ht = new HashTable(4);
    ht.insert("isbn1", { title: "Book 1" });
    const result = ht.search("isbn1");
    ok(result, "Should find inserted book");
    strictEqual(result.title, "Book 1", "Title should match");
})();

// Test: Update existing key
(() => {
    const ht = new HashTable(4);
    ht.insert("isbn1", { title: "Old Title" });
    ht.insert("isbn1", { title: "New Title" }); // Update
    const result = ht.search("isbn1");
    strictEqual(result.title, "New Title", "Should update value");
})();

// Test: Delete
(() => {
    const ht = new HashTable(4);
    ht.insert("isbn1", { title: "To Delete" });
    ok(ht.has("isbn1"), "Key should exist before delete");
    
    const deleted = ht.delete("isbn1");
    strictEqual(deleted, true, "Delete should return true");
    strictEqual(ht.search("isbn1"), undefined, "Value should be gone");
    strictEqual(ht.length, 0, "Count should decrease");
})();

// Test: Search missing key
(() => {
    const ht = new HashTable(4);
    strictEqual(ht.search("missing"), undefined, "Missing key should return undefined");
})();

// Test: Resize on high load factor
(() => {
    const ht = new HashTable(4);
    const keys = ['a', 'b', 'c', 'd', 'e']; // Trigger resize at ~3 items
    keys.forEach(k => ht.insert(k, { x: k }));
    
    strictEqual(ht.size, 8, "Size should double after threshold");
    strictEqual(ht.length, 5, "All items should be preserved");
})();

// Test: Collision handling via separate chaining
(() => {
    const ht = new HashTable(4);
    ht.insert("a", { title: "A" });
    ht.insert("b", { title: "B" }); // May collide depending on hash
    
    strictEqual(ht.search("a").title, "A", "First book should be retrievable");
    strictEqual(ht.search("b").title, "B", "Second book should be retrievable");
})();

// Test: length and has
(() => {
    const ht = new HashTable(4);
    ht.insert("k1", { x: 1 });
    ht.insert("k2", { x: 2 });
    
    strictEqual(ht.length, 2, "Length should be 2");
    ok(ht.has("k1"), "Should contain k1");
    ok(ht.has("k2"), "Should contain k2");
    ok(!ht.has("k3"), "Should not contain k3");
})();

// Test: empty table
(() => {
    const ht = new HashTable(4);
    strictEqual(ht.length, 0, "Empty table length is 0");
    strictEqual(ht.count, 0, "Count should be 0");
    strictEqual(ht.loadFactor, 0, "Load factor should be 0");
    strictEqual(ht.search("any"), undefined, "Search should return undefined");
})();

console.log("\n✅ All tests passed!");