Read this in other languages: [فارسی](/sorting/heap-sort/README.fa.md)

# 🟤 Heap Sort Algorithm

A comparison-based sorting algorithm that uses a **binary heap** data structure to efficiently find and extract the maximum element.

Heap Sort works by:
1. Building a **max-heap** from the input array.
2. Repeatedly extracting the maximum (root) and placing it at the end.
3. Reducing heap size and restoring the heap property.

It’s **in-place**, **predictable**, and ideal when worst-case performance matters.

## 📈 Time Complexity

| Case      | Time       |
|:---------:|:----------:|
| Best      | O(n log n) |
| Average   | O(n log n) |
| Worst     | O(n log n) |

> ✅ Unlike Quick Sort, Heap Sort **always** runs in O(n log n) — no worst-case surprises.

## 💾 Space Complexity
- **O(1)** — sorts in-place (only uses constant extra memory)

## ✅ When to Use?
- When **worst-case performance** must be guaranteed
- In real-time or embedded systems
- When you need an in-place O(n log n) sort
- As a backup for Quick Sort (e.g., in Introsort)

## 🔄 How It Works

### 🧩 Pseudocode

```text
BEGIN HeapSort(array)
    n ← length(array)

    // Build a max-heap from the array
    FOR i ← n/2 - 1 DOWNTO 0
        Heapify(array, n, i)
    END FOR

    // Extract elements from heap one by one
    FOR i ← n - 1 DOWNTO 1
        SWAP array[0], array[i]  // Move root to end
        Heapify(array, i, 0)     // Restore heap on reduced heap
    END FOR
END

BEGIN Heapify(array, heapSize, rootIndex)
    largest ← rootIndex
    left ← 2 * rootIndex + 1
    right ← 2 * rootIndex + 2

    IF left < heapSize AND array[left] > array[largest] THEN
        largest ← left
    END IF

    IF right < heapSize AND array[right] > array[largest] THEN
        largest ← right
    END IF

    IF largest ≠ rootIndex THEN
        SWAP array[rootIndex], array[largest]
        Heapify(array, heapSize, largest)
    END IF
END
```

> 💡 `Heapify` ensures the subtree rooted at `rootIndex` satisfies the max-heap property. 

## 🔄 Step-by-Step Example

Let’s sort: `‭[12, 11, 13, 5, 6, 7]‬`

We'll use 0-based indexing.

In a binary heap:
- Parent of node `i` = `(i - 1) / 2`
- Left child of node `i` = `2 * i + 1`
- Right child of node `i` = `2 * i + 2`

### 🔁 Step 1: Build Max-Heap

We start from the last non-leaf node and apply `heapify` backwards.

- Array size = 6 → Last index = 5
- Last non-leaf node = `floor(6/2) - 1` = `2`

So we apply `heapify` starting at index `2`, then `1`, then `0`.

🔹 `i = 2` (value = 13)
```text
Index:     0   1   2   3   4   5
Array:   [12, 11, 13, 5, 6, 7]
               ↑
Left  = 2*2+1 = 5 → arr[5] = 7
Right = 2*2+2 = 6 → out of bounds
Compare: 13 > 7 → already max → no swap
```
✅ No change.

🔹 `i = 1` (value = 11)
```text
Array:   [12, 11, 13, 5, 6, 7]
             ↑
Left  = 2*1+1 = 3 → arr[3] = 5  
Right = 2*1+2 = 4 → arr[4] = 6
Max among 11, 5, 6 → 11 → no swap
```
✅ Still no change.

🔹 `i = 0` (value = 12)
```text
Array:   [12, 11, 13, 5, 6, 7]
          ↑
Left  = 1 → 11  
Right = 2 → 13
13 > 12 → swap 12 and 13
New array: [13, 11, 12, 5, 6, 7]
```
Now check if subtree at index 2 (value 12) is still a heap:
- Left child = 5 → index 5 → value 7
- 12 > 7 → OK

✅ Max-Heap built!
```
      13
     /  \
    11   12
   / \  /
  5   6 7
```

### 🔁 Step 2: Extract Max & Rebuild Heap (One by One)

Now that we have a max-heap, we repeatedly:
1. **Swap** the root (maximum) with the **last element of the heap**
2. **Reduce** the heap size by 1 (the last element is now in its final sorted position)
3. **Restore** the heap property by calling `heapify(0)`

The **sorted portion grows from right to left**, while the **heap shrinks from the left**.

Let’s go through each pass in detail.

#### ➡️ Pass 1: Extract 13 (Max)
```text
Initial heap: [13, 11, 12, 5, 6, 7]
Swap root (0) with last (5): → [7, 11, 12, 5, 6, 13]
heapify(0): Root=7, Left=11, Right=12 → Max=12 → Swap
→ [12, 11, 7, 5, 6, 13]
```
```
      12
     /  \
    11   7
   / \
  5   6
```
Sorted: `[ ..., 13]`

#### ➡️ Pass 2: Extract 12 (New Max)
```text
Current: [12, 11, 7, 5, 6, 13]
Swap root (0) with last (4): → [6, 11, 7, 5, 12, 13]
heapify(0): Root=6, Left=11, Right=7 → Max=11 → Swap
→ [11, 6, 7, 5, 12, 13]
```
```
      11
     /  \
    6    7
   /
  5
```
Sorted: `[ ..., 12, 13]`

#### ➡️ Pass 3: Extract 11
```text
Current: [11, 6, 7, 5, 12, 13]
Swap root (0) with last (3): → [5, 6, 7, 11, 12, 13]
heapify(0): Root=5, Left=6, Right=7 → Max=7 → Swap
→ [7, 6, 5, 11, 12, 13]
```
```
     7
    / \
   6   5
```
Sorted: `[ ..., 11, 12, 13]`

#### ➡️ Pass 4: Extract 7
```text
Current: [7, 6, 5, 11, 12, 13]
Swap root (0) with last (2): → [5, 6, 7, 11, 12, 13]
heapify(0): Root=5, Left=6 → 6 > 5 → Swap
→ [6, 5, 7, 11, 12, 13]
```
```
   6
  /
 5
```
Sorted: `[ ..., 7, 11, 12, 13]`

#### ➡️ Pass 5: Extract 6
```text
Current: [6, 5, 7, 11, 12, 13]
Swap root (0) with last (1): → [5, 6, 7, 11, 12, 13]
Heap size = 1 → Done!
```

🧠 Key Insight  
- Heap Sort uses the **end of the array** to store sorted elements — no extra memory.
- Each `heapify` call restores the max-heap property after extraction.
- The sorted portion grows **from right to left**.

> 🏁 Heap Sort turns an array into a sorted list by treating it as a binary tree, then repeatedly extracting the max — all in O(n log n) time and O(1) space.

✅ Final array: `‭[5, 6, 7, 11, 12, 13]‬`

## 💻Next Steps
Choose your preferred language to view implementation:

[Python](/sorting/heap-sort/python/heap_sort.py) | [Java](/sorting/heap-sort/java/HeapSort.java) | [JavaScript](/sorting/heap-sort/javascript/heap-sort.js) | [C++](/sorting/heap-sort/c++/heap_sort.cpp) | [C#](/sorting/heap-sort/csharp/HeapSort.cs)