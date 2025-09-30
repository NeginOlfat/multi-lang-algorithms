#include <gtest/gtest.h>
#include <vector>


int linearSearch(const std::vector<int>& arr, int target);

// Test: Target at the beginning
TEST(LinearSearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3};
    EXPECT_EQ(linearSearch(arr, 1), 0) << "Should find target at index 0";
}

// Test: Target in the middle
TEST(LinearSearchTest, TargetInMiddle) {
    std::vector<int> arr = {10, 20, 30, 40};
    EXPECT_EQ(linearSearch(arr, 30), 2) << "Should find target at index 2";
}

// Test: Target at the end
TEST(LinearSearchTest, TargetAtEnd) {
    std::vector<int> arr = {10, 20, 30};
    EXPECT_EQ(linearSearch(arr, 30), 2) << "Should find target at index 2";
}

// Test: Target not present
TEST(LinearSearchTest, TargetNotFound) {
    std::vector<int> arr = {10, 20, 30};
    EXPECT_EQ(linearSearch(arr, 40), -1) << "Should return -1 for missing target";
}

// Test: Empty array
TEST(LinearSearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(linearSearch(arr, 10), -1) << "Should return -1 for empty array";
}

// Test: Single element (found)
TEST(LinearSearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(linearSearch(arr, 5), 0) << "Should find single element at index 0";
}

// Test: Single element (not found)
TEST(LinearSearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(linearSearch(arr, 10), -1) << "Should return -1 for missing element";
}

// Test: Duplicate elements (first occurrence)
TEST(LinearSearchTest, DuplicateElements) {
    std::vector<int> arr = {5, 5, 5};
    EXPECT_EQ(linearSearch(arr, 5), 0) << "Should return first occurrence (index 0)";
}

// Entry point for tests (if running standalone)
int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}