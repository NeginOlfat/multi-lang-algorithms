import java.util.HashMap;

public class Fibonacci {

    // Recursive Method
    public static int fibonacciRecursive(int n) {
        // Base cases
        if (n <= 0)
            return 0;
        if (n == 1)
            return 1;

        // Recursive case
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    // Iterative Method
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


    // Memoization Method
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

    // Overloaded method to avoid passing the memo map manually
    public static int fibonacciMemoization(int n) {
        return fibonacciMemoization(n, new HashMap<Integer, Integer>());
    }


    // 4. Matrix Exponentiation Method
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


    // Example Usage
    public static void main(String[] args) {
        int n = 10;

        System.out.println("Fibonacci of " + n + " (Recursive): " + fibonacciRecursive(n));
        System.out.println("Fibonacci of " + n + " (Iterative): " + fibonacciIterative(n));
        System.out.println("Fibonacci of " + n + " (Memoization): " + fibonacciMemoization(n));
        System.out.println("Fibonacci of " + n + " (Matrix Exp.): " + fibonacciMatrix(n));
        System.out.println("Fibonacci of " + n + " (Fast Doubling): " + fibonacciFastDoubling(n));

    }
}