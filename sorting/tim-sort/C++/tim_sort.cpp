#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
#include <cstddef>

/**
 * Simplified Tim Sort (Educational Version)
 *
 * ✅ No array mutation during run detection
 * ✅ Stable merging
 * ✅ Matches expected output
 *
 * For learning only — not production
 *
 * For real projects, use: std::sort() or std::stable_sort()
 * (Note: C++ std::sort uses IntroSort, not Tim Sort)
 */

std::vector<int> timSort(const std::vector<int>& arr) {
    if (arr.size() <= 1) {
        return arr;
    }

    size_t n = arr.size();
    std::vector<std::vector<int>> runs;
    size_t i = 0;

    // Helper: Merge two sorted vectors stably
    auto merge = [](const std::vector<int>& left, const std::vector<int>& right) {
        std::vector<int> result;
        size_t i = 0, j = 0;

        while (i < left.size() && j < right.size()) {
            if (left[i] <= right[j]) {
                result.push_back(left[i++]);
            } else {
                result.push_back(right[j++]);
            }
        }

        // Add remaining elements
        while (i < left.size()) result.push_back(left[i++]);
        while (j < right.size()) result.push_back(right[j++]);

        return result;
    };

    // Step 1: Calculate minrun
    auto getMinrun = [](size_t n) {
        int r = 0;
        while (n >= 64) {
            r |= n & 1;
            n >>= 1;
        }
        return static_cast<int>(n + r);
    };

    int minrun = std::min(getMinrun(n), 32);

    // Step 2: Find and process runs
    while (i < n) {
        size_t start = i;

        // Detect direction: decreasing or increasing
        if (i + 1 < n && arr[i] > arr[i + 1]) {
            // Decreasing run
            while (i + 1 < n && arr[i] > arr[i + 1]) {
                i++;
            }
            i++; // Include last element
        } else {
            // Increasing run
            while (i + 1 < n && arr[i] <= arr[i + 1]) {
                i++;
            }
            i++;
        }

        // Extract the run
        std::vector<int> run;
        for (size_t j = start; j < i; j++) {
            run.push_back(arr[j]);
        }

        // Reverse if decreasing
        if (run.size() > 1 && run[0] > run.back()) {
            std::reverse(run.begin(), run.end());
        }

        // Extend short run to minrun using Insertion Sort
        while (run.size() < static_cast<size_t>(minrun) && i < n) {
            int val = arr[i];
            // Find insertion point (stable: <=)
            size_t pos = 0;
            while (pos < run.size() && run[pos] <= val) {
                pos++;
            }
            run.insert(run.begin() + pos, val);
            i++;
        }

        runs.push_back(run);
    }

    // Step 3: Merge runs with stack invariants
    std::stack<std::vector<int>> stack;
    for (const auto& run : runs) {
        stack.push(run);

        // Invariant: stack[-2].size() > stack[-1].size()
        while (stack.size() > 1) {
            // Peek at top two elements
            std::vector<int> top = stack.top();
            stack.pop();
            std::vector<int> second = stack.top();
            stack.push(top); // Restore top

            if (second.size() <= top.size()) {
                // Merge top two
                std::vector<int> right = stack.top(); stack.pop();
                std::vector<int> left = stack.top(); stack.pop();
                stack.push(merge(left, right));
            } else {
                break; // Invariant satisfied
            }
        }
    }

    // Final merge
    while (stack.size() > 1) {
        std::vector<int> right = stack.top(); stack.pop();
        std::vector<int> left = stack.top(); stack.pop();
        stack.push(merge(left, right));
    }

    return stack.empty() ? std::vector<int>() : stack.top();
}

// Helper: Print a vector
void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i];
        if (i < arr.size() - 1) std::cout << ", ";
    }
    std::cout << "]";
}

// Example Usage
int main() {
    std::vector<int> numbers = {10, 9, 8, 7, 15, 16, 17, 3, 2, 1, 12, 13, 14, 18, 19, 20};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = timSort(numbers);
    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted
    std::vector<int> sortedArr = {1, 2, 3, 4, 5};
    std::cout << "\nAlready Sorted: ";
    printArray(timSort(sortedArr));
    std::cout << std::endl;

    // Test with reverse
    std::vector<int> reverse = {5, 4, 3, 2, 1};
    std::cout << "Reverse Sorted: ";
    printArray(timSort(reverse));
    std::cout << std::endl;

    // Test with duplicates
    std::vector<int> duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    std::cout << "With Duplicates: ";
    printArray(timSort(duplicates));
    std::cout << std::endl;

    return 0;
}