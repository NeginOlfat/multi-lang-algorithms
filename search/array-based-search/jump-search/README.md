Read this in other languages: [فارسی](/search/array-based-search/jump-search/README.fa.md)

# 🔍 Jump Search Algorithm

**Jump Search** is an efficient searching algorithm for **sorted arrays** that works by jumping ahead by fixed steps (or “blocks”) instead of checking every element — reducing the number of comparisons compared to Linear Search.

It’s a trade-off between **Linear Search** (simple but slow) and **Binary Search** (fast but complex), making it useful in certain scenarios where backtracking is costly.

##  📚 How It Works

1. **Determine block size**:  
   The optimal jump size is `√n`, where `n` is the length of the array.

2. **Jump forward** by blocks until you find a block where:
   - The starting element ≤ target
   - The next block’s first element > target  
   *(Or reach the end)*

3. **Perform Linear Search within that block** to find the target.

4. Return the index if found; otherwise, return `-1`.

> ✅ **Requirement**: The input array **must be sorted**.

---

### 🧩 Example

```text
Array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Target: 7
Block size (√11 ≈ 3)

Step 1: Jump to index 3 → value = 3 < 7 → keep going  
Step 2: Jump to index 6 → value = 6 < 7 → keep going  
Step 3: Jump to index 9 → value = 9 ≥ 7 → go back to previous block [index 6–8]

Now linear search in [6, 7, 8]:
→ 6 ≠ 7
→ 7 == 7 → Found!

Index: 7
```

## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is at the first step after a jump |
| **Average/Worst Case** | O(√n) | Jumping √n steps, then scanning up to √n elements |
| **Space Complexity** | O(1) | Uses constant extra space |

> 💡 Why `√n`?  
> Minimizes total cost: `jump_count + scan_in_block ≈ n/k + k`.  
> This is minimized when `k = √n`.


## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| Faster than Linear Search | Slower than Binary Search (`O(log n)` vs `O(√n)`) |
| Less comparisons than Linear Search | Requires sorted data |
| Good when backward movement is expensive (e.g., linked lists with limited random access) | Not as widely used |
| Simple to implement | Performance degrades if block size isn’t chosen well |


## 🌐 When to Use Jump Search

- ✅ Data is **sorted**
- ✅ You want something **faster than linear search** but simpler than binary search
- ✅ Random access is limited or expensive (like in **linked lists**, though not directly applicable without indexing)
- ✅ Educational purposes — great for learning optimization via block-based search

> ⚠️ Avoid for small datasets or unsorted arrays.

## 💡 Real-World Analogy

Imagine you're looking for "Smith" in a printed phone book:

- **Linear Search**: Read every name from start.
- **Binary Search**: Open in the middle, then half again.
- **Jump Search**: Flip every 10 pages quickly until you pass "Smith", then go back one section and scan page-by-page.

You reduce full scans while avoiding deep recursion or complex logic.

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/jump-search/python/) | [Java](/search/array-based-search/jump-search/java/) | [JavaScript](/search/array-based-search/jump-search/javascript/) | [C++](/search/array-based-search/jump-search/cpp/) | [C#](/search/array-based-search/jump-search/csharp/)

