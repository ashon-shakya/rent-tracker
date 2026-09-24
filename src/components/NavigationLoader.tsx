"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface NavigationContextType {
  startLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
}

const NavigationContext = createContext<NavigationContextType>({
  startLoading: () => {},
  stopLoading: () => {},
  isLoading: false,
});

export const useNavigationLoader = () => useContext(NavigationContext);

function RouteChangeListener({ onRouteChanged }: { onRouteChanged: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChanged();
  }, [pathname, searchParams, onRouteChanged]);

  return null;
}

export function NavigationLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(15);
  };

  const stopLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 280);
  };

  // Simulate smooth progressive loading while active
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92; // Wait at 92% until route arrives
        const step = Math.max(1, Math.floor((94 - prev) * 0.22));
        return Math.min(prev + step, 92);
      });
    }, 180);

    // Safety timeout in case navigation is aborted
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  // Intercept internal link clicks to immediately trigger the animated loader
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, downloads, hash links, or modified clicks
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(href, window.location.href);

        if (targetUrl.origin !== currentUrl.origin) return;

        // Ignore same-page hash jump
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search &&
          targetUrl.hash !== currentUrl.hash
        ) {
          return;
        }

        // If navigating to a different pathname or search query, start the loader!
        if (
          targetUrl.pathname !== currentUrl.pathname ||
          targetUrl.search !== currentUrl.search
        ) {
          startLoading();
        }
      } catch {
        // Safe fallback for irregular URLs
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ startLoading, stopLoading, isLoading }}>
      <Suspense fallback={null}>
        <RouteChangeListener
          onRouteChanged={() => {
            if (isLoading) stopLoading();
          }}
        />
      </Suspense>

      {/* Top glowing laser progress bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[99999] pointer-events-none transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-400 transition-all duration-200 ease-out relative shadow-[0_0_12px_rgba(168,85,247,0.85)]"
          style={{ width: `${progress}%` }}
        >
          {/* Glowing head with trailing sparkle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_14px_4px_rgba(192,132,252,0.9)] animate-ping" />
        </div>
      </div>

      {/* Floating dynamic capsule badge when navigating */}
      <div
        className={`fixed top-4 right-4 z-[99999] pointer-events-none transition-all duration-300 transform ${
          isLoading
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-violet-100 shadow-lg shadow-violet-500/10 text-xs font-semibold text-slate-700">
          <Loader2 size={13} className="text-violet-600 animate-spin" />
          <span className="text-violet-900">Loading...</span>
        </div>
      </div>

      {children}
    </NavigationContext.Provider>
  );
}
