#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

/**
 * Sorts a vector using the Counting Sort algorithm.
 *
 * @param arr The input vector to be sorted.
 * @return A new sorted vector (original is not modified).
 *
 * Time Complexity: O(n + k) where n = size, k = range (max - min + 1)
 * Space Complexity: O(k) for count array
 *
 * ✅ Stable: preserves relative order of equal elements
 * ✅ Works with negative numbers
 * ❌ Not in-place
 */
std::vector<int> countingSort(const std::vector<int>& arr) {
    // Handle edge cases
    if (arr.size() <= 1) {
        return arr;
    }

    // Find min and max to determine range
    int min_val = *std::min_element(arr.begin(), arr.end());
    int max_val = *std::max_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;

    // Step 1: Count frequency of each element
    std::vector<int> count(range, 0);
    for (int value : arr) {
        count[value - min_val]++; // Shift index by min_val
    }

    // Step 2: Compute cumulative count
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build output array from right to left (for stability)
    std::vector<int> output(arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        int value = arr[i];
        int countIndex = value - min_val;

        // Place element at its final position
        int position = count[countIndex] - 1;
        output[position] = value;

        // Decrement count for next occurrence
        count[countIndex]--;
    }

    return output;
}

// Helper: Print a vector
void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (int i = 0; i < arr.size(); ++i) {
        std::cout << arr[i];
        if (i < arr.size() - 1) std::cout << ", ";
    }
    std::cout << "]";
}

// Example class to demonstrate stable sorting of objects
struct Person {
    std::string name;
    int grade;

    // Default constructor
    Person() : name("UNKNOWN"), grade(0) {}

    Person(std::string n, int g) : name(std::move(n)), grade(g) {}

    void print() const {
        std::cout << name << ": " << grade;
    }
};

/**
 * Stable counting sort for objects using a key extractor function.
 *
 * @param list     The list of objects to sort.
 * @param keyFunc  Function that returns the integer key for an object.
 * @return A new sorted vector (stable).
 */
template<typename T, typename KeyFunc>
std::vector<T> countingSortObjects(const std::vector<T>& list, KeyFunc keyFunc) {
    if (list.size() <= 1) {
        return list;
    }

    // Extract keys and find min/max
    std::vector<int> keys;
    for (const auto& item : list) {
        keys.push_back(keyFunc(item));
    }

    int min_val = *std::min_element(keys.begin(), keys.end());
    int max_val = *std::max_element(keys.begin(), keys.end());
    int range = max_val - min_val + 1;

    // Step 1: Count frequencies
    std::vector<int> count(range, 0);
    for (int key : keys) {
        count[key - min_val]++;
    }

    // Step 2: Cumulative count
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build output from right to left (stable)
    std::vector<T> output(list.size());
    for (int i = list.size() - 1; i >= 0; i--) {
        const T& item = list[i];
        int key = keyFunc(item);
        int pos = count[key - min_val] - 1;
        output[pos] = item;
        count[key - min_val]--;
    }

    return output;
}

// Example Usage
int main() {
    std::vector<int> numbers = {4, 2, 2, 8, 3, 3, 1};

    std::cout << "Original Array: ";
    printArray(numbers);
    std::cout << std::endl;

    std::vector<int> sorted = countingSort(numbers);
    std::cout << "Sorted Array: ";
    printArray(sorted);
    std::cout << std::endl;

    // Test with negative numbers
    std::vector<int> withNegatives = {-1, -5, 2, 0, 2, -5, 1};
    std::cout << "With Negatives: ";
    printArray(withNegatives);
    std::cout << std::endl;

    std::vector<int> sortedNeg = countingSort(withNegatives);
    std::cout << "Sorted (handles negatives): ";
    printArray(sortedNeg);
    std::cout << std::endl;

    // Test stability with objects
    std::vector<Person> people = {
        Person("Alice", 2),
        Person("Bob", 1),
        Person("Charlie", 2),
        Person("David", 1)
    };

    auto sortedPeople = countingSortObjects(people, [](const Person& p) { return p.grade; });

    std::cout << "\nStability Test (by grade):" << std::endl;
    for (const auto& p : sortedPeople) {
        p.print();
        std::cout << std::endl;
    }

    return 0;
}