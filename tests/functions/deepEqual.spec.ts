import { deepEqual } from "../../src/functions/deepEqual";

describe("deepEqual()", () => {
  it("Проверяем, что функция проверяет два разных объекта со СТРОКОЙ и возвращает true, т.к. они равны", () => {
    const object1 = { name: "John" };
    const object2 = { name: "John" };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два разных объекта со СТРОКОЙ и возвращает false, т.к. они не равны (изменилось значение)", () => {
    const object1 = { name: "John" };
    const object2 = { name: "Tom" };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два разных объекта со СТРОКОЙ и возвращает false, т.к. они не равны (изменилось количество)", () => {
    const object1 = { name: "John" };
    const object2 = { name: "Tom", age: 100 };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два разных объекта с ЧИСЛОМ и возвращает true, т.к. они равны", () => {
    const object1 = { age: 100 };
    const object2 = { age: 100 };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два разных объекта с ЧИСЛОМ и возвращает false, т.к. они не равны", () => {
    const object1 = { age: 100 };
    const object2 = { age: 200 };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два разных объекта с МАССИВОМ и возвращает true, т.к. они равны", () => {
    const object1 = { colors: ["red", "green", "blue"] };
    const object2 = { colors: ["red", "green", "blue"] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два разных объекта с МАССИВОМ и возвращает false, т.к. они не равны", () => {
    const object1 = { colors: ["red", "green", "blue"] };
    const object2 = { colors: ["red", "green", "white"] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два разных объекта с ОБЪЕКТОМ и возвращает true, т.к. они равны", () => {
    const object1 = { pets: { type: "cat", age: 1 } };
    const object2 = { pets: { type: "cat", age: 1 } };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два разных объекта с ОБЪЕКТОМ и возвращает false, т.к. они не равны", () => {
    const object1 = { pets: { type: "cat", age: 1 } };
    const object2 = { pets: { type: "dog", age: 2 } };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два ГЛУБОКИХ МАССИВА и возвращает true, т.к. они равны", () => {
    const object1 = { A: [1, 2, 3, [1, 2, 3, [1, 2, 3]]] };
    const object2 = { A: [1, 2, 3, [1, 2, 3, [1, 2, 3]]] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два ГЛУБОКИХ МАССИВА и возвращает false, т.к. они не равны (изменился элемент)", () => {
    const object1 = { A: [1, 2, 3, [1, 2, 3, [1, 2, 3]]] };
    const object2 = { A: [1, 2, 3, [1, 2, 3, [1, 2, 0]]] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два ГЛУБОКИХ МАССИВА и возвращает false, т.к. они не равны (разное кол-во элементов)", () => {
    const object1 = { A: [1, 2, 3, [1, 2, 3, [1, 2, 3]]] };
    const object2 = { A: [1, 2, 3, [1, 2, 3, [1, 2]]] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два ГЛУБОКИХ ОБЪЕКТА и возвращает true, т.к. они равны", () => {
    const object1 = { A: { B: { C: "test1" } } };
    const object2 = { A: { B: { C: "test1" } } };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два ГЛУБОКИХ ОБЪЕКТА и возвращает false, т.к. они не равны  (изменился элемент)", () => {
    const object1 = { A: { B: { C: "test1" } } };
    const object2 = { A: { B: { C: "test2" } } };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два ГЛУБОКИХ ОБЪЕКТА и возвращает false, т.к. они не равны  (разное кол-во элементов)", () => {
    const object1 = { A: { B: { C: "test1" } } };
    const object2 = { A: { B: { C: "test1", D: "test1" } } };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });
  it("Проверяем, что функция проверяет два ГИБРИДНЫХ ГЛУБОКИХ ОБЪЕКТА и возвращает true, т.к. они равны", () => {
    const object1 = { A: [{ C: ["x"] }] };
    const object2 = { A: [{ C: ["x"] }] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
  it("Проверяем, что функция проверяет два ГИБРИДНЫХ ГЛУБОКИХ ОБЪЕКТА и возвращает false, т.к. они не равны", () => {
    const object1 = { A: [{ C: ["x"] }] };
    const object2 = { A: [{ C: ["y"] }] };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(false);
  });

  it("Проверяем, даты на равенство", () => {
    const dateString = "2023-02-20T09:33:09.140Z";
    const object1 = { date: new Date(dateString) };
    const object2 = { date: new Date(dateString) };
    const result = deepEqual(object1, object2);
    expect(result).toEqual(true);
  });
});
