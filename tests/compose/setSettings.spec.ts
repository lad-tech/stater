import { compose, StateList, State, TSettings } from "../../src";

describe("StateCompose#setSettings", () => {
  it("Проверка что значение передано", () => {
    const state1 = State.from({ name: "Евгений" });
    const state2 = State.from({ name: "Татьяна" });
    const state3 = State.from({ name: "Владимир" }).source("any_source_2");
    const list = new StateList([state1, state2]).source("any_source");
    const composable = compose(list, state3);
    const settings: TSettings = { optimizeCreateDelete: false };
    composable.setSettings(settings);

    expect(state1.getSettings()).toEqual(settings);
    expect(state2.getSettings()).toEqual(settings);
    expect(state3.getSettings()).toEqual(settings);
  });
});
