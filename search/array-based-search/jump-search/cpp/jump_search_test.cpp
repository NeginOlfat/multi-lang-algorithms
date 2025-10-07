#include <gtest/gtest.h>
#include <vector>
#include <cmath>

// Forward declaration
int jumpSearch(const std::vector<int>& arr, int target);

// Test: Target in middle block
TEST(JumpSearchTest, TargetInMiddleBlock) {
    std::vector<int> arr = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    EXPECT_EQ(jumpSearch(arr, 7), 7) << "Should find 7 at index 7";
}

// Test: Target at beginning
TEST(JumpSearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(jumpSearch(arr, 1), 0) << "Should find first element";
}

// Test: Target at end
TEST(JumpSearchTest, TargetAtEnd) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(jumpSearch(arr, 5), 4) << "Should find last element";
}

// Test: Target not present
TEST(JumpSearchTest, TargetNotFound) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(jumpSearch(arr, 6), -1) << "Should return -1 for missing element";
}

// Test: Empty array
TEST(JumpSearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(jumpSearch(arr, 10), -1) << "Empty array should return -1";
}

// Test: Single element found
TEST(JumpSearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(jumpSearch(arr, 5), 0) << "Single element found → index 0";
}

// Test: Single element not found
TEST(JumpSearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(jumpSearch(arr, 10), -1) << "Single element not found → -1";
}

// Test: Small array
TEST(JumpSearchTest, SmallArray) {
    std::vector<int> arr = {1, 3, 5, 7};
    EXPECT_EQ(jumpSearch(arr, 3), 1) << "Should find 3 at index 1";
    EXPECT_EQ(jumpSearch(arr, 7), 3) << "Should find 7 at index 3";
}

// Test: Duplicate elements (should return valid index)
TEST(JumpSearchTest, DuplicateElements) {
    std::vector<int> arr = {2, 2, 2, 3, 3, 3, 4, 4};
    int result = jumpSearch(arr, 3);
    EXPECT_GE(result, 3) << "Result must be one of the indices where 3 occurs";
    EXPECT_LE(result, 5) << "Result must be within bounds";
    EXPECT_EQ(arr[result], 3) << "Returned value must be 3";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}