
def dfs_maze(maze):
    """
    Solves a maze using Depth-First Search (DFS).
    
    Args:
        maze (list of str): A rectangular grid where:
            'S' = start, 'G' = goal, '#' = wall, '.' = open path
    
    Returns:
        list of (row, col): Path from start to goal, or None if no path exists.
    """
    # Parse maze dimensions
    rows, cols = len(maze), len(maze[0])
    
    # Find start and goal positions
    start = goal = None
    for r in range(rows):
        for c in range(cols):
            if maze[r][c] == 'S':
                start = (r, c)
            elif maze[r][c] == 'G':
                goal = (r, c)
    
    if start is None or goal is None:
        raise ValueError("Maze must contain exactly one 'S' and one 'G'")
    
    # Directions: Right, Down, Left, Up (order affects DFS path)
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    dir_names = ["Right", "Down", "Left", "Up"]
    
    # DFS initialization
    stack = []
    stack.append((start, [start]))  # (current_position, path_to_it)
    visited = {start}
    
    print(f"Starting DFS from: {start}")
    print(f"Goal position:      {goal}")
    print("-" * 40)
    
    nodes_expanded = 0
    
    while stack:
        (r, c), path = stack.pop()
        nodes_expanded += 1
        
        # Check if we reached the goal
        if (r, c) == goal:
            print(f"\n✅ Goal found after expanding {nodes_expanded} states!")
            print(f"Solution length: {len(path) - 1} moves")
            return path
        
        # Explore neighbors in reverse order to maintain "Right → Down → Left → Up" priority
        # (since stack is LIFO, we push in reverse)
        for (dr, dc), name in reversed(list(zip(directions, dir_names))):
            nr, nc = r + dr, c + dc
            
            # Check bounds
            if 0 <= nr < rows and 0 <= nc < cols:
                # Check if cell is passable and not visited
                if maze[nr][nc] != '#' and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    new_path = path + [(nr, nc)]
                    stack.append(((nr, nc), new_path))
                    print(f"  → Moving {name} to ({nr}, {nc})")
    
    print("❌ No path found to the goal.")
    return None


def print_maze_with_path(maze, path=None):
    """
    Pretty-print the maze, optionally highlighting the solution path.
    """
    rows = len(maze)
    output = []
    
    for r in range(rows):
        row_str = ""
        for c in range(len(maze[r])):
            if path and (r, c) in path:
                if maze[r][c] in 'SG':
                    row_str += maze[r][c]
                else:
                    row_str += '*'  # Path marker
            else:
                row_str += maze[r][c] if maze[r][c] != '.' else ' '
        output.append(row_str)
    
    for line in output:
        print(line)
    print()


# --- Example Usage ---
if __name__ == "__main__":
    # Define the 5x5 maze from the explanation
    maze_grid = [
        "S..#.",
        "##.#.",
        ".....",
        "####.",
        "....G"
    ]
    
    print("Original Maze:")
    print_maze_with_path(maze_grid)
    
    solution_path = dfs_maze(maze_grid)
    
    if solution_path:
        print("\n" + "=" * 30)
        print("SOLUTION PATH (S → * → G):")
        print("=" * 30)
        print_maze_with_path(maze_grid, solution_path)
        
        print("Path coordinates:")
        for i, pos in enumerate(solution_path):
            print(f"  Step {i}: {pos}")
    else:
        print("No solution exists for this maze.")