Read this in other languages: [فارسی](/search/linear-search/README.fa.md)


# 🔎 Linear Search

**Linear Search** (also known as Sequential Search) is one of the simplest and most intuitive search algorithms. It checks each element of a list or array one by one until the desired element is found or the end of the list is reached.


## 📚 How It Works

1. Start from the first element of the array.
2. Compare each element with the **target value**.
3. If a match is found, return the **index**.
4. If the end is reached without a match, return `-1`.

### 🔄 Example
```text
Array: [10, 50, 30, 70, 80, 20, 90, 40]
Target: 20

Steps: 10 → 50 → 30 → 70 → 80 → 20 (Found!)
Index: 5
```



## ⏱️ Time & Space Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best Case** | O(1) | Target is the first element |
| **Average Case** | O(n) | On average, checks half the elements |
| **Worst Case** | O(n) | Target is at the end or not present |
| **Space Complexity** | O(1) | Uses constant extra space |

> ✅ **Pros**: Simple, works on unsorted data, no preprocessing  
> ❌ **Cons**: Slow for large datasets

<br />

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/linear-search/python/) | [Java](/search/linear-search/java/) | [JavaScript](/search/linear-search/javascript/) | [C++](/search/linear-search/cpp/) | [C#](/search/linear-search/csharp/)
