import { State } from "../../src";

describe("State#source", () => {
  it("Если не указали source, то выбрасывает ошибку для метода getChange()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data);
    const test = () => state.getChange();
    expect(state.getSource()).toBeUndefined();
    expect(test).toThrowError();
  });

  it("Если указали source, то не выбрасывает ошибку для метода getChange()", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data).source("any_source_name");
    state.set("name", "Jane");
    const test = () => state.getChange();
    expect(test).not.toThrowError();
    expect(state.getSource()).toEqual("any_source_name");
    expect(state.getChange()?.source).toEqual("any_source_name");
  });
});
