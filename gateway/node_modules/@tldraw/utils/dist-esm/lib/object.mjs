function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function getOwnProperty(obj, key) {
  if (!hasOwnProperty(obj, key)) {
    return void 0;
  }
  return obj[key];
}
function deepCopy(obj) {
  if (!obj)
    return obj;
  if (Array.isArray(obj)) {
    const arr = [];
    const length = obj.length;
    for (let i = 0; i < length; i++)
      arr.push(deepCopy(obj[i]));
    return arr;
  } else if (typeof obj === "object") {
    const keys = Object.keys(obj);
    const length = keys.length;
    const newObject = {};
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      newObject[key] = deepCopy(obj[key]);
    }
    return newObject;
  }
  return obj;
}
function objectMapKeys(object) {
  return Object.keys(object);
}
function objectMapValues(object) {
  return Object.values(object);
}
function objectMapEntries(object) {
  return Object.entries(object);
}
function objectMapFromEntries(entries) {
  return Object.fromEntries(entries);
}
function filterEntries(object, predicate) {
  const result = {};
  let didChange = false;
  for (const [key, value] of objectMapEntries(object)) {
    if (predicate(key, value)) {
      result[key] = value;
    } else {
      didChange = true;
    }
  }
  return didChange ? result : object;
}
function mapObjectMapValues(object, mapper) {
  const result = {};
  for (const [key, value] of objectMapEntries(object)) {
    const newValue = mapper(key, value);
    result[key] = newValue;
  }
  return result;
}
export {
  deepCopy,
  filterEntries,
  getOwnProperty,
  hasOwnProperty,
  mapObjectMapValues,
  objectMapEntries,
  objectMapFromEntries,
  objectMapKeys,
  objectMapValues
};
//# sourceMappingURL=object.mjs.map
