#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;


// 1. Recursive Method
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


// 2. Iterative Method
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


// 3. Memoization Method
int fibonacci_memoization(int n, unordered_map<int, int>& memo) {
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
    unordered_map<int, int> memo;
    return fibonacci_memoization(n, memo);
}


// 4. Matrix Exponentiation Method
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


// 5. Fast Doubling Method
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


// Example Usage
int main() {
    int n = 10;

    cout << "Fibonacci of " << n << " (Recursive): " << fibonacci_recursive(n) << endl;
    cout << "Fibonacci of " << n << " (Iterative): " << fibonacci_iterative(n) << endl;
    cout << "Fibonacci of " << n << " (Memoization): " << fibonacci_memoization(n) << endl;
    cout << "Fibonacci of " << n << " (Matrix Exp.): " << fibonacciMatrix(n) << endl;
    cout << "Fibonacci of " << n << " (Fast Doubling): " << fibonacciFastDoubling(n) << endl;
    return 0;
}