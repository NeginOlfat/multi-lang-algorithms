#include <gtest/gtest.h>
#include <vector>

// Forward declaration
int sentinelSearch(std::vector<int>& arr, int target);

// Test: Target in middle
TEST(SentinelSearchTest, TargetInMiddle) {
    std::vector<int> arr = {10, 20, 35, 40, 50};
    EXPECT_EQ(sentinelSearch(arr, 35), 2) << "Should find 35 at index 2";
    EXPECT_EQ(arr[4], 50) << "Last element should be restored";
}

// Test: Target at beginning
TEST(SentinelSearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(sentinelSearch(arr, 1), 0) << "Should find first element";
    EXPECT_EQ(arr[4], 5) << "Last element should be preserved";
}

// Test: Target at end
TEST(SentinelSearchTest, TargetAtEnd) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(sentinelSearch(arr, 5), 4) << "Should find last element";
    EXPECT_EQ(arr[4], 5) << "Last element was target → should still match";
}

// Test: Not present
TEST(SentinelSearchTest, TargetNotFound) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(sentinelSearch(arr, 6), -1) << "Should return -1 for missing element";
    EXPECT_EQ(arr[4], 5) << "Array must remain unchanged";
}

// Test: Empty array
TEST(SentinelSearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(sentinelSearch(arr, 10), -1) << "Empty array should return -1";
}

// Test: Single element found
TEST(SentinelSearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(sentinelSearch(arr, 5), 0) << "Single element found → index 0";
    EXPECT_EQ(arr[0], 5) << "Array should be unchanged";
}

// Test: Single element not found
TEST(SentinelSearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(sentinelSearch(arr, 10), -1) << "Single element not found → -1";
    EXPECT_EQ(arr[0], 5) << "Array should be unchanged";
}

// Test: Two elements — first is target
TEST(SentinelSearchTest, TwoElementsFirstIsTarget) {
    std::vector<int> arr = {7, 3};
    EXPECT_EQ(sentinelSearch(arr, 7), 0) << "First element is target → index 0";
    EXPECT_EQ(arr[1], 3) << "Last element restored correctly";
}

// Test: Two elements — second is target
TEST(SentinelSearchTest, TwoElementsSecondIsTarget) {
    std::vector<int> arr = {3, 7};
    EXPECT_EQ(sentinelSearch(arr, 7), 1) << "Second element is target → index 1";
    EXPECT_EQ(arr[1], 7) << "Last element was target → should still match";
}

// Test: All duplicates — should return valid index
TEST(SentinelSearchTest, DuplicateElementsValidIndex) {
    std::vector<int> arr = {5, 5, 5, 5};
    int result = sentinelSearch(arr, 5);
    EXPECT_GE(result, 0) << "Result must be valid index";
    EXPECT_LT(result, 4) << "Result must be within bounds";
    EXPECT_EQ(arr[3], 5) << "Last element must be restored";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}