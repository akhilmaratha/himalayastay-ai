"use client";

import React from "react";

export default function FilterSidebar() {
  return (
    <aside className="hidden md:block col-span-3">
      <div className="sticky top-[160px] bg-surface-container-low rounded-xl p-6 ambient-shadow-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Filters
          </h2>
          <button className="text-label-sm font-label-sm text-outline hover:text-primary underline">
            Clear all
          </button>
        </div>
        {/* Price Range */}
        <div className="mb-8 border-b border-surface-variant pb-6">
          <h3 className="font-label-md text-label-md text-on-surface mb-4">
            Price range
          </h3>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 bg-surface border border-outline-variant rounded p-2">
              <span className="text-label-sm text-outline block mb-1">
                Min price
              </span>
              <div className="flex items-center">
                <span className="text-on-surface-variant mr-1">₹</span>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-body-md text-on-surface"
                  type="number"
                  defaultValue="1500"
                />
              </div>
            </div>
            <span className="text-outline">-</span>
            <div className="flex-1 bg-surface border border-outline-variant rounded p-2">
              <span className="text-label-sm text-outline block mb-1">
                Max price
              </span>
              <div className="flex items-center">
                <span className="text-on-surface-variant mr-1">₹</span>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-body-md text-on-surface"
                  type="number"
                  defaultValue="10000"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Guests */}
        <div className="mb-8 border-b border-surface-variant pb-6">
          <h3 className="font-label-md text-label-md text-on-surface mb-4">
            Guests
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-body-md text-on-surface-variant">Adults</span>
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="w-4 text-center font-label-md">2</span>
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
        </div>
        {/* Amenities */}
        <div className="mb-8 border-b border-surface-variant pb-6">
          <h3 className="font-label-md text-label-md text-on-surface mb-4">
            Amenities
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  className="peer appearance-none w-5 h-5 border border-outline-variant rounded checked:bg-primary checked:border-primary transition-colors"
                  type="checkbox"
                />
                <span className="material-symbols-outlined absolute text-on-primary text-sm left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none">
                  check
                </span>
              </div>
              <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                WiFi
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  defaultChecked
                  className="peer appearance-none w-5 h-5 border border-outline-variant rounded checked:bg-primary checked:border-primary transition-colors"
                  type="checkbox"
                />
                <span className="material-symbols-outlined absolute text-on-primary text-sm left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none">
                  check
                </span>
              </div>
              <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                Breakfast Included
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  className="peer appearance-none w-5 h-5 border border-outline-variant rounded checked:bg-primary checked:border-primary transition-colors"
                  type="checkbox"
                />
                <span className="material-symbols-outlined absolute text-on-primary text-sm left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none">
                  check
                </span>
              </div>
              <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                Mountain View
              </span>
            </label>
          </div>
        </div>
        <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary-container transition-colors">
          Show 42 stays
        </button>
      </div>
    </aside>
  );
}
