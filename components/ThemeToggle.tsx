"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={`${isDark ? "Light" : "Dark"} mode (D)`}
      className="flex items-center gap-2 font-mono text-[11px] text-cx-dim hover:text-cx-accent transition-colors border border-cx-border hover:border-cx-faint px-3 py-1.5 rounded-sm"
    >
      {isDark ? (
        <SunIcon className="size-3.5" weight="regular" />
      ) : (
        <MoonIcon className="size-3.5" weight="regular" />
      )}
      <span className="hidden sm:inline">{isDark ? "light" : "dark"}</span>
      <span className="hidden md:inline text-cx-faint border border-cx-border-strong px-1.5 py-0.5">
        D
      </span>
    </button>
  );
}
