# 1. Recursive Method
def fibonacci_recursive(n):
    # Base case: if n is less than or equal to 0, return 0
    if n <= 0:
        return 0
    # Base case: if n is 1, return 1
    elif n == 1:
        return 1
    # Recursive case: return the sum of the two preceding Fibonacci numbers
    else:
        return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)


# 2. Iterative Method
def fibonacci_iterative(n):
    # Base case: if n is less than or equal to 0, return 0
    if n <= 0:
        return 0
    # Base case: if n is 1, return 1
    elif n == 1:
        return 1
    
    # Initialize the first two Fibonacci numbers
    a, b = 0, 1
    # Loop from 2 to n to calculate Fibonacci numbers iteratively
    for _ in range(2, n + 1):
        a, b = b, a + b  # Update a and b to the next Fibonacci numbers
    return b  # Return the nth Fibonacci number


# 3. Memoization Method
def fibonacci_memoization(n, memo={}):
    # Check if the result is already computed and stored in memo
    if n in memo:
        return memo[n]
    # Base case: if n is less than or equal to 0, return 0
    if n <= 0:
        return 0
    # Base case: if n is 1, return 1
    elif n == 1:
        return 1
    
    # Store the result in memo to avoid redundant calculations
    memo[n] = fibonacci_memoization(n - 1, memo) + fibonacci_memoization(n - 2, memo)
    return memo[n]  # Return the nth Fibonacci number


# 4. Matrix Exponentiation Method
def fibonacci_matrix(n):
    # Base case: Fibonacci of 0 is 0
    if n <= 0:
        return 0

    # Function to multiply two 2x2 matrices
    def multiply(a, b):
        # Initialize result matrix with zeros
        c = [[0, 0], [0, 0]]

        # Perform matrix multiplication manually for 2x2 matrices
        for i in range(2):
            for j in range(2):
                # Each element is the dot product of row i of matrix a and column j of matrix b
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j]

        # Return the resulting matrix
        return c

    # Recursive function to compute matrix^n using exponentiation by squaring
    def power(mat, n):
        # Base case: matrix^1 is the matrix itself
        if n == 1:
            return mat

        # Recursively compute power(matrix, n/2)
        half = power(mat, n // 2)

        # Square the result of matrix^(n/2)
        sq = multiply(half, half)

        # If n is odd, multiply one more time with the base matrix
        return multiply(sq, [[1, 1], [1, 0]]) if n % 2 else sq

    # Start with the transformation matrix [[1,1],[1,0]] and raise it to the (n - 1)th power
    result = power([[1, 1], [1, 0]], n - 1)

    # The Fibonacci number is the top-left element of the resulting matrix
    return result[0][0]


# 5. Fast Doubling Method
def fibonacci_fast_doubling(n):
    # Helper recursive function that returns a pair [F(n), F(n+1)]
    def fast_dbl(k):
        # Base case: F(0) = 0, F(1) = 1
        if k == 0:
            return [0, 1]

        # Recursively compute [F(k), F(k+1)] where k = floor(n / 2)
        a, b = fast_dbl(k // 2)

        # Use identities:
        # F(2k) = F(k) * [2*F(k+1) - F(k)]
        # F(2k + 1) = F(k+1)^2 + F(k)^2
        c = a * (2 * b - a)  # F(2k)
        d = a * a + b * b    # F(2k + 1)

        # If n is even: n = 2k
        if k % 2 == 0:
            return [c, d]  # [F(n), F(n+1)]
        else:
            # If n is odd: n = 2k + 1
            return [d, c + d]  # [F(n), F(n+1)]

    # Return the first value from the pair: F(n)
    return fast_dbl(n)[0]


# Example usage
n = 10
print(f"Fibonacci of {n} (Recursive): {fibonacci_recursive(n)}")
print(f"Fibonacci of {n} (Iterative): {fibonacci_iterative(n)}")
print(f"Fibonacci of {n} (Memoization): {fibonacci_memoization(n)}")
print(f"Fibonacci of {n} (Matrix Exp.): {fibonacci_matrix(n)}")
print(f"Fibonacci of {n} (Fast Doubling): {fibonacci_fast_doubling(n)}")

