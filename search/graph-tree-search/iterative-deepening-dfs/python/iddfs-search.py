from collections import deque

def iddfs(root, goal, get_neighbors, max_depth=float('inf')):
    """
    Performs Iterative Deepening Depth-First Search (IDDFS) on a graph/tree.
    
    Args:
        root: The starting node for the search.
        goal: The target node to find.
        get_neighbors: A function that takes a node and returns its neighbors (e.g., get_neighbors(node) -> [neighbor1, neighbor2, ...]).
        max_depth: The maximum depth to search (default is infinite).

    Returns:
        A tuple (path, depth) if the goal is found, otherwise (None, -1).
        - path: A list of nodes representing the path from root to goal.
        - depth: The depth at which the goal was found.
    """
    
    def depth_limited_dfs(current_node, goal, depth_limit, current_depth, visited, path):
        """
        Helper function for Depth-Limited DFS.
        
        Args:
            current_node: The current node being explored.
            goal: The target node to find.
            depth_limit: The maximum allowed depth for this iteration.
            current_depth: The current depth in the recursion.
            visited: A set of nodes already visited in the current path.
            path: The current path being explored.

        Returns:
            True if the goal is found, False otherwise.
        """
        print(f"  DLS: Visiting node '{current_node}' at depth {current_depth} (limit: {depth_limit})")
        
        # If we have reached the depth limit, stop exploring further
        if current_depth > depth_limit:
            print(f"    DLS: Depth limit reached at node '{current_node}', returning False")
            return False

        # Add current node to the path
        path.append(current_node)
        print(f"    DLS: Added '{current_node}' to path. Current path: [{', '.join(path)}]")

        # Check if we have reached the goal
        if current_node == goal:
            print(f"    DLS: GOAL '{goal}' found! Returning True.")
            return True

        # Mark the current node as visited in this path
        visited.add(current_node)
        print(f"    DLS: Marked '{current_node}' as visited. Visited set: [{', '.join(visited)}]")

        # Explore neighbors
        neighbors = get_neighbors(current_node)
        print(f"    DLS: Exploring neighbors of '{current_node}': [{', '.join(neighbors)}]")
        
        for neighbor in neighbors:
            if neighbor not in visited:
                print(f"    DLS: Recursively exploring neighbor '{neighbor}'")
                if depth_limited_dfs(neighbor, goal, depth_limit, current_depth + 1, visited, path):
                    print(f"    DLS: Goal found through neighbor '{neighbor}', returning True")
                    return True  # Goal found in this path
                print(f"    DLS: Backtracking from neighbor '{neighbor}'")
            else:
                print(f"    DLS: Skipping already visited neighbor '{neighbor}'")

        # Backtrack: remove current node from path and visited set
        path.pop()
        visited.discard(current_node)
        print(f"    DLS: Backtracked from '{current_node}'. Removed from path and visited set. Path: [{', '.join(path)}], Visited: [{', '.join(visited)}]")
        return False

    # Main IDDFS loop: increment depth limit from 0 upwards
    depth_limit = 0
    while depth_limit <= max_depth:
        print(f"\n--- IDDFS Iteration with depth limit: {depth_limit} ---")
        visited = set()  # Reset visited set for each depth iteration
        path = []        # Reset path for each depth iteration

        print(f"Starting DLS from root '{root}' with depth limit {depth_limit}")
        
        # Perform a depth-limited DFS with the current depth limit
        if depth_limited_dfs(root, goal, depth_limit, 0, visited, path):
            print(f"\n*** GOAL '{goal}' found at depth limit {depth_limit}! ***")
            print(f"Final path: [{' -> '.join(path)}]")
            # Goal found at this depth limit
            return path, depth_limit  # Return the path and the depth it was found at
        else:
            print(f"\nGoal not found at depth limit {depth_limit}. Increasing depth limit.")

        depth_limit += 1

    # Goal not found within max_depth
    print(f"\n*** Goal '{goal}' was not found within max depth {max_depth}. ***")
    return None, -1


# --- Example Usage ---

# Define a simple graph structure using an adjacency list (dictionary)
graph = {
    'A': ['B', 'C', 'D'],
    'B': ['A', 'E', 'F'],
    'C': ['A'],
    'D': ['A', 'G', 'H'],
    'E': ['B', 'I'],
    'F': ['B'],
    'G': ['D'],
    'H': ['D'],
    'I': ['E']
}

def get_neighbors(node):
    """Function to get neighbors of a given node from the graph."""
    return graph.get(node, [])

# Example: Find path from 'A' to 'G'
start_node = 'A'
target_node = 'G'

print(f"Starting IDDFS from '{start_node}' to find '{target_node}'")
path, depth_found = iddfs(start_node, target_node, get_neighbors)

if path:
    print(f"\n🎉 Final Result: Goal '{target_node}' found at depth {depth_found}!")
    print(f"Path: {' -> '.join(path)}")
else:
    print(f"\n❌ Final Result: Goal '{target_node}' was not found within the maximum allowed depth.")