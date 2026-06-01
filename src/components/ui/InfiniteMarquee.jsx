import { Children, cloneElement, isValidElement, useRef, useEffect } from 'react';

/**
 * CSS transform marquee — no scrollable overflow (no horizontal scrollbar).
 */
const InfiniteMarquee = ({ children, duration = 45, className = '' }) => {
  const viewportRef = useRef(null);
  const items = Children.toArray(children);
  const duplicate = items.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, { key: `${child.key ?? i}-dup` })
      : child
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const blockHorizontalWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', blockHorizontalWheel, { passive: false });
    return () => el.removeEventListener('wheel', blockHorizontalWheel);
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`marquee-viewport ${className}`}
      style={{ overflowX: 'hidden', overflowY: 'hidden' }}
    >
      <div className="overflow-hidden w-full">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}s` }}
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
