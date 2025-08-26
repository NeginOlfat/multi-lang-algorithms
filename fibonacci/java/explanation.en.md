# 🧠 Java Fibonacci Code Explanation

## 📌 Recursive Method

```java
public static int fibonacciRecursive(int n) {
    // Base cases
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    // Recursive case
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
```
This method uses a straightforward recursive approach , where the function calls itself to calculate the Fibonacci numbers. It has a high time complexity due to repeated calculations for the same values, resulting in exponential time complexity O(2ⁿ).

<br />

## 📌 Iterative Method
```java 
public static int fibonacciIterative(int n) {
    // Base cases
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
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
```java 
public static int fibonacciMemoization(int n, HashMap<Integer, Integer> memo) {
    // Check if already computed
    if (memo.containsKey(n)) {
        return memo.get(n);
    }

    // Base cases
    if (n <= 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }

    // Recursive computation with memoization
    memo.put(n, fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo));
    return memo.get(n);
}

// Overloaded version to avoid passing the memo map manually
public static int fibonacciMemoization(int n) {
    return fibonacciMemoization(n, new HashMap<Integer, Integer>());
}
```
This method improves the recursive approach by storing previously computed Fibonacci numbers in a HashMap. This way, it avoids redundant calculations, significantly improving performance from O(2ⁿ) to O(n) time complexity.

<br/>

 ## 📌 Matrix Exponentiation Method

```java
    // Main function to compute Fibonacci(n) using matrix exponentiation
    public static int fibonacciMatrix(int n) {
        if (n <= 0)
            return 0;

        int[][] result = power(new int[][]{{1, 1}, {1, 0}}, n - 1);
        return result[0][0];
    }

    // Helper function to multiply two 2x2 matrices
    private static int[][] multiply(int[][] a, int[][] b) {
        int[][] c = {{0, 0}, {0, 0}};

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                // Each element is the dot product of row i of a and column j of b
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
            }
        }

        return c;
    }

    // Recursive function to compute matrix^n using exponentiation by squaring
    private static int[][] power(int[][] mat, int n) {
        if (n == 1)
            return mat;

        int[][] half = power(mat, n / 2);
        int[][] sq = multiply(half, half);

        if (n % 2 == 0) {
            return sq;
        } else {
            return multiply(sq, new int[][]{{1, 1}, {1, 0}});
        }
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
```java
    // Main function to compute Fibonacci(n) using matrix exponentiation
    public static int fibonacciMatrix(int n) {
        if (n <= 0)
            return 0;

        int[][] result = power(new int[][]{{1, 1}, {1, 0}}, n - 1);
        return result[0][0];
    }

    // Helper function to multiply two 2x2 matrices
    private static int[][] multiply(int[][] a, int[][] b) {
        int[][] c = {{0, 0}, {0, 0}};

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                // Each element is the dot product of row i of a and column j of b
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
            }
        }

        return c;
    }

    // Recursive function to compute matrix^n using exponentiation by squaring
    private static int[][] power(int[][] mat, int n) {
        if (n == 1)
            return mat;

        int[][] half = power(mat, n / 2);
        int[][] sq = multiply(half, half);

        if (n % 2 == 0) {
            return sq;
        } else {
            return multiply(sq, new int[][]{{1, 1}, {1, 0}});
        }
    }


    // 5. Fast Doubling Method
     // Main function to compute Fibonacci(n) using Fast Doubling
    public static int fibonacciFastDoubling(int n) {
        int[] result = fastDbl(n);
        return result[0]; // Return F(n)
    }

    // Helper recursive function that returns [F(k), F(k+1)]
    private static int[] fastDbl(int k) {
        if (k == 0)
            return new int[]{0, 1}; // Base case: F(0)=0, F(1)=1

        int[] pair = fastDbl(k / 2);
        int a = pair[0], b = pair[1];

        // Use identities:
        // F(2k)   = F(k) * [2*F(k+1) - F(k)]
        // F(2k+1) = F(k+1)^2 + F(k)^2
        int c = a * (2 * b - a); // F(2k)
        int d = a * a + b * b;     // F(2k + 1)

        if (k % 2 == 0) {
            return new int[]{c, d}; // Even case
        } else {
            return new int[]{d, c + d}; // Odd case
        }
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
