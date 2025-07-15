using System;
using System.Collections.Generic;

class Fibonacci
{
    // 1. Recursive Method
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

    // 2. Iterative Method
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

    // 3. Memoization Method
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

        // Compute and store in memo
        memo[n] = FibonacciMemoization(n - 1, memo) + FibonacciMemoization(n - 2, memo);
        return memo[n];
    }

    // 4. Matrix Exponentiation Method
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

    // 5. Fast Doubling Method
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

    // Example usage
    static void Main(string[] args)
    {
        int n = 10;

        Console.WriteLine($"Fibonacci of {n} (Recursive): {FibonacciRecursive(n)}");
        Console.WriteLine($"Fibonacci of {n} (Iterative): {FibonacciIterative(n)}");
        Console.WriteLine($"Fibonacci of {n} (Memoization): {FibonacciMemoization(n)}");
        Console.WriteLine($"Fibonacci of {n} (Matrix Exp.): {FibonacciMatrix(n)}");
        Console.WriteLine($"Fibonacci of {n} (Fast Doubling): {FibonacciFastDoubling(n)}");
    }
}