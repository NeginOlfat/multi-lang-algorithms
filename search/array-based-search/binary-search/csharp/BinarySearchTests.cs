using Xunit;

/// <summary>
/// Unit tests for BinarySearch class.
/// </summary>
public class BinarySearchTests
{
    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(0, BinarySearch.BinarySearchIterative(arr, 1), "Iterative: should find at index 0");
        Assert.Equal(0, BinarySearch.BinarySearchRecursive(arr, 1), "Recursive: should find at index 0");
    }

    [Fact]
    public void Target_In_Middle_Returns_Correct_Index()
    {
        int[] arr = { 10, 20, 30, 40, 50 };
        Assert.Equal(2, BinarySearch.BinarySearchIterative(arr, 30), "Iterative: should find at index 2");
        Assert.Equal(2, BinarySearch.BinarySearchRecursive(arr, 30), "Recursive: should find at index 2");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 10, 20, 30, 40, 50 };
        Assert.Equal(4, BinarySearch.BinarySearchIterative(arr, 50), "Iterative: should find at last index");
        Assert.Equal(4, BinarySearch.BinarySearchRecursive(arr, 50), "Recursive: should find at last index");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 10, 20, 30 };
        Assert.Equal(-1, BinarySearch.BinarySearchIterative(arr, 40), "Iterative: should return -1");
        Assert.Equal(-1, BinarySearch.BinarySearchRecursive(arr, 40), "Recursive: should return -1");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, BinarySearch.BinarySearchIterative(arr, 10), "Iterative: empty → -1");
        Assert.Equal(-1, BinarySearch.BinarySearchRecursive(arr, 10), "Recursive: empty → -1");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, BinarySearch.BinarySearchIterative(arr, 5), "Iterative: single found → 0");
        Assert.Equal(0, BinarySearch.BinarySearchRecursive(arr, 5), "Recursive: single found → 0");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        Assert.Equal(-1, BinarySearch.BinarySearchIterative(arr, 10), "Iterative: not found → -1");
        Assert.Equal(-1, BinarySearch.BinarySearchRecursive(arr, 10), "Recursive: not found → -1");
    }

    [Fact]
    public void Duplicate_Elements_Returns_Valid_Index()
    {
        int[] arr = { 5, 5, 5, 5, 5 };
        int resultIter = BinarySearch.BinarySearchIterative(arr, 5);
        int resultRec = BinarySearch.BinarySearchRecursive(arr, 5);

        Assert.True(resultIter >= 0 && resultIter < 5, "Iterative: must return valid index for duplicate");
        Assert.True(resultRec >= 0 && resultRec < 5, "Recursive: must return valid index for duplicate");
    }
}