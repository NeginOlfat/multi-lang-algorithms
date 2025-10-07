import unittest
from jump_search import jump_search


class TestJumpSearch(unittest.TestCase):

    def test_target_in_middle_block(self):
        self.assertEqual(jump_search([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7), 7)

    def test_target_at_beginning(self):
        self.assertEqual(jump_search([1, 2, 3, 4, 5], 1), 0)

    def test_target_at_end(self):
        self.assertEqual(jump_search([1, 2, 3, 4, 5], 5), 4)

    def test_target_not_present(self):
        self.assertEqual(jump_search([1, 2, 3, 4, 5], 6), -1)

    def test_empty_array(self):
        self.assertEqual(jump_search([], 10), -1)

    def test_single_element_found(self):
        self.assertEqual(jump_search([5], 5), 0)

    def test_single_element_not_found(self):
        self.assertEqual(jump_search([5], 10), -1)

    def test_small_array(self):
        # Array smaller than sqrt(n) behavior
        self.assertEqual(jump_search([1, 3, 5, 7], 3), 1)
        self.assertEqual(jump_search([1, 3, 5, 7], 7), 3)

    def test_duplicate_elements(self):
        # In case of duplicates, returns first occurrence in the block
        arr = [2, 2, 2, 3, 3, 3, 4, 4]
        result = jump_search(arr, 3)
        self.assertIn(result, [3, 4, 5])  # Must be one of the 3s
        self.assertEqual(arr[result], 3)


if __name__ == "__main__":
    unittest.main()