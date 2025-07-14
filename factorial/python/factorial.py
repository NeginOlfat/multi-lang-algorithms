# recursive
def factorial_recursive(n):
    if n == 0:
        return 1 
    return n * factorial_recursive(n - 1)


# iterative
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result


# test
if __name__ == "__main__":
    num = 5
    print("Recursive:", factorial_recursive(num))   # Output: 120
    print("Iterative:", factorial_iterative(num))   # Output: 120
