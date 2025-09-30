## 📦 How to Run

#### 1. **Create a new console project (for main program)**

```bash
dotnet new console -n LinearSearchApp
cd LinearSearchApp
```

Replace `Program.cs` with `LinearSearch.cs` (or rename it), or just paste the code.

#### 2. **Run the example**

```bash
dotnet run
```

**Output:**
```
✅ Found 20 at index 5.
```

---

#### 3. **Create a test project (optional)**

```bash
cd ..
dotnet new xunit -n LinearSearchTests
cd LinearSearchTests
```

- Replace `UnitTest1.cs` with `LinearSearchTests.cs`
- Add a reference to the main project:

```bash
dotnet add reference ../LinearSearchApp/LinearSearchApp.csproj
```

#### 4. **Run the tests**

```bash
dotnet test
```

✅ You should see:
```
Passed!  ✅  8 of 8 tests passed.
```