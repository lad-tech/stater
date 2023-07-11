import { State, StateList } from "../../src";

describe("StateList#source()", () => {
  it("Добавление к пустому массиву", () => {
    const data1 = { name: "Eugen" };
    const data2 = { name: "Tanya" };
    const list = new StateList<typeof data1>([data1, data2]);
    list.source("any_source");
    expect(list.getList().map((i) => i.getSource())).toEqual([
      "any_source",
      "any_source",
    ]);
  });

  it("Если указали source для списка, то нужно при добавлении элемента в этот список его проставлять автоматически", () => {
    const state = State.from({ name: "Eugen" });
    const list = new StateList<typeof state>();
    list.source("any_source");
    list.add(state);
    expect(state.getSource()).toEqual("any_source");
  });
});
