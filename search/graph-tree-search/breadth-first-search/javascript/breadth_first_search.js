/**
 * Perform Breadth-First Search on a graph represented as an adjacency list.
 * 
 * @param {Object.<string, string[]>} graph - Adjacency list representation of the graph.
 *                                            Example: { A: ['B', 'C'], B: ['D'], ... }
 * @param {string} start - Starting node for traversal.
 * @param {string} [target] - Optional target node to search for.
 * @returns {string[]} Order of visited nodes.
 */
function bfsGraph(graph, start, target = null) {
    if (!(start in graph)) {
        throw new Error(`Start node '${start}' not in graph.`);
    }

    // Initialize queue with the start node
    const queue = [start];
    const visited = new Set([start]);
    const traversalOrder = [start];
    let index = 0; // pointer to front of queue

    
    while (index < queue.length) {
        const current = queue[index++];

        // If searching for a specific target
        if (target && current === target) {
            console.log(`🎯 Target '${target}' found!`);
            return traversalOrder;
        }

        // Explore all unvisited neighbours
        const neighbours = graph[current] || [];
        for (const neighbour of neighbours) {
            if (!visited.has(neighbour)) {
                visited.add(neighbour);
                queue.push(neighbour); // enqueue at end
                traversalOrder.push(neighbour);
            }
        }
    }

    return traversalOrder;
}

// 🌲 BFS for Binary Tree (Node-based structure)
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Level-order traversal of a binary tree using BFS.
 * 
 * @param {TreeNode | null} root - Root of the binary tree.
 * @returns {number[]} Values of nodes visited in level order.
 */
function bfsTree(root) {
    if (!root) return [];

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
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

    console.log("🌐 BFS on Graph:");
    const order = bfsGraph(graph, 'A');
    console.log("Traversal order:", order.join(" → "));
    // Output: A → B → C → D → E → F

    console.log("\n🔍 Searching for target 'E':");
    bfsGraph(graph, 'A', 'E');

    // Example 2: Binary Tree BFS (Level-order)
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

    console.log("\n🌳 BFS on Binary Tree (Level-order):");
    const treeOrder = bfsTree(root);
    console.log("Level-order:", treeOrder);
    // Output: [1, 2, 3, 4, 5, 6]
})();