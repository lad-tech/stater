import { State } from "../../src";

describe("State.hasChanges()", () => {
  it("C передачей параметров", () => {
    const data = { name: "Name", age: 10 };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.set("age", 20);
    const hasAge = state.hasChanges(["age"]);
    const hasName = state.hasChanges(["name"]);
    expect(hasAge).toEqual(true);
    expect(hasName).toEqual(false);
  });

  it("Без передачи параметров", () => {
    const data = { name: "Name", age: 10 };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.set("age", 20);
    const has = state.hasChanges();
    expect(has).toEqual(true);
  });
});
