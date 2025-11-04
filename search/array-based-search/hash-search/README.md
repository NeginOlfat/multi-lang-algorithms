Read this in other languages: [فارسی](/search/array-based-search/hash-search/README.fa.md)

# 🔍 Hash Search – The Engine Behind Fast Data Retrieval

**Hash Search** is one of the most powerful and widely used techniques in computer science. It enables **average-case O(1)** time complexity for insertion, deletion, and lookup operations by using a **hash function** to map keys directly to storage locations.

It powers fundamental data structures like dictionaries (`dict`), maps (`HashMap`), and sets across all major programming languages.

> 📌 Think of it like a library’s catalog system: you don’t scan every shelf — you look up the book title and go straight to its shelf location.


## 🧠 Core Concepts

### 1. 🔑 Key
A **key** is a unique identifier used to store and retrieve data.
- Examples: student ID, username, product code, book ISBN
- Must be **hashable** (i.e., supports equality comparison and has a hash value)

In hash-based search, we don’t care about the position of data — we use the key to compute where it *should* be.

---

### 2. 🗃️ Hash Table (Hash Map)
A **hash table** is an array-based data structure that stores key-value pairs.
- Each index is called a **bucket** or **slot**
- The table uses a hash function to determine which bucket holds a given key

Size is usually fixed initially but can grow dynamically.

---

### 3. 🔢 Hash Function
A **hash function** converts a key into an integer index within the bounds of the hash table:

```text
index = hash(key) % table_size
```

#### Properties of a Good Hash Function:
| Property | Why It Matters |
|--------|----------------|
| **Deterministic** | Same key → same index every time |
| **Uniform Distribution** | Keys spread evenly across buckets |
| **Fast to Compute** | Doesn’t slow down operations |
| **Minimizes Collisions** | Reduces performance degradation |
|        |

Example (simple string hash):
```python
def simple_hash(s, table_size):
    return sum(ord(c) for c in s) % table_size
```

Real-world hash functions (e.g., SHA-256, MurmurHash) are much more sophisticated.

---

### 4. 💥 Collision
A **collision** occurs when two different keys produce the same hash index.

Even with a good hash function, collisions are inevitable due to the **Pigeonhole Principle**:  
> If you have more keys than buckets, some buckets must hold multiple items.

Collision resolution strategies ensure correctness despite this.

---

### 5. ⚖️ Load Factor
The **load factor** measures how full the hash table is:

```text
Load Factor (α) = Number of Entries / Table Size
```

| Load Factor | Meaning | Performance Impact |
|------------|--------|--------------------|
| α < 0.5 | Underutilized | Wastes memory |
| α ≈ 0.7 | Ideal balance | Optimal speed & space |
| α > 0.8 | Overloaded | High collision rate |
| α = 1.0 | Full | Time to resize! |

When load factor exceeds a threshold (typically 0.7–0.8), the table is **resized** (doubled) and all entries are rehashed.

---

### 6. 🔄 Resizing
To maintain performance, hash tables automatically **resize** when the load factor gets too high.

Steps:
1. Allocate a new table (usually double the size)
2. Recompute hash indices for all existing keys
3. Insert them into the new table
4. Replace old table

Cost: O(n), but amortized over many insertions → still O(1) average per operation.


## 🛠️ Collision Resolution Strategies

### ✅ Strategy 1: Separate Chaining
Each bucket contains a list (or tree) of key-value pairs.

- **Insert**: Add to list at computed index
- **Search**: Traverse list until key found
- **Delete**: Remove from list

**Pros**:
- Simple to implement
- Handles unlimited collisions
- Deletions easy

**Cons**:
- Extra memory for pointers
- Cache-unfriendly (linked list traversal)

**Time**: O(1) avg, O(n) worst (if all keys collide)

---

### ✅ Strategy 2: Open Addressing
All entries stored directly in the array. On collision, probe for next available slot.

| Method | Probe Sequence | Formula |
|-------|----------------|---------|
| **Linear Probing** | +1, +2, +3... | `(h(k) + i) % size` |
| **Quadratic Probing** | +1, +4, +9... | `(h(k) + i²) % size` |
| **Double Hashing** | Use second hash | `(h₁(k) + i·h₂(k)) % size` |

**Pros**:
- Better cache performance (array locality)
- No extra pointer memory

**Cons**:
- Sensitive to clustering (especially linear probing)
- Deletion tricky (use tombstones)
- Table can fill up



## 🧩 Example: Library Book Lookup System

Imagine a **digital library system** where librarians need to quickly find books by **ISBN**.

### 📚 Problem
- Thousands of books
- Frequent lookups, inserts, deletions
- Need instant access

Using linear search: O(n) → slow  
Using binary search: O(log n) → requires sorting  
→ Best choice: **Hash Search**

---

