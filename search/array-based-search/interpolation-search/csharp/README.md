## 📦 How to Run

#### 1. Create Console App
```bash
dotnet new console -n InterpolationSearchApp
cd InterpolationSearchApp
```

Replace `Program.cs` with `InterpolationSearch.cs`.

#### 2. Run the Example
```bash
dotnet run
```

**Output:**
```text
🔍 Interpolation Search Example
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90]
Target: 70

✅ Found 70 at index 6.
```

#### 3. Add Tests (Optional)

```bash
cd ..
dotnet new xunit -n InterpolationSearchTests
cd InterpolationSearchTests
dotnet add reference ../InterpolationSearchApp/InterpolationSearchApp.csproj
```

Replace `UnitTest1.cs` with `InterpolationSearchTests.cs`, then run:

```bash
dotnet test
```

✅ You'll see:
```
Passed!  ✅  10 of 10 tests passed.
```