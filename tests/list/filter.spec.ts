import { StateList } from "../../src";

describe("StateList#filter()", () => {
  it("Поиск через callback", () => {
    const data = [
      { name: "Eugen", age: 18 },
      { name: "Eugen1", age: 21 },
      { name: "Eugen2", age: 22 },
    ];
    const list = new StateList(data);
    const result = list.filter((item) => item.get("age") > 18);
    expect(result.map((i) => i.get("name"))).toEqual(["Eugen1", "Eugen2"]);
  });

  it("Поиск по параметрам", () => {
    const data = [
      { name: "Eugen", age: 18 },
      { name: "Eugen1", age: 18 },
      { name: "Eugen2", age: 22 },
    ];
    const list = new StateList(data);
    const result = list.filter({ age: 18 });
    expect(result.map((i) => i.get("name"))).toEqual(["Eugen", "Eugen1"]);
  });
});
