import React from "react";

export default function BookingWidget() {
  return (
    <div className="w-full lg:w-1/3 relative">
      <div className="sticky top-[104px] bg-surface rounded-2xl border border-surface-container-high shadow-ambient-md p-md">
        {/* Widget Header */}
        <div className="flex items-end justify-between mb-md">
          <div>
            <span className="font-display-md text-display-md text-primary">
              ₹7,200
            </span>
            <span className="text-on-surface-variant font-body-md text-body-md">
              {" "}
              / night
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-base text-on-surface">
              <span
                className="material-symbols-outlined text-[16px] text-secondary icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-label-md text-label-md">4.96</span>
            </div>
            <span className="text-on-surface-variant font-label-sm text-label-sm underline">
              128 reviews
            </span>
          </div>
        </div>
        {/* Form Inputs */}
        <div className="border border-outline-variant rounded-xl overflow-hidden mb-sm">
          <div className="flex border-b border-outline-variant">
            {/* Check-in */}
            <div className="w-1/2 p-xs hover:bg-surface-container-low transition-colors cursor-pointer border-r border-outline-variant relative group">
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1 transition-transform group-focus-within:-translate-y-1">
                Check-in
              </label>
              <div className="font-body-md text-body-md text-on-surface">
                12 Oct 2024
              </div>
            </div>
            {/* Check-out */}
            <div className="w-1/2 p-xs hover:bg-surface-container-low transition-colors cursor-pointer relative group">
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1 transition-transform group-focus-within:-translate-y-1">
                Check-out
              </label>
              <div className="font-body-md text-body-md text-on-surface">
                15 Oct 2024
              </div>
            </div>
          </div>
          {/* Guests */}
          <div className="p-xs hover:bg-surface-container-low transition-colors cursor-pointer flex justify-between items-center group">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1 transition-transform group-focus-within:-translate-y-1">
                Guests
              </label>
              <div className="font-body-md text-body-md text-on-surface">
                2 adults, 1 child
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
        {/* Selected Room summary */}
        <div className="bg-surface-container-low p-xs rounded-lg mb-md flex justify-between items-center">
          <span className="font-label-sm text-label-sm text-on-surface">
            Heritage Family Suite
          </span>
          <button className="text-secondary font-label-sm text-label-sm underline hover:text-secondary-container">
            Change
          </button>
        </div>
        {/* Action Button */}
        <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg hover:bg-primary-container transition-colors shadow-ambient-sm mb-md flex justify-center items-center gap-xs">
          Reserve Now
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>
        <p className="text-center font-label-sm text-label-sm text-on-surface-variant mb-md">
          You won't be charged yet
        </p>
        {/* Price Breakdown */}
        <div className="space-y-xs mb-md border-b border-surface-container-high pb-sm">
          <div className="flex justify-between font-body-md text-body-md text-on-surface">
            <span className="underline">₹7,200 x 3 nights</span>
            <span>₹21,600</span>
          </div>
          <div className="flex justify-between font-body-md text-body-md text-on-surface">
            <span className="underline">Cleaning fee</span>
            <span>₹1,500</span>
          </div>
          <div className="flex justify-between font-body-md text-body-md text-on-surface">
            <span className="underline">Taxes</span>
            <span>₹2,450</span>
          </div>
        </div>
        <div className="flex justify-between font-headline-lg-mobile text-headline-lg-mobile text-primary">
          <span>Total</span>
          <span>₹25,550</span>
        </div>
      </div>
    </div>
  );
}
