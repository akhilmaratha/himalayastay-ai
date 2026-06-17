import React from "react";

export default function StayHeader() {
  return (
    <header className="mb-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-sm mb-xs">
        <div>
          <h1 className="font-display-lg text-display-lg md:text-[56px] text-primary mb-xs">
            Oak Ridge Homestay
          </h1>
          <div className="flex items-center gap-sm text-on-surface-variant font-body-md text-body-md">
            <div className="flex items-center gap-base">
              <span
                className="material-symbols-outlined text-secondary icon-fill text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-medium">4.96</span>
              <span>(128 reviews)</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <div className="flex items-center gap-base">
              <span className="material-symbols-outlined text-[18px]">
                location_on
              </span>
              <span>Mukteshwar, Uttarakhand, India</span>
            </div>
          </div>
        </div>
        <div className="flex gap-sm">
          <button className="flex items-center gap-base text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined text-[20px]">share</span>
            Share
          </button>
          <button className="flex items-center gap-base text-on-surface-variant hover:text-secondary transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined text-[20px]">
              favorite
            </span>
            Save
          </button>
        </div>
      </div>
    </header>
  );
}
