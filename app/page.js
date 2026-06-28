"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "../components/home/Hero";
import FeaturedStayCard from "../components/home/FeaturedStayCard";
import ExperienceSection from "../components/home/ExperienceSection";

export default function Home() {
  const [featuredStays, setFeaturedStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        
        const layoutConfigs = [
          { type: "main", colSpanClass: "md:col-span-8" },
          { type: "side", colSpanClass: "md:col-span-4" },
          { type: "standard", colSpanClass: "md:col-span-4" },
          { type: "standard", colSpanClass: "md:col-span-4" },
        ];
        
        const mappedStays = data.slice(0, 4).map((room, index) => ({
          ...room,
          type: layoutConfigs[index]?.type || "standard",
          colSpanClass: layoutConfigs[index]?.colSpanClass || "md:col-span-4",
        }));
        
        setFeaturedStays(mappedStays);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);
  return (
    <div className="w-full pb-xl">
      <Hero />

      {/* Featured Homestays (Bento Grid Style) */}
      <section className="max-w-container-max mx-auto px-sm md:px-md pt-xl md:pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-sm">
          <div>
            <h2 className="font-display-md text-display-md md:text-display-md font-bold text-on-background mb-2">
              Curated Retreats
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Handpicked stays for the discerning traveler seeking solitude.
            </p>
          </div>
          <Link
            href="/stays"
            className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-2 group"
          >
            View all properties
            <span
              className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-sm md:gap-md auto-rows-[300px] md:auto-rows-[400px]">
          {loading ? (
            <div className="md:col-span-12 py-12 text-center text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined animate-spin text-primary text-display-md mb-4 block">sync</span>
              Loading featured stays...
            </div>
          ) : error ? (
            <div className="md:col-span-12 py-12 text-center text-error font-body-md">
              <span className="material-symbols-outlined text-display-md mb-4 block">error</span>
              Error: {error}
            </div>
          ) : (
            featuredStays.map((stay, index) => (
              <FeaturedStayCard key={stay.id || index} {...stay} />
            ))
          )}

          {/* Call to action card (Spans 4 cols) */}
          <div className="md:col-span-4 bg-primary-container rounded-xl p-md flex flex-col justify-center items-center text-center ambient-shadow-2 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary rounded-full opacity-20 blur-2xl"></div>
            <span
              className="material-symbols-outlined text-inverse-primary text-[48px] mb-4 relative z-10"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              landscape
            </span>
            <h3 className="font-display-md text-[24px] font-bold text-on-primary mb-2 relative z-10">
              Can&apos;t decide?
            </h3>
            <p className="font-body-md text-on-primary/80 mb-6 relative z-10">
              Let our local experts design a bespoke itinerary for your
              Himalayan journey.
            </p>
            <button className="bg-surface text-primary-container font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-bright transition-colors w-full relative z-10">
              Get Recommendations
            </button>
          </div>
        </div>
      </section>

      <ExperienceSection />

      {/* Why Book Direct Section */}
      <section className="max-w-container-max mx-auto px-sm md:px-md mt-xl md:mt-32">
        <div className="bg-surface-container-low rounded-2xl p-lg md:p-xl flex flex-col md:flex-row items-center gap-xl ambient-shadow-1">
          <div className="md:w-1/2">
            <h2 className="font-display-md text-display-md font-bold text-on-background mb-4">
              The Direct Difference
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Booking directly through Himalayan Stays ensures more of your
              money goes directly to the local families hosting you, fostering
              sustainable tourism and genuine hospitality.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-on-primary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-background">
                    Fair Value for Hosts
                  </h4>
                  <p className="font-body-md text-on-surface-variant mt-1">
                    We take minimal commissions, ensuring hosts maintain their
                    traditional livelihoods.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-on-primary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-background">
                    Vetted Quality
                  </h4>
                  <p className="font-body-md text-on-surface-variant mt-1">
                    Every property is personally inspected to meet our standards
                    of quiet luxury and cleanliness.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-on-primary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    support_agent
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-background">
                    Local Support
                  </h4>
                  <p className="font-body-md text-on-surface-variant mt-1">
                    Our on-ground team is available 24/7 to assist you during
                    your remote mountain stay.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full relative">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative z-10 ambient-shadow-2">
              <img
                alt="Smiling local host"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ctot0Z1loExdjdQYbZVq9RQgjTt_48d6YGqpi6y4xHenSkPRG3QG6hUoaQUZkuMoi7Pxn0eVjpvjsTBzCLh1fxu5UWiGO2PVxLvRp54xACP2TYMeAVvpApA0o7NAKQmBx1GMHnAeUZNdSb2kaNpm-aqjyQ3nju8hLqhabiImIZex9E1IA38MCWNKJkfzD51SsbKaOpHD-M9Jy94rKR_dHGRXtU1Y9Mms50tLpy1XsYAiMxBhguEL3VJvwtKIZbF1QrM6Im0kprdL"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-fixed rounded-full z-0 opacity-50 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-fixed rounded-full z-0 opacity-50 blur-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}