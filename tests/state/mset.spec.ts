import { State } from "../../src";

describe("State#mset()", () => {
  it("Нет изменений", () => {
    const data = { name: "Евгений", age: 18, gender: "муж" };
    const state = new State<typeof data>(data);
    const result = state.mset({ name: "Евгений", age: 18, gender: "муж" });
    expect(result).toEqual(false);
    expect(state.hasChanges()).toEqual(false);
  });

  it("Есть изменения", () => {
    const data = { name: "Евгений", age: 18, gender: "муж" };
    const state = new State<typeof data>(data).source("any_source");
    const result = state.mset({ name: "Евгений Онегин", age: 23 });
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(true);
    expect(state.getChange()?.params).toEqual({
      name: "Евгений Онегин",
      age: 23,
      gender: "муж",
    });
  });
});
