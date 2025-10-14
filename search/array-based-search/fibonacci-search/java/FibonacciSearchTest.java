import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the FibonacciSearch class.
 */
public class FibonacciSearchTest {

    @Test
    public void testTargetInMiddle() {
        int[] arr = {10, 20, 30, 40, 50, 60, 70, 80};
        assertEquals("Should find 60 at index 5", 5, FibonacciSearch.fibonacciSearch(arr, 60));
    }

    @Test
    public void testTargetAtBeginning() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find first element", 0, FibonacciSearch.fibonacciSearch(arr, 1));
    }

    @Test
    public void testTargetAtEnd() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find last element", 4, FibonacciSearch.fibonacciSearch(arr, 5));
    }

    @Test
    public void testTargetNotPresent() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should return -1 for missing element", -1, FibonacciSearch.fibonacciSearch(arr, 6));
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Empty array should return -1", -1, FibonacciSearch.fibonacciSearch(arr, 10));
    }

    @Test
    public void testSingleElementFound() {
        int[] arr = {5};
        assertEquals("Single element found → index 0", 0, FibonacciSearch.fibonacciSearch(arr, 5));
    }

    @Test
    public void testSingleElementNotFound() {
        int[] arr = {5};
        assertEquals("Single element not found → -1", -1, FibonacciSearch.fibonacciSearch(arr, 10));
    }

    @Test
    public void testSmallArrayExactFibonacciSize() {
        int[] arr = {10, 20, 30, 40, 50}; // Size = 5 (Fibonacci number)
        assertEquals("Should find 40 at index 3", 3, FibonacciSearch.fibonacciSearch(arr, 40));
    }

    @Test
    public void testDuplicateElements_ReturnsValidIndex() {
        int[] arr = {5, 5, 5, 5, 5};
        int result = FibonacciSearch.fibonacciSearch(arr, 5);
        assertTrue("Result must be valid index", result >= 0 && result < 5);
        assertEquals("Returned value must be 5", 5, arr[result]);
    }

    @Test
    public void testTargetSmallerThanFirst() {
        int[] arr = {10, 20, 30};
        assertEquals("Should return -1 if target < min", -1, FibonacciSearch.fibonacciSearch(arr, 5));
    }

    @Test
    public void testTargetLargerThanLast() {
        int[] arr = {10, 20, 30};
        assertEquals("Should return -1 if target > max", -1, FibonacciSearch.fibonacciSearch(arr, 40));
    }
}