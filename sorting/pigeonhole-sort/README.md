Read this in other languages: [فارسی](/sorting/pigeonhole-sort/README.fa.md)

# 🕊️ Pigeonhole Sort Algorithm

A **non-comparison-based**, **stable** sorting algorithm that works by placing each element into its own "pigeonhole" (a slot corresponding to its value) and then iterating through the holes in order to reconstruct the sorted array.

Pigeonhole Sort is very similar to **Counting Sort**, but instead of storing counts, it stores the **actual elements** in each hole. This makes it **stable** and ideal when you need to preserve the original order of equal elements.

> 💡 Think of it as:  
> - **Counting Sort**: "How many of each value?"  
> - **Pigeonhole Sort**: "Where does each element go?"

## 📈 Time Complexity

| Case      | Time         |
|:---------:|:------------:|
| Best      | O(n + k)     |
| Average   | O(n + k)     |
| Worst     | O(n + k)     |

> ⏱️ Where `n` = number of elements, `k` = range of input values (max - min + 1)

## 💾 Space Complexity
- **O(n + k)** — for storing `k` pigeonholes and `n` elements

## ✅ When to Use?
- ✅ Sorting **integers** or integer-like data
- ✅ The **range of values (k)** is **small and close to n**
- ✅ Need **linear time** performance
- ✅ Stability is required (Pigeonhole Sort is **stable**)

🚫 Not suitable for:
- Floating-point numbers
- Large value ranges (e.g., `1` to `10⁹`)
- Memory-constrained environments

## 🔄 How It Works

### 🧩 Pseudocode

```
BEGIN PigeonholeSort(array, min, max)
    n ← length(array)
    range ← max - min + 1
    pigeonholes ← array of 'range' empty lists

    // Step 1: Place each element in its pigeonhole
    FOR i ← 0 TO n - 1
        index ← array[i] - min
        APPEND array[i] TO pigeonholes[index]
    END FOR

    // Step 2: Reconstruct sorted array from left to right
    output ← empty list
    FOR i ← 0 TO range - 1
        FOR EACH element IN pigeonholes[i]
            APPEND element TO output
        END FOR
    END FOR

    RETURN output
END
```

> 🔍 Note: We subtract `min` to support arrays with negative numbers.

---

### 🔄 Step-by-Step Example

Let’s sort: `‭[8, 3, 5, 3, 1, 7]‬`

- `n = 6` (number of elements)
- `min = 1`, `max = 8` → `range = 8 - 1 + 1 = 8`

We want to sort this in **ascending order** using **Pigeonhole Sort**, and we want it to be **stable**.

#### ✅ Step 1: Create Pigeonholes

We create **8 empty pigeonholes** (for values 1 to 8).  
Each hole at index `value - min` will store all occurrences of that value.

| Value | Index (`value - 1`) | Pigeonhole Contents |
|:-----:| :-----------------: |:-------------------:|
| 1     | 0                   | [1]                 |
| 3     | 2                   | [3, 3]              |
| 5     | 4                   | [5]                 |
| 7     | 6                   | [7]                 |
| 8     | 7                   | [8]                 |

All other holes (indices 1, 3, 5) remain empty.

So the `pigeonholes` array becomes:
```
Index:     0     1     2     3     4     5     6    7
Value:     1     2     3     4     5     6     7    8
Hole:     [1]   []   [3,3]  []    [5]   []    [7]  [8]
```

> 💡 Each element is placed directly into its correct hole — no comparisons needed.

---

#### ✅ Step 2: Reconstruct Sorted Array

We iterate through the pigeonholes **from left to right** and append all elements in order:

```
Hole 0: [1]        → output = [1]
Hole 1: []         → no change
Hole 2: [3, 3]     → output = [1, 3, 3]
Hole 3: []         → no change
Hole 4: [5]        → output = [1, 3, 3, 5]
Hole 5: []         → no change
Hole 6: [7]        → output = [1, 3, 3, 5, 7]
Hole 7: [8]        → output = [1, 3, 3, 5, 7, 8]
```

#### ✅ Final Result: `[1, 3, 3, 5, 7, 8]`

✅ Sorted!  
✅ Stable: The two `3`s appear in the same relative order as in the input.

> 💡 **Final Notes**
> - Pigeonhole Sort is **not in-place** — it requires O(n + k) extra space.
> - It’s **stable** because we append elements in input order.
> - Best used when `k ≈ n` — if `k >> n`, use **Counting Sort** or **Radix Sort**.
> - Real-world use: sorting exam scores, ages, or IDs with small range.

---

### 🧠 Why Use Pigeonhole Instead of Counting Sort?

| Feature | Counting Sort | Pigeonhole Sort |
|--------|---------------|-----------------|
| Stores | Counts only | Actual elements |
| Stable? | Only if done right | ✅ Yes (by design) |
| Space | O(k) | O(n + k) |
| Use Case | Just counts or reconstructs | Need original elements in order |

<br/>

> 💡 **Pigeonhole Sort is essentially Counting Sort that stores elements instead of counts.**

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Create holes | One for each possible value |
| 2️⃣ Distribute | Place each element in its hole |
| 3️⃣ Reconstruct | Traverse holes left to right, append all |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/pigeonhole-sort/python/pigeonhole_sort.py) | [Java](/sorting/pigeonhole-sort/java/PigeonholeSort.java) | [JavaScript](/sorting/pigeonhole-sort/javascript/pigeonhole-sort.js) | [C++](/sorting/pigeonhole-sort/C++/pigeonhole_sort.cpp) | [C#](/sorting/pigeonhole-sort/csharp/PigeonholeSort.cs)