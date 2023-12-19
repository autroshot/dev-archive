---
title: "DB 마이그레이션 대비하기"
description: "DB 마이그레이션에 대비하여 관련 로직을 한 곳으로 모은 과정을 소개한다."
publishedDate: "2023-12-19"
tags: ["JavaScript", "Node.js", "Express.js", "리팩터링", "프로그래머스 데브코스"]
---

현재 맵(Map) 자료형으로 구현된 DB를 이후의 강의에서 MySQL로 변경할 예정이다. 아직 코드가 많지 않으므로 이대로 바꾸는 게 어렵지 않을 것이다. 하지만 이번 기회에 마이그레이션에 대비하여 구조를 개선해 보는 것도 좋은 경험이 될 거라 생각했다. 구체적으로는 DB 관련 로직을 한 곳으로 모으고 싶었다. 라우터와 강하게 결합되어 있는 DB 코드를 분리한다고 볼 수 있다.

현재 회원 DB를 사용하는 로직이 라우터 여기저기에 흩어져 있다.

```js
const express = require('express');
const router = express.Router();

const users = new Map(); // DB 역할을 하는 맵

router.post('/join', (req, res) => {
    const newUser = req.body;
    const { id, password, name } = newUser;

    // 회원에 해당 아이디가 있는지 확인하는 로직
    if (users.has(id)) {
        res.status(409).json(createMessage('중복된 아이디입니다.'));
        return;
    }

    // 새로운 회원을 추가하는 로직
    users.set(id, newUser);
    res.status(201).json(
        createMessage(`${newUser.name}님 회원가입이 완료되었습니다 🎉`),
    );
    return;
});
router.post('/login', (req, res) => {
    const { id, password } = req.body;

    // 아이디로 회원을 조회하는 로직
    const foundUser = users.get(id);
    // 회원이 존재하는지, 비밀번호가 일치하는지 확인하는 로직
    if (foundUser === undefined || foundUser?.password !== password) {
        res.status(422).json(
            createMessage('해당하는 사용자 정보가 존재하지 않습니다.'),
        );
        return;
    }

    res.status(200).json(
        createMessage(`${foundUser.name}님 로그인이 완료되었습니다.`),
    );
    return;
});
router
    .route('/users')
    .get((req, res) => {
        const { id } = req.body;

        // 아이디로 회원을 조회하는 로직
        const foundUser = users.get(id);
        if (foundUser === undefined) {
            res.status(404).json(
                createMessage('해당하는 사용자 정보가 존재하지 않습니다.'),
            );
            return;
        }

        res.status(200).json(foundUser);
        return;
    })
    .delete((req, res) => {
        const { id } = req.body;

        // 아이디로 회원을 조회하는 로직
        const foundUser = users.get(id);
        if (foundUser === undefined) {
            res.status(404).json(
                createMessage('해당하는 사용자 정보가 존재하지 않습니다.'),
            );
            return;
        }

        // 아이디로 회원을 삭제하는 로직
        users.delete(id);
        res.status(204).json();
        return;
    });
```

이 회원 DB 관련 로직들을 한 곳으로 모아야 이후의 DB 마이그레이션이 쉬워질 것이다.

한 곳으로 모으는 김에 필요한 로직도 정리하면 더 좋을 것이다. 사용되는 로직을 보고 필요한 기능을 정리해보니 다음과 같다.

- 개별 회원 CRUD: 현재 U가 존재하지는 않지만, 필요해질 가능성이 높다.
- 전체 회원 조회: 리팩터링 중에 디버그용으로 있으면 좋겠다고 생각했다.
- 로그인
- 존재하는 아이디인지 확인

위 정보를 바탕으로 클래스로 구현한 회원 DB는 다음과 같다.

```js
class Users {
    #users = new Map();

    #setUser(user) {
        this.#users.set(user.id, { password: user.password, name: user.name });
    }

    createUser(user) {
        this.#setUser(user);
    }
    getUser(id) {
        return this.#users.get(id);
    }
    getUsers() {
        return Array.from(this.#users, ([key, value]) => {
            return { id: key, ...value };
        });
    }
    updateUser(user) {
        this.#setUser(user);
    }
    deleteUser(id) {
        this.#users.delete(id);
    }

    isExistId(id) {
        return this.#users.has(id);
    }

    login(id, password) {
        if (!this.isExistId(id)) return false;
        if (this.getUser(id).password !== password) return false;
        return true;
    }
}
```

