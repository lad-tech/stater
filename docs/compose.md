[stater](../README.md)

---

# StateCompose

обертка над произвольным количеством состояний `State` и `StateList`. Его задача объединять поток изменений из них в один.

## Создание

```javascript
import { stateCompose, stateList, stateItem } from "stater";

const stateItem = stateItem(item);
const stateItems = stateList(items);
// Предпочтительный вариант:
const composed = stateCompose(stateItem, stateItems);
```

## Методы для редактирования состояния

`asNew`(): this

Устанавливает состояние как созданное

## Методы возвращающие изменение состояния

`hasChanges`(): boolean

Есть ли изменения

`getChanges`(): TChange<any>[]

Список всех изменений

`getChangesIter`(): Iterable<TChange<any>>

Итератор по изменениям

`getChangesBatch`(size?: number): Iterable<TChange<any>[]>

Итератор по изменениям пакетно
