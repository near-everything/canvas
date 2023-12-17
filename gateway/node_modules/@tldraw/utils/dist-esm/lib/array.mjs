function rotateArray(arr, offset) {
  return arr.map((_, i) => arr[(i + offset) % arr.length]);
}
function dedupe(input, equals) {
  const result = [];
  mainLoop:
    for (const item of input) {
      for (const existing of result) {
        if (equals ? equals(item, existing) : item === existing) {
          continue mainLoop;
        }
      }
      result.push(item);
    }
  return result;
}
function compact(arr) {
  return arr.filter((i) => i !== void 0 && i !== null);
}
function last(arr) {
  return arr[arr.length - 1];
}
function minBy(arr, fn) {
  let min;
  let minVal = Infinity;
  for (const item of arr) {
    const val = fn(item);
    if (val < minVal) {
      min = item;
      minVal = val;
    }
  }
  return min;
}
function partition(arr, predicate) {
  const satisfies = [];
  const doesNotSatisfy = [];
  for (const item of arr) {
    if (predicate(item)) {
      satisfies.push(item);
    } else {
      doesNotSatisfy.push(item);
    }
  }
  return [satisfies, doesNotSatisfy];
}
export {
  compact,
  dedupe,
  last,
  minBy,
  partition,
  rotateArray
};
//# sourceMappingURL=array.mjs.map
