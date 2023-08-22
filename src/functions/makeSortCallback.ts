import { IState, TSortArg, TSortCallback } from "../types";

export const makeSortCallback = <Type>(
  arg: TSortArg<Type, keyof Type>
): TSortCallback<Type> => {
  if (typeof arg === "string") {
    return (a: IState<Type>, b: IState<Type>) => {
      if (a.get(arg) < b.get(arg)) {
        return -1;
      }
      if (a.get(arg) > b.get(arg)) {
        return 1;
      }
      return 0;
    };
  } else if (typeof arg === "function") {
    return arg;
  } else {
    throw new Error('Wrong arg type for sort');
  }
};
