"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
