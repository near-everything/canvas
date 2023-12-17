function isChild(x) {
  return x && typeof x === "object" && "parents" in x;
}
function haveParentsChanged(child) {
  for (let i = 0, n = child.parents.length; i < n; i++) {
    child.parents[i].__unsafe__getWithoutCapture();
    if (child.parents[i].lastChangedEpoch !== child.parentEpochs[i]) {
      return true;
    }
  }
  return false;
}
const detach = (parent, child) => {
  if (!parent.children.remove(child)) {
    return;
  }
  if (parent.children.isEmpty && isChild(parent)) {
    for (let i = 0, n = parent.parents.length; i < n; i++) {
      detach(parent.parents[i], parent);
    }
  }
};
const attach = (parent, child) => {
  if (!parent.children.add(child)) {
    return;
  }
  if (isChild(parent)) {
    for (let i = 0, n = parent.parents.length; i < n; i++) {
      attach(parent.parents[i], parent);
    }
  }
};
function equals(a, b) {
  const shallowEquals = a === b || Object.is(a, b) || Boolean(a && b && typeof a.equals === "function" && a.equals(b));
  return shallowEquals;
}
const EMPTY_ARRAY = Object.freeze([]);
export {
  EMPTY_ARRAY,
  attach,
  detach,
  equals,
  haveParentsChanged
};
//# sourceMappingURL=helpers.mjs.map
