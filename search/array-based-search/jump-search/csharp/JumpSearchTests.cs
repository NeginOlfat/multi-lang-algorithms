using Xunit;

/// <summary>
/// Unit tests for the JumpSearch class.
/// </summary>
public class JumpSearchTests
{
    [Fact]
    public void Target_In_Middle_Block_Returns_Correct_Index()
    {
        int[] arr = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        Assert.Equal(7, JumpSearch.JumpSearchArray(arr, 7), "Should find 7 at index 7");
    }

    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(0, JumpSearch.JumpSearchArray(arr, 1), "Should find first element");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(4, JumpSearch.JumpSearchArray(arr, 5), "Should find last element");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(-1, JumpSearch.JumpSearchArray(arr, 6), "Should return -1 for missing element");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, JumpSearch.JumpSearchArray(arr, 10), "Empty array should return -1");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, JumpSearch.JumpSearchArray(arr, 5), "Single element found → index 0");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        Assert.Equal(-1, JumpSearch.JumpSearchArray(arr, 10), "Single element not found → -1");
    }

    [Fact]
    public void Small_Array_WorksWithin_First_Block()
    {
        int[] arr = { 1, 3, 5, 7 };
        Assert.Equal(1, JumpSearch.JumpSearchArray(arr, 3), "Should find 3 at index 1");
        Assert.Equal(3, JumpSearch.JumpSearchArray(arr, 7), "Should find 7 at index 3");
    }

    [Fact]
    public void Duplicate_Elements_Returns_Valid_Index()
    {
        int[] arr = { 2, 2, 2, 3, 3, 3, 4, 4 };
        int result = JumpSearch.JumpSearchArray(arr, 3);
        Assert.True(result >= 3 && result <= 5, "Must return one of the indices where 3 occurs");
        Assert.Equal(3, arr[result], "Returned value must be 3");
    }
}