Read this in other languages: [فارسی](/search/state-space-search/bfs/README.fa.md)


# 🔍 Breadth-First Search (BFS) in State-Space Search

### 📌 What Is BFS?

**Breadth-First Search (BFS)** is an **uninformed (blind) state-space search algorithm** that systematically explores all reachable states **level by level**, starting from the **initial state**. It expands all states that are *k* actions away from the start before exploring any state that is *k+1* actions away.

BFS uses a **First-In-First-Out (FIFO) queue** to manage the frontier of states to be explored, ensuring that states are processed in the order they are discovered.

> ✅ **Key Guarantee**: In problems with **uniform step costs** (e.g., each move costs 1), BFS **always finds the shortest solution path** (i.e., the one with the fewest actions).  
> ❌ **Key Limitation**: It is **memory-intensive**, as it must store **all generated states up to the current depth**—making it impractical for large or deep state spaces.

> 🔗 *For a general graph-theoretic treatment of BFS (nodes, edges, trees), see the [Graph Search Algorithms section](/search/graph-tree-search/breadth-first-search/README.md). Here, we focus on BFS as a **problem-solving strategy in AI state spaces**.*

<br />

## 🧩 BFS on the 8-Puzzle Problem

### Problem Overview
The **8-puzzle** is a classic benchmark in AI for evaluating search algorithms. It consists of:
- A **3×3 grid** containing **8 numbered tiles (1–8)** and **one blank space** (often represented as `0` or `□`).
- **Legal actions**: Slide any tile adjacent (up, down, left, right) to the blank space into the empty cell.
- **Initial state**: A scrambled configuration (e.g., `[2, 8, 3, 1, 6, 4, 7, 0, 5]`).
- **Goal state**: Tiles in numerical order with blank in bottom-right:  

```
  1 2 3
  4 5 6
  7 8 
```

- **Goal test**: Does the current state match the goal configuration?
- **Step cost**: Each move = 1 → **uniform cost** → BFS = optimal.

### How BFS Works on 8-Puzzle
1. **Initialize**:  
   - Start with the initial state in the queue.  
   - Keep a **visited set** to avoid cycles (revisiting the same state).

2. **Iterate**:  
   - Dequeue the **oldest** state (FIFO).
   - If it’s the goal → **return the path**.
   - Otherwise, generate all **valid successor states** (by moving blank in 2–4 directions).
   - Enqueue **only unvisited successors** and mark them as visited.

3. **Repeat** until the queue is empty (no solution) or goal is found.

### Why BFS Is Suitable Here
- The 8-puzzle has **finite state space** (181,440 reachable states).
- We seek the **minimum number of moves** → BFS guarantees **optimality** under uniform cost.
- The **branching factor** is small (~2.7 on average), so memory growth is manageable for moderate depths.

### BFS in Action: Simplified Trace
Suppose initial state is:
```
1 2 3
4 0 5
6 7 8
```

- **Depth 0**: `[1, 2, 3, 4, 0, 5, 6, 7, 8]` → not goal
- **Depth 1**: Generate states by moving blank:
  - Up → `[1, 0, 3, 4, 2, 5, 6, 7, 8]`
  - Down → `[1, 2, 3, 4, 7, 5, 6, 0, 8]`
  - Left → `[1, 2, 3, 0, 4, 5, 6, 7, 8]`
  - Right → `[1, 2, 3, 4, 5, 0, 6, 7, 8]`
- **Depth 2**: Expand each of the above, and so on...

BFS will explore **all states reachable in 1 move**, then **all in 2 moves**, etc., until it hits the goal—ensuring the first time it encounters the goal is via the **shortest path**.

<br />

## ⚖️ Properties of BFS in State-Space Search

| Property        | BFS Behavior |
|-----------------|--------------|
| **Completeness** | ✅ Yes — guaranteed to find a solution if one exists (in finite state spaces). |
| **Optimality**   | ✅ Yes — finds the **shortest path** when all steps have equal cost. |
| **Time Complexity** | **O(bᵈ)** — where *b* = branching factor, *d* = depth of shallowest solution. In 8-puzzle, worst-case: ~180K states. |
| **Space Complexity** | **O(bᵈ)** — must store **all states at all levels up to d** in memory. This is BFS’s main drawback. |

> 💡 In the 8-puzzle, BFS may require **hundreds of megabytes** of RAM for deep solutions—highlighting why **IDDFS** is often preferred in practice.

<br />

## 🛑 When *Not* to Use BFS

Avoid BFS when:
- The state space is **very large or infinite** (e.g., chess, robotics in continuous space).
- **Memory is limited** (BFS can exhaust RAM quickly).
- **Step costs are non-uniform** (use **Uniform Cost Search** instead).
- You need a **quick, non-optimal solution** (consider **DFS** or **greedy search**).


## 💡 Key Takeaway

> **BFS trades memory for optimality**.  
> It is the **gold standard for shortest-path search in unweighted state spaces**, but its memory demands make it **impractical for deep or large problems**. For puzzles like the 8-puzzle—with small, finite, and uniform-cost spaces—BFS is both **effective and theoretically sound**.

In practice, **Iterative Deepening DFS (IDDFS)** often replaces BFS in AI systems because it delivers the **same optimality** with **dramatically lower memory usage**, at the cost of modest repeated work.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/state-space-search/bfs/python/bfs_8puzzle.py) | [JavaScript](/search/state-space-search/bfs/javascript/bfs_8puzzle.js)