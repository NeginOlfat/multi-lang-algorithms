Read this in other languages: [فارسی](/search/array-based-search/binary-search-on-answer/README.fa.md)

# 🔍 Binary Search on Answer – Solve Hard Problems with Simple Logic

**Binary Search on Answer** (also called **Binary Search on Result**) is an algorithmic technique that applies binary search to the *space of possible answers*, rather than directly to array elements.  
It’s especially powerful for optimization problems where the goal is to find an **optimal numeric value** (minimum or maximum) under certain constraints.


## 💡 When to Use It

Use this approach when:

- The **solution space is bounded** (e.g., `1 ≤ answer ≤ 1e9`)
- The **feasibility function is monotonic**  
  - If a candidate `x` is feasible, then all larger (or smaller) candidates are also feasible
- You can **efficiently verify** whether a given candidate is valid
- A brute-force search would be too slow

> 📘 **Intuition:**  
> It’s like guessing a secret number between 1 and 1,000,000 — and each time, you’re told whether the correct number is smaller or larger.


## 🧠 Core Idea

Instead of searching *where* an element is, you search *what the optimal answer* could be.

You repeatedly ask:

> ❓ “Is it possible to achieve this value (`x`)?”

Based on the yes/no response from `canAchieve(x)`,  
you narrow the search space until you find the boundary where feasibility flips.

This effectively converts a difficult optimization task into a sequence of simpler **decision problems**.

## ⚙️ How It Works

### Step 1: Define the Search Space
Set `low` and `high` to the range of possible answers.

### Step 2: Implement the Feasibility Function
Write `isValid(candidate)` (or `canAchieve(x)`) to determine whether a given value satisfies all constraints.

### Step 3: Perform Binary Search
```python
while low <= high:
    mid = (low + high) // 2
    if isValid(mid):
        result = mid
        high = mid - 1   # For minimization
        # or low = mid + 1  # For maximization
    else:
        low = mid + 1    # For minimization
        # or high = mid - 1  # For maximization
return result
```

> ✅ **Key Requirement:** Monotonicity in feasibility.


## 🧩 Example: Ship Packages Within D Days

**Problem Statement:**

You are given `n` packages with known weights. They must be shipped **in order** within exactly `D` consecutive days.
Each day, you can load any number of packages as long as their **total weight ≤ ship capacity**.

Find the **minimum ship capacity** that allows all packages to be shipped within `D` days.

### Example Input

```text
weights = [1,2,3,4,5,6,7,8,9,10]
D = 5
```

We want the smallest possible capacity `C` such that all packages are shipped in ≤ 5 days.

---

### Step 1: Define the Search Range

* **Lower bound**: Must at least carry the heaviest package → `max(weights) = 10`
* **Upper bound**: Could ship all packages in one day → `sum(weights) = 55`

So our search range is `[low = 10, high = 55]`.

We'll binary search on this range to find the **minimum feasible capacity**.

---

### Step 2: Define Feasibility Function

We need a helper that checks whether a given capacity `C` can deliver all packages within `D` days.

```python
def canShip(capacity):
    days = 1
    load = 0
    for w in weights:
        if load + w <= capacity:
            load += w
        else:
            days += 1
            load = w
    return days <= D
```
This simulates loading packages **in order**, starting a new day whenever adding the next package would exceed capacity.

---
### Step 3: Binary Search the Answer
We now simulate the full binary search process:

| Iter | low | high | mid | can_ship(mid)? | Action |
|------|-----|------|-----|----------------|--------|
| 1    | 10  | 55   | 32  | ✅ Yes         | Try smaller → `high = 31` |
| 2    | 10  | 31   | 20  | ✅ Yes         | Try smaller → `high = 19` |
| 3    | 10  | 19   | 14  | ❌ No          | Too small → `low = 15` |
| 4    | 15  | 19   | 17  | ✅ Yes         | Try smaller → `high = 16` |
| 5    | 15  | 16   | 15  | ✅ Yes         | Try smaller → `high = 14` |
| 6    | 15  | 14   | —   | —              | `low > high` → **Done!** |

✅ **Answer: Minimum capacity = 15**

> 🔍 Why did we stop at 15?  
> Because 15 works, and 14 fails — so 15 is the **smallest feasible capacity**.

---

### Verify Capacity = 15

Let’s simulate shipping with **capacity = 15**:

