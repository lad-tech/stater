import { State, compose } from "../../src";

describe("StateCompose", () => {
  it("asNew", () => {
    const data = { name: "Eugen" };
    const data2 = { name: "Tatyana" };
    const state = new State<typeof data>(data).source("any_source");
    const state2 = new State<typeof data>(data2).source("any_source_2");

    const composable = compose(state, state2);
    composable.asNew();

    const changes = composable.getChanges();
    expect(changes.length).toEqual(2);
    expect(changes.map((i) => i.action)).toEqual(["create", "create"]);
    expect(changes.map((i) => i.source)).toEqual([
      "any_source",
      "any_source_2",
    ]);
    expect(changes.map((i) => i.params)).toEqual([data, data2]);
  });

  it("hasChanges", () => {
    const data = { name: "Eugen" };
    const data2 = { name: "Tatyana" };
    const state = new State<typeof data>(data).source("any_source");
    const state2 = new State<typeof data>(data2).source("any_source_2");

    const composable = compose(state, state2);
    state.set("name", "Any name");

    const result = composable.hasChanges();
    expect(result).toEqual(true);
  });
});
