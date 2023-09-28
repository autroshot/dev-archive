---
title: "switch문"
description: "JavaScript의 switch문에 대해 간단히 알아본다."
publishedDate: "2023-09-28"
tags: ["JavaScript", "치트 시트", "switch"]
references: ["https://developer.mozilla.org/ko/", "https://ko.javascript.info/"]
---

`switch`문은 표현식(`expression`)을 `case`절과 일치시켜 표현식을 평가하고 `break`를 만나기 전까지 해당 절의 명령문을 실행한다.

```js
switch (expression) {
  case value1:  // if (expression === value1)
    ...
    [break;]
    
  case value2:  // else if (expression === value2)
    ...
    [break;]
  
  // 복수의 case문을 묶을 수도 있다.
  case value3:
  case value4:
    ...
    [break;]
    
  [default:
    ...
    [break;]
  ]
}
```

- `switch`문은 일치 연산자(`===`)로 조건을 확인한다.
- 표현식과 일치하는 `case`절이 하나도 없다면 `default`절이 실행된다.
- `case`절 안에 `break`가 없으면 뒤의 `case`절도 실행된다. 이를 이용해 여러 `case`문을 묶을 수 있다.
- 다중 `else if`문을 `switch`문으로 바꿔서 가독성을 높일 수 있다.