Read this in other languages: [فارسی](/search/array-based-search/binary-search/README.fa.md)

# 🔎 Binary Search

**Binary Search** is a highly efficient search algorithm used to find the position of a target value in a **sorted array**. It works by repeatedly dividing the search interval in half — dramatically reducing the number of comparisons needed.

## 🌐 When to Use

- ✅ Searching in large **sorted arrays**
- ✅ Implementing lower/upper bound functions
- ✅ Solving optimization problems (e.g., "find minimum x such that...")
- ✅ Used internally in standard libraries (e.g., `bisect` in Python, `Arrays.binarySearch()` in Java)

> ⚠️ Avoid if data is unsorted — sorting first takes O(n log n), defeating the purpose for single searches.


## 📚 How It Works

1. Start with the **middle element** of the sorted array.
2. If the target equals the middle element → return its index.
3. If the target is **less than** the middle → search the **left half**.
4. If the target is **greater than** the middle → search the **right half**.
5. Repeat until the element is found or the interval is empty.

> 🔑 **Requirement**: The input array **must be sorted**.

### 🔄 Example
```text
Array: [10, 20, 30, 40, 50, 60, 70, 80]
Target: 60

Step 1: Middle = 40 → 60 > 40 → Search right half [50, 60, 70, 80]  
Step 2: Middle = 60 → Found!
Index: 5
```


## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is at the center |
| **Average/Worst Case** | O(log n) | Halves search space each time |
| **Space Complexity** | O(1) | Iterative version uses constant space |

> ✅ **Pros**: Extremely fast for large sorted data  
> ❌ **Cons**: Requires sorted input; not suitable for dynamic/unsorted data

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/binary-search/python/) | [Java](/search/array-based-search/binary-search/java/) | [JavaScript](/search/array-based-search/binary-search/javascript/) | [C++](/search/array-based-search/binary-search/cpp/) | [C#](/search/array-based-search/binary-search/csharp/)
