Read this in other languages: [فارسی](/search/state-space-search/dfs/README.fa.md)


# 🔍 Depth-First Search (DFS) in State-Space Search

### 📌 What Is DFS?

**Depth-First Search (DFS)** is an **uninformed (blind) state-space search algorithm** that explores as far as possible along each branch before backtracking. Starting from the **initial state**, DFS dives deep into one path of actions, only retreating when it hits a dead end (a state with no unvisited successors or no legal actions).

DFS uses a **Last-In-First-Out (LIFO) stack** (often implemented via recursion) to manage the frontier, ensuring that the **most recently generated state is expanded next**.

> ✅ **Key Advantage**: DFS is **extremely memory-efficient**—it only needs to store the **current path from root to leaf**, resulting in **O(bm)** space complexity, where *m* is the maximum depth.  
> ❌ **Key Limitations**:  
> - **Not optimal**: May return a very long (suboptimal) solution even when a short one exists.  
> - **Not complete in infinite spaces**: Can get stuck in infinite loops or deep dead ends if the state space is unbounded.  
> - **Sensitive to initial path choices**: Performance heavily depends on the order of successor generation.

> 🔗 *For a general graph-theoretic treatment of DFS (nodes, edges, trees), see the [Graph Search Algorithms section](/search/graph-tree-search/depth-first-search/README.md). Here, we focus on DFS as a **problem-solving strategy in AI state spaces**.*

<br />

## 🧩 DFS on the 8-Puzzle Problem

### Problem Overview
The **8-puzzle** is a classic benchmark in AI for evaluating search algorithms. It consists of:
- A **3×3 grid** containing **8 numbered tiles (1–8)** and **one blank space** (often represented as `0`).
- **Legal actions**: Slide any tile adjacent (up, down, left, right) to the blank space into the empty cell.
- **Initial state**: A scrambled configuration (e.g., `[2, 8, 3, 1, 6, 4, 7, 0, 5]`).
- **Goal state**: Tiles in numerical order with blank in bottom-right:  

```
  1 2 3
  4 5 6
  7 8 
```

- **Goal test**: Does the current state match the goal configuration?
- **Step cost**: Each move = 1 → **uniform cost**, but **DFS ignores cost** and does **not guarantee shortest path**.

### How DFS Works on 8-Puzzle
1. **Initialize**:  
   - Push the initial state onto the stack.  
   - Keep a **visited set** to avoid cycles (critical in graphs with loops).

2. **Iterate**:  
   - Pop the **most recent** state (LIFO).
   - If it’s the goal → **return the path**.
   - Otherwise, generate all **valid successor states** (by moving blank).
   - Push **only unvisited successors** onto the stack and mark them as visited.

3. **Repeat** until the stack is empty (no solution) or goal is found.

> ⚠️ **Note**: Without cycle detection, DFS may loop forever in the 8-puzzle due to reversible moves (e.g., slide tile left, then right, then left...).

### Why DFS Is *Sometimes* Used (With Caution)
- The 8-puzzle has a **finite state space**, so DFS **will eventually terminate** if cycle detection is used.
- When **memory is severely constrained**, DFS’s **linear space usage** is attractive.

- Useful when **any solution** is acceptable (e.g., in early prototyping or constraint satisfaction).

However, DFS is **rarely ideal** for the 8-puzzle because:
- It often finds a solution with **many more moves** than necessary.
- The **order of successor generation** (e.g., Up → Down → Left → Right) can dramatically affect performance.


## 🧩 DFS on a Maze-Solving Problem

### Problem Overview  
A **maze** is a grid-based environment where an agent must navigate from a **start position** to a **goal position** while avoiding walls. This is a classic state-space problem:

- **State**: The agent’s current position `(row, col)`
- **Initial State**: Starting cell (e.g., top-left corner)
- **Goal State**: Target cell (e.g., bottom-right corner)
- **Operators (Actions)**: Move **up, down, left, or right** to an adjacent open cell
- **Goal Test**: Is the current position the goal?
- **Path Cost**: Each move = 1 (uniform), but **DFS ignores cost and does not guarantee shortest path**

#### Example Maze (5×5)
```text
S . . # .
# # . # .
. . . . .
# # # # .
. . . . G
```
- `S` = Start `(0, 0)`  
- `G` = Goal `(4, 4)`  
- `#` = Wall (impassable)  
- `.` = Open path  

> ✅ **Why this maze works well for DFS**:  
> - Contains **dead ends** (e.g., top-right corridor)  
> - Has **multiple paths** to the goal  
> - Clearly shows **deep exploration** followed by **backtracking**

### How DFS Works on This Maze

