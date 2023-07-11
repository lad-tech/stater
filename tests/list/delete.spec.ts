import { State, StateList } from "../../src";

describe("StateList#delete()", () => {
  it("Удаление всех элементов списка", () => {
    const state1 = State.from({ id: "id1" });
    const state2 = State.from({ id: "id2" });
    const list = new StateList([state1, state2]).source("any_source");
    list.delete();
    const changes = list.getChanges();
    expect(changes.map((i) => i.action)).toEqual(["delete", "delete"]);
    expect(changes.map((i) => i.source)).toEqual(["any_source", "any_source"]);
    expect(changes.map((i) => i.params)).toEqual([
      { id: "id1" },
      { id: "id2" },
    ]);
  });
});
