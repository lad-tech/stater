import { State, StateList } from "../../src";

describe("StateList.mixin()", () => {
  it("Подмешивает параметр age для каждого события", () => {
    const data = { name: "Евгений" };
    const state1 = new State<typeof data>(data);
    const state2 = new State<typeof data>(data);
    const list = new StateList([state1, state2]).source("any_source").asNew();
    list.mixin({ age: 19 });
    const changes = list.getChanges();
    expect(changes.map((i) => i.params)).toEqual([
      { name: "Евгений", age: 19 },
      { name: "Евгений", age: 19 },
    ]);
  });

  it("Подмешивает параметр age после добавления нового состояния", () => {
    const data = { name: "Евгений" };
    const state1 = new State<typeof data>(data);
    const state2 = new State<typeof data>(data);
    const list = new StateList([state1]).source("any_source");
    list.mixin({ age: 19 });
    list.add(state2);
    const changes = list.getChanges();
    expect(changes.map((i) => i.params)).toEqual([
      { name: "Евгений", age: 19 },
    ]);
  });
});
