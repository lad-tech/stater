/** Объект состояние */
export interface IState<Type> {
  /** Устанавливает значение для указанного поля. Возвращает булево значение если состояние было изменено */
  set<F extends keyof Type, V extends Type[F]>(field: F, value: V): boolean;
  /** Возвращает значение по ключу */
  get<F extends keyof Type, V extends Type[F]>(field: F): V;
  /** Возвращает объект ключ значение из указанных ключей */
  mget<F extends keyof Type, V extends Type[F]>(
    ...fields: F[]
  ): { [key in F]: V };
  /** Устанавливает набор ключ/значение. Возвращает булево значение если состояние было изменено */
  mset<F extends keyof Type, V extends Type[F]>(data: any): boolean;
  /** Есть ли изменения */
  hasChanges<F extends keyof Type>(fields?: F[]): boolean;
  /** Возвращает изменение по сущности */
  getChange(): TChange<Type> | undefined;
  /** Подписка на создание */
  onCreate(params: TOnChangeProperties<Type>): this;
  /** Подписка на изменение свойства */
  onChange(
    fields: TOnChangeField<Type>,
    params: TOnChangeProperties<Type>
  ): this;
  /** Подписка на удаление */
  onDelete(params: TOnChangeProperties<Type>): this;
  /** Отключает/включает обработчики событий onCreate, onChange, onDelete */
  subscribeSwitch(params: TSubscribeSwitchParams): this;
  /** Возвращает состояние переключателя подписки */
  getSubscribeSwitch(): TSubscribeSwitchValue;
  /** Устанавливает все подписки */
  setSubscribe(subscribe: TSubscribe<Type>): this;
  /** Получение подписок */
  getSubscribe(): TSubscribe<Type>;
  /** Очищает все подписки */
  clearSubscribe(): this;
  /** Устанавливает состояние как созданное */
  asNew(isNew?: boolean): this;
  /** Возвращает состояние объекта новый или нет */
  isNew(): boolean;
  /** Устанавливает название для источника данных */
  source(name?: string): this;
  /** Возвращает установленный source */
  getSource(): string | undefined;
  /** Устанавливает этой сущности признак на удаление */
  delete(options?: TChangeOptions): this;
  /** Устанавливает произвольные параметры */
  setOptions(options: TChangeOptions): this;
  /** Возвращает произвольные параметры */
  getOptions(): TChangeOptions | undefined;
  /** Устанавливает настройки */
  setSettings(settings: TSettings | undefined): this;
  /** Возвращает настройки */
  getSettings(): TSettings;
  /** Снимает у сущности признак удаления*/
  undelete(): this;
  /** Возвращает результат удалена или нет */
  isDeleted(): boolean;
  /** Указывает типы событий, которые возвращает менеджер состояния */
  actions(...actions: TAction[]): this;
  /** Подмешивает объект ко всем изменениям */
  mixin(obj: { [key: string]: any }): this;
  /** Возвращает информацию сохраненную в mixin */
  getMixin(): any | undefined;
  /** Поиск разницы в объектах */
  diff(
    item: any,
    options?: { skipNew?: boolean; skipOld?: boolean; skip?: string[] }
  ): TDiffProperties;
}

export interface IStateProto {
  /** Создает StateList из переданных элементов */
  new <Type>(data: Type): IState<Type>;
  /** Создает состояние из переданных данных */
  from<Type>(data: TStateOrRaw<Type>): IState<Type>;
}

/** Список состояний */
export interface IStateList<Type> {
  /** Устанавливает название для источника данных */
  source(name: string): this;
  /** Возвращает установленный source */
  getSource(): string | undefined;
  /** Операция add будет вызвана и у указанного списка */
  fullList(list: IStateList<Type>): this;
  /** Добавляет новую позицию в список */
  add(data: TStateOrRaw<Type>, isNew?: boolean): this;
  /** Устанавливает состояние как созданное */
  asNew(isNew?: boolean): this;
  /** Возвращает состояние объекта новый или нет */
  isNew(): boolean;
  /** Итератор по коллекции, который пропускает удаленные позиции */
  iter(params?: TStateListIterParams): Generator<IState<Type>>;
  /** Итератор по объекту @see iter(params) */
  [Symbol.iterator](): Iterator<IState<Type>>;
  /** Возвращает список состояний */
  getList(): IState<Type>[];
  /** Возвращает количество элементов в коллекции, пропуская удаленные позиции */
  count(params?: Pick<TStateListIterParams, "deleted">): number;
  /** Есть ли изменения */
  hasChanges(): boolean;
  /** Возвращает изменения по списку сущностей */
  getChanges(): TChange<Type>[];
  /** Устанавливает настройки */
  setSettings(settings: TSettings): this;
  /** Итератор по изменениям */
  getChangesIter(): Iterable<TChange<Type>>;
  /** Подписка на создание */
  onCreate(params: TOnChangeProperties<Type>): this;
  /** Подписка на изменение свойства */
  onChange(
    fields: TOnChangeField<Type>,
    params: TOnChangeProperties<Type>
  ): this;
  /** Подписка на удаление */
  onDelete(params: TOnChangeProperties<Type>): this;
  /** Очищает подписки */
  clearSubscribe(): this;
  /** Отключает/включает обработчики событий onCreate, onChange, onDelete */
  subscribeSwitch(params: TSubscribeSwitchParams): this;
  /** Указывает типы событий, которые возвращает менеджер состояния */
  actions(...actions: TAction[]): this;
  /** Устанавливает всем элементам списка сущности признак на удаление */
  delete(options?: TChangeOptions): this;
  /** Подмешивает объект ко всем изменениям */
  mixin(obj: { [key: string]: any }): this;
  /** Возвращает информацию сохраненную в mixin */
  getMixin(): any | undefined;
  /** Поиск элемента */
  find(
    arg: TCallback<Type>,
    params?: TStateListIterParams
  ): IState<Type> | undefined;
  /** Фильтрация списка */
  filter(arg: TCallback<Type>, params?: TStateListIterParams): IState<Type>[];
  /** Возвращает подмножество связанное с основным */
  subList(
    arg: TCallback<Type>,
    params?: TStateListIterParams
  ): IStateList<Type>;
  /** Функция аналогичная map в Array */
  map<R>(callback: TMapCallback<Type, R>, params?: TStateListIterParams): R[];
}

