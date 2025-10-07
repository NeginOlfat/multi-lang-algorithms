import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for the InterpolationSearch class.
 */
public class InterpolationSearchTest {

    @Test
    public void testTargetFoundInUniformArray() {
        assertEquals("Should find 70 at index 6", 6, InterpolationSearch.interpolationSearch(new int[]{10, 20, 30, 40, 50, 60, 70, 80, 90}, 70));
    }

    @Test
    public void testTargetAtBeginning() {
        assertEquals("Should find first element", 0, InterpolationSearch.interpolationSearch(new int[]{1, 2, 3, 4, 5}, 1));
    }

    @Test
    public void testTargetAtEnd() {
        assertEquals("Should find last element", 4, InterpolationSearch.interpolationSearch(new int[]{1, 2, 3, 4, 5}, 5));
    }

    @Test
    public void testTargetNotPresent() {
        assertEquals("Should return -1 for missing element", -1, InterpolationSearch.interpolationSearch(new int[]{1, 2, 3, 4, 5}, 6));
    }

    @Test
    public void testEmptyArray() {
        assertEquals("Empty array should return -1", -1, InterpolationSearch.interpolationSearch(new int[]{}, 10));
    }

    @Test
    public void testSingleElementFound() {
        assertEquals("Single element found → index 0", 0, InterpolationSearch.interpolationSearch(new int[]{5}, 5));
    }

    @Test
    public void testSingleElementNotFound() {
        assertEquals("Single element not found → -1", -1, InterpolationSearch.interpolationSearch(new int[]{5}, 10));
    }

    @Test
    public void testDuplicateValuesAllSame() {
        assertEquals("All duplicates — should return index 0 for match", 0, InterpolationSearch.interpolationSearch(new int[]{5, 5, 5, 5}, 5));
        assertEquals("All duplicates — should return -1 for no match", -1, InterpolationSearch.interpolationSearch(new int[]{5, 5, 5, 5}, 3));
    }

    @Test
    public void testNonUniformData() {
        // Skewed distribution — worst-case-like behavior
        assertEquals("Should still find 9 even in skewed data", 8, InterpolationSearch.interpolationSearch(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 1000}, 9));
    }

    @Test
    public void testDivisionByZeroProtection() {
        assertEquals("Equal elements — should handle safely", 0, InterpolationSearch.interpolationSearch(new int[]{7, 7, 7, 7}, 7));
        assertEquals("Equal elements — not found should return -1", -1, InterpolationSearch.interpolationSearch(new int[]{7, 7, 7, 7}, 5));
    }

    @Test
    public void testOutOfBoundsEstimation() {
        int result = InterpolationSearch.interpolationSearch(new int[]{10, 20, 30}, 25);
        assertTrue("Should not crash on bad estimate", result == -1 || result == 2); // Either not found or found via fallback
    }
}