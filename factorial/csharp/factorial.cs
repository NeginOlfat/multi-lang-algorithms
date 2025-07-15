using System;

class FactorialProgram
{
    // Recursive
    static int FactorialRecursive(int n)
    {
        if (n == 0)
            return 1; // If n is 0, factorial is 1
        return n * FactorialRecursive(n - 1); // Recursive call
    }

    // Iterative
    static int FactorialIterative(int n)
    {
        int result = 1; // Initial factorial value
        for (int i = 1; i <= n; i++)
        {
            result *= i; // Multiply current number into result
        }
        return result; // Return final result
    }

    // Test
    static void Main(string[] args)
    {
        int num = 5;
        Console.WriteLine("Recursive: " + FactorialRecursive(num));   // Output: 120
        Console.WriteLine("Iterative: " + FactorialIterative(num));   // Output: 120
    }
}
