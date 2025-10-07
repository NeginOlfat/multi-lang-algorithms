import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the TernarySearch class.
 */
public class TernarySearchTest {

    @Test
    public void testPeakInMiddle() {
        int[] arr = {1, 3, 5, 7, 8, 6, 4, 2};
        assertEquals("Should find peak at index 4", 4, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testPeakAtBeginning() {
        int[] arr = {10, 8, 6, 4};
        assertEquals("Descending array → peak at start", 0, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testPeakAtEnd() {
        int[] arr = {1, 3, 5, 7};
        assertEquals("Ascending array → peak at end", 3, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testSingleElement() {
        int[] arr = {5};
        assertEquals("Single element → index 0", 0, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testTwoElementsFirstLarger() {
        int[] arr = {7, 3};
        assertEquals("Two elements: first larger", 0, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testTwoElementsSecondLarger() {
        int[] arr = {3, 7};
        assertEquals("Two elements: second larger", 1, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Empty array should return -1", -1, TernarySearch.ternarySearchPeak(arr));
    }

    @Test
    public void testNullArray() {
        assertEquals("Null array should return -1", -1, TernarySearch.ternarySearchPeak(null));
    }

    @Test
    public void testFunctionMaximization() {
        TernarySearch.Function f = (x) -> -(x - 3)*(x - 3) + 10; // Max at x=3
        double result = TernarySearch.ternarySearchFunctionMax(f, 0, 6, 1e-9);
        assertEquals("Maximum should be near x=3", 3.0, result, 1e-5);
    }

    @Test
    public void testFlatPlateauReturnsValidIndex() {
        int[] arr = {1, 5, 5, 5, 2};
        int result = TernarySearch.ternarySearchPeak(arr);
        assertTrue("Result must be one of the peak indices", result >= 1 && result <= 3);
        assertEquals("Returned value must be 5", 5, arr[result]);
    }
}