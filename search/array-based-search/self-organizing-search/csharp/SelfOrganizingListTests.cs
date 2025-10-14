using Xunit;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Unit tests for the SelfOrganizingList class.
/// </summary>
public class SelfOrganizingListTests
{
    [Fact]
    public void MoveToFront_SingleAccess_ShouldMoveItemToFront()
    {
        var sol = new SelfOrganizingList(new[] { "A", "B", "C" }, SelfOrganizingList.Strategy.MoveToFront);
        sol.Search("B");
        Assert.Equal(new[] { "B", "A", "C" }, sol.Items);
    }

    [Fact]
    public void MoveToFront_MultipleAccess_ImprovesPosition()
    {
        var sol = new SelfOrganizingList(new[] { "A", "B", "C", "D" }, SelfOrganizingList.Strategy.MoveToFront);
        sol.Search("C"); // → [C, A, B, D]
        sol.Search("B"); // → [B, C, A, D]
        Assert.Equal(new[] { "B", "C", "A", "D" }, sol.Items);
    }

    [Fact]
    public void Transpose_OneSwap_ShouldSwapWithPrevious()
    {
        var sol = new SelfOrganizingList(new[] { "A", "B", "C" }, SelfOrganizingList.Strategy.Transpose);
        sol.Search("C"); // → [A, C, B]
        Assert.Equal(new[] { "A", "C", "B" }, sol.Items);
    }

    [Fact]
    public void Transpose_RepeatedAccess_GraduallyMovesForward()
    {
        var sol = new SelfOrganizingList(new[] { "W", "X", "Y", "Z" }, SelfOrganizingList.Strategy.Transpose);
        sol.Search("Z"); // no change
        sol.Search("Y"); // → [W, X, Z, Y]
        sol.Search("Z"); // → [W, X, Z, Y] (Z now before Y)
        Assert.Equal(new[] { "W", "X", "Z", "Y" }, sol.Items);
    }

    [Fact]
    public void Count_ReordersByFrequency_HigherFirst()
    {
        var sol = new SelfOrganizingList(new[] { "P", "Q", "R" }, SelfOrganizingList.Strategy.Count);
        sol.Search("R");
        sol.Search("Q");
        sol.Search("R"); // R:2, Q:1, P:0 → [R, Q, P]

        Assert.Equal(new[] { "R", "Q", "P" }, sol.Items);
        Assert.Equal(2, sol.AccessCount["R"]);
        Assert.Equal(1, sol.AccessCount["Q"]);
    }

    [Fact]
    public void Count_PreservesInsertionOrderOnTie()
    {
        var sol = new SelfOrganizingList(new[] { "X", "Y" }, SelfOrganizingList.Strategy.Count);
        sol.Search("Y");
        sol.Search("X"); // Both have count=1 → should preserve ['X', 'Y']

        Assert.Equal(new[] { "X", "Y" }, sol.Items);
    }

    [Fact]
    public void EmptyList_SearchReturnsMinusOne()
    {
        var sol = new SelfOrganizingList(new string[0], SelfOrganizingList.Strategy.MoveToFront);
        Assert.Equal(-1, sol.Search("X"));
    }

    [Fact]
    public void NotFound_ReturnsMinusOneAndPreservesList()
    {
        var sol = new SelfOrganizingList(new[] { "M", "N" }, SelfOrganizingList.Strategy.MoveToFront);
        Assert.Equal(-1, sol.Search("O"));
        Assert.Equal(new[] { "M", "N" }, sol.Items);
    }

    [Fact]
    public void CaseSensitivity_DistinguishesCase()
    {
        var sol = new SelfOrganizingList(new[] { "a", "A" }, SelfOrganizingList.Strategy.MoveToFront);
        Assert.Equal(1, sol.Search("A"));
        Assert.Equal(new[] { "A", "a" }, sol.Items);
    }
}