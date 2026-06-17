import React from "react";

export default function AmenitiesList() {
  return (
    <section className="border-b border-surface-container-high pb-lg">
      <h3 className="font-headline-lg text-headline-lg text-primary mb-md">
        What this place offers
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-sm gap-x-gutter">
        {/* Amenity Items */}
        <div className="flex items-center gap-sm text-on-surface font-body-md text-body-md">
          <span className="material-symbols-outlined text-[24px] text-primary">
            wifi
          </span>
          High-speed WiFi (100 Mbps)
        </div>
        <div className="flex items-center gap-sm text-on-surface font-body-md text-body-md">
          <span className="material-symbols-outlined text-[24px] text-primary">
            fireplace
          </span>
          Indoor fireplace
        </div>
        <div className="flex items-center gap-sm text-on-surface font-body-md text-body-md">
          <span className="material-symbols-outlined text-[24px] text-primary">
            restaurant
          </span>
          Farm-to-table meals
        </div>
        <div className="flex items-center gap-sm text-on-surface font-body-md text-body-md">
          <span className="material-symbols-outlined text-[24px] text-primary">
            deck
          </span>
          Private balcony with valley view
        </div>
        <div className="flex items-center gap-sm text-on-surface font-body-md text-body-md">
          <span className="material-symbols-outlined text-[24px] text-primary">
            local_parking
          </span>
          Free parking on premises
        </div>
        <div className="flex items-center gap-sm text-on-surface font-body-md text-body-md">
          <span className="material-symbols-outlined text-[24px] text-primary">
            pets
          </span>
          Pet friendly
        </div>
      </div>
      <button className="mt-md px-md py-xs border border-outline text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-colors">
        Show all 24 amenities
      </button>
    </section>
  );
}
