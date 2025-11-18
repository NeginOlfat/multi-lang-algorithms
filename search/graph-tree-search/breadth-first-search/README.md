Read this in other languages: [فارسی](/search/graph-tree-search/breadth-first-search/README.fa.md)

# 🔍 Breadth-First Search

Breadth-First Search (BFS) is an **uninformed graph traversal algorithm** that explores all the vertices of a graph or tree **level by level**, starting from a given source node. It uses a **First-In-First-Out (FIFO)** data structure—typically a **queue**—to ensure that nodes are visited in the order they are discovered.

### Core Principles:
1. **Start** at the root/source node
2. **Visit** all immediate neighbours (level 1)
3. **Enqueue** those neighbours
4. **Dequeue** the next node and repeat the process
5. **Mark visited nodes** to avoid cycles and redundant processing

BFS guarantees that the **shortest path** (in terms of number of edges) from the source to any reachable node is found in **unweighted graphs**.



## 🧩 Example

Consider this undirected graph:

```
    A
   / \
  B   C
 /   / \
D   E   F
```

**Goal**: Traverse starting from node **A**.

**Step-by-step BFS traversal**:

1. **Initialize**: Queue = [A], Visited = {A} → Output: **A**
2. **Dequeue A**, enqueue its neighbours B and C  
   Queue = [B, C], Visited = {A, B, C} → Output: A, **B**, **C**
3. **Dequeue B**, enqueue its unvisited neighbour D  
   Queue = [C, D], Visited = {A, B, C, D} → Output: A, B, C, **D**
4. **Dequeue C**, enqueue its unvisited neighbours E and F  
   Queue = [D, E, F], Visited = {A, B, C, D, E, F} → Output: A, B, C, D, **E**, **F**
5. **Dequeue D** → no new neighbours  
6. **Dequeue E** → no new neighbours  
7. **Dequeue F** → no new neighbours  
8. **Queue empty** → traversal complete

✅ **Final BFS order**: **A → B → C → D → E → F**

> 💡 This level-order traversal is why BFS is also used for **level-order tree traversal**.


## ⏱️ Time & Space Complexity

| Aspect        | Complexity                     | Explanation |
|---------------|-------------------------------|-------------|
| **Time**      | **O(V + E)**                  | Each vertex (V) and edge (E) is processed once. In adjacency list representation, we scan all neighbours of each node. |
| **Space**     | **O(V)**                      | In the worst case (e.g., a complete graph), the queue may store all vertices at once. Also includes space for the visited set. |
|

- **V** = number of vertices (nodes)  
- **E** = number of edges  

> 📌 For a **tree**, E = V – 1, so time complexity simplifies to **O(V)**.


## ✅ Pros & Cons

### ✅ **Advantages**
- **Guarantees shortest path** in unweighted graphs/trees.
- **Complete**: Will find a solution if one exists (unlike DFS in infinite graphs).
- **Systematic and predictable** traversal order (level-by-level).
- Ideal for **finding neighbours at a specific distance** (e.g., "friends of friends").

### ❌ **Disadvantages**
- **High memory usage**: The queue can grow large in wide graphs.
- **Slower for deep targets**: Explores all nodes at level *k* before reaching level *k+1*.
- **Not suitable for weighted graphs** (use Dijkstra’s instead).
- **Inefficient for deep, narrow graphs** (DFS is more space-efficient).

<br />

> 🚫 **Avoid BFS** if memory is severely limited or if the target is likely deep in a narrow tree.

## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/graph-tree-search/breadth-first-search/python/breadth_first_search.py) | [JavaScript](/search/graph-tree-search/breadth-first-search/javascript/breadth_first_search.js)