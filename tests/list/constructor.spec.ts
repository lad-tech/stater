import { State, StateList } from "../../src";

describe("StateList#constructor()", () => {
  it("Добавление состояний в constructor", () => {
    const list = new StateList<{ name: string }>([
      { name: "Alisa" },
      { name: "Bob" },
    ]);
    expect(list.getList().length).toEqual(2);
    expect(list.getList().map((i) => i.get("name"))).toEqual(["Alisa", "Bob"]);
  });

  it("Добавление в виде экземпляра класса State", () => {
    const data = { name: "Bob" };
    const state = State.from(data);
    const list = new StateList<{ name: string }>([state]);
    expect(list.getList().length).toEqual(1);
    expect(list.getList()[0]).toEqual(state);
  });
});
