import { StateList } from "../../src";

describe("StateList.find()", () => {
  it("Возврат элемента", () => {
    const data = [{ name: "Eugen" }, { name: "Eugen1" }, { name: "Eugen2" }];
    const list = new StateList(data);
    const result = list.find((item) => item.get("name") === "Eugen1");
    expect(result).not.toBeUndefined();
    expect(result?.get("name")).toEqual("Eugen1");
  });

  it("Возврат элемента с начала/конца", () => {
    const data = [{ name: "Eugen" }, { name: "Eugen1" }, { name: "Eugen2" }];
    const list = new StateList(data);

    const first = list.find({});
    expect(first).not.toBeUndefined();
    expect(first?.get("name")).toEqual("Eugen");

    const last = list.find({}, { reverse: true });
    expect(last).not.toBeUndefined();
    expect(last?.get("name")).toEqual("Eugen2");
  });

  it("Поиск с начала/конца по условию", () => {
    const data = [
      { name: "Eugen", age: 18 },
      { name: "Eugen1", age: 21 },
      { name: "Eugen2", age: 22 },
    ];
    const list = new StateList(data);

    const first = list.find((i) => i.get("age") > 20);
    expect(first).not.toBeUndefined();
    expect(first?.get("name")).toEqual("Eugen1");

    const last = list.find((i) => i.get("age") > 20, { reverse: true });
    expect(last).not.toBeUndefined();
    expect(last?.get("name")).toEqual("Eugen2");
  });
  it("Поиск по параметрам", () => {
    const data = [
      { name: "Eugen", age: 18 },
      { name: "Eugen1", age: 21 },
      { name: "Eugen2", age: 22 },
    ];
    const list = new StateList(data);
    const result = list.find({ name: "Eugen", age: 18 });
    expect(result).not.toBeUndefined();
    expect(result?.get("name")).toEqual("Eugen");
  });

  it("Возврат undefined", () => {
    const data = [{ name: "Eugen" }, { name: "Eugen1" }, { name: "Eugen2" }];
    const list = new StateList(data);
    const result = list.find((item) => item.get("name") === "Eugen3");
    expect(result).toBeUndefined();
  });
});
