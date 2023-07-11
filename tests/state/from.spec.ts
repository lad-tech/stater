import { State } from "../../src";

describe("State#from()", () => {
  it("Если передан State", () => {
    const data = { name: "Eugen" };
    const state = new State<typeof data>(data).source("any_source").asNew();
    const state2 = State.from(state);
    expect(state).toEqual(state2);
  });

  it("Если переданы сырые данные", () => {
    const data = { name: "Eugen" };
    const state = State.from(data);
    expect(state).not.toEqual(data);
    expect(typeof state).not.toEqual("State");
  });
});
