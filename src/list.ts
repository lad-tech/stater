import { makeCallback } from "./functions/makeCallback";
import { State } from "./state";
import {
  IState,
  IStateList,
  IStateListProto,
  TAction,
  TCallback,
  TChange,
  TChangeOptions,
  TMapCallback,
  TOnChangeField,
  TOnChangeProperties,
  TSettings,
  TSortArg,
  TStateListIterParams,
  TStateListOrRaw,
  TStateOrRaw,
  TSubscribe,
  TSubscribeSwitchParams,
} from "./types";
import { makeSortCallback } from "./functions/makeSortCallback";

export const stateList = <Type>(
  data: TStateListOrRaw<Type>
): IStateList<Type> => {
  return StateList.from(data);
};
// @ts-ignore
export const StateList: IStateListProto = class IStateListClass<Type>
  implements IStateList<Type>, Iterable<IState<Type>>
{
  private list: IState<Type>[] = [];
  private sourceName?: string;
  private new = false;
  private actionsAllow: TAction[] = ["create", "update", "delete"];
  private mixinObject: { [key: string]: any } = {};
  private fullList_?: IStateList<Type>;

  private subscribe: TSubscribe<Type> = {
    create: [],
    update: {},
    delete: [],
  };
  private subscribeSwitchValue: TSubscribeSwitchParams = true;
  private settings: TSettings | undefined;

  static from<Type>(data: TStateListOrRaw<Type>): IStateList<Type> {
    if (data instanceof StateList) return data;
    else return new StateList(data);
  }

  constructor(list: TStateOrRaw<Type>[] = []) {
    this.list = list.map((i) => State.from(i));
  }

  source(name: string): this {
    this.sourceName = name;
    for (const state of this.list) {
      state.source(this.sourceName);
    }
    return this;
  }

  actions(...actions: TAction[]): this {
    this.actionsAllow = actions;
    for (const state of this.list) {
      state.actions(...this.actionsAllow);
    }
    return this;
  }

  mixin(obj: { [key: string]: any }): this {
    this.mixinObject = obj;
    for (const state of this.list) {
      state.mixin(this.mixinObject);
    }
    return this;
  }

  getMixin(): any | undefined {
    return this.mixinObject;
  }

  add(data: TStateOrRaw<Type>, isNew = true): this {
    if (this.fullList_) this.fullList_.add(data, isNew);

    const state = State.from(data)
      .source(this.sourceName)
      .actions(...this.actionsAllow)
      .mixin(this.mixinObject)
      .setSubscribe(this.subscribe)
      .setSettings(this.settings)
      .subscribeSwitch(this.subscribeSwitchValue)
      .asNew(isNew);
    this.list.push(state);
    return this;
  }

  delete(options?: TChangeOptions): this {
    for (const state of this.list) {
      state.delete(options);
    }
    return this;
  }

  fullList(list: IStateList<Type>): this {
    this.fullList_ = list;
    const source = list.getSource();
    if (source) {
      this.source(source);
    }
    return this;
  }

  getSource(): string | undefined {
    return this.sourceName;
  }

  *iter(params: TStateListIterParams = {}) {
    const list = params.reverse ? [...this.list].reverse() : this.list;
    for (const state of list) {
      if (!state.isDeleted() || params.deleted) yield state;
    }
  }

  [Symbol.iterator](): Iterator<IState<Type>, any, undefined> {
    return this.iter();
  }

  asNew(isNew = true): this {
    this.new = isNew;
    for (const state of this.list) {
      state.asNew(isNew);
    }
    return this;
  }

  isNew(): boolean {
    return this.new;
  }

  hasChanges(): boolean {
    for (const state of this.list) {
      if (state.hasChanges()) return true;
    }
    return false;
  }

  getChanges(): TChange<Type>[] {
    const result: TChange<Type>[] = [];

    for (const change of this.getChangesIter()) {
      result.push(change);
    }

    return result;
  }

  *getChangesIter(): Iterable<TChange<Type>> {
    for (const state of this.list) {
      const change = state.getChange();
      if (state.hasChanges() && change) yield change;
    }
  }

  onChange(
    fields: TOnChangeField<Type>,
    params: TOnChangeProperties<Type>
  ): this {
    // Добавляем обработчики для всего списка
    const fieldsArray = Array.isArray(fields) ? fields : [fields];
    for (const field of fieldsArray) {
      this.subscribe.update[field] ??= [];
      this.subscribe.update[field].push(params);
    }

    // Обновляем обработчики уже имеющимся элементам
    for (const state of this.list) {
      state.onChange(fields, params);
    }

    return this;
  }

  onCreate(params: TOnChangeProperties<Type>): this {
    this.subscribe.create.push(params);
    // Обновляем обработчики уже имеющимся элементам
    for (const state of this.list) {
      state.onCreate(params);
    }
    return this;
  }

  onDelete(params: TOnChangeProperties<Type>): this {
    this.subscribe.delete.push(params);
    // Обновляем обработчики уже имеющимся элементам
    for (const state of this.list) {
      state.onDelete(params);
    }
    return this;
  }

  clearSubscribe(): this {
    this.subscribe = {
      create: [],
      update: {},
      delete: [],
    };
    for (const state of this.list) {
      state.clearSubscribe();
    }
    return this;
  }

  subscribeSwitch(params: TSubscribeSwitchParams): this {
    this.subscribeSwitchValue = params;
    for (const state of this.list) {
      state.subscribeSwitch(params);
    }
    return this;
  }

  setSettings(settings: TSettings): this {
    this.settings = settings;
    for (const state of this.list) {
      state.setSettings(settings);
    }
    return this;
  }

  getList(): IState<Type>[] {
    return this.list;
  }

  count(params?: Pick<TStateListIterParams, "deleted">): number {
    return this.list.reduce((acc, i) => {
      if (!i.isDeleted() || params?.deleted) acc += 1;
      return acc;
    }, 0);
  }

  filter(
    arg: TCallback<Type>,
    params: TStateListIterParams = {}
  ): IState<Type>[] {
    const callback = makeCallback(arg);
    const result: IState<Type>[] = [];
    for (const state of this.iter(params)) {
      if (callback(state)) result.push(state);
    }
    return result;
  }

  find(
    arg: TCallback<Type>,
    params: TStateListIterParams = {}
  ): IState<Type> | undefined {
    const callback = makeCallback(arg);
    for (const state of this.iter(params)) {
      if (callback(state)) return state;
    }
  }

  sort(arg: TSortArg<Type, keyof Type>): this {
    const callback = makeSortCallback(arg);
    this.list.sort(callback);
    return this;
  }

  subList(
    arg: TCallback<Type>,
    params: TStateListIterParams = {}
  ): IStateList<Type> {
    const callback = makeCallback(arg);
    const items = this.filter(callback, params);
    return new StateList(items).fullList(this);
  }

  map<R>(callback: TMapCallback<Type, R>, params?: TStateListIterParams): R[] {
    const result = [];
    const index = 0;
    for (const state of this.iter(params)) {
      result.push(callback(state, index, this));
    }
    return result;
  }
};
