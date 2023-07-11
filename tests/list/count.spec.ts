import { StateList } from "../../src";

describe("StateList.count()", () => {
  it("Получение количества элементов в коллекции (не учитывая удаленные)", () => {
    const data = [
      { name: "User" },
      { name: "User1" },
      { name: "User2" },
      { name: "User3" },
    ];
    const list = new StateList(data);
    list.find((i) => i.get("name") === "User3")?.delete();
    expect(list.count()).toEqual(3);
  });

  it("Получение количества элементов в коллекции (учитывая удаленные)", () => {
    const data = [
      { name: "User" },
      { name: "User1" },
      { name: "User2" },
      { name: "User3" },
    ];
    const list = new StateList(data);
    list.find((i) => i.get("name") === "User3")?.delete();
    expect(list.count({ deleted: true })).toEqual(4);
  });
});
