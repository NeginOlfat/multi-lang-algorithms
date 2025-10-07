import unittest
from binary_search import binary_search, binary_search_recursive


class TestBinarySearch(unittest.TestCase):

    def test_target_at_beginning(self):
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 1), 0)
        self.assertEqual(binary_search_recursive([1, 2, 3, 4, 5], 1), 0)

    def test_target_in_middle(self):
        self.assertEqual(binary_search([10, 20, 30, 40, 50], 30), 2)
        self.assertEqual(binary_search_recursive([10, 20, 30, 40, 50], 30), 2)

    def test_target_at_end(self):
        self.assertEqual(binary_search([10, 20, 30, 40, 50], 50), 4)
        self.assertEqual(binary_search_recursive([10, 20, 30, 40, 50], 50), 4)

    def test_target_not_present(self):
        self.assertEqual(binary_search([10, 20, 30], 40), -1)
        self.assertEqual(binary_search_recursive([10, 20, 30], 40), -1)

    def test_empty_list(self):
        self.assertEqual(binary_search([], 10), -1)
        self.assertEqual(binary_search_recursive([], 10), -1)

    def test_single_element_found(self):
        self.assertEqual(binary_search([5], 5), 0)
        self.assertEqual(binary_search_recursive([5], 5), 0)

    def test_single_element_not_found(self):
        self.assertEqual(binary_search([5], 10), -1)
        self.assertEqual(binary_search_recursive([5], 10), -1)

    def test_duplicate_elements(self):
        # Binary search may return any occurrence in duplicates
        # We expect it to find one of them (typically the first found via midpoint)
        arr = [5, 5, 5, 5, 5]
        result = binary_search(arr, 5)
        self.assertIn(result, range(5))  # Must be valid index

        result_rec = binary_search_recursive(arr, 5)
        self.assertIn(result_rec, range(5))


if __name__ == "__main__":
    unittest.main()