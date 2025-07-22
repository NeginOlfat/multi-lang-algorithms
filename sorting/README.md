# Sorting Algorithms

Sorting is one of the fundamental concepts in computer science. It involves arranging data in a specific order — typically **ascending** or **descending** — to make it easier to search, analyze, and process.

This guide introduces the concept of sorting and presents several widely used **sorting algorithms**, each with unique characteristics in terms of speed, memory usage, and use cases.

<br />

#### Available Languages:

 [فارسی](/sorting/README.fa.md)

<br/>

## 📌 What is Sorting?

**Sorting** refers to the process of rearranging elements in a collection (like an array or list) based on a comparison operator (e.g., `<`, `>`). The goal is to organize the data so that:
- Searching becomes faster.
- Data can be processed more efficiently.
- Patterns become easier to identify.

#### For example:
```
Input: [64, 34, 25, 12, 22, 11, 90]

Sorted: [11, 12, 22, 25, 34, 64, 90] → Ascending Order
```

<br />

## 🧩 Common Applications of Sorting

- 🔍 Efficient searching (e.g., binary search requires sorted data)
- 📊 Data analysis and visualization
- 💾 Database indexing
- 🛒 E-commerce product filtering (price low-to-high, etc.)
- 🏆 Leaderboards and rankings

---

## 📊 Overview of Sorting Algorithms

| Algorithm          | Best Time     | Avg Time      | Worst Time    | Space       | Stable? | In-place? | Notes |
|--------------------|---------------|---------------|---------------|-------------|---------|-----------|-------|
| **Bubble Sort**    | O(n)          | O(n²)         | O(n²)         | O(1)        | ✅ Yes   | ✅ Yes     | Simple but slow; good for teaching |
| **Selection Sort** | O(n²)         | O(n²)         | O(n²)         | O(1)        | ❌ No    | ✅ Yes     | Always performs same number of comparisons |
| **Insertion Sort** | O(n)          | O(n²)         | O(n²)         | O(1)        | ✅ Yes   | ✅ Yes     | Efficient for small datasets |
| **Merge Sort**     | O(n log n)    | O(n log n)    | O(n log n)    | O(n)        | ✅ Yes   | ❌ No      | Stable & reliable; used in many standard libraries |
| **Quick Sort**     | O(n log n)    | O(n log n)    | O(n²)         | O(log n)    | ❌ No    | ✅ Yes     | Fast average case; widely used in practice |
| **Heap Sort**      | O(n log n)    | O(n log n)    | O(n log n)    | O(1)        | ❌ No    | ✅ Yes     | Guaranteed O(n log n); not stable |
| **Counting Sort**  | O(n + k)      | O(n + k)      | O(n + k)      | O(k)        | ✅ Yes   | ❌ No      | Only works for integers in known range |
| **Radix Sort**     | O(d × n)      | O(d × n)      | O(d × n)      | O(n + k)    | ✅ Yes   | ❌ No      | Excellent for fixed-length keys (e.g., phone numbers) |
| **Shell Sort**     | O(n log n)    | O(n^1.3) approx | O(n²)       | O(1)        | ❌ No    | ✅ Yes     | Generalization of Insertion Sort; efficient in practice |
| **Bucket Sort**    | O(n + k)      | O(n + k)      | O(n²)         | O(n + k)    | ✅ Yes   | ❌ No      | Works best when input is uniformly distributed |

> ⚠️ Note:  
> - `n` = number of elements  
> - `k` = range of input values or number of buckets  
> - `d` = number of digits/key length  

---

## 🔍 Brief Description of Each Algorithm

### 1. [**Bubble Sort**](/sorting/bubble-sort/README.md)
Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large lists.

### 2. [**Selection Sort**](/sorting/selection-sort/README.md)
Finds the smallest element and places it at the beginning. Repeats this process for the remaining unsorted portion.

### 3. [**Insertion Sort**](/sorting/insertion-sort/README.md)
Builds the final sorted array one item at a time by inserting each new element into its correct position. Very efficient for small or nearly sorted arrays.

### 4. [**Merge Sort**](#)
Uses **divide-and-conquer**: splits the list in half, recursively sorts both halves, then merges them back together. Always has O(n log n) time, making it predictable and stable.

### 5. [**Quick Sort**](#)
Picks a "pivot" element, partitions the array around it, and recursively sorts the sub-arrays. Extremely fast in practice due to cache efficiency and low overhead.

### 6. [**Heap Sort**](#)
Converts the array into a max heap and repeatedly extracts the maximum element. Guarantees O(n log n) performance regardless of input distribution.

### 7. [**Counting Sort**](#)
Counts occurrences of each value and reconstructs the sorted list using those counts. Not comparison-based — only works for integer-like data within a known range.

### 8. [**Radix Sort**](#)
Sorts numbers digit by digit from least significant to most significant using counting sort as a subroutine. Runs in linear time for fixed-size integers.

### 9. [**Shell Sort**](#)
An optimized version of insertion sort that compares elements separated by a gap. The gap decreases over time, allowing far-away elements to move quickly toward their correct positions. Performs well in real-world scenarios despite theoretical worst-case performance.

### 10. [**Bucket Sort**](#)
Distributes elements into a number of "buckets". Each bucket is then sorted individually (often with another algorithm like insertion sort). Most effective when input is uniformly distributed across a range.

---

## 🎯 When to Use Which Algorithm?

| Scenario                                | Recommended Algorithm(s)                     |
|----------------------------------------|----------------------------------------------|
| Small dataset (< 50 elements)           | Insertion Sort                               |
| Need stable sorting                     | Merge Sort, Counting Sort, Radix Sort, Bucket Sort |
| Memory is limited                       | Heap Sort, Quick Sort, Selection Sort, Shell Sort |
| Average performance matters             | Quick Sort                                   |
| Worst-case performance matters          | Merge Sort, Heap Sort                        |
| Sorting integers in small range         | Counting Sort                                |
| Sorting strings or fixed-length numbers | Radix Sort                                   |
| Nearly sorted data                      | Insertion Sort, Shell Sort                   |
| Uniformly distributed floating-point data | Bucket Sort                              |

---