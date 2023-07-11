import { State } from "../../src";

describe("State#undelete", () => {
  it("Снятие пометки об удалении", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data).source("any");
    state.delete();
    state.undelete();
    const result = state.getChange();
    expect(state.hasChanges()).toEqual(false);
    expect(result).toBeUndefined();
    expect(state.isDeleted()).toEqual(false);
  });
});
