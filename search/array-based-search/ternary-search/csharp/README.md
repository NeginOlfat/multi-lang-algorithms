## 📦 How to Run

#### 1. **Create a new console project (for main program)**

```bash
dotnet new console -n TernarySearchApp
cd TernarySearchApp
```

Replace `Program.cs` with `TernarySearch.cs` (or rename it), or just paste the code.

#### 2. **Run the example**

```bash
dotnet run
```

---

#### 3. **Create a test project (optional)**

```bash
cd ..
dotnet new xunit -n TernarySearchTests
cd TernarySearchTests

```

- Replace `UnitTest1.cs` with `TernarySearchTests.cs`
- Add a reference to the main project:

```bash
dotnet add reference ../TernarySearchApp/TernarySearchApp.csproj
```

#### 4. **Run the tests**

```bash
dotnet test
```

✅ You should see:
```
Passed!  ✅  10 of 10 tests passed.
```