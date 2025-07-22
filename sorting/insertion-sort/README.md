Read this in other languages: [فارسی](/sorting/insertion-sort/README.fa.md)

# 🟢 Insertion Sort Algorithm

A simple and intuitive comparison-based sorting algorithm that builds the final sorted array one element at a time.

It works similarly to how you sort playing cards in your hand:
- Start with one card (sorted)
- Pick the next card and insert it into the correct position in the sorted part

This makes it efficient for **small or nearly sorted datasets**.

## 📈 Time Complexity

| Case      | Time       |
|-----------|------------|
| Best      | O(n)       |
| Average   | O(n²)      |
| Worst     | O(n²)      |

> 💡 Best case occurs when the array is already sorted — only one comparison per element.

## 💾 Space Complexity
- **O(1)** — sorts in-place

## ✅ When to Use?
- Small datasets (< 50 elements)
- Nearly sorted data (e.g., incremental updates)
- As a final step in hybrid algorithms like **Timsort** or **Introsort**
- Teaching basic sorting concepts

## 🔄 How It Works

### 🧩 Pseudocode
```text
BEGIN InsertionSort(array)
    n ← length(array)

    FOR i ← 1 TO n - 1
        key ← array[i]
        j ← i - 1

        // Move elements greater than key one position ahead
        WHILE j ≥ 0 AND array[j] > key
            array[j + 1] ← array[j]
            j ← j - 1
        END WHILE

        // Insert key at its correct position
        array[j + 1] ← key
    END FOR
END
```

> 🔍 Note: The left side (`0` to `i-1`) is always sorted during each iteration.

### 🔄 Step-by-Step Example

Let’s sort: `[12, 11, 13, 5, 6]`

#### 🔁 Pass 1: i=1 → key = 11
- Compare 12 > 11 → Shift 12 → Insert 11  
→ `[11, 12, 13, 5, 6]`

#### 🔁 Pass 2: i=2 → key = 13
- 13 > 12 → Already in place  
→ `[11, 12, 13, 5, 6]`

#### 🔁 Pass 3: i=3 → key = 5
- Shift 13, 12, 11 → Insert 5 at start  
→ `[5, 11, 12, 13, 6]`

#### 🔁 Pass 4: i=4 → key = 6
- Shift 13, 12, 11 → Insert 6 after 5  
→ `[5, 6, 11, 12, 13]`

✅ Final Result: `[5, 6, 11, 12, 13]`

> 💡 Only comparisons and shifts — no full swaps needed!

<br />

## ➡️ Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/insertion-sort/python/insertion_sort.py) | [Java](/sorting/insertion-sort/java/InsertionSort.java) | [JavaScript](/sorting/insertion-sort/javascript/insertion_sort.js) | [C++](/sorting/insertion-sort/c++/insertion_sort.cpp) | [C#](/sorting/insertion-sort/csharp/InsertionSort.cs)
