type TSubscribeClearAvailable = { subscribeClear: () => void };
type TSubscribeClearAvailableItem =
  | TSubscribeClearAvailable
  | TSubscribeClearAvailable[];

/** Отменяет подписку на все события для всех переданных состояний */
export const subscribeClear = (
  states: TSubscribeClearAvailableItem | TSubscribeClearAvailableItem[]
) => {
  const statesArray = Array.isArray(states) ? states : [states];

  for (const state of statesArray) {
    if (Array.isArray(state)) {
      subscribeClear(state);
    } else {
      state.subscribeClear();
    }
  }
};
