"use client";
import React, { useState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function CalendarPage() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, bookingsRes] = await Promise.all([
          fetch('/api/rooms'),
          fetch('/api/bookings')
        ]);
        if (!roomsRes.ok) throw new Error("Failed to load rooms");
        if (!bookingsRes.ok) throw new Error("Failed to load bookings");
        
        const roomsData = await roomsRes.json();
        const bookingsData = await bookingsRes.json();
        
        setRooms(roomsData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Generate 15 days starting from today
  const today = new Date();
  const days = [];
  for (let i = 0; i < 15; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      dateObj: d,
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.toLocaleDateString('en-US', { day: '2-digit' }),
      active: i === 0,
    });
  }

  const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .calendar-scroll::-webkit-scrollbar {
            height: 8px;
            width: 8px;
        }
        .calendar-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .calendar-scroll::-webkit-scrollbar-thumb {
            background-color: var(--tw-colors-outline-variant, #c2c8c2);
            border-radius: 9999px;
        }
      `}} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-xl">
        <div>
          <h2 className="font-display-lg text-display-lg text-primary mb-2">Availability Calendar</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Manage bookings, block dates, and adjust pricing for your rooms.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-lg font-label-md text-label-md border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">block</span>
            Block Dates
          </button>
          <button className="px-4 py-2.5 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
            Change Price
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner className="text-primary w-8 h-8" /></div>
      ) : error ? (
        <div className="text-center py-12 text-error">{error}</div>
      ) : (
        <div className="bg-surface/70 backdrop-blur-md rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden flex flex-col">
          {/* Controls Row */}
          <div className="p-md border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md hover:bg-surface-container-high text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h3 className="font-headline-lg text-headline-lg text-primary min-w-[200px] text-center">{monthYear}</h3>
              <button className="p-2 rounded-md hover:bg-surface-container-high text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary-container"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm border border-outline-variant bg-surface"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Available</span>
              </div>
            </div>
          </div>

          {/* Grid Scroll Area */}
          <div className="overflow-x-auto calendar-scroll relative">
            <div className="min-w-[1200px]">
              {/* Timeline Header */}
              <div className="flex border-b border-outline-variant/30 bg-surface-container-low/50 sticky top-0 z-10">
                {/* Room Header Column */}
                <div className="w-64 shrink-0 p-4 border-r border-outline-variant/30 flex items-center bg-surface-container-low/90 backdrop-blur-sm sticky left-0 z-20 shadow-[2px_0_4px_rgba(0,0,0,0.02)]">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Room Type</span>
                </div>
                {/* Dates Row */}
                <div className="flex flex-1">
                  {days.map((item, i) => (
                    <div key={i} className={`flex-1 min-w-[60px] p-2 text-center ${i !== 14 ? 'border-r border-outline-variant/30' : ''} flex flex-col justify-center ${item.active ? 'bg-secondary-fixed/30' : ''}`}>
                      <span className={`font-label-sm text-label-sm ${item.active ? 'text-secondary' : 'text-on-surface-variant'}`}>{item.day}</span>
                      <span className={`font-label-md text-label-md mt-1 ${item.active ? 'text-secondary' : 'text-primary'}`}>{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows Container */}
              <div className="flex flex-col">
                {rooms.map((room) => {
                  const roomIdStr = (room._id || room.id || '').toString();
                  // For simplicity, just show one booking block if there is a booking for this room
                  const roomBookings = bookings.filter(b => b.roomId === roomIdStr || b.room === roomIdStr || b.roomId === room.title);
                  
                  return (
                    <div key={roomIdStr} className="flex border-b border-outline-variant/30 relative h-16 group hover:bg-surface-container-low/50 transition-colors">
                      <div className="w-64 shrink-0 p-4 border-r border-outline-variant/30 flex items-center bg-surface/90 backdrop-blur-sm sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">bed</span>
                          </div>
                          <div>
                            <h4 className="font-label-md text-label-md text-on-surface">{room.title}</h4>
                            <span className="font-label-sm text-label-sm text-outline">Max {room.capacity || 2} Guests</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDB2NjRIMS41VjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWEyZTEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-repeat-x opacity-80">
                        {/* Render prices */}
                        {[...Array(15)].map((_, i) => (
                          <div key={i} className="absolute inset-y-0 w-[60px] flex items-center justify-center pointer-events-none" style={{ left: \`\${i * 60}px\` }}>
                            <span className="font-label-sm text-label-sm text-outline-variant">₹{room.price || 5000}</span>
                          </div>
                        ))}

                        {/* Render first booking as a dummy block on the grid (starts day 1, spans 3 days) */}
                        {roomBookings.length > 0 && (
                          <div className="absolute top-2 bottom-2 left-[60px] w-[180px] bg-primary-container rounded-md shadow-sm border border-primary-container flex items-center px-3 cursor-pointer hover:brightness-110 transition-all overflow-hidden z-0">
                            <div className="flex items-center gap-2 w-full">
                              <span className="material-symbols-outlined text-on-primary-container text-[16px]">person</span>
                              <span className="font-label-md text-label-md text-on-primary truncate">{roomBookings[0].user || "Guest"}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

