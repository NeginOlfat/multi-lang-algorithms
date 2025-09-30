## 📦 How to Compile and Run

#### Option 1: **Just Run the Example (No Tests)**

```bash
g++ linear_search.cpp -o linear_search
./linear_search
```

**Output:**
```
✅ Found 20 at index 5.
```

---

#### Option 2: **Run with Google Test (Recommended for Testing)**

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
g++ linear_search.cpp linear_search_test.cpp -lgtest -lgtest_main -lpthread -o test_linear_search
./test_linear_search
```

✅ You should see:
```
[==========] Running 8 tests from 1 test suite.
[  PASSED  ] 8 tests.
```