| Day | Packages Loaded       | Total Weight | Valid? |
|-----|------------------------|--------------|--------|
| 1   | [1, 2, 3, 4, 5]       | 1+2+3+4+5 = 15 | ✅     |
| 2   | [6, 7]                | 6+7 = 13      | ✅     |
| 3   | [8]                   | 8             | ✅     |
| 4   | [9]                   | 9             | ✅     |
| 5   | [10]                  | 10            | ✅     |

🎯 **Total Days Used: 5** → ✅ Feasible

Now try **capacity = 14**:

- Day 1: `[1,2,3,4] = 10` → next 5: `10+5=15 > 14` → can't add → end Day 1
- Day 2: `[5,6] = 11` → next 7: `11+7=18 > 14` → end Day 2
- Day 3: `[7,8] = 15 > 14` → wait, 7 alone = 7, then `7+8=15 > 14` → so only [7] 
- Day 4: [8]  
- Day 5: [9] 
- Day 6: [10]

❌ Needs **6 days** → not feasible.

So **14 fails**, **15 works** → minimum is **15**.

---
### ✅ Final Answer

🎯 **Minimum Required Ship Capacity = 15**

With this capacity, we can just barely finish in 5 days.

---

### Why Binary Search Works?

Because the **feasibility condition is monotonic**:

* If a capacity `C` works → all larger capacities also work.
* If a capacity `C` fails → all smaller capacities also fail.

Thus, the search space behaves like:

```
[False, False, False, True, True, True]
                    ↑
               Find this point!
```

Binary search efficiently finds that first `True` boundary.

Without it, we’d have to try all 46 values from 10 to 55 — but binary search takes only **6 iterations**!


---

### 🎲​ Explanation

If you think of capacity as “how big your truck is”:

* With capacity `10`, the truck is too small — you’d need 10 days.
* With capacity `55`, one day is enough — truck is huge.
* As you increase capacity, the number of days required **monotonically decreases**.

This monotonic relationship (`capacity ↑ ⇒ days ↓`) lets us **binary search** the smallest capacity that meets the time constraint.


## ⏱️ Time & Space Complexity

| Aspect    | Complexity               | Explanation                           |
| --------- | ------------------------ | ------------------------------------- |
| **Time**  | `O(log(max_answer) × F)` | `F` = cost of one `isValid()` check   |
| **Space** | `O(1)`                   | or `O(n)` depending on implementation |

💡 Even if the search range is huge (e.g., `1` to `1e18`), it converges in just **~60 iterations**.


## ✅ Common Problem Patterns

| Pattern                   | Goal                            | Monotonic Behavior                  |
| ------------------------- | ------------------------------- | ----------------------------------- |
| **Minimize Maximum**      | e.g., minimize largest sum/load | If `x` works → all larger `x` work  |
| **Maximize Minimum**      | e.g., maximize minimum distance | If `x` works → all smaller `x` work |
| **K-th Element Problems** | e.g., find K-th missing number  | Count ≤ mid                         |
| **Threshold Problems**    | e.g., minimize time/capacity    | Larger value → easier condition     |



## 🌍 Real-World Analogy

Imagine baking cookies from a fixed amount of dough.
You want the **largest possible cookie size** so that everyone gets one.

* If cookies are too large → you’ll run out of dough early.
* If they’re too small → you can make them bigger.

You **binary search on cookie size**, asking:

> “Can I make at least N cookies of this size?”

You adjust until you find the largest feasible size.
That’s **Binary Search on Answer** in real life.



## 🔁 Comparison with Standard Binary Search

| Feature        | Standard Binary Search | Binary Search on Answer |
| -------------- | ---------------------- | ----------------------- |
| Search Space   | Array indices          | Possible answer values  |
| Data Structure | Sorted array           | Any numeric range       |
| Decision Basis | Compare with target    | Feasibility check       |
| Typical Goal   | Find an element        | Find optimal value      |
| Example        | Search in array        | Minimize ship capacity  |


## 📝 Summary

**Binary Search on Answer** transforms optimization problems into decision problems by leveraging **monotonic feasibility**.

It’s a cornerstone technique in:

* Competitive programming
* Algorithm design
* Scheduling and resource allocation
* Geometry and simulation problems

> 🔑 **If feasibility changes monotonically across a numeric range, you can binary search the answer.**


## 💻 Next Steps

Explore implementations in your favorite language:

[Python](/search/array-based-search/binary-search-on-answer/python/)  | [JavaScript](/search/array-based-search/binary-search-on-answer/javascript/) 