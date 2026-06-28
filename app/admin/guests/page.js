"use client";
import React, { useState, useEffect } from 'react';

export default function GuestsPage() {
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedGuest(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openGuestModal = (guestId) => {
    if (guestId === 'marcus') {
      setSelectedGuest({
        id: 'marcus',
        name: 'Marcus Chen',
        avatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=f0eded&color=173124'
      });
    } else {
      setSelectedGuest({
        id: 'elena',
        name: 'Elena Rostova',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Zo2UwZrjBo9oU2fxySsciVP4k8W5eZRbbGS1Vl81w88gdzAXVD9jzBl5__V8zWN3X7IdXpj9BbnJq5VmbPaquorU9ttOPgGyNjwZhVvx0YDh0yQYaA2PjEUVUZC-GzBPqvUvSooFYcrRyDSq3I5B9qHC4_93hQInQFDrT1vHd9v2RARe7BGug39USPR7BREsPj61hQt6Mc4qLunp43mqAICvh0utf60KqMPuvj9Pce4rQqx7INfDd1GHRD3a15HZ3yHDVKj4J9TZ'
      });
    }
  };

  const closeGuestModal = () => {
    setSelectedGuest(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
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
      `}} />
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
              <p className="font-display-md text-display-md text-primary">1,248</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
                +12% from last season
              </p>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-surface-container-low rounded-xl p-6 ambient-shadow-1 border border-surface-variant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-md text-label-md text-on-surface-variant">Returning Guests</h3>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>autorenew</span>
              </div>
              <p className="font-display-md text-display-md text-secondary">342</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">27% return rate</p>
            </div>
            {/* Quick Action Card */}
            <div className="bg-primary-container rounded-xl p-6 ambient-shadow-1 text-on-primary-container">
              <h3 className="font-headline-lg text-headline-lg mb-2">Upcoming Arrivals</h3>
              <p className="font-body-md text-body-md mb-6 opacity-90">You have 4 VIP guests arriving this weekend. Review their preferences to prepare.</p>
              <button className="bg-on-primary text-primary px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors w-full text-center">
                Review Arrivals
              </button>
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
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Contact</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Total Visits</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Last Stay</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium">Rating</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant bg-surface-container-lowest">
                  {/* Row 1 */}
                  <tr className="table-row-hover hover:bg-surface-container cursor-pointer group" onClick={() => openGuestModal('elena')}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
                          <img alt="Elena Rostova" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhfmD_AmE8cnKpjRx9HaEulr_O3_ChYxd6fuPstoM2eyOIw0Kj9OzLnH_1znCl5ZVSx7B4kG38co7w-_quVZpzcY1jZfWinlb3riaTFmSanfD2OXw8-7Vm3dm-WuQjPXielZeWLGzUNh3uXjY1kuAaVr4P_6Ywk_-Pch5B5JkarkWaCtXjljDIEkBI1ErWGdt07DuSzsKN-LUSg7KOuytSs_XHa859LnzAntssktFi4OyWoRTLRrlSV7wQhYbMNwMY9M_ctBa5Ahup" />
                        </div>
                        <div>
                          <p className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">Elena Rostova</p>
                          <p className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> VIP
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">elena.r@example.com</td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">4</td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">Oct 12, 2023</td>
                    <td className="px-6 py-4">
                      <div className="flex text-tertiary-container">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="table-row-hover hover:bg-surface-container cursor-pointer group" onClick={() => openGuestModal('marcus')}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high flex items-center justify-center text-primary font-display-md text-display-md text-[18px]">
                          MC
                        </div>
                        <div>
                          <p className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">Marcus Chen</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">+44 7700 900077</td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">1</td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">Aug 05, 2023</td>
                    <td className="px-6 py-4">
                      <div className="flex text-tertiary-container">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px] text-outline-variant" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="table-row-hover hover:bg-surface-container cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
                          <img alt="David Sharma" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCobLF-RBz_hCvyo5uFdA2p9nMBR0NKmFaBe2hXIh8z5vJTNww60Y3G1wirPNuHTJQJqebQEQN_9jfoaoCSnnQbUFjRime0Eq8f7t7hZh2zpFvudIRpnCkkU_qs2Mar35syuhYLjKbz9MmQj2Da6oIuvveecmZWtgiVqHv3nj-78Pe21GFLafmxWtaXDYJziGK_TGdLF2afFz0bJHfnBE9x5L0SkO-U1Nw2MuSaVZfKuiUUKkSyOfSyKFx0FGRGSOLFqnB0C9TOGS-y" />
                        </div>
                        <div>
                          <p className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">David Sharma</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Corporate Retreat</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">david.s@corp.in</td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">2</td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">May 22, 2023</td>
                    <td className="px-6 py-4">
                      <div className="flex text-tertiary-container">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-surface-variant bg-surface-container-lowest flex items-center justify-between mt-auto">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 3 of 1,248 entries</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 bg-primary text-on-primary rounded hover:bg-primary/90 transition-colors">1</button>
                <button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container-low transition-colors">2</button>
                <button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container-low transition-colors">3</button>
                <button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container-low transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Profile Modal / Slide-over */}
      {selectedGuest && (
        <div className="fixed inset-0 z-60">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-on-background/30 backdrop-blur-sm transition-opacity" onClick={closeGuestModal}></div>
          
          {/* Slide-over panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl modal-fade-in flex flex-col border-l border-surface-variant overflow-hidden">
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
                    {selectedGuest.id === 'elena' ? 'VIP Guest · 4 Stays' : 'Guest · 1 Stay'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Modal Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-surface custom-scrollbar">
              {/* Personal Details */}
              <section>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                  Details
                </h3>
                <div className="bg-surface-container-low rounded-xl p-4 space-y-4 border border-surface-variant">
                  <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                    <span className="font-label-md text-label-md text-on-surface-variant">Email</span>
                    <span className="font-body-md text-body-md text-on-surface text-right">{selectedGuest.id === 'elena' ? 'elena.r@example.com' : 'm.chen@example.com'}</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                    <span className="font-label-md text-label-md text-on-surface-variant">Phone</span>
                    <span className="font-body-md text-body-md text-on-surface text-right">{selectedGuest.id === 'elena' ? '+1 (555) 987-6543' : '+44 7700 900077'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-label-md text-label-md text-on-surface-variant">Origin</span>
                    <span className="font-body-md text-body-md text-on-surface text-right">{selectedGuest.id === 'elena' ? 'London, UK' : 'Singapore'}</span>
                  </div>
                </div>
              </section>

              {/* Preferences (Bento style) */}
              <section>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
                  Preferences
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary-container text-on-secondary-container rounded-lg p-3 flex flex-col gap-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>emoji_food_beverage</span>
                    <span className="font-label-md text-label-md">Prefers organic local tea</span>
                  </div>
                  <div className="bg-tertiary-container text-on-tertiary-container rounded-lg p-3 flex flex-col gap-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>ac_unit</span>
                    <span className="font-label-md text-label-md">Requires extra wool blankets</span>
                  </div>
                  <div className="bg-surface-container-high text-on-surface rounded-lg p-3 flex flex-col gap-2 col-span-2 border border-surface-variant">
                    <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>notes</span>
                    <span className="font-body-md text-body-md">Allergic to down feathers. Loves corner rooms with valley views. Usually arrives late in the evening.</span>
                  </div>
                </div>
              </section>

              {/* Timeline / Booking History */}
              <section>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
                  Stay History
                </h3>
                <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-outline-variant">
                  {/* Timeline Item 1 */}
                  <div className="relative">
                    <div className="absolute left-[-30px] top-1 w-[10px] h-[10px] rounded-full bg-primary border-2 border-surface"></div>
                    <div className="bg-surface-container-low p-4 rounded-lg border border-surface-variant">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-label-md text-label-md text-on-surface font-bold">The Pine Suite</h4>
                        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">Oct 12 - Oct 18, 2023</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">Anniversary trip. Ordered private dining on the terrace.</p>
                      <div className="mt-2 flex text-tertiary-container text-sm">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </div>
                  </div>
                  {/* Timeline Item 2 */}
                  {selectedGuest.id === 'elena' && (
                    <div className="relative">
                      <div className="absolute left-[-30px] top-1 w-[10px] h-[10px] rounded-full bg-outline-variant border-2 border-surface"></div>
                      <div className="bg-surface-container-lowest p-4 rounded-lg border border-surface-variant opacity-80">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-label-md text-label-md text-on-surface font-bold">Valley View Room</h4>
                          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">Mar 05 - Mar 10, 2022</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant text-sm">Winter retreat. Requested extra firewood.</p>
                      </div>
                    </div>
                  )}
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
