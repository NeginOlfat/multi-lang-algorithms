# 🧠 Python Factorial Code Explanation (English)

## Recursive Version

```python
def factorial_recursive(n):
    if n == 0:
        return 1    # If n is 0, factorial is 1
    return n * factorial_recursive(n - 1)   # Recursive call
```

The function checks if n is 0, and if so, returns 1 (the base case). Otherwise, it calls itself with n - 1 and multiplies the result by n. This process continues until it reaches 0, then the results are returned back up through the recursive calls.

<br/>

## Iterative Version

```python
def factorial_iterative(n):
    result = 1  # Initial factorial value
    for i in range(1, n + 1):
        result *= i  # Multiply current number into result
    return result   # Return final result
```

This function initializes a variable result to 1. Then it loops from 1 to n, multiplying each number i into result. At the end, result holds the factorial of the number.




