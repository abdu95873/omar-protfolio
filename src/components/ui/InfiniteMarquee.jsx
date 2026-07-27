import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useEffect,
  useState,
} from "react";

/**
 * CSS transform marquee — no scrollable overflow.
 * Pauses on hover (desktop) and while finger is pressing (touch).
 * Releases → animation runs again.
 */
const InfiniteMarquee = ({ children, duration = 45, className = "" }) => {
  const viewportRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const items = Children.toArray(children);
  const duplicate = items.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, { key: `${child.key ?? i}-dup` })
      : child
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const pause = () => setPaused(true);
    const resume = () => setPaused(false);

    const blockHorizontalWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    const onPointerDown = (e) => {
      if (e.pointerType === "touch" || e.pointerType === "pen") pause();
    };

    el.addEventListener("wheel", blockHorizontalWheel, { passive: false });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("touchcancel", resume, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", resume);
    el.addEventListener("pointercancel", resume);
    el.addEventListener("pointerleave", resume);

    return () => {
      el.removeEventListener("wheel", blockHorizontalWheel);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("touchcancel", resume);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", resume);
      el.removeEventListener("pointercancel", resume);
      el.removeEventListener("pointerleave", resume);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`marquee-viewport touch-pan-y select-none ${className}`}
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <div className="overflow-hidden w-full">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <div className="flex shrink-0 items-stretch">{items}</div>
          <div className="flex shrink-0 items-stretch" aria-hidden>
            {duplicate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
