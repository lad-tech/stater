import { State } from "../../src";

describe("State.mixin()", () => {
  it("Подмешивает параметр age для каждого события", () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.set("name", "Евгений Онегин");
    state.mixin({ age: 19 });
    const changes = state.getChange();
    expect(changes).not.toBeUndefined();
    expect(changes?.action).toEqual("update");
    expect(changes?.source).toEqual("any_source");
    expect(changes?.params).toEqual({ name: "Евгений Онегин", age: 19 });
  });
});
