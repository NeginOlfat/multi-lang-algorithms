## 📦How to Compile and Run

#### 1. **Compile**
```bash
javac FibonacciSearch.java FibonacciSearchTest.java
```

#### 2. **Run Example**
```bash
java FibonacciSearch
```

#### 3. **Run Tests** (with JUnit)

Make sure you have `junit-4.13.2.jar` and `hamcrest-core-1.3.jar`:

```bash
java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore FibonacciSearchTest
```

> 🔁 On **Windows**, use `;` instead of `:`:
> ```bash
> java -cp .;junit-4.13.2.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore FibonacciSearchTest
> ```
