## 📦 How to Compile and Run

#### 1. **Just Run the Example**
```bash
g++ binary_search.cpp -o binary_search
./binary_search
```

**Output:**
```text
🔍 Binary Search Examples
Array: [10, 20, 30, 40, 50, 60, 70, 80]
Target: 60

✅ [Iterative] Found 60 at index 5.
✅ [Recursive] Found 60 at index 5.
```

#### 2. **Run with Google Test**

##### 1. Install Google Test (Ubuntu/Debian)
```bash
# Install gtest development package
sudo apt-get install libgtest-dev cmake

# Build Google Test
cd /usr/src/googletest
sudo mkdir -p build
cd build
sudo cmake ..
sudo make

# Copy libraries to system path
sudo cp lib/*.a /usr/lib
```

> 🔁 **On macOS**: Use `brew install googletest`  
> **On Windows**: Use vcpkg: `vcpkg install gtest`

##### 2. Compile and run tests  
Compile both the implementation and test file:

```bash
g++ binary_search.cpp binary_search_test.cpp -lgtest -lgtest_main -lpthread -o test_binary_search
./test_binary_search
```

✅ You'll see:
```
[==========] Running 8 tests from 1 test suite.
[  PASSED  ] 8 tests.
```