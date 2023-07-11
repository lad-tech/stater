import { StateList } from "./list";
import { State } from "./state";
import {
  actionsAll,
  IStateCompose,
  TChange,
  TChangesBatchParams,
  TChangesParams,
  TSettings,
  TStateAny,
  TSubscribeSwitchParams,
} from "./types";

export const compose = (...states: TStateAny[]): StateCompose => {
  return new StateCompose(states);
};

class StateCompose implements IStateCompose {
  private states: TStateAny[];

  constructor(states: TStateAny[]) {
    this.states = states;
  }

  subscribeSwitch(params: TSubscribeSwitchParams): this {
    for (const state of this.states) {
      state.subscribeSwitch(params);
    }
    return this;
  }

  clearSubscribe(): this {
    for (const state of this.states) {
      state.clearSubscribe();
    }
    return this;
  }

  setSettings(settings: TSettings): this {
    for (const state of this.states) {
      state.setSettings(settings);
    }
    return this;
  }

  asNew(): this {
    for (const state of this.states) {
      state.asNew();
    }
    return this;
  }

  hasChanges(): boolean {
    for (const state of this.states) {
      if (state.hasChanges()) return true;
    }

    return false;
  }

  getChanges(params?: TChangesParams): TChange<any>[] {
    const changes: TChange<any>[] = [];

    for (const change of this.getChangesIter(params)) {
      changes.push(change);
    }

    return changes;
  }

  *getChangesIter(params?: TChangesParams): Iterable<TChange<any>> {
    const _params = {
      ...{ actions: actionsAll },
      ...(params ?? {}),
    };

    const hasInAction = (change: TChange<any>) =>
      _params.actions.includes(change.action);

    for (const state of this.states) {
      if (state instanceof State) {
        const change = state.getChange();
        if (change && hasInAction(change)) yield change;
      }
      if (state instanceof StateList) {
        for (const change of state.getChangesIter()) {
          if (change && hasInAction(change)) yield change;
        }
      }
      if (state instanceof StateCompose) {
        for (const change of state.getChangesIter()) {
          if (change && hasInAction(change)) yield change;
        }
      }
    }
  }

  *getChangesBatch(params?: TChangesBatchParams): Iterable<TChange<any>[]> {
    const _params = {
      ...{ size: 100 },
      ...(params ?? {}),
    };
    let i = 1;
    let batch: TChange<any>[] = [];
    for (const change of this.getChangesIter(_params)) {
      batch.push(change);
      if (i++ === _params.size) {
        i = 1;
        yield batch;
        batch = [];
      }
    }
    if (batch.length > 0) yield batch;
  }
}
