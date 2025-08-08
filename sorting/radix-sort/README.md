Read this in other languages: [فارسی](/sorting/radix-sort/README.fa.md)

# 🔴​ Radix Sort Algorithm

A **non-comparison-based** sorting algorithm that sorts integers (or fixed-length strings) by processing digits from **least significant digit (LSD)** to **most significant digit (MSD)** using a stable subroutine — typically **Counting Sort**.

Radix Sort leverages the idea that numbers can be sorted digit by digit, achieving **linear time complexity O(d × n)** when the number of digits `d` is small.

## 📈 Time Complexity

| Case      | Time         |
|-----------|--------------|
| Best      | O(d × n)     |
| Average   | O(d × n)     |
| Worst     | O(d × n)     |

> ⏱️ Where `d` = number of digits, `n` = number of elements  
> ⏱️ Beating comparison-based limits (Ω(n log n)) — but only for specific data types.

## 💾 Space Complexity
- **O(n + k)** — where `k` is the base (e.g., 10 for decimal digits)

## ✅ When to Use?
- ✅ Sorting **integers**, **phone numbers**, **IDs**, or **fixed-length strings**
- ✅ Need **linear time** performance
- ✅ Data has a **fixed number of digits** or can be padded
- ✅ Stability is required (if using stable subroutine)

🚫 Not suitable for:
- Floating-point numbers (without special encoding)
- Variable-length strings (without padding)
- Arbitrary objects

## 🔄 How It Works

### 🧩 Pseudocode

```
BEGIN RadixSort(array)
    if array is empty or has one element: RETURN array

    max ← find maximum element in array
    d ← number of digits in max

    FOR i ← 0 TO d - 1
        // Sort by i-th digit using a stable sort (e.g., Counting Sort)
        array ← CountingSortByDigit(array, i)
    END FOR

    RETURN array
END

// Helper: Extract i-th digit (from right, 0-indexed)
FUNCTION getDigit(num, i)
    RETURN (num / (10^i)) % 10
END
```

> 🔍 Note: Uses **Counting Sort** as a subroutine for each digit — ensures stability.

### 🔄 Step-by-Step Example

Let’s sort: `‭[170, 45, 75, 90, 2, 802, 24, 66]‬`

We'll sort digit by digit from **right to left** (LSD Radix Sort).

#### Pass 1: Sort by 1s place (10⁰)

| Number | 1s Digit |
|--------|----------|
| 170    | 0        |
| 45     | 5        |
| 75     | 5        |
| 90     | 0        |
| 2      | 2        |
| 802    | 2        |
| 24     | 4        |
| 66     | 6        |

After stable sort by 1s digit:
```
[170, 90, 2, 802, 24, 45, 75, 66]
```

#### Pass 2: Sort by 10s place (10¹)

| Number | 10s Digit |
|--------|-----------|
| 170    | 7         |
| 90     | 9         |
| 2      | 0         |
| 802    | 0         |
| 24     | 2         |
| 45     | 4         |
| 75     | 7         |
| 66     | 6         |

After stable sort by 10s digit:
```
[2, 802, 24, 45, 66, 170, 75, 90]
```

#### Pass 3: Sort by 100s place (10²)

| Number | 100s Digit |
|--------|------------|
| 2      | 0          |
| 802    | 8          |
| 24     | 0          |
| 45     | 0          |
| 66     | 0          |
| 170    | 1          |
| 75     | 0          |
| 90     | 0          |

After stable sort by 100s digit:
```
[2, 24, 45, 66, 75, 90, 170, 802]
```

✅ **Final Result:** `‭[2, 24, 45, 66, 75, 90, 170, 802]‬`

> 💡 Stability ensures that numbers with same digit stay in correct relative order.

---

### 🧠 Why Use Counting Sort for Each Digit?

- Counting Sort is **stable** — essential for Radix Sort to work correctly
- It runs in **O(n + k)** per digit, where `k = 10` (digits 0–9)
- So total time: **O(d × (n + 10)) = O(d × n)**

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Find max | Determine number of digits `d` |
| 2️⃣ Loop over digits | From LSD to MSD |
| 3️⃣ Stable sort per digit | Use Counting Sort |
| 4️⃣ Combine | Final array is fully sorted |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/radix-sort/python/radix_sort.py) | [Java](/sorting/radix-sort/java/RadixSort.java) | [JavaScript](/sorting/radix-sort/javascript/radix-sort.js) | [C++](/sorting/radix-sort/C++/radix_sort.cpp) | [C#](/sorting/radix-sort/csharp/RadixSort.cs)