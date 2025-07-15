# 🧠 C# Fibonacci Code Explanation

## 📌 Recursive Method

```csharp
public static int FibonacciRecursive(int n)
{
    // Base case: if n <= 0, return 0
    if (n <= 0)
        return 0;
    // Base case: if n == 1, return 1
    else if (n == 1)
        return 1;
    // Recursive case
    else
        return FibonacciRecursive(n - 1) + FibonacciRecursive(n - 2);
}
```
This method uses a straightforward recursive approach, where the function calls itself to calculate the Fibonacci numbers. It has a high time complexity due to repeated calculations for the same values, resulting in exponential time complexity O(2ⁿ).

<br />

## 📌 Iterative Method
```csharp
public static int FibonacciIterative(int n)
{
    // Base cases
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    int a = 0, b = 1;
    for (int i = 2; i <= n; i++)
    {
        int temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}
```
This method uses a loop to calculate Fibonacci numbers iteratively. It is more efficient than the recursive method as it avoids the overhead of multiple function calls and has a linear time complexity O(n). The space complexity is constant O(1), making this one of the most practical approaches.

<br />

## 📌 Memoization Method
```csharp
public static int FibonacciMemoization(int n, Dictionary<int, int> memo = null)
{
    memo ??= new Dictionary<int, int>(); // Initialize dictionary if null

    if (memo.ContainsKey(n))
        return memo[n];

    // Base cases
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    // Store the result in memo to avoid redundant calculations
    memo[n] = FibonacciMemoization(n - 1, memo) + FibonacciMemoization(n - 2, memo);
    return memo[n];
}
```
This method improves the recursive approach by storing previously computed Fibonacci numbers in a dictionary (memo). This way, it avoids redundant calculations, significantly improving performance from exponential O(2ⁿ) to linear O(n) time complexity.

<br/>

 ## 📌 Matrix Exponentiation Method

```csharp
public static int FibonacciMatrix(int n)
{
    // Base case: Fibonacci of 0 is 0
    if (n <= 0)
        return 0;

    // Define a 2x2 matrix type using 2D array
    int[,] Multiply(int[,] a, int[,] b)
    {
        // Initialize result matrix with zeros
        int[,] c = new int[2, 2];

        // Perform matrix multiplication manually for 2x2 matrices
        for (int i = 0; i < 2; i++)
        {
            for (int j = 0; j < 2; j++)
            {
                // Each element is dot product of row i of a and column j of b
                c[i, j] = a[i, 0] * b[0, j] + a[i, 1] * b[1, j];
            }
        }

        return c;
    }

    // Recursive function to compute matrix^n using exponentiation by squaring
    int[,] Power(int[,] mat, int n)
    {
        if (n == 1)
            return mat;

        int[,] half = Power(mat, n / 2);
        int[,] sq = Multiply(half, half);

        if (n % 2 == 0)
            return sq;
        else
            return Multiply(sq, new int[,] { { 1, 1 }, { 1, 0 } });
    }

    // Start with [[1,1],[1,0]]^n-1
    int[,] result = Power(new int[,] { { 1, 1 }, { 1, 0 } }, n - 1);

    // Return top-left value F(n)
    return result[0, 0];
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
```csharp
public static int FibonacciFastDoubling(int n)
{
    // Helper recursive function returning [F(k), F(k+1)]
    (int, int) FastDbl(int k)
    {
        if (k == 0)
            return (0, 1); // Base case F(0)=0, F(1)=1

        var (a, b) = FastDbl(k / 2);

        // Use identities:
        // F(2k)   = F(k) * [2*F(k+1) - F(k)]
        // F(2k+1) = F(k+1)^2 + F(k)^2
        int c = a * (2 * b - a); // F(2k)
        int d = a * a + b * b;     // F(2k+1)

        if (k % 2 == 0)
            return (c, d); // even case
        else
            return (d, c + d); // odd case
    }

    return FastDbl(n).Item1; // Return F(n)
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