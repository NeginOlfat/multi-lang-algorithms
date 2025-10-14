Read this in other languages: [فارسی](/search/array-based-search/sentinel-search/README.fa.md)

# 🔍 Sentinel Search – Optimized Linear Search

**Sentinel Search** is a variation of **Linear Search** that eliminates the need for repeated boundary checks during iteration by placing a **sentinel value** at the end of the array.

This small optimization reduces the number of comparisons per iteration from **two** (value match + index bound) to just **one** (value match), making it slightly faster in practice — especially for large arrays where the target is near the end.

> 📌 Think of it like putting a "stop sign" at the end of a hallway so you don’t have to check walls as you walk.



## 📚 How It Works

The key idea: **modify the array temporarily** by placing the `target` itself at the last position (the sentinel). This guarantees the target will be found somewhere, so we can skip index bounds checking inside the loop.

### ✅ Steps:
1. Save the last element of the array.
2. Replace the last element with the `target` (this is the **sentinel**).
3. Start scanning from the beginning until the target is found.
4. After loop:
   - If the found index is the last position → check if original last element was the target
   - Otherwise, return the found index
5. Restore the original last element (optional, if preserving input matters)

> ✅ **Requirement**: Array must be mutable (can be modified)


### 🧩 Example

```text
Array: [10, 20, 35, 40, 50]  
Target: 35

Step 1: Save last = 50
Step 2: Set arr[4] = 35 → [10, 20, 35, 40, 35]
Step 3: Scan:
   i=0 → 10 ≠ 35
   i=1 → 20 ≠ 35
   i=2 → 35 == 35 → Found!

Index = 2 ≠ last index → return 2
```

Now no need to check `i < n` on every step — only one comparison per element!



## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is first element |
| **Worst Case** | O(n) | Target is not present or at the end |
| **Average Case** | O(n) | Still scans half the array on average |
| **Space Complexity** | O(1) | Uses constant extra space |

> 💡 Despite same big-O as linear search, it has **fewer comparisons**, which improves performance in tight loops.


## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| Reduces comparisons from 2 to 1 per element | Only beneficial for large arrays |
| Slightly faster than standard linear search | Requires modifying the array (not suitable for read-only data) |
| Simple logic once understood | Extra steps to save/restore last element |
| Educational insight into low-level optimization | Rarely used in modern high-level languages |


## 🔁 Comparison with Linear Search

| Feature | Linear Search | Sentinel Search |
|--------|---------------|------------------|
| Comparisons per Iteration | 2 (`arr[i] != target`, `i < n`) | 1 (`arr[i] != target`) |
| Boundary Checks | Yes (every iteration) | No (guaranteed hit via sentinel) |
| Mutates Input? | No | Yes (temporarily) |
| Performance | Standard | Slightly better in practice |
| Use Cases | General purpose | Low-level systems, embedded code |
| Readability | High | Moderate |


## 🌐 When to Use

- ✅ Searching in **large unsorted arrays** where even small optimizations matter
- ✅ Embedded systems or performance-critical code
- ✅ Teaching algorithmic optimization techniques
- ✅ Scenarios where memory access cost > computation cost

> 🚫 Avoid for:
> - Read-only or immutable arrays
> - Small datasets (overhead not worth it)
> - Multi-threaded environments (modifying shared data)


## 💡 Why “Sentinel”?

A **sentinel** is a special value used to mark the end of data — like a guard that says “you’ll find what you’re looking for before or here.”

By setting the target as the sentinel, we guarantee termination without needing an extra condition.



## 📝 Summary

**Sentinel Search** is a clever micro-optimization of Linear Search that uses a **temporary sentinel value** to eliminate bounds checking during traversal.

While asymptotically still **O(n)**, it reduces the number of conditional checks per iteration — offering real-world speedups in systems where every CPU cycle counts.

A great example of how **small changes** in algorithm design can yield measurable improvements — especially in low-level programming.

Not widely used today, but valuable for understanding how compilers and optimized libraries work under the hood.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/sentinel-search/python/) | [Java](/search/array-based-search/sentinel-search/java/) | [JavaScript](/search/array-based-search/sentinel-search/javascript/) | [C++](/search/array-based-search/sentinel-search/cpp/) | [C#](/search/array-based-search/sentinel-search/csharp/)
