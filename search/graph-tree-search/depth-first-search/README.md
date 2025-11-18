Read this in other languages: [فارسی](/search/graph-tree-search/depth-first-search/README.fa.md)

# 🔍 Depth-First Search (DFS)

Depth-First Search (DFS) is an **uninformed graph traversal algorithm** that explores as far as possible along each branch **before backtracking**. It uses a **Last-In-First-Out (LIFO)** data structure—typically a **stack** (often implemented implicitly via **recursion**)—to ensure that the most recently discovered node is explored next.

### Core Principles:
1. **Start** at the root/source node  
2. **Mark** the current node as visited  
3. **Recursively visit** one unvisited neighbour (go as deep as possible)  
4. **Backtrack** when no unvisited neighbours remain  
5. **Repeat** until all reachable nodes are visited  

Unlike BFS, DFS does **not guarantee the shortest path** in unweighted graphs—but it uses **less memory** and is ideal for exploring deep structures or detecting cycles.

---

### 🧩 Example

Consider this undirected graph:

```
    A
   / \
  B   C
 /   / \
D   E   F
```

**Goal**: Traverse starting from node **A**.

**Step-by-step DFS traversal** (assuming we visit neighbours in alphabetical order):

1. Visit **A** → Output: **A**  
2. From A, go to **B** (first unvisited neighbour) → Output: A, **B**  
3. From B, go to **D** → Output: A, B, **D**  
4. D has no unvisited neighbours → **backtrack** to B  
5. B has no other unvisited neighbours → **backtrack** to A  
6. From A, go to **C** → Output: A, B, D, **C**  
7. From C, go to **E** → Output: A, B, D, C, **E**  
8. E has no unvisited neighbours → **backtrack** to C  
9. From C, go to **F** → Output: A, B, D, C, E, **F**  
10. F has no unvisited neighbours → **backtrack** to C → A  
11. All nodes visited → traversal complete  

✅ **Final DFS order**: **A → B → D → C → E → F**

> 💡 In trees, this is also known as **pre-order traversal** when implemented recursively.


## ⏱️ Time & Space Complexity

| Aspect        | Complexity                     | Explanation |
|---------------|-------------------------------|-------------|
| **Time**      | **O(V + E)**                  | Each vertex (V) and edge (E) is processed once, just like BFS. |
| **Space**     | **O(V)**                      | In the worst case (a skewed tree or deep path), the recursion stack or explicit stack stores up to V nodes. |
|

- **V** = number of vertices (nodes)  
- **E** = number of edges  

> 📌 For a **tree**, E = V – 1 → time complexity = **O(V)**  
> 📌 **Recursive DFS** uses the **call stack**; **iterative DFS** uses an explicit stack.



## ✅ Pros & Cons

### ✅ **Advantages**
- **Low memory usage** compared to BFS (only stores current path, not entire level).
- **Faster discovery** of deep targets (doesn’t waste time exploring wide levels).
- **Natural for recursion** and backtracking problems (e.g., puzzles, mazes).
- Excellent for **topological sorting**, **cycle detection**, and **strongly connected components**.
- Simpler to implement recursively.

### ❌ **Disadvantages**
- **Does NOT guarantee shortest path** in unweighted graphs.
- **May get stuck** in infinite paths (in infinite or cyclic graphs without visited tracking).
- **Not complete** in infinite-depth graphs (unlike BFS).
- **Order depends on neighbour processing sequence** (less predictable than BFS).

<br />

> 🚫 **Avoid DFS** when you need the shortest path in an unweighted graph or when the solution is likely near the root (BFS is better).

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/graph-tree-search/depth-first-search/python/depth-first-search.py) | [JavaScript](/search/graph-tree-search/depth-first-search/javascript/depth-first-search.js)