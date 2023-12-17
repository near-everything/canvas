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
var SideEffectManager_exports = {};
__export(SideEffectManager_exports, {
  SideEffectManager: () => SideEffectManager
});
module.exports = __toCommonJS(SideEffectManager_exports);
class SideEffectManager {
  constructor(editor) {
    this.editor = editor;
    editor.store.onBeforeCreate = (record, source) => {
      const handlers = this._beforeCreateHandlers[record.typeName];
      if (handlers) {
        let r = record;
        for (const handler of handlers) {
          r = handler(r, source);
        }
        return r;
      }
      return record;
    };
    editor.store.onAfterCreate = (record, source) => {
      const handlers = this._afterCreateHandlers[record.typeName];
      if (handlers) {
        for (const handler of handlers) {
          handler(record, source);
        }
      }
    };
    editor.store.onBeforeChange = (prev, next, source) => {
      const handlers = this._beforeChangeHandlers[next.typeName];
      if (handlers) {
        let r = next;
        for (const handler of handlers) {
          r = handler(prev, r, source);
        }
        return r;
      }
      return next;
    };
    let updateDepth = 0;
    editor.store.onAfterChange = (prev, next, source) => {
      updateDepth++;
      if (updateDepth > 1e3) {
        console.error("[CleanupManager.onAfterChange] Maximum update depth exceeded, bailing out.");
      } else {
        const handlers = this._afterChangeHandlers[next.typeName];
        if (handlers) {
          for (const handler of handlers) {
            handler(prev, next, source);
          }
        }
      }
      updateDepth--;
    };
    editor.store.onBeforeDelete = (record, source) => {
      const handlers = this._beforeDeleteHandlers[record.typeName];
      if (handlers) {
        for (const handler of handlers) {
          if (handler(record, source) === false) {
            return false;
          }
        }
      }
    };
    editor.store.onAfterDelete = (record, source) => {
      const handlers = this._afterDeleteHandlers[record.typeName];
      if (handlers) {
        for (const handler of handlers) {
          handler(record, source);
        }
      }
    };
    editor.history.onBatchComplete = () => {
      this._batchCompleteHandlers.forEach((fn) => fn());
    };
  }
  _beforeCreateHandlers = {};
  _afterCreateHandlers = {};
  _beforeChangeHandlers = {};
  _afterChangeHandlers = {};
  _beforeDeleteHandlers = {};
  _afterDeleteHandlers = {};
  _batchCompleteHandlers = [];
  registerBeforeCreateHandler(typeName, handler) {
    const handlers = this._beforeCreateHandlers[typeName];
    if (!handlers)
      this._beforeCreateHandlers[typeName] = [];
    this._beforeCreateHandlers[typeName].push(handler);
    return () => remove(this._beforeCreateHandlers[typeName], handler);
  }
  registerAfterCreateHandler(typeName, handler) {
    const handlers = this._afterCreateHandlers[typeName];
    if (!handlers)
      this._afterCreateHandlers[typeName] = [];
    this._afterCreateHandlers[typeName].push(handler);
    return () => remove(this._afterCreateHandlers[typeName], handler);
  }
  registerBeforeChangeHandler(typeName, handler) {
    const handlers = this._beforeChangeHandlers[typeName];
    if (!handlers)
      this._beforeChangeHandlers[typeName] = [];
    this._beforeChangeHandlers[typeName].push(handler);
    return () => remove(this._beforeChangeHandlers[typeName], handler);
  }
  registerAfterChangeHandler(typeName, handler) {
    const handlers = this._afterChangeHandlers[typeName];
    if (!handlers)
      this._afterChangeHandlers[typeName] = [];
    this._afterChangeHandlers[typeName].push(handler);
    return () => remove(this._afterChangeHandlers[typeName], handler);
  }
  registerBeforeDeleteHandler(typeName, handler) {
    const handlers = this._beforeDeleteHandlers[typeName];
    if (!handlers)
      this._beforeDeleteHandlers[typeName] = [];
    this._beforeDeleteHandlers[typeName].push(handler);
    return () => remove(this._beforeDeleteHandlers[typeName], handler);
  }
  registerAfterDeleteHandler(typeName, handler) {
    const handlers = this._afterDeleteHandlers[typeName];
    if (!handlers)
      this._afterDeleteHandlers[typeName] = [];
    this._afterDeleteHandlers[typeName].push(handler);
    return () => remove(this._afterDeleteHandlers[typeName], handler);
  }
  /**
   * Register a handler to be called when a store completes a batch.
   *
   * @example
   * ```ts
   * let count = 0
   *
   * editor.cleanup.registerBatchCompleteHandler(() => count++)
   *
   * editor.selectAll()
   * expect(count).toBe(1)
   *
   * editor.batch(() => {
   *	editor.selectNone()
   * 	editor.selectAll()
   * })
   *
   * expect(count).toBe(2)
   * ```
   *
   * @param handler - The handler to call
   *
   * @public
   */
  registerBatchCompleteHandler(handler) {
    this._batchCompleteHandlers.push(handler);
    return () => remove(this._batchCompleteHandlers, handler);
  }
}
function remove(array, item) {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}
//# sourceMappingURL=SideEffectManager.js.map
