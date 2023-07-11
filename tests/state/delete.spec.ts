import { State } from "../../src";

describe("State#delete", () => {
  it("Удаление сущности", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data).source("any");
    state.delete();
    const result = state.getChange();
    expect(state.hasChanges()).toEqual(true);
    expect(result).not.toBeUndefined();
    expect(result?.action).toEqual("delete");
    expect(state.isDeleted()).toEqual(true);
    expect(result?.source).toEqual("any");
  });

  it("Если было удаление после создания, то события на изменение нет", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data).source("any").asNew();
    state.delete();
    const result = state.getChange();
    expect(result).toBeUndefined();
    expect(state.isDeleted()).toEqual(true);
  });
});
