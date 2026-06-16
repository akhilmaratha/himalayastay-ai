"use client"

import React from "react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-xl relative overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0 opacity-10">
        <img
          className="w-full h-full object-cover"
          alt="Himalayan peaks at night"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZHQUvV-cKpKiI_a4U2tLCo-6HbjjSIpQR-jM848F3jrM2c9VyGlgj2h7Q9-G-JmEo-AHMQMPZHd7BPAJHMuXPDKDATK0oNobNOxMlaiDoTc5ojf9q7_Dc7vbJHLEHQFz6zE0NIkhgpKoTS1Q2r_dp0XNmzQ3XbKyDwje47NuUWAI_QXmzc_X3havhrvkaA3m0RSDi-liwpKIJldA89ucIi6ucySl1cNEgKaUHuDVWVxp2F5QeypUXzqICLpGp279q8n48Knw4e6M9"
        />
      </div>
      <div className="relative z-10 max-w-container-max mx-auto px-md text-center py-lg">
        <h2 className="font-display-md text-display-md mb-md">
          Join our journey to preserve mountain heritage.
        </h2>
        <p className="max-w-2xl mx-auto mb-xl opacity-90 font-body-lg">
          Every booking is a vote for sustainable rural development and cultural
          preservation.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-md">
          <Link
            href="/stays"
            className="bg-secondary-container text-on-secondary-container px-xl py-md rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300"
          >
            Explore Stays
          </Link>
          <Link
            href="#"
            className="border border-on-primary/30 px-xl py-md rounded-lg font-bold text-lg hover:bg-on-primary/10 transition-colors duration-300"
          >
            Our Impact Report
          </Link>
        </div>
      </div>
    </section>
  );
}
