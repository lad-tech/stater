import { State, StateList } from "../../src";

describe("StateList#hasChanges()", () => {
  it("Меняем состояние у State и смотрим hasChanges()", () => {
    const data1 = { name: "Евгений" };
    const data2 = State.from({ name: "Татьяна" });
    const list = new StateList<typeof data1>([data1, data2]);
    expect(list.hasChanges()).toEqual(false);
    data2.set("name", "Татьяна Ларина");
    expect(list.hasChanges()).toEqual(true);
  });
});
