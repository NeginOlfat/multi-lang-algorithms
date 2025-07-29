Read this in other languages: [فارسی](/sorting/quick-sort/README.fa.md)

# 🔴 Quick Sort Algorithm

A highly efficient **divide-and-conquer** sorting algorithm that works by selecting a "pivot" element and partitioning the array around it.

Smaller elements go to the left, larger ones to the right. This process is repeated recursively on both sides.

Quick Sort is the default sorting algorithm in many standard libraries due to its **average-case speed**.


## 📈 Time Complexity

| Case      | Time             |
|-----------|------------------|
| Best      | O(n log n)       |
| Average   | O(n log n)       |
| Worst     | O(n²)            |

> ⚠️ Worst case occurs when pivot is always the smallest/largest (e.g., already sorted arrays).  

> ✅ But randomized or median-of-three pivot selection avoids this in practice.

## 💾 Space Complexity
- **O(log n)** — due to recursion stack depth (in-place partitioning)

## ✅ When to Use?
- General-purpose sorting
- Performance matters
- Data is not already sorted or nearly sorted (without randomization)
- You need an in-place sort with good average performance

## 🔄 How It Works

### 🧩 Pseudocode

```text
BEGIN QuickSort(array, low, high)
    IF low < high THEN
        // Partition array and get pivot index
        pivotIndex ← Partition(array, low, high)

        // Recursively sort elements before and after partition
        QuickSort(array, low, pivotIndex - 1)
        QuickSort(array, pivotIndex + 1, high)
    END IF
END

BEGIN Partition(array, low, high)
    pivot ← array[high]  // Choose last element as pivot
    i ← low - 1          // Index of smaller element

    FOR j ← low TO high - 1
        IF array[j] ≤ pivot THEN
            i ← i + 1
            SWAP array[i], array[j]
        END IF
    END FOR

    SWAP array[i + 1], array[high]
    RETURN i + 1
END
```

> 💡 This uses the Lomuto partition scheme — simple and beginner-friendly. 

### 🔄 Step-by-Step Example

Let’s sort: ‭[10, 80, 30, 90, 40, 50, 70]‬

We'll use the last element as pivot .

#### 🔁 Initial Call: `QuickSort(arr, 0, 6)`
##### Step 1: Pivot = `70` (index 6)

Partition around 70:
- Move all ≤ 70 to the left
- Final array after partition: `‭[10, 30, 40, 50, 70, 90, 80]‬`
- Pivot now at index 4 → `pivotIndex = 4`

##### Step 2: Recurse:

- Left: `QuickSort(arr, 0, 3)` → `[10, 30, 40, 50]`
- Right: `QuickSort(arr, 5, 6)` → `[90, 80]`

This continues until fully sorted.

✅ Final Result: ‭[10, 30, 40, 50, 70, 80, 90]‬

> 💡 Quick Sort does most work before recursion (unlike Merge Sort). 

<br />

## ➡️ Next Steps
Choose your preferred language to view implementation:

[Python](/sorting/quick-sort/python/quick_sort.py) | [Java](/sorting/quick-sort/java/QuickSort.java) | [JavaScript](/sorting/quick-sort/javascript/quick-sort.js) | [C++](/sorting/quick-sort/c++/quick_sort.cpp) | [C#](/sorting/quick-sort/csharp/QuickSort.cs)