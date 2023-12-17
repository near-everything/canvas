import { startCapturingParents, stopCapturingParents } from "./capture.mjs";
import { GLOBAL_START_EPOCH } from "./constants.mjs";
import { attach, detach, haveParentsChanged } from "./helpers.mjs";
import { globalEpoch } from "./transactions.mjs";
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
  lastTraversedEpoch = GLOBAL_START_EPOCH;
  lastReactedEpoch = GLOBAL_START_EPOCH;
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
    if (this.lastReactedEpoch === globalEpoch)
      return;
    if (this.parents.length && !haveParentsChanged(this)) {
      this.lastReactedEpoch = globalEpoch;
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
      attach(this.parents[i], this);
    }
  }
  /**
   * Makes this scheduler stop 'actively listening' to its parents.
   * It will no longer be eligible to receive 'maybeScheduleEffect' calls until [[EffectScheduler.attach]] is called again.
   */
  detach() {
    this._isActivelyListening = false;
    for (let i = 0, n = this.parents.length; i < n; i++) {
      detach(this.parents[i], this);
    }
  }
  /**
   * Executes the effect immediately and returns the result.
   * @returns The result of the effect.
   */
  execute() {
    try {
      startCapturingParents(this);
      const result = this.runEffect(this.lastReactedEpoch);
      this.lastReactedEpoch = globalEpoch;
      return result;
    } finally {
      stopCapturingParents();
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
export {
  EffectScheduler,
  react,
  reactor
};
//# sourceMappingURL=EffectScheduler.mjs.map
