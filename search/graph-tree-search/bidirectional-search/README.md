Read this in other languages: [فارسی](/search/graph-tree-search/bidirectional-search/README.fa.md)

# 🔍 Bidirectional Search 

Bidirectional Search is an **optimization technique** that simultaneously performs **two searches**: one starting from the **source** (forward search) and another starting from the **goal** (backward search). The algorithm aims to have these two searches **meet in the middle**, significantly reducing the search space compared to traditional unidirectional algorithms like BFS or DFS.

### Core Principles:
1. **Maintain two search frontiers**: One from the source and one from the goal
2. **Expand nodes alternately** (or based on heuristics) from both sides
3. **Check for intersection** between the two search frontiers at each step
4. **Stop when the frontiers meet**, then reconstruct the complete path

This approach is particularly effective in **unweighted graphs** where both searches use BFS-like expansion, reducing the search space from **O(b^d)** to approximately **O(b^(d/2))**.

---

### 🧩 Example

Consider this undirected graph:

```
    A --- B --- C --- D --- E
    |     |     |     |     |
    F --- G --- H --- I --- J
```

**Goal**: Find the shortest path from **A** to **E**.

**Step-by-step Bidirectional Search**:

**Forward Search (A → E)**: Starts at A  
**Backward Search (E → A)**: Starts at E

1. **Iteration 1**:
   - Forward: Queue = [A], Visited_F = {A}
   - Backward: Queue = [E], Visited_B = {E}

2. **Iteration 2**:
   - Forward: Process A → enqueue B, F; Queue = [B, F], Visited_F = {A, B, F}
   - Backward: Process E → enqueue D, J; Queue = [D, J], Visited_B = {E, D, J}

3. **Iteration 3**:
   - Forward: Process B → enqueue C, G; Queue = [F, C, G], Visited_F = {A, B, F, C, G}
   - Backward: Process D → enqueue C, I; Queue = [J, C, I], Visited_B = {E, D, J, C, I}
   - **Intersection found!** C exists in both Visited_F and Visited_B

4. **Path reconstruction**:
   - Forward path: A → B → C
   - Backward path: E → D → C
   - Complete path: A → B → C ← D ← E (reversed) = **A → B → C → D → E**

✅ **Path found**: A → B → C → D → E (length = 4)

> 💡 The meeting point (C) is where the two searches intersect, allowing path reconstruction.



## ⏱️ Time & Space Complexity

| Aspect        | Complexity                     | Explanation |
|---------------|-------------------------------|-------------|
| **Time**      | **O(b^(d/2))**                | Each search only needs to explore to half the depth. If the single-directional search would take O(b^d), bidirectional search takes O(b^(d/2)) + O(b^(d/2)) = O(b^(d/2)). |
| **Space**     | **O(b^(d/2))**                | Each search frontier stores nodes up to depth d/2, so total space is O(b^(d/2)) + O(b^(d/2)) = O(b^(d/2)). |

- **b** = average branching factor  
- **d** = depth of the shallowest goal path  

> 📌 For example, with *b = 10* and *d = 6*, traditional BFS uses **~1M nodes**, while Bidirectional uses **~2000 nodes**.


## ✅ Pros & Cons

### ✅ **Advantages**
- **Significantly faster**: Reduces time complexity from exponential to square root of exponential.
- **More memory efficient**: Requires less memory than unidirectional search for deep solutions.
- **Optimal**: Finds the shortest path in unweighted graphs.
- **Complete**: Will find a solution if one exists.
- **Effective for large search spaces**: Particularly useful in state space problems.

### ❌ **Disadvantages**
- **Requires known goal state**: The target must be explicitly known in advance.
- **More complex implementation**: Requires careful coordination of two searches.
- **Needs reverse graph access**: May require ability to traverse edges in reverse direction.
- **Not suitable for all problems**: Cannot be used when the goal is not well-defined.
- **Synchronization overhead**: Must check for intersection at each step.

## 🌐 When to Use

Use Bidirectional Search when:

- ✅ You know the **exact goal state** in advance.
- ✅ Working with **unweighted graphs** or uniform-cost problems.
- ✅ The **search space is large** and deep.
- ✅ Memory and time efficiency are critical.
- ✅ You can **traverse edges in both directions** (or have reverse graph access).
- ✅ Solving **puzzle problems** (e.g., Rubik's Cube, sliding tiles).
- ✅ Working on **pathfinding in games** with known destinations.

> 🚫 **Avoid Bidirectional Search** if the goal is not explicitly known or if the graph is directed and reverse traversal is not possible.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/graph-tree-search/bidirectional-search/python/bidirectional_search.py) | [JavaScript](/search/graph-tree-search/bidirectional-search/javascript/bidirectional_search.js)
