Read this in other languages: [فارسی](/search/README.fa.md)

# 🔍 Search Algorithms

Search algorithms are essential tools for locating data efficiently within data structures such as arrays, lists, trees, graphs, and strings. This repository provides clean, well-documented implementations of key search algorithms with explanations and time/space complexity analysis.



## 🧩 Algorithms Covered

### 🔢 Array-Based Search Algorithms
1. [**Linear Search**](/search/array-based-search/linear-search/README.md): Scans each element one by one until the target is found or the end is reached.
2. [**Binary Search**](/search/array-based-search/binary-search/README.md): Repeatedly divides a sorted array in half to locate the target.
3. [**Jump Search**](/search/array-based-search/jump-search/README.md): Jumps ahead by fixed steps and then performs linear search in the identified block (on sorted arrays).
4. [**Interpolation Search**](/search/array-based-search/interpolation-search/README.md): Estimates the position of the target based on value distribution (best for uniformly distributed data).
5. [**Exponential Search**](/search/array-based-search/exponential-search/README.md): Finds the range where the element may exist using powers of two, then applies binary search.
6. [**Ternary Search**](/search/array-based-search/ternary-search/README.md): Divides a sorted unimodal array into three parts to find min/max or a target value.
7. [**Fibonacci Search**](/search/array-based-search/fibonacci-search/README.md): Similar to binary search but uses Fibonacci numbers to split the array.
8. [**Sentinel Search**](/search/array-based-search/sentinel-search/README.md): A variation of linear search that places a sentinel at the end to avoid boundary checks.
9. [**Self-Organizing Search**](/search/array-based-search/self-organizing-search/README.md): Adjusts the list (e.g., move-to-front) after each access based on frequency.
10. [**Binary Search on Answer**](/search/array-based-search/binary-search-on-answer/README.md): Applies binary search over a range of possible answers (common in optimization problems).
11. [**Hash Search**](/search/array-based-search/hash-search/README.md): Uses a hash function to compute an index into an array (hash table) for fast data retrieval (average O(1) time).

---

### 🌳 Tree Search Algorithms
1. **Inorder Traversal (DFS)**: Visits left subtree, root, then right subtree (for binary trees). 
2. **Preorder Traversal (DFS)**: Visits root, then left and right subtrees recursively. 
3. **Postorder Traversal (DFS)**: Visits left and right subtrees, then the root node. 
4. **Level-Order Traversal (BFS)**: Visits nodes level by level from top to bottom using a queue. 
5. **Depth-First Search (DFS)**: Explores as deep as possible down each branch before backtracking. 
6. **Iterative Deepening DFS (IDDFS)**: Performs DFS with increasing depth limits to combine advantages of BFS and DFS. 

---

### 🔗 Graph Search Algorithms
1. **Breadth-First Search (BFS)**: Explores all neighbors at current depth before moving deeper (finds shortest path in unweighted graphs). 
2. **Depth-First Search (DFS)**: Explores as deep as possible in a branch before backtracking (useful for cycle detection, connectivity).
3. **Dijkstra’s Algorithm**: Finds shortest paths from a source in weighted graphs with non-negative edge weights.
4. **A* Search**: Uses heuristics to guide pathfinding efficiently in weighted graphs (optimal if heuristic is admissible).
5. **Bellman-Ford Algorithm**: Computes shortest paths even with negative weights; detects negative cycles.
6. **Floyd-Warshall Algorithm**: Computes shortest paths between all pairs of vertices.
7. **Prim’s Algorithm**: Builds a minimum spanning tree by greedily adding the least-cost edge.
8. **Kruskal’s Algorithm**: Builds a minimum spanning tree by adding smallest edges while avoiding cycles.
9. **Topological Sort**: Orders nodes in a directed acyclic graph (DAG) based on dependencies.
10. **Tarjan’s Algorithm**: Finds strongly connected components in a directed graph using DFS.
11. **Kosaraju’s Algorithm**: Another method for finding strongly connected components (uses two DFS passes).
12. **Bidirectional Search**: Simultaneously searches forward from start and backward from goal, meeting in the middle.

---

### 🧠 AI Search

