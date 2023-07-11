import { State } from "../../src";

describe("State#set", () => {
  it("Один раз", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    const result = state.set("name", "asd");
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(true);
  });
  it("Один раз. Глубокий объект", () => {
    const data = { name: { cat: "Мурзик" } };
    const state = new State<typeof data>(data);
    const result = state.set("name", { cat: "Барсик" });
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(true);
  });

  it("Второй ввод повторяющимся значением.", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    state.set("name", "asd");
    const result = state.set("name", "asd");
    expect(result).toEqual(false);
    expect(state.hasChanges()).toEqual(true);
  });

  it("Второй ввод повторяющимся значением. Глубокий объект", () => {
    const data = { name: { cat: "Мурзик" } };
    const state = new State<typeof data>(data);
    state.set("name", { cat: "Барсик" });
    const result = state.set("name", { cat: "Барсик" });
    expect(result).toEqual(false);
    expect(state.hasChanges()).toEqual(true);
  });

  it("Второй ввод старым значением, отмена изменения", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    state.set("name", "asd");
    const result = state.set("name", "Eugen");
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(false);
  });

  it("Второй ввод старым значением, отмена изменения. Глубокий объект", () => {
    const data = { names: ["John", "Tom", "Mary"] };
    const state = new State<typeof data>(data);
    state.set("names", ["John", "Mary"]);
    const result = state.set("names", ["John", "Tom", "Mary"]);
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(false);
  });

  it("Второй ввод", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    state.set("name", "asd");
    const result = state.set("name", "asd2");
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(true);
  });

  it("Второй ввод. Глубокий объект", () => {
    const data = { color: { front: "white", back: "black" } };
    const state = new State<typeof data>(data);
    state.set("color", { front: "white", back: "red" });
    const result = state.set("color", { front: "white", back: "green" });
    expect(result).toEqual(true);
    expect(state.hasChanges()).toEqual(true);
  });

  it("работа с временем. Одинаковые значения. Изменений нет", () => {
    const dateString = "2023-02-20T09:33:09.140Z";
    const data = { date: new Date(dateString) };
    const state = new State<typeof data>(data);
    const result = state.set("date", new Date(dateString));
    expect(result).toEqual(false);
    expect(state.hasChanges()).toEqual(false);
  });
});
