import { State, StateList } from "../../src";

describe("StateList.onDelete()", () => {
  it("Пробрасывается событие для всех уже добавленных элементов", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    const list = new StateList<typeof data>([state]);
    let doCurrentSet = {};
    let rollbackCurrentSet = {};
    list.onDelete({
      do: (params) => (doCurrentSet = params.current),
      rollback: (params) => (rollbackCurrentSet = params.current),
    });

    list.delete();
    expect(doCurrentSet).toEqual(data);
    expect(rollbackCurrentSet).toEqual({});
  });

  it("Пробрасывается событие для всех новых элементов", () => {
    const data = { name: "Евгений" };
    const data2 = { name: "Татьяна" };
    const state = new State<typeof data>(data);
    const state2 = new State<typeof data>(data2);
    const list = new StateList<typeof data>([state]);
    let doCurrentSet = {};
    let rollbackCurrentSet = {};
    list.onDelete({
      do: (params) => (doCurrentSet = params.current),
      rollback: (params) => (rollbackCurrentSet = params.current),
    });
    list.add(state2);

    list.delete();
    expect(doCurrentSet).toEqual(data2);
    expect(rollbackCurrentSet).toEqual({});
  });
});
