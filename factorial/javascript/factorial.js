// Recursive
function factorialRecursive(n) {
    if (n === 0) 
        return 1; // If n is 0, factorial is 1
    return n * factorialRecursive(n - 1); // Recursive call
}

// Iterative
function factorialIterative(n) {
    let result = 1; // Initial factorial value
    for (let i = 1; i <= n; i++) {
        result *= i; // Multiply current number into result
    }
    return result; // Return final result
}

// Test
const num = 5;
console.log("Recursive:", factorialRecursive(num));   // Output: 120
console.log("Iterative:", factorialIterative(num));   // Output: 120
