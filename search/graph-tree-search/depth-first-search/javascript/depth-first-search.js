/**
 * Perform Depth-First Search on a graph using RECURSION.
 * 
 * @param {Object.<string, string[]>} graph - Adjacency list representation of the graph.
 * @param {string} start - Starting node for traversal.
 * @param {string} [target] - Optional target node to search for.
 * @param {Set<string>} [visited] - Set of visited nodes (internal use for recursion).
 * @param {string[]} [traversalOrder] - Order of visited nodes (internal use).
 * @returns {string[]} Order of visited nodes. Stops early if target is found.
 */
function dfsGraphRecursive(graph, start, target = null, visited = null, traversalOrder = null) {
    if (visited === null) {
        visited = new Set();
        if (!(start in graph)) {
            throw new Error(`Start node '${start}' not in graph.`);
        }
    }
    
    if (traversalOrder === null) {
        traversalOrder = [];
    }
    
    // Mark current node as visited
    visited.add(start);
    traversalOrder.push(start);
    
    // Check if we found the target
    if (target && start === target) {
        console.log(`🎯 Target '${target}' found!`);
        return traversalOrder;
    }
    
    // Recursively visit all unvisited neighbours
    const neighbours = graph[start] || [];
    for (const neighbour of neighbours) {
        if (!visited.has(neighbour)) {
            const result = dfsGraphRecursive(graph, neighbour, target, visited, traversalOrder);
            // If target was found, return immediately
            if (target && result[result.length - 1] === target) {
                return result;
            }
        }
    }
    
    return traversalOrder;
}

/**
 * Perform Depth-First Search on a graph using ITERATION (explicit stack).
 * 
 * @param {Object.<string, string[]>} graph - Adjacency list representation of the graph.
 * @param {string} start - Starting node for traversal.
 * @param {string} [target] - Optional target node to search for.
 * @returns {string[]} Order of visited nodes. Stops early if target is found.
 */
function dfsGraphIterative(graph, start, target = null) {
    if (!(start in graph)) {
        throw new Error(`Start node '${start}' not in graph.`);
    }
    
    const stack = [start];
    const visited = new Set();
    const traversalOrder = [];
    
    while (stack.length > 0) {
        const current = stack.pop(); // Pop from end (LIFO)
        
        if (visited.has(current)) continue;
        
        visited.add(current);
        traversalOrder.push(current);
        
        // Check if we found the target
        if (target && current === target) {
            console.log(`🎯 Target '${target}' found!`);
            return traversalOrder;
        }
        
        // Add neighbours to stack in REVERSE order to maintain left-to-right traversal
        const neighbours = graph[current] || [];
        for (let i = neighbours.length - 1; i >= 0; i--) {
            const neighbour = neighbours[i];
            if (!visited.has(neighbour)) {
                stack.push(neighbour);
            }
        }
    }
    
    return traversalOrder;
}

// 🌲 DFS for Binary Tree (Node-based structure)
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Pre-order DFS traversal of a binary tree (Root → Left → Right).
 * @param {TreeNode | null} root - Root of the binary tree.
 * @returns {number[]} Values of nodes visited in pre-order.
 */
function dfsTreePreorder(root) {
    if (!root) return [];
    
    const result = [];
    
    function preorder(node) {
        if (node) {
            result.push(node.val);
            preorder(node.left);
            preorder(node.right);
        }
    }
    
    preorder(root);
    return result;
}

/**
 * In-order DFS traversal (Left → Root → Right).
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
function dfsTreeInorder(root) {
    if (!root) return [];
    
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}

/**
 * Post-order DFS traversal (Left → Right → Root).
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
function dfsTreePostorder(root) {
    if (!root) return [];
    
    const result = [];
    
    function postorder(node) {
        if (node) {
            postorder(node.left);
            postorder(node.right);
            result.push(node.val);
        }
    }
    
    postorder(root);
    return result;
}

// Iterative version for tree preorder
function dfsTreePreorderIterative(root) {
    if (!root) return [];
    
    const stack = [root];
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        
        // Push right first, then left (so left is processed first)
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return result;
}

// 🧪 Example Usage & Testing
(() => {
    // Example 1: Undirected Graph
    const graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D'],
        'C': ['A', 'E', 'F'],
        'D': ['B'],
        'E': ['C'],
        'F': ['C']
    };
    
    console.log("🌐 DFS on Graph (Recursive):");
    const orderRecursive = dfsGraphRecursive(graph, 'A');
    console.log("Traversal order:", orderRecursive.join(" → "));
    // Possible output: A → B → D → C → E → F
    
    console.log("\n🌐 DFS on  (Iterative):");
    const orderIterative = dfsGraphIterative(graph, 'A');
    console.log("Traversal order:", orderIterative.join(" → "));
    // Same output as recursive (due to reversed neighbour processing)
    
    console.log("\n🔍 Searching for target 'E' (Recursive):");
    dfsGraphRecursive(graph, 'A', 'E');
    
    // Example 2: Binary Tree DFS Traversals
    //       1
    //      / \
    //     2   3
    //    /   / \
    //   4   5   6
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    
    console.log("\n🌳 DFS Tree Traversals:");
    console.log("Pre-order:  ", dfsTreePreorder(root));      // [1, 2, 4, 3, 5, 6]
    console.log("In-order:   ", dfsTreeInorder(root));       // [4, 2, 1, 5, 3, 6]
    console.log("Post-order: ", dfsTreePostorder(root));     // [4, 2, 5, 6, 3, 1]
    console.log("Pre-order (iterative):", dfsTreePreorderIterative(root));  // [1, 2, 4, 3, 5, 6]
})();