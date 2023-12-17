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
var constants_exports = {};
__export(constants_exports, {
  ANIMATION_MEDIUM_MS: () => ANIMATION_MEDIUM_MS,
  ANIMATION_SHORT_MS: () => ANIMATION_SHORT_MS,
  CAMERA_MAX_RENDERING_INTERVAL: () => CAMERA_MAX_RENDERING_INTERVAL,
  CAMERA_MOVING_TIMEOUT: () => CAMERA_MOVING_TIMEOUT,
  CAMERA_SLIDE_FRICTION: () => CAMERA_SLIDE_FRICTION,
  COARSE_DRAG_DISTANCE: () => COARSE_DRAG_DISTANCE,
  COLLABORATOR_CHECK_INTERVAL: () => COLLABORATOR_CHECK_INTERVAL,
  COLLABORATOR_IDLE_TIMEOUT: () => COLLABORATOR_IDLE_TIMEOUT,
  COLLABORATOR_INACTIVE_TIMEOUT: () => COLLABORATOR_INACTIVE_TIMEOUT,
  DEFAULT_ANIMATION_OPTIONS: () => DEFAULT_ANIMATION_OPTIONS,
  DOUBLE_CLICK_DURATION: () => DOUBLE_CLICK_DURATION,
  DRAG_DISTANCE: () => DRAG_DISTANCE,
  FOLLOW_CHASE_PAN_SNAP: () => FOLLOW_CHASE_PAN_SNAP,
  FOLLOW_CHASE_PAN_UNSNAP: () => FOLLOW_CHASE_PAN_UNSNAP,
  FOLLOW_CHASE_PROPORTION: () => FOLLOW_CHASE_PROPORTION,
  FOLLOW_CHASE_ZOOM_SNAP: () => FOLLOW_CHASE_ZOOM_SNAP,
  FOLLOW_CHASE_ZOOM_UNSNAP: () => FOLLOW_CHASE_ZOOM_UNSNAP,
  GRID_STEPS: () => GRID_STEPS,
  HASH_PATTERN_ZOOM_NAMES: () => HASH_PATTERN_ZOOM_NAMES,
  HIT_TEST_MARGIN: () => HIT_TEST_MARGIN,
  INTERNAL_POINTER_IDS: () => INTERNAL_POINTER_IDS,
  MAX_PAGES: () => MAX_PAGES,
  MAX_SHAPES_PER_PAGE: () => MAX_SHAPES_PER_PAGE,
  MAX_ZOOM: () => MAX_ZOOM,
  MIN_ZOOM: () => MIN_ZOOM,
  MULTI_CLICK_DURATION: () => MULTI_CLICK_DURATION,
  SVG_PADDING: () => SVG_PADDING,
  ZOOMS: () => ZOOMS
});
module.exports = __toCommonJS(constants_exports);
var import_easings = require("./primitives/easings");
const MAX_SHAPES_PER_PAGE = 2e3;
const MAX_PAGES = 40;
const ANIMATION_SHORT_MS = 80;
const ANIMATION_MEDIUM_MS = 320;
const ZOOMS = [0.1, 0.25, 0.5, 1, 2, 4, 8];
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 8;
const FOLLOW_CHASE_PROPORTION = 0.5;
const FOLLOW_CHASE_PAN_SNAP = 0.1;
const FOLLOW_CHASE_PAN_UNSNAP = 0.2;
const FOLLOW_CHASE_ZOOM_SNAP = 5e-3;
const FOLLOW_CHASE_ZOOM_UNSNAP = 0.05;
const DOUBLE_CLICK_DURATION = 450;
const MULTI_CLICK_DURATION = 200;
const COARSE_DRAG_DISTANCE = 6;
const DRAG_DISTANCE = 4;
const SVG_PADDING = 32;
const HASH_PATTERN_ZOOM_NAMES = {};
for (let zoom = 1; zoom <= Math.ceil(MAX_ZOOM); zoom++) {
  HASH_PATTERN_ZOOM_NAMES[zoom + "_dark"] = `hash_pattern_zoom_${zoom}_dark`;
  HASH_PATTERN_ZOOM_NAMES[zoom + "_light"] = `hash_pattern_zoom_${zoom}_light`;
}
const DEFAULT_ANIMATION_OPTIONS = {
  duration: 0,
  easing: import_easings.EASINGS.easeInOutCubic
};
const CAMERA_SLIDE_FRICTION = 0.09;
const GRID_STEPS = [
  { min: -1, mid: 0.15, step: 64 },
  { min: 0.05, mid: 0.375, step: 16 },
  { min: 0.15, mid: 1, step: 4 },
  { min: 0.7, mid: 2.5, step: 1 }
];
const COLLABORATOR_INACTIVE_TIMEOUT = 6e4;
const COLLABORATOR_IDLE_TIMEOUT = 3e3;
const COLLABORATOR_CHECK_INTERVAL = 1200;
const INTERNAL_POINTER_IDS = {
  CAMERA_MOVE: -10
};
const CAMERA_MOVING_TIMEOUT = 64;
const CAMERA_MAX_RENDERING_INTERVAL = 620;
const HIT_TEST_MARGIN = 8;
//# sourceMappingURL=constants.js.map
