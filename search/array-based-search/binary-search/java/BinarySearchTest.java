import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for BinarySearch class.
 */
public class BinarySearchTest {

    @Test
    public void testTargetAtBeginning() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals("Should find target at index 0", 0, BinarySearch.binarySearch(arr, 1));
        assertEquals("Recursive: should find at index 0", 0, BinarySearch.binarySearchRecursive(arr, 1));
    }

    @Test
    public void testTargetInMiddle() {
        int[] arr = {10, 20, 30, 40, 50};
        assertEquals("Should find at index 2", 2, BinarySearch.binarySearch(arr, 30));
        assertEquals("Recursive: should find at index 2", 2, BinarySearch.binarySearchRecursive(arr, 30));
    }

    @Test
    public void testTargetAtEnd() {
        int[] arr = {10, 20, 30, 40, 50};
        assertEquals("Should find at last index", 4, BinarySearch.binarySearch(arr, 50));
        assertEquals("Recursive: should find at last index", 4, BinarySearch.binarySearchRecursive(arr, 50));
    }

    @Test
    public void testTargetNotFound() {
        int[] arr = {10, 20, 30};
        assertEquals("Should return -1 if not found", -1, BinarySearch.binarySearch(arr, 40));
        assertEquals("Recursive: should return -1", -1, BinarySearch.binarySearchRecursive(arr, 40));
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        assertEquals("Empty array → -1", -1, BinarySearch.binarySearch(arr, 10));
        assertEquals("Recursive: empty → -1", -1, BinarySearch.binarySearchRecursive(arr, 10));
    }

    @Test
    public void testSingleElementFound() {
        int[] arr = {5};
        assertEquals("Single element found → index 0", 0, BinarySearch.binarySearch(arr, 5));
        assertEquals("Recursive: single found → 0", 0, BinarySearch.binarySearchRecursive(arr, 5));
    }

    @Test
    public void testSingleElementNotFound() {
        int[] arr = {5};
        assertEquals("Single not found → -1", -1, BinarySearch.binarySearch(arr, 10));
        assertEquals("Recursive: single not found → -1", -1, BinarySearch.binarySearchRecursive(arr, 10));
    }

    @Test
    public void testDuplicates() {
        int[] arr = {5, 5, 5, 5, 5};
        int resultIter = BinarySearch.binarySearch(arr, 5);
        int resultRec = BinarySearch.binarySearchRecursive(arr, 5);

        assertTrue("Iterative: result must be valid index", resultIter >= 0 && resultIter < 5);
        assertTrue("Recursive: result must be valid index", resultRec >= 0 && resultRec < 5);
    }
}