"use client";

import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
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

  return (
    <>
      {/* Metric Cards Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        {/* Total Bookings */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-primary-fixed text-on-primary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">book_online</span>
            </div>
            <div className="flex items-center text-primary gap-1">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span className="text-label-sm">+12.5%</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Total Bookings</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">182</h3>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-secondary-fixed text-on-secondary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div className="flex items-center text-secondary gap-1">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span className="text-label-sm">+8.2%</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Monthly Revenue</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">₹1,42,800</h3>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-surface-container-highest text-on-surface-variant rounded-lg">
              <span className="material-symbols-outlined">event_available</span>
            </div>
            <span className="text-label-sm text-on-surface-variant">Active</span>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Occupancy Rate</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">88%</h3>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">star</span>
            </div>
            <div className="flex items-center text-primary gap-1">
              <span className="text-label-sm">High Reliability</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Average Rating</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">4.9<span className="text-label-md font-normal text-on-surface-variant">/5</span></h3>
          </div>
        </div>
      </section>

      {/* Main Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">
        {/* Monthly Bookings Trend Chart Area */}
        <div className="lg:col-span-2 bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-lg">
            <h4 className="font-headline-lg text-headline-lg text-primary">Monthly Bookings Trend</h4>
            <div className="flex gap-xs">
              <button className="px-md py-xs text-label-sm rounded-full bg-surface-container-highest text-on-surface">Weekly</button>
              <button className="px-md py-xs text-label-sm rounded-full bg-primary text-on-primary">Monthly</button>
            </div>
          </div>
          {/* Mock Chart Container */}
          <div className="h-64 w-full relative flex items-end justify-between px-xs">
            <div className="absolute inset-0 border-b border-l border-outline-variant/30"></div>
            {/* Bar chart markers for visual flavor */}
            <div className="w-12 bg-primary/20 rounded-t-lg h-[40%] group relative cursor-pointer hover:bg-primary/40 transition-all">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">42</div>
            </div>
            <div className="w-12 bg-primary/20 rounded-t-lg h-[55%] group relative cursor-pointer hover:bg-primary/40 transition-all"></div>
            <div className="w-12 bg-primary/20 rounded-t-lg h-[45%] group relative cursor-pointer hover:bg-primary/40 transition-all"></div>
            <div className="w-12 bg-primary/20 rounded-t-lg h-[75%] group relative cursor-pointer hover:bg-primary/40 transition-all"></div>
            <div className="w-12 bg-primary text-primary-container rounded-t-lg h-[90%] group relative cursor-pointer transition-all">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded">Current: 88</div>
            </div>
            <div className="w-12 bg-primary/10 border-t-2 border-dashed border-primary/30 h-[80%]"></div>
          </div>
          <div className="flex justify-between mt-md text-label-sm text-on-surface-variant font-medium">
            <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct (Forecast)</span>
          </div>
        </div>

        {/* Occupancy by Room Type */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-lg rounded-xl shadow-sm">
          <h4 className="font-headline-lg text-headline-lg text-primary mb-lg">Occupancy by Room</h4>
          <div className="space-y-md">
            <div>
              <div className="flex justify-between text-label-md mb-xs">
                <span>Pine Cottages</span>
                <span className="text-primary font-bold">96%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[96%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-label-md mb-xs">
                <span>Cloud Deck Suites</span>
                <span className="text-primary font-bold">82%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[82%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-label-md mb-xs">
                <span>Terrace Tents</span>
                <span className="text-primary font-bold">64%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[64%]"></div>
              </div>
            </div>
            <div className="mt-lg p-md bg-secondary-fixed/30 rounded-xl">
              <div className="flex gap-sm items-start">
                <span className="material-symbols-outlined text-secondary">lightbulb</span>
                <p className="text-label-sm text-on-secondary-fixed-variant italic">Tip: Increase rates for Pine Cottages due to sustained high demand.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Bookings Table Section */}
      <section className="bg-surface/70 backdrop-blur-md border-x border-b border-outline-variant/50 rounded-xl shadow-sm overflow-hidden border-t-4 border-t-primary">
        <div className="p-lg flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <h4 className="font-headline-lg text-headline-lg text-primary">Recent Bookings</h4>
          <div className="flex gap-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="bg-surface-container rounded-full py-xs pl-xl pr-md border-none focus:ring-1 focus:ring-primary text-body-md w-64 focus:outline-none" 
                placeholder="Search guests..." 
                type="text" 
              />
            </div>
            <button className="flex items-center gap-xs px-md py-xs rounded-full border border-outline hover:bg-surface-container-high transition-colors text-label-md">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant">
                <th className="px-lg py-md font-label-md text-label-md">Guest</th>
                <th className="px-lg py-md font-label-md text-label-md">Check In - Out</th>
                <th className="px-lg py-md font-label-md text-label-md">Room Type</th>
                <th className="px-lg py-md font-label-md text-label-md">Total Amount</th>
                <th className="px-lg py-md font-label-md text-label-md">Status</th>
                <th className="px-lg py-md font-label-md text-label-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8">Loading bookings...</td></tr>
              ) : error ? (
                <tr><td colSpan="6" className="text-center py-8 text-error">{error}</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8">No recent bookings.</td></tr>
              ) : (
                bookings.map((booking, idx) => (
                  <tr key={booking.id || idx} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant font-bold">
                          {booking.user ? booking.user.charAt(0).toUpperCase() : 'G'}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{booking.user || "Guest"}</div>
                          <div className="text-label-sm text-on-surface-variant">2 Adults</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <div className="text-body-md">{booking.dates || "N/A"}</div>
                      <div className="text-label-sm text-on-surface-variant">3 Nights</div>
                    </td>
                    <td className="px-lg py-md">
                      <span className="px-md py-1 bg-surface-container-highest rounded-full text-label-sm">Room {booking.roomId}</span>
                    </td>
                    <td className="px-lg py-md font-bold text-primary">₹24,500</td>
                    <td className="px-lg py-md">
                      <span className="flex items-center gap-1 text-secondary font-bold text-label-sm">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span> {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-lg py-md text-right">
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">more_vert</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-md bg-surface-container-low text-center">
          <button className="text-primary font-bold text-label-md hover:underline underline-offset-4">View All Bookings</button>
        </div>
      </section>
    </>
  );
}