export interface IStateListProto {
  new <Type>(list?: TStateOrRaw<Type>[] | IStateList<Type>): IStateList<Type>;
  from<Type>(data: TStateListOrRaw<Type>): IStateList<Type>;
}

/** Скомбинированное состояние */
export interface IStateCompose {
  /** Устанавливает состояние как созданное */
  asNew(): this;
  /** Есть ли изменения */
  hasChanges(): boolean;
  /** Список всех изменений */
  getChanges(params?: TChangesParams): TChange<any>[];
  /** Итератор по изменениям */
  getChangesIter(params?: TChangesParams): Iterable<TChange<any>>;
  /** Итератор по изменениям пакетно */
  getChangesBatch(params?: TChangesBatchParams): Iterable<TChange<any>[]>;
  /** Отключает/включает обработчики событий onCreate, onChange, onDelete */
  subscribeSwitch(params: TSubscribeSwitchParams): this;
  /** Очищает подписки */
  clearSubscribe(): this;
  /** Устанавливает настройки */
  setSettings(settings: TSettings): this;
}

/** Любой тип состояния */
export type TStateAny = IStateList<unknown> | IState<unknown> | IStateCompose;
export type TStateOrRaw<Type> = IState<Type> | Type;
export type TStateListOrRaw<Type> = Type[] | IState<Type>[] | IStateList<Type>;
export type TStateListIterParams = { deleted?: true; reverse?: boolean };
export type TCallback<Type> = TCallbackBoolean<Type> | Partial<Type>;
export type TCallbackBoolean<Type> = (arg: IState<Type>) => boolean;
export type TMapCallback<Type, R> = (
  item: IState<Type>,
  index?: number,
  array?: IStateList<Type>
) => R;

/** Изменение */
export type TChange<Type> = {
  /** Действие которое произошло с сущностью */
  action: TAction;
  /** Имя ресурса */
  source: string;
  /** Параметры сущности */
  params: Partial<Type>;
  /** Произвольные параметры, привязанные к ресурсу */
  options?: TChangeOptions;
  settings?: TChangeOptions;
};
/** Виды действий которые были произведены над состоянием */
export type TAction = "create" | "update" | "delete";
export const actionsAll: TAction[] = ["create", "update", "delete"];
export type TSubscribeSwitchValue = {
  create: boolean;
  update: boolean;
  delete: boolean;
};
export type TSubscribeSwitchParams = boolean | Partial<TSubscribeSwitchValue>;

export type TChangesBatchParams = { size?: number; actions?: TAction[] };
export type TChangesParams = { actions?: TAction[] };
export type TChangeOptions = { [key in string]: any };
export type TDeleteSoftOptions = { withUpdate?: boolean; upsert?: boolean };
export type TSettings = {
  /**
   * Оптимизация отменяет любое события если указано удаления и состояние новое (вызван asNew())
   * Т. е. не нужно ничего создавать и обновлять если объект еще и не был сохранен, а ему сейчас указали что он удален
   */
  optimizeCreateDelete: boolean;
};

export type ArrayProperties<T, I> = {
  [K in keyof T]: T[K] extends Array<I> ? K : never;
}[keyof T];
export type TDiffProperties = { [key: string]: { f: any; s: any } };
export type TDiffOptions = {
  /** Пропустить новые свойства */
  skipNew?: false;
  /** Пропустить старые свойства */
  skipOld?: false;
  /** Список свойств которые следует не учитывать */
  skip?: [];
};

export type TOnChangeField<Type> = (keyof Type)[] | keyof Type;
// TODO[lad]: Убрать any из TOnChangeCallback
export type TOnChangeCallback<Type> = (
  params: { initial: any; current: any },
  state: IState<Type>
) => void;
export type TOnChangeProperties<Type> = {
  do?: TOnChangeCallback<Type>;
  rollback?: TOnChangeCallback<Type>;
};
export type TOnChangeMap<Type> = {
  [key in keyof Type | any]: TOnChangeProperties<Type>[];
};
export type TSubscribe<Type> = {
  create: TOnChangeProperties<Type>[];
  update: TOnChangeMap<Type>;
  delete: TOnChangeProperties<Type>[];
};
