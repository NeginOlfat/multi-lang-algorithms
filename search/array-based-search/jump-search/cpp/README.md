## 📦 How to Compile and Run

#### 1. **Just Run the Example**
```bash
g++ jump_search.cpp -o jump_search
./jump_search
```

**Output:**
```text
🚶‍♂️ Jump Search Example
Array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Target: 7

✅ Found 7 at index 7.
```

#### 2. **Run with Google Test**

Ensure gtest is installed, then compile and run tests:

```bash
g++ jump_search.cpp jump_search_test.cpp -lgtest -lgtest_main -lpthread -o test_jump_search
./test_jump_search
```

✅ You’ll see:
```
[==========] Running 9 tests from 1 test suite.
[  PASSED  ] 9 tests.
```