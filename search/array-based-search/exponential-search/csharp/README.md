## 📦 How to Run

#### 1. Create Console App
```bash
dotnet new console -n ExponentialSearchApp
cd ExponentialSearchApp
```

Replace `Program.cs` with `ExponentialSearch.cs`.

#### 2. Run the Example
```bash
dotnet run
```

**Output:**
```text
🔍 Exponential Search Example
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
Target: 70

✅ Found 70 at index 6.
```

#### 3. Add Tests (Optional)

```bash
cd ..
dotnet new xunit -n ExponentialSearchTests
cd ExponentialSearchTests
dotnet add reference ../ExponentialSearchApp/ExponentialSearchApp.csproj
```

Replace `UnitTest1.cs` with `ExponentialSearchTests.cs`, then run:

```bash
dotnet test
```

✅ You'll see:
```
Passed!  ✅  11 of 11 tests passed.
```