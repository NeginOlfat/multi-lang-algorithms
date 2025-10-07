Read this in other languages: [فارسی](/search/array-based-search/exponential-search/README.fa.md)

# 🔎 Exponential Search – Fast Search for Large or Infinite Arrays

**Exponential Search** (also known as **Doubling Search** or **Gallop Search**) is an efficient searching algorithm designed for **sorted arrays**, especially when:
- The array size is **very large**
- The size is **unknown** (e.g., infinite streams)
- You want to outperform Binary Search in certain scenarios

It combines the speed of **exponential jumps** with the precision of **binary search**, making it ideal for real-world applications like databases, file systems, and streaming data.

## 📚 How It Works

Exponential Search works in **two phases**:

### 🔁 Phase 1: Find the Range
- Start with a subarray of size 1 (`arr[0..1]`)
- Compare the last element with the target
- Keep doubling the range (`1 → 2 → 4 → 8 → ...`) until you find a block where:
  - `arr[i] >= target`
  - Or reach the end

This quickly finds a **range [i/2, i]** that may contain the target.

### 🔍 Phase 2: Binary Search Within Range
- Perform **Binary Search** within the identified range
- Return the index if found; otherwise `-1`

> ✅ **Requirement**: The input array **must be sorted**


### 🧩 Example

```text
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
Target: 70

Phase 1: Exponential Jumps
- Check index 0 → 10 < 70 → keep going
- Jump to index 1 → 20 < 70
- Jump to index 2 → 30 < 70
- Jump to index 4 → 50 < 70
- Jump to index 8 → 90 ≥ 70 → Found range [4, 8]

Phase 2: Binary Search in [50, 60, 70, 80, 90]
→ Finds 70 at index 6

Result: Index 6
```

## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is first element |
| **Average/Worst Case** | O(log n) | One log(n) step to find range, another to binary search |
| **Space Complexity** | O(1) | Iterative version uses constant space |

> 💡 Despite two steps, it’s still **O(log n)** — same as Binary Search  
> But often **faster in practice** due to fewer comparisons in early stages



## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| O(log n) time on sorted arrays | Requires sorted data |
| Efficient for **large or unknown-sized arrays** | Slightly more complex than Binary Search |
| Great for **infinite streams** or unbounded data | Not useful for small datasets |
| Used in **galloping mode** of Python’s `timsort` | Overkill for single searches in small arrays |

## 🌐 When to Use

- ✅ Searching in **very large sorted arrays**
- ✅ Working with **unbounded or infinite data streams** (e.g., logs, sensor data)
- ✅ Implementing **merge algorithms** (like in timsort)
- ✅ Performance-critical systems where average-case efficiency matters
- ✅ Educational purposes — shows hybrid algorithm design

> 🚫 Avoid for small arrays — overhead isn't worth it



## 🔁 Comparison with Binary Search

| Feature | Binary Search | Exponential Search |
|--------|---------------|--------------------|
| Starting Point | Middle of full array | Begins from start |
| Assumption | Knows array size | Works even if size is unknown |
| Best For | Fixed-size sorted arrays | Dynamic or huge arrays |
| Real-World Use | General-purpose search | Advanced sorting/searching |
| Implementation | Simple | Two-step logic |

> Think of it as **"Binary Search with superpowers"** — it doesn’t need to know the end!

## 💡 Real-World Analogy

Imagine looking for page 700 in a book of **unknown length**:
- **Binary Search**: Needs to know total pages first → can't start
- **Exponential Search**: Flips to page 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024...  
  → Sees 1024 > 700 → Now knows range [512–1024] → Binary search within → Found!


## 🔄 Why "Exponential"?

Because it grows the search range **exponentially**:
```
Index checked: 1 → 2 → 4 → 8 → 16 → 32 → ...
Range size:    1 → 2 → 4 → 8 → 16 → 32 → ... = 2^k
```

So in just **log₂(n)** steps, it reaches the end of any array of size `n`.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/exponential-search/python/) | [Java](/search/array-based-search/exponential-search/java/) | [JavaScript](/search/array-based-search/exponential-search/javascript/) | [C++](/search/array-based-search/exponential-search/cpp/) | [C#](/search/array-based-search/exponential-search/csharp/)