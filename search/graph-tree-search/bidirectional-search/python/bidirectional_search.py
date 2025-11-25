from collections import deque

def bidirectional_search(graph, start, goal):
    """
    Performs Bidirectional Search on an undirected graph to find the shortest path.
    
    Args:
        graph: Dictionary representing adjacency list (e.g., {'A': ['B', 'C'], ...})
        start: Starting node
        goal: Target node
    
    Returns:
        List representing the shortest path from start to goal, or None if no path exists.
    """
    
    # Handle edge cases
    if start == goal:
        return [start]
    
    if start not in graph or goal not in graph:
        return None
    
    # Initialize data structures for forward search (from start)
    forward_queue = deque([start])
    forward_visited = {start: None}  # Maps node -> parent for path reconstruction
    
    # Initialize data structures for backward search (from goal)
    backward_queue = deque([goal])
    backward_visited = {goal: None}  # Maps node -> parent for path reconstruction
    
    # Alternate between forward and backward searches
    forward_turn = True
    
    while forward_queue and backward_queue:
        # Determine which search to expand in this iteration
        if forward_turn:
            # Expand forward search (from start)
            current_node = forward_queue.popleft()
            neighbors = graph.get(current_node, [])
            
            print(f"Forward search expanding node: {current_node}")
            print(f"  Forward visited: {list(forward_visited.keys())}")
            
            for neighbor in neighbors:
                if neighbor not in forward_visited:
                    forward_visited[neighbor] = current_node
                    forward_queue.append(neighbor)
                    
                    # Check if this neighbor has been visited by backward search
                    if neighbor in backward_visited:
                        print(f"  Intersection found at node: {neighbor}")
                        return _reconstruct_path(forward_visited, backward_visited, neighbor, start, goal)
            
            forward_turn = False  # Switch to backward search next
            
        else:
            # Expand backward search (from goal)
            current_node = backward_queue.popleft()
            neighbors = graph.get(current_node, [])
            
            print(f"Backward search expanding node: {current_node}")
            print(f"  Backward visited: {list(backward_visited.keys())}")
            
            for neighbor in neighbors:
                if neighbor not in backward_visited:
                    backward_visited[neighbor] = current_node
                    backward_queue.append(neighbor)
                    
                    # Check if this neighbor has been visited by forward search
                    if neighbor in forward_visited:
                        print(f"  Intersection found at node: {neighbor}")
                        return _reconstruct_path(forward_visited, backward_visited, neighbor, start, goal)
            
            forward_turn = True  # Switch to forward search next
        
        print(f"Current state - Forward frontier: {list(forward_queue)}")
        print(f"Current state - Backward frontier: {list(backward_queue)}")
        print("-" * 50)
    
    # No path found
    return None


def _reconstruct_path(forward_visited, backward_visited, intersection_node, start, goal):
    """
    Reconstructs the complete path from start to goal through the intersection node.
    
    Args:
        forward_visited: Dictionary from forward search (node -> parent)
        backward_visited: Dictionary from backward search (node -> parent)
        intersection_node: The node where the two searches met
        start: Starting node
        goal: Target node
    
    Returns:
        Complete path from start to goal as a list of nodes.
    """
    print(f"\nReconstructing path through intersection node: {intersection_node}")
    
    # Build path from start to intersection (forward direction)
    forward_path = []
    current = intersection_node
    while current is not None:
        forward_path.append(current)
        current = forward_visited[current]
    forward_path.reverse()  # Reverse to get start -> intersection
    
    print(f"Forward path (start -> intersection): {forward_path}")
    
    # Build path from intersection to goal (backward direction)
    backward_path = []
    current = intersection_node
    while current is not None:
        backward_path.append(current)
        current = backward_visited[current]
    backward_path = backward_path[1:]  # Remove intersection node to avoid duplication
    
    print(f"Backward path (intersection -> goal): {backward_path}")
    
    # Combine both paths
    complete_path = forward_path + backward_path
    print(f"Complete path: {complete_path}")
    
    return complete_path


# --- Example Usage ---

if __name__ == "__main__":
    # Define a sample graph (undirected)
    graph = {
        'A': ['B', 'F'],
        'B': ['A', 'C', 'G'],
        'C': ['B', 'D', 'H'],
        'D': ['C', 'E', 'I'],
        'E': ['D', 'J'],
        'F': ['A', 'G'],
        'G': ['B', 'F', 'H'],
        'H': ['C', 'G', 'I'],
        'I': ['D', 'H', 'J'],
        'J': ['E', 'I']
    }
    
    start_node = 'A'
    goal_node = 'E'
    
    print(f"Starting Bidirectional Search from '{start_node}' to '{goal_node}'")
    print("=" * 60)
    
    path = bidirectional_search(graph, start_node, goal_node)
    
    print("\n" + "=" * 60)
    if path:
        print(f"🎉 Path found! Length: {len(path) - 1}")
        print(f"Path: {' -> '.join(path)}")
    else:
        print("❌ No path found between the start and goal nodes.")