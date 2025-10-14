## 📦 How to Compile and Run

#### Option 1: **Just Run the Example (No Tests)**

```bash
g++ ternary_search.cpp -o ternary_search
./ternary_search
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
g++ ternary_search.cpp ternary_search_test.cpp -lgtest -lgtest_main -lpthread -o test_ternary_search
./test_ternary_search
```
