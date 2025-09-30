## 📦 How to Compile and Run

#### 1. **Compile the files**
```bash
javac LinearSearch.java LinearSearchTest.java
```

#### 2. **Run the example**
```bash
java LinearSearch
```
**Output:**
```
✅ Found 20 at index 5.
```

#### 3. **Run the tests** (requires JUnit on classpath)

If you're using **JUnit 4**, download `junit-4.13.2.jar` and `hamcrest-core-1.3.jar`, then run:

```bash
java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore LinearSearchTest
```

> 🔁 On **Windows**, use `;` instead of `:`:
> ```bash
> java -cp .;junit-4.13.2.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore LinearSearchTest
> ```

You should see:
```
OK (8 tests)
```