import java.util.Scanner;

public class Factorial {
    // Recursive
    static int factorialRecursive(int n) {
        if (n == 0)
            return 1; // If n is 0, factorial is 1
        return n * factorialRecursive(n - 1); // Recursive call
    }

    // Iterative
    static int factorialIterative(int n) {
        int result = 1; // Initial factorial value
        for (int i = 1; i <= n; i++) {
            result *= i; // Multiply current number into result
        }
        return result; // Return final result
    }

    // Test
    public static void main(String[] args) {
        int num = 5;
        System.out.println("Recursive: " + factorialRecursive(num));   // Output: 120
        System.out.println("Iterative: " + factorialIterative(num));   // Output: 120
    }
}
