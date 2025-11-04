## ▶️ How to Run
```
# Run the example
node hash_search.js

# Run the tests
node test_hash_search.js
```

## 🖨️ Output When You Run It
```
🔍 Hash Search Example: Library Book Lookup System

📥 Inserting books into library system...

Inserting: 'Effective Java' (ISBN: 978-0134685991)

📚 Hash Table State:
Size: 4 | Count: 1 | Load Factor: 0.25
  [1] ('978-0134685991': 'Effective Java')

... (continues with resizing, searches, deletion)

✅ All books inserted.

🔍 Searching for books:

✅ Found: 'Effective Java' by Joshua Bloch (Shelf: A3)
✅ Found: 'Introduction to Algorithms' by Cormen (Shelf: D2)
❌ ISBN '978-9999999999' not found in library.

🗑️ Deleting 'Clean Code'...

✅ 'Clean Code' removed from library.

📚 Hash Table State:
Size: 8 | Count: 4 | Load Factor: 0.50
  [1] ('978-0134685991': 'Effective Java')
  [2] ('978-0596009205': 'Python Cookbook')
  [3] ('978-1449369415': 'Design Patterns')
  [5] ('978-0262033848': 'Introduction to Algorithms')

🎯 Final Stats: 4 books in 8 buckets
```