---
title: "명시적 형 변환"
description: "JavaScript의 명시적 형 변환에 대해 간단히 알아본다."
publishedDate: "2023-10-01"
tags: ["JavaScript", "치트 시트", "형 변환"]
references: ["https://developer.mozilla.org/ko/", "https://ko.javascript.info/"]
---

다양한 방법이 있지만 가독성을 위해 각 타입의 생성자 함수를 사용하는 것이 좋다.

- `String()`
- `Number()`
- `Boolean()`

```js
const string = String(123); // '123'
const number = Number('123'); // 123
const boolean = Boolean(null); // false
```

`String()` 대신 `toString()`을 사용할 수 있다. 긴 코드일 때는 `toString()`을 사용하는 것이 가독성이 좋다.

```js
const string = very.very.long.code.toString();
```

숫자형으로 변환할 때의 규칙은 다음과 같다.

| 전달받은 값      | 결과                                                         |
| ---------------- | ------------------------------------------------------------ |
| `undefined`      | `NaN`                                                        |
| `null`           | `0`                                                          |
| `true` / `false` | `1` / `0`                                                    |
| 문자열           | 문자열의 처음과 끝 공백이 제거된다. 공백 제거 후에 남은 문자열이 없다면 `0`, 존재한다면 문자열에서 숫자를 읽는다. 변환에 실패하면 `NaN`이 된다. |

불형으로 변환할 때의 규칙은 다음과 같다.

| 전달받은 값                           | 결과    |
| ------------------------------------- | ------- |
| `0`, `NaN`, `''`, `null`, `undefined` | `false` |
| 그 외의 값                            | `true`  |
