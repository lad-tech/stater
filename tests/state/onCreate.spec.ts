import { State } from "../../src";

describe("State.onCreate()", () => {
  it("Вызывается после вызова asNew()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    state.onCreate({ do: (params) => (doInitialSet = params.initial) });
    state.asNew();
    expect(doInitialSet).toEqual(data);
  });

  it("Вызывается сразу при добавлении обработчика, так как state уже имеет состояние новый", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    state.asNew();
    state.onCreate({ do: (params) => (doInitialSet = params.initial) });
    expect(doInitialSet).toEqual(data);
  });

  it("Вызывается обратное событие при отмене asNew()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    let doInitialSet = {};
    let rollbackInitialSet = {};
    state.asNew();
    state.onCreate({
      do: (params) => (doInitialSet = params.initial),
      rollback: (params) => (rollbackInitialSet = params.initial),
    });
    state.asNew(false);
    expect(doInitialSet).toEqual(data);
    expect(rollbackInitialSet).toEqual(data);
  });
});
