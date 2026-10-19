import { CAPTURE_MOTION_BLUR_CANARY, PAGE_MOTION_BLUR_DEFAULT_GLOBAL } from "@hyperframes/core";
import { isCanaryEnabled } from "../telemetry/canary.js";

/**
 * The render's page motion blur. A Studio that could not preview it renders without it
 * (WYSIWYG); otherwise the canary decides whether roots that did not opt in blur by default.
 */
export function renderPageMotionBlur(previewMotionBlur?: boolean): "default" | "off" | undefined {
  if (previewMotionBlur === false) return "off";
  return isCanaryEnabled(CAPTURE_MOTION_BLUR_CANARY) ? "default" : undefined;
}

/** Prepended to the preview runtime: the same default the render gets. */
export function previewMotionBlurPrelude(): string {
  return isCanaryEnabled(CAPTURE_MOTION_BLUR_CANARY)
    ? `window[${JSON.stringify(PAGE_MOTION_BLUR_DEFAULT_GLOBAL)}]=true;\n`
    : "";
}
