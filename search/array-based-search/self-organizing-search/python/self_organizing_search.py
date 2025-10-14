class SelfOrganizingList:
    """
    A self-organizing list that adapts its structure based on access patterns.
    
    Supports three reorganization strategies:
    1. Move-to-Front: Move accessed item to front
    2. Transpose: Swap with previous element
    3. Count: Maintain access frequency and sort accordingly
    
    This improves average search time for frequently accessed items.
    """

    def __init__(self, data=None, strategy='move_to_front'):
        """
        Initialize the self-organizing list.
        
        Args:
            data (list): Initial list of elements.
            strategy (str): One of 'move_to_front', 'transpose', 'count'
        """
        self.items = list(data) if data else []
        self.strategy = strategy.lower()
        self.access_count = {item: 0 for item in self.items} if self.strategy == 'count' else {}

    def search(self, target):
        """
        Search for an item and reorganize the list based on strategy.
        
        Args:
            target: Element to search for
            
        Returns:
            int: Index where found before reorganization; -1 if not found
        """
        # Find the index of target
        try:
            idx = self.items.index(target)
        except ValueError:
            return -1  # Not found

        # Increment access count if using 'count' strategy
        if self.strategy == 'count':
            self.access_count[target] += 1
            self._reorder_by_count()

        elif self.strategy == 'move_to_front':
            # Move found item to front
            self.items.pop(idx)
            self.items.insert(0, target)

        elif self.strategy == 'transpose' and idx > 0:
            # Swap with previous element
            self.items[idx], self.items[idx - 1] = self.items[idx - 1], self.items[idx]

        return idx  # Return original index where found

    def _reorder_by_count(self):
        """Reorder list by access frequency (highest first)."""
        self.items.sort(key=lambda x: self.access_count[x], reverse=True)

    def __str__(self):
        if self.strategy == 'count':
            counts = [f"{item}:{self.access_count.get(item, 0)}" for item in self.items]
            return f"[{', '.join(counts)}]"
        return str(self.items)

    def __repr__(self):
        return f"SelfOrganizingList({self.items}, '{self.strategy}')"


# Example usage and demonstration
if __name__ == "__main__":
    print("🔍 Self-Organizing Search Examples\n")

    # --- Example 1: Move-to-Front ---
    print("🎯 Strategy: Move-to-Front")
    mtflist = SelfOrganizingList(['A', 'B', 'C', 'D'], strategy='move_to_front')
    print(f"Initial: {mtflist}")

    searches = ['C', 'B', 'C']
    for target in searches:
        idx = mtflist.search(target)
        status = f"Found at index {idx}" if idx != -1 else "Not found"
        print(f"Search '{target}' → {status} → Now: {mtflist}")

    print()

    # --- Example 2: Transpose ---
    print("🎯 Strategy: Transpose")
    transposelist = SelfOrganizingList(['A', 'B', 'C', 'D'], strategy='transpose')
    print(f"Initial: {transposelist}")

    searches = ['C', 'C', 'C']  # Repeated access
    for target in searches:
        idx = transposelist.search(target)
        status = f"Found at index {idx}" if idx != -1 else "Not found"
        print(f"Search '{target}' → {status} → Now: {transposelist}")

    print()

    # --- Example 3: Count Method ---
    print("🎯 Strategy: Count (Frequency-Based)")
    countlist = SelfOrganizingList(['A', 'B', 'C', 'D'], strategy='count')
    print(f"Initial: {countlist}")

    searches = ['A', 'C', 'A', 'B', 'A', 'C']  # A is most frequent
    for target in searches:
        idx = countlist.search(target)
        status = f"Found at index {idx}" if idx != -1 else "Not found"
        print(f"Search '{target}' → {status} → Now: {countlist}")