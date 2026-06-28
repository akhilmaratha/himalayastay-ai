"use client"

import Link from "next/link";

export default function PropertyCard({ id, title, location, price, rating, image }) {
  return (
    <div className="group flex flex-col bg-surface rounded-xl overflow-hidden ambient-shadow-1 hover:ambient-shadow-2 transition-shadow duration-300 border border-[#E5E0DA]">
      <div className="relative h-64 overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={image}
        />
        {/* Favorite Fab */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-surface/90 backdrop-blur rounded-full flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface transition-colors">
          <span className="material-symbols-outlined text-lg">favorite</span>
        </button>
      </div>
      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-sm text-secondary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-md text-on-surface">{rating}</span>
          </div>
        </div>
        <p className="text-body-md text-on-surface-variant mb-4">{location}</p>
        <div className="mt-auto flex items-end justify-between border-t border-surface-variant pt-4">
          <div>
            <span className="font-label-md text-label-md text-primary">
              ₹{price}
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {" "}
              / night
            </span>
          </div>
          <Link
            href={`/booking/${id || 1}`}
            className="font-label-md text-label-md text-primary underline hover:text-secondary transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
