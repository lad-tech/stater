import { State } from "../../src";

describe("State.actions()", () => {
  it('Передан actions("update"). "update" передается', () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.set("name", "Евгений Онегин");
    const changes = state.getChange();
    expect(changes).not.toBeUndefined();
    expect(changes?.action).toEqual("update");
    expect(changes?.source).toEqual("any_source");
    expect(changes?.params).toEqual({ name: "Евгений Онегин" });
  });

  it('Передан actions("update"). "create" не передается', () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.asNew();
    const changes = state.getChange();
    expect(changes).toBeUndefined();
  });

  it('Передан actions("update"). "delete" не передается', () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update");
    state.delete();
    const changes = state.getChange();
    expect(changes).toBeUndefined();
  });

  it('Передан actions("update", "delete"). "delete" передается', () => {
    const data = { name: "Евгений" };
    const state = new State<typeof data>(data)
      .source("any_source")
      .actions("update", "delete");
    state.delete();
    const changes = state.getChange();
    expect(changes).not.toBeUndefined();
    expect(changes?.action).toEqual("delete");
    expect(changes?.source).toEqual("any_source");
  });
});
