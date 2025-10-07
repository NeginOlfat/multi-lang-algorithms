## 📦How to Compile and Run

#### 1. **Just Run the Example**
```bash
g++ interpolation_search.cpp -o interpolation_search
./interpolation_search
```

**Output:**
```text
🔍 Interpolation Search Example
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90]
Target: 70

✅ Found 70 at index 6.
```

#### 2. **Run with Google Test**

Ensure gtest is installed, then compile and run tests:

```bash
g++ interpolation_search.cpp interpolation_search_test.cpp -lgtest -lgtest_main -lpthread -o test_interpolation_search
./test_interpolation_search
```

✅ You’ll see:
```
[==========] Running 11 tests from 1 test suite.
[  PASSED  ] 11 tests.
```