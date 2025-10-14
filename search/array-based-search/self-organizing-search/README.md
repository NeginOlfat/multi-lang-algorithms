Read this in other languages: [فارسی](/search/array-based-search/self-organizing-search/README.fa.md)

# 🔍 Self-Organizing Search – Adaptive Linear Search

**Self-Organizing Search** is a family of adaptive search algorithms that dynamically reorganize a list based on access patterns to improve future search performance. Unlike static linear search, it "learns" from usage by moving frequently accessed elements closer to the front.

This makes it highly effective when data access follows the **80/20 rule** (Pareto principle): a small subset of items is searched much more often than others.

> 📌 Think of it like rearranging your kitchen so the most-used spices are always within reach.



## 📚 How It Works

Instead of just returning the found element, self-organizing search **restructures the list** after each search using a heuristic:

### ✅ Common Heuristics

| Strategy | Description |
|--------|-------------|
| **Move-to-Front** | Immediately moves the found item to the front of the list. |
| **Transpose** | Swaps the found item with the one before it (only if not already first). |
| **Count / Frequency-Based** | Keeps a count of accesses and sorts the list by frequency (most frequent first). |

These strategies reduce the average search time over repeated queries without requiring full sorting.

> ✅ **Requirement**: List must be mutable (can be reordered)

---

### 🧩 Example: Move-to-Front

```text
Initial List: [A, B, C, D]
Search for: C

Step 1: Scan → A ≠ C, B ≠ C, C == C → Found at index 2
Step 2: Move C to front → New list: [C, A, B, D]

Next search for C → found immediately at index 0!
```

Repeated searches for popular items become faster over time.

---

### 🧩 Example: Transpose

```text
List: [A, B, C, D]
Search for: C

Found at index 2 → swap with B → [A, C, B, D]

Next search for C → now at index 1 (faster than before)
```

Less aggressive than Move-to-Front — good for avoiding overreaction to rare spikes.

---

### 🧩 Example: Count Method

```text
List:     [A, B, C, D]
Count:    [0, 0, 0, 0]

Search A → count[A]++ → [1, 0, 0, 0]
Search C → count[C]++ → [1, 0, 1, 0]
Search A → count[A]++ → [2, 0, 1, 0] → Reorder: [A, C, B, D]

Now A is fastest to find.
```

Eventually converges to optimal order based on usage.

---

## ⏱️ Time & Space Complexity

| Case | Time (Search) | Time (Update) | Space |
|------|---------------|---------------|-------|
| **Best Case** | O(1) | O(1) to O(n) | O(n) + O(n) counts (if used) |
| **Worst Case** | O(n) | O(1) | O(n) |
| **Average Case** | O(n) → improves over time | O(1) or O(n log n)* | O(n) |

> *Only Count method may require periodic resorting (`O(n log n)`), others update in `O(1)`.

💡 Over repeated searches, **average case improves significantly** due to adaptation — potentially approaching **O(1)** for hot items.



## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| Improves performance over time with no extra preprocessing | Slower initial searches for cold items |
| Simple to implement and understand | Not suitable for read-only or shared lists |
| No need for prior knowledge of access patterns | Can degrade if access pattern changes suddenly |
| Great for dynamic, unpredictable workloads | Move-to-Front can overreact to one-time queries |
| Low overhead per operation | Count method needs extra storage |


## 🌐 When to Use

- ✅ **Frequently accessed small datasets** (e.g., symbol tables, caches)
- ✅ **Dynamic access patterns** where popularity changes over time
- ✅ **LRU-like behavior without extra structure**
- ✅ **Educational purposes** — shows how adaptivity improves algorithms
- ✅ **Embedded systems** with limited memory (simpler than hash tables)

> 🚫 Avoid for:
> - Large datasets (linear scan still slow)
> - Sorted data where binary search is better
> - Immutable or thread-shared lists


## 🔁 Comparison with Other Searches

| Algorithm | Best For | Adaptivity | Avg Search Time |
|---------|----------|----------|-----------------|
| Linear Search | General unsorted data | None | O(n) |
| Binary Search | Sorted data | None | O(log n) |
| Hash Table | Fast lookup | None | O(1) avg |
| **Self-Organizing Search** | **Frequent-access skewed data** | ✅ Yes | **Improves over time** |

> Think of it as **Linear Search with muscle memory** — gets faster the more you use it.


## 💡 Why “Self-Organizing”?

Because the list **reorganizes itself automatically** based on usage — no external sorting or indexing needed. It’s a form of **online learning** in data structures.

Perfect example of how **simple feedback loops** can lead to intelligent behavior.

## 📝 Summary

**Self-Organizing Search** is not about being fast once — it's about **getting faster over time**.

By applying simple heuristics like **Move-to-Front**, **Transpose**, or **Count**, it adapts to access patterns and dramatically reduces average search time for frequently used elements.

While asymptotically still O(n), its **practical performance** shines in real-world scenarios where some items are searched far more than others.

A brilliant blend of simplicity and intelligence — proving that sometimes, the best optimization isn't brute force, but **learning from experience**.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/self-organizing-search/python/) | [Java](/search/array-based-search/self-organizing-search/java/SelfOrganizingList.java) | [JavaScript](/search/array-based-search/self-organizing-search/javascript/) | [C++](/search/array-based-search/self-organizing-search/cpp/self_organizing_search.cpp) | [C#](/search/array-based-search/self-organizing-search/csharp/SelfOrganizingList.cs)