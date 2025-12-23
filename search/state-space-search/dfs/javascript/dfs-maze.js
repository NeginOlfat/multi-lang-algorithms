/**
 * Solves a maze using Depth-First Search (DFS).
 * 
 * @param {string[]} maze - A rectangular grid where:
 *                          'S' = start, 'G' = goal, '#' = wall, '.' = open path
 * @returns {Array<[number, number]> | null} - Path from start to goal, or null if no path exists.
 */
function dfsMaze(maze) {
    // Parse maze dimensions
    const rows = maze.length;
    const cols = maze[0].length;

    // Find start and goal positions
    let start = null;
    let goal = null;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (maze[r][c] === 'S') {
                start = [r, c];
            } else if (maze[r][c] === 'G') {
                goal = [r, c];
            }
        }
    }

    if (start === null || goal === null) {
        throw new Error("Maze must contain exactly one 'S' and one 'G'");
    }

    // Directions: Right, Down, Left, Up (order affects DFS path)
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const dirNames = ["Right", "Down", "Left", "Up"];

    // Helper: Convert position to string for Set storage
    function posToString(pos) {
        return `${pos[0]},${pos[1]}`;
    }

    // DFS initialization
    const stack = [];
    stack.push({ pos: start, path: [start] }); // {current_position, path_to_it}
    const visited = new Set();
    visited.add(posToString(start));

    console.log(`Starting DFS from: (${start[0]}, ${start[1]})`);
    console.log(`Goal position:      (${goal[0]}, ${goal[1]})`);
    console.log("-".repeat(40));

    let nodesExpanded = 0;

    while (stack.length > 0) {
        const { pos: [r, c], path } = stack.pop();
        nodesExpanded++;

        // Check if we reached the goal
        if (r === goal[0] && c === goal[1]) {
            console.log(`\n✅ Goal found after expanding ${nodesExpanded} states!`);
            console.log(`Solution length: ${path.length - 1} moves`);
            return path;
        }

        // Explore neighbors in reverse order to maintain "Right → Down → Left → Up" priority
        // (since stack is LIFO, we push in reverse)
        for (let i = directions.length - 1; i >= 0; i--) {
            const [dr, dc] = directions[i];
            const name = dirNames[i];
            const nr = r + dr;
            const nc = c + dc;

            // Check bounds
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                // Check if cell is passable and not visited
                if (maze[nr][nc] !== '#' && !visited.has(posToString([nr, nc]))) {
                    visited.add(posToString([nr, nc]));
                    const newPath = [...path, [nr, nc]];
                    stack.push({ pos: [nr, nc], path: newPath });
                    console.log(`  → Moving ${name} to (${nr}, ${nc})`);
                }
            }
        }
    }

    console.log("❌ No path found to the goal.");
    return null;
}

/**
 * Pretty-print the maze, optionally highlighting the solution path.
 * 
 * @param {string[]} maze - The maze grid
 * @param {Array<[number, number]> | null} path - Optional solution path
 */
function printMazeWithPath(maze, path = null) {
    const rows = maze.length;
    const output = [];

    for (let r = 0; r < rows; r++) {
        let rowStr = "";
        for (let c = 0; c < maze[r].length; c++) {
            if (path && path.some(p => p[0] === r && p[1] === c)) {
                if (maze[r][c] === 'S' || maze[r][c] === 'G') {
                    rowStr += maze[r][c];
                } else {
                    rowStr += '*'; // Path marker
                }
            } else {
                rowStr += maze[r][c] === '.' ? ' ' : maze[r][c];
            }
        }
        output.push(rowStr);
    }

    output.forEach(line => console.log(line));
    console.log();
}

// --- Example Usage ---
// Define the 5x5 maze from the explanation
const mazeGrid = [
    "S..#.",
    "##.#.",
    ".....",
    "####.",
    "....G"
];

console.log("Original Maze:");
printMazeWithPath(mazeGrid);

const solutionPath = dfsMaze(mazeGrid);

if (solutionPath) {
    console.log("\n" + "=".repeat(30));
    console.log("SOLUTION PATH (S → * → G):");
    console.log("=".repeat(30));
    printMazeWithPath(mazeGrid, solutionPath);

    console.log("Path coordinates:");
    solutionPath.forEach((pos, i) => {
        console.log(`  Step ${i}: (${pos[0]}, ${pos[1]})`);
    });
} else {
    console.log("No solution exists for this maze.");
}