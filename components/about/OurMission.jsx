"use client"

import React from "react";

export default function OurMission() {
  return (
    <section className="py-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-md">
        <div className="text-center mb-xl max-w-2xl mx-auto">
          <h2 className="font-display-md text-display-md text-primary mb-sm">
            Our Guided Principles
          </h2>
          <p className="font-body-md text-on-surface-variant">
            We operate with the understanding that we are temporary visitors,
            but our impact is permanent.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-md">
          {/* Sustainable Tourism */}
          <div className="bg-surface p-xl rounded-xl shadow-sm space-y-md border border-[#E5E0DA]">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-primary">
              Sustainable Tourism
            </h3>
            <p className="text-on-surface-variant">
              Protecting the fragile Himalayan ecosystem through waste-free
              practices and strict limit on occupancy levels to preserve the
              local habitat.
            </p>
          </div>
          {/* Direct Impact */}
          <div className="bg-surface p-xl rounded-xl shadow-sm space-y-md border border-[#E5E0DA]">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-primary">
              Direct Impact
            </h3>
            <p className="text-on-surface-variant">
              We ensure that 90% of all booking revenue stays directly with the
              local host families, bypassing intermediaries and fueling rural
              economies.
            </p>
          </div>
          {/* Authentic Discovery */}
          <div className="bg-surface p-xl rounded-xl shadow-sm space-y-md border border-[#E5E0DA]">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_stories
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-primary">
              Authentic Discovery
            </h3>
            <p className="text-on-surface-variant">
              Moving beyond generic sightseeing. Our stays prioritize cultural
              immersion, traditional cuisine, and ancestral storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
