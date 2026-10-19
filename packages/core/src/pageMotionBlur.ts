/**
 * Set by the engine before page scripts run when it applies its own sub-frame motion blur, or
 * when the render must match a Studio preview that could not blur; the runtime's capture motion
 * blur then stays off, so a frame is never blurred twice and never blurred unseen.
 */
export const PAGE_MOTION_BLUR_OFF_GLOBAL = "__HF_PAGE_MOTION_BLUR_OFF__";

/**
 * Set by the host (Studio preview, renderer) when capture motion blur is on by default: a root
 * without `data-motion-blur` blurs, and `data-motion-blur="off"` opts it out.
 */
export const PAGE_MOTION_BLUR_DEFAULT_GLOBAL = "__HF_PAGE_MOTION_BLUR_DEFAULT__";

/** The canary that turns capture motion blur on by default. */
export const CAPTURE_MOTION_BLUR_CANARY = "capture-motion-blur";

/** Whether a browser can draw capture motion blur: Chrome's html-in-canvas, behind a flag. */
export function supportsCaptureMotionBlur(win: Window = window): boolean {
  const w = win as Window & {
    CanvasRenderingContext2D?: { prototype: object };
    HTMLCanvasElement?: { prototype: object };
  };
  const ctx = w.CanvasRenderingContext2D?.prototype;
  const canvas = w.HTMLCanvasElement?.prototype;
  return !!ctx && !!canvas && "drawElementImage" in ctx && "requestPaint" in canvas;
}