만들고 보니 이 클래스의 역할이 MVC 패턴에서의 모델에 가깝다는 것을 깨달았다. 이전에 Java 국비학원에서 생각 없이 찍어 내던 그 구조였다!

이제 DB 마이그레이션을 진행할 때는 이 클래스의 내부 코드만 수정하면 될 것이다. 또는 이 클래스와 같은 구조의 클래스를 만들고, 라우터에서 사용하는 클래스만 바꾸면 될 것이다.

클래스를 사용하는 라우터의 코드는 다음과 같이 바뀌었다.

```js
const users = new Users();

router.post('/join', (req, res) => {
    const newUser = req.body;
    const { id, password, name } = newUser;

    if (users.isExistId(id)) {
        res.status(409).json(createMessage('중복된 아이디입니다.'));
        return;
    }

    users.createUser(newUser);
    res.status(201).json(
        createMessage(`${newUser.name}님 회원가입이 완료되었습니다 🎉`),
    );
    return;
});
router.post('/login', (req, res) => {
    const { id, password } = req.body;

    const isLogined = users.login(id, password);
    if (!isLogined) {
        res.status(422).json(
            createMessage('해당하는 사용자 정보가 존재하지 않습니다.'),
        );
        return;
    }

    // 새로 추가된, 회원 정보를 가져오는 로직
    const loginedUser = users.getUser(id);
    res.status(200).json(
        createMessage(`${loginedUser.name}님 로그인이 완료되었습니다.`),
    );
    return;
});
router
    .route('/users')
    .get((req, res) => {
        const { id } = req.body;

        const foundUser = users.getUser(id);
        if (foundUser === undefined) {
            res.status(404).json(
                createMessage('해당하는 사용자 정보가 존재하지 않습니다.'),
            );
            return;
        }

        res.status(200).json(foundUser);
        return;
    })
    .delete((req, res) => {
        const { id } = req.body;

        const foundUser = users.getUser(id);
        if (foundUser === undefined) {
            res.status(404).json(
                createMessage('해당하는 사용자 정보가 존재하지 않습니다.'),
            );
            return;
        }

        users.deleteUser(id);
        res.status(204).json();
        return;
    });
```

로그인 로직도 바뀌었는데, 아이디와 비밀번호를 확인하는 로직과 회원 정보를 가져오는 로직을 분리했다. DB 상으로는 한 번 더 쿼리를 하므로 성능 하락이지만, 지금으로서는 이 편이 좋다고 판단했다.

개인적으로 생각한 이 리팩터링의 장점은 다음과 같다.

- 원래 목적대로 DB 마이그레이션이 쉬워진다.
- 나중에 SQL문 같은 DB 로직이 라우터에 흘러 들어올 가능성을 차단한다.
- 메서드 이름을 회원 엔티티(entity) 관점에서 만들 수 있다. (`users.set` → `users.createUser`)
- 장기적으로 비즈니스 로직을 분리하기 쉬워진다. (흔히 말하는 서비스 계층 분리)

사실 TypeScript의 인터페이스를 사용하면 더 좋을 것이다. 인터페이스에서 메서드의 형태만 정의하고 구현은 클래스에 위임할 수 있다. 라우터에서도 인터페이스에만 의존하면, DB 마이그레이션이 쉬워진다.

```ts
interface IUsers {
    createUser: (user: User) => void;
    getUser: (id: number) => User || undefined;
    getUsers: () => User[];
    updateUser: (user: User) => void;
    deleteUser: (id: number) => void;

    isExistId: (id: number) => boolean;

    login: (id: number, password: string) => boolean;
}

class Users implements IUsers { ... }
```

처음에 고안했던 방식이기도 하다. 하지만 강의에서 아직 TypeScript를 다루지 않기도 했고, 순수 JavaScript로 도전해 보는 것도 의미가 있었다고 생각한다.

현재 라우터가 채널과 회원, 두 가지가 있으며 이 리팩터링은 회원에 대해서만 적용되었다. 이후의 강의에서 실제로 DB 교체가 진행될 것이다. 마이그레이션을 진행하며, 이렇게 대비를 한 회원이 대비를 안 한 채널과 비교해서 정말 좋은지도 작성해 보겠다.

