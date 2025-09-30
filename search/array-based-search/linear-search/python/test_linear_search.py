import unittest

from linear_search import linear_search


class TestLinearSearch(unittest.TestCase):
    def test_target_at_beginning(self):
        self.assertEqual(linear_search([1, 2, 3], 1), 0)

    def test_target_in_middle(self):
        self.assertEqual(linear_search([10, 20, 30, 40], 30), 2)

    def test_target_at_end(self):
        self.assertEqual(linear_search([10, 20, 30], 30), 2)

    def test_target_not_present(self):
        self.assertEqual(linear_search([10, 20, 30], 40), -1)

    def test_empty_list(self):
        self.assertEqual(linear_search([], 10), -1)

    def test_single_element_found(self):
        self.assertEqual(linear_search([5], 5), 0)

    def test_single_element_not_found(self):
        self.assertEqual(linear_search([5], 10), -1)

    def test_duplicate_elements(self):
        # Linear search returns the first occurrence
        self.assertEqual(linear_search([5, 5, 5], 5), 0)


if __name__ == "__main__":
    unittest.main()