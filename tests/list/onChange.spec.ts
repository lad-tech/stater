import { State, StateList } from "../../src";

describe("StateList.onChange()", () => {
  it("Пробрасывается событие для всех уже добавленных элементов", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    const list = new StateList<typeof data>([state]);
    let doCurrentSet = {};
    let rollbackCurrentSet = {};
    list.onChange("name", {
      do: (params) => (doCurrentSet = params.current),
      rollback: (params) => (rollbackCurrentSet = params.current),
    });

    // При первом изменении
    state.set("name", "olo");
    expect(doCurrentSet).toEqual({ name: "olo" });
    expect(rollbackCurrentSet).toEqual({});

    // При обратном изменении
    state.set("name", "Eugen");
    expect(doCurrentSet).toEqual({ name: "olo" });
    expect(rollbackCurrentSet).toEqual(data);
  });

  it("Пробрасывается событие для всех новых элементов", () => {
    const data = { name: "Евгений" };
    const data2 = { name: "Татьяна" };
    const state = new State<typeof data>(data);
    const state2 = new State<typeof data>(data2);
    const list = new StateList<typeof data>([state]);
    let doCurrentSet = {};
    let rollbackCurrentSet = {};
    list.onChange("name", {
      do: (params) => (doCurrentSet = params.current),
      rollback: (params) => (rollbackCurrentSet = params.current),
    });
    list.add(state2);

    // События срабатывают и для вновь добавленных элементов, но если им указать, что они не новые
    state2.asNew(false).set("name", "olo");
    expect(doCurrentSet).toEqual({ name: "olo" });
    expect(rollbackCurrentSet).toEqual({});
  });
});
