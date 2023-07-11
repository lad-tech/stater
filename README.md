
[![Coverage Status](https://coveralls.io/repos/github/lad-tech/stater/badge.svg?branch=main)](https://coveralls.io/github/lad-tech/stater?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/lad-tech/stater/badge.svg)](https://snyk.io/test/github/stater/nsc-toolkit)

# stater - Менеджер состояния

## Что умеет

- Менять состояние
- Фиксировать изменения над состоянием

## Используемые типы

```javascript
/** Универсальный тип описывающий изменение для любого состояния */
type TChange<Type> = {
  /** Действие которое произошло с ресурсом */
  action: TAction,
  /** Имя ресурса */
  source: string,
  /** Параметры ресурса */
  params: Partial<Type>,
};
/** Виды действий которое произведены с ресурсом */
type TAction = "create" | "update" | "delete";
```

## Основные сущности

### `State`

основная сущность библиотеки, минимальная неделимая часть управления состоянием. На входе она получает JSON объект, который можно редактировать через методы и смотреть изменения, которые в нем произошли.

```javascript
import { state } from "stater";

const item = { name: "Евгений" }; // Состояние, которым мы хотим управлять
const stateItem = state(item);
// Указывание имени ресурса, который редактируется, используется для привязки к универсальному событию по изменению состояния
state.source("person");
// Пример методов изменяющих состояние
stateIte.set("name", "Евгений Онегин");
stateIte.mset({ name: "Евгений Онегин" });
// Пример методов фиксирующих изменение в состоянии
const change = stateItem.getChange();
const changed = stateItem.hasChange();
```

Более подробно смотрите описание для [State](./docs/state.md)

### `StateList`

обертка над массивом из `State`. Создана для:

- Пакетной работы над массивом `State`-ов. Многие методы пробрасываются на выполнение в `State`, такие как `asNew()`, `source('any_source')`...
- Содержит в себе `итератор`, который позволяет его добавлять в цикл `for of`
- Исключение `удаленных элементов` при проходе в цикле.
- Получения всех изменений в списке
- Фиксация события добавления `нового элемента` в список

```javascript
import { state, stateList } from "stater";

const item = state({ name: "Владимир" }); // Экземпляр State
const items = [{ name: "Евгений" }, state]; // Список состояний, которыми мы хотим управлять
const stateItems = stateList(items);
// Указывание имени ресурса, который редактируется, используется для привязки к универсальному событию по изменению состояния
state.source("person");
// Пример добавления нового элемента в список
stateIte.add({ name: "Татьяна" });

item.delete(); // Пример удаления элемента, в итератор ниже он не попадет
for (const actor of stateItems) {
  if (actor.get("name") === "Евгений") actor.set("name", "Евгений Онегин"); // Пример редактирования элемента в списке
}

// Пример методов фиксирующих изменения в списке состояний
const changes = stateItem.getChanges(); // Вернет событие create над Татьяной, delete над Владимиром и update над Евгением
const changed = stateItem.hasChange();
```

Более подробно смотрите описание для [StateList](./docs/list.md)

### `StateCompose`

обертка над произвольным количеством состояний `State` и `StateList`. Его задача объединять поток изменений из них в один.

```javascript
import { state, stateList, compose } from "stater"

const stateItem = state({  });
const stateItems = stateList([{ ... }, { ... }]);
const stateCompose = compose(stateItem, stateList, ...);
// Позволяет получить изменения как:
// Массив
const changes = stateCompose.getChanges();
// Итератор
for (const change of stateCompose.getChangesIter()) { ... }
// Итератор в виде пакетов изменений
for (const change of stateCompose.getChangesBatch(100)) { ... }
```

Более подробно смотрите описание для [StateCompose](./docs/compose.md)

### `onChange`

Подписка на события изменения свойства объекта

```javascript
//Пример подписки на события, добавляется в агрегат
this.item.onChange("title", {
  // 'title' - Свойство, на которое навешивается обработчик
  do: ({ initial, current }) => console.log("do :>> ", { initial, current }), // метод выполняется когда свойство поменялось
  rollback: ({ initial, current }) =>
    console.log("rollback :>> ", { initial, current }), // метод выполняется когда свойство возвратилось в исходное состояние
});

//Пример подписки на события в виде массива свойств, добавляется в агрегат
this.item.onChange(["title", "age"], {
  // ['title', 'age'] - Свойства, на которое навешивается обработчик
  do: ({ initial, current }) => console.log("do :>> ", { initial, current }), // метод выполняется когда свойство поменялось
  rollback: ({ initial, current }) =>
    console.log("rollback :>> ", { initial, current }), // метод выполняется когда свойство возвратилось в исходное состояние
});
```
