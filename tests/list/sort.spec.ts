import { StateList } from "../../src";

describe("StateList.sort()", () => {
  it("Сортировка чисел", () => {
    const data = [{ age: 15 }, { age: 34 }, { age: 21 }, { age: 12 }];
    const list = new StateList(data);
    list.sort((a, b) => {
      if (a.get("age") < b.get("age")) {
        return -1;
      }
      if (a.get("age") > b.get("age")) {
        return 1;
      }
      return 0;
    });

    const result = list.map((v) => v.get("age"));
    expect(result).toMatchObject([12, 15, 21, 34]);
  });

  it("Сортировка строк", () => {
    const data = [
      { name: "Наташа" },
      { name: "Полина" },
      { name: "Ольга" },
      { name: "Татьяна" },
    ];
    const list = new StateList(data);
    list.sort((a, b) => {
      if (a.get("name") < b.get("name")) {
        return -1;
      }
      if (a.get("name") > b.get("name")) {
        return 1;
      }
      return 0;
    });

    const result = list.map((v) => v.get("name"));
    expect(result).toMatchObject(["Наташа", "Ольга", "Полина", "Татьяна"]);
  });

  it("Сортировка: короткий синтаксис (поле)", () => {
    const data = [{ age: 15 }, { age: 34 }, { age: 21 }, { age: 12 }];
    const list = new StateList(data);
    list.sort("age");

    const result = list.map((v) => v.get("age"));
    expect(result).toMatchObject([12, 15, 21, 34]);
  });
});
