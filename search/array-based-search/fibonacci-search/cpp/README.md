## 📦 How to Compile and Run

#### 1. **Just Run the Example**
```bash
g++ fibonacci_search.cpp -o fibonacci_search
./fibonacci_search
```

#### 2. **Run with Google Test**

Ensure gtest is installed, then compile and run tests:

```bash
g++ fibonacci_search.cpp fibonacci_search_test.cpp -lgtest -lgtest_main -lpthread -o test_fibonacci_search
./test_fibonacci_search
```