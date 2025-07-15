# 🧠 JavaScript Fibonacci Code Explanation

## 📌 Recursive Method

```javascript
function fibonacciRecursive(n) {
    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Recursive case
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
```
This method uses a straightforward recursive approach, where the function calls itself to calculate the Fibonacci numbers. It has a high time complexity due to repeated calculations for the same values, resulting in exponential time complexity O(2ⁿ) .

<br />

## 📌 Iterative Method
```javascript
function fibonacciIterative(n) {
    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b]; // Update a and b
    }
    return b;
}
```
This method uses a loop to calculate Fibonacci numbers iteratively . It avoids the overhead of multiple function calls found in recursion. It has a linear time complexity O(n) and constant space complexity O(1) , making it one of the most practical approaches.

<br />

## 📌 Memoization Method

```javascript
function fibonacciMemoization(n, memo = {}) {
    // Check if already computed
    if (memo[n] !== undefined) return memo[n];

    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Store result in memo to avoid recomputation
    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    return memo[n];
}
```
This method improves the recursive approach by storing previously computed Fibonacci numbers in a memo object. This way, it avoids redundant calculations, significantly improving performance from O(2ⁿ) to O(n) time complexity.

<br/>

 ## 📌 Matrix Exponentiation Method

```javascript
function fibonacciMatrix(n) {
    // Base case: Fibonacci of 0 is 0
    if (n <= 0) return 0;

    // Function to multiply two 2x2 matrices
    function multiply(a, b) {
        // Initialize result matrix with zeros
        const c = [[0, 0], [0, 0]];

        // Perform matrix multiplication manually for 2x2 matrices
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                // Each element is the dot product of row i of matrix a and column j of matrix b
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
            }
        }

        // Return the resulting matrix
        return c;
    }

    // Recursive function to compute matrix^n using exponentiation by squaring
    function power(mat, n) {
        // Base case: matrix^1 is the matrix itself
        if (n === 1) return mat;

        // Recursively compute power(matrix, n/2)
        const half = power(mat, Math.floor(n / 2));

        // Square the result of matrix^(n/2)
        const sq = multiply(half, half);

        // If n is odd, multiply one more time with the base matrix
        return n % 2 === 0 ? sq : multiply(sq, [[1, 1], [1, 0]]);
    }

    // Start with the transformation matrix [[1,1],[1,0]] and raise it to the (n - 1)th power
    const result = power([[1, 1], [1, 0]], n - 1);

    // The Fibonacci number is the top-left element of the resulting matrix
    return result[0][0];
}
```
This method uses matrix exponentiation to compute the nth Fibonacci number efficiently. It relies on the identity:

$$
\begin{bmatrix}
F(n+1) & F(n) \\
F(n) & F(n-1)
\end{bmatrix}
=
\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}^n
$$

To find `F(n)`:
- Raise the transformation matrix `[[1, 1], [1, 0]]` to the power `n - 1`.
- Return the top-left element (`F(n)`) from the resulting matrix.

### ✅ Why it's efficient:
- Uses **exponentiation by squaring**.
- Reducing time complexity to **O(log n)**.
- Avoids redundant calculations found in naive recursion.

<br/>

## 📌 Fast Doubling Method
```javascript
function fibonacciFastDoubling(n) {
    // Helper recursive function that returns a pair [F(n), F(n+1)]
    function fastDbl(n) {
        // Base case: F(0) = 0, F(1) = 1
        if (n === 0) return [0, 1];

        // Recursively compute [F(k), F(k+1)] where k = floor(n / 2)
        const [a, b] = fastDbl(Math.floor(n / 2));

        // Use identities:
        // F(2k) = F(k) * [2*F(k+1) - F(k)]
        // F(2k + 1) = F(k+1)^2 + F(k)^2
        const c = a * (2 * b - a); // F(2k)
        const d = a * a + b * b;   // F(2k + 1)

        // If n is even: n = 2k
        if (n % 2 === 0) {
            return [c, d]; // [F(n), F(n+1)]
        } else {
            // If n is odd: n = 2k + 1
            return [d, c + d]; // [F(n), F(n+1)]
        }
    }

    // Return the first value from the pair: F(n)
    return fastDbl(n)[0];
}
```
This method leverages Fibonacci identities for fast computation:

- $ F(2k) = F(k) \cdot (2F(k+1) - F(k)) $
- $ F(2k + 1) = F(k+1)^2 + F(k)^2 $

The function recursively computes `[F(k), F(k+1)]` and combines them based on whether `n` is even or odd.

### ✅ Why it's efficient:
- Computes `F(n)` in **O(log n)** time using divide-and-conquer.
- Returns two values at each step to avoid recomputation.
- Generally faster than matrix exponentiation due to fewer operations.