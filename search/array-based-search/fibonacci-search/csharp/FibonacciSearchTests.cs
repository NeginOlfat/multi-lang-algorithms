using Xunit;

/// <summary>
/// Unit tests for the FibonacciSearch class.
/// </summary>
public class FibonacciSearchTests
{
    [Fact]
    public void Target_In_Middle_Returns_Correct_Index()
    {
        int[] arr = { 10, 20, 30, 40, 50, 60, 70, 80 };
        Assert.Equal(5, FibonacciSearch.FibonacciSearchArray(arr, 60), "Should find 60 at index 5");
    }

    [Fact]
    public void Target_At_Beginning_Returns_Zero()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(0, FibonacciSearch.FibonacciSearchArray(arr, 1), "Should find first element");
    }

    [Fact]
    public void Target_At_End_Returns_Last_Index()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(4, FibonacciSearch.FibonacciSearchArray(arr, 5), "Should find last element");
    }

    [Fact]
    public void Target_Not_Present_Returns_Minus_One()
    {
        int[] arr = { 1, 2, 3, 4, 5 };
        Assert.Equal(-1, FibonacciSearch.FibonacciSearchArray(arr, 6), "Should return -1 for missing element");
    }

    [Fact]
    public void Empty_Array_Returns_Minus_One()
    {
        int[] arr = { };
        Assert.Equal(-1, FibonacciSearch.FibonacciSearchArray(arr, 10), "Empty array should return -1");
    }

    [Fact]
    public void Null_Array_Returns_Minus_One()
    {
        Assert.Equal(-1, FibonacciSearch.FibonacciSearchArray(null, 10), "Null array should return -1");
    }

    [Fact]
    public void Single_Element_Found_Returns_Zero()
    {
        int[] arr = { 5 };
        Assert.Equal(0, FibonacciSearch.FibonacciSearchArray(arr, 5), "Single element found → index 0");
    }

    [Fact]
    public void Single_Element_Not_Found_Returns_Minus_One()
    {
        int[] arr = { 5 };
        Assert.Equal(-1, FibonacciSearch.FibonacciSearchArray(arr, 10), "Single element not found → -1");
    }

    [Fact]
    public void Small_Array_Exact_Fibonacci_Size()
    {
        int[] arr = { 10, 20, 30, 40, 50 }; // Size = 5 (Fibonacci number)
        Assert.Equal(3, FibonacciSearch.FibonacciSearchArray(arr, 40), "Should find 40 at index 3");
    }

    [Fact]
    public void Duplicate_Elements_Returns_Valid_Index()
    {
        int[] arr = { 5, 5, 5, 5, 5 };
        int result = FibonacciSearch.FibonacciSearchArray(arr, 5);
        Assert.True(result >= 0 && result < 5, "Must return valid index for duplicate");
        Assert.Equal(5, arr[result], "Returned value must be 5");
    }

    [Fact]
    public void Target_Smaller_Than_First_Element_Returns_Minus_One()
    {
        int[] arr = { 10, 20, 30 };
        Assert.Equal(-1, FibonacciSearch.FibonacciSearchArray(arr, 5), "Should return -1 if target < min");
    }

    [Fact]
    public void Target_Larger_Than_Last_Element_Returns_Minus_One()
    {
        int[] arr = { 10, 20, 30 };
        Assert.Equal(-1, FibonacciSearch.FibonacciSearchArray(arr, 40), "Should return -1 if target > max");
    }
}