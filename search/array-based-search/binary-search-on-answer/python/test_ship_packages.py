import unittest
from ship_packages import min_ship_capacity, can_ship


class TestShipPackages(unittest.TestCase):

    def test_example_case(self):
        weights = [1,2,3,4,5,6,7,8,9,10]
        D = 5
        self.assertEqual(min_ship_capacity(weights, D), 15)

    def test_can_ship_basic(self):
        weights = [1,2,3,4,5]
        self.assertTrue(can_ship(weights, 10, 3))  # [1,2,3,4][5] → 2 days
        self.assertFalse(can_ship(weights, 3, 3))  # Needs 4 days: [1,2][3][4][5]

    def test_minimum_capacity_is_max_weight(self):
        weights = [1, 1, 1, 1]
        D = 4
        self.assertEqual(min_ship_capacity(weights, D), 1)

    def test_all_in_one_day(self):
        weights = [1, 2, 3]
        D = 1
        self.assertEqual(min_ship_capacity(weights, D), 6)

    def test_each_package_one_day(self):
        weights = [5, 4, 3, 2, 1]
        D = 5
        self.assertEqual(min_ship_capacity(weights, D), 5)

    def test_large_gap_in_weights(self):
        weights = [1, 1, 1, 1, 10]
        D = 2
        # [1,1,1,1], [10] → needs capacity >=10
        self.assertEqual(min_ship_capacity(weights, D), 10)

    def test_three_days_with_balance(self):
        weights = [3, 2, 2, 4, 1, 4]
        D = 3
        # Valid split: [3,2], [2,4], [1,4] → max load = 6
        self.assertEqual(min_ship_capacity(weights, D), 6)

    def test_invalid_D_greater_than_n(self):
        weights = [1, 2, 3]
        with self.assertRaises(ValueError):
            min_ship_capacity(weights, 5)

    def test_empty_weights(self):
        with self.assertRaises(ValueError):
            min_ship_capacity([], 1)


if __name__ == "__main__":
    unittest.main()