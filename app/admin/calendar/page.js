import React from 'react';

export default function CalendarPage() {
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

      {/* Calendar Container */}
      <div className="bg-surface/70 backdrop-blur-md rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden flex flex-col">
        {/* Controls Row */}
        <div className="p-md border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-surface-container-high text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="font-headline-lg text-headline-lg text-primary min-w-[200px] text-center">October 2023</h3>
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
                {/* Generating 15 days for visual representation */}
                {[
                  { day: 'Sun', date: '01' },
                  { day: 'Mon', date: '02' },
                  { day: 'Tue', date: '03' },
                  { day: 'Wed', date: '04', active: true },
                  { day: 'Thu', date: '05' },
                  { day: 'Fri', date: '06' },
                  { day: 'Sat', date: '07' },
                  { day: 'Sun', date: '08' },
                  { day: 'Mon', date: '09' },
                  { day: 'Tue', date: '10' },
                  { day: 'Wed', date: '11' },
                  { day: 'Thu', date: '12' },
                  { day: 'Fri', date: '13' },
                  { day: 'Sat', date: '14' },
                  { day: 'Sun', date: '15' },
                ].map((item, i) => (
                  <div key={i} className={`flex-1 min-w-[60px] p-2 text-center ${i !== 14 ? 'border-r border-outline-variant/30' : ''} flex flex-col justify-center ${item.active ? 'bg-secondary-fixed/30' : ''}`}>
                    <span className={`font-label-sm text-label-sm ${item.active ? 'text-secondary' : 'text-on-surface-variant'}`}>{item.day}</span>
                    <span className={`font-label-md text-label-md mt-1 ${item.active ? 'text-secondary' : 'text-primary'}`}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rows Container */}
            <div className="flex flex-col">
              {/* Row 1: Pine Suite */}
              <div className="flex border-b border-outline-variant/30 relative h-16 group hover:bg-surface-container-low/50 transition-colors">
                <div className="w-64 shrink-0 p-4 border-r border-outline-variant/30 flex items-center bg-surface/90 backdrop-blur-sm sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">bed</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface">Pine Suite</h4>
                      <span className="font-label-sm text-label-sm text-outline">Max 2 Guests</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDB2NjRIMS41VjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWEyZTEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-repeat-x opacity-80">
                  {/* Empty/Available Slots (implicit by background, adding text for first few) */}
                  <div className="absolute inset-y-0 left-0 w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹4,500</span>
                  </div>
                  <div className="absolute inset-y-0 left-[60px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹4,500</span>
                  </div>
                  {/* Booking Block */}
                  <div className="absolute top-2 bottom-2 left-[120px] w-[240px] bg-primary-container rounded-md shadow-sm border border-primary-container flex items-center px-3 cursor-pointer hover:brightness-110 transition-all overflow-hidden z-0">
                    <div className="flex items-center gap-2 w-full">
                      <span className="material-symbols-outlined text-on-primary-container text-[16px]">person</span>
                      <span className="font-label-md text-label-md text-on-primary truncate">Rahul Sharma</span>
                    </div>
                  </div>
                  {/* Available */}
                  <div className="absolute inset-y-0 left-[360px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹5,000</span>
                  </div>
                  {/* Blocked Dates */}
                  <div className="absolute top-2 bottom-2 left-[420px] w-[180px] bg-surface-variant rounded-md border border-outline-variant/30 flex items-center justify-center px-3 cursor-not-allowed opacity-80">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Maintenance</span>
                  </div>
                  <div className="absolute inset-y-0 left-[600px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹4,500</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Oak Room */}
              <div className="flex border-b border-outline-variant/30 relative h-16 group hover:bg-surface-container-low/50 transition-colors">
                <div className="w-64 shrink-0 p-4 border-r border-outline-variant/30 flex items-center bg-surface/90 backdrop-blur-sm sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">bed</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface">Oak Room</h4>
                      <span className="font-label-sm text-label-sm text-outline">Max 3 Guests</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDB2NjRIMS41VjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWEyZTEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-repeat-x opacity-80">
                  {/* Booking Block */}
                  <div className="absolute top-2 bottom-2 left-0 w-[180px] bg-primary-container rounded-md shadow-sm border border-primary-container flex items-center px-3 cursor-pointer hover:brightness-110 transition-all overflow-hidden z-0">
                    <div className="flex items-center gap-2 w-full">
                      <span className="font-label-md text-label-md text-on-primary truncate">A. Singh (Checkout)</span>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-[180px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹3,800</span>
                  </div>
                  <div className="absolute inset-y-0 left-[240px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹3,800</span>
                  </div>
                  {/* Booking Block */}
                  <div className="absolute top-2 bottom-2 left-[300px] w-[300px] bg-primary-container rounded-md shadow-sm border border-primary-container flex items-center px-3 cursor-pointer hover:brightness-110 transition-all overflow-hidden z-0">
                    <div className="flex items-center gap-2 w-full">
                      <span className="material-symbols-outlined text-on-primary-container text-[16px]">group</span>
                      <span className="font-label-md text-label-md text-on-primary truncate">Patel Family Retreat</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Cedar Villa */}
              <div className="flex border-b border-outline-variant/30 relative h-16 group hover:bg-surface-container-low/50 transition-colors bg-surface-container-low/30">
                <div className="w-64 shrink-0 p-4 border-r border-outline-variant/30 flex items-center bg-surface/90 backdrop-blur-sm sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">cottage</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface">Cedar Villa</h4>
                      <span className="font-label-sm text-label-sm text-outline">Entire Home • 6 Guests</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDB2NjRIMS41VjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWEyZTEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-repeat-x opacity-80">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="absolute inset-y-0 w-[60px] flex items-center justify-center pointer-events-none" style={{ left: `${i * 60}px` }}>
                      <span className="font-label-sm text-label-sm text-outline-variant">₹12k</span>
                    </div>
                  ))}
                  <div className="absolute inset-y-0 left-[240px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹15k</span>
                  </div>
                  <div className="absolute inset-y-0 left-[300px] w-[60px] flex items-center justify-center pointer-events-none">
                    <span className="font-label-sm text-label-sm text-outline-variant">₹15k</span>
                  </div>
                  {/* Booking Block */}
                  <div className="absolute top-2 bottom-2 left-[360px] w-[420px] bg-primary-container rounded-md shadow-sm border border-primary-container flex items-center px-3 cursor-pointer hover:brightness-110 transition-all overflow-hidden z-0">
                    <div className="flex items-center gap-2 w-full">
                      <span className="material-symbols-outlined text-on-primary-container text-[16px]">celebration</span>
                      <span className="font-label-md text-label-md text-on-primary truncate">Corporate Offsite - TechCorp</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
