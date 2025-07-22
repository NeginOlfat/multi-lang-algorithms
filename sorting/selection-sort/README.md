Read this in other languages: [فارسی](/sorting/selection-sort/README.fa.md)
# 🟡 Selection Sort Algorithm

A simple comparison-based sorting algorithm that divides the array into two parts:
- **Sorted section** (left)
- **Unsorted section** (right)

It repeatedly selects the **smallest element** from the unsorted portion and swaps it into the sorted section.

Unlike Bubble Sort, it makes at most `n-1` swaps — making it useful when memory writes are expensive.

## 📈 Time Complexity

| Case      | Time       |
|-----------|------------|
| Best      | O(n²)      |
| Average   | O(n²)      |
| Worst     | O(n²)      |

> ⏱️ Always scans the entire unsorted part — no early exit possible.

## 💾 Space Complexity
- **O(1)** — sorts in-place

## ✅ When to Use?
- Teaching sorting concepts
- When minimizing data movement is important (fewer swaps than Bubble Sort)
- Small datasets (< 20 elements)

## 🔄 How It Works

### 🧩 Pseudocode
```text
BEGIN SelectionSort(array)
    n ← length(array)

    FOR i ← 0 TO n - 2
        minIndex ← i

        FOR j ← i + 1 TO n - 1
            IF array[j] < array[minIndex] THEN
                minIndex ← j
            END IF
        END FOR

        IF minIndex ≠ i THEN
            SWAP array[i], array[minIndex]
        END IF
    END FOR
END
```
> 🔍 Note: After each iteration, the first `i+1` elements are sorted.

### 🔄 Step-by-Step Example

Let’s sort: `[64, 25, 12, 22, 11]`

#### 🔁 Pass 1: Find min in [64, 25, 12, 22, 11]
- Min = `11` at index 4 → Swap with index 0  
→ `[11, 25, 12, 22, 64]`

#### 🔁 Pass 2: Find min in [25, 12, 22, 64]
- Min = `12` at index 2 → Swap with index 1  
→ `[11, 12, 25, 22, 64]`

#### 🔁 Pass 3: Find min in [25, 22, 64]
- Min = `22` at index 3 → Swap with index 2  
→ `[11, 12, 22, 25, 64]`

#### 🔁 Pass 4: Find min in [25, 64]
- Min = `25` → Already in place → No swap  
→ `[11, 12, 22, 25, 64]`

✅ Final Result: `[11, 12, 22, 25, 64]`

> 💡 Only **4 swaps** were made for 5 elements — much better than Bubble Sort!

<br />

## ➡️ Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/selection-sort/python/selection_sort.py) | [Java](/sorting/selection-sort/java/SelectionSort.java) | [JavaScript](/sorting/selection-sort/javascript/selection-sort.js) | [C++](/sorting/selection-sort/c++/selection_sort.cpp) | [C#](/sorting/selection-sort/csharp/SelectionSort.cs)