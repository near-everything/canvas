const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const INTEGER_ZERO = "a0";
const SMALLEST_INTEGER = "A00000000000000000000000000";
function getIntegerLength(head) {
  if (head >= "a" && head <= "z") {
    return head.charCodeAt(0) - "a".charCodeAt(0) + 2;
  } else if (head >= "A" && head <= "Z") {
    return "Z".charCodeAt(0) - head.charCodeAt(0) + 2;
  } else {
    throw new Error("Invalid index key head: " + head);
  }
}
function validateInteger(int) {
  if (int.length !== getIntegerLength(int.charAt(0))) {
    throw new Error("invalid integer part of index key: " + int);
  }
}
function isNotUndefined(n) {
  if (n === void 0)
    throw Error("n is undefined");
}
function incrementInteger(x) {
  validateInteger(x);
  const [head, ...digs] = x.split("");
  let carry = true;
  for (let i = digs.length - 1; carry && i >= 0; i--) {
    const d = DIGITS.indexOf(digs[i]) + 1;
    if (d === DIGITS.length) {
      digs[i] = "0";
    } else {
      digs[i] = DIGITS.charAt(d);
      carry = false;
    }
  }
  if (carry) {
    if (head === "Z")
      return "a0";
    if (head === "z")
      return void 0;
    const h = String.fromCharCode(head.charCodeAt(0) + 1);
    if (h > "a") {
      digs.push("0");
    } else {
      digs.pop();
    }
    return h + digs.join("");
  } else {
    return head + digs.join("");
  }
}
function decrementInteger(x) {
  validateInteger(x);
  const [head, ...digs] = x.split("");
  let borrow = true;
  for (let i = digs.length - 1; borrow && i >= 0; i--) {
    const d = DIGITS.indexOf(digs[i]) - 1;
    if (d === -1) {
      digs[i] = DIGITS.slice(-1);
    } else {
      digs[i] = DIGITS.charAt(d);
      borrow = false;
    }
  }
  if (borrow) {
    if (head === "a")
      return "Z" + DIGITS.slice(-1);
    if (head === "A")
      return void 0;
    const h = String.fromCharCode(head.charCodeAt(0) - 1);
    if (h < "Z") {
      digs.push(DIGITS.slice(-1));
    } else {
      digs.pop();
    }
    return h + digs.join("");
  } else {
    return head + digs.join("");
  }
}
function midpoint(a, b) {
  if (b !== void 0 && a >= b) {
    throw new Error(a + " >= " + b);
  }
  if (a.slice(-1) === "0" || b && b.slice(-1) === "0") {
    throw new Error("trailing zero");
  }
  if (b) {
    let n = 0;
    while ((a.charAt(n) || "0") === b.charAt(n)) {
      n++;
    }
    if (n > 0) {
      return b.slice(0, n) + midpoint(a.slice(n), b.slice(n));
    }
  }
  const digitA = a ? DIGITS.indexOf(a.charAt(0)) : 0;
  const digitB = b !== void 0 ? DIGITS.indexOf(b.charAt(0)) : DIGITS.length;
  if (digitB - digitA > 1) {
    const midDigit = Math.round(0.5 * (digitA + digitB));
    return DIGITS.charAt(midDigit);
  } else {
    if (b && b.length > 1) {
      return b.slice(0, 1);
    } else {
      return DIGITS.charAt(digitA) + midpoint(a.slice(1), void 0);
    }
  }
}
function getIntegerPart(index) {
  const integerPartLength = getIntegerLength(index.charAt(0));
  if (integerPartLength > index.length) {
    throw new Error("invalid index: " + index);
  }
  return index.slice(0, integerPartLength);
}
function validateOrder(index) {
  if (index === SMALLEST_INTEGER) {
    throw new Error("invalid index: " + index);
  }
  const i = getIntegerPart(index);
  const f = index.slice(i.length);
  if (f.slice(-1) === "0") {
    throw new Error("invalid index: " + index);
  }
}
function generateKeyBetween(a, b) {
  if (a !== void 0)
    validateOrder(a);
  if (b !== void 0)
    validateOrder(b);
  if (a !== void 0 && b !== void 0 && a >= b) {
    throw new Error(a + " >= " + b);
  }
  if (a === void 0 && b === void 0) {
    return INTEGER_ZERO;
  }
  if (a === void 0) {
    if (b === void 0)
      throw Error("b is undefined");
    const ib2 = getIntegerPart(b);
    const fb2 = b.slice(ib2.length);
    if (ib2 === SMALLEST_INTEGER) {
      return ib2 + midpoint("", fb2);
    }
    if (ib2 < b) {
      return ib2;
    }
    const ibl = decrementInteger(ib2);
    isNotUndefined(ibl);
    return ibl;
  }
  if (b === void 0) {
    const ia2 = getIntegerPart(a);
    const fa2 = a.slice(ia2.length);
    const i2 = incrementInteger(ia2);
    return i2 === void 0 ? ia2 + midpoint(fa2, void 0) : i2;
  }
  const ia = getIntegerPart(a);
  const fa = a.slice(ia.length);
  const ib = getIntegerPart(b);
  const fb = b.slice(ib.length);
  if (ia === ib) {
    return ia + midpoint(fa, fb);
  }
  const i = incrementInteger(ia);
  isNotUndefined(i);
  return i < b ? i : ia + midpoint(fa, void 0);
}
function generateNKeysBetween(a, b, n) {
  if (n === 0)
    return [];
  if (n === 1)
    return [generateKeyBetween(a, b)];
  if (b === void 0) {
    let c2 = generateKeyBetween(a, b);
    const result = [c2];
    for (let i = 0; i < n - 1; i++) {
      c2 = generateKeyBetween(c2, b);
      result.push(c2);
    }
    return result;
  }
  if (a === void 0) {
    let c2 = generateKeyBetween(a, b);
    const result = [c2];
    for (let i = 0; i < n - 1; i++) {
      c2 = generateKeyBetween(a, c2);
      result.push(c2);
    }
    result.reverse();
    return result;
  }
  const mid = Math.floor(n / 2);
  const c = generateKeyBetween(a, b);
  return [...generateNKeysBetween(a, c, mid), c, ...generateNKeysBetween(c, b, n - mid - 1)];
}
function getCounter() {
  let index = "a0";
  return () => {
    index = generateKeyBetween(index, void 0);
    return index;
  };
}
function* iterableRange(n = 1) {
  let index = "a0";
  let i = 0;
  while (i < n) {
    i++;
    index = generateKeyBetween(index, void 0);
    yield index;
  }
}
export {
  decrementInteger,
  generateKeyBetween,
  generateNKeysBetween,
  getCounter,
  getIntegerLength,
  getIntegerPart,
  incrementInteger,
  isNotUndefined,
  iterableRange,
  midpoint,
  validateInteger,
  validateOrder
};
//# sourceMappingURL=dgreensp.mjs.map
