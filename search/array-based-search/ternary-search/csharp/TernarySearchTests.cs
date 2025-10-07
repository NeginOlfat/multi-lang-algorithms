using Xunit;

/// <summary>
/// Unit tests for the TernarySearch class.
/// </summary>
public class TernarySearchTests
{
    [Fact]
    public void Peak_In_Middle_Returns_Correct_Index()
    {
        int[] arr = { 1, 3, 5, 7, 8, 6, 4, 2 };
        Assert.Equal(4, TernarySearch.TernarySearchPeak(arr), "Should find peak at index 4");
    }

    [Fact]
    public void Peak_At_Beginning_Returns_Zero()
    {
        int[] arr = { 10, 8, 6, 4 };
        Assert.Equal(0, TernarySearch.TernarySearchPeak(arr), "Descending array → peak at start");
    }

    [Fact]
    public void Peak_At_End_Returns_Last_Index()
    {
        int[] arr = { 1, 3, 5, 7 };
        Assert.Equal(3, TernarySearch.TernarySearchPeak(arr), "Ascending array → peak at end");
    }

    [Fact]
    public void Single_Element_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, TernarySearch.TernarySearchPeak(arr), "Single element → index 0");
    }

    [Fact]
    public void Two_Elements_First_Larger_Returns_Zero()
    {
        int[] arr = { 7, 3 };
        Assert.Equal(0, TernarySearch.TernarySearchPeak(arr), "First larger → index 0");
    }

    [Fact]
    public void Two_Elements_Second_Larger_Returns_One()
    {
        int[] arr = { 3, 7 };
        Assert.Equal(1, TernarySearch.TernarySearchPeak(arr), "Second larger → index 1");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, TernarySearch.TernarySearchPeak(arr), "Empty array should return -1");
    }

    [Fact]
    public void Null_Array_Returns_Minus_One()
    {
        Assert.Equal(-1, TernarySearch.TernarySearchPeak(null), "Null array should return -1");
    }

    [Fact]
    public void Function_Maximization_Finds_Peak_Near_3()
    {
        Func<double, double> f = x => -(x - 3) * (x - 3) + 10; // Max at x=3
        double result = TernarySearch.TernarySearchFunctionMax(f, 0, 6, 1e-9);
        Assert.True(Math.Abs(result - 3.0) < 1e-5, $"Expected ~3.0, got {result}");
    }

    [Fact]
    public void Flat_Plateau_Returns_Valid_Index()
    {
        int[] arr = { 1, 5, 5, 5, 2 };
        int result = TernarySearch.TernarySearchPeak(arr);
        Assert.True(result >= 1 && result <= 3, "Must return one of the peak indices");
        Assert.Equal(5, arr[result], "Returned value must be 5");
    }
}