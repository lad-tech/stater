import { State } from "../../src";

describe("State#asNew", () => {
  it("Если указан как новый", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data).source("any_source").asNew();
    const result = state.getChange();
    expect(state.isNew()).toEqual(true);
    expect(state.hasChanges()).toEqual(true);
    expect(result).not.toBeUndefined();
    expect(result?.action).toEqual("create");
    expect(result?.params).toEqual(data);
  });
});
