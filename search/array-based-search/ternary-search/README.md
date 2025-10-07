Read this in other languages: [فارسی](/search/array-based-search/ternary-search/README.fa.md)

# 🔍 Ternary Search – Divide into Three for Optimization

**Ternary Search** is a searching algorithm used primarily to find the **maximum or minimum** of a **unimodal function** (a function that increases and then decreases — or vice versa) within a given interval.

Unlike Binary Search, which splits the search space in **two**, Ternary Search divides it into **three parts**, allowing us to narrow down the peak or valley efficiently.

> 📌 While less common than Binary Search, it’s extremely useful in **optimization problems**, competitive programming, and mathematical modeling.


## 📚 How It Works

Ternary Search works on a **sorted array** or **continuous function** that is **unimodal**:
- First strictly increasing, then strictly decreasing (for maximum)
- Or first decreasing, then increasing (for minimum)

### ✅ Steps:
1. Define the search range: `left` and `right`
2. Calculate two midpoints:
   - `mid1 = left + (right - left) / 3`
   - `mid2 = right - (right - left) / 3`
3. Compare `f(mid1)` and `f(mid2)`:
   - If `f(mid1) < f(mid2)` → Maximum lies in the **right two-thirds**
   - If `f(mid1) > f(mid2)` → Maximum lies in the **left two-thirds**
4. Repeat until the range is small enough (within desired precision)

> ✅ **Requirement**: The function/array must be **unimodal**

---

### 🧩 Example: Finding Peak in Array

```text
Array: [1, 3, 5, 7, 8, 6, 4, 2]
Goal: Find index of maximum value (peak)

Step 1:
  left = 0, right = 7
  mid1 = 2 → arr[2] = 5
  mid2 = 5 → arr[5] = 6
  Since 5 < 6 → peak is in right part → set left = mid1 + 1

Step 2:
  left = 3, right = 7
  mid1 = 4 → arr[4] = 8
  mid2 = 6 → arr[6] = 4
  Since 8 > 4 → peak is in left part → set right = mid2 - 1

Now only index 4 remains → arr[4] = 8 → Found!

Peak at index: 4
```

---

### 📈 For Continuous Functions (e.g., Math Problems)

Used to find max/min of functions like:
```text
f(x) = -x² + 6x + 5   → has a maximum
```


## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Peak is near boundaries |
| **Average/Worst Case** | O(log₃ n) ≈ O(log n) | Each step reduces search space to 2/3 |
| **Space Complexity** | O(1) iterative<br>O(log n) recursive | Depends on implementation |

> 📊 So:  
> `O(log₃ n)` ≈ `O(log n)` — similar to Binary Search, but slightly more comparisons per step.


## ✅ Pros & Cons

| ✅ Pros | ❌ Cons |
|-------|--------|
| Finds max/min in unimodal data | Only works on unimodal functions/arrays |
| Useful in optimization problems | Slightly slower than binary search due to two comparisons |
| Can work on real numbers (with precision) | Not suitable for general search (like finding a value) |
| Great for math-heavy problems | Rarely used in standard libraries |


## 🌐 When to Use

- ✅ Finding **peak element** in an array (e.g., mountain array)
- ✅ Solving **mathematical optimization** problems (maximize area, profit, etc.)
- ✅ Competitive programming (Codeforces, LeetCode hard problems)
- ✅ Function maximization where derivative is hard to compute
- ✅ Educational purposes — teaches divide-and-conquer beyond binary split

> 🚫 Avoid for:
> - General value lookup
> - Non-unimodal or random data
> - Small datasets (linear scan may be faster)


## 🔁 Comparison with Binary Search

| Feature | Binary Search | Ternary Search |
|--------|---------------|----------------|
| Splitting | Two parts | Three parts |
| Best For | Value lookup in sorted arrays | Max/Min in unimodal data |
| Number of Comparisons | 1 per iteration | 2 per iteration |
| Applicable to Real Numbers? | Yes (discrete) | Yes (with tolerance) |
| Common Usage | Everyday programming | Specialized optimization |


## 💡 Real-World Analogy

Imagine hiking up a single mountain (no valleys or multiple peaks):
- You want to find the **highest point**
- At each step, you check two spots ahead (not just one middle)
- Based on which feels higher, you decide whether to go left, center, or right

That’s what Ternary Search does — it uses **two probes** to guide toward the peak.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/array-based-search/ternary-search/python/) | [Java](/search/array-based-search/ternary-search/java/) | [JavaScript](/search/array-based-search/ternary-search/javascript/) | [C++](/search/array-based-search/ternary-search/cpp/) | [C#](/search/array-based-search/ternary-search/csharp/)