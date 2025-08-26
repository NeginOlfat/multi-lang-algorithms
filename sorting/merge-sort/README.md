Read this in other languages: [فارسی](/sorting/merge-sort/README.fa.md)

# 🔵 Merge Sort Algorithm

A **divide-and-conquer** sorting algorithm that works by:
1. **Dividing** the array into two halves
2. **Recursively sorting** each half
3. **Merging** the two sorted halves into one

This creates a reliable, predictable, and efficient sort — ideal for teaching and production use.

## 📈 Time Complexity

| Case      | Time         |
|:---------:|:------------:|
| Best      | O(n log n)   |
| Average   | O(n log n)   |
| Worst     | O(n log n)   |

> 💡 Always splits the array in half → log n levels, each doing O(n) merge work.

## 💾 Space Complexity
- **O(n)** — requires auxiliary space for merging

## ✅ When to Use?
- You need **guaranteed O(n log n)** performance
- Sorting **large datasets**
- Building a **stable sort** (maintains order of equal elements)
- Teaching **recursion** and **divide-and-conquer**

## 🔄 How It Works

### 🧩 Pseudocode
```text
BEGIN MergeSort(array)
    IF length(array) ≤ 1
        RETURN array
    END IF

    mid ← length(array) / 2
    left ← array[0 : mid]
    right ← array[mid : end]

    leftSorted ← MergeSort(left)
    rightSorted ← MergeSort(right)

    RETURN Merge(leftSorted, rightSorted)
END

BEGIN Merge(left, right)
    result ← empty list

    WHILE left and right are not empty
        IF left[0] ≤ right[0]
            APPEND left[0] to result
            REMOVE first element from left
        ELSE
            APPEND right[0] to result
            REMOVE first element from right
        END IF
    END WHILE

    APPEND remaining elements of left to result
    APPEND remaining elements of right to result

    RETURN result
END
```


### 🔄 Step-by-Step Example

Let’s sort: `‭[38, 27, 43, 3, 9, 82, 10]‬`

####  Merge Sort: Full Process
```
Divide Phase (Top-Down):
──────────────────────────

                    [38, 27, 43, 3, 9, 82, 10]
                                   ↓
                    ┌──────────────┴──────────────┐
               [38, 27, 43, 3]            [9, 82, 10]
                    ↓                              ↓
            ┌───────┴───────┐             ┌────────┴────────┐
        [38, 27]        [43, 3]       [9, 82]            [10]
           ↓                 ↓            ↓                 ↓
      ┌────┴────┐       ┌────┴────┐   ┌────┴────┐       ┌────┴────┐
    [38]      [27]    [43]      [3] [9]      [82]    [10]

Merge Phase (Bottom-Up):
────────────────────────

    [27, 38]       [3, 43]         [9, 82]       [10]
       ↓              ↓               ↓             ↓
       └──────┬───────┘               └─────┬───────┘
              ↓                             ↓
    [3, 27, 38, 43]                 [9, 10, 82]
                 └─────────────┬──────────────┘
                               ↓
           [3, 9, 10, 27, 38, 43, 82]
```

✅ Final Result: `‭[3, 9, 10, 27, 38, 43, 82]‬`

> 💡 The merge process always picks the smaller front element.

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/merge-sort/python//merge_sort.py) | [Java](/sorting/merge-sort/java/MergeSort.java) | [JavaScript](/sorting/merge-sort/javascript/merge_sort.js) | [C++](/sorting/merge-sort/c++/merge_sort.cpp) | [C#](/sorting/merge-sort/csharp/MergeSort.cs)

