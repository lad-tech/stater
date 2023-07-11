import { State, StateList } from "../../src";

describe("StateList.onCreate()", () => {
  it("Пробрасывается событие для всех уже добавленных элементов", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    const list = new StateList<typeof data>([state]);
    let doCurrentSet = {};
    let rollbackCurrentSet = {};
    list.onCreate({
      do: (params) => (doCurrentSet = params.current),
      rollback: (params) => (rollbackCurrentSet = params.current),
    });

    // При первом изменении
    list.asNew();
    expect(doCurrentSet).toEqual(data);
    expect(rollbackCurrentSet).toEqual({});

    // При обратном изменении
    list.asNew(false);
    expect(doCurrentSet).toEqual(data);
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
    list.onCreate({
      do: (params) => (doCurrentSet = params.current),
      rollback: (params) => (rollbackCurrentSet = params.current),
    });
    list.add(state2);

    expect(doCurrentSet).toEqual(data2);
    expect(rollbackCurrentSet).toEqual({});
  });
});
