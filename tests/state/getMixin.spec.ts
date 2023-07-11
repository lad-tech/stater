import { State } from "../../src";

describe("State.getMixin()", () => {
  it("Возвращает mixin", () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.mixin({ age: 19 });
    const mixin = state.getMixin();
    expect(mixin).toEqual({ age: 19 });
  });

  it("Не возвращает mixin", () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    const mixin = state.getMixin();
    expect(mixin).toEqual({});
  });
});
