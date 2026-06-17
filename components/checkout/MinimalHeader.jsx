import React from "react";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";

export default function MinimalHeader() {
  return (
    <header className="w-full py-md px-md border-b border-surface-container-highest flex justify-between items-center max-w-container-max mx-auto">
      <Link href="/" className="flex items-center gap-xs hover:opacity-80 transition-opacity">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          landscape
        </span>
        <span
          className="font-display-md text-display-md text-primary"
          style={{ fontSize: "24px", lineHeight: "32px" }}
        >
          Himalayan Stays
        </span>
      </Link>
      <div className="flex items-center gap-sm">
        <ThemeToggle />
        <button className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
          <span className="font-label-md text-label-md hidden md:inline">
            Cancel
          </span>
        </button>
      </div>
    </header>
  );
}

