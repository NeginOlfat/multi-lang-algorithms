import unittest
from interpolation_search import interpolation_search


class TestInterpolationSearch(unittest.TestCase):

    def test_target_found_in_uniform_array(self):
        self.assertEqual(interpolation_search([10, 20, 30, 40, 50, 60, 70, 80, 90], 70), 6)

    def test_target_at_beginning(self):
        self.assertEqual(interpolation_search([1, 2, 3, 4, 5], 1), 0)

    def test_target_at_end(self):
        self.assertEqual(interpolation_search([1, 2, 3, 4, 5], 5), 4)

    def test_target_not_present(self):
        self.assertEqual(interpolation_search([1, 2, 3, 4, 5], 6), -1)

    def test_empty_array(self):
        self.assertEqual(interpolation_search([], 10), -1)

    def test_single_element_found(self):
        self.assertEqual(interpolation_search([5], 5), 0)

    def test_single_element_not_found(self):
        self.assertEqual(interpolation_search([5], 10), -1)

    def test_duplicate_values_all_same(self):
        # When all values are same
        self.assertEqual(interpolation_search([5, 5, 5, 5], 5), 0)
        self.assertEqual(interpolation_search([5, 5, 5, 5], 3), -1)

    def test_non_uniform_data_behavior(self):
        # Skewed distribution — worst-case-like behavior
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1000]
        self.assertEqual(interpolation_search(arr, 9), 8)

    def test_out_of_bounds_extrapolation_protection(self):
        # Test that invalid pos doesn't crash
        result = interpolation_search([10, 20, 30], 25)
        # May not find it quickly but should be safe
        self.assertIn(result, [-1, 2])  # Either not found or linear scan finds it later

    def test_division_by_zero_protection(self):
        # Prevents division by zero when arr[high] == arr[low]
        self.assertEqual(interpolation_search([5, 5, 5, 5], 5), 0)
        self.assertEqual(interpolation_search([5, 5, 5, 5], 3), -1)


if __name__ == "__main__":
    unittest.main()