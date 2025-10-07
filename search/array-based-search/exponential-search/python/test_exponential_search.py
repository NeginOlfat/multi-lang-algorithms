import unittest
from exponential_search import exponential_search


class TestExponentialSearch(unittest.TestCase):

    def test_target_found_in_middle(self):
        self.assertEqual(exponential_search([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 70), 6)

    def test_target_at_beginning(self):
        self.assertEqual(exponential_search([1, 2, 3, 4, 5], 1), 0)

    def test_target_at_end(self):
        self.assertEqual(exponential_search([1, 2, 3, 4, 5], 5), 4)

    def test_target_not_present(self):
        self.assertEqual(exponential_search([1, 2, 3, 4, 5], 6), -1)

    def test_empty_array(self):
        self.assertEqual(exponential_search([], 10), -1)

    def test_single_element_found(self):
        self.assertEqual(exponential_search([5], 5), 0)

    def test_single_element_not_found(self):
        self.assertEqual(exponential_search([5], 10), -1)

    def test_small_array_exact_power_of_two(self):
        self.assertEqual(exponential_search([1, 3, 5, 7], 7), 3)

    def test_target_larger_than_all_elements(self):
        self.assertEqual(exponential_search([1, 2, 3, 4], 10), -1)

    def test_target_smaller_than_first_element(self):
        self.assertEqual(exponential_search([10, 20, 30], 5), -1)

    def test_duplicates_and_target_found(self):
        arr = [2, 2, 2, 3, 3, 3, 4, 4]
        result = exponential_search(arr, 3)
        self.assertIn(result, [3, 4, 5])  # Must be one of the valid indices
        self.assertEqual(arr[result], 3)


if __name__ == "__main__":
    unittest.main()