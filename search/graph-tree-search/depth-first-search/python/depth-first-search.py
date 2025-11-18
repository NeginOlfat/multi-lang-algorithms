from typing import List, Dict, Set, Optional

def dfs_graph_recursive(
    graph: Dict[str, List[str]], 
    start: str, 
    target: Optional[str] = None,
    visited: Optional[Set[str]] = None,
    traversal_order: Optional[List[str]] = None
) -> List[str]:
    """
    Perform Depth-First Search on a graph using RECURSION.
    
    Args:
        graph (Dict[str, List[str]]): Adjacency list representation of the graph.
        start (str): Starting node for traversal.
        target (Optional[str]): Optional target node to search for.
        visited (Set[str]): Set of visited nodes (used internally for recursion).
        traversal_order (List[str]): Order of visited nodes (used internally).
    
    Returns:
        List[str]: Order of visited nodes. Stops early if target is found.
    """
    if visited is None:
        visited = set()
        if start not in graph:
            raise ValueError(f"Start node '{start}' not in graph.")
    
    if traversal_order is None:
        traversal_order = []
    
    # Mark current node as visited
    visited.add(start)
    traversal_order.append(start)
    
    # Check if we found the target
    if target and start == target:
        print(f"🎯 Target '{target}' found!")
        return traversal_order
    
    # Recursively visit all unvisited neighbours
    for neighbour in graph.get(start, []):
        if neighbour not in visited:
            result = dfs_graph_recursive(graph, neighbour, target, visited, traversal_order)
            # If target was found in recursive call, return immediately
            if target and neighbour in result and result[-1] == target:
                return result
    
    return traversal_order


def dfs_graph_iterative(
    graph: Dict[str, List[str]], 
    start: str, 
    target: Optional[str] = None
) -> List[str]:
    """
    Perform Depth-First Search on a graph using ITERATION (explicit stack).
    
    Args:
        graph (Dict[str, List[str]]): Adjacency list representation of the graph.
        start (str): Starting node for traversal.
        target (Optional[str]): Optional target node to search for.
    
    Returns:
        List[str]: Order of visited nodes. Stops early if target is found.
    """
    if start not in graph:
        raise ValueError(f"Start node '{start}' not in graph.")
    
    stack = [start]
    visited: Set[str] = set()
    traversal_order: List[str] = []
    
    while stack:
        current = stack.pop()  # Pop from end (LIFO)
        
        if current in visited:
            continue
            
        visited.add(current)
        traversal_order.append(current)
        
        # Check if we found the target
        if target and current == target:
            print(f"🎯 Target '{target}' found!")
            return traversal_order
        
        # Add neighbours to stack in REVERSE order to maintain left-to-right traversal
        # (This ensures same order as recursive version when neighbours are processed alphabetically)
        for neighbour in reversed(graph.get(current, [])):
            if neighbour not in visited:
                stack.append(neighbour)
    
    return traversal_order


# 🌲 DFS for Binary Tree (Node-based structure)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def dfs_tree_preorder(root: Optional[TreeNode]) -> List[int]:
    """
    Pre-order DFS traversal of a binary tree (Root → Left → Right).
    
    Args:
        root (TreeNode or None): Root of the binary tree.
    
    Returns:
        List[int]: Values of nodes visited in pre-order.
    """
    if not root:
        return []
    
    result = []
    
    def preorder(node):
        if node:
            result.append(node.val)
            preorder(node.left)
            preorder(node.right)
    
    preorder(root)
    return result

def dfs_tree_inorder(root: Optional[TreeNode]) -> List[int]:
    """In-order DFS traversal (Left → Root → Right)."""
    if not root:
        return []
    
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    
    inorder(root)
    return result

def dfs_tree_postorder(root: Optional[TreeNode]) -> List[int]:
    """Post-order DFS traversal (Left → Right → Root)."""
    if not root:
        return []
    
    result = []
    
    def postorder(node):
        if node:
            postorder(node.left)
            postorder(node.right)
            result.append(node.val)
    
    postorder(root)
    return result

# Iterative version for tree preorder 
def dfs_tree_preorder_iterative(root: Optional[TreeNode]) -> List[int]:
    """Iterative pre-order traversal using explicit stack."""
    if not root:
        return []
    
    stack = [root]
    result = []
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        # Push right first, then left (so left is processed first)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
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
    
    print("🌐 DFS on Graph (Recursive):")
    order_recursive = dfs_graph_recursive(graph, start='A')
    print("Traversal order:", " → ".join(order_recursive))
    # Possible output: A → B → D → C → E → F
    
    print("\n🌐 DFS on Graph (Iterative):")
    order_iterative = dfs_graph_iterative(graph, start='A')
    print("Traversal order:", " → ".join(order_iterative))
    # Same output as recursive (due to reversed neighbour processing)
    
    print("\n🔍 Searching for target 'E' (Recursive):")
    dfs_graph_recursive(graph, start='A', target='E')
    
    # Example 2: Binary Tree DFS Traversals
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
    
    print("\n🌳 DFS Tree Traversals:")
    print("Pre-order:  ", dfs_tree_preorder(root))      # [1, 2, 4, 3, 5, 6]
    print("In-order:   ", dfs_tree_inorder(root))       # [4, 2, 1, 5, 3, 6]
    print("Post-order: ", dfs_tree_postorder(root))     # [4, 2, 5, 6, 3, 1]
    print("Pre-order (iterative):", dfs_tree_preorder_iterative(root))  # [1, 2, 4, 3, 5, 6]