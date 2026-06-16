"use client"
import React from "react";

export default function OurStory() {
  return (
    <section className="py-xl bg-surface">
      <div className="max-w-container-max mx-auto px-md grid md:grid-cols-2 gap-xl items-center">
        <div className="order-2 md:order-1">
          <div className="relative rounded-xl overflow-hidden shadow-sm group perspective-card">
            <img
              className="w-full aspect-4/5 object-cover transform transition-transform duration-700 group-hover:scale-105"
              alt="Himalayan homestay family portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG36HSQrGNX1R5BWfJ1hdKrKxCazP1lZvnxl0q6wU4g8e5UfRSe5Zp-C4QuDWVEf6Zs6QarfLZNVafbNJS5wxkSLgc4OgSpNfiuxfpIutCzIa79kSsgN8-KaL6Gh06BdfuG0fxaRnuvjjzKYrOoWx4_ylqBIaqqmLNbfRGy_7euh-0O_GGxg9zvGa5wd2UOvY9ZYH0MOaJJ0nr3Wmyu1hbC8xCITKV2qgjKMkDdI8nJ7PwnY53hGwjnJbawAMm6Gi3j0WWyB7UW4NS"
            />
            <div className="absolute inset-0 border-16 border-white/10 pointer-events-none"></div>
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-md">
          <span className="text-secondary font-label-md uppercase tracking-widest">
            Our Heritage
          </span>
          <h2 className="font-display-md text-display-md text-primary">
            A bridge between worlds
          </h2>
          <div className="space-y-sm text-on-surface-variant font-body-lg">
            <p>
              Himalayan Stays began as a quiet conversation around a
              wood-burning stove in a remote village near Spiti. We saw a
              growing disconnect: global travelers were seeking meaning but
              finding generic resorts, while the most beautiful homes and
              richest stories remained hidden in high valleys.
            </p>
            <p>
              Our platform was born to bridge this gap, creating a portal
              where discerning travelers can discover the quiet luxury of a
              mountain morning and where rural families are empowered to share
              their heritage on their own terms.
            </p>
          </div>
          <div className="pt-md">
            <button className="flex items-center gap-xs font-label-md text-primary border-b border-primary pb-1 hover:gap-md transition-all">
              Read the full founder's letter{" "}
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
