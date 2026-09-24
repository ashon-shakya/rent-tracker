"use client";

import { SessionProvider } from "next-auth/react";
import { NavigationLoaderProvider } from "./NavigationLoader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavigationLoaderProvider>{children}</NavigationLoaderProvider>
    </SessionProvider>
  );
}

