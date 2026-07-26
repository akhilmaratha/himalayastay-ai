"use client";
import React, { useState, useEffect } from 'react';

export default function GuestsPage() {
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedGuest(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to load bookings');
        const data = await res.json();
        
        // Extract unique guests from bookings
        const guestMap = {};
        data.forEach(booking => {
          const name = booking.user || 'Unknown Guest';
          if (!guestMap[name]) {
            guestMap[name] = {
              name,
              visits: 0,
              lastStay: booking.dates || 'N/A',
              bookings: [],
              avatar: \`https://ui-avatars.com/api/?name=\${encodeURIComponent(name)}&background=f0eded&color=173124\`
            };
          }
          guestMap[name].visits += 1;
          guestMap[name].bookings.push(booking);
          // Simple logic to keep the latest dates
          if (booking.dates) guestMap[name].lastStay = booking.dates; 
        });

        setGuests(Object.values(guestMap));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGuests();
  }, []);

  const openGuestModal = (guest) => {
    setSelectedGuest(guest);
  };

  const closeGuestModal = () => {
    setSelectedGuest(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: \`
        .ambient-shadow-1 {
            box-shadow: 0 4px 12px rgba(45, 71, 57, 0.02);
        }
        .ambient-shadow-2 {
            box-shadow: 0 8px 24px rgba(45, 71, 57, 0.05);
        }
        .table-row-hover {
            transition: background-color 0.2s ease-in-out;
        }
        .modal-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
      \`}} />
      <div className="max-w-container-max mx-auto px-xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-6">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary mb-2">Guest Ledger</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage relationships and anticipate the needs of those returning to the mountains.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border-b border-outline-variant focus:border-primary focus:ring-0 w-64 transition-colors font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70" placeholder="Search guests..." type="text" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors rounded">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>filter_list</span>
              <span className="font-label-md text-label-md">Filter</span>
            </button>
          </div>
        </div>

        {/* Bento Layout for Stats & Table */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Stats Column */}
          <div className="xl:col-span-3 space-y-6">
            {/* Stat Card 1 */}
            <div className="bg-surface-container-low rounded-xl p-6 ambient-shadow-1 border border-surface-variant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-md text-label-md text-on-surface-variant">Total Guests Hosted</h3>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>group</span>
              </div>
              <p className="font-display-md text-display-md text-primary">{guests.length}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
                Live Data
              </p>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-surface-container-low rounded-xl p-6 ambient-shadow-1 border border-surface-variant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-md text-label-md text-on-surface-variant">Returning Guests</h3>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>autorenew</span>
              </div>
              <p className="font-display-md text-display-md text-secondary">{guests.filter(g => g.visits > 1).length}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">More than 1 visit</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="xl:col-span-9 bg-surface rounded-xl ambient-shadow-1 border border-surface-variant overflow-hidden flex flex-col">
            <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Guest Directory</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-sm text-label-sm">Active</span>
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm text-label-sm cursor-pointer hover:bg-surface-variant transition-colors">Past</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
                <thead>
                  <tr className="bg-surface-container-low border-b border-surface-variant">
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Guest Name</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Total Visits</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Last Stay</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant bg-surface-container-lowest">
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-8">Loading guests...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="4" className="text-center py-8 text-error">{error}</td></tr>
                  ) : guests.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8">No guests found.</td></tr>
                  ) : (
                    guests.map((guest, idx) => (
                      <tr key={idx} className="table-row-hover hover:bg-surface-container cursor-pointer group" onClick={() => openGuestModal(guest)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
                              <img alt={guest.name} className="w-full h-full object-cover" src={guest.avatar} />
                            </div>
                            <div>
                              <p className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">{guest.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{guest.visits}</td>
                        <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{guest.lastStay}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-surface-variant bg-surface-container-lowest flex items-center justify-between mt-auto">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to {guests.length} of {guests.length} entries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Profile Modal / Slide-over */}
      {selectedGuest && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-on-background/30 backdrop-blur-sm transition-opacity" onClick={closeGuestModal}></div>
          
          {/* Slide-over panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl modal-fade-in flex flex-col border-l border-surface-variant overflow-hidden z-50">
            {/* Modal Header */}
            <div className="p-6 border-b border-surface-variant flex items-center justify-between bg-surface-container-low relative">
              <div className="absolute top-0 left-0 w-full h-32 bg-primary-container z-0"></div>
              <div className="relative z-10 flex flex-col mt-12 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-surface bg-surface mb-4 shadow-sm">
                    <img alt="Guest Avatar" className="w-full h-full object-cover" src={selectedGuest.avatar} />
                  </div>
                  <button className="bg-surface/50 hover:bg-surface rounded-full p-2 transition-colors text-on-surface backdrop-blur-md" onClick={closeGuestModal}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
                  </button>
                </div>
                <div>
                  <h2 className="font-display-md text-display-md text-on-surface leading-tight">{selectedGuest.name}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {selectedGuest.visits > 1 ? \`Returning Guest · \${selectedGuest.visits} Stays\` : 'Guest · 1 Stay'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Modal Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-surface custom-scrollbar">
              {/* Timeline / Booking History */}
              <section>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
                  Stay History
                </h3>
                <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-outline-variant">
                  {selectedGuest.bookings.map((booking, i) => (
                    <div key={booking._id || i} className="relative">
                      <div className="absolute left-[-30px] top-1 w-[10px] h-[10px] rounded-full bg-primary border-2 border-surface"></div>
                      <div className="bg-surface-container-low p-4 rounded-lg border border-surface-variant">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-label-md text-label-md text-on-surface font-bold">Room {booking.roomId}</h4>
                          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">{booking.dates}</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant text-sm">Status: {booking.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Bottom padding for scroll */}
              <div className="h-8"></div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-surface-variant bg-surface-container flex gap-3">
              <button className="flex-1 bg-surface-container-lowest border border-outline text-on-surface py-2 rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">
                Send Message
              </button>
              <button className="flex-1 bg-primary text-on-primary py-2 rounded font-label-md text-label-md hover:bg-primary-container transition-colors">
                New Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

