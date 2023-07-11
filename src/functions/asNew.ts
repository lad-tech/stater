type TAsNewAvailable = { asNew: (isNew?: boolean) => void };
type TAsNewAvailableItem = TAsNewAvailable | TAsNewAvailable[];

/** Отмечает новым переданные состояния */
export const asNew = (
  states: TAsNewAvailableItem | TAsNewAvailableItem[],
  isNew?: boolean
) => {
  const statesArray = Array.isArray(states) ? states : [states];

  for (const state of statesArray) {
    if (Array.isArray(state)) {
      asNew(state, isNew);
    } else {
      state.asNew(isNew);
    }
  }
};
