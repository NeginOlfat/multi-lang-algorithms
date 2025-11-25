/**
 * Performs Iterative Deepening Depth-First Search (IDDFS) on a graph/tree.
 * 
 * @param {*} root - The starting node for the search.
 * @param {*} goal - The target node to find.
 * @param {Function} getNeighbors - A function that takes a node and returns its neighbors (e.g., getNeighbors(node) -> [neighbor1, neighbor2, ...]).
 * @param {number} maxDepth - The maximum depth to search (default is Infinity).
 * @returns {Array} An array [path, depth] if the goal is found, otherwise [null, -1].
 *                  - path: An array of nodes representing the path from root to goal.
 *                  - depth: The depth at which the goal was found.
 */
function iddfs(root, goal, getNeighbors, maxDepth = Infinity) {
    /**
     * Helper function for Depth-Limited DFS.
     * 
     * @param {*} currentNode - The current node being explored.
     * @param {*} goal - The target node to find.
     * @param {number} depthLimit - The maximum allowed depth for this iteration.
     * @param {number} currentDepth - The current depth in the recursion.
     * @param {Set} visited - A set of nodes already visited in the current path.
     * @param {Array} path - The current path being explored.
     * @returns {boolean} True if the goal is found, false otherwise.
     */
    function depthLimitedDfs(currentNode, goal, depthLimit, currentDepth, visited, path) {
        console.log(`  DLS: Visiting node '${currentNode}' at depth ${currentDepth} (limit: ${depthLimit})`);
        
        // If we have reached the depth limit, stop exploring further
        if (currentDepth > depthLimit) {
            console.log(`    DLS: Depth limit reached at node '${currentNode}', returning false`);
            return false;
        }

        // Add current node to the path
        path.push(currentNode);
        console.log(`    DLS: Added '${currentNode}' to path. Current path: [${path.join(', ')}]`);

        // Check if we have reached the goal
        if (currentNode === goal) {
            console.log(`    DLS: GOAL '${goal}' found! Returning true.`);
            return true;
        }

        // Mark the current node as visited in this path
        visited.add(currentNode);
        console.log(`    DLS: Marked '${currentNode}' as visited. Visited set: [${Array.from(visited).join(', ')}]`);

        // Explore neighbors
        const neighbors = getNeighbors(currentNode);
        console.log(`    DLS: Exploring neighbors of '${currentNode}': [${neighbors.join(', ')}]`);
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                console.log(`    DLS: Recursively exploring neighbor '${neighbor}'`);
                if (depthLimitedDfs(neighbor, goal, depthLimit, currentDepth + 1, visited, path)) {
                    console.log(`    DLS: Goal found through neighbor '${neighbor}', returning true`);
                    return true; // Goal found in this path
                }
                console.log(`    DLS: Backtracking from neighbor '${neighbor}'`);
            } else {
                console.log(`    DLS: Skipping already visited neighbor '${neighbor}'`);
            }
        }

        // Backtrack: remove current node from path and visited set
        path.pop();
        visited.delete(currentNode);
        console.log(`    DLS: Backtracked from '${currentNode}'. Removed from path and visited set. Path: [${path.join(', ')}], Visited: [${Array.from(visited).join(', ')}]`);
        return false;
    }

    // Main IDDFS loop: increment depth limit from 0 upwards
    let depthLimit = 0;
    while (depthLimit <= maxDepth) {
        console.log(`\n--- IDDFS Iteration with depth limit: ${depthLimit} ---`);
        const visited = new Set(); // Reset visited set for each depth iteration
        const path = [];           // Reset path for each depth iteration

        console.log(`Starting DLS from root '${root}' with depth limit ${depthLimit}`);
        
        // Perform a depth-limited DFS with the current depth limit
        if (depthLimitedDfs(root, goal, depthLimit, 0, visited, path)) {
            console.log(`\n*** GOAL '${goal}' found at depth limit ${depthLimit}! ***`);
            console.log(`Final path: [${path.join(' -> ')}]`);
            // Goal found at this depth limit
            return [path, depthLimit]; // Return the path and the depth it was found at
        } else {
            console.log(`\nGoal not found at depth limit ${depthLimit}. Increasing depth limit.`);
        }

        depthLimit++;
    }

    // Goal not found within maxDepth
    console.log(`\n*** Goal '${goal}' was not found within max depth ${maxDepth}. ***`);
    return [null, -1];
}


// --- Example Usage ---

// Define a simple graph structure using an adjacency list (object)
const graph = {
    'A': ['B', 'C', 'D'],
    'B': ['A', 'E', 'F'],
    'C': ['A'],
    'D': ['A', 'G', 'H'],
    'E': ['B', 'I'],
    'F': ['B'],
    'G': ['D'],
    'H': ['D'],
    'I': ['E']
};

function getNeighbors(node) {
    /** Function to get neighbors of a given node from the graph. */
    return graph[node] || [];
}

// Example: Find path from 'A' to 'G'
const startNode = 'A';
const targetNode = 'G';

console.log(`Starting IDDFS from '${startNode}' to find '${targetNode}'`);
const [path, depthFound] = iddfs(startNode, targetNode, getNeighbors);

if (path) {
    console.log(`\n🎉 Final Result: Goal '${targetNode}' found at depth ${depthFound}!`);
    console.log(`Path: ${path.join(' -> ')}`);
} else {
    console.log(`\n❌ Final Result: Goal '${targetNode}' was not found within the maximum allowed depth.`);
}