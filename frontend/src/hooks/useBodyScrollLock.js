import { useEffect } from "react";

let lockCount = 0;
let savedHtmlOverflow = "";
let savedBodyOverflow = "";
let savedBodyPaddingRight = "";
function lock() {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const body = document.body;
  if (lockCount === 0) {
    savedHtmlOverflow = html.style.overflow;
    savedBodyOverflow = body.style.overflow;
    savedBodyPaddingRight = body.style.paddingRight;

    const scrollbarGap = window.innerWidth - html.clientWidth;
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function unlock() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  const html = document.documentElement;
  const body = document.body;
  html.style.overflow = savedHtmlOverflow;
  body.style.overflow = savedBodyOverflow;
  body.style.paddingRight = savedBodyPaddingRight;
}

/**
 * Locks document scroll (html + body) while `active` is true.
 * Ref-counted so nested/overlapping modals do not unlock prematurely.
 */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lock();
    return () => {
      unlock();
    };
  }, [active]);
}
