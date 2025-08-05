Read this in other languages: [فارسی](/sorting/counting-sort/README.fa.md)

# 🟢 Counting Sort Algorithm

A **non-comparison-based** sorting algorithm that works by counting the frequency of each distinct element, then reconstructing the sorted array from those counts.

It is **extremely fast** when the range of input values (k) is small relative to the number of elements (n), achieving **linear time complexity O(n + k)**.

## 📈 Time Complexity

| Case      | Time         |
|-----------|--------------|
| Best      | O(n + k)     |
| Average   | O(n + k)     |
| Worst     | O(n + k)     |

> ⏱️ Performance depends on the **range of values**, not just the number of elements.

## 💾 Space Complexity
- **O(k)** — where `k` is the range of input values (max - min + 1)

## ✅ When to Use?
- ✅ Sorting **integers** or integer-like data
- ✅ Small range of values (e.g., ages, test scores, pixel values)
- ✅ Need **linear time** performance
- ✅ Stability is required (Counting Sort is **stable**)

🚫 Not suitable for:
- Floating-point numbers
- Large value ranges (e.g., `1` to `10⁹`)
- Memory-constrained environments

## 🔄 How It Works

### 🧩 Pseudocode
```
BEGIN CountingSort(array, min, max)
    n ← length(array)
    range ← max - min + 1
    count ← array of zeros of size 'range'
    output ← array of size n

    // Step 1: Count frequency of each element
    FOR i ← 0 TO n - 1
        count[array[i] - min] ← count[array[i] - min] + 1
    END FOR

    // Step 2: Compute cumulative count
    FOR i ← 1 TO range - 1
        count[i] ← count[i] + count[i - 1]
    END FOR

    // Step 3: Build output array (right to left for stability)
    FOR i ← n - 1 DOWN TO 0
        output[count[array[i] - min] - 1] ← array[i]
        count[array[i] - min] ← count[array[i] - min] - 1
    END FOR

    RETURN output
END
```
> 🔍 Note: We subtract `min` to support arrays with negative numbers.

### 🔄 Step-by-Step Example

Let’s sort: `‭[4, 2, 2, 8, 3, 3, 1]‬`

- `n = 7` (number of elements)
- `min = 1`, `max = 8` → So range = `8 - 1 + 1 = 8`

We want to sort this in **ascending order** using **Counting Sort**, and we want it to be **stable** (equal elements keep their original order).


#### ✅ Step 1: Count Frequencies

We create a **count array** of size `range = 8` (for values from 1 to 8).  
Each index represents a value (adjusted by `min`), and stores how many times it appears.

> 🔢 Index in `count` = `value - min`

| Value | Index (`value - 1`) | Count |
|:-----:| :-----------------: |:-----:|
| 1     | 0                      | 1
| 2     | 1                      | 2
| 3     | 2                      | 2
| 4     | 3                      | 1
| 8     | 7                      | 1

So the `count` array becomes:
```
Index:     0   1   2   3   4   5   6   7
Value:     1   2   3   4   5   6   7   8
Count:     1   2   2   1   0   0   0   1
```
> 💡 The `count` array is indexed by `(value - min)`, not the value itself. This allows support for negative numbers.

This tells us:
- `1` appears once
- `2` appears twice
- `3` appears twice
- `4` appears once
- `8` appears once

---

#### ✅ Step 2: Compute Cumulative Count

Now convert the `count` array into a **cumulative count**, which tells us:  
> “The last occurrence of value `x` should go at index `count[x] - 1` in the output.”

We sum up counts as we go:

```
Original count: [1, 2, 2, 1, 0, 0, 0, 1]
Cumulative:
  index 0: 1
  index 1: 1 + 2 = 3
  index 2: 3 + 2 = 5
  index 3: 5 + 1 = 6
  index 4: 6 + 0 = 6
  index 5: 6 + 0 = 6
  index 6: 6 + 0 = 6
  index 7: 6 + 1 = 7
```

So cumulative `count` becomes:
```
Index:     0   1   2   3   4   5   6   7
Value:     1   2   3   4   5   6   7   8
Count:     1   3   5   6   6   6   6   7
```

This means:
- All values ≤ 1 go in first 1 position
- All values ≤ 2 go in first 3 positions
- All values ≤ 3 go in first 5 positions
- ...
- All values ≤ 8 go in first 7 positions

So the **last `3`** should be placed at **index 4** (because `count[2] = 5` → position `5 - 1 = 4`)

---

#### ✅ Step 3: Build Output Array (Stably)

