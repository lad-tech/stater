import { State } from "../../src";

describe("State#mget()", () => {
  it("Нет изменений", () => {
    const data = { name: "Евгений", age: 18, gender: "муж" };
    const state = new State<typeof data>(data);
    const result = state.mget("name", "age");
    expect(result).toEqual({
      name: "Евгений",
      age: 18,
    });
  });
});
