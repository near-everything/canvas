"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var transactions_exports = {};
__export(transactions_exports, {
  advanceGlobalEpoch: () => advanceGlobalEpoch,
  atomDidChange: () => atomDidChange,
  currentTransaction: () => currentTransaction,
  globalEpoch: () => globalEpoch,
  transact: () => transact,
  transaction: () => transaction
});
module.exports = __toCommonJS(transactions_exports);
var import_constants = require("./constants");
let globalEpoch = import_constants.GLOBAL_START_EPOCH + 1;
let globalIsReacting = false;
function advanceGlobalEpoch() {
  globalEpoch++;
}
class Transaction {
  constructor(parent) {
    this.parent = parent;
  }
  initialAtomValues = /* @__PURE__ */ new Map();
  /**
   * Get whether this transaction is a root (no parents).
   *
   * @public
   */
  get isRoot() {
    return this.parent === null;
  }
  /**
   * Commit the transaction's changes.
   *
   * @public
   */
  commit() {
    if (this.isRoot) {
      const atoms = this.initialAtomValues;
      this.initialAtomValues = /* @__PURE__ */ new Map();
      flushChanges(atoms.keys());
    } else {
      this.initialAtomValues.forEach((value, atom) => {
        if (!this.parent.initialAtomValues.has(atom)) {
          this.parent.initialAtomValues.set(atom, value);
        }
      });
    }
  }
  /**
   * Abort the transaction.
   *
   * @public
   */
  abort() {
    globalEpoch++;
    this.initialAtomValues.forEach((value, atom) => {
      atom.set(value);
      atom.historyBuffer?.clear();
    });
    this.commit();
  }
}
function flushChanges(atoms) {
  if (globalIsReacting) {
    throw new Error("cannot change atoms during reaction cycle");
  }
  try {
    globalIsReacting = true;
    const reactors = /* @__PURE__ */ new Set();
    const traverse = (node) => {
      if (node.lastTraversedEpoch === globalEpoch) {
        return;
      }
      node.lastTraversedEpoch = globalEpoch;
      if ("maybeScheduleEffect" in node) {
        reactors.add(node);
      } else {
        ;
        node.children.visit(traverse);
      }
    };
    for (const atom of atoms) {
      atom.children.visit(traverse);
    }
    for (const r of reactors) {
      r.maybeScheduleEffect();
    }
  } finally {
    globalIsReacting = false;
  }
}
function atomDidChange(atom, previousValue) {
  if (!currentTransaction) {
    flushChanges([atom]);
  } else if (!currentTransaction.initialAtomValues.has(atom)) {
    currentTransaction.initialAtomValues.set(atom, previousValue);
  }
}
let currentTransaction = null;
function transaction(fn) {
  const txn = new Transaction(currentTransaction);
  currentTransaction = txn;
  try {
    let rollback = false;
    const result = fn(() => rollback = true);
    if (rollback) {
      txn.abort();
    } else {
      txn.commit();
    }
    return result;
  } catch (e) {
    txn.abort();
    throw e;
  } finally {
    currentTransaction = currentTransaction.parent;
  }
}
function transact(fn) {
  if (currentTransaction) {
    return fn();
  }
  return transaction(fn);
}
//# sourceMappingURL=transactions.js.map
