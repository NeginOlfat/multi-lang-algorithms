import unittest
from self_organizing_search import SelfOrganizingList


class TestSelfOrganizingList(unittest.TestCase):

    def test_move_to_front_single_access(self):
        sol = SelfOrganizingList(['A', 'B', 'C'], strategy='move_to_front')
        sol.search('B')
        self.assertEqual(sol.items, ['B', 'A', 'C'])

    def test_move_to_front_multiple_access(self):
        sol = SelfOrganizingList(['A', 'B', 'C', 'D'], strategy='move_to_front')
        sol.search('C')  # → [C, A, B, D]
        sol.search('B')  # → [B, C, A, D]
        self.assertEqual(sol.items, ['B', 'C', 'A', 'D'])

    def test_transpose_once(self):
        sol = SelfOrganizingList(['A', 'B', 'C'], strategy='transpose')
        sol.search('C')  # swaps with B → [A, C, B]
        self.assertEqual(sol.items, ['A', 'C', 'B'])

    def test_transpose_multiple(self):
        sol = SelfOrganizingList(['A', 'B', 'C', 'D'], strategy='transpose')
        sol.search('D')  # → [A, B, C, D] (no change if last)
        sol.search('C')  # → [A, B, D, C]
        sol.search('D')  # → [A, B, D, C] (now D is before C)
        self.assertEqual(sol.items, ['A', 'B', 'D', 'C'])

    def test_count_strategy_reorders_correctly(self):
        sol = SelfOrganizingList(['X', 'Y', 'Z'], strategy='count')
        sol.search('Z')
        sol.search('Y')
        sol.search('Z')
        # Z:2, Y:1, X:0 → should be [Z, Y, X]
        self.assertEqual(sol.items, ['Z', 'Y', 'X'])

    def test_count_increments_properly(self):
        sol = SelfOrganizingList(['P', 'Q'], strategy='count')
        sol.search('Q')
        sol.search('Q')
        self.assertEqual(sol.access_count['Q'], 2)
        self.assertEqual(sol.access_count['P'], 0)

    def test_empty_list_search_returns_minus_one(self):
        sol = SelfOrganizingList([], strategy='move_to_front')
        self.assertEqual(sol.search('X'), -1)

    def test_not_found_returns_minus_one(self):
        sol = SelfOrganizingList(['A', 'B'], strategy='move_to_front')
        self.assertEqual(sol.search('C'), -1)

    def test_unaffected_strategies_on_not_found(self):
        sol = SelfOrganizingList(['A', 'B'], strategy='move_to_front')
        sol.search('C')
        self.assertEqual(sol.items, ['A', 'B'])  # Should not change

    def test_case_sensitivity(self):
        sol = SelfOrganizingList(['a', 'A'], strategy='move_to_front')
        self.assertEqual(sol.search('A'), 1)
        self.assertEqual(sol.items, ['A', 'a'])


if __name__ == "__main__":
    unittest.main()