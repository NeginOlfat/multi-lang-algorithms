این مطلب را به زبان‌های دیگر بخوانید: [English](/sorting/merge-sort//README.md)

# 🔵 الگوریتم مرتب‌سازی ادغامی

یک الگوریتم مرتب‌سازی مبتنی بر **تقسیم و حل (Divide-and-Conquer)** که به این صورت کار می‌کند:

1- **تقسیم** آرایه به دو نیمه

2- **مرتب‌سازی بازگشتی** هر نیمه

3- **ادغام** دو نیمه مرتب شده در یک آرایه

این روش یک مرتب‌سازی قابل اعتماد، پیش‌بینی‌پذیر و کارآمد ایجاد می‌کند — مناسب برای آموزش و استفاده در محیط‌های تولید.

## 📈 پیچیدگی زمانی

| حالت       | زمان           |
|-----------|----------------|
| بهترین    | O(n log n)     |
| متوسط     | O(n log n)     |
| بدترین   | O(n log n)     |

> 💡 همیشه آرایه را به دو نیمه تقسیم می‌کند ← log n سطح، هر کدام O(n) کار ادغام انجام می‌دهند.

## 💾 پیچیدگی فضایی
- **O(n)** — نیاز به فضای کمکی برای ادغام دارد

## ✅ چه زمانی از آن استفاده کنیم؟
◻️ وقتی به **عملکرد تضمین‌شده O(n log n)** نیاز دارید

◻️ مرتب‌سازی **داده‌های بزرگ**

◻️ ساخت یک مرتب‌سازی **پایدار** (ترتیب عناصر برابر حفظ می‌شود)

◻️ آموزش **بازگشت** و **تقسیم و حل**

## 🔄 نحوه کارکرد

### 🧩 شبه‌کد
```text
BEGIN MergeSort(array)
    IF length(array) ≤ 1
        RETURN array
    END IF

    mid ← length(array) / 2
    left ← array[0 : mid]
    right ← array[mid : end]

    leftSorted ← MergeSort(left)
    rightSorted ← MergeSort(right)

    RETURN Merge(leftSorted, rightSorted)
END

BEGIN Merge(left, right)
    result ← empty list

    WHILE left and right are not empty
        IF left[0] ≤ right[0]
            APPEND left[0] to result
            REMOVE first element from left
        ELSE
            APPEND right[0] to result
            REMOVE first element from right
        END IF
    END WHILE

    APPEND remaining elements of left to result
    APPEND remaining elements of right to result

    RETURN result
END
```

### 🔄 مثال گام به گام

آرایه زیر را مرتب می‌کنیم: ‭[38, 27, 43, 3, 9, 82, 10]‬


#### مرحله تقسیم و ادغام (Divide and Merge)

```ascii
Divide Phase (Top-Down):
──────────────────────────

                    [38, 27, 43, 3, 9, 82, 10]
                                   ↓
                    ┌──────────────┴──────────────┐
               [38, 27, 43, 3]            [9, 82, 10]
                    ↓                              ↓
            ┌───────┴───────┐             ┌────────┴────────┐
        [38, 27]        [43, 3]       [9, 82]            [10]
           ↓                 ↓            ↓                 ↓
      ┌────┴────┐       ┌────┴────┐   ┌────┴────┐       ┌────┴────┐
    [38]      [27]    [43]      [3] [9]      [82]    [10]

Merge Phase (Bottom-Up):
────────────────────────

    [27, 38]       [3, 43]         [9, 82]       [10]
       ↓              ↓               ↓             ↓
       └──────┬───────┘               └─────┬───────┘
              ↓                             ↓
    [3, 27, 38, 43]                 [9, 10, 82]
                 └─────────────┬──────────────┘
                               ↓
           [3, 9, 10, 27, 38, 43, 82]
```

✅ نتیجه نهایی: ‭[3, 9, 10, 27, 38, 43, 82]‬

💡 فرآیند ادغام همیشه عنصر کوچکتر در جلو را انتخاب می‌کند. 

<br />

## ➡️ مراحل بعدی

زبان مورد نظر خود را برای مشاهده پیاده‌سازی انتخاب کنید:

[Python](/sorting/merge-sort/python//merge_sort.py) | [Java](/sorting/merge-sort/java/MergeSort.java) | [JavaScript](/sorting/merge-sort/javascript/merge_sort.js) | [C++](/sorting/merge-sort/c++/merge_sort.cpp) | [C#](/sorting/merge-sort/csharp/MergeSort.cs)

