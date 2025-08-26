Read this in other languages: [فارسی](/sorting/tim-sort/README.fa.md)

# 🟢 Tim Sort Algorithm

A **hybrid**, **stable**, **adaptive** sorting algorithm derived from **Merge Sort** and **Insertion Sort**, designed to perform exceptionally well on real-world data.

Invented by **Tim Peters** in 2002 for the **Python programming language**, Tim Sort is now used in:
- ✅ Python’s `sorted()` and `list.sort()`
- ✅ Java’s `Arrays.sort()` for objects
- ✅ Android SDK
- ✅ V8 (JavaScript engine)

> 💡 Tim Sort is **not just fast** — it’s **intelligent**: it adapts to existing order in the data, making it extremely efficient on **partially sorted**, **reverse-ordered**, or **real-world datasets**.

## 📈 Time Complexity

| Case      | Time         |
|:---------:|:------------:|
| Best      | O(n)         |
| Average   | O(n log n)   |
| Worst     | O(n log n)   |

> ⏱️ Best case: when data is already sorted or reverse-sorted  
> ⏱️ Worst case: still O(n log n) — better than Quick Sort

## 💾 Space Complexity
- **O(n)** — requires auxiliary space for merging

## ✅ When to Use?
- ✅ Sorting **real-world data** with some natural order (e.g., logs, user input)
- ✅ Need **stable sorting** (preserves relative order of equal elements)
- ✅ Sorting **objects** or complex data
- ✅ You want the **performance of a library-grade sort**

🚫 Not suitable for:
- Memory-constrained environments (due to O(n) space)
- Embedded systems
- Teaching basic sorting (too complex for beginners)

## 🔄 How It Works

Tim Sort combines the best of **Insertion Sort** (fast on small arrays) and **Merge Sort** (stable, O(n log n)), with smart optimizations:

### 1. **Divide into Runs**
- Scans the array and identifies **monotonic runs** (increasing or strictly decreasing sequences).
- Reverses decreasing runs to make them increasing.
- If a run is too short, extends it using **Insertion Sort** to a minimum length (`minrun`).

### 2. **Choose `minrun`**
- A small size (32–64) chosen based on array size to balance merge efficiency.
- Ensures the number of runs is close to a power of 2 for optimal merging.

### 3. **Push Runs to Stack**
- Maintains a stack of runs that satisfy two invariants to control merging:
  - `run[-3] > run[-2] + run[-1]`
  - `run[-2] > run[-1]`
- These prevent unbalanced merges and ensure O(n log n) performance.

### 4. **Merge Runs When Invariants Break**
- Merges runs from the stack when the above conditions are violated.
- Uses **galloping mode** during merge to skip elements quickly when one run is consistently smaller.

### 5. **Final Merge**
- After all elements are processed, merges all remaining runs into a single sorted array.

---

### 🔄 Step-by-Step Example

Let’s sort:  
`‭[10, 9, 8, 7, 15, 16, 17, 3, 2, 1, 12, 13, 14, 18, 19, 20]‬`

This array has:
- A decreasing run: `[10, 9, 8, 7]`
- An increasing run: `[15, 16, 17]`
- Another decreasing run: `[3, 2, 1]`
- A long increasing run: `[12, 13, 14, 18, 19, 20]`

This is **perfect for Tim Sort** — it can exploit all the existing order.

---

#### 🔢 Step 1: Calculate `minrun`

For `n = 16`, Tim Sort computes `minrun` as follows:
1. Take the top 5 bits of `n` (16 = `10000` in binary)
2. Add 1 if any of the remaining bits are set
3. Result: `minrun = 16` → but that’s too big!

In practice, `minrun` is **clamped between 32 and 64** for larger arrays.  
But for this small array, we’ll use a simplified rule:  
> **`minrun = max(2, min(n/4, 32))`** → `minrun = 4`

✅ So each run should be **at least 4 elements long**.

---

#### 🔎 Step 2: Find and Process Runs

We scan left to right, identifying **monotonic runs**.

##### 🔹 Run 1: `[10, 9, 8, 7]` → decreasing
- Detected as strictly decreasing.
- Reverse it → `[7, 8, 9, 10]`
- Length = 4 ≥ `minrun` → push to stack  
  ✅ Stack: `[ [7,8,9,10] ]`

