Read this in other languages: [فارسی](/search/array-based-search/fibonacci-search/README.fa.md)

# 🔍 Fibonacci Search – Divide Using Fibonacci Numbers

**Fibonacci Search** is a comparison-based searching algorithm that uses **Fibonacci numbers** to divide a sorted array into unequal parts. Like Binary Search, it works only on **sorted arrays**, but instead of splitting the array in half, it divides it using Fibonacci sequence values (e.g., 1, 1, 2, 3, 5, 8, 13, ...).

This approach can be more cache-friendly and efficient in certain memory-access scenarios, making it useful in systems where data access time varies significantly (e.g., magnetic tapes, external storage).


## 📚 How It Works

Fibonacci Search leverages properties of the Fibonacci sequence:
> F(n) = F(n−1) + F(n−2), with F(0)=0, F(1)=1

### ✅ Steps:
1. Find the smallest Fibonacci number `F(k)` such that `F(k) >= n`, where `n` is the array size.
2. Use `F(k-1)` and `F(k-2)` to determine split points:
   - Compare target with element at index `min(F(k-2), n-1)`
3. If match → return index
4. If target < arr[index] → search **left subarray** (size ≈ F(k-2))
5. If target > arr[index] → search **right subarray** (size ≈ F(k-1))
6. Update Fibonacci indices (`k--`) and repeat until found or range is empty

> ✅ **Requirement**: Array must be **sorted**

---

### 🧩 Example

```text
Array: [10, 20, 30, 40, 50, 60, 70, 80]
Target: 60
Size: 8 → Smallest Fibonacci ≥ 8 is 8 (F(6))

Step 1: 
  k = 6 → F(4)=3, F(5)=5
  Check index = min(3, 7) = 3 → arr[3] = 40 < 60 → Go right

New subarray: [50, 60, 70, 80] (size ≈ F(5)=5)
Update: k = 5

Step 2:
  F(3)=2, F(4)=3
  Offset = 4 (starting index), check index = 4 + 2 = 6 → arr[6]=70 > 60 → Go left

Subarray: [50, 60] (size ≈ F(3)=2)
Update: k = 4

Step 3:
  F(2)=1, F(3)=2
  Check index = 4 + 1 = 5 → arr[5]=60 == 60 → Found!

Result: Index 5
```



## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is at Fibonacci-split point |
| **Average/Worst Case** | O(log n) | Each step reduces problem size logarithmically |
| **Space Complexity** | O(1) | Iterative version uses constant extra space |

> 💡 Despite different splitting strategy, performance is asymptotically similar to Binary Search: **O(log n)**



## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| Uses only addition/subtraction (no division) — good for hardware-limited systems | Slightly more complex than Binary Search |
| Cache-efficient: accesses elements sequentially after initial jumps | Requires precomputed Fibonacci numbers |
| Better memory access pattern in some I/O-bound systems | Not as widely used or optimized in standard libraries |
| Avoids overflow issues from mid-point calculation (`low + (high-low)/2`) | Overkill for small arrays |


## 🔁 Comparison with Binary Search

| Feature | Binary Search | Fibonacci Search |
|--------|---------------|------------------|
| Splitting Method | Always middle | Fibonacci-based index |
| Operations Used | Division, subtraction | Addition, subtraction |
| Memory Access Pattern | Random jumps | More sequential over time |
| Overflow Risk | Possible in midpoint calc | None (uses offsets) |
| Implementation Complexity | Simple | Moderate |
| Real-World Use | General-purpose | Specialized (external storage, embedded systems) |




## 🌐 When to Use

- ✅ Searching in **large sorted arrays** stored on slow or external storage (e.g., tape drives)
- ✅ Embedded systems where **division is expensive**
- ✅ Scenarios where **sequential access is cheaper** than random access
- ✅ Educational purposes — demonstrates creative use of mathematical sequences
- ✅ Avoiding integer overflow in midpoint calculations

> 🚫 Avoid for small datasets or when simplicity is preferred.


## 💡 Why Fibonacci?

Because consecutive Fibonacci ratios approximate the **Golden Ratio (φ ≈ 1.618)**, which naturally partitions arrays into nearly optimal proportions — similar to how Binary Search splits by 2.

So while divisions are avoided, the search still efficiently narrows down the range.


## 📝 Summary

**Fibonacci Search** is a clever variation of divide-and-conquer search that replaces binary splitting with **Fibonacci-number-guided partitioning**.

While not faster in big-O terms than Binary Search, its **addition-only logic** and **better locality of reference** make it valuable in niche applications involving **slow or non-uniform memory access**.

A beautiful example of how mathematical patterns can improve algorithm design — even in something as fundamental as searching.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/fibonacci-search/python/) | [Java](/search/array-based-search/fibonacci-search/java/) | [JavaScript](/search//array-based-search/fibonacci-search/javascript/) | [C++](/search/array-based-search/fibonacci-search/cpp/) | [C#](/search/array-based-search/fibonacci-search/csharp/)