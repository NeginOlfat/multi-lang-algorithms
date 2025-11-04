import unittest
from hash_search import HashTable


class TestHashTable(unittest.TestCase):
    
    def setUp(self):
        self.ht = HashTable(initial_size=4)
    
    def test_insert_and_search(self):
        self.ht.insert("isbn1", {"title": "Book 1"})
        result = self.ht.search("isbn1")
        self.assertIsNotNone(result)
        self.assertEqual(result["title"], "Book 1")
    
    def test_update_existing_key(self):
        self.ht.insert("isbn1", {"title": "Old Title"})
        self.ht.insert("isbn1", {"title": "New Title"})  # Update
        result = self.ht.search("isbn1")
        self.assertEqual(result["title"], "New Title")
    
    def test_delete(self):
        self.ht.insert("isbn1", {"title": "To Delete"})
        self.assertTrue("isbn1" in self.ht)
        
        self.ht.delete("isbn1")
        self.assertIsNone(self.ht.search("isbn1"))
        self.assertFalse("isbn1" in self.ht)
    
    def test_search_missing_key(self):
        result = self.ht.search("missing")
        self.assertIsNone(result)
    
    def test_load_factor_triggers_resize(self):
        # Fill up to trigger resize (size=4 → resize at ~3 items)
        books = [f"isbn{i}" for i in range(5)]
        for isbn in books:
            self.ht.insert(isbn, {"title": f"Book {isbn}"})
        
        # After inserts, size should have doubled
        self.assertGreater(self.ht.size, 4)
        self.assertGreaterEqual(self.ht.count, 5)
    
    def test_collision_handling_separate_chaining(self):
        # Force collision by using keys with same hash (rare, but test structure)
        self.ht.insert("a", {"title": "A"})
        self.ht.insert("b", {"title": "B"})
        
        # Both may go to same bucket — check that both are retrievable
        self.assertEqual(self.ht.search("a")["title"], "A")
        self.assertEqual(self.ht.search("b")["title"], "B")
    
    def test_len_and_contains(self):
        self.ht.insert("k1", {"x": 1})
        self.ht.insert("k2", {"x": 2})
        
        self.assertEqual(len(self.ht), 2)
        self.assertIn("k1", self.ht)
        self.assertIn("k2", self.ht)
        self.assertNotIn("k3", self.ht)
    
    def test_empty_table(self):
        self.assertEqual(len(self.ht), 0)
        self.assertEqual(self.ht.count, 0)
        self.assertEqual(self.ht.load_factor, 0.0)
        self.assertIsNone(self.ht.search("any"))


if __name__ == "__main__":
    unittest.main()