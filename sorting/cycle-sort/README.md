Read this in other languages: [فارسی](/sorting/cycle-sort/README.fa.md)

# 🟡​ Cycle Sort Algorithm

A **comparison-based**, **in-place** sorting algorithm that minimizes the number of **writes to memory** by placing each element directly into its correct position in a series of **cycles**.

Unlike most sorting algorithms that focus on minimizing comparisons or time, **Cycle Sort is optimized for minimizing writes** — making it ideal for environments where **write operations are expensive**, such as **flash memory** or **EEPROM**.

> 💡 It does the **minimum number of memory writes** to sort an array.

## 📈 Time Complexity

| Case      | Time         |
|:---------:|:------------:|
| Best      | O(n)         |
| Average   | O(n)         |
| Worst     | O(n)         |

> ⏱️ Always scans the entire array once per cycle — no early termination.

## 💾 Space Complexity
- **O(1)** — sorts in-place with only a few extra variables

## ✅ When to Use?
- ✅ When **memory write operations are costly** (e.g., flash storage)
- ✅ Data is in random order but values are **within a known range**
- ✅ Need to minimize hardware wear (e.g., embedded systems)
- ✅ Array contains **distinct elements** (works with duplicates but less efficient)

🚫 Not suitable for:
- General-purpose sorting (slower than Quick/Heap/Merge)
- When stability is required (Cycle Sort is **not stable**)
- Frequent read-heavy environments (read count is high)

## 🔄 How It Works

Each element is either already in the correct position, or it **starts a cycle** where:
1. The current element is moved to its correct position.
2. The displaced element is then placed in its correct position.
3. This continues until we return to the starting point.

Each cycle requires only **one write per element moved**, and the **minimum total writes** among all sorting algorithms.

### 🧩 Pseudocode

```
BEGIN CycleSort(array)
    n ← length(array)

    FOR cycleStart ← 0 TO n - 2
        item ← array[cycleStart]
        pos ← cycleStart

        // Find correct position for item
        FOR i ← cycleStart + 1 TO n - 1
            IF array[i] < item THEN
                pos ← pos + 1
            END IF
        END FOR

        // If item is already in correct position, skip
        IF pos == cycleStart THEN
            CONTINUE
        END IF

        // Skip duplicates
        WHILE item == array[pos] DO
            pos ← pos + 1
        END WHILE

        // Place item at correct position
        SWAP item, array[pos]

        // Rotate through the rest of the cycle
        WHILE pos ≠ cycleStart DO
            // Find next position
            pos ← cycleStart
            FOR i ← cycleStart + 1 TO n - 1
                IF array[i] < item THEN
                    pos ← pos + 1
                END IF
            END FOR

            // Skip duplicates
            WHILE item == array[pos] DO
                pos ← pos + 1
            END WHILE

            // Swap item into place
            SWAP item, array[pos]
        END WHILE
    END FOR
END
```

> 🔍 Note: The algorithm finds where each element belongs by **counting how many elements are smaller**.

---

### 🔄 Step-by-Step Example

Let’s sort: `‭[3, 2, 1, 4]‬`

We’ll go through each position and complete cycles.

#### 🔁 Cycle 1: Start at index 0 (`item = 3`)

- How many elements < 3? → `1, 2` → count = 2 → correct position = `0 + 2 = 2`
- Swap `3` (index 0) with `1` (index 2) → `‭[1, 2, 3, 4]‬`
- Now `item = 1`, back to index 0 → check if it belongs here:
  - How many < 1? → 0 → correct position = 0 → done

✅ Cycle complete.

#### 🔁 Cycle 2: Start at index 1 (`item = 2`)

- Already in correct position? Yes → skip

#### 🔁 Cycle 3: Start at index 2 (`item = 3`)

- Already in correct position? Yes → skip

#### 🔁 Cycle 4: Start at index 3 (`item = 4`)

- Last element → no action

✅ Final Result: `‭[1, 2, 3, 4]‬`

> 💡 Only **2 writes** were made (one per moved element), which is the **theoretical minimum**.

---

### 🧠 Why Cycle Sort?

| Algorithm | Min Writes? |
|---------|-------------|
| Bubble Sort | ❌ No |
| Selection Sort | ❌ No |
| Insertion Sort | ❌ No |
| **Cycle Sort** | ✅ **Yes** |


- It’s the **only sorting algorithm** that guarantees **minimum write operations**.
- Each element is written **at most once** to its final position.
- Ideal for **write-limited storage**.

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Start at `cycleStart` | Begin new cycle |
| 2️⃣ Count smaller elements | Find correct position |
| 3️⃣ Skip duplicates | Handle repeated values |
| 4️⃣ Swap into place | Start the cycle |
| 5️⃣ Rotate until back to start | Complete the cycle |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/cycle-sort/python/cycle_sort.py) | [Java](/sorting/cycle-sort/java/CycleSort.java) | [JavaScript](/sorting/cycle-sort/javascript/cycle-sort.js) | [C++](/sorting/cycle-sort/C++/cycle_sort.cpp) | [C#](/sorting/cycle-sort/csharp/CycleSort.cs)