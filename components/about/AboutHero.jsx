"use client"

import React from "react";

export default function AboutHero() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="Himalayan mountain peaks during sunrise"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4qH2BSigjSoi7c86lngJkZpOvguvQJKK8w9qBp227QuARbjHhRQLEiTjgQ6oT0wsdVRI3ig7BfEz8wHOoit-dNgI-w_5lfQ_qLCv8nLuMKKrStuv9xqRwGi0MWt85xTpL8FgLrNRLjPT1qqmaS7ibWJyqOttJ69hhXSipXbpl4e4r7-mJWksl51M9zvGKQ3yhE__65Ds_e2k48o1Rb0Dohcz5egnPjO_FdL-mr8kf6YBhPh2rGX5u9ihSv4OSIU-LktkPCnJr32TO"
        />
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="absolute inset-0 bg-warm-gradient"></div>
      </div>
      <div className="relative z-10 max-w-container-max mx-auto px-md text-center">
        <h1 className="font-display-lg text-display-lg md:text-[64px] mb-sm leading-tight text-white">
          Rooted in the Peaks, <br />
          Dedicated to the People.
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl mx-auto text-white">
          A movement to redefine mountain hospitality through authentic,
          community-led experiences.
        </p>
        <div className="mt-lg">
          <span
            className="material-symbols-outlined animate-bounce text-primary text-4xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            keyboard_double_arrow_down
          </span>
        </div>
      </div>
    </header>
  );
}
