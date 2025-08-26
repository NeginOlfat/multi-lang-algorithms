# Fibonacci Function 

This repository contains implementations of the Fibonacci function in multiple programming languages, You can choose your preferred language to view the content.

#### Programming Languages:
[Python](/fibonacci/python/) | [C#](/fibonacci/csharp/) | [JavaScript](/fibonacci/javascript/) | [C++](/fibonacci/C++/) | [Java](/fibonacci/javascript/)


<br />

#### Available Languages:
[فارسی](/fibonacci/README.fa.md)

<br />

## ℹ️ What is a Factorial?
The **Fibonacci sequence** is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. The sequence typically looks like this: 
$$
0, 1, 1, 2, 3, 5, 8, 13, 21, ...
$$



#### 📐 Definition:
$$
F(0) = 0,\ F(1) = 1
$$
$$
F(n) = F(n - 1) + F(n - 2)\ \text{for}\ n > 1
$$

<br />

#### 🔢 Example:
$$
F(0) = 0,\ F(1) = 1,\ F(2) = 1,\ F(3) = 2,\ F(4) = 3,\ F(5) = 5,\ F(6) = 8
$$
<br/>

## 🧩 Applications


- **Biology**: Appears in natural patterns such as tree branching, phyllotaxis (leaf arrangement), and honeybee population growth.
- **Art & Design**: Closely related to the golden ratio, which is used in architecture, graphic design, and photography.
- **Finance**: Applied in technical market analysis through Fibonacci retracement levels and extensions.

## 🎯 Purpose of This Repository

This project aims to demonstrate various implementations of the Fibonacci function across different programming languages and techniques, including:

- Recursive approach
- Iterative method
- Memoization / Dynamic Programming
- Optimized algorithms (e.g., matrix exponentiation or fast doubling)

### 📊 Comparison of Fibonacci Algorithms

| Method                  | Time Complexity | Space Complexity | Notes |
|:----|:----:|:----:|:----|
| **Recursive**           | O(2ⁿ)            | O(n)              | Simple but very slow. Avoid for large `n`. |
| **Iterative**           | O(n)             | O(1)              | Fast and memory efficient. Good for most cases. |
| **Memoization (Top-down)** | O(n)          | O(n)              | Improves recursion with caching. Useful if called multiple times. |
| **Matrix Exponentiation**   | O(log n)       | O(log n)          | Very fast for large `n`. Uses exponentiation by squaring. |
| **Fast Doubling**         | O(log n)         | O(log n)          | Slightly faster than matrix method. Based on mathematical identities. |