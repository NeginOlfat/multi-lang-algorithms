Read this in other languages: [فارسی](/search/array-based-search/interpolation-search/README.fa.md)

# 🔍 Interpolation Search – Smart Searching for Uniform Data

**Interpolation Search** is an improved variant of **Binary Search** that works efficiently on **sorted arrays with uniformly distributed values**. Instead of always dividing the search space in half, it **estimates the position** of the target value using a mathematical formula — much like how you'd quickly flip to the "S" section in a phone book when looking for "Smith".

This makes it **faster than Binary Search** in ideal conditions — especially for large, evenly spaced datasets.



## 📚 How It Works

Instead of blindly going to the middle (like Binary Search), Interpolation Search uses a **position formula** to predict where the target is most likely located:

### 🔢 Position Formula
```text
pos = low + [(target - arr[low]) × (high - low) / (arr[high] - arr[low])]
```

Where:
- `low` = starting index of current range
- `high` = ending index
- `arr[low]`, `arr[high]` = values at those indices

### ✅ Steps:
1. Start with `low = 0`, `high = n - 1`
2. Use the formula to calculate estimated position `pos`
3. If `arr[pos] == target` → return `pos`
4. If `arr[pos] < target` → search **right subarray** (`low = pos + 1`)
5. If `arr[pos] > target` → search **left subarray** (`high = pos - 1`)
6. Repeat until found or `low ≤ high`

> ✅ **Requirement**: Array must be **sorted**
>
> 💡 Best when data is **uniformly distributed** (e.g., 10, 20, 30, 40...)


### 🧩 Example

```text
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90]
Target: 70

Step 1:
  low = 0 → 10
  high = 8 → 90
  pos = 0 + [(70–10)*(8–0)/(90–10)] = 0 + [60×8/80] = 6

Check arr[6] = 70 → Found!

Index: 6
```

Compare this to Binary Search, which would take **3 steps** to reach index 6 — Interpolation Search finds it in **1 step**!


## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is guessed correctly on first try |
| **Average Case** | O(log log n) | On uniformly distributed data — **much faster than O(log n)** |
| **Worst Case** | O(n) | When data is not uniform (e.g., exponential growth) |
| **Space Complexity** | O(1) | Iterative version uses constant space |

> 📊 So:  
> `O(log log n)` << `O(log n)` << `O(n)`

💡 This means for large sorted arrays with uniform data (like database IDs, timestamps), Interpolation Search can be **significantly faster** than Binary Search.



##  Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| Faster than Binary Search on uniform data (`O(log log n)` vs `O(log n)`) | Degrades to O(n) on non-uniform data |
| Intelligent probing — fewer comparisons | Requires sorted input |
| Great for large datasets | Sensitive to distribution skew |
| Real-world inspired (like human intuition) | Division-by-zero risk if `arr[high] == arr[low]` |

> ⚠️ Avoid if:
> - Data is clustered or skewed
> - Many duplicate values
> - Not truly sorted or uniformly spaced

## 🌐 When to Use

- ✅ Searching in **large sorted arrays** with **uniformly distributed** data
- ✅ Database indexing systems
- ✅ Scientific computing (regular intervals)
- ✅ Performance-critical applications where average-case speed matters
- ✅ Educational purposes — shows how math improves algorithms

> 🚫 Not recommended for small arrays or unpredictable distributions.


## 🔁 Comparison with Binary Search

| Feature | Binary Search | Interpolation Search |
|--------|---------------|------------------------|
| Search Strategy | Always middle | Estimates position |
| Avg. Time | O(log n) | O(log log n) ✅ Better |
| Worst Time | O(log n) | O(n) ❌ Worse |
| Best For | Any sorted data | Uniformly distributed data |
| Simplicity | High | Medium (formula involved) |

> Think of it as **Binary Search’s smarter cousin** — brilliant under the right conditions, but less reliable otherwise.


## 💡 Real-World Analogy

Imagine searching for "Page 700" in a 1000-page book:
- **Binary Search**: Open at page 500 → too low → go to 750 → too high → go to 625... (several steps)
- **Interpolation Search**: “700 out of 1000” → jump directly to ~page 700 → found quickly!

It uses proportionality, just like humans do.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/interpolation-search/python/) | [Java](/search/array-based-search/interpolation-search/java/) | [JavaScript](/search/array-based-search/interpolation-search/javascript/) | [C++](/search/array-based-search/interpolation-search/cpp/) | [C#](/search/array-based-search/interpolation-search/csharp/)

