import unittest
from ternary_search import ternary_search_peak, ternary_search_function_max


class TestTernarySearch(unittest.TestCase):

    def test_peak_in_middle(self):
        self.assertEqual(ternary_search_peak([1, 3, 5, 7, 8, 6, 4, 2]), 4)

    def test_peak_at_beginning(self):
        self.assertEqual(ternary_search_peak([10, 8, 6, 4]), 0)

    def test_peak_at_end(self):
        self.assertEqual(ternary_search_peak([1, 3, 5, 7]), 3)

    def test_single_element(self):
        self.assertEqual(ternary_search_peak([5]), 0)

    def test_two_elements_first_larger(self):
        self.assertEqual(ternary_search_peak([7, 3]), 0)

    def test_two_elements_second_larger(self):
        self.assertEqual(ternary_search_peak([3, 7]), 1)

    def test_empty_array(self):
        self.assertEqual(ternary_search_peak([]), -1)

    def test_null_input(self):
        self.assertEqual(ternary_search_peak(None), -1)

    def test_function_maximum(self):
        def f(x):
            return -(x - 3)**2 + 10  # Max at x=3
        result = ternary_search_function_max(f, 0, 6)
        self.assertAlmostEqual(result, 3.0, delta=1e-5)

    def test_flat_plateau_handled(self):
        # Simulate plateau — still returns valid index
        arr = [1, 5, 5, 5, 2]
        result = ternary_search_peak(arr)
        self.assertIn(result, [1, 2, 3])  # Any of the 5s is acceptable
        self.assertEqual(arr[result], 5)


if __name__ == "__main__":
    unittest.main()