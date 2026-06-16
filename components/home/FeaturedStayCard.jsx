"use client"

import Link from "next/link";

export default function FeaturedStayCard({
  type = "standard",
  image,
  title,
  location,
  price,
  rating,
  colSpanClass,
  description,
}) {
  if (type === "main" || type === "side") {
    return (
      <Link
        href="#"
        className={`${colSpanClass} group relative rounded-xl overflow-hidden bg-surface-container-low ambient-shadow-1 block`}
      >
        <img
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
          <span
            className="material-symbols-outlined text-secondary text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-sm text-label-sm font-bold">{rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 p-md w-full">
          <p className="text-white/80 font-label-md text-label-md uppercase tracking-wider mb-1 flex items-center gap-1">
            {type === "main" && (
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                location_on
              </span>
            )}
            {location}
          </p>
          <h3
            className={`font-display-md ${
              type === "main" ? "text-[28px]" : "text-[24px]"
            } leading-tight font-bold text-white mb-2`}
          >
            {title}
          </h3>
          <p className="text-white font-body-md">
            <span className="font-bold">₹{price}</span> / night
          </p>
        </div>
      </Link>
    );
  }

  // standard type
  return (
    <div
      className={`${colSpanClass} group bg-surface rounded-xl border border-surface-variant overflow-hidden ambient-shadow-1 flex flex-col hover:border-outline-variant transition-colors`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={image}
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-surface/50 hover:bg-surface backdrop-blur transition-colors text-on-surface">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>
      <div className="p-sm flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-label-md text-label-md text-on-background font-bold truncate">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-on-surface">
              <span
                className="material-symbols-outlined text-secondary text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-label-sm text-label-sm">{rating}</span>
            </div>
          </div>
          <p className="font-body-md text-[14px] text-on-surface-variant mb-2">
            {location}
          </p>
          {description && (
            <p className="font-body-md text-[14px] text-on-surface-variant line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-surface-variant flex justify-between items-center">
          <p className="font-body-md text-on-background">
            <span className="font-bold">₹{price}</span>{" "}
            <span className="text-on-surface-variant text-[14px]">/ night</span>
          </p>
        </div>
      </div>
    </div>
  );
}
