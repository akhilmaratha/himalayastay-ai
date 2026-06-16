"use client"

import React from "react";

export default function CategoryFilter() {
  return (
    <div className="sticky top-20 z-40 border-b border-surface-variant bg-surface w-full">
      <div className="max-w-container-max mx-auto px-md py-4">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
          <button className="flex flex-col items-center gap-2 text-primary border-b-2 border-primary pb-2 min-w-max opacity-100">
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              landscape
            </span>
            <span className="font-label-sm text-label-sm">Hills</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary pb-2 min-w-max opacity-70 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-2xl">water</span>
            <span className="font-label-sm text-label-sm">Riverside</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary pb-2 min-w-max opacity-70 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-2xl">park</span>
            <span className="font-label-sm text-label-sm">Orchard</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary pb-2 min-w-max opacity-70 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-2xl">cabin</span>
            <span className="font-label-sm text-label-sm">Heritage</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary pb-2 min-w-max opacity-70 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-2xl">forest</span>
            <span className="font-label-sm text-label-sm">Forest Retreat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