1. **Initialize**:  
   - Push start state `(0, 0)` onto the stack  
   - Track visited cells to avoid loops

2. **Explore Deeply**:  
   - From `(0,0)`, DFS might choose **Right → Right → Down**  
   - It plunges into the top-right dead end: `(0,1) → (0,2) → (1,2) → (2,2) → (2,3) → (2,4)`  
   - At `(2,4)`, no new moves → **backtrack**

3. **Backtrack and Re-explore**:  
   - DFS backtracks to `(2,3)`, then `(2,2)`, then `(2,1)`, then `(2,0)`  
   - From `(2,0)`, it goes **Down → Down → Right → Right → Right → Right** to reach `G`

4. **Result**:  
   - DFS finds **a valid path**, but it’s **not the shortest**  
   - Shortest path = 8 moves  
   - DFS path (depending on move order) might be **12+ moves**

> 🔁 **Key behavior**: DFS commits fully to one path until it hits a dead end—perfect for demonstrating **backtracking** and **non-optimality**.

### Why DFS Is Suitable (With Caveats)

- ✅ **Finite state space**: 25 cells maximum → guaranteed termination with cycle detection  
- ✅ **Low memory usage**: Only stores current path (e.g., 10–15 cells in memory)  
- ✅ **Fast discovery of *a* solution**: Often finds *some* path quickly  
- ❌ **Not optimal**: Ignores path length—may return a very long route  
- ❌ **Order-dependent**: Solution quality depends on move priority (e.g., Right before Down)

> 💡 **Educational value**: The maze visually demonstrates DFS’s core traits—**depth-first commitment** and **backtracking**—in a way the 8-puzzle cannot.

---

### Simplified Trace (Move Order: Right → Down → Left → Up)

```
Step 1: (0,0) → (0,1) → (0,2)        // Right, Right
Step 2: (0,2) → (1,2) → (2,2)        // Down, Down
Step 3: (2,2) → (2,3) → (2,4)        // Right, Right → dead end!
Step 4: Backtrack to (2,3) → (2,2) → (2,1) → (2,0)
Step 5: (2,0) → (3,0) → blocked!     // Wall at row 3
Step 6: Backtrack to (2,0) → (1,0) → blocked!
Step 7: Backtrack to (2,0) → (0,0) already visited
Step 8: From (2,0) → (3,0) blocked → try (4,0) → (4,1) → ... → (4,4) = GOAL!
```

✅ **Path found**, but took a long detour through the top before dropping down.

<br />

## ⚖️ Properties of DFS in State-Space Search

| Property        | DFS Behavior |
|-----------------|--------------|
| **Completeness** | ❌ **No** in infinite spaces; ✅ **Yes** only in **finite spaces with cycle detection**. |
| **Optimality**   | ❌ **Never guaranteed**—may return a very long path even when a short one exists. |
| **Time Complexity** | **O(bᵐ)** — where *b* = branching factor, *m* = maximum depth. Can be **worse than BFS** if solution is shallow but DFS explores a deep wrong path first. |
| **Space Complexity** | **O(bm)** or **O(m)** — only stores the **current path** in memory. This is DFS’s main advantage. |

> 💡 In the 8-puzzle, DFS might use **< 1 MB** of RAM even for deep searches—making it viable on low-memory systems, at the cost of solution quality.

<br />

## 🛑 When *Not* to Use DFS

Avoid DFS when:
- You need the **shortest or optimal solution** (e.g., minimum moves in puzzles).
- The state space is **infinite or very deep** without known bounds.
- **Step costs matter** (DFS ignores cost entirely).
- **Time efficiency** is critical and the solution might be shallow (DFS may waste time on deep irrelevant paths).

**DFS is best suited for**:
- Problems with **very deep but narrow solutions**
- **Memory-constrained environments**
- **Tree-like spaces with no cycles** (or when cycle detection is easy)
- **Theorem proving** or **syntax parsing**, where depth reflects logical derivation

## 💡 Key Takeaway

> **DFS trades solution quality for memory efficiency**.  
> It is **not optimal and not always complete**, but its **minimal memory footprint** makes it useful in constrained or infinite environments—**provided cycle detection is implemented**.

For problems like the 8-puzzle—where **optimality matters** and the space is **finite**—**BFS or IDDFS are strongly preferred**. DFS serves more as a building block for **hybrid strategies** (like IDDFS) than as a standalone solver in state-space AI.


## 💻 Next Steps

Choose your preferred language to view implementation:

[Python](/search/state-space-search/dfs/python/dfs_maze.py) | [JavaScript](/search/state-space-search/dfs/javascript/dfs-maze.js)
