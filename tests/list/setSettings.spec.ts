import { State, StateList, TSettings } from "../../src";

describe("StateList#setSettings", () => {
  it("Проверка что значение передано", () => {
    const data = { name: "Евгений" };
    const data2 = { name: "Татьяна" };
    const state = new State<typeof data>(data);
    const state2 = new State<typeof data>(data2);
    const list = new StateList<typeof data>([state]);
    const settings: TSettings = { optimizeCreateDelete: false };
    list.add(state2);
    list.setSettings(settings);

    expect(state.getSettings()).toEqual(settings);
    expect(state2.getSettings()).toEqual(settings);
  });
});
