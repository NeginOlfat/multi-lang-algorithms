## ▶️ How to Run

```
# Run the example
python ship_packages.py

# Run the tests
python test_ship_packages.py

# Or with verbose output
python test_ship_packages.py -v
```

### 🖨️ Output When You Run It
```
🔍 Binary Search on Answer: Ship Packages Within D Days

Weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Days Available: 5
Min Weight: 1 | Max Weight: 10 | Total: 55

🔍 Binary Search Trace:
Iter Low  High Mid  Feasible?  Action
--------------------------------------------------
1    10   55   32   ✅ Yes      Try smaller → high = 31
2    10   31   20   ✅ Yes      Try smaller → high = 19
3    10   19   14   ❌ No       Need larger → low = 15
4    15   19   17   ✅ Yes      Try smaller → high = 16
5    15   16   15   ✅ Yes      Try smaller → high = 14

✅ Minimum Required Capacity: 15

📦 Shipping Simulation (Capacity = 15, Max Days = 5):
  Day 1: [1, 2, 3, 4, 5] → Total = 15 ✅
  Day 2: [6, 7] → Total = 13 ✅
  Day 3: [8] → Total = 8 ✅
  Day 4: [9] → Total = 9 ✅
  Day 5: [10] → Total = 10 ✅
🎯 Total Days Used: 5 ✅

🎯 Final Answer: The smallest capacity that works is 15.
```