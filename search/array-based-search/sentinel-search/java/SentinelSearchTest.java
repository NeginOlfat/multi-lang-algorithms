import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the SentinelSearch class.
 */
public class SentinelSearchTest {

    @Test
    public void testTargetInMiddle() {
        int[] arr = {10, 20, 35, 40, 50};
        assertEquals("Should find 35 at index 2", 2, SentinelSearch.sentinelSearch(arr, 35));
        assertEquals("Last element should be restored", 50, arr[4]);
    }

    @Test
    public void testTargetAtBeginning() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find first element", 0, SentinelSearch.sentinelSearch(arr, 1));
        assertEquals("Last element should be preserved", 5, arr[4]);
    }

    @Test
    public void testTargetAtEnd() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find last element", 4, SentinelSearch.sentinelSearch(arr, 5));
        assertEquals("Last element was target → should still match", 5, arr[4]);
    }

    @Test
    public void testTargetNotPresent() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should return -1 for missing element", -1, SentinelSearch.sentinelSearch(arr, 6));
        assertEquals("Array must remain unchanged", 5, arr[4]);
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Empty array should return -1", -1, SentinelSearch.sentinelSearch(arr, 10));
    }

    @Test
    public void testSingleElementFound() {
        int[] arr = {5};
        assertEquals("Single element found → index 0", 0, SentinelSearch.sentinelSearch(arr, 5));
        assertEquals("Array should be unchanged", 5, arr[0]);
    }

    @Test
    public void testSingleElementNotFound() {
        int[] arr = {5};
        assertEquals("Single element not found → -1", -1, SentinelSearch.sentinelSearch(arr, 10));
        assertEquals("Array should be unchanged", 5, arr[0]);
    }

    @Test
    public void testTwoElementsFirstIsTarget() {
        int[] arr = {7, 3};
        assertEquals("First element is target → index 0", 0, SentinelSearch.sentinelSearch(arr, 7));
        assertEquals("Last element restored correctly", 3, arr[1]);
    }

    @Test
    public void testTwoElementsSecondIsTarget() {
        int[] arr = {3, 7};
        assertEquals("Second element is target → index 1", 1, SentinelSearch.sentinelSearch(arr, 7));
        assertEquals("Last element was target → should still match", 7, arr[1]);
    }

    @Test
    public void testAllDuplicatesAndTargetPresent() {
        int[] arr = {5, 5, 5, 5};
        int result = SentinelSearch.sentinelSearch(arr, 5);
        assertTrue("Must return valid index", result >= 0 && result < 4);
        assertEquals("Last element must be restored", 5, arr[3]);
    }
}