## 📦 How to Compile and Run

#### Option 1: **Just Run the Example (No Tests)**

```bash
g++ sentinel_search.cpp -o sentinel_search
./sentinel_search
```

#### Option 2: **Run with Google Test (Recommended for Testing)**

##### 1. Install Google Test (Ubuntu/Debian)
Ensure gtest is installed:
```bash
# Ubuntu/Debian
sudo apt-get install libgtest-dev cmake
cd /usr/src/googletest && sudo mkdir build && cd build
sudo cmake .. && sudo make && sudo cp *.a /usr/lib
```

> 🔁 **On macOS**: Use `brew install googletest`  
> **On Windows**: Use vcpkg: `vcpkg install gtest`

##### 2. Compile and run tests  
Compile both the implementation and test file:

```bash
g++ sentinel_search.cpp sentinel_search_test.cpp -lgtest -lgtest_main -lpthread -o test_sentinel_search
./test_sentinel_search
```
