Read this in other languages: [فارسی](/sorting/shell-sort/README.fa.md)

# 🟠 Shell Sort Algorithm

An **in-place comparison-based** sorting algorithm that generalizes **[Insertion Sort](/sorting/insertion-sort/README.md)** by allowing the exchange of elements that are far apart. It starts by sorting elements that are distant (using a "gap"), then progressively reduces the gap until it becomes 1 — at which point the algorithm behaves like Insertion Sort.

Shell Sort is one of the oldest sorting algorithms (invented by Donald Shell in 1959) and remains useful in practice due to its **good average performance** and **low memory usage**.

## 📈 Time Complexity

| Case      | Time               |
|-----------|--------------------|
| Best      | O(n log n)         |
| Average   | O(n^1.3) approx    |
| Worst     | O(n²)              |

> ⏱️ Actual performance depends heavily on the **gap sequence** used.

| Gap Sequence       | Worst-Case Time     |
|--------------------|---------------------|
| Shell’s original   | O(n²)               |
| Knuth (1973)       | O(n^1.5)            |
| Sedgewick          | O(n^1.3)            |
| Pratt              | O(n log² n)         |

## 💾 Space Complexity
- **O(1)** — sorts in-place with only a few extra variables

## ✅ When to Use?
- ✅ Small to medium datasets (< 5,000 elements)
- ✅ Memory is limited (embedded systems)
- ✅ As a **subroutine** in hybrid algorithms
- ✅ When a simple, non-recursive, in-place sort is needed

🚫 Not suitable for:
- Large datasets (use Merge Sort, Quick Sort, or Heap Sort)
- When guaranteed O(n log n) is required
- Real-time systems (due to variable performance)

## 🔄 How It Works

### 🧩 Pseudocode

```
BEGIN ShellSort(array)
    n ← length(array)
    gap ← 1

    // Choose initial gap using Knuth sequence: 1, 4, 13, 40, ...
    WHILE gap < n / 3
        gap ← gap * 3 + 1
    END WHILE

    // Reduce gap until it becomes 0
    WHILE gap > 0
        // Perform gapped insertion sort
        FOR i ← gap TO n - 1
            temp ← array[i]
            j ← i

            // Shift elements by gap until correct position is found
            WHILE j >= gap AND array[j - gap] > temp
                array[j] ← array[j - gap]
                j ← j - gap
            END WHILE

            array[j] ← temp
        END FOR

        // Reduce gap (Knuth: h = (h - 1) / 3)
        gap ← (gap - 1) / 3
    END WHILE
END
```

> 🔍 Note: The **gap sequence** greatly affects performance. Knuth’s sequence (`1, 4, 13, 40, ...`) is commonly used.

### 🔄 Step-by-Step Example

Let’s sort: `‭[64, 34, 25, 12, 22, 11, 90]‬`

We’ll use **Knuth’s gap sequence**:  
Start with largest gap < `n/3` = 7/3 ≈ 2.33 → so we pick `gap = 4` → then `1`

#### Pass 1: gap = 4

We process elements starting from index 4:

- **i = 4 (value = 22)**: Compare with `arr[0] = 64` → 22 < 64 → swap →  
  → `[22, 34, 25, 12, 64, 11, 90]`

- **i = 5 (value = 11)**: Compare with `arr[1] = 34` → 11 < 34 → swap →  
  → `[22, 11, 25, 12, 64, 34, 90]`

- **i = 6 (value = 90)**: Compare with `arr[2] = 25` → 90 > 25 → no swap

✅ Array after gap=4: `‭[22, 11, 25, 12, 64, 34, 90]‬`

#### Pass 2: gap = 1

Now perform **Insertion Sort** on the entire array:

```
Start: [22, 11, 25, 12, 64, 34, 90]

i=1: 11 → insert before 22 → [11, 22, 25, 12, 64, 34, 90]
i=2: 25 → in place
i=3: 12 → insert between 11 and 22 → [11, 12, 22, 25, 64, 34, 90]
i=4: 64 → in place
i=5: 34 → insert between 25 and 64 → [11, 12, 22, 25, 34, 64, 90]
i=6: 90 → in place
```

✅ Final Result: `‭[11, 12, 22, 25, 34, 64, 90]‬`

> 💡 Shell Sort reduces the number of swaps by moving distant elements closer early.

### 🧠 Why Shell Sort Works

- **Insertion Sort** is efficient on **nearly sorted** arrays.
- By sorting with large gaps first, Shell Sort **partially sorts** the array.
- Each smaller gap further refines the order.
- Final gap=1 (Insertion Sort) runs very fast.

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Choose gap sequence | Start large, reduce over time |
| 2️⃣ Gapped insertion sort | Sort elements `gap` apart |
| 3️⃣ Reduce gap | Repeat until gap = 1 |
| 4️⃣ Final Insertion Sort | Clean up with gap=1 |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/shell-sort/python/shell_sort.py) | [Java](/sorting/shell-sort/java/ShellSort.java) | [JavaScript](/sorting/shell-sort/javascript/shell-sort.js) | [C++](/sorting/shell-sort/C++/shell_sort.cpp) | [C#](/sorting/shell-sort/csharp/ShellSort.cs)