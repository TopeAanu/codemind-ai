"use client";

import type React from "react";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    // Apply theme on initial load and when theme changes
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Store theme preference in localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply theme from localStorage on initial client-side render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && storedTheme !== theme) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(storedTheme);
    }
  }, []);

  return <>{children}</>;
}
