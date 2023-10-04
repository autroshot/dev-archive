---
title: "원본이 보존되는 배열 메서드 사용하기"
description: "원본이 보존되지 않는 배열 메서드를 대체하는 것들에 대해 알아본다."
publishedDate: "2023-10-04"
tags: ["JavaScript", "배열"]
references: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted"]
isDraft: true
---

배열 메서드 중에는 원본 배열이 보존되지 않는 것들이 몇 가지 있다.

- [`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [`pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [`unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
- [`shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

이 메서드들은 원본이 변형된다.

```js
const array = [1, 2, 3, 4, 5];

const reversedArray = array.reverse();

console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1]
```

원본이 변형된다는 것을 잊고 해당 메서드를 사용하다 보면 오류의 원인이 될 수 있다. 또한 불변성이 중요한 함수형 프로그래밍에서는 어떤 것을 변형시키는 행동은 좋지 않다.

이러한 이유들 때문인지 ES2023에서 다음과 같은 불변 메서드들이 추가되었다.

| 원본 변형 메서드 | 원본 불변 메서드 |
| ---------------- | ---------------- |
| `splice`         | `toSpliced`      |
| `sort`           | `toSorted`       |
| `reverse`        | `toReversed`     |

새로운 메서드의 이름은 기존 이름의 과거 분사형에 앞에 `to`를 붙인 이름이다.

이제 불변 메서드를 사용하면 원본 배열이 변형되는 것을 신경쓸 필요가 없어진다.

```js
const array = [1, 2, 3, 4, 5];

const reversedArray = array.toReversed();

console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [1, 2, 3, 4, 5]
```

다만 추가된 지 얼마 안 된 문법이므로 실행 환경에서 지원되는지 확인할 필요가 있다. 현시점(2023년 10월)에서 대부분의 모던 브라우저에서는 지원되며 Node.js에서는 20.0.0부터 지원되므로 LTS가 아닌 현재(Current) 버전을 사용해야 한다(일정에 의하면 20.x 버전이 2023-10-24부터 LTS로 전환되므로 얼마 안 남음).

