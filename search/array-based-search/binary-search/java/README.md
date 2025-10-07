## 📦 How to Compile and Run

#### 1. **Compile the files**
```bash
javac BinarySearch.java BinarySearchTest.java
```

#### 2. **Run the example**
```bash
java BinarySearch
```
**Output:**
```
🔍 Binary Search Examples
Array: [10, 20, 30, 40, 50, 60, 70, 80]
Target: 60

✅ [Iterative] Found 60 at index 5.
✅ [Recursive] Found 60 at index 5.
```

#### 3. **Run the tests** (requires JUnit on classpath)

If you're using **JUnit 4**, download `junit-4.13.2.jar` and `hamcrest-core-1.3.jar`, then run:

```bash
java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore BinarySearchTest
```

> 🔁 On **Windows**, use `;` instead of `:`:
> ```bash
> java -cp .;junit-4.13.2.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore BinarySearchTest
> ```

You should see:
```
OK (9 tests)
```