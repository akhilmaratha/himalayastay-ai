"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="text-primary dark:text-inverse-primary p-xs hover:bg-surface-container rounded-full transition-colors flex items-center justify-center w-10 h-10">
        <span className="material-symbols-outlined">light_mode</span>
      </button>
    );
  }

  const currentTheme = resolvedTheme || theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="text-primary dark:text-inverse-primary p-xs hover:bg-surface-container rounded-full transition-colors flex items-center justify-center w-10 h-10"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined">
        {currentTheme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
