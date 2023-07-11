import { State, TSettings } from "../../src";

describe("State#setSettings", () => {
  it("Проверка значений по умолчанию", () => {
    const data = { name: "Test" };
    const state = new State<typeof data>(data);
    expect(state.getSettings()).toEqual({ optimizeCreateDelete: true });
  });

  it("Проверка установки", () => {
    const data = { name: "Test" };
    const state = new State<typeof data>(data);
    state.setSettings({ optimizeCreateDelete: false });
    expect(state.getSettings()).toEqual({ optimizeCreateDelete: false });
  });
});

describe("State#setSettings. optimizeCreateDelete", () => {
  it("optimizeCreateDelete = false. Если указано asNew() и после этого delete() то событие на delete будет срабатывать", () => {
    const data = { name: "Test" };
    const state = new State<typeof data>(data).source("source").asNew();
    const settings: TSettings = {
      optimizeCreateDelete: false,
    };
    state.delete();
    state.setSettings(settings);
    expect(state.getChange()).toEqual({
      action: "delete",
      source: "source",
      params: data,
      settings,
    });
  });
});
