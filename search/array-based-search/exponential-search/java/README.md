## 📦How to Compile and Run

#### 1. **Compile**
```bash
javac ExponentialSearch.java ExponentialSearchTest.java
```

#### 2. **Run Example**
```bash
java ExponentialSearch
```

**Output:**
```text
🔍 Exponential Search Example
Array: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
Target: 70

✅ Found 70 at index 6.
```

#### 3. **Run Tests** (with JUnit)

Make sure you have `junit-4.13.2.jar` and `hamcrest-core-1.3.jar`:

```bash
java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore ExponentialSearchTest
```

> 🔁 On **Windows**, use `;` instead of `:`:
> ```bash
> java -cp .;junit-4.13.2.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore ExponentialSearchTest
> ```

You’ll see:
```
OK (10 tests)
```