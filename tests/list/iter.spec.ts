import { IStateList, State, StateList } from "../../src";

describe("StateList#iter()", () => {
  it("Итерация по пустому массиву", () => {
    const list = new StateList();
    let i = 0;
    for (const item of list.iter()) i++;
    expect(i).toEqual(0);
  });

  it("Итерация по не пустому массиву", () => {
    const data1 = { name: "Eugen" },
      date2 = { name: "Tanya" };

    const list = new StateList([data1, date2]);
    let i = 0;
    for (const item of list.iter()) i++;
    expect(i).toEqual(2);
  });

  it("Итерация без пропуска уделенных элементов", () => {
    const data1 = { name: "Eugen" },
      date2 = State.from({ name: "Tanya" }).delete();

    const list = new StateList([data1, date2]);
    let i = 0;
    for (const item of list.iter({ deleted: true })) i++;
    expect(i).toEqual(2);
  });

  it("Итерация с пропуском уделенных элементов", () => {
    const data1 = { name: "Eugen" },
      date2 = State.from({ name: "Tanya" }).delete();

    const list = new StateList([data1, date2]);
    let i = 0;
    for (const item of list.iter()) i++;
    expect(i).toEqual(1);
  });

  it("Итерация по объекту", () => {
    const data1 = { name: "Eugen" },
      date2 = State.from({ name: "Tanya" }).delete();

    const list = new StateList([data1, date2]);
    let i = 0;
    for (const item of list) i++;
    expect(i).toEqual(1);
  });
});
