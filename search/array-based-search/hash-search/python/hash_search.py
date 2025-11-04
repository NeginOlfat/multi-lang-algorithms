class HashTable:
    """
    A hash table implementation using separate chaining for collision resolution.
    
    Supports O(1) average-case insert, search, and delete operations.
    Automatically resizes when load factor exceeds threshold (0.75).
    """
    
    def __init__(self, initial_size=8):
        """
        Initialize hash table with given initial size.
        
        Args:
            initial_size (int): Initial number of buckets (should be power of 2)
        """
        self.size = initial_size
        self.count = 0
        self.buckets = [[] for _ in range(self.size)]
        self.load_factor_threshold = 0.75
    
    def _hash(self, key):
        """
        Compute hash index for a given key.
        
        Uses Python's built-in hash() and masks for fast modulo with power-of-2 size.
        
        Args:
            key: Hashable key (e.g., string, int)
            
        Returns:
            int: Index in range [0, size)
        """
        return hash(key) & (self.size - 1)  # Fast mod when size is power of 2
    
    @property
    def load_factor(self):
        """Current load factor (count / size)."""
        return self.count / self.size
    
    def _resize(self):
        """Resize table to double current size and rehash all entries."""
        old_buckets = self.buckets
        self.size *= 2
        self.count = 0
        self.buckets = [[] for _ in range(self.size)]
        
        # Reinsert all existing items
        for chain in old_buckets:
            for key, value in chain:
                self.insert(key, value)
        
        print(f"🔁 Resized hash table → New size: {self.size}, Load factor: {self.load_factor:.2f}")
    
    def insert(self, key, value):
        """
        Insert or update key-value pair.
        
        Args:
            key: Hashable identifier
            value: Associated data
        """
        if self.load_factor >= self.load_factor_threshold:
            self._resize()
        
        index = self._hash(key)
        chain = self.buckets[index]
        
        # Check if key already exists
        for i, (k, v) in enumerate(chain):
            if k == key:
                chain[i] = (key, value)
                return
        
        # Key not found → append new entry
        chain.append((key, value))
        self.count += 1
    
    def search(self, key):
        """
        Find value by key.
        
        Args:
            key: Key to search for
            
        Returns:
            Value if found, None otherwise
        """
        index = self._hash(key)
        chain = self.buckets[index]
        
        for k, v in chain:
            if k == key:
                return v
        return None  # Not found
    
    def delete(self, key):
        """
        Remove key-value pair by key.
        
        Args:
            key: Key to remove
            
        Returns:
            True if deleted, False if not found
        """
        index = self._hash(key)
        chain = self.buckets[index]
        
        for i, (k, v) in enumerate(chain):
            if k == key:
                del chain[i]
                self.count -= 1
                return True
        return False  # Not found
    
    def __len__(self):
        return self.count
    
    def __contains__(self, key):
        return self.search(key) is not None
    
    def display(self):
        """Print current state of hash table."""
        print("\n📚 Hash Table State:")
        print(f"Size: {self.size} | Count: {self.count} | Load Factor: {self.load_factor:.2f}")
        for i, chain in enumerate(self.buckets):
            if chain:
                entries = " → ".join(f"('{k}': '{v['title']}')" for k, v in chain)
                print(f"  [{i}] {entries}")


# Example usage: Library Book Lookup System
if __name__ == "__main__":
    print("🔍 Hash Search Example: Library Book Lookup System\n")
    
    # Create hash table for books
    library = HashTable(initial_size=4)
    
    # Sample books with ISBN as key
    books = [
        ("978-0134685991", {
            "title": "Effective Java",
            "author": "Joshua Bloch",
            "shelf": "A3"
        }),
        ("978-0596009205", {
            "title": "Python Cookbook",
            "author": "David Beazley",
            "shelf": "B1"
        }),
        ("978-1449369415", {
            "title": "Design Patterns",
            "author": "Erich Gamma",
            "shelf": "C7"
        }),
        ("978-0262033848", {
            "title": "Introduction to Algorithms",
            "author": "Cormen",
            "shelf": "D2"
        }),
        ("978-0132350884", {
            "title": "Clean Code",
            "author": "Robert C. Martin",
            "shelf": "A5"
        })
    ]
    
    print("📥 Inserting books into library system...\n")
    
    for isbn, info in books:
        print(f"Inserting: '{info['title']}' (ISBN: {isbn})")
        library.insert(isbn, info)
        library.display()
        print()
    
    print("✅ All books inserted.\n")
    
    # Search examples
    print("🔍 Searching for books:\n")
    
    search_isbns = [
        "978-0134685991",  # Exists
        "978-0262033848",  # Exists
        "978-9999999999"   # Does not exist
    ]
    
    for isbn in search_isbns:
        book = library.search(isbn)
        if book:
            print(f"✅ Found: '{book['title']}' by {book['author']} (Shelf: {book['shelf']})")
        else:
            print(f"❌ ISBN '{isbn}' not found in library.")
    
    print()
    
    # Delete example
    print("🗑️ Deleting 'Clean Code'...\n")
    success = library.delete("978-0132350884")
    if success:
        print("✅ 'Clean Code' removed from library.")
    else:
        print("❌ Book not found.")
    
    library.display()
    
    print(f"\n🎯 Final Stats: {len(library)} books in {library.size} buckets")