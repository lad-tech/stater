import { State } from "../../src";

describe("State#diff", () => {
  it("Простое сравнивание. Опции не передаются.", () => {
    const data = {
      name: "Евгений",
      age: 18,
      colors: { front: "white", back: "black" },
      pets: [{ name: "Шарик" }, { name: "Мурзик" }],
      users: ["John", "Jerry", "Jack"],
    };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff(
      {
        name: "Дмитрий",
        age: 18,
        colors: { front: "white", back: "red" },
        pets: [{ name: "Кузя" }, { name: "Мурзик" }],
        users: ["John", "Mike", "Jack"],
      },
      {}
    );

    expect(result).toEqual({
      name: { f: "Евгений", s: "Дмитрий" },
      colors: {
        f: { front: "white", back: "black" },
        s: { front: "white", back: "red" },
      },
      pets: {
        f: [{ name: "Шарик" }, { name: "Мурзик" }],
        s: [{ name: "Кузя" }, { name: "Мурзик" }],
      },
      users: { f: ["John", "Jerry", "Jack"], s: ["John", "Mike", "Jack"] },
    });
  });

  it("Простое сравнение. Опции не передаются. Объекты одинаковые", () => {
    const data = {
      name: "Андрей",
      pets: [{ name: "Шарик" }, { name: "Мурзик" }],
      colors: { front: "white", back: "black" },
      users: ["John", "Jerry", "Jack"],
    };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff(
      {
        name: "Андрей",
        pets: [{ name: "Шарик" }, { name: "Мурзик" }],
        colors: { front: "white", back: "black" },
        users: ["John", "Jerry", "Jack"],
      },
      {}
    );

    expect(result).toEqual({});
  });

  it("В объекте добавляется еще 1 свойство, которого нет в исходном. Опции не передаются.", () => {
    const data = { name: "Евгений", lastName: "Onegin" };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff({ name: "Дмитрий", age: 18 }, {});

    expect(result).toEqual({
      name: { f: "Евгений", s: "Дмитрий" },
      lastName: { f: "Onegin", s: undefined },
      age: {
        f: undefined,
        s: 18,
      },
    });
  });

  it("Опции передаются { skipNew: true } НЕ учитывать новые свойства.", () => {
    const data = { name: "Евгений", lastName: "Онегин", test: "test" };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff(
      {
        name: "Дмитрий",
        lastName: "Донской",
        newProperty: "newProperty",
        pets: [{ name: "Шарик" }],
      },
      { skipNew: true }
    );

    expect(result).toEqual({
      name: { f: "Евгений", s: "Дмитрий" },
      lastName: {
        f: "Онегин",
        s: "Донской",
      },
      test: {
        f: "test",
        s: undefined,
      },
    });
  });

  it("Опции передаются { skipOld: true } НЕ учитывать старые свойства.", () => {
    const data = {
      name: "Евгений",
      lastName: "Онегин",
      test: "test",
      pets: [{ name: "Шарик" }],
    };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff(
      { name: "Дмитрий", lastName: "Донской", newProperty: "newProperty" },
      { skipOld: true }
    );

    expect(result).toEqual({
      name: { f: "Евгений", s: "Дмитрий" },
      lastName: {
        f: "Онегин",
        s: "Донской",
      },
      newProperty: {
        f: undefined,
        s: "newProperty",
      },
    });
  });

  it("Опции передаются { skipOld: true } и { skipNew: true } НЕ учитывать старые И новые свойства.", () => {
    const data = {
      name: "Евгений",
      lastName: "Онегин",
      test: "test",
      pets: [{ name: "Шарик" }],
    };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff(
      {
        name: "Дмитрий",
        lastName: "Донской",
        newProperty: "newProperty",
        pets: [{ name: "Шарик" }],
      },
      { skipOld: true, skipNew: true }
    );

    expect(result).toEqual({
      name: { f: "Евгений", s: "Дмитрий" },
      lastName: {
        f: "Онегин",
        s: "Донской",
      },
    });
  });

  it("Не обрабатывать свойства которые описаны в опциях.", () => {
    const data = { name: "Евгений", lastName: "Онегин", test: "test" };
    const state = new State<typeof data>(data).source("any_source").asNew();

    const result = state.diff(
      { name: "Дмитрий", lastName: "Донской", newProperty: "newProperty" },
      {
        skipOld: true,
        skipNew: true,
        skip: ["lastName"],
      }
    );
    expect(result).toEqual({
      name: { f: "Евгений", s: "Дмитрий" },
    });
  });

  it("Принимаемые параметры не верны. Изначальное состояние - строка", () => {
    const data = {
      name: "Дмитрий",
      lastName: "Донской",
      newProperty: "newProperty",
    };
    const state = new State<typeof data>(data).source("any_source").asNew();

    expect(() => {
      state.diff("Сравни меня полностью");
    }).toThrow("Сравниваемый элемент может быть только объектом");
  });

  it("Принимаемые параметры не верны. Сравнение с массивом", () => {
    const data = { name: "Евгений", lastName: "Онегин", test: "test" };
    const state = new State<typeof data>(data).source("any_source").asNew();

    expect(() => {
      state.diff(["Состояние"]);
    }).toThrow("Сравниваемый элемент может быть только объектом");
  });
});