### 🏗️ Design
- **Key**: ISBN (e.g., `"978-0134685991"`)
- **Value**: Book info (title, author, shelf number)
- **Table Size**: 1000 slots
- **Hash Function**: Convert ISBN digits to int → mod 1000
- **Collision Handling**: Separate Chaining

---

### ➕ Insertion Example
Insert book with ISBN `"978-0134685991"` → sum digits = 9+7+8+0+1+3+4+6+8+5+9+9+1 = **70**
→ Index = 70 % 1000 = **70**

Store at index 70.

Now insert `"978-0262033848"` → digit sum = 9+7+8+0+2+6+2+0+3+3+8+4+8 = **60** → index 60

No collision → fast!

But if another book hashes to 70? Append to chain at index 70.

---

### 🔍 Search Example
Find `"978-0134685991"`:
1. Compute hash → 70
2. Go directly to index 70
3. Scan linked list (only 1–2 items likely)
4. Return book details instantly

✅ Done in **O(1)** average time!


### 📊 After Millions of Operations
With proper resizing and hashing:
- Average lookup: ~1–3 steps
- Memory usage: ~70% efficient
- Scalable to millions of books

This is why real systems like databases and caches rely on hashing.


## ⏱️ Time & Space Complexity

| Operation | Average Case | Worst Case | Notes |
|---------|--------------|------------|-------|
| **Search** | O(1) | O(n) | All keys collide |
| **Insert** | O(1) | O(n) | Same |
| **Delete** | O(1) | O(n) | Same |
| **Space** | O(n) | O(n) | Includes overhead |

> 💡 **Worst case only happens with poor hash function or malicious input**

Modern implementations (Python dicts, Java HashMaps) use randomized hashing to prevent attacks.


## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| O(1) average-case performance | Worst case O(n) due to collisions |
| Extremely fast for lookups | No inherent ordering of keys |
| Foundation of dicts/sets in all languages | Requires good hash function |
| Supports dynamic growth | Memory overhead (empty buckets or pointers) |
| Widely optimized in hardware/software | Not suitable for range queries |


## 🌐 When to Use Hash Search

Use hash search when:
- ✅ You need **fast key-value lookup**
- ✅ Keys are well-distributed and hashable
- ✅ Order doesn't matter
- ✅ Frequent insertions/deletions
- ✅ Deduplication (e.g., checking seen URLs)
- ✅ Caching (memoization, LRU cache backend)

Examples:
- Database indexing
- Compiler symbol tables
- Web session storage
- Frequency counting
- Spell checkers
- Router IP lookups



## 🚫 Where Hash Search Should NOT Be Used

Avoid hash search when:
- ❌ You need **sorted order** (use BST, sorted array)
- ❌ You perform **range queries** (e.g., "find all books between A–D") → use B-tree or sorted list
- ❌ Keys are **unhashable** (like mutable lists/dicts)
- ❌ Memory is extremely tight → arrays may be better
- ❌ Predictable worst-case timing required → hash can degrade
- ❌ You need **iteration in sorted order** → use TreeMap, ordered dict
- ❌ Working with floating-point keys (risky due to precision)

> 🔁 Prefer **balanced trees** (BST, AVL, Red-Black) when you need ordering or guaranteed O(log n) bounds.


## 🔁 Comparison with Other Searches

| Algorithm | Best For | Avg Time | Notes |
|---------|----------|----------|-------|
| **Hash Search** | Key-value lookup | **O(1)** | Fastest average case |
| Binary Search | Sorted arrays | O(log n) | Requires sort; supports ranges |
| Linear Search | Unsorted data | O(n) | Simple but slow |
| BST Search | Dynamic sorted data | O(log n)* | *Only if balanced |
| Trie | String keys | O(m) | m = key length; supports prefixes |
| Bloom Filter | Approximate membership | O(1) | Probabilistic; space-efficient |

> Think of hash search as the **sports car** of data retrieval — blazing fast when conditions are right, but not built for off-road terrain.



## 💡 Why “Hash”?

The word *hash* comes from "chop and mix", just like how a hash function **chops up** the input and **mixes** it into a compact representation.

It’s not encryption — it’s **digestion**: turning arbitrary data into a small, usable index.

Just like chopping vegetables before cooking, we "hash" data before storing it.



## 📝 Summary

**Hash Search** is the backbone of high-performance data retrieval in modern computing.

By mapping keys to indices via a hash function, it enables near-instant access to values — making operations like dictionary lookup, caching, and deduplication incredibly efficient.

While worst-case performance can degrade due to collisions, real-world implementations use advanced techniques to keep load factors low and distributions uniform.

Mastering hash search means understanding:
- How hash functions work
- Collision resolution strategies
- Trade-offs between chaining and probing
- The importance of load factor and resizing

Once you get it, you’ll see it everywhere — because **almost every program uses hashing** under the hood.

From your browser’s password manager to Google’s search index, **hashing powers the digital world**.

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/hash-search/python/) |  [JavaScript](/search/array-based-search/hash-search/javascript/) 
