/**
 * Solves the 8-puzzle using Breadth-First Search (BFS).
 * 
 * @param {number[]} initialState - A 9-element array representing the initial puzzle configuration.
 *                                  Blank tile is represented by 0.
 * @param {number[]} goalState - The target configuration (default is standard goal).
 * @returns {number[][] | null} - Array of states from initial to goal, or null if unsolvable.
 */
function bfs8Puzzle(initialState, goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0]) {
    // Input validation
    if (initialState.length !== 9 || goalState.length !== 9) {
        throw new Error("State must be a 9-element array.");
    }

    const initialStateSet = new Set(initialState);
    const goalStateSet = new Set(goalState);
    if (initialStateSet.size !== goalStateSet.size || ![...initialStateSet].every(x => goalStateSet.has(x))) {
        console.log("Unsolvable: initial and goal states have different tiles.");
        return null;
    }

    // Early exit if already solved
    if (arraysEqual(initialState, goalState)) {
        return [initialState];
    }

    // Directions: up,       down,   left,    right (row and col offsets)
    const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    /**
     * Get (row, col) of the blank (0) tile.
     * @param {number[]} state
     * @returns {[number, number]}
     */
    function getBlankPos(state) {
        const idx = state.indexOf(0);
        return [Math.floor(idx / 3), idx % 3];
    }

    /**
     * Generate all valid successor states from the current state.
     * @param {number[]} state
     * @returns {number[][]}
     */
    function getNeighbors(state) {
        const [row, col] = getBlankPos(state);
        const neighbors = [];
        const stateCopy = [...state];

        for (const [dr, dc] of moves) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
                const newIdx = newRow * 3 + newCol;
                const blankIdx = row * 3 + col;

                // Swap blank with neighbor
                const newState = [...stateCopy];
                [newState[blankIdx], newState[newIdx]] = [newState[newIdx], newState[blankIdx]];
                neighbors.push(newState);
            }
        }

        return neighbors;
    }

    /**
     * Compare two arrays for equality.
     * @param {number[]} a
     * @param {number[]} b
     * @returns {boolean}
     */
    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    /**
     * Convert state array to string for hashing.
     * @param {number[]} state
     * @returns {string}
     */
    function stateToString(state) {
        return state.join(',');
    }

    // BFS initialization
    const queue = [];
    queue.push({ state: initialState, path: [initialState] });
    const visited = new Set();
    visited.add(stateToString(initialState));

    console.log(`Starting BFS from: [${initialState.join(', ')}]`);
    console.log(`Goal state:        [${goalState.join(', ')}]`);
    console.log("-".repeat(50));

    let nodesExpanded = 0;

    while (queue.length > 0) {
        const { state: currentState, path } = queue.shift();
        nodesExpanded++;

        // Generate successors
        for (const neighbor of getNeighbors(currentState)) {
            if (arraysEqual(neighbor, goalState)) {
                console.log(`\n✅ Goal found after expanding ${nodesExpanded} states!`);
                const solutionPath = [...path, neighbor];
                console.log(`Solution length: ${solutionPath.length - 1} moves`);
                return solutionPath;
            }

            const neighborStr = stateToString(neighbor);
            if (!visited.has(neighborStr)) {
                visited.add(neighborStr);
                queue.push({ state: neighbor, path: [...path, neighbor] });
            }
        }
    }

    console.log("❌ No solution found (should not happen for valid 8-puzzle instances).");
    return null;
}

/**
 * Pretty-print a 9-element state as a 3x3 grid.
 * @param {number[]} state
 */
function printState(state) {
    for (let i = 0; i < 3; i++) {
        const row = state.slice(i * 3, i * 3 + 3)
            .map(x => x === 0 ? " " : x)
            .join(" ");
        console.log(row);
    }
    console.log();
}

// --- Example Usage ---
(() => {
    //  Example initial state (solvable)
    const initial = [1, 2, 3,
                     4, 0, 5,
                     6, 7, 8];

    const solution = bfs8Puzzle(initial);

    if (solution) {
        console.log("\n" + "=".repeat(30));
        console.log("SOLUTION PATH:");
        console.log("=".repeat(30));
        solution.forEach((state, i) => {
            console.log(`Step ${i}:`);
            printState(state);
        });
    } else {
        console.log("No solution exists for this configuration.");
    }
})();