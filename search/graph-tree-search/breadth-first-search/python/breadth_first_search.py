from collections import deque
from typing import List, Dict, Set, Optional

def bfs_graph(
    graph: Dict[str, List[str]], 
    start: str, 
    target: Optional[str] = None
) -> List[str]:
    """
    Perform Breadth-First Search on a graph represented as an adjacency list.
    
    Args:
        graph (Dict[str, List[str]]): Adjacency list representation of the graph.
                                      Example: {'A': ['B', 'C'], 'B': ['D'], ...}
        start (str): Starting node for traversal.
        target (Optional[str]): Optional target node to search for.
    
    Returns:
        List[str]: Order of visited nodes. If target is provided and found,
                   returns path from start to target (if path reconstruction is added).
    """
    if start not in graph:
        raise ValueError(f"Start node '{start}' not in graph.")
    
    # Initialize queue with the start node
    queue = deque([start])
    visited: Set[str] = {start}
    traversal_order: List[str] = [start]
    
    while queue:
        current = queue.popleft()
        
        # If searching for a specific target
        if target and current == target:
            print(f"🎯 Target '{target}' found!")
            return traversal_order  
        
        # Explore all unvisited neighbours
        for neighbour in graph.get(current, []):
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)
                traversal_order.append(neighbour)
    
    return traversal_order


# 🌲 BFS for Binary Tree (Node-based structure)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bfs_tree(root: Optional[TreeNode]) -> List[int]:
    """
    Level-order traversal of a binary tree using BFS.
    
    Args:
        root (TreeNode or None): Root of the binary tree.
    
    Returns:
        List[int]: Values of nodes visited in level order.
    """
    if not root:
        return []
    
    queue = deque([root])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    
    return result


# 🧪 Example Usage & Testing
if __name__ == "__main__":
    # Example 1: Undirected Graph
    graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D'],
        'C': ['A', 'E', 'F'],
        'D': ['B'],
        'E': ['C'],
        'F': ['C']
    }
    
    print("🌐 BFS on Graph:")
    order = bfs_graph(graph, start='A')
    print("Traversal order:", " → ".join(order))
    # Output: A → B → C → D → E → F
    
    print("\n🔍 Searching for target 'E':")
    bfs_graph(graph, start='A', target='E')
    
    # Example 2: Binary Tree BFS (Level-order)
    #       1
    #      / \
    #     2   3
    #    /   / \
    #   4   5   6
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.right.left = TreeNode(5)
    root.right.right = TreeNode(6)
    
    print("\n🌳 BFS on Binary Tree (Level-order):")
    tree_order = bfs_tree(root)
    print("Level-order:", tree_order)
    # Output: [1, 2, 3, 4, 5, 6]