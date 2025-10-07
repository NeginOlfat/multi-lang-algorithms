using Xunit;

/// <summary>
/// Unit tests for the ExponentialSearch class.
/// </summary>
public class ExponentialSearchTests
{
    [Fact]
    public void Target_Found_In_Middle_Returns_Correct_Index()
    {
        int[] arr = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
        Assert.Equal(6, ExponentialSearch.ExponentialSearchArray(arr, 70), "Should find 70 at index 6");
    }

    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(0, ExponentialSearch.ExponentialSearchArray(arr, 1), "Should find first element");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(4, ExponentialSearch.ExponentialSearchArray(arr, 5), "Should find last element");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(-1, ExponentialSearch.ExponentialSearchArray(arr, 6), "Should return -1 for missing element");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, ExponentialSearch.ExponentialSearchArray(arr, 10), "Empty array should return -1");
    }

    [Fact]
    public void Null_Array_Returns_Minus_One()
    {
        Assert.Equal(-1, ExponentialSearch.ExponentialSearchArray(null, 10), "Null array should return -1");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, ExponentialSearch.ExponentialSearchArray(arr, 5), "Single element found → index 0");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        Assert.Equal(-1, ExponentialSearch.ExponentialSearchArray(arr, 10), "Single element not found → -1");
    }

    [Fact]
    public void Small_Array_PowerOfTwo_Size()
    {
        int[] arr = { 1, 3, 5, 7 };
        Assert.Equal(3, ExponentialSearch.ExponentialSearchArray(arr, 7), "Should find 7 at index 3");
    }

    [Fact]
    public void Target_Larger_Than_All_Elements_Returns_Minus_One()
    {
        int[] arr = { 1, 2, 3, 4 };
        Assert.Equal(-1, ExponentialSearch.ExponentialSearchArray(arr, 10), "Should return -1 if target > max");
    }

    [Fact]
    public void Target_Smaller_Than_First_Element_Returns_Minus_One()
    {
        int[] arr = { 10, 20, 30 };
        Assert.Equal(-1, ExponentialSearch.ExponentialSearchArray(arr, 5), "Should return -1 if target < min");
    }

    [Fact]
    public void Duplicate_Elements_Returns_Valid_Index()
    {
        int[] arr = { 2, 2, 2, 3, 3, 3, 4, 4 };
        int result = ExponentialSearch.ExponentialSearchArray(arr, 3);
        Assert.True(result >= 3 && result <= 5, "Must return one of the indices where 3 occurs");
        Assert.Equal(3, arr[result], "Returned value must be 3");
    }
}