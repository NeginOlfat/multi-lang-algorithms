#include <gtest/gtest.h>
#include <vector>
#include <functional>

// Forward declarations
int ternarySearchPeak(const std::vector<int>& arr);
double ternarySearchFunctionMax(const std::function<double(double)>& f, double left, double right, double precision);

// Test: Peak in middle
TEST(TernarySearchTest, PeakInMiddle) {
    std::vector<int> arr = {1, 3, 5, 7, 8, 6, 4, 2};
    EXPECT_EQ(ternarySearchPeak(arr), 4) << "Should find peak at index 4";
}

// Test: Peak at beginning (descending)
TEST(TernarySearchTest, PeakAtBeginning) {
    std::vector<int> arr = {10, 8, 6, 4};
    EXPECT_EQ(ternarySearchPeak(arr), 0) << "Descending array → peak at start";
}

// Test: Peak at end (ascending)
TEST(TernarySearchTest, PeakAtEnd) {
    std::vector<int> arr = {1, 3, 5, 7};
    EXPECT_EQ(ternarySearchPeak(arr), 3) << "Ascending array → peak at end";
}

// Test: Single element
TEST(TernarySearchTest, SingleElement) {
    std::vector<int> arr = {5};
    EXPECT_EQ(ternarySearchPeak(arr), 0) << "Single element → index 0";
}

// Test: Two elements — first larger
TEST(TernarySearchTest, TwoElementsFirstLarger) {
    std::vector<int> arr = {7, 3};
    EXPECT_EQ(ternarySearchPeak(arr), 0) << "Two elements: first larger → index 0";
}

// Test: Two elements — second larger
TEST(TernarySearchTest, TwoElementsSecondLarger) {
    std::vector<int> arr = {3, 7};
    EXPECT_EQ(ternarySearchPeak(arr), 1) << "Two elements: second larger → index 1";
}

// Test: Empty array
TEST(TernarySearchTest, EmptyArray) {
    std::vector<int> arr = {};
    EXPECT_EQ(ternarySearchPeak(arr), -1) << "Empty array should return -1";
}

// Test: Function maximization (parabola)
TEST(TernarySearchTest, FunctionMaximization) {
    auto f = [](double x) { return -(x - 3)*(x - 3) + 10; }; // Max at x=3
    double result = ternarySearchFunctionMax(f, 0, 6, 1e-9);
    EXPECT_NEAR(result, 3.0, 1e-5) << "Maximum should be near x=3";
}

// Test: Flat plateau — any peak index is acceptable
TEST(TernarySearchTest, FlatPlateauValidIndex) {
    std::vector<int> arr = {1, 5, 5, 5, 2};
    int result = ternarySearchPeak(arr);
    EXPECT_GE(result, 1) << "Result must be one of the indices where 5 occurs";
    EXPECT_LE(result, 3) << "Result must be within bounds";
    EXPECT_EQ(arr[result], 5) << "Returned value must be 5";
}

// Entry point for tests
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}