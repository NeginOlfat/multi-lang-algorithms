#include <iostream> // Include the input/output library

using namespace std; // Use the standard namespace

// Recursive version
int factorialRecursive(int n) {
    if (n == 0) 
        return 1; // If n is 0, factorial is 1
    return n * factorialRecursive(n - 1); // Recursive call
}

// Iterative version
int factorialIterative(int n) {
    int result = 1; // Initial factorial value
    for (int i = 1; i <= n; i++) {
        result *= i; // Multiply current number into result
    }
    return result; // Return final result
}

int main() {
    int num = 5; // Number for calculating factorial

    // Test the recursive function
    cout << "Recursive: " << factorialRecursive(num) << endl; // Output: 120
    // Test the iterative function
    cout << "Iterative: " << factorialIterative(num) << endl; // Output: 120

    return 0; // End of program
}
