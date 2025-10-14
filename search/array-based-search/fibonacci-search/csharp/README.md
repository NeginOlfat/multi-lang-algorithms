## 📦 How to Run

#### 1. Create Console App
```bash
dotnet new console -n FibonacciSearchApp
cd FibonacciSearchApp
```

Replace `Program.cs` with `FibonacciSearch.cs`.

#### 2. Run the Example
```bash
dotnet run
```

#### 3. Add Tests (Optional)

```bash
cd ..
dotnet new xunit -n FibonacciSearchTests
cd FibonacciSearchTests
dotnet add reference ../FibonacciSearchApp/FibonacciSearchApp.csproj
```

Replace `UnitTest1.cs` with `FibonacciSearchTests.cs`, then run:

```bash
dotnet test
```