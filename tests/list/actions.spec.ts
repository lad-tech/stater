import { State, StateList } from "../../src";

describe("StateList.actions()", () => {
  it('Передан actions("update"). "create" не передается', () => {
    const data = { name: "Евгений" };
    const state1 = new State<typeof data>(data);
    const state2 = new State<typeof data>(data);
    const list = new StateList([state1, state2])
      .source("any_source")
      .asNew()
      .actions("update");
    const changes = list.getChanges();
    expect(changes).toEqual([]);
  });

  it('Передан actions("update"). Сохраняется и для новых элементов', () => {
    const data = { name: "Евгений" };
    const state1 = new State<typeof data>(data);
    const state2 = new State<typeof data>(data);
    const list = new StateList([state1])
      .source("any_source")
      .asNew()
      .actions("update");
    list.add(state2.asNew());
    const changes = list.getChanges();
    expect(changes).toEqual([]);
  });
});
