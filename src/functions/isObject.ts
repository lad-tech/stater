/** Является ли объектом или нет */
export const isObject = (value: any): boolean => {
  return !!value && value.constructor === Object;
};
