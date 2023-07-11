import { compose, State } from "../../src";

describe("Compose.clearSubscribe()", () => {
  it("Очистка всех подписок", () => {
    const data1 = { name: "User1" };
    const data2 = { name: "User2" };
    const state1 = new State<typeof data1>(data1).source("any_source");
    const state2 = new State<typeof data1>(data2).source("any_source_2");

    const composeState = compose(state1, state2);

    // Очищаем подписки
    composeState.clearSubscribe();

    // Проверяем что подписки очищены
    expect(state1.getSubscribe()).toEqual({
      create: [],
      update: {},
      delete: [],
    });
    // Проверяем что подписки очищены
    expect(state2.getSubscribe()).toEqual({
      create: [],
      update: {},
      delete: [],
    });
  });
});
