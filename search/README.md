Read this in other languages: [فارسی](/search/README.fa.md)

# 🔍 Search Algorithms

Search algorithms are essential tools for locating data efficiently within data structures such as arrays, lists, trees, and graphs. This repository provides clean, well-documented implementations of key search algorithms with explanations.



## 🧩 Algorithms Covered

### 🔢 Array Search Algorithms
1. [**Linear Search**](/search/array-based-search/linear-search/README.md): Scans each element one by one until the target is found or the end is reached.
2. [**Binary Search**](/search/array-based-search/binary-search/README.md): Repeatedly divides a sorted array in half to locate the target.
3. [**Jump Search**](/search/array-based-search/jump-search/README.md): Jumps ahead by fixed steps and then performs linear search in the identified block (on sorted arrays).
4. [**Interpolation Search**](/search/array-based-search/interpolation-search/README.md): Estimates the position of the target based on value distribution (best for uniformly distributed data).
5. [**Exponential Search**](/search/array-based-search/exponential-search/README.md): Finds the range where the element may exist using powers of two, then applies binary search.
6. [**Ternary Search**](/search/array-based-search/ternary-search/README.md): Divides a sorted unimodal array into three parts to find min/max or a target value.
7. [**Fibonacci Search**](/search/array-based-search/fibonacci-search/README.md): Similar to binary search but uses Fibonacci numbers to split the array.
8. [**Sentinel Search**](/search/array-based-search/sentinel-search/README.md): A variation of linear search that places a sentinel at the end to avoid boundary checks.
9. [**Self-Organizing Search**](/search/array-based-search/self-organizing-search/README.md): Adjusts the list (e.g., move-to-front) after each access based on frequency.
10. [**Binary Search on Answer (Parametric Search)**](/search/array-based-search/binary-search-on-answer/README.md): Applies binary search over a range of possible answers (common in optimization problems).
11. [**Hash Table Lookup**](/search/array-based-search/hash-search/README.md): Uses a hash function to compute an index into an array (hash table) for fast data retrieval (average O(1) time).

---

### 🔗 Graph/Tree Search Algorithms
1. [**Breadth-First Search (BFS)**](/search/graph-tree-search/breadth-first-search/README.md): Explores all neighbors at current depth before moving deeper (finds shortest path in unweighted graphs). 
2. [**Depth-First Search (DFS)**](/search/graph-tree-search/depth-first-search/README.md): Explores as deep as possible in a branch before backtracking (useful for cycle detection, connectivity).
3. **Iterative Deepening DFS (IDDFS)**: Performs DFS with increasing depth limits to combine advantages of BFS and DFS.
4. **Bidirectional Search**: Simultaneously searches forward from start and backward from goal, meeting in the middle.

<br />

> Note: BFS and DFS are general strategies applicable to both explicit graphs  and implicit state spaces.

---

### 🧠 State-Space Search

#### **Uninformed (Blind) Search Algorithms**

> These do not use domain-specific knowledge (on-heuristic).

1. **Breadth-First Search (BFS)**: Explores all nodes at the current depth first (complete and optimal in unweighted graphs).

2. **Depth-First Search (DFS)**: Explores as deep as possible along each branch before backtracking.

3. **Uniform-Cost Search (UCS)**: Expands the node with the lowest path cost (optimal for weighted graphs).

4. **Depth-Limited Search**: DFS variant with a maximum depth limit to prevent infinite loops.

5. **Iterative Deepening DFS (IDDFS)**: Combines DFS memory efficiency with BFS completeness via repeated depth-limited searches.


#### 🧠 **Informed (Heuristic) Search Algorithms**

> These use heuristics to guide the search toward the goal more efficiently.

6. **Greedy Best-First Search**: Selects the node closest to the goal based on heuristic (fast but not always optimal).

7. **A\* Search**: Combines actual path cost and heuristic estimate (optimal and complete if heuristic is admissible).

8. **Iterative Deepening A\***: Memory-efficient variant of A* using cost thresholds.

9. **Memory-Bounded A\*** (e.g., **SMA\***, **RBFS**) – Adapts A* under memory constraints.


### 🎯 **Local Search & Optimization Algorithms**

> Used in single-state or continuous spaces.

1. **Hill Climbing**: Iteratively moves to a better neighboring state (prone to local optima).

2. **Simulated Annealing**: Accepts worse moves probabilistically to escape local optima.

3. **Genetic Algorithms**: Evolves solutions using selection, crossover, and mutation (inspired by evolution).

4. **Beam Search**: Keeps only the `k` best candidates at each level to save memory.

5. **Stochastic Hill Climbing**: Randomly selects among uphill moves instead of always choosing the steepest.

6. **Random Restart Hill Climbing**: Repeats hill climbing from random initial states to improve global optimum chance.


### 🎮 **Game Search Algorithms**

> Used in two-player adversarial environments.

1. **Minimax Algorithm**: Chooses optimal move assuming opponent plays optimally (used in perfect-information games).

2. **Alpha-Beta Pruning**: Optimizes minimax by pruning branches that won’t affect outcome.

3. **Expectimax**: Extends minimax for games involving chance (e.g., dice rolls).

4. **Monte Carlo Tree Search (MCTS)**: Uses random simulations to evaluate game states statistically.

