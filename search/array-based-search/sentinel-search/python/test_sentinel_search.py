import unittest
from sentinel_search import sentinel_search


class TestSentinelSearch(unittest.TestCase):

    def test_target_in_middle(self):
        arr = [10, 20, 35, 40, 50]
        self.assertEqual(sentinel_search(arr, 35), 2)
        self.assertEqual(arr, [10, 20, 35, 40, 50])  # Original preserved

    def test_target_at_beginning(self):
        arr = [1, 2, 3, 4, 5]
        self.assertEqual(sentinel_search(arr, 1), 0)
        self.assertEqual(arr, [1, 2, 3, 4, 5])

    def test_target_at_end(self):
        arr = [1, 2, 3, 4, 5]
        self.assertEqual(sentinel_search(arr, 5), 4)
        self.assertEqual(arr, [1, 2, 3, 4, 5])

    def test_target_not_present(self):
        arr = [1, 2, 3, 4, 5]
        self.assertEqual(sentinel_search(arr, 6), -1)
        self.assertEqual(arr, [1, 2, 3, 4, 5])

    def test_empty_array(self):
        arr = []
        self.assertEqual(sentinel_search(arr, 10), -1)

    def test_single_element_found(self):
        arr = [5]
        self.assertEqual(sentinel_search(arr, 5), 0)
        self.assertEqual(arr, [5])

    def test_single_element_not_found(self):
        arr = [5]
        self.assertEqual(sentinel_search(arr, 10), -1)
        self.assertEqual(arr, [5])

    def test_two_elements_first_is_target(self):
        arr = [7, 3]
        self.assertEqual(sentinel_search(arr, 7), 0)
        self.assertEqual(arr, [7, 3])

    def test_two_elements_second_is_target(self):
        arr = [3, 7]
        self.assertEqual(sentinel_search(arr, 7), 1)
        self.assertEqual(arr, [3, 7])

    def test_all_duplicates_and_target_present(self):
        arr = [5, 5, 5, 5]
        result = sentinel_search(arr, 5)
        self.assertIn(result, range(4))  # Must return valid index
        self.assertEqual(arr, [5, 5, 5, 5])  # Unchanged


if __name__ == "__main__":
    unittest.main()