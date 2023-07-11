import { isObject } from "./isObject";

/** Глубокое сравнение объектов и массивов */
export const deepEqual = (first: any, second: any): boolean => {
  if (isObject(first) && isObject(second)) {
    const objKeys1 = Object.keys(first);
    const objKeys2 = Object.keys(second);

    if (objKeys1.length !== objKeys2.length) return false;

    for (const key of objKeys1) {
      if (!deepEqual(first[key], second[key])) return false;
    }
    return true;
  }
  if (Array.isArray(first) && Array.isArray(second)) {
    if (first.length !== second.length) return false;

    const fSorted = [...first].sort();
    const sSorted = [...second].sort();

    return fSorted.every((value, i) => {
      return deepEqual(value, sSorted[i]);
    });
  }
  if (first instanceof Date && second instanceof Date)
    return first.getTime() === second.getTime();
  return first === second;
};
