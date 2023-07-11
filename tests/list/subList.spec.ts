import { State, StateList } from "../../src";

describe("StateList#subList()", () => {
  it("Получение через callback", () => {
    const state1 = State.from({ name: "Bob", age: 16 });
    const state2 = State.from({ name: "Alice", age: 23 });
    const state3 = State.from({ name: "Eugen", age: 35 });
    const state4 = State.from({ name: "Morgen", age: 32 });
    const fullList = new StateList<{ name: string; age: number }>([
      state1,
      state2,
      state3,
    ]).source("any_source");

    // Получаем под список связанный с основным
    const subList = fullList.subList((item) => item.get("age") > 18);
    // Добавляем элемент в список
    subList.add(state4);

    // В подсписке появляется новый элемент
    expect(subList.getList().map((i) => i.get("name"))).toEqual([
      "Alice",
      "Eugen",
      "Morgen",
    ]);
    // В основной список он тоже добавляется
    expect(fullList.getList().map((i) => i.get("name"))).toEqual([
      "Bob",
      "Alice",
      "Eugen",
      "Morgen",
    ]);
    // Генерируется событие в основном списке
    expect(fullList.getChanges()).toEqual([
      {
        source: "any_source",
        action: "create",
        params: { name: "Morgen", age: 32 },
        settings: {
          optimizeCreateDelete: true,
        },
      },
    ]);
  });

  it("Получение через параметры", () => {
    const state1 = State.from({ name: "Bob", age: 16 });
    const state2 = State.from({ name: "Alice", age: 23 });
    const state3 = State.from({ name: "Eugen", age: 35 });
    const fullList = new StateList<{ name: string; age: number }>([
      state1,
      state2,
      state3,
    ]).source("any_source");

    // Получаем под список связанный с основным
    const subList = fullList.subList({ age: 16 });

    // В подсписке появляется новый элемент
    expect(subList.getList().map((i) => i.get("name"))).toEqual(["Bob"]);
  });
});
