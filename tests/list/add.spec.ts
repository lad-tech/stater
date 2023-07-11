import { State, StateList } from "../../src";

describe("StateList#add()", () => {
  it("Добавление к пустому массиву", () => {
    const data = { name: "Eugen" };
    const list = new StateList<typeof data>();
    list.add(data);
    expect(list.getList().length).toEqual(1);
    expect(list.getList()[0].get("name")).toEqual("Eugen");
  });

  it("Добавление к не пустому массиву", () => {
    const data = { name: "Eugen" };
    const data2 = { name: "Tanya" };
    const list = new StateList<typeof data>([data]);
    list.add(data2);
    expect(list.getList().length).toEqual(2);
    expect(list.getList().map((i) => i.get("name"))).toEqual([
      "Eugen",
      "Tanya",
    ]);
  });

  it("Добавление в виде экземпляра класса State", () => {
    const data = { name: "Eugen" };
    const state = State.from(data);
    const list = new StateList<typeof data>();
    list.add(state);
    expect(list.getList().length).toEqual(1);
    expect(list.getList()[0]).toEqual(state);
    expect(list.getList().map((i) => i.get("name"))).toEqual(["Eugen"]);
  });

  it("После добавления обретает состояние как новый", () => {
    const data = { name: "Eugen" };
    const state = State.from(data);
    const list = new StateList<typeof data>().source("any_source");
    list.add(state);
    expect(state.hasChanges()).toEqual(true);
    expect(state.getChange()?.action).toEqual("create");
  });
});
