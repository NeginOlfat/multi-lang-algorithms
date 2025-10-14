#include <gtest/gtest.h>
#include <vector>

// Forward declaration
int fibonacciSearch(const std::vector<int>& arr, int target);

// Test: Target in middle
TEST(FibonacciSearchTest, TargetInMiddle) {
    std::vector<int> arr = {10, 20, 30, 40, 50, 60, 70, 80};
    EXPECT_EQ(fibonacciSearch(arr, 60), 5) << "Should find 60 at index 5";
}

// Test: Target at beginning
TEST(FibonacciSearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(fibonacciSearch(arr, 1), 0) << "Should find first element";
}

// Test: Target at end
TEST(FibonacciSearchTest, TargetAtEnd) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(fibonacciSearch(arr, 5), 4) << "Should find last element";
}

// Test: Not present
TEST(FibonacciSearchTest, TargetNotFound) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(fibonacciSearch(arr, 6), -1) << "Should return -1 for missing element";
}

// Test: Empty array
TEST(FibonacciSearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(fibonacciSearch(arr, 10), -1) << "Empty array should return -1";
}

// Test: Single element found
TEST(FibonacciSearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(fibonacciSearch(arr, 5), 0) << "Single element found → index 0";
}

// Test: Single element not found
TEST(FibonacciSearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(fibonacciSearch(arr, 10), -1) << "Single element not found → -1";
}

// Test: Small array with Fibonacci size (5)
TEST(FibonacciSearchTest, SmallArrayExactFibonacciSize) {
    std::vector<int> arr = {10, 20, 30, 40, 50}; // Size = 5 (Fibonacci number)
    EXPECT_EQ(fibonacciSearch(arr, 40), 3) << "Should find 40 at index 3";
}

// Test: Duplicate elements — should return valid index
TEST(FibonacciSearchTest, DuplicateElementsValidIndex) {
    std::vector<int> arr = {5, 5, 5, 5, 5};
    int result = fibonacciSearch(arr, 5);
    EXPECT_GE(result, 0) << "Result must be valid index";
    EXPECT_LT(result, 5) << "Result must be within bounds";
    EXPECT_EQ(arr[result], 5) << "Returned value must be 5";
}

// Test: Target smaller than first
TEST(FibonacciSearchTest, TargetSmallerThanFirst) {
    std::vector<int> arr = {10, 20, 30};
    EXPECT_EQ(fibonacciSearch(arr, 5), -1) << "Should return -1 if target < min";
}

// Test: Target larger than last
TEST(FibonacciSearchTest, TargetLargerThanLast) {
    std::vector<int> arr = {10, 20, 30};
    EXPECT_EQ(fibonacciSearch(arr, 40), -1) << "Should return -1 if target > max";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}