We now iterate over the **original input array from right to left** to maintain **stability**.

We place each element in its correct final position using the cumulative count.

Initialize `output = [0, 0, 0, 0, 0, 0, 0]` (size 7)

We go **backwards** through input:  
`[4, 2, 2, 8, 3, 3, 1]` → process: `1, 3, 3, 8, 2, 2, 4`

---

#### 🔁 Process each element:

1. **Element = 1**
   - Index in count: `1 - min = 1 - 1 = 0`
   - Position = `count[0] - 1 = 1 - 1 = 0`
   - Place `1` at `output[0]`
   - Decrement `count[0]` → now `count[0] = 0`
   - `output = [1, 0, 0, 0, 0, 0, 0]`

2. **Element = 3** (second `3`)
   - Index: `3 - 1 = 2`
   - Position = `count[2] - 1 = 5 - 1 = 4`
   - Place `3` at `output[4]`
   - Decrement `count[2]` → `count[2] = 4`
   - `output = [1, 0, 0, 0, 3, 0, 0]`

3. **Element = 3** (first `3`)
   - Index: `3 - 1 = 2`
   - Position = `count[2] - 1 = 4 - 1 = 3`
   - Place `3` at `output[3]`
   - Decrement `count[2]` → `count[2] = 3`
   - `output = [1, 0, 0, 3, 3, 0, 0]`

4. **Element = 8**
   - Index: `8 - 1 = 7`
   - Position = `count[7] - 1 = 7 - 1 = 6`
   - Place `8` at `output[6]`
   - Decrement `count[7]` → `count[7] = 6`
   - `output = [1, 0, 0, 3, 3, 0, 8]`

5. **Element = 2** (second `2`)
   - Index: `2 - 1 = 1`
   - Position = `count[1] - 1 = 3 - 1 = 2`
   - Place `2` at `output[2]`
   - Decrement `count[1]` → `count[1] = 2`
   - `output = [1, 0, 2, 3, 3, 0, 8]`

6. **Element = 2** (first `2`)
   - Index: `2 - 1 = 1`
   - Position = `count[1] - 1 = 2 - 1 = 1`
   - Place `2` at `output[1]`
   - Decrement `count[1]` → `count[1] = 1`
   - `output = [1, 2, 2, 3, 3, 0, 8]`

7. **Element = 4**
   - Index: `4 - 1 = 3`
   - Position = `count[3] - 1 = 6 - 1 = 5`
   - Place `4` at `output[5]`
   - Decrement `count[3]` → `count[3] = 5`
   - `output = [1, 2, 2, 3, 3, 4, 8]`


---

#### 🔁 Output Evolution Table

| Step | Element | Output Position | Output Array |
|------|--------|------------------|--------------|
| 1 | 1 | 0 | `[1, _, _, _, _, _, _]` |
| 2 | 3 | 4 | `[1, _, _, _, 3, _, _]` |
| 3 | 3 | 3 | `[1, _, _, 3, 3, _, _]` |
| 4 | 8 | 6 | `[1, _, _, 3, 3, _, 8]` |
| 5 | 2 | 2 | `[1, _, 2, 3, 3, _, 8]` |
| 6 | 2 | 1 | `[1, 2, 2, 3, 3, _, 8]` |
| 7 | 4 | 5 | `[1, 2, 2, 3, 3, 4, 8]` |

---

✅ **Final Result:** `[1, 2, 2, 3, 3, 4, 8]`

✅ Sorted!  
✅ Stable: The two `2`s and two `3`s appear in the same relative order as in the input.

> 💡 **Final Notes**
> - Counting Sort is **not in-place** — it requires O(k) extra space.
> - It’s often used as a subroutine in **Radix Sort**.
> - Real-world use: sorting ages, grades, pixel values, or IDs.
---

### 🧠 Why Process from Right to Left?

- To maintain **stability**
- The cumulative count gives the **last possible position** for a value
- By going **right-to-left**, we place the **last occurrence** of a value first, then earlier ones before it
- This ensures equal elements stay in original order

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Count | Count how many times each value appears |
| 2️⃣ Cumulative | Determine final positions of values |
| 3️⃣ Build Output (backwards) | Place elements stably in correct positions |


<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/counting-sort/python/counting_sort.py) | [Java](/sorting/counting-sort/java/CountingSort.java) | [JavaScript](/sorting/counting-sort/javascript/counting-sort.js) | [C++](/sorting/counting-sort/C++/counting_sort.cpp) | [C#](/sorting/counting-sort/csharp/CountingSort.cs)