import { State, compose, StateList } from "../../src";

describe("StateCompose#getChanges()", () => {
  it("Выдаются только указанные actions", () => {
    const state1 = new State({}).source("state1");
    const stateList1 = new StateList([{}]).source("stateList1");
    const state2 = new State({ name: "olo" }).source("state2");
    const state3 = new State({ name: "olo" }).source("state3");
    const state4 = new State({ name: "olo" }).source("state4");
    const stateList2 = new StateList([{}]).source("stateList2");
    const stateCompose1 = compose(state1, stateList1);
    const stateCompose2 = compose(state2, state3, state4, stateList2);
    const composable = compose(stateCompose1, stateCompose2);

    state1.asNew();
    state2.asNew();
    state3.set("name", "asd");
    state4.delete();

    const createResult = composable.getChanges({ actions: ["create"] });
    expect(createResult.map((i) => i.action)).toEqual(["create", "create"]);
    expect(createResult.map((i) => i.source)).toEqual(["state1", "state2"]);

    const updateResult = composable.getChanges({ actions: ["update"] });
    expect(updateResult.map((i) => i.action)).toEqual(["update"]);
    expect(updateResult.map((i) => i.source)).toEqual(["state3"]);

    const deleteResult = composable.getChanges({ actions: ["delete"] });
    expect(deleteResult.map((i) => i.action)).toEqual(["delete"]);
    expect(deleteResult.map((i) => i.source)).toEqual(["state4"]);
  });
});
