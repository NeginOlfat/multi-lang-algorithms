Read this in other languages: [فارسی](/search/graph-tree-search/iterative-deepening-dfs/README.fa.md)

# 🔍 Iterative Deepening DFS (IDDFS) Search

Iterative Deepening Depth-First Search (IDDFS) is a **hybrid search strategy** that combines the **space efficiency of DFS** with the **completeness and optimality (in unweighted graphs) of BFS**. It works by performing a series of **depth-limited DFS traversals**, incrementally increasing the depth limit from 0 to 1, 2, 3, and so on—until the goal is found.

### Core Principles:
1. Start with **depth limit = 0**
2. Perform a **Depth-Limited DFS** up to that depth
3. If the goal is **not found**, increment the depth limit by 1
4. Repeat the DFS with the new limit
5. Continue until the goal is found or the entire graph is exhausted

Despite re-exploring nodes at each iteration, IDDFS **retains linear space complexity** (like DFS) while **guaranteeing the shortest path** in unweighted graphs (like BFS)—making it ideal for large or infinite search spaces where memory is limited.

> 💡 **Key insight**: The repeated work is often acceptable because most nodes are at the deepest level, so the overhead is bounded by a constant factor of BFS.

---

### 🧩 Example

Consider this tree (goal = **G**):

```
        A
      / | \
     B  C  D
    /|     |\
   E F     G H
  /
 I
```

**Goal**: Find node **G** starting from **A**.

#### Iteration 1: Depth Limit = 0
- Visit: A  
- **G not found**

#### Iteration 2: Depth Limit = 1
- DFS order: A → B, A → C, A → D  
- Nodes visited: A, B, C, D  
- **G not found**

#### Iteration 3: Depth Limit = 2
- DFS order:  
  - A → B → E, A → B → F  
  - A → C (no children within limit)  
  - A → D → G ← **GOAL FOUND!**
- Search stops at **G**

✅ **Path found**: A → D → G (length = 2, which is optimal)

> Although nodes A, B, C, D were revisited in earlier iterations, the **first time G is reached** is at the **minimum possible depth**, ensuring optimality.


## ⏱️ Time & Space Complexity

| Aspect        | Complexity                     | Explanation |
|---------------|-------------------------------|-------------|
| **Time**      | **O(bᵈ)**                     | Same as BFS, where *b* = branching factor, *d* = depth of shallowest goal. Though nodes are revisited, the total number of expansions is at most *b/(b−1)* times that of BFS (a constant factor for *b > 1*). |
| **Space**     | **O(bd)** or **O(d)**         | Only stores the current path in the recursion stack (like DFS), so space is **linear in depth**, not exponential. |

- **b** = average branching factor  
- **d** = depth of the shallowest goal node  

> 📌 For example, with *b = 10* and *d = 5*, IDDFS uses **~50 nodes in memory** vs. BFS’s **~100,000 nodes**.


## ✅ Pros & Cons

### ✅ **Advantages**
- **Optimal** in unweighted graphs (finds shortest path like BFS).
- **Complete**: Guaranteed to find a solution if one exists (unlike plain DFS in infinite trees).
- **Memory efficient**: Uses **O(d)** space, making it feasible for deep searches.
- **Responsive**: Can be interrupted and still yield partial results.
- **Ideal for unknown-depth problems**: No need to know the goal depth in advance.

### ❌ **Disadvantages**
- **Redundant computation**: Repeats work at each depth level.
- **Slightly slower than BFS** in practice due to repeated node expansions.
- **Not suitable for graphs with cycles** without a visited set (though can be adapted).
- **Overhead from multiple restarts** may hurt performance in shallow trees.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/graph-tree-search/iterative-deepening-dfs/python/iddfs-search.py) | [JavaScript](/search/graph-tree-search/iterative-deepening-dfs/javascript/iddfs-search.js)

