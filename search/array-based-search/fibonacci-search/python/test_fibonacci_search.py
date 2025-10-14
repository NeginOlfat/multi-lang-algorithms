import unittest
from fibonacci_search import fibonacci_search


class TestFibonacciSearch(unittest.TestCase):

    def test_target_in_middle(self):
        self.assertEqual(fibonacci_search([10, 20, 30, 40, 50, 60, 70, 80], 60), 5)

    def test_target_at_beginning(self):
        self.assertEqual(fibonacci_search([1, 2, 3, 4, 5], 1), 0)

    def test_target_at_end(self):
        self.assertEqual(fibonacci_search([1, 2, 3, 4, 5], 5), 4)

    def test_target_not_present(self):
        self.assertEqual(fibonacci_search([1, 2, 3, 4, 5], 6), -1)

    def test_empty_array(self):
        self.assertEqual(fibonacci_search([], 10), -1)

    def test_single_element_found(self):
        self.assertEqual(fibonacci_search([5], 5), 0)

    def test_single_element_not_found(self):
        self.assertEqual(fibonacci_search([5], 10), -1)

    def test_small_array_exact_fibonacci_size(self):
        # Size 5 is a Fibonacci number
        self.assertEqual(fibonacci_search([10, 20, 30, 40, 50], 40), 3)

    def test_duplicate_elements(self):
        arr = [5, 5, 5, 5, 5]
        result = fibonacci_search(arr, 5)
        self.assertIn(result, range(5))  # Must return valid index
        self.assertEqual(arr[result], 5)

    def test_target_smaller_than_first(self):
        self.assertEqual(fibonacci_search([10, 20, 30], 5), -1)

    def test_target_larger_than_last(self):
        self.assertEqual(fibonacci_search([10, 20, 30], 40), -1)


if __name__ == "__main__":
    unittest.main()