using Xunit;

/// <summary>
/// Unit tests for the InterpolationSearch class.
/// </summary>
public class InterpolationSearchTests
{
    [Fact]
    public void Target_Found_In_Uniform_Array_Returns_Correct_Index()
    {
        int[] arr = { 10, 20, 30, 40, 50, 60, 70, 80, 90 };
        Assert.Equal(6, InterpolationSearch.InterpolationSearchArray(arr, 70), "Should find 70 at index 6");
    }

    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(0, InterpolationSearch.InterpolationSearchArray(arr, 1), "Should find first element");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(4, InterpolationSearch.InterpolationSearchArray(arr, 5), "Should find last element");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(-1, InterpolationSearch.InterpolationSearchArray(arr, 6), "Should return -1 for missing element");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, InterpolationSearch.InterpolationSearchArray(arr, 10), "Empty array should return -1");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, InterpolationSearch.InterpolationSearchArray(arr, 5), "Single element found → index 0");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        Assert.Equal(-1, InterpolationSearch.InterpolationSearchArray(arr, 10), "Single element not found → -1");
    }

    [Fact]
    public void Duplicate_Values_All_Same_Handles_Safely()
    {
        int[] arr = { 5, 5, 5, 5 };
        Assert.Equal(0, InterpolationSearch.InterpolationSearchArray(arr, 5), "All duplicates — match returns index 0");
        Assert.Equal(-1, InterpolationSearch.InterpolationSearchArray(arr, 3), "All duplicates — no match returns -1");
    }

    [Fact]
    public void Non_Uniform_Data_Still_Finds_Target()
    {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 1000 };
        Assert.Equal(8, InterpolationSearch.InterpolationSearchArray(arr, 9), "Should still find even in skewed data");
    }

    [Fact]
    public void Division_By_Zero_Protection_Works()
    {
        int[] arr = { 7, 7, 7, 7 };
        Assert.Equal(0, InterpolationSearch.InterpolationSearchArray(arr, 7), "Equal elements — match handled safely");
        Assert.Equal(-1, InterpolationSearch.InterpolationSearchArray(arr, 5), "Equal elements — no match returns -1");
    }

    [Fact]
    public void Out_Of_Bounds_Estimation_Does_Not_Crash()
    {
        int result = InterpolationSearch.InterpolationSearchArray(new int[] { 10, 20, 30 }, 25);
        Assert.True(result == -1 || result == 2, "Should not crash on bad estimate; either not found or found via scan");
    }
}