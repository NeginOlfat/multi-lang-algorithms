import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the JumpSearch class.
 */
public class JumpSearchTest {

    @Test
    public void testTargetInMiddleBlock() {
        int[] arr = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        assertEquals("Should find 7 at index 7", 7, JumpSearch.jumpSearch(arr, 7));
    }

    @Test
    public void testTargetAtBeginning() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find first element", 0, JumpSearch.jumpSearch(arr, 1));
    }

    @Test
    public void testTargetAtEnd() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find last element", 4, JumpSearch.jumpSearch(arr, 5));
    }

    @Test
    public void testTargetNotPresent() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should return -1 for missing element", -1, JumpSearch.jumpSearch(arr, 6));
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Empty array should return -1", -1, JumpSearch.jumpSearch(arr, 10));
    }

    @Test
    public void testSingleElementFound() {
        int[] arr = {5};
        assertEquals("Single element found → index 0", 0, JumpSearch.jumpSearch(arr, 5));
    }

    @Test
    public void testSingleElementNotFound() {
        int[] arr = {5};
        assertEquals("Single element not found → -1", -1, JumpSearch.jumpSearch(arr, 10));
    }

    @Test
    public void testSmallArray() {
        int[] arr = {1, 3, 5, 7};
        assertEquals("Should find 3 at index 1", 1, JumpSearch.jumpSearch(arr, 3));
        assertEquals("Should find 7 at index 3", 3, JumpSearch.jumpSearch(arr, 7));
    }

    @Test
    public void testDuplicateElements() {
        int[] arr = {2, 2, 2, 3, 3, 3, 4, 4};
        int result = JumpSearch.jumpSearch(arr, 3);
        assertTrue("Result must be valid index for value 3", result >= 3 && result <= 5);
        assertEquals("Returned value must be 3", 3, arr[result]);
    }
}