#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

/**
 * Sorts a vector using Bucket Sort.
 *
 * @param arr         The vector of doubles to sort.
 * @param numBuckets  Number of buckets to use (default: 5).
 * @return            A new sorted vector.
 *
 * Time Complexity:
 * - Best/Average: O(n + k) when data is uniformly distributed
 * - Worst: O(n²) when all elements fall into one bucket
 *
 * Space Complexity: O(n + k)
 *
 * ✅ Best for uniformly distributed data (e.g., random floats in [0,1))
 * ✅ Uses Insertion Sort for small buckets
 * ❌ Extra space required
 */
std::vector<double> bucketSort(const std::vector<double>& arr, int numBuckets = 5) {
    // Handle edge cases
    if (arr.size() <= 1) {
        return arr;
    }

    // Find min and max to determine range
    double min = *std::min_element(arr.begin(), arr.end());
    double max = *std::max_element(arr.begin(), arr.end());
    double range = max - min;

    // Avoid division by zero if all elements are the same
    if (range == 0.0) {
        return arr;
    }

    // Create k empty buckets
    std::vector<std::vector<double>> buckets(numBuckets);

    // Distribute elements into buckets
    for (double num : arr) {
        // Normalize value to bucket index: [0, numBuckets)
        int bucketIndex = static_cast<int>(std::floor((num - min) / range * (numBuckets - 1)));

        // Clamp index to [0, numBuckets - 1]
        bucketIndex = std::max(0, std::min(bucketIndex, numBuckets - 1));

        buckets[bucketIndex].push_back(num);
    }

    // Sort each bucket using Insertion Sort
    for (auto& bucket : buckets) {
        std::sort(bucket.begin(), bucket.end()); // Using std::sort for simplicity
        // Or use custom insertionSort (see below)
    }

    // Concatenate all buckets into output
    std::vector<double> sorted;
    sorted.reserve(arr.size()); // Reserve space for efficiency
    for (const auto& bucket : buckets) {
        for (double num : bucket) {
            sorted.push_back(num);
        }
    }

    return sorted;
}

/**
 * Custom Insertion Sort for a vector (in-place).
 *
 * @param arr The vector to sort.
 */
void insertionSort(std::vector<double>& arr) {
    for (size_t i = 1; i < arr.size(); ++i) {
        double key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Optional: Use custom insertionSort on each bucket
std::vector<double> bucketSortWithInsertionSort(const std::vector<double>& arr, int numBuckets = 5) {
    if (arr.size() <= 1) return arr;

    double min = *std::min_element(arr.begin(), arr.end());
    double max = *std::max_element(arr.begin(), arr.end());
    double range = max - min;

    if (range == 0.0) return arr;

    std::vector<std::vector<double>> buckets(numBuckets);

    // Distribute
    for (double num : arr) {
        int bucketIndex = std::max(0, std::min(
            static_cast<int>(std::floor((num - min) / range * (numBuckets - 1))),
            numBuckets - 1
        ));
        buckets[bucketIndex].push_back(num);
    }

    // Sort each bucket with insertionSort
    for (auto& bucket : buckets) {
        insertionSort(bucket);
    }

    // Concatenate
    std::vector<double> sorted;
    sorted.reserve(arr.size());
    for (const auto& bucket : buckets) {
        sorted.insert(sorted.end(), bucket.begin(), bucket.end());
    }

    return sorted;
}

// Helper: Print a vector
void printArray(const std::vector<double>& arr) {
    std::cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i];
        if (i < arr.size() - 1) std::cout << ", ";
    }
    std::cout << "]";
}

// Example Usage
int main() {
    std::vector<double> numbers = {0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<double> sorted = bucketSort(numbers, 5);

    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with already sorted
    std::vector<double> sortedArr = {0.1, 0.2, 0.3, 0.4, 0.5};
    std::cout << "Already Sorted: ";
    printArray(bucketSort(sortedArr, 5));
    std::cout << std::endl;

    // Test with reverse order
    std::vector<double> reverse = {0.9, 0.8, 0.7, 0.6, 0.5};
    std::cout << "Reverse Sorted: ";
    printArray(bucketSort(reverse, 5));
    std::cout << std::endl;

    // Test with duplicates
    std::vector<double> duplicates = {0.3, 0.1, 0.4, 0.1, 0.5, 0.9, 0.2, 0.6, 0.5, 0.3};
    std::cout << "With Duplicates: ";
    printArray(bucketSort(duplicates, 5));
    std::cout << std::endl;

    // Test with all same values
    std::vector<double> same = {0.5, 0.5, 0.5};
    std::cout << "All Same: ";
    printArray(bucketSort(same, 5));
    std::cout << std::endl;

    return 0;
}