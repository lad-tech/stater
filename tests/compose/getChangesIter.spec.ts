import { State, compose, StateList } from "../../src";

describe("StateCompose#getChangesIter", () => {
  it("Success", () => {
    const state1 = State.from({ name: "Евгений" });
    const state2 = State.from({ name: "Татьяна" });
    const state3 = State.from({ name: "Владимир" }).source("any_source_2");
    const list = new StateList([state1, state2]).source("any_source");
    const composable = compose(list, state3);

    state1.set("name", "Евгений Онегин");
    state3.set("name", "Владимир Ленский");

    const result = [];
    for (const change of composable.getChangesIter()) {
      result.push(change);
    }

    expect(result.length).toEqual(2);
    //
    expect(result[0].source).toEqual("any_source");
    expect(result[0].action).toEqual("update");
    expect(result[0].params.name).toEqual("Евгений Онегин");
    //
    expect(result[1].source).toEqual("any_source_2");
    expect(result[1].action).toEqual("update");
    expect(result[1].params.name).toEqual("Владимир Ленский");
  });
});
