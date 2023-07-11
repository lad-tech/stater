import { State } from "../../src";

describe("State#get", () => {
  it("Один раз", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    state.set("name", "asd");
    const result = state.get("name");
    expect(result).toEqual("asd");
    expect(state.hasChanges()).toEqual(true);
  });
});
