using Xunit;

/// <summary>
/// Unit tests for the LinearSearch class.
/// </summary>
public class LinearSearchTests
{
    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3 };
        int result = LinearSearch.LinearSearchArray(arr, 1);
        Assert.Equal(0, result, $"Expected 0, but got {result}");
    }

    [Fact]
    public void Target_In_Middle_Returns_Correct_Index()
    {
        int[] arr = { 10, 20, 30, 40 };
        int result = LinearSearch.LinearSearchArray(arr, 30);
        Assert.Equal(2, result, $"Expected 2, but got {result}");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 10, 20, 30 };
        int result = LinearSearch.LinearSearchArray(arr, 30);
        Assert.Equal(2, result, $"Expected 2, but got {result}");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 10, 20, 30 };
        int result = LinearSearch.LinearSearchArray(arr, 40);
        Assert.Equal(-1, result, $"Expected -1, but got {result}");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        int result = LinearSearch.LinearSearchArray(arr, 10);
        Assert.Equal(-1, result, $"Expected -1 for empty array, but got {result}");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        int result = LinearSearch.LinearSearchArray(arr, 5);
        Assert.Equal(0, result, $"Expected 0, but got {result}");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        int result = LinearSearch.LinearSearchArray(arr, 10);
        Assert.Equal(-1, result, $"Expected -1, but got {result}");
    }

    [Fact]
    public void Duplicate_Elements_Returns_First_Occurrence()
    {
        int[] arr = { 5, 5, 5 };
        int result = LinearSearch.LinearSearchArray(arr, 5);
        Assert.Equal(0, result, $"Expected 0 (first occurrence), but got {result}");
    }
}