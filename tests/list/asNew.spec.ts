import { StateList } from "../../src";

describe("StateList#asNew()", () => {
  it("Установить как состояние как новый", () => {
    const data1 = { name: "Евгений" };
    const data2 = { name: "Татьяна" };
    const list = new StateList<typeof data1>([data1, data2]);
    list.asNew();
    expect(list.getList().map((i) => i.isNew())).toEqual([true, true]);
    expect(list.isNew()).toEqual(true);
  });
});
