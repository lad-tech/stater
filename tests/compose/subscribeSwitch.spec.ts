import { compose, StateList, State } from "../../src";

describe("StateCompose.subscribeSwitch()", () => {
  it("Обработка событий отключается для текущих и новых элементов", () => {
    const data = { name: "Eugen" };
    const data2 = { name: "Andre" };
    const state = new State<typeof data>(data);
    const state2 = new State<typeof data2>(data2);
    const list = new StateList<typeof data>([state2]);
    const composeState = compose(state, list);
    let doCurrent = 0;
    state.onChange("name", { do: () => doCurrent++ });
    list.onChange("name", { do: () => doCurrent++ });

    // Отключаем. Нет вызова
    composeState.subscribeSwitch(false);
    state.set("name", "Eugen_2");
    state2.set("name", "Andre_2");
    expect(doCurrent).toEqual(0);

    // Включаем. Есть вызов
    composeState.subscribeSwitch(true);
    state.set("name", "Eugen_3");
    state2.set("name", "Andre_3");
    expect(doCurrent).toEqual(2);
  });

  it("Получение состояния переключателя подписок", () => {
    const data1 = { name: "User1" };
    const data2 = { name: "User2" };
    const state1 = new State<typeof data1>(data1);
    const state2 = new State<typeof data2>(data2);
    const list = new StateList<typeof data1>([state1, state2]);
    const composeState = compose(state1, list);

    composeState.asNew();
    composeState.subscribeSwitch({ create: false });
    expect(state1.getSubscribeSwitch()).toEqual({
      create: false,
      update: false,
      delete: true,
    });
    expect(state2.getSubscribeSwitch()).toEqual({
      create: false,
      update: false,
      delete: true,
    });
  });
});
