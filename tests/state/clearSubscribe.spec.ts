import { State } from "../../src";

describe("State.clearSubscribe()", () => {
  it("Очистка всех подписок", () => {
    const data = { name: "User", age: 90 };
    const state = new State<typeof data>(data);

    // Очищаем подписки
    state.clearSubscribe();

    // Проверяем что подписки очищены
    expect(state.getSubscribe()).toEqual({
      create: [],
      update: {},
      delete: [],
    });
  });
});
