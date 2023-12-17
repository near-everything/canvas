import { GLOBAL_START_EPOCH } from "./constants.mjs";
let globalEpoch = GLOBAL_START_EPOCH + 1;
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
export {
  advanceGlobalEpoch,
  atomDidChange,
  currentTransaction,
  globalEpoch,
  transact,
  transaction
};
//# sourceMappingURL=transactions.mjs.map