#### **Uninformed (Blind) Search Algorithms**

> These do not use domain-specific knowledge (on-heuristic).

1. **Breadth-First Search (BFS)** – Explores all nodes at the current depth first (complete and optimal in unweighted graphs).

2. **Depth-First Search (DFS)** – Explores as deep as possible along each branch before backtracking.

3. **Uniform-Cost Search (UCS)** – Expands the node with the lowest path cost (optimal for weighted graphs).

4. **Depth-Limited Search** – DFS variant with a maximum depth limit to prevent infinite loops.

5. **Iterative Deepening DFS (IDDFS)** – Combines DFS memory efficiency with BFS completeness via repeated depth-limited searches.

6. **Bidirectional Search** – Runs two simultaneous searches (forward and backward), reducing time complexity.

#### 🧠 **Informed (Heuristic) Search Algorithms**

> These use heuristics to guide the search toward the goal more efficiently.

7. **Greedy Best-First Search** – Selects the node closest to the goal based on heuristic (fast but not always optimal).

8. **A\* Search** – Combines actual path cost and heuristic estimate (optimal and complete if heuristic is admissible).

9. **Iterative Deepening A\*** – Memory-efficient variant of A* using cost thresholds.

10. **Memory-Bounded A\*** (e.g., **SMA\***, **RBFS**) – Adapts A* under memory constraints.

#### 🎯 **Local Search & Optimization Algorithms**

> Used in single-state or continuous spaces (not full tree/graph traversal).

11. **Hill Climbing** – Iteratively moves to a better neighboring state (prone to local optima).

12. **Simulated Annealing** – Accepts worse moves probabilistically to escape local optima.

13. **Genetic Algorithms** – Evolves solutions using selection, crossover, and mutation (inspired by evolution).

14. **Beam Search** – Keeps only the `k` best candidates at each level to save memory.

15. **Stochastic Hill Climbing** – Randomly selects among uphill moves instead of always choosing the steepest.

16. **Random Restart Hill Climbing** – Repeats hill climbing from random initial states to improve global optimum chance.

#### 🎮 **Game Search Algorithms**

> Used in two-player adversarial environments.

17. **Minimax Algorithm** – Chooses optimal move assuming opponent plays optimally (used in perfect-information games).

18. **Alpha-Beta Pruning** – Optimizes minimax by pruning branches that won’t affect outcome.

19. **Expectimax** – Extends minimax for games involving chance (e.g., dice rolls).

20. **Monte Carlo Tree Search (MCTS)** – Uses random simulations to evaluate game states statistically.

---

### 🔤 String Search
1. **Naive Search** – Checks every starting position in text for pattern match.
2. **Knuth-Morris-Pratt (KMP)** – Uses prefix function to skip redundant comparisons (linear time).
3. **Boyer-Moore** – Compares pattern from right to left; uses bad character and good suffix rules to jump ahead.
4. **Rabin-Karp** – Uses rolling hash to find exact matches in average O(n + m) time.
5. **Aho-Corasick** – Efficiently finds multiple patterns using a finite automaton with failure links.
6. **Z Algorithm** – Constructs Z-array to perform pattern matching in linear time.
7. **Sunday Algorithm** – Uses next-character information to decide how far to shift the pattern.
8. **Finite Automaton Matcher** – Preprocesses pattern into a DFA for fast searching.
9. **Shift-Or / Bitap Algorithm** – Uses bitwise operations for exact or approximate string matching.
10. **Suffix Tree** – Compressed trie of all suffixes; enables substring queries in O(m) time.
11. **Suffix Array** – Sorted array of all suffixes; supports fast substring search with binary search.
12. **Two-Way String Matching** – Splits pattern to exploit periodicity (used in modern libraries).
13. **Wu-Manber Algorithm** – Fast multi-pattern matcher using hash filtering and shift tables.



