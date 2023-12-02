---
title: "선택적 연쇄"
description: "JavaScript의 선택적 연쇄에 대해 간단히 알아본다."
publishedDate: "2023-10-02"
tags: ["JavaScript", "치트 시트", "선택적 연쇄"]
references: ["https://developer.mozilla.org/ko/", "https://ko.javascript.info/"]
---

선택적 연쇄(optional chaining), `?.`를 사용하면 중첩된 객체의 프로퍼티에 <strong>안전</strong>하게 접근할 수 있다. 연산자의 왼쪽에 있는 평가 대상이 `null` 또는 `undefined`이면 평가를 멈추고 `undefined`를 반환한다.

구문:

```
object?.property
object?.[exprssion]
array?.[index]
function?.(arguments)
```

예시:

```js
const user = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

console.log(user.dog?.name); // undefined
console.log(user.nonExistentMethod?.()); // undefined
```

