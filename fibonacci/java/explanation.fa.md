# 🧠 توضیح کد فیبوناچی به زبان Java

## 📌 روش بازگشتی (Recursive)

```java
public static int fibonacciRecursive(int n) {
    // حالت‌های پایه
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    // حالت بازگشتی
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
```

این روش از یک رویکرد بازگشتی (Recursion) ساده استفاده می‌کند که در آن تابع خود را دوباره فراخوانی می‌کند تا دو عدد قبلی را محاسبه کند. این روش دارای پیچیدگی زمانی بالا به دلیل محاسبات تکراری بسیار زیاد است و زمان اجرای آن به صورت نمایی O(2ⁿ) می‌باشد.

<br />

## 📌 روش تکراری (Iterative)
```java
public static int fibonacciIterative(int n) {
    // حالت‌های پایه
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;

    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}
```

این روش از یک حلقه برای محاسبه اعداد فیبوناچی به صورت غیر بازگشتی استفاده می‌کند. این روش کارآمدتر از روش بازگشتی است زیرا از بار اضافی فراخوانی‌های چندگانه تابع جلوگیری می‌کند و دارای پیچیدگی زمانی خطی O(n) است.

<br/>

## 📌 روش مموریزیشن / ذخیره‌سازی (Memoization)
```java
public static int fibonacciMemoization(int n, HashMap<Integer, Integer> memo) {
    // اگر قبلاً محاسبه شده باشد، مقدار را برگردان
    if (memo.containsKey(n)) {
        return memo.get(n);
    }

    // حالت‌های پایه
    if (n <= 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }

    // محاسبه بازگشتی با ذخیره‌سازی
    memo.put(n, fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo));
    return memo.get(n);
}

// تابع بدون پارامتر اضافی برای استفاده آسان
public static int fibonacciMemoization(int n) {
    return fibonacciMemoization(n, new HashMap<Integer, Integer>());
}
```
این روش از ذخیره‌سازی مقادیر قبلی (Memoization) استفاده می‌کند تا از محاسبات تکراری جلوگیری کند. با استفاده از HashMap نتایج را ذخیره کرده و در صورت نیاز دوباره استفاده می‌کند. این کار پیچیدگی زمانی را از O(2ⁿ) به O(n) کاهش می‌دهد و عملکرد برنامه را به میزان قابل توجهی بهبود می‌بخشد.

<br/>

## 📌 روش به توان رساندن ماتریس (Matrix Exponentiation)
```java
 // تابع اصلی برای محاسبه فیبوناچی با روش به توان رساندن ماتریس
    public static int fibonacciMatrix(int n) {
        if (n <= 0)
            return 0;

        int[][] result = power(new int[][]{{1, 1}, {1, 0}}, n - 1);
        return result[0][0];
    }

    // تابع کمکی برای ضرب دو ماتریس ۲×۲
    private static int[][] multiply(int[][] a, int[][] b) {
        int[][] c = {{0, 0}, {0, 0}};

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                // هر عنصر، حاصل ضرب سطر i از a در ستون j از b است
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
            }
        }

        return c;
    }

    // تابع بازگشتی برای محاسبه توان ماتریس با روش به توان رساندن دوگانه
    private static int[][] power(int[][] mat, int n) {
        if (n == 1)
            return mat;

        int[][] half = power(mat, n / 2);
        int[][] sq = multiply(half, half);

        if (n % 2 == 0) {
            return sq;
        } else {
            return multiply(sq, new int[][]{{1, 1}, {1, 0}});
        }
    }
```
این روش از به توان رساندن ماتریس برای محاسبه عدد n-ام فیبوناچی به شیوه‌ای کارآمد استفاده می‌کند. این روش از هویت زیر استفاده می‌کند:

![Fibonacci Matrix](/assets/FibonacciMatrix.png)

برای یافتن `F(n)`:

◻️​ماتریس تبدیل `‭[[1, 1], [1, 0]]‬` را به توان `n - 1` برسانید.


◻️عنصر اول ماتریس حاصل (F(n)) را برگردانید.


### ✅ چرا این روش کارآمد است:
◻️ از به توان رساندن دوگانه استفاده می‌کند.

◻️ پیچیدگی زمانی را به O(log n) کاهش می‌دهد.

◻️ از محاسبات تکراری جلوگیری می‌کند.

<br/>

## 📌 روش دوبل‌سازی سریع (Fast Doubling)
```java
     // تابع اصلی برای محاسبه فیبوناچی با روش دوبل‌سازی سریع
    public static int fibonacciFastDoubling(int n) {
        int[] result = fastDbl(n);
        return result[0]; // بازگرداندن F(n)
    }

    // تابع کمکی بازگشتی که زوج [F(k), F(k+1)] را برمی‌گرداند
    private static int[] fastDbl(int k) {
        if (k == 0)
            return new int[]{0, 1}; // حالت پایه: F(0)=0, F(1)=1

        int[] pair = fastDbl(k / 2);
        int a = pair[0], b = pair[1];

        // استفاده از هویت‌ها:
        // F(2k)   = F(k) * [2*F(k+1) - F(k)]
        // F(2k+1) = F(k+1)^2 + F(k)^2
        int c = a * (2 * b - a); // F(2k)
        int d = a * a + b * b;     // F(2k + 1)

        if (k % 2 == 0) {
            return new int[]{c, d}; // اگر k زوج باشد
        } else {
            return new int[]{d, c + d}; // اگر k فرد باشد
        }
    }
```
این روش از هویت‌های ریاضی فیبوناچی برای محاسبه سریع استفاده می‌کند:

![Fibonacci Fast Doubling : F(2k) = F(k) . (2F(k+1) - F(k))](/assets/FibonacciFD1.png)
![Fibonacci Fast Doubling : F(2k + 1) = F(k+1)^2 + F(k)^2](/assets/FibonacciFD2.png)


تابع به صورت بازگشتی `‭[F(k), F(k+1)]‬` را محاسبه کرده و بر اساس اینکه `n` زوج یا فرد است، مقادیر را ترکیب می‌کند.

### ✅ چرا این روش کارآمد است:

◻️ محاسبه F(n) را در O(log n) انجام می‌دهد.

◻️ در هر مرحله دو مقدار را برمی‌گرداند تا از محاسبه 
مجدد جلوگیری شود.

◻️ به طور کلی نسبت به روش ماتریس سریع‌تر است زیرا عملیات کمتری انجام می‌دهد.
