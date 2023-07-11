import { State, StateList } from "../../src";

describe("List.clearSubscribe()", () => {
  it("Очистка всех подписок", () => {
    const data1 = { name: "User1" };
    const data2 = { name: "User2" };
    const state1 = new State<typeof data1>(data1);
    const state2 = new State<typeof data2>(data2);
    const list = new StateList<typeof data1>([state1, state2]);

    // Очищаем подписки
    list.clearSubscribe();

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
