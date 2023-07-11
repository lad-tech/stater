[stater](../README.md)

---

# StateList

обертка над массивом из `State`. Создана для:

- Пакетной работы над массивом `State`-ов. Многие методы пробрасываются на выполнение в `State`, такие как `asNew()`, `source('any_source')`...
- Содержит в себе `итератор`, который позволяет его добавлять в цикл `for of`
- Исключение `удаленных элементов` при проходе в цикле.
- Получения всех изменений в списке
- Фиксация события добавления `нового элемента` в список

---

## Создание

```javascript
import { stateList, StateList } from 'stater';

const items = [{ ... }, { ... }];
// Предпочтительный вариант:
const stateItems = stateList(items);
// Через StateList.from()
const stateItems = StateList.from(items);
```

## Методы описывающие мета информацию о списке состояний

`source`(name: string): this;

Итератор по изменениям

`actions`(...actions: TAction[]): this;

Указывает типы событий, которые возвращает менеджер состояния

`mixin`(obj: {[key: string]: any}): this;

Подмешивает объект ко всем изменениям

## Методы для редактирования состояния

Устанавливает название для источника данных

`add`(data: TStateOrRaw<Type>): this;

Добавляет новую позицию в список

`asNew`(): this;

Устанавливает состояние как созданное

`isNew`(): boolean;

Возвращает состояние объекта новый или нет

## Методы для итерации по списку состояний

`iter`(params?: TStateListIterParams): Generator<IState<Type>>;

Итератор по коллекции, который пропускает удаленные позиции

`[Symbol.iterator]`(): Iterator<IState<Type>>;

Итератор по объекту @see iter(params)

`getList`(): IState<Type>[];

## Методы возвращающие изменение состояния

Возвращает список состояний

`hasChanges`(): boolean;

Есть ли изменения

`getChanges`(): TChange<Type>[];

Возвращает изменения по списку сущностей

`getChangesIter`(): Iterable<TChange<Type>;

Итератор по изменениям
