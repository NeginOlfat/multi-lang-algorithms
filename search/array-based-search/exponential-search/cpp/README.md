## 📦 How to Compile and Run

#### 1. **Just Run the Example**
```bash
g++ exponential_search.cpp -o exponential_search
./exponential_search
```

**Output:**
```text
🔍 Exponential Search Example
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
Target: 70

✅ Found 70 at index 6.
```

#### 2. **Run with Google Test**

Ensure gtest is installed, then compile and run tests:

```bash
g++ exponential_search.cpp exponential_search_test.cpp -lgtest -lgtest_main -lpthread -o test_exponential_search
./test_exponential_search
```

✅ You’ll see:
```
[==========] Running 11 tests from 1 test suite.
[  PASSED  ] 11 tests.
```