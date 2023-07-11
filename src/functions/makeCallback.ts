import { IState, TCallback, TCallbackBoolean } from "../types";

export const makeCallback = <Type>(
  params: TCallback<Type>
): TCallbackBoolean<Type> => {
  switch (typeof params) {
    case "function":
      return params;
    case "object":
      return (item: IState<Type>) =>
        Object.entries(params).every(
          ([key, value]) => item.get(key as any) === value
        );
  }
};
