/**
 * Performs Bidirectional Search on an undirected graph to find the shortest path.
 * 
 * @param {Object} graph - Adjacency list representation (e.g., {'A': ['B', 'C'], ...})
 * @param {*} start - Starting node
 * @param {*} goal - Target node
 * @returns {Array|null} Array representing the shortest path from start to goal, or null if no path exists.
 */
function bidirectionalSearch(graph, start, goal) {
    // Handle edge cases
    if (start === goal) {
        console.log("Start and goal are the same node.");
        return [start];
    }
    
    if (!(start in graph) || !(goal in graph)) {
        console.log("Start or goal node not found in graph.");
        return null;
    }
    
    // Initialize data structures for forward search (from start)
    const forwardQueue = [start];
    const forwardVisited = new Map(); // Maps node -> parent for path reconstruction
    forwardVisited.set(start, null);
    
    // Initialize data structures for backward search (from goal)
    const backwardQueue = [goal];
    const backwardVisited = new Map(); // Maps node -> parent for path reconstruction
    backwardVisited.set(goal, null);
    
    // Alternate between forward and backward searches
    let forwardTurn = true;
    
    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
        // Determine which search to expand in this iteration
        if (forwardTurn) {
            // Expand forward search (from start)
            const currentNode = forwardQueue.shift();
            const neighbors = graph[currentNode] || [];
            
            console.log(`Forward search expanding node: ${currentNode}`);
            console.log(`  Forward visited: [${Array.from(forwardVisited.keys()).join(', ')}]`);
            
            for (const neighbor of neighbors) {
                if (!forwardVisited.has(neighbor)) {
                    forwardVisited.set(neighbor, currentNode);
                    forwardQueue.push(neighbor);
                    
                    // Check if this neighbor has been visited by backward search
                    if (backwardVisited.has(neighbor)) {
                        console.log(`  Intersection found at node: ${neighbor}`);
                        return reconstructPath(forwardVisited, backwardVisited, neighbor, start, goal);
                    }
                }
            }
            
            forwardTurn = false; // Switch to backward search next
            
        } else {
            // Expand backward search (from goal)
            const currentNode = backwardQueue.shift();
            const neighbors = graph[currentNode] || [];
            
            console.log(`Backward search expanding node: ${currentNode}`);
            console.log(`  Backward visited: [${Array.from(backwardVisited.keys()).join(', ')}]`);
            
            for (const neighbor of neighbors) {
                if (!backwardVisited.has(neighbor)) {
                    backwardVisited.set(neighbor, currentNode);
                    backwardQueue.push(neighbor);
                    
                    // Check if this neighbor has been visited by forward search
                    if (forwardVisited.has(neighbor)) {
                        console.log(`  Intersection found at node: ${neighbor}`);
                        return reconstructPath(forwardVisited, backwardVisited, neighbor, start, goal);
                    }
                }
            }
            
            forwardTurn = true; // Switch to forward search next
        }
        
        console.log(`Current state - Forward frontier: [${forwardQueue.join(', ')}]`);
        console.log(`Current state - Backward frontier: [${backwardQueue.join(', ')}]`);
        console.log("-".repeat(50));
    }
    
    // No path found
    return null;
}

/**
 * Reconstructs the complete path from start to goal through the intersection node.
 * 
 * @param {Map} forwardVisited - Map from forward search (node -> parent)
 * @param {Map} backwardVisited - Map from backward search (node -> parent)
 * @param {*} intersectionNode - The node where the two searches met
 * @param {*} start - Starting node
 * @param {*} goal - Target node
 * @returns {Array} Complete path from start to goal as an array of nodes.
 */
function reconstructPath(forwardVisited, backwardVisited, intersectionNode, start, goal) {
    console.log(`\nReconstructing path through intersection node: ${intersectionNode}`);
    
    // Build path from start to intersection (forward direction)
    const forwardPath = [];
    let current = intersectionNode;
    while (current !== null) {
        forwardPath.push(current);
        current = forwardVisited.get(current);
    }
    forwardPath.reverse(); // Reverse to get start -> intersection
    
    console.log(`Forward path (start -> intersection): [${forwardPath.join(', ')}]`);
    
    // Build path from intersection to goal (backward direction)
    const backwardPath = [];
    current = intersectionNode;
    while (current !== null) {
        backwardPath.push(current);
        current = backwardVisited.get(current);
    }
    backwardPath.shift(); // Remove intersection node to avoid duplication
    
    console.log(`Backward path (intersection -> goal): [${backwardPath.join(', ')}]`);
    
    // Combine both paths
    const completePath = [...forwardPath, ...backwardPath];
    console.log(`Complete path: [${completePath.join(', ')}]`);
    
    return completePath;
}

// --- Example Usage ---

// Define a sample graph (undirected)
const graph = {
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
};

const startNode = 'A';
const goalNode = 'E';

console.log(`Starting Bidirectional Search from '${startNode}' to '${goalNode}'`);
console.log("=".repeat(60));

const path = bidirectionalSearch(graph, startNode, goalNode);

console.log("\n" + "=".repeat(60));
if (path) {
    console.log(`🎉 Path found! Length: ${path.length - 1}`);
    console.log(`Path: ${path.join(' -> ')}`);
} else {
    console.log("❌ No path found between the start and goal nodes.");
}