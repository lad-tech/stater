import { State } from "../../src";

describe("State.subscribeSwitch()", () => {
  it("Обработка событий отключается при onChange()", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doCount = 0;

    state.onChange("name", { do: () => doCount++ });

    // Отключаем. Нет вызова
    state.subscribeSwitch(false);
    state.set("name", "Дмитрий");
    expect(doCount).toEqual(0);

    // Включаем. Есть вызов
    state.subscribeSwitch(true);
    state.set("name", "Андрей");
    expect(doCount).toEqual(1);
  });

  it("Обработка событий отключается при onCreate()", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doCount = 0;

    state.onCreate({ do: () => doCount++ });

    // Отключаем. Нет вызова
    state.subscribeSwitch(false);
    state.asNew();
    expect(doCount).toEqual(0);

    // Включаем. Есть вызов
    state.subscribeSwitch(true);
    state.asNew();
    expect(doCount).toEqual(1);
  });

  it("Обработка событий отключается при onDelete()", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doCount = 0;

    state.onDelete({ do: () => doCount++ });

    // Отключаем. Нет вызова
    state.subscribeSwitch(false);
    state.delete();
    expect(doCount).toEqual(0);

    // Включаем. Есть вызов
    state.subscribeSwitch(true);
    state.delete();
    expect(doCount).toEqual(1);
  });

  it("Получение состояния переключателя подписок", () => {
    const data = { name: "User", age: 90 };
    const state = new State<typeof data>(data);

    state.asNew();
    state.subscribeSwitch({
      create: false,
    });
    expect(state.getSubscribeSwitch()).toEqual({
      create: false,
      update: false,
      delete: true,
    });
  });
});
