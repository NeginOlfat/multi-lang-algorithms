import org.junit.Test;
import static org.junit.Assert.*;
import java.util.Arrays;
import java.util.List;

/**
 * Unit tests for the SelfOrganizingList class.
 */
public class SelfOrganizingListTest {

    @Test
    public void testMoveToFront_SingleAccess() {
        List<String> data = Arrays.asList("A", "B", "C");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.MOVE_TO_FRONT);
        sol.search("B");
        assertEquals("[B, A, C]", sol.toString());
    }

    @Test
    public void testMoveToFront_MultipleAccess() {
        List<String> data = Arrays.asList("A", "B", "C", "D");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.MOVE_TO_FRONT);
        sol.search("C"); // → [C, A, B, D]
        sol.search("B"); // → [B, C, A, D]
        assertEquals("[B, C, A, D]", sol.toString());
    }

    @Test
    public void testTranspose_OneSwap() {
        List<String> data = Arrays.asList("A", "B", "C");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.TRANSPOSE);
        sol.search("C"); // → [A, C, B]
        assertEquals("[A, C, B]", sol.toString());
    }

    @Test
    public void testTranspose_RepeatedAccess() {
        List<String> data = Arrays.asList("W", "X", "Y", "Z");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.TRANSPOSE);
        sol.search("Z"); // no change
        sol.search("Y"); // → [W, X, Z, Y]
        sol.search("Z"); // → [W, X, Z, Y] (Z now before Y)
        assertEquals("[W, X, Z, Y]", sol.toString());
    }

    @Test
    public void testCount_ReordersByFrequency() {
        List<String> data = Arrays.asList("P", "Q", "R");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.COUNT);
        sol.search("R");
        sol.search("Q");
        sol.search("R"); // R:2, Q:1, P:0 → [R, Q, P]
        assertEquals("[R:2, Q:1, P:0]", sol.toString());
        assertEquals(Arrays.asList("R", "Q", "P"), sol.getItems());
    }

    @Test
    public void testCount_PreservesOrderOnTie() {
        List<String> data = Arrays.asList("X", "Y");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.COUNT);
        sol.search("Y");
        sol.search("X"); // Both have count=1 → should preserve ['X', 'Y']
        assertEquals("[X:1, Y:1]", sol.toString());
        assertEquals(Arrays.asList("X", "Y"), sol.getItems()); // Must remain in insertion order
    }

    @Test
    public void testEmptyList_ReturnsMinusOne() {
        SelfOrganizingList sol = new SelfOrganizingList(Arrays.asList(), SelfOrganizingList.Strategy.MOVE_TO_FRONT);
        assertEquals(-1, sol.search("X"));
    }

    @Test
    public void testNotFound_ReturnsMinusOneAndPreservesList() {
        List<String> data = Arrays.asList("M", "N");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.MOVE_TO_FRONT);
        assertEquals(-1, sol.search("O"));
        assertEquals("[M, N]", sol.toString());
    }

    @Test
    public void testCaseSensitivity() {
        List<String> data = Arrays.asList("a", "A");
        SelfOrganizingList sol = new SelfOrganizingList(data, SelfOrganizingList.Strategy.MOVE_TO_FRONT);
        assertEquals(1, sol.search("A"));
        assertEquals("[A, a]", sol.toString());
    }
}