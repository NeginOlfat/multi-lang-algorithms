## Output
```
Starting IDDFS from 'A' to find 'G'

--- IDDFS Iteration with depth limit: 0 ---
Starting DLS from root 'A' with depth limit 0
  DLS: Visiting node 'A' at depth 0 (limit: 0)
    DLS: Added 'A' to path. Current path: [A]
    DLS: Marked 'A' as visited. Visited set: [A]
    DLS: Exploring neighbors of 'A': [B, C, D]
    DLS: Recursively exploring neighbor 'B'
  DLS: Visiting node 'B' at depth 1 (limit: 0)
    DLS: Depth limit reached at node 'B', returning False
    DLS: Backtracking from neighbor 'B'
    DLS: Recursively exploring neighbor 'C'
  DLS: Visiting node 'C' at depth 1 (limit: 0)
    DLS: Depth limit reached at node 'C', returning False
    DLS: Backtracking from neighbor 'C'
    DLS: Recursively exploring neighbor 'D'
  DLS: Visiting node 'D' at depth 1 (limit: 0)
    DLS: Depth limit reached at node 'D', returning False
    DLS: Backtracking from neighbor 'D'
    DLS: Backtracked from 'A'. Removed from path and visited set. Path: [], Visited: []

Goal not found at depth limit 0. Increasing depth limit.

--- IDDFS Iteration with depth limit: 1 ---
Starting DLS from root 'A' with depth limit 1
  DLS: Visiting node 'A' at depth 0 (limit: 1)
    DLS: Added 'A' to path. Current path: [A]
    DLS: Marked 'A' as visited. Visited set: [A]
    DLS: Exploring neighbors of 'A': [B, C, D]
    DLS: Recursively exploring neighbor 'B'
  DLS: Visiting node 'B' at depth 1 (limit: 1)
    DLS: Added 'B' to path. Current path: [A, B]
    DLS: Marked 'B' as visited. Visited set: [B, A]
    DLS: Exploring neighbors of 'B': [A, E, F]
    DLS: Skipping already visited neighbor 'A'
    DLS: Recursively exploring neighbor 'E'
  DLS: Visiting node 'E' at depth 2 (limit: 1)
    DLS: Depth limit reached at node 'E', returning False
    DLS: Backtracking from neighbor 'E'
    DLS: Recursively exploring neighbor 'F'
  DLS: Visiting node 'F' at depth 2 (limit: 1)
    DLS: Depth limit reached at node 'F', returning False
    DLS: Backtracking from neighbor 'F'
    DLS: Backtracked from 'B'. Removed from path and visited set. Path: [A], Visited: [A]
    DLS: Backtracking from neighbor 'B'
    DLS: Recursively exploring neighbor 'C'
  DLS: Visiting node 'C' at depth 1 (limit: 1)
    DLS: Added 'C' to path. Current path: [A, C]
    DLS: Marked 'C' as visited. Visited set: [A, C]
    DLS: Exploring neighbors of 'C': [A]
    DLS: Skipping already visited neighbor 'A'
    DLS: Backtracked from 'C'. Removed from path and visited set. Path: [A], Visited: [A]
    DLS: Backtracking from neighbor 'C'
    DLS: Recursively exploring neighbor 'D'
  DLS: Visiting node 'D' at depth 1 (limit: 1)
    DLS: Added 'D' to path. Current path: [A, D]
    DLS: Marked 'D' as visited. Visited set: [D, A]
    DLS: Exploring neighbors of 'D': [A, G, H]
    DLS: Skipping already visited neighbor 'A'
    DLS: Recursively exploring neighbor 'G'
  DLS: Visiting node 'G' at depth 2 (limit: 1)
    DLS: Depth limit reached at node 'G', returning False
    DLS: Backtracking from neighbor 'G'
    DLS: Recursively exploring neighbor 'H'
  DLS: Visiting node 'H' at depth 2 (limit: 1)
    DLS: Depth limit reached at node 'H', returning False
    DLS: Backtracking from neighbor 'H'
    DLS: Backtracked from 'D'. Removed from path and visited set. Path: [A], Visited: [A]
    DLS: Backtracking from neighbor 'D'
    DLS: Backtracked from 'A'. Removed from path and visited set. Path: [], Visited: []

Goal not found at depth limit 1. Increasing depth limit.

--- IDDFS Iteration with depth limit: 2 ---
Starting DLS from root 'A' with depth limit 2
  DLS: Visiting node 'A' at depth 0 (limit: 2)
    DLS: Added 'A' to path. Current path: [A]
    DLS: Marked 'A' as visited. Visited set: [A]
    DLS: Exploring neighbors of 'A': [B, C, D]
    DLS: Recursively exploring neighbor 'B'
  DLS: Visiting node 'B' at depth 1 (limit: 2)
    DLS: Added 'B' to path. Current path: [A, B]
    DLS: Marked 'B' as visited. Visited set: [B, A]
    DLS: Exploring neighbors of 'B': [A, E, F]
    DLS: Skipping already visited neighbor 'A'
    DLS: Recursively exploring neighbor 'E'
  DLS: Visiting node 'E' at depth 2 (limit: 2)
    DLS: Added 'E' to path. Current path: [A, B, E]
    DLS: Marked 'E' as visited. Visited set: [B, A, E]
    DLS: Exploring neighbors of 'E': [B, I]
    DLS: Skipping already visited neighbor 'B'
    DLS: Recursively exploring neighbor 'I'
  DLS: Visiting node 'I' at depth 3 (limit: 2)
    DLS: Depth limit reached at node 'I', returning False
    DLS: Backtracking from neighbor 'I'
    DLS: Backtracked from 'E'. Removed from path and visited set. Path: [A, B], Visited: [B, A]
    DLS: Backtracking from neighbor 'E'
    DLS: Recursively exploring neighbor 'F'
  DLS: Visiting node 'F' at depth 2 (limit: 2)
    DLS: Added 'F' to path. Current path: [A, B, F]
    DLS: Marked 'F' as visited. Visited set: [B, A, F]
    DLS: Exploring neighbors of 'F': [B]
    DLS: Skipping already visited neighbor 'B'
    DLS: Backtracked from 'F'. Removed from path and visited set. Path: [A, B], Visited: [B, A]
    DLS: Backtracking from neighbor 'F'
    DLS: Backtracked from 'B'. Removed from path and visited set. Path: [A], Visited: [A]
    DLS: Backtracking from neighbor 'B'
    DLS: Recursively exploring neighbor 'C'
  DLS: Visiting node 'C' at depth 1 (limit: 2)
    DLS: Added 'C' to path. Current path: [A, C]
    DLS: Marked 'C' as visited. Visited set: [A, C]
    DLS: Exploring neighbors of 'C': [A]
    DLS: Skipping already visited neighbor 'A'
    DLS: Backtracked from 'C'. Removed from path and visited set. Path: [A], Visited: [A]
    DLS: Backtracking from neighbor 'C'
    DLS: Recursively exploring neighbor 'D'
  DLS: Visiting node 'D' at depth 1 (limit: 2)
    DLS: Added 'D' to path. Current path: [A, D]
    DLS: Marked 'D' as visited. Visited set: [D, A]
    DLS: Exploring neighbors of 'D': [A, G, H]
    DLS: Skipping already visited neighbor 'A'
    DLS: Recursively exploring neighbor 'G'
  DLS: Visiting node 'G' at depth 2 (limit: 2)
    DLS: Added 'G' to path. Current path: [A, D, G]
    DLS: GOAL 'G' found! Returning True.
    DLS: Goal found through neighbor 'G', returning True
    DLS: Goal found through neighbor 'D', returning True

*** GOAL 'G' found at depth limit 2! ***
Final path: [A -> D -> G]

🎉 Final Result: Goal 'G' found at depth 2!
Path: A -> D -> G
```