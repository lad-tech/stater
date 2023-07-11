import { State } from "../../src";

describe("State.onChange()", () => {
  it("Тест do выполнение действия при изменении вызов do", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doCount = 0;
    let rollbackCount = 0;

    state.onChange("name", {
      do: ({ initial, current }) => doCount++,
      rollback: ({ initial, current }) => rollbackCount++,
    });

    state.set("name", "Дмитрий");

    expect(doCount).toEqual(1);
    expect(rollbackCount).toEqual(0);
  });

  it("Тест rollback откат изменений вызов rollback", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doCount = 0;
    let rollbackCount = 0;

    state.onChange("name", {
      do: ({ initial, current }) => doCount++,
      rollback: ({ initial, current }) => rollbackCount++,
    });

    state.set("name", "Дмитрий");
    state.set("name", "Евгений");

    expect(doCount).toEqual(1);
    expect(rollbackCount).toEqual(1);
  });

  it("Тест rollback (doInitialSet = initial), (doCurrentSet = current) откат изменений вызывается rollback", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doInitialSet;
    let doCurrentSet;
    let rollbackInitialSet;
    let rollbackCurrentSet;

    state.onChange(["name", "age"] as any, {
      do: ({ initial, current }) => {
        (doInitialSet = initial), (doCurrentSet = current);
      },
      rollback: ({ initial, current }) => {
        (rollbackInitialSet = initial), (rollbackCurrentSet = current);
      },
    });

    state.set("name", "Дмитрий");
    state.set("name", "Евгений");

    expect(doInitialSet).toEqual({ age: 18, name: "Евгений" });
    expect(doCurrentSet).toEqual({ age: 18, name: "Дмитрий" });
    expect(rollbackInitialSet).toEqual({ age: 18, name: "Евгений" });
    expect(rollbackCurrentSet).toEqual({ age: 18, name: "Евгений" });
  });

  it("Тест rollback (doInitialSet = initial), (doCurrentSet = current) ничего не происходит т.к. нет изменений", () => {
    const data = { name: "Дмитрий", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doInitialSet;
    let doCurrentSet;

    let rollbackInitialSet;
    let rollbackCurrentSet;

    state.onChange("name", {
      do: ({ initial, current }) => {
        (doInitialSet = initial), (doCurrentSet = current);
      },
      rollback: ({ initial, current }) => {
        (rollbackInitialSet = initial), (rollbackCurrentSet = current);
      },
    });

    state.set("name", "Дмитрий");

    expect(doCurrentSet).toEqual(undefined);
    expect(doInitialSet).toEqual(undefined);
    expect(rollbackInitialSet).toEqual(undefined);
    expect(rollbackCurrentSet).toEqual(undefined);
  });

  it("Тест установка массива элементов для onChange", () => {
    const data = { name: "Евгений", age: 18 };
    const state = new State<typeof data>(data).source("any_source");
    let doInitialSet;
    let doCurrentSet;
    let rollbackInitialSet;
    let rollbackCurrentSet;

    state.onChange(["name", "age"] as any, {
      do: ({ initial, current }) => {
        (doInitialSet = initial), (doCurrentSet = current);
      },
      rollback: ({ initial, current }) => {
        (rollbackInitialSet = initial), (rollbackCurrentSet = current);
      },
    });

    state.set("name", "Дмитрий");
    state.set("age", 19);

    expect(doInitialSet).toEqual({ age: 18, name: "Евгений" });
    expect(doCurrentSet).toEqual({ age: 19, name: "Дмитрий" });
  });

  it("Не вызываются обработчики если вызван asNew()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    state.onChange("name", { do: (params) => (doInitialSet = params.initial) });
    state.asNew();
    state.set("name", "olo");
    expect(doInitialSet).toEqual({});
  });

  it("Не вызываются обработчики если вызван delete()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    state.onChange("name", { do: (params) => (doInitialSet = params.initial) });
    state.delete();
    state.set("name", "olo");
    expect(doInitialSet).toEqual({});
  });
});
