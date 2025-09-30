import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the LinearSearch class.
 */
public class LinearSearchTest {

    @Test
    public void testTargetAtBeginning() {
        int[] arr = {1, 2, 3};
        assertEquals("Should find target at beginning", 0, LinearSearch.linearSearch(arr, 1));
    }

    @Test
    public void testTargetInMiddle() {
        int[] arr = {10, 20, 30, 40};
        assertEquals("Should find target in middle", 2, LinearSearch.linearSearch(arr, 30));
    }

    @Test
    public void testTargetAtEnd() {
        int[] arr = {10, 20, 30};
        assertEquals("Should find target at end", 2, LinearSearch.linearSearch(arr, 30));
    }

    @Test
    public void testTargetNotPresent() {
        int[] arr = {10, 20, 30};
        assertEquals("Should return -1 if target not found", -1, LinearSearch.linearSearch(arr, 40));
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Should return -1 for empty array", -1, LinearSearch.linearSearch(arr, 10));
    }

    @Test
    public void testSingleElementFound() {
        int[] arr = {5};
        assertEquals("Should find single element", 0, LinearSearch.linearSearch(arr, 5));
    }

    @Test
    public void testSingleElementNotFound() {
        int[] arr = {5};
        assertEquals("Should return -1 for missing element", -1, LinearSearch.linearSearch(arr, 10));
    }

    @Test
    public void testDuplicateElements() {
        int[] arr = {5, 5, 5};
        assertEquals("Should return first occurrence", 0, LinearSearch.linearSearch(arr, 5));
    }
}