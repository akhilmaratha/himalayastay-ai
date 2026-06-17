import React from "react";

export default function BookingSummary() {
  return (
    <div className="lg:col-span-5">
      <div className="tonal-card rounded-xl p-md ambient-shadow-1 flex flex-col h-full sticky top-lg">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-md">
          Booking Summary
        </h2>
        {/* Room Card */}
        <div className="flex gap-sm mb-lg">
          <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container">
            <img
              alt="Room"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL9gjVzsLIiu7tZPCIZTtMkEIdga4O11Ph0x3fePZ3YTiiKKvnvoXg1aZQvRYfYom_w81jbL0ZowJKAG-Dr8pT8iTaVLrnfivdZ4dmKWRE3-yRyIMtACGcz9Y933HirZDXbKrN5MYg8tIC0qj6u2YI436pS_IMJ7ZicWt8WDaUK0lQOtxB3_xqFGSFHkZJ6RH0vBFUXCBbD2fSFroqsJ-jspN1fGLitgycujkXkVujRWQKAtpLRsENIZngT1lbdja4iaZ84dlKsfT_"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
              Valley View
            </span>
            <h3 className="font-body-lg text-body-lg font-semibold text-primary">
              The Pine Suite
            </h3>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontSize: "16px" }}
              >
                groups
              </span>
              <span className="font-label-sm text-label-sm">2 Guests</span>
            </div>
          </div>
        </div>
        <hr className="border-outline-variant mb-md opacity-50" />
        {/* Dates */}
        <div className="grid grid-cols-2 gap-sm mb-lg">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Check-in
            </span>
            <span className="font-body-md text-body-md text-on-surface block font-medium">
              Oct 12, 2024
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              From 2:00 PM
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Check-out
            </span>
            <span className="font-body-md text-body-md text-on-surface block font-medium">
              Oct 15, 2024
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Until 11:00 AM
            </span>
          </div>
        </div>
        {/* Price Breakdown */}
        <div className="bg-surface-container-low rounded-lg p-sm mb-lg flex flex-col gap-xs">
          <div className="flex justify-between items-center">
            <span className="font-body-md text-body-md text-on-surface-variant">
              $250 x 3 nights
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              $750
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body-md text-body-md text-on-surface-variant">
              Taxes &amp; Fees
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              $85
            </span>
          </div>
          <hr className="border-outline-variant my-xs opacity-50" />
          <div className="flex justify-between items-center">
            <span className="font-body-lg text-body-lg font-bold text-on-surface">
              Total
            </span>
            <span
              className="font-display-md text-display-md text-primary"
              style={{ fontSize: "28px", lineHeight: "36px" }}
            >
              $835
            </span>
          </div>
        </div>
        {/* Confirm Action */}
        <div className="mt-auto">
          <button className="w-full bg-primary-container text-on-primary py-sm px-md rounded-lg font-label-md text-label-md flex justify-center items-center gap-xs hover:bg-tertiary-container transition-colors duration-300 ambient-shadow-1">
            <span>Confirm Booking</span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              arrow_forward
            </span>
          </button>
          <p className="font-label-sm text-label-sm text-center text-on-surface-variant mt-sm">
            You won't be charged yet.
          </p>
        </div>
      </div>
    </div>
  );
}
