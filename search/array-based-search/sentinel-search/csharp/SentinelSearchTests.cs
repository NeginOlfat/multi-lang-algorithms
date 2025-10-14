using Xunit;

/// <summary>
/// Unit tests for the SentinelSearch class.
/// </summary>
public class SentinelSearchTests
{
    [Fact]
    public void Target_In_Middle_Returns_Correct_Index()
    {
        int[] arr = { 10, 20, 35, 40, 50 };
        Assert.Equal(2, SentinelSearch.SentinelSearchArray(arr, 35), "Should find 35 at index 2");
        Assert.Equal(50, arr[4], "Last element should be restored");
    }

    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(0, SentinelSearch.SentinelSearchArray(arr, 1), "Should find first element");
        Assert.Equal(5, arr[4], "Last element should be preserved");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(4, SentinelSearch.SentinelSearchArray(arr, 5), "Should find last element");
        Assert.Equal(5, arr[4], "Last element was target → should still match");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(-1, SentinelSearch.SentinelSearchArray(arr, 6), "Should return -1 for missing element");
        Assert.Equal(5, arr[4], "Array must remain unchanged");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, SentinelSearch.SentinelSearchArray(arr, 10), "Empty array should return -1");
    }

    [Fact]
    public void Null_Array_Returns_Minus_One()
    {
        Assert.Equal(-1, SentinelSearch.SentinelSearchArray(null, 10), "Null array should return -1");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, SentinelSearch.SentinelSearchArray(arr, 5), "Single element found → index 0");
        Assert.Equal(5, arr[0], "Array should be unchanged");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        Assert.Equal(-1, SentinelSearch.SentinelSearchArray(arr, 10), "Single element not found → -1");
        Assert.Equal(5, arr[0], "Array should be unchanged");
    }

    [Fact]
    public void Two_Elements_First_Is_Target()
    {
        int[] arr = { 7, 3 };
        Assert.Equal(0, SentinelSearch.SentinelSearchArray(arr, 7), "First element is target → index 0");
        Assert.Equal(3, arr[1], "Last element restored correctly");
    }

    [Fact]
    public void Two_Elements_Second_Is_Target()
    {
        int[] arr = { 3, 7 };
        Assert.Equal(1, SentinelSearch.SentinelSearchArray(arr, 7), "Second element is target → index 1");
        Assert.Equal(7, arr[1], "Last element was target → should still match");
    }

    [Fact]
    public void All_Duplicates_Target_Present_Returns_Valid_Index()
    {
        int[] arr = { 5, 5, 5, 5 };
        int result = SentinelSearch.SentinelSearchArray(arr, 5);
        Assert.True(result >= 0 && result < 4, "Must return valid index");
        Assert.Equal(5, arr[3], "Last element must be restored");
    }
}