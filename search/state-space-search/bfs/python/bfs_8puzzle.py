from collections import deque

def bfs_8puzzle(initial_state, goal_state=(1, 2, 3, 4, 5, 6, 7, 8, 0)):
    """
    Solves the 8-puzzle using Breadth-First Search (BFS).
    
    Args:
        initial_state (tuple): A 9-element tuple representing the initial puzzle configuration.
                               Blank tile is represented by 0.
        goal_state (tuple): The target configuration (default is standard goal).
    
    Returns:
        list of tuples: The sequence of states from initial to goal, or None if unsolvable.
    """
    # Input validation
    if len(initial_state) != 9 or len(goal_state) != 9:
        raise ValueError("State must be a 9-element tuple.")
    
    if set(initial_state) != set(goal_state):
        print("Unsolvable: initial and goal states have different tiles.")
        return None

    # Early exit if already solved
    if initial_state == goal_state:
        return [initial_state]

    # Directions: up, down, left, right (row and col offsets)
    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    move_names = ["Up", "Down", "Left", "Right"]

    def get_blank_pos(state):
        """Return (row, col) of the blank (0) tile."""
        idx = state.index(0)
        return idx // 3, idx % 3

    def get_neighbors(state):
        """Generate all valid successor states from the current state."""
        row, col = get_blank_pos(state)
        neighbors = []
        state_list = list(state)

        for (dr, dc), name in zip(moves, move_names):
            new_row, new_col = row + dr, col + dc
            if 0 <= new_row < 3 and 0 <= new_col < 3:
                # Calculate new index
                new_idx = new_row * 3 + new_col
                blank_idx = row * 3 + col

                # Swap blank with neighbor
                new_state = state_list[:]
                new_state[blank_idx], new_state[new_idx] = new_state[new_idx], new_state[blank_idx]
                neighbors.append(tuple(new_state))

        return neighbors

    # BFS initialization
    queue = deque()
    queue.append((initial_state, [initial_state]))  # (current_state, path_to_it)
    visited = {initial_state}

    print(f"Starting BFS from: {initial_state}")
    print(f"Goal state:        {goal_state}")
    print("-" * 50)

    nodes_expanded = 0

    while queue:
        current_state, path = queue.popleft()
        nodes_expanded += 1

        # Generate successors
        for neighbor in get_neighbors(current_state):
            if neighbor == goal_state:
                print(f"\n✅ Goal found after expanding {nodes_expanded} states!")
                solution_path = path + [neighbor]
                print(f"Solution length: {len(solution_path) - 1} moves")
                return solution_path

            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    print("❌ No solution found (should not happen for valid 8-puzzle instances).")
    return None


def print_state(state):
    """Pretty-print a 9-tuple state as a 3x3 grid."""
    for i in range(3):
        print(" ".join(str(x) if x != 0 else " " for x in state[i * 3:i * 3 + 3]))
    print()


# --- Example Usage ---
if __name__ == "__main__":
    # Example initial state (solvable)
    initial = (1, 2, 3,
               4, 0, 5,
               6, 7, 8)

    solution = bfs_8puzzle(initial)

    if solution:
        print("\n" + "=" * 30)
        print("SOLUTION PATH:")
        print("=" * 30)
        for i, state in enumerate(solution):
            print(f"Step {i}:")
            print_state(state)
    else:
        print("No solution exists for this configuration.")