import { State } from "../../src";

describe("State#setOptions", () => {
  it("Установка произвольных параметров", () => {
    const data = { name: "Test" };
    const state = new State<typeof data>(data);
    state.setOptions({ hard: true });
    expect(state.getOptions()).toEqual({ hard: true });
  });
});
