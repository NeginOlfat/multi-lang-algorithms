#include <gtest/gtest.h>
#include <vector>

// Forward declaration
int exponentialSearch(const std::vector<int>& arr, int target);

// Test: Target found in middle
TEST(ExponentialSearchTest, TargetFoundInMiddle) {
    std::vector<int> arr = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    EXPECT_EQ(exponentialSearch(arr, 70), 6) << "Should find 70 at index 6";
}

// Test: Target at beginning
TEST(ExponentialSearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(exponentialSearch(arr, 1), 0) << "Should find first element";
}

// Test: Target at end
TEST(ExponentialSearchTest, TargetAtEnd) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(exponentialSearch(arr, 5), 4) << "Should find last element";
}

// Test: Not present
TEST(ExponentialSearchTest, TargetNotFound) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(exponentialSearch(arr, 6), -1) << "Should return -1 for missing element";
}

// Test: Empty array
TEST(ExponentialSearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(exponentialSearch(arr, 10), -1) << "Empty array should return -1";
}

// Test: Single element found
TEST(ExponentialSearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(exponentialSearch(arr, 5), 0) << "Single element found → index 0";
}

// Test: Single element not found
TEST(ExponentialSearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(exponentialSearch(arr, 10), -1) << "Single element not found → -1";
}

// Test: Small array (power of two size)
TEST(ExponentialSearchTest, SmallArrayPowerOfTwo) {
    std::vector<int> arr = {1, 3, 5, 7};
    EXPECT_EQ(exponentialSearch(arr, 7), 3) << "Should find 7 at index 3";
}

// Test: Target larger than all elements
TEST(ExponentialSearchTest, TargetLargerThanAll) {
    std::vector<int> arr = {1, 2, 3, 4};
    EXPECT_EQ(exponentialSearch(arr, 10), -1) << "Should return -1 if target > max";
}

// Test: Target smaller than first element
TEST(ExponentialSearchTest, TargetSmallerThanFirst) {
    std::vector<int> arr = {10, 20, 30};
    EXPECT_EQ(exponentialSearch(arr, 5), -1) << "Should return -1 if target < min";
}

// Test: Duplicate elements — should return valid index
TEST(ExponentialSearchTest, DuplicateElementsValidIndex) {
    std::vector<int> arr = {2, 2, 2, 3, 3, 3, 4, 4};
    int result = exponentialSearch(arr, 3);
    EXPECT_GE(result, 3) << "Result must be one of the indices where 3 occurs";
    EXPECT_LE(result, 5) << "Result must be within bounds";
    EXPECT_EQ(arr[result], 3) << "Returned value must be 3";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}