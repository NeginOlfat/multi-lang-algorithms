import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the ExponentialSearch class.
 */
public class ExponentialSearchTest {

    @Test
    public void testTargetFoundInMiddle() {
        int[] arr = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
        assertEquals("Should find 70 at index 6", 6, ExponentialSearch.exponentialSearch(arr, 70));
    }

    @Test
    public void testTargetAtBeginning() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find first element", 0, ExponentialSearch.exponentialSearch(arr, 1));
    }

    @Test
    public void testTargetAtEnd() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find last element", 4, ExponentialSearch.exponentialSearch(arr, 5));
    }

    @Test
    public void testTargetNotPresent() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should return -1 for missing element", -1, ExponentialSearch.exponentialSearch(arr, 6));
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Empty array should return -1", -1, ExponentialSearch.exponentialSearch(arr, 10));
    }

    @Test
    public void testSingleElementFound() {
        int[] arr = {5};
        assertEquals("Single element found → index 0", 0, ExponentialSearch.exponentialSearch(arr, 5));
    }

    @Test
    public void testSingleElementNotFound() {
        int[] arr = {5};
        assertEquals("Single element not found → -1", -1, ExponentialSearch.exponentialSearch(arr, 10));
    }

    @Test
    public void testSmallArrayPowerOfTwo() {
        int[] arr = {1, 3, 5, 7};
        assertEquals("Should find 7 at index 3", 3, ExponentialSearch.exponentialSearch(arr, 7));
    }

    @Test
    public void testTargetLargerThanAll() {
        int[] arr = {1, 2, 3, 4};
        assertEquals("Should return -1 if target > max", -1, ExponentialSearch.exponentialSearch(arr, 10));
    }

    @Test
    public void testTargetSmallerThanFirst() {
        int[] arr = {10, 20, 30};
        assertEquals("Should return -1 if target < min", -1, ExponentialSearch.exponentialSearch(arr, 5));
    }

    @Test
    public void testDuplicates_ReturnsValidIndex() {
        int[] arr = {2, 2, 2, 3, 3, 3, 4, 4};
        int result = ExponentialSearch.exponentialSearch(arr, 3);
        assertTrue("Result must be one of the indices where 3 occurs", result >= 3 && result <= 5);
        assertEquals("Returned value must be 3", 3, arr[result]);
    }
}