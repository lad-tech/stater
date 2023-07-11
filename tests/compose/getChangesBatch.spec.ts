import { State, compose, StateList } from "../../src";

describe("StateCompose.getChangesBatch()", () => {
  it("Success", () => {
    const state = new State({}).source("any_source");
    const state2 = new State({}).source("any_source_2");
    const composable = compose(state, state2).asNew();

    const result = [];
    for (const batch of composable.getChangesBatch({ size: 1 })) {
      result.push(batch);
    }

    expect(result.length).toEqual(2);
    expect(result[0][0].source).toEqual("any_source");
    expect(result[1][0].source).toEqual("any_source_2");
  });

  it("StateCompose вложенный в StateCompose", () => {
    const state1 = new State({}).source("state1");
    const stateList1 = new StateList([{}]).source("stateList1");
    const state2 = new State({}).source("state2");
    const stateList2 = new StateList([{}]).source("stateList2");
    const stateCompose1 = compose(state1, stateList1).asNew();
    const stateCompose2 = compose(state2, stateList2).asNew();
    const composable = compose(stateCompose1, stateCompose2).asNew();

    const result = [];
    for (const batch of composable.getChangesBatch()) {
      result.push(batch);
    }

    expect(result[0].length).toEqual(4);
    expect(result[0]).toEqual([
      {
        action: "create",
        source: "state1",
        params: {},
        settings: {
          optimizeCreateDelete: true,
        },
      },
      {
        action: "create",
        source: "stateList1",
        params: {},
        settings: {
          optimizeCreateDelete: true,
        },
      },
      {
        action: "create",
        source: "state2",
        params: {},
        settings: {
          optimizeCreateDelete: true,
        },
      },
      {
        action: "create",
        source: "stateList2",
        params: {},
        settings: {
          optimizeCreateDelete: true,
        },
      },
    ]);
  });
});
