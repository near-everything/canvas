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
var EffectScheduler_exports = {};
__export(EffectScheduler_exports, {
  EffectScheduler: () => EffectScheduler,
  react: () => react,
  reactor: () => reactor
});
module.exports = __toCommonJS(EffectScheduler_exports);
var import_capture = require("./capture");
var import_constants = require("./constants");
var import_helpers = require("./helpers");
var import_transactions = require("./transactions");
class EffectScheduler {
  constructor(name, runEffect, options) {
    this.name = name;
    this.runEffect = runEffect;
    this._scheduleEffect = options?.scheduleEffect;
  }
  _isActivelyListening = false;
  /**
   * Whether this scheduler is attached and actively listening to its parents.
   * @public
   */
  get isActivelyListening() {
    return this._isActivelyListening;
  }
  /** @internal */
  lastTraversedEpoch = import_constants.GLOBAL_START_EPOCH;
  lastReactedEpoch = import_constants.GLOBAL_START_EPOCH;
  _scheduleCount = 0;
  /**
   * The number of times this effect has been scheduled.
   * @public
   */
  get scheduleCount() {
    return this._scheduleCount;
  }
  /** @internal */
  parentEpochs = [];
  /** @internal */
  parents = [];
  _scheduleEffect;
  /** @internal */
  maybeScheduleEffect() {
    if (!this._isActivelyListening)
      return;
    if (this.lastReactedEpoch === import_transactions.globalEpoch)
      return;
    if (this.parents.length && !(0, import_helpers.haveParentsChanged)(this)) {
      this.lastReactedEpoch = import_transactions.globalEpoch;
      return;
    }
    this.scheduleEffect();
  }
  /** @internal */
  scheduleEffect() {
    this._scheduleCount++;
    if (this._scheduleEffect) {
      this._scheduleEffect(this.maybeExecute);
    } else {
      this.execute();
    }
  }
  maybeExecute = () => {
    if (!this._isActivelyListening)
      return;
    this.execute();
  };
  /**
   * Makes this scheduler become 'actively listening' to its parents.
   * If it has been executed before it will immediately become eligible to receive 'maybeScheduleEffect' calls.
   * If it has not executed before it will need to be manually executed once to become eligible for scheduling, i.e. by calling [[EffectScheduler.execute]].
   * @public
   */
  attach() {
    this._isActivelyListening = true;
    for (let i = 0, n = this.parents.length; i < n; i++) {
      (0, import_helpers.attach)(this.parents[i], this);
    }
  }
  /**
   * Makes this scheduler stop 'actively listening' to its parents.
   * It will no longer be eligible to receive 'maybeScheduleEffect' calls until [[EffectScheduler.attach]] is called again.
   */
  detach() {
    this._isActivelyListening = false;
    for (let i = 0, n = this.parents.length; i < n; i++) {
      (0, import_helpers.detach)(this.parents[i], this);
    }
  }
  /**
   * Executes the effect immediately and returns the result.
   * @returns The result of the effect.
   */
  execute() {
    try {
      (0, import_capture.startCapturingParents)(this);
      const result = this.runEffect(this.lastReactedEpoch);
      this.lastReactedEpoch = import_transactions.globalEpoch;
      return result;
    } finally {
      (0, import_capture.stopCapturingParents)();
    }
  }
}
function react(name, fn, options) {
  const scheduler = new EffectScheduler(name, fn, options);
  scheduler.attach();
  scheduler.scheduleEffect();
  return () => {
    scheduler.detach();
  };
}
function reactor(name, fn, options) {
  const scheduler = new EffectScheduler(name, fn, options);
  return {
    scheduler,
    start: (options2) => {
      const force = options2?.force ?? false;
      scheduler.attach();
      if (force) {
        scheduler.scheduleEffect();
      } else {
        scheduler.maybeScheduleEffect();
      }
    },
    stop: () => {
      scheduler.detach();
    }
  };
}
//# sourceMappingURL=EffectScheduler.js.map
