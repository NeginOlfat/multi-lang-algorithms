Read this in other languages: [فارسی](/sorting/comb-sort/README.fa.md)

# 🔵 Comb Sort Algorithm

An **improved version of Bubble Sort** that eliminates "turtles" — small values near the end of the list — by using a **gap larger than 1** during comparisons. The gap shrinks over time until it becomes 1, at which point the algorithm behaves like Bubble Sort.

Comb Sort is simple to implement and performs significantly better than Bubble Sort in practice, especially on partially sorted or reverse-ordered data.

> 💡 Think of it as **Bubble Sort with a comb** — instead of comparing adjacent elements, it compares elements spaced apart, allowing distant small values to "bubble" forward quickly.

## 📈 Time Complexity

| Case      | Time         |
|-----------|--------------|
| Best      | O(n log n)   |
| Average   | O(n log n)   |
| Worst     | O(n²)        |

> ⏱️ Performance depends on the **shrink factor** (typically 1.3)

## 💾 Space Complexity
- **O(1)** — sorts in-place with only a few extra variables

## ✅ When to Use?
- ✅ Need a **simple, in-place** sorting algorithm
- ✅ Want something **faster than Bubble Sort** but simpler than Quick Sort
- ✅ Teaching sorting concepts (great for showing optimization)
- ✅ Data has "turtles" (small values near the end)

🚫 Not suitable for:
- Large datasets
- When guaranteed O(n log n) is required
- Stable sorting (Comb Sort is **not stable**)

## 🔄 How It Works

Instead of always comparing adjacent elements (gap = 1), Comb Sort starts with a large gap and reduces it over time.

The **gap** is reduced by a **shrink factor** (usually **1.3**) until it reaches 1.

This allows distant out-of-place elements to move quickly toward their correct positions.

### 🧩 Pseudocode

```
BEGIN CombSort(array)
    n ← length(array)
    gap ← n
    swapped ← TRUE

    WHILE gap > 1 OR swapped = TRUE
        // Shrink gap by shrink factor (1.3)
        gap ← FLOOR(gap / 1.3)
        IF gap < 1 THEN
            gap ← 1
        END IF

        swapped ← FALSE

        // Compare elements with current gap
        FOR i ← 0 TO n - 1 - gap
            IF array[i] > array[i + gap] THEN
                SWAP array[i], array[i + gap]
                swapped ← TRUE
            END IF
        END FOR
    END WHILE
END
```

> 🔍 Note: The optimal shrink factor is **1.3**, discovered through empirical testing.

---

### 🔄 Step-by-Step Example

Let’s sort: `‭[64, 34, 25, 12, 22, 11, 90]‬`

We’ll use **shrink factor = 1.3**

#### Pass 1: gap = 5 (floor(7 / 1.3) ≈ 5)

Compare elements 5 apart:
- (0,5): 64 vs 11 → swap → `[11, 34, 25, 12, 22, 64, 90]`
- (1,6): 34 vs 90 → no swap

#### Pass 2: gap = 3 (floor(5 / 1.3) ≈ 3)

Compare elements 3 apart:
- (0,3): 11 vs 12 → no swap
- (1,4): 34 vs 22 → swap → `[11, 22, 25, 12, 34, 64, 90]`
- (2,5): 25 vs 64 → no swap
- (3,6): 12 vs 90 → no swap

#### Pass 3: gap = 2 (floor(3 / 1.3) ≈ 2)

Compare elements 2 apart:
- (0,2): 11 vs 25 → no swap
- (1,3): 22 vs 12 → swap → `[11, 12, 25, 22, 34, 64, 90]`
- (2,4): 25 vs 34 → no swap
- (3,5): 22 vs 64 → no swap
- (4,6): 34 vs 90 → no swap

#### Pass 4: gap = 1 (floor(2 / 1.3) ≈ 1)

Now behaves like Bubble Sort:
- Full pass with swaps → `[11, 12, 22, 25, 34, 64, 90]`

✅ Final Result: `‭[11, 12, 22, 25, 34, 64, 90]‬`

> 💡 The large initial gap helped move `11` from the end to the front quickly — eliminating the "turtle" problem.

---

### 🧠 Why Comb Sort?

| Algorithm | Turtles? | Speed | Simplicity |
|---------|---------|-------|-----------|
| Bubble Sort | ❌ Yes (slow) | O(n²) | ✅ Very Simple |
| **Comb Sort** | ✅ No | O(n log n) avg | ✅ Simple |
| Quick Sort | ✅ No | O(n log n) avg | ❌ Complex |

- **Eliminates turtles**: Small values near the end move forward quickly.
- **Simple to implement**: Just modify Bubble Sort.
- **Better average performance**: Due to early large gaps.

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Start with large gap | Allow distant elements to move |
| 2️⃣ Reduce gap by 1.3 | Gradually refine order |
| 3️⃣ Use swapped flag | Detect when array is sorted |
| 4️⃣ Final pass with gap=1 | Clean up like Bubble Sort |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/comb-sort/python/comb_sort.py) | [Java](/sorting/comb-sort/java/CombSort.java) | [JavaScript](/sorting/comb-sort/javascript/comb-sort.js) | [C++](/sorting/comb-sort/C++/comb_sort.cpp) | [C#](/sorting/comb-sort/csharp/CombSort.cs)