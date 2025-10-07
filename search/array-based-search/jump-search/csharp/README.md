### 📦 How to Run

#### 1. Create Console App
```bash
dotnet new console -n JumpSearchApp
cd JumpSearchApp
```

Replace `Program.cs` with `JumpSearch.cs`.

#### 2. Run the Example
```bash
dotnet run
```

**Output:**
```text
🚶‍♂️ Jump Search Example
Array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Target: 7

✅ Found 7 at index 7.
```

#### 3. Add Tests (Optional)

```bash
cd ..
dotnet new xunit -n JumpSearchTests
cd JumpSearchTests
dotnet add reference ../JumpSearchApp/JumpSearchApp.csproj
```

Replace `UnitTest1.cs` with `JumpSearchTests.cs`, then run:

```bash
dotnet test
```

✅ You'll see:
```
Passed!  ✅  9 of 9 tests passed.
```