import { State, StateList } from "../../src";

describe("StateList#fullList()", () => {
  it("При вызове add() она вызывается и у полного списка", () => {
    const state1 = State.from({ name: "Bob" });
    const state2 = State.from({ name: "Alice" });
    const fullList = new StateList<typeof state1>([state1]).source(
      "any_source"
    );
    const subList = new StateList<typeof state2>([]).fullList(fullList);
    subList.add(state2);

    const changesSub = subList.getChanges();
    const changesFull = fullList.getChanges();

    expect(changesSub.map((i) => i.action)).toEqual(["create"]);
    expect(changesFull.map((i) => i.params)).toEqual([{ name: "Alice" }]);
    // В fullList изменения по созданию также передаются
    expect(changesFull.map((i) => i.action)).toEqual(["create"]);
    expect(changesFull.map((i) => i.params)).toEqual([{ name: "Alice" }]);
  });

  it("Копируется source из полного списка", () => {
    const state1 = State.from({ name: "Bob" });
    const state2 = State.from({ name: "Alice" });
    const fullList = new StateList<typeof state1>([state1]).source(
      "any_source"
    );
    const subList = new StateList<typeof state2>([]).fullList(fullList);

    expect(subList.getSource()).toEqual("any_source");
  });
});
