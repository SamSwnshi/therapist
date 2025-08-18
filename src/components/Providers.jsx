"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { SessionProvider as CustomSessionProvider } from "@/lib/contexts/session-context";

export default function Providers({ children }) {
  return (
    <NextAuthSessionProvider>
      <CustomSessionProvider>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </NextThemesProvider>
      </CustomSessionProvider>
    </NextAuthSessionProvider>
  );
}
