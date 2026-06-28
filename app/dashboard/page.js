"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const upcomingBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending");
  const pastBookings = bookings.filter(b => b.status === "Completed");
  return (
    <main className="flex-1 w-full flex flex-col p-sm md:p-xl gap-xl pb-24 md:pb-xl">
      <header className="flex flex-col gap-xs">
        <h1 className="font-display-lg text-display-lg text-primary hidden md:block">My Bookings</h1>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary md:hidden">My Bookings</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your upcoming retreats and view past adventures in the Himalayas.</p>
      </header>

      {/* Upcoming Trips */}
      <section className="flex flex-col gap-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface hidden md:block">Upcoming Trips</h2>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:hidden">Upcoming Trips</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {loading ? (
            <div className="lg:col-span-2 py-12 text-center text-on-surface-variant font-body-md bg-surface rounded-xl border border-surface-container-highest">
              <span className="material-symbols-outlined animate-spin text-primary text-display-md mb-4 block">sync</span>
              Loading bookings...
            </div>
          ) : error ? (
            <div className="lg:col-span-2 py-12 text-center text-error font-body-md bg-surface rounded-xl border border-surface-container-highest">
              <span className="material-symbols-outlined text-display-md mb-4 block">error</span>
              {error}
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="lg:col-span-2 py-12 text-center text-on-surface-variant font-body-md bg-surface rounded-xl border border-surface-container-highest">
              No upcoming trips.
            </div>
          ) : (
            upcomingBookings.map((booking, idx) => (
              <article key={booking.id || idx} className="bg-surface rounded-xl ambient-shadow-1 border border-surface-container-highest overflow-hidden flex flex-col sm:flex-row group transition-all duration-300 hover:ambient-shadow-2">
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <div className="absolute top-sm left-sm bg-surface/90 backdrop-blur-sm px-xs py-base rounded-md flex items-center gap-base z-10">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="font-label-sm text-label-sm text-primary">{booking.status || "Confirmed"}</span>
                  </div>
                  <img 
                    alt="Property image" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAadiU-uFgEKdFqtPtR59tbjmzhBlp2rc7hV0JVgueD43yx_CNMMg3Vzb5S2JhE7Eg6vvBVaiuJNkA1JlAPDhQduW8viXkV65raTzZ9DH2M1hmSlWBGynPoafiirHg2GqwaQ4MgcsNvn2EBRC1wKOPgcIShhkulVwVg46mhRHOGeyEjGLEeFwmy5VDLDSm9rgOYuT_fM0n4vhfSvZsPAoNTEYS0g6IyLVSjgJVFEuGzEhF59EDtmV6x8KXTToGvwDi0Qe9omANu5641"
                  />
                </div>
                <div className="p-md flex flex-col justify-between sm:w-3/5 gap-sm">
                  <div>
                    <div className="flex justify-between items-start mb-xs">
                      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Room {booking.roomId}</h3>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-sm">Himalayas, India</p>
                    <div className="grid grid-cols-2 gap-sm mb-sm bg-surface-container-low p-sm rounded-lg">
                      <div className="col-span-2">
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Dates</p>
                        <p className="font-label-md text-label-md text-on-surface">{booking.dates || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-sm pt-sm border-t border-surface-container-highest">
                    <Link href={`/booking/${booking.roomId}`} className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-xs px-sm rounded-lg hover:bg-tertiary-container transition-colors duration-200 text-center">
                      View Details
                    </Link>
                    <button className="flex-1 border border-outline font-label-md text-label-md text-primary py-xs px-sm rounded-lg hover:bg-surface-container-low transition-colors duration-200 flex items-center justify-center gap-xs">
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                      Host
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Past Bookings */}
      <section className="flex flex-col gap-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface hidden md:block">Past Adventures</h2>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:hidden">Past Adventures</h2>
        <div className="bg-surface rounded-xl ambient-shadow-1 border border-surface-container-highest overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-on-surface-variant font-body-md">
              Loading past trips...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-error font-body-md">
              {error}
            </div>
          ) : pastBookings.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant font-body-md">
              No past trips.
            </div>
          ) : (
            <ul className="flex flex-col">
              {pastBookings.map((booking, idx) => (
                <li key={booking.id || idx} className="flex flex-col sm:flex-row items-start sm:items-center p-md border-b border-surface-container-highest last:border-b-0 hover:bg-surface-container-low transition-colors duration-200 gap-md">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img 
                      alt="Property image" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB1RwyrBG7hgb9Jtuj78TX86wsTZgcwPpX3an0FrKNk-SfMlJ9E3bL5lF3NvWZP-UiD6plIrJJYdF-MVoS7r8RNcbtr2SmD5ASgEUVy5Yt8BTYCs5xzth_JbULdJgOf6ZIs8djUHjxIIfQaEysyac_SMHqrLqojMUiga4ypaPTVnfMARqngBXp_FalCiyTu21M-JIpXa2LoRpjIn3JE06R4X5IQeYIFDDAan6-XtAx0Citva7--s9AZJsuuaZYu5Quf8scDHheZutA"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-label-md text-label-md text-primary">Room {booking.roomId}</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">Himalayas, India</p>
                    <p className="font-label-sm text-label-sm text-outline mt-xs">{booking.status} · {booking.dates}</p>
                  </div>
                  <div className="flex gap-sm w-full sm:w-auto mt-sm sm:mt-0">
                    <button className="flex-1 sm:flex-none border border-outline font-label-md text-label-md text-primary py-xs px-sm rounded-lg hover:bg-surface-container-high transition-colors duration-200">
                      Book Again
                    </button>
                    <button className="flex-1 sm:flex-none bg-surface-container-high font-label-md text-label-md text-primary py-xs px-sm rounded-lg hover:bg-surface-dim transition-colors duration-200 flex items-center justify-center gap-xs">
                      <span className="material-symbols-outlined text-[18px]">rate_review</span>
                      Review
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}