import { makeCallback } from "../../src/functions/makeCallback";
import { State } from "../../src";

describe("makeCallback()", () => {
  it("callback возвращает без изменения", () => {
    const data = { name: "Bob", age: 16 };
    const state1 = State.from(data);
    const callback = (item: typeof state1) => item.get("name") === "Bob";
    expect(makeCallback(callback)).toEqual(callback);
  });

  it("callback из параметров", () => {
    const data = { name: "Bob", age: 16 };
    const state1 = State.from(data);
    const callback1 = makeCallback({ age: 16 });
    const callback2 = makeCallback({ age: 18 });
    expect(callback1(state1)).toEqual(true);
    expect(callback2(state1)).toEqual(false);
  });
});
