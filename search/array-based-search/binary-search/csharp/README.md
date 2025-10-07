## 📦 How to Run (Using .NET CLI)

#### 1. **Create a new console project (for main program)**

```bash
dotnet new console -n BinarySearchApp
cd BinarySearchApp
```

Replace `Program.cs` with `BinarySearch.cs` (or rename it), or just paste the code.

#### 2. **Run the example**

```bash
dotnet run
```

**Output:**
```
🔍 Binary Search Examples
Array: [10, 20, 30, 40, 50, 60, 70, 80]
Target: 60

✅ [Iterative] Found 60 at index 5.
✅ [Recursive] Found 60 at index 5.
```

---

#### 3. **Create a test project (optional)**

```bash
cd ..
dotnet new xunit -n BinarySearchTests
cd BinarySearchTests
dotnet add reference ../BinarySearchApp/BinarySearchApp.csproj
```

- Replace `UnitTest1.cs` with `BinarySearchTests.cs`

#### 4. **Run the tests**

```bash
dotnet test
```

✅ You should see:
```
Passed!  8 of 8 tests passed.
```