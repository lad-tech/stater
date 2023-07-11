import { TSubscribeSwitchParams } from "../types";

type TSubscribeSwitchAvailable = {
  subscribeSwitch: (params: TSubscribeSwitchParams) => void;
};
type TSubscribeSwitchAvailableItem =
  | TSubscribeSwitchAvailable
  | TSubscribeSwitchAvailable[];

/** Управляет подпиской на изменения для всех переданных состояний */
export const subscribeSwitch = (
  states: TSubscribeSwitchAvailableItem | TSubscribeSwitchAvailableItem[],
  params: TSubscribeSwitchParams
) => {
  const statesArray = Array.isArray(states) ? states : [states];

  for (const state of statesArray) {
    if (Array.isArray(state)) {
      subscribeSwitch(state, params);
    } else {
      state.subscribeSwitch(params);
    }
  }
};
