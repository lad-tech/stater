import { State, StateList } from "../../src";

describe("StateList#getChanges()", () => {
  it("Меняем состояние у State и смотрим getChanges()", () => {
    const data1 = { name: "Евгений" };
    const data2 = State.from({ name: "Татьяна" });
    const list = new StateList<typeof data1>([data1, data2]).source(
      "any_source"
    );
    data2.set("name", "Татьяна Ларина");
    const result = list.getChanges();
    expect(result.length).toEqual(1);
    expect(result[0].action).toEqual("update");
  });

  it("Меняем состояние у State и смотрим getChangesIter()", () => {
    const data1 = { name: "Евгений" };
    const data2 = State.from({ name: "Татьяна" });
    const list = new StateList<typeof data1>([data1, data2]).source(
      "any_source"
    );
    data2.set("name", "Татьяна Ларина");
    const changes = [];
    for (const change of list.getChangesIter()) {
      changes.push(change);
    }
    expect(changes.length).toEqual(1);
    expect(changes[0].action).toEqual("update");
  });
});