##### 🔹 Run 2: `[15, 16, 17]` → increasing, but length = 3 < `minrun`
- Extend using **Insertion Sort** with next elements: `3`
- Now `[15,16,17,3]` use **Insertion Sort** to →`[3,15,16,17]`
- length = 4 ≥ `minrun` → push to stack 
✅ Stack: `[ [7,8,9,10], [3,15,16,17] ]`

##### 🔹 Run 3: `[2, 1]` → decreasing, length = 2 < `minrun`
- Reverse → `[1, 2]`
- Extend with next: `[12]` → still short
- Add `[13]` → now `[1,2,12,13]` (length 4)
- Already sorted → push  
  Stack: `[ [7,8,9,10], [3,15,16,17], [1,2,12,13] ]`

##### 🔹 Run 4: `[14, 18, 19, 20]` → increasing, length = 4 ≥ `minrun`
- Push as-is  
  Stack: `[ [7,8,9,10], [3,15,16,17], [1,2,12,13], [14,18,19,20] ]`

---

#### 🔄 Step 3: Merge Runs Using Stack Invariants

Tim Sort maintains a stack of runs and enforces **two invariants** to avoid unbalanced merges:
1. `run[i-3] > run[i-2] + run[i-1]`  
2. `run[i-2] > run[i-1]`

If violated, merge the two smallest runs.

Let’s apply this:

##### 🔹 Check Invariants
Stack sizes: `[4, 4, 4, 4]`

Check from top:
- `run[-2] > run[-1]` → `4 > 4` ❌ False → **Merge!**

Merge top two runs: `[1,2,12,13]` and `[14,18,19,20]`  
→ Both increasing → simple merge → `[1,2,12,13,14,18,19,20]`

New stack: `[ [7,8,9,10], [3,15,16,17], [1,2,12,13,14,18,19,20] ]`  
Sizes: `[4, 4, 8]`

Check again:
- `run[-2] > run[-1]` → `4 > 8` ❌ False → **Merge!**

Merge `[3,15,16,17]` and `[1,2,12,13,14,18,19,20]`  
→ Use **galloping mode**:  
- Compare `3` vs `1` → `1` smaller → add `1`  
- Compare `3` vs `2` → `2` smaller → add `2`  
- Now `3 < 12` → add `3`  
- Then add all of `[15,16,17]` at once (galloping!)  
- Then add rest of second run

Result: `[1,2,3,12,13,14,15,16,17,18,19,20]`

New stack: `[ [7,8,9,10], [1,2,3,12,13,14,15,16,17,18,19,20] ]`  
Sizes: `[4, 12]`

Check:
- `4 > 12` ❌ False → **Merge!**

Final merge: `[7,8,9,10]` + `[1,2,3,12,...]`  
→ Gallop: `7 > 3` → skip to `12` → insert `7,8,9,10` before `12`  
→ Result: `[1,2,3,7,8,9,10,12,13,14,15,16,17,18,19,20]`

✅ Final Sorted Array: `‭[1, 2, 3, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]‬`

> 💡 Tim Sort **exploits existing order** — no unnecessary comparisons.

---

### 🧠 Why Tim Sort?

| Algorithm | Stable? | Adaptive? | Real-World Perf | Used In |
|---------|--------|----------|-----------------|--------|
| Quick Sort | ❌ No | ✅ Yes | Fast | C, Go |
| Merge Sort | ✅ Yes | ❌ No | Predictable | Libraries |
| **Tim Sort** | ✅ Yes | ✅ Yes | ⭐ **Best** | **Python, Java** |

<br/>

- ✅ **Stable**: preserves order of equal elements
- ✅ **Adaptive**: faster on partially sorted data
- ✅ **Optimized for real data**: handles "natural runs"
- ✅ **Guaranteed O(n log n)**: no worst-case O(n²) like Quick Sort

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Find runs | Detect existing order |
| 2️⃣ Extend short runs | Use Insertion Sort to reach `minrun` |
| 3️⃣ Merge with stack invariants | Prevent unbalanced merges |
| 4️⃣ Galloping merge | Skip elements during merge |
| 5️⃣ Final merge | Produce sorted output |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/tim-sort/python/tim_sort.py) | [Java](/sorting/tim-sort/java/TimSort.java) | [JavaScript](/sorting/tim-sort/javascript/tim-sort.js) | [C++](/sorting/tim-sort/C++/tim_sort.cpp) | [C#](/sorting/tim-sort/csharp/TimSort.cs)
