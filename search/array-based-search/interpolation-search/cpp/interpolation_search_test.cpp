#include <gtest/gtest.h>
#include <vector>

// Forward declaration
int interpolationSearch(const std::vector<int>& arr, int target);

// Test: Target found in uniform array
TEST(InterpolationSearchTest, TargetFoundInUniformArray) {
    std::vector<int> arr = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    EXPECT_EQ(interpolationSearch(arr, 70), 6) << "Should find 70 at index 6";
}

// Test: Target at beginning
TEST(InterpolationSearchTest, TargetAtBeginning) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(interpolationSearch(arr, 1), 0) << "Should find first element";
}

// Test: Target at end
TEST(InterpolationSearchTest, TargetAtEnd) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(interpolationSearch(arr, 5), 4) << "Should find last element";
}

// Test: Not present
TEST(InterpolationSearchTest, TargetNotFound) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    EXPECT_EQ(interpolationSearch(arr, 6), -1) << "Should return -1 for missing element";
}

// Test: Empty array
TEST(InterpolationSearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(interpolationSearch(arr, 10), -1) << "Empty array should return -1";
}

// Test: Single element found
TEST(InterpolationSearchTest, SingleElementFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(interpolationSearch(arr, 5), 0) << "Single element found → index 0";
}

// Test: Single element not found
TEST(InterpolationSearchTest, SingleElementNotFound) {
    std::vector<int> arr = {5};
    EXPECT_EQ(interpolationSearch(arr, 10), -1) << "Single element not found → -1";
}

// Test: Duplicate values (all same)
TEST(InterpolationSearchTest, DuplicateValuesAllSame) {
    std::vector<int> arr = {5, 5, 5, 5};
    EXPECT_EQ(interpolationSearch(arr, 5), 0) << "All duplicates — match returns index 0";
    EXPECT_EQ(interpolationSearch(arr, 3), -1) << "All duplicates — no match returns -1";
}

// Test: Non-uniform data (worst-case-like)
TEST(InterpolationSearchTest, NonUniformDataStillFinds) {
    std::vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 1000};
    EXPECT_EQ(interpolationSearch(arr, 9), 8) << "Should still find even in skewed data";
}

// Test: Division-by-zero protection
TEST(InterpolationSearchTest, DivisionByZeroProtection) {
    std::vector<int> arr = {7, 7, 7, 7};
    EXPECT_EQ(interpolationSearch(arr, 7), 0) << "Equal elements — handled safely";
    EXPECT_EQ(interpolationSearch(arr, 5), -1) << "Equal elements — not found returns -1";
}

// Test: Bounds safety (extrapolation fails gracefully)
TEST(InterpolationSearchTest, OutOfBoundsEstimationSafe) {
    std::vector<int> arr = {10, 20, 30};
    int result = interpolationSearch(arr, 25);
    EXPECT_TRUE(result == -1 || result == 2) << "Should not crash on bad estimate";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}