"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const currentLocation = `${pathname}?${searchParams.toString()}`;
  const previousLocation = useRef(currentLocation);

  useEffect(() => {
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      setComplete(true);
      finishTimer = setTimeout(() => {
        setLoading(false);
        setComplete(false);
      }, 220);
    };

    const start = (event: MouseEvent) => {
      if (
        event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (
        link.target === "_blank" || link.hasAttribute("download") ||
        (link.origin === window.location.origin &&
          `${link.pathname}${link.search}${link.hash}` === `${window.location.pathname}${window.location.search}${window.location.hash}`)
      ) return;

      const destination = new URL(link.href);
      if (destination.origin !== window.location.origin) return;

      setLoading(true);
      setComplete(false);
      if (safetyTimer) clearTimeout(safetyTimer);
      safetyTimer = setTimeout(finish, 10_000);
    };

    document.addEventListener("click", start, true);
    const startOnHistoryNavigation = () => {
      setLoading(true);
      setComplete(false);
      if (safetyTimer) clearTimeout(safetyTimer);
      safetyTimer = setTimeout(finish, 10_000);
    };
    window.addEventListener("popstate", startOnHistoryNavigation);
    return () => {
      document.removeEventListener("click", start, true);
      window.removeEventListener("popstate", startOnHistoryNavigation);
      if (finishTimer) clearTimeout(finishTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (previousLocation.current === currentLocation) return;
    previousLocation.current = currentLocation;
    if (!loading) return;

    setComplete(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setComplete(false);
    }, 220);
    return () => clearTimeout(timer);
  }, [currentLocation, loading]);

  if (!loading) return null;
  return (
    <div className="navigation-progress" role="progressbar" aria-label="Loading page" aria-valuetext="Loading">
      <span className={complete ? "navigation-progress__bar navigation-progress__bar--complete" : "navigation-progress__bar"} />
    </div>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressTracker />
    </Suspense>
  );
}
