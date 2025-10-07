## 📦 How to Compile and Run

#### 1. **Compile the files**
```bash
javac JumpSearch.java JumpSearchTest.java
```

#### 2. **Run the example**
```bash
java JumpSearch
```

**Output:**
```
🚶‍♂️ Jump Search Example
Array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Target: 7

✅ Found 7 at index 7.
```

#### 3. **Run the tests** (requires JUnit on classpath)

Make sure you have `junit-4.13.2.ja`r and `hamcrest-core-1.3.jar` in your folder:

```bash
java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore JumpSearchTest
```

> 🔁 On **Windows**, use `;` instead of `:`:
> ```bash
> java -cp .;junit-4.13.2.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore JumpSearchTest
> ```

You should see:
```
OK (8 tests)
```