import { State, StateList } from "../../src";

describe("StateList.getMixin()", () => {
  it("Возвращает mixin", () => {
    const data = { name: "Евгений" };
    const state1 = new State<typeof data>(data);
    const state2 = new State<typeof data>(data);
    const list = new StateList([state1, state2]).source("any_source").asNew();
    list.mixin({ age: 19 });
    const mixin = list.getMixin();
    expect(mixin).toEqual({ age: 19 });
  });

  it("Не возвращает mixin", () => {
    const data = { name: "Евгений" };
    const state1 = new State<typeof data>(data);
    const state2 = new State<typeof data>(data);
    const list = new StateList([state1, state2]).source("any_source").asNew();
    const mixin = list.getMixin();
    expect(mixin).toEqual({});
  });
});
