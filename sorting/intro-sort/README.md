Read this in other languages: [فارسی](/sorting/intro-sort/README.fa.md)

# 🟣 Intro Sort Algorithm

A **hybrid**, **in-place**, **comparison-based** sorting algorithm that starts as **Quick Sort**, switches to **Heap Sort** when recursion depth becomes too deep, and uses **Insertion Sort** for small subarrays.

Invented by **David Musser** in 1997, **Intro Sort** (Introspective Sort) is designed to provide both **fast average performance** and **optimal worst-case guarantees**.

> 💡 It's the **default sorting algorithm** in:
> - ✅ **C++**'s `std::sort()`
> - ✅ **GCC** and **Clang** standard libraries
> - ✅ **.NET** for some array types

## 📈 Time Complexity

| Case      | Time         |
|-----------|--------------|
| Best      | O(n log n)   |
| Average   | O(n log n)   |
| Worst     | O(n log n)   |

> ⏱️ Unlike Quick Sort, **no O(n²) worst case** — guaranteed O(n log n)

## 💾 Space Complexity
- **O(log n)** — due to recursion stack (limited by max depth)

## ✅ When to Use?
- ✅ Need **fast and predictable** sorting
- ✅ Want **O(n log n)** worst-case performance
- ✅ Sorting **large datasets** with unknown distribution
- ✅ Building high-performance libraries

🚫 Not suitable for:
- Stable sorting (Intro Sort is **not stable**)
- Memory-constrained environments
- Teaching basic algorithms (too complex)

## 🔄 How It Works

Intro Sort is a **three-phase hybrid** that adapts based on input and recursion depth:

### 1. **Phase 1: Quick Sort (Fast Average Case)**
- Starts with **Quick Sort** using a good pivot (e.g., median-of-3)
- Fast on random data due to cache efficiency and low overhead
- Tracks recursion depth to detect worst-case behavior

### 2. **Phase 2: Switch to Heap Sort (Avoid Worst Case)**
- If recursion depth exceeds `2 × log₂(n)`, it **switches to Heap Sort**
- Prevents Quick Sort’s O(n²) worst case on sorted/nearly-sorted data
- Heap Sort guarantees O(n log n) from this point

### 3. **Phase 3: Insertion Sort (Optimize Small Arrays)**
- For subarrays of size ≤ 16 (typical threshold), uses **Insertion Sort**
- Extremely fast on small or nearly sorted arrays
- Reduces overhead of recursive calls

---

### 🔄 Step-by-Step Example

Let’s sort: `‭[64, 34, 25, 12, 22, 11, 90]‬`

#### Step 1: Start with Quick Sort
- Choose pivot (e.g., median-of-3: 34)
- Partition: `[25, 12, 22, 11]`, `34`, `[64, 90]`
- Recurse on left and right

#### Step 2: Recursion Depth Check
- Max allowed depth = `2 × log₂(7) ≈ 6`
- If depth exceeds this during recursion, switch to **Heap Sort**

> (In this small example, depth won’t trigger switch)

#### Step 3: Small Subarray Optimization
- When subarray size ≤ 16, stop recursion
- Apply **Insertion Sort** to small chunks

#### Final Result:
```
[11, 12, 22, 25, 34, 64, 90]
```

✅ Sorted with **O(n log n)** guarantee  
✅ No worst-case O(n²) like Quick Sort

---

### 🧠 Why Intro Sort?

| Algorithm | Avg Speed | Worst Case | Stable? | Used In |
|---------|----------|-----------|--------|--------|
| Quick Sort | ⭐ Fast | ❌ O(n²) | ❌ No | C, Go |
| Merge Sort | Good | ✅ O(n log n) | ✅ Yes | Java, Python |
| Heap Sort | Slow | ✅ O(n log n) | ❌ No | — |
| **Intro Sort** | ⭐ Fast | ✅ O(n log n) | ❌ No | **C++ std::sort** |

<br/>

- ✅ **Fast average performance** (like Quick Sort)
- ✅ **Guaranteed O(n log n)** (like Heap Sort)
- ✅ **Optimized for small arrays** (Insertion Sort)
- ✅ **In-place** and cache-friendly

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Quick Sort | Fast partitioning on average |
| 2️⃣ Depth Check | Detect worst-case recursion |
| 3️⃣ Switch to Heap Sort | Guarantee O(n log n) |
| 4️⃣ Insertion Sort | Optimize small subarrays |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/intro-sort/python/intro_sort.py) | [Java](/sorting/intro-sort/java/IntroSort.java) | [JavaScript](/sorting/intro-sort/javascript/intro-sort.js) | [C++](/sorting/intro-sort/C++/intro_sort.cpp) | [C#](/sorting/intro-sort/csharp/IntroSort.cs)