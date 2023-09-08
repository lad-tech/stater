import {
  IState,
  IStateProto,
  TAction,
  TChange,
  TChangeOptions,
  TDiffOptions,
  TDiffProperties,
  TOnChangeField,
  TOnChangeProperties,
  TStateOrRaw,
  TSubscribe,
  TSubscribeSwitchValue,
  TSubscribeSwitchParams,
  TSettings,
} from "./types";
import { deepEqual } from "./functions/deepEqual";

export const state = <Type>(data: TStateOrRaw<Type>): IState<Type> => {
  return State.from(data);
};

const SETTINGS: TSettings = {
  optimizeCreateDelete: true,
};

export const State: IStateProto = class StateClass<Type>
  implements IState<Type>
{
  private old: any = {};
  private sourceName: string | undefined;
  private options?: TChangeOptions;

  private new = false;
  private changed = false;
  private deleted = false;

  private actionsAllow: TAction[] = ["create", "update", "delete"];
  private mixinObject = {};
  private subscribe: TSubscribe<Type> = {
    create: [],
    update: {},
    delete: [],
  };
  private subscribeSwitchValue: TSubscribeSwitchValue = {
    create: true,
    update: true,
    delete: true,
  };
  private settings: TSettings | undefined;

  static from<Type>(data: TStateOrRaw<Type>): IState<Type> {
    return data instanceof State ? data : new State(data);
  }

  constructor(private data: Type) {}

  setSubscribe(subscribe: TSubscribe<Type>): this {
    this.subscribe = subscribe;
    return this;
  }

  clearSubscribe(): this {
    this.subscribe = {
      create: [],
      update: {},
      delete: [],
    };
    return this;
  }

  getSubscribe(): TSubscribe<Type> {
    return this.subscribe;
  }

  onCreate(params: TOnChangeProperties<Type>): this {
    this.subscribe.create.push(params);
    if (this.isNew()) this.handleCreate();
    return this;
  }

  onChange(
    fields: TOnChangeField<Type>,
    params: TOnChangeProperties<Type>
  ): this {
    const fieldsArray = Array.isArray(fields) ? fields : [fields];
    for (const field of fieldsArray) {
      this.subscribe.update[field] ??= [];
      this.subscribe.update[field].push(params);
    }
    return this;
  }

  onDelete(params: TOnChangeProperties<Type>): this {
    this.subscribe.delete.push(params);
    if (this.deleted) this.handleDelete();
    return this;
  }

  subscribeSwitch(params: TSubscribeSwitchParams): this {
    let value;
    if (typeof params === "boolean") {
      value = {
        create: params,
        update: params,
        delete: params,
      };
    } else {
      value = {
        ...this.subscribeSwitchValue,
        ...params,
      };
    }
    this.subscribeSwitchValue = value;
    return this;
  }

  getSubscribeSwitch(): TSubscribeSwitchValue {
    return this.subscribeSwitchValue;
  }

  diff(item: any, options: TDiffOptions): TDiffProperties {
    if (!!item && item.constructor !== Object)
      throw new Error("Сравниваемый элемент может быть только объектом");

    const { skipNew, skipOld, skip } = options;
    const keys = Object.keys({ ...this.data, ...item }).filter(
      (x) => !skip?.includes(x as never)
    );
    const data: TDiffProperties = {};

    for (const i in keys) {
      const fValue = this.data[keys[i] as keyof Type];
      const sValue = item[keys[i]];

      if (!deepEqual(fValue, sValue)) {
        data[keys[i]] = { f: fValue, s: sValue };
      }
    }

    if (skipOld && skipNew) {
      return Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => Boolean(value.s) && Boolean(value.f)
        )
      );
    }

    if (skipOld) {
      return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => Boolean(value.s))
      );
    }

    if (skipNew) {
      return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => Boolean(value.f))
      );
    }

    return data;
  }

  mixin(obj: { [key: string]: any }): this {
    this.mixinObject = obj;
    return this;
  }

  getMixin(): any | undefined {
    return this.mixinObject;
  }

  asNew(isNew = true): this {
    this.new = isNew;
    this.subscribeSwitchValue.update = !isNew;
    const rollback = !isNew;
    this.handleCreate(rollback);
    return this;
  }

  isNew(): boolean {
    return this.new;
  }

  source(name?: string): this {
    this.sourceName = name;
    return this;
  }

  actions(...actions: TAction[]): this {
    this.actionsAllow = actions;
    return this;
  }

  setOptions(options: TChangeOptions): this {
    this.options = options;
    return this;
  }

  getOptions(): TChangeOptions | undefined {
    return this.options;
  }

  setSettings(settings: TSettings): this {
    this.settings = settings;
    return this;
  }

  getSettings(): TSettings {
    return this.settings ?? SETTINGS;
  }

  getSource(): string | undefined {
    return this.sourceName;
  }

  delete(options?: TChangeOptions): this {
    options && this.setOptions(options);
    this.deleted = true;
    this.subscribeSwitchValue.update = false;
    this.handleDelete();
    return this;
  }

  undelete(): this {
    this.deleted = false;
    this.subscribeSwitchValue.update = true;
    this.handleDelete(true);
    return this;
  }

  isDeleted(): boolean {
    return this.deleted;
  }

  set<F extends keyof Type, V extends Type[F]>(field: F, value: V): boolean {
    let result = false;

    if (!deepEqual(this.data[field], value)) {
      let onRollback = false;
      let addedToOld = false;
      // Если еще нет изменений, то нужно сохранить старое значение
      if (this.old[field] === undefined) {
        this.old[field] = this.data[field];
        addedToOld = true;
      }
      // Если новое значение равно сохраненному старому, то нужно удалить старое значение
      if (deepEqual(this.old[field], value)) {
        delete this.old[field];
        onRollback = true;
      }

      this.data[field] = value;
      this.changed = addedToOld || Object.keys(this.old as any).length > 0;
      result = true;
      this.handleChange(field, onRollback);
    }

    return result;
  }

  get<F extends keyof Type, V extends Type[F]>(field: F): V {
    return this.data[field] as V;
  }

  mget<F extends keyof Type, V extends Type[F]>(
    ...fields: F[]
  ): { [key in F]: V } {
    //@ts-ignore
    const result: { [key in F]: V } = {};
    for (const field of fields) {
      result[field] = this.get(field);
    }
    return result;
  }

  mset<F extends keyof Type, V extends Type[F]>(data: any): boolean {
    let changed = false;
    for (const [field, value] of Object.entries<any>(data)) {
      if (value !== undefined && this.set(field as F, value)) changed = true;
    }
    return changed;
  }

  hasChanges<F extends keyof Type>(fields?: F[]): boolean {
    let changed = this.changed;
    for (const field of fields ?? []) {
      if (this.old[field] === undefined || this.data[field] === this.old[field])
        changed = false;
    }
    // Если нет ни одного признака по изменению, то нет изменения
    if (!this.new && !changed && !this.deleted) return false;
    // Если было указано, что:
    // - сущность удалена после того как было указано,
    // - что она новая,
    // - и в настройках указана оптимизация для этого
    // то события по изменению нет
    if (this.new && this.deleted && this.getSettings().optimizeCreateDelete)
      return false;

    return true;
  }

  getChange(): TChange<Type> | undefined {
    //  Если не вызвали метод source(name), то ошибка
    if (this.sourceName === undefined)
      throw new Error(
        "Необходимо вызвать метод source(name) перед вызовом метода getChange()"
      );
    if (!this.hasChanges()) return;

    let action: TAction = "update";
    if (this.new) action = "create";
    if (this.deleted) action = "delete";

    if (!this.actionsAllow.includes(action)) return undefined;

    let params = this.data;
    if (Object.keys(this.mixinObject).length)
      params = { ...params, ...this.mixinObject };

    const result: TChange<Type> = {
      action: action as TAction,
      source: this.sourceName,
      params,
      settings: this.getSettings(),
    };
    if (this.options !== undefined) result.options = this.options;
    return result;
  }

  private handleChange<F extends keyof Type>(field: F, rollback = false): void {
    if (!this.subscribeSwitchValue.update) return;
    const { initial, current } = this.getStateInitialCurrent();
    const action = rollback ? "rollback" : "do";
    for (const subscribe of this.subscribe.update[field] ?? []) {
      const callback = subscribe[action];
      if (callback !== undefined) callback({ initial, current }, this);
    }
  }

  private handleCreate<F extends keyof Type>(rollback = false): void {
    if (!this.subscribeSwitchValue.create) return;
    const { initial, current } = this.getStateInitialCurrent();
    const action = rollback ? "rollback" : "do";
    for (const subscribe of this.subscribe.create ?? []) {
      const callback = subscribe[action];
      if (callback !== undefined) callback({ initial, current }, this);
    }
  }

  private handleDelete<F extends keyof Type>(rollback = false): void {
    if (!this.subscribeSwitchValue.delete) return;
    const { initial, current } = this.getStateInitialCurrent();
    const action = rollback ? "rollback" : "do";
    for (const subscribe of this.subscribe.delete ?? []) {
      const callback = subscribe[action];
      if (callback !== undefined) callback({ initial, current }, this);
    }
  }

  private getStateInitialCurrent() {
    const initial = { ...this.data, ...this.old };
    const current = { ...this.data };
    return { initial, current };
  }
};
