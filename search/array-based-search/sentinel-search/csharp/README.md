## 📦 How to Run

#### 1. **Create a new console project (for main program)**

```bash
dotnet new console -n SentinelSearchApp
cd SentinelSearchApp
```

Replace `Program.cs` with `SentinelSearch.cs` (or rename it), or just paste the code.

#### 2. **Run the example**

```bash
dotnet run
```

#### 3. **Create a test project (optional)**

```bash
cd ..
dotnet new xunit -n SentinelSearchTests
cd SentinelSearchTests
```

- Replace `UnitTest1.cs` with `SentinelSearchTests.cs`
- Add a reference to the main project:

```bash
dotnet add reference ../SentinelSearchApp/SentinelSearchApp.csproj
```

#### 4. **Run the tests**

```bash
dotnet test
```