## ⏱️ Complexity Comparison
**Array-Based Search**
| Algorithm | Time (Avg) | Time (Worst) | Space | Notes |
|---------|------------|--------------|-------|-------|
| Linear Search | O(n) | O(n) | O(1) | Simple, works on unsorted data |
| Binary Search | O(log n) | O(log n) | O(1) | Requires sorted input |
| Jump Search | O(√n) | O(√n) | O(1) | Block-based; faster than linear |
| Interpolation Search | O(log log n) | O(n) | O(1) | Best on uniform data |
| Exponential Search | O(log n) | O(log n) | O(1) | Efficient for large/unknown-sized arrays |
| Ternary Search | O(log₃ n) | O(log₃ n) | O(1) | For unimodal arrays/functions |
| Fibonacci Search | O(log n) | O(log n) | O(1) | Cache-friendly alternative to binary search |
| Sentinel Search | O(n) | O(n) | O(1) | Slight constant-factor improvement over linear search |

---

<br /><br />

**Tree & Graph Search** 
| Algorithm | Time (Avg) | Time (Worst) | Space | Notes |
|---------|------------|--------------|-------|-------|
| BFS | O(V + E) | O(V + E) | O(V) | Shortest path in unweighted graphs |
| DFS | O(V + E) | O(V + E) | O(V) | Pathfinding, cycle detection |
| IDDFS | O(b^d) | O(b^d) | O(bd) | Combines DFS memory efficiency with BFS completeness |
| Dijkstra’s | O((V + E) log V) | O((V + E) log V) | O(V) | Non-negative weights only |
| Bellman-Ford | O(VE) | O(VE) | O(V) | Handles negative weights; detects negative cycles |
| Floyd-Warshall | O(V³) | O(V³) | O(V²) | All-pairs shortest paths |
| A* Search | O(b^d) | O(b^d) | O(b^d) | Optimal with admissible heuristic |
| Prim’s | O(E log V) | O(E log V) | O(V) | Minimum spanning tree |
| Kruskal’s | O(E log E) | O(E log E) | O(V) | MST using Union-Find |
| Topological Sort | O(V + E) | O(V + E) | O(V) | Only for DAGs |
| Tarjan’s / Kosaraju’s | O(V + E) | O(V + E) | O(V) | Strongly Connected Components |
| Bidirectional Search | O(b^{d/2}) | O(b^{d/2}) | O(b^{d/2}) | Faster than BFS in practice |

---

<br /><br />

**String Search**
| Algorithm | Time (Avg) | Time (Worst) | Space | Notes |
|---------|------------|--------------|-------|-------|
| Naive Search | O(n + m) | O(nm) | O(1) | Simple but slow in worst case |
| KMP | O(n + m) | O(n + m) | O(m) | No backtracking in text |
| Boyer-Moore | O(n/m) avg | O(nm) worst | O(m) | Fast in practice |
| Rabin-Karp | O(n + m) avg | O(nm) worst | O(m) | Good for multiple pattern search |
| Aho-Corasick | O(n + m + z) | O(n + m + z) | O(mz) | Multiple patterns (z = number of matches) |
| Suffix Tree | O(m) search | O(m) | O(n) preprocessing | Fast substring queries |
| Suffix Array | O(m log n) | O(m log n) | O(n) | Space-efficient alternative to suffix tree |

**AI & Local Search**
| Algorithm | Time (Avg) | Time (Worst) | Space | Notes |
|---------|------------|--------------|-------|-------|
| Greedy Best-First | O(b^m) | O(b^m) | O(bm) | Not optimal; depends heavily on heuristic |
| Uniform-Cost | O(b^{C*/ε}) | O(b^{C*/ε}) | O(b^{C*/ε}) | Optimal; expands least-cost node |
| A* Search | O(b^d) | O(b^d) | O(b^d) | Optimal and complete with admissible heuristic |
| IDA* | O(b^d) | O(b^d) | O(d) | Memory-efficient A* variant |
| Hill Climbing | - | - | O(1) | Fast but can get stuck in local maxima |
| Simulated Annealing | - | - | O(1) | Can escape local optima probabilistically |
| MCTS | Depends on simulations | - | O(N) | Used in complex games like Go |
---

<br />

> `n`: text/data size, `m`: pattern length, `V`: vertices, `E`: edges, `b`: branching factor, `d`: depth, `C*`: optimal solution cost, `ε`: step cost precision


