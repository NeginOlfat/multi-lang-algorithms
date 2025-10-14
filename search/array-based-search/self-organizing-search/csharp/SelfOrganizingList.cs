using System;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// A self-organizing list that adapts its structure based on access patterns.
///
/// Supports three reorganization strategies:
/// 1. MoveToFront: Move accessed item to front
/// 2. Transpose: Swap with previous element
/// 3. Count: Maintain access frequency and sort by count (descending), preserving insertion order on ties
///
/// This improves average search time for frequently accessed items.
/// </summary>
public class SelfOrganizingList
{
    public enum Strategy
    {
        MoveToFront,
        Transpose,
        Count
    }

    private readonly List<string> _items;
    private readonly Strategy _strategy;
    private readonly Dictionary<string, int> _accessCount;
    private readonly Dictionary<string, int> _insertionOrder;

    /// <summary>
    /// Initializes a new instance of the SelfOrganizingList class.
    /// </summary>
    /// <param name="data">Initial list of elements.</param>
    /// <param name="strategy">One of MoveToFront, Transpose, Count</param>
    public SelfOrganizingList(IEnumerable<string> data, Strategy strategy)
    {
        _items = new List<string>(data ?? throw new ArgumentNullException(nameof(data)));
        _strategy = strategy;
        _accessCount = new Dictionary<string, int>();
        _insertionOrder = new Dictionary<string, int>();

        // Record first-seen index (stable tie-breaker)
        int index = 0;
        foreach (var item in data)
        {
            if (!_insertionOrder.ContainsKey(item))
            {
                _insertionOrder[item] = index;
            }
            index++;
        }

        // Initialize access counts
        foreach (var item in _items)
        {
            _accessCount[item] = 0;
        }
    }

    /// <summary>
    /// Searches for an item and reorganizes the list based on the current strategy.
    /// </summary>
    /// <param name="target">Element to search for.</param>
    /// <returns>Index where found before reorganization; -1 if not found.</returns>
    public int Search(string target)
    {
        int idx = _items.IndexOf(target);
        if (idx == -1) return -1; // Not found

        if (_strategy == Strategy.Count)
        {
            _accessCount[target]++;
            Reorder();
        }
        else if (_strategy == Strategy.MoveToFront)
        {
            _items.RemoveAt(idx);
            _items.Insert(0, target);
        }
        else if (_strategy == Strategy.Transpose && idx > 0)
        {
            string temp = _items[idx];
            _items[idx] = _items[idx - 1];
            _items[idx - 1] = temp;
        }

        return idx; // Return original index
    }

    /// <summary>
    /// Reorders the list by access frequency (descending),
    /// preserving original insertion order for ties.
    /// </summary>
    private void Reorder()
    {
        _items.Sort((a, b) =>
        {
            // Sort by frequency (descending)
            int freqDiff = _accessCount[b].CompareTo(_accessCount[a]);
            if (freqDiff != 0) return freqDiff;

            // Tie? Use original insertion order
            return _insertionOrder[a].CompareTo(_insertionOrder[b]);
        });
    }

    /// <summary>
    /// Gets a copy of the current list state.
    /// </summary>
    public IReadOnlyList<string> Items => _items.AsReadOnly();

    /// <summary>
    /// Gets a copy of access counts (for debugging/testing).
    /// </summary>
    public IReadOnlyDictionary<string, int> AccessCount => new Dictionary<string, int>(_accessCount);

    /// <summary>
    /// Returns a string representation of the list.
    /// For Count strategy, shows values with frequencies.
    /// </summary>
    public override string ToString()
    {
        if (_strategy == Strategy.Count)
        {
            var withCounts = _items.Select(item => $"{item}:{_accessCount[item]}");
            return $"[{string.Join(", ", withCounts)}]";
        }

        return $"[{string.Join(", ", _items)}]";
    }

    // Example Usage 
    public static void Main(string[] args)
    {
        Console.WriteLine("🔍 Self-Organizing Search Examples\n");

        // --- Example 1: Move-to-Front ---
        Console.WriteLine("🎯 Strategy: Move-to-Front");
        var mtflist = new SelfOrganizingList(new[] { "A", "B", "C", "D" }, Strategy.MoveToFront);
        Console.WriteLine($"Initial: {mtflist}");

        foreach (var target in new[] { "C", "B", "C" })
        {
            int idx = mtflist.Search(target);
            string status = idx != -1 ? $"Found at index {idx}" : "Not found";
            Console.WriteLine($"Search '{target}' → {status} → Now: {mtflist}");
        }

        Console.WriteLine();

        // --- Example 2: Transpose ---
        Console.WriteLine("🎯 Strategy: Transpose");
        var transposelist = new SelfOrganizingList(new[] { "A", "B", "C", "D" }, Strategy.Transpose);
        Console.WriteLine($"Initial: {transposelist}");

        foreach (var target in new[] { "C", "C", "C" })
        {
            int idx = transposelist.Search(target);
            string status = idx != -1 ? $"Found at index {idx}" : "Not found";
            Console.WriteLine($"Search '{target}' → {status} → Now: {transposelist}");
        }

        Console.WriteLine();

        // --- Example 3: Count Method ---
        Console.WriteLine("🎯 Strategy: Count (Frequency-Based)");
        var countlist = new SelfOrganizingList(new[] { "A", "B", "C", "D" }, Strategy.Count);
        Console.WriteLine($"Initial: {countlist}");

        foreach (var target in new[] { "A", "C", "A", "B", "A", "C" })
        {
            int idx = countlist.Search(target);
            string status = idx != -1 ? $"Found at index {idx}" : "Not found";
            Console.WriteLine($"Search '{target}' → {status} → Now: {countlist}");
        }
    }
}