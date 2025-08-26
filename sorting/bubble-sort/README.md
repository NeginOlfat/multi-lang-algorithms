Read this in other languages: [فارسی](/sorting/bubble-sort/README.fa.md)

# 🔵 Bubble Sort Algorithm

A simple and intuitive sorting algorithm that works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they’re in the wrong order.

After each pass, the largest element “bubbles up” to its correct position.

## 📈 Time Complexity

| Case      | Time       |
|:---------:|:----------:|
| Best      | O(n)       |
| Average   | O(n²)      |
| Worst     | O(n²)      |

## 💾 Space Complexity
- **O(1)** — sorts in-place

## ✅ When to Use?
- Teaching sorting concepts
- Small datasets (< 10 elements)
- Nearly sorted arrays (with optimization)


## 🔄 How It Works
### 🧩 Pseudocode
```
BEGIN BubbleSort(array)
    n ← length(array)

    FOR i ← 0 TO n - 1
        swapped ← false

        // Compare adjacent elements
        FOR j ← 0 TO n - i - 2
            IF array[j] > array[j + 1] THEN
                SWAP array[j], array[j + 1]
                swapped ← true
            END IF
        END FOR

        // Early exit if no swaps → already sorted
        IF NOT swapped THEN
            BREAK
        END IF
    END FOR
END
```

> ⚠️ Note: The inner loop goes only up to `n - i - 1` because after each pass, the last `i` elements are already sorted.

### 🔄 Step-by-Step Example

Let's sort the array: `[5, 2, 8, 1]` using Bubble Sort.

Each pass compares adjacent pairs and swaps when needed.

#### 🔁 Pass 1:
- `[5, 2, 8, 1]` → Compare 5 & 2 → Swap → `[2, 5, 8, 1]`
- `[2, 5, 8, 1]` → Compare 5 & 8 → No swap → `[2, 5, 8, 1]`
- `[2, 5, 8, 1]` → Compare 8 & 1 → Swap → `[2, 5, 1, 8]`
- ✅ Largest element (`8`) is now in place

#### 🔁 Pass 2:
- `[2, 5, 1, 8]` → Compare 2 & 5 → No swap → `[2, 5, 1, 8]`
- `[2, 5, 1, 8]` → Compare 5 & 1 → Swap → `[2, 1, 5, 8]`
- ✅ Second largest (`5`) is now in place

#### 🔁 Pass 3:
- `[2, 1, 5, 8]` → Compare 2 & 1 → Swap → `[1, 2, 5, 8]`
- ✅ Array is now fully sorted!

✅ Final Result: `[1, 2, 5, 8]`


<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/bubble-sort/python/bubble_sort.py) | [Java](/sorting/bubble-sort/java/BubbleSort.java) | [JavaScript](/sorting/bubble-sort/javascript/bubble-sort.js) | [C++](/sorting/bubble-sort/c++/bubble_sort.cpp) | [C#](/sorting/bubble-sort/csharp/BubbleSort.cs)