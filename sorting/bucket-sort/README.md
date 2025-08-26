Read this in other languages: [فارسی](/sorting/bucket-sort/README.fa.md)

# 🟣 Bucket Sort Algorithm

A **distribution-based** sorting algorithm that works by dividing the input into several "buckets," sorting each bucket individually (often with another algorithm like Insertion Sort), and then merging the buckets to produce the final sorted array.

Bucket Sort performs exceptionally well when the input is **uniformly distributed** over a range, achieving **average-case time complexity of O(n + k)** where `k` is the number of buckets.

## 📈 Time Complexity

| Case      | Time               |
|:---------:|:------------------:|
| Best      | O(n + k)           |
| Average   | O(n + k)           |
| Worst     | O(n²)              |

> ⏱️ Best when data is **uniformly distributed**  
> ⏱️ Worst case occurs when all elements fall into a single bucket (e.g., using Insertion Sort per bucket)

## 💾 Space Complexity
- **O(n + k)** — for storing `k` buckets and `n` elements

## ✅ When to Use?
- ✅ Input is **uniformly distributed** (e.g., random floating-point numbers in [0,1))
- ✅ Need **linear average performance**
- ✅ Sorting **floating-point numbers** or **fixed-range values**
- ✅ Can estimate min/max of input

🚫 Not suitable for:
- Highly skewed or clustered data
- Unknown or infinite range
- Memory-constrained environments (due to extra space)

## 🔄 How It Works

### 🧩 Pseudocode

```
BEGIN BucketSort(array, numBuckets)
    IF array is empty OR has one element: RETURN array

    min ← findMin(array)
    max ← findMax(array)
    range ← max - min

    // Create k empty buckets
    buckets ← array of k empty lists

    // Distribute elements into buckets
    FOR each element IN array
        bucketIndex ← floor((element - min) / range * (numBuckets - 1))
        INSERT element INTO buckets[bucketIndex]
    END FOR

    // Sort each bucket (using Insertion Sort or another algorithm)
    FOR each bucket IN buckets
        INSERTION_SORT(bucket)
    END FOR

    // Concatenate all buckets into output
    output ← empty list
    FOR each bucket IN buckets
        APPEND all elements of bucket TO output
    END FOR

    RETURN output
END
```

> 🔍 Note: For integers, you can use `bucketIndex = (element - min) * numBuckets / (max - min + 1)`

### 🔄 Step-by-Step Example

Let’s sort: `‭[0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]‬`  
We’ll use **5 buckets** for range [0, 1).

#### Step 1: Find min and max
- min = 0.32, max = 0.52 → range = 0.20

#### Step 2: Distribute into buckets

| Bucket | Range        | Index Formula                     | Elements       |
|--------|--------------|-----------------------------------|----------------|
| 0      | [0.32–0.36)  | `(x-0.32)/0.20 * 4` → [0, 1)      | 0.33           |
| 1      | [0.36–0.40)  | → [1, 2)                          | 0.37           |
| 2      | [0.40–0.44)  | → [2, 3)                          | 0.42           |
| 3      | [0.44–0.48)  | → [3, 4)                          | 0.47           |
| 4      | [0.48–0.52]  | → [4, 5) → clamped to 4           | 0.52, 0.51     |

> Note: 0.32 → bucket 0, 0.52 → bucket 4 (inclusive upper bound)

#### Step 3: Sort each bucket
- Bucket 4: `[0.52, 0.51]` → sorted → `[0.51, 0.52]`

All other buckets have one element → already sorted.

#### Step 4: Concatenate buckets
```
Bucket 0: [0.33]
Bucket 1: [0.37]
Bucket 2: [0.42]
Bucket 3: [0.47]
Bucket 4: [0.51, 0.52]
```

✅ Final Result: `‭[0.33, 0.37, 0.42, 0.47, 0.51, 0.52]‬`  
(We missed 0.32? Let's fix that below!)

> 💡 But wait — we forgot to include **0.32**!  
> Let's correct:  
> `bucketIndex = floor((0.32 - 0.32)/0.20 * 4) = 0` → so 0.32 goes to **bucket 0**  
> Bucket 0 becomes: `[0.33, 0.32]` → sorted → `[0.32, 0.33]`

✅ **Corrected Final Result:** `‭[0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52]‬`

---

### 🧠 Why Bucket Sort Works

- Divides data into smaller subproblems (like Merge Sort)
- Works best when elements are **evenly spread**
- Uses a secondary sort (Insertion Sort) on small buckets — which is efficient
- Avoids comparison bottlenecks by distributing first

---

### 📊 Summary of Steps

| Step | Purpose |
|------|--------|
| 1️⃣ Find min/max | Determine range for bucket mapping |
| 2️⃣ Create buckets | Allocate k empty lists |
| 3️⃣ Distribute | Place each element in correct bucket |
| 4️⃣ Sort buckets | Use Insertion Sort or another algorithm |
| 5️⃣ Concatenate | Combine all buckets in order |

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/sorting/bucket-sort/python/bucket_sort.py) | [Java](/sorting/bucket-sort/java/BucketSort.java) | [JavaScript](/sorting/bucket-sort/javascript/bucket-sort.js) | [C++](/sorting/bucket-sort/C++/bucket_sort.cpp) | [C#](/sorting/bucket-sort/csharp/BucketSort.cs)