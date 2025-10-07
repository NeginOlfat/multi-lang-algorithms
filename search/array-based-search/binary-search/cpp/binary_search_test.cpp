#include <gtest/gtest.h>
#include <vector>

// Forward declarations
int binarySearchIterative(const std::vector<int>& arr, int target);
int binarySearchRecursive(const std::vector<int>& arr, int target);

// Test: Target at beginning
TEST(BinarySearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(binarySearchIterative(arr, 1), 0) << "Iterative: should find at index 0";
    EXPECT_EQ(binarySearchRecursive(arr, 1), 0) << "Recursive: should find at index 0";
}

// Test: Target in middle
TEST(BinarySearchTest, TargetInMiddle) {
    std::vector<int> arr = {10, 20, 30, 40, 50};
    EXPECT_EQ(binarySearchIterative(arr, 30), 2) << "Iterative: should find at index 2";
    EXPECT_EQ(binarySearchRecursive(arr, 30), 2) << "Recursive: should find at index 2";
}

// Test: Target at end
TEST(BinarySearchTest, TargetAtEnd) {
    std::vector<int> arr = {10, 20, 30, 40, 50};
    EXPECT_EQ(binarySearchIterative(arr, 50), 4) << "Iterative: should find at last index";
    EXPECT_EQ(binarySearchRecursive(arr, 50), 4) << "Recursive: should find at last index";
}

// Test: Target not present
TEST(BinarySearchTest, TargetNotFound) {
    std::vector<int> arr = {10, 20, 30};
    EXPECT_EQ(binarySearchIterative(arr, 40), -1) << "Iterative: should return -1";
    EXPECT_EQ(binarySearchRecursive(arr, 40), -1) << "Recursive: should return -1";
}

// Test: Empty array
TEST(BinarySearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(binarySearchIterative(arr, 10), -1) << "Iterative: empty → -1";
    EXPECT_EQ(binarySearchRecursive(arr, 10), -1) << "Recursive: empty → -1";
}

// Test: Single element found
TEST(BinarySearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(binarySearchIterative(arr, 5), 0) << "Iterative: single found → 0";
    EXPECT_EQ(binarySearchRecursive(arr, 5), 0) << "Recursive: single found → 0";
}

// Test: Single element not found
TEST(BinarySearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(binarySearchIterative(arr, 10), -1) << "Iterative: not found → -1";
    EXPECT_EQ(binarySearchRecursive(arr, 10), -1) << "Recursive: not found → -1";
}

// Test: Duplicate elements (should return any valid index)
TEST(BinarySearchTest, DuplicateElements) {
    std::vector<int> arr = {5, 5, 5, 5, 5};
    int iterResult = binarySearchIterative(arr, 5);
    int recResult = binarySearchRecursive(arr, 5);

    EXPECT_GE(iterResult, 0) << "Iterative: result should be valid index";
    EXPECT_LT(iterResult, 5) << "Iterative: result should be within bounds";
    EXPECT_GE(recResult, 0) << "Recursive: result should be valid index";
    EXPECT_LT(recResult, 5) << "Recursive: result should be within bounds";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}