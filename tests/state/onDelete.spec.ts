import { State } from "../../src";

describe("State.onDelete()", () => {
  it("Вызывается после вызова delete()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    state.onDelete({ do: (params) => (doInitialSet = params.initial) });
    state.delete();
    expect(doInitialSet).toEqual(data);
  });

  it("Вызывается сразу при добавлении обработчика, так как state уже имеет состояние удаленный", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    state.delete();
    state.onDelete({ do: (params) => (doInitialSet = params.initial) });
    expect(doInitialSet).toEqual(data);
  });

  it("Вызывается обратное событие при отмене delete()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    let rollbackInitialSet = {};
    state.delete();
    state.onDelete({
      do: (params) => (doInitialSet = params.initial),
      rollback: (params) => (rollbackInitialSet = params.initial),
    });
    state.undelete();
    expect(doInitialSet).toEqual(data);
    expect(rollbackInitialSet).toEqual(data);
  });
});
