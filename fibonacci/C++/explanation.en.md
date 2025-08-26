# 🧠 C++ Fibonacci Code Explanation

## 📌 Recursive Method

```cpp
int fibonacci_recursive(int n) {
    // Base case: if n <= 0, return 0
    if (n <= 0)
        return 0;
    // Base case: if n == 1, return 1
    else if (n == 1)
        return 1;
    // Recursive case: return sum of previous two Fibonacci numbers
    else
        return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2);
}
```
This method uses a straightforward recursive approach where the function calls itself to calculate the Fibonacci numbers. It has a high time complexity due to repeated calculations for the same values, resulting in exponential time complexity O(2ⁿ).

<br />

##  📌Iterative Method
```cpp
int fibonacci_iterative(int n) {
    // Base cases
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}
```
This method uses a loop to calculate Fibonacci numbers iteratively. It is more efficient than the recursive method as it avoids the overhead of multiple function calls and has a linear time complexity O(n).


<br />

## 📌 Memoization Method
```cpp
int fibonacci_memoization(int n, std::unordered_map<int, int>& memo) {
    // Check if already computed
    if (memo.find(n) != memo.end())
        return memo[n];

    // Base cases
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    // Store result in memo to avoid recomputation
    memo[n] = fibonacci_memoization(n - 1, memo) + fibonacci_memoization(n - 2, memo);
    return memo[n];
}

// Overload function to support initial call without passing memo
int fibonacci_memoization(int n) {
    std::unordered_map<int, int> memo;
    return fibonacci_memoization(n, memo);
}
```
This method improves the recursive approach by storing previously computed Fibonacci numbers in an unordered_map. This way, it avoids redundant calculations, significantly improving performance from exponential O(2ⁿ) to linear O(n) time complexity.

<br/>

 ## 📌 Matrix Exponentiation Method

```cpp
// Function to multiply two 2x2 matrices
vector<vector<int>> multiply(vector<vector<int>> a, vector<vector<int>> b) {
    // Initialize result matrix with zeros
    vector<vector<int>> c = {{0, 0}, {0, 0}};

    // Perform matrix multiplication manually for 2x2 matrices
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            // Each element is the dot product of row i of matrix a and column j of matrix b
            c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
        }
    }

    return c;
}

// Recursive function to compute matrix^n using exponentiation by squaring
vector<vector<int>> power(vector<vector<int>> mat, int n) {
    // Base case: matrix^1 is the matrix itself
    if (n == 1)
        return mat;

    // Recursively compute power(matrix, n/2)
    vector<vector<int>> half = power(mat, n / 2);

    // Square the result of matrix^(n/2)
    vector<vector<int>> sq = multiply(half, half);

    // If n is odd, multiply one more time with the base matrix
    if (n % 2 == 0)
        return sq;
    else
        return multiply(sq, {{1, 1}, {1, 0}});
}

// Main function to compute Fibonacci(n) using Matrix Exponentiation
int fibonacciMatrix(int n) {
    // Base case: Fibonacci of 0 is 0
    if (n <= 0)
        return 0;

    // Start with [[1,1],[1,0]]^n-1
    vector<vector<int>> result = power({{1, 1}, {1, 0}}, n - 1);

    // Return top-left value F(n)
    return result[0][0];
}
```
This method uses matrix exponentiation to compute the nth Fibonacci number efficiently. It relies on the identity:

![Fibonacci Matrix](/assets/FibonacciMatrix.png)

To find `F(n)`:
- Raise the transformation matrix `[[1, 1], [1, 0]]` to the power `n - 1`.
- Return the top-left element (`F(n)`) from the resulting matrix.

### ✅ Why it's efficient:
- Uses **exponentiation by squaring**.
- Reducing time complexity to **O(log n)**.
- Avoids redundant calculations found in naive recursion.

<br/>

## 📌 Fast Doubling Method
```cpp
// Helper recursive function that returns a pair [F(k), F(k+1)]
pair<int, int> fastDbl(int k) {
    // Base case: F(0) = 0, F(1) = 1
    if (k == 0)
        return {0, 1};

    // Recursively compute [F(k/2), F(k/2 + 1)]
    auto [a, b] = fastDbl(k / 2);

    // Use identities:
    // F(2k)   = F(k) * [2*F(k+1) - F(k)]
    // F(2k+1) = F(k)^2 + F(k+1)^2
    int c = a * (2 * b - a); // F(2k)
    int d = a * a + b * b;     // F(2k+1)

    // If k is even: k = 2n
    if (k % 2 == 0)
        return {c, d}; // [F(k), F(k+1)]

    // If k is odd: k = 2n + 1
    else
        return {d, c + d}; // [F(k), F(k+1)]
}

// Fast doubling method to compute F(n)
int fibonacciFastDoubling(int n) {
    return fastDbl(n).first; // Return F(n)
}
```
This method leverages Fibonacci identities for fast computation:

![Fibonacci Fast Doubling : F(2k) = F(k) . (2F(k+1) - F(k))](/assets/FibonacciFD1.png)
![Fibonacci Fast Doubling : F(2k + 1) = F(k+1)^2 + F(k)^2](/assets/FibonacciFD2.png)


The function recursively computes `[F(k), F(k+1)]` and combines them based on whether `n` is even or odd.

### ✅ Why it's efficient:
- Computes `F(n)` in **O(log n)** time using divide-and-conquer.
- Returns two values at each step to avoid recomputation.
- Generally faster than matrix exponentiation due to fewer operations.
