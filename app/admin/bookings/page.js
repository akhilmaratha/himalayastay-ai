import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BookingsManagement() {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-lg">
        <div>
          <h2 className="font-display-lg text-display-lg text-primary">Booking Management</h2>
          <p className="text-on-surface-variant text-body-lg mt-xs max-w-2xl">Manage and track all guest reservations across your properties with real-time updates and seamless oversight.</p>
        </div>
        <Link href="/admin/bookings/new" className="bg-primary hover:bg-primary-container text-on-primary px-xl py-sm rounded-lg flex items-center gap-xs transition-all duration-300 transform hover:-translate-y-1 shadow-md">
          <span className="material-symbols-outlined">add</span>
          <span className="font-label-md">New Booking</span>
        </Link>
      </div>

      {/* Filter Bar Section */}
      <div className="bg-surface/70 backdrop-blur-md rounded-xl p-sm shadow-sm hover:shadow-md transition-shadow mb-md flex flex-wrap items-center justify-between gap-md border border-outline-variant/20">
        <div className="flex items-center gap-xs">
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 bg-primary text-on-primary">All Bookings</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high">Upcoming</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high">Checked-In</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high">Completed</button>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs text-on-surface-variant px-sm py-xs rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span className="font-label-sm">May 1 - May 31, 2024</span>
          </div>
          <button className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="font-label-sm">Filters</span>
          </button>
        </div>
      </div>

      {/* Table Section (The Guest List) */}
      <div className="bg-surface/70 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-outline-variant/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Guest Name</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Property / Room</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Stay Dates</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Source</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Status</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider text-right">Amount</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {/* Row 1 */}
              <tr className="hover:bg-primary/5 transition-colors group">
                <td className="px-gutter py-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container overflow-hidden relative">
                      <Image fill className="object-cover" alt="Ananya R." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwigS1NUC2ia-H2WkDpgJUCu1c3CTfNIix-VoV3Ayj8vbQrZ1SBY9jMkhtxIKYtKGUht2_jr4pkH5daKpsvJlkrZcvh7mXP9kMM7y_oyW2qPDYIL4w5AEttMfvUBRAJ6bjWrq9pBew5o-UPkCBRN7-zxe8JveuUKHHeqKlNSQd26xVW-onz2zprGUaRlkoE_nwXaVsNidlRZ5wDoVvn8rXsSoB1P9txDF6NpS9OCfORWMr98FFA6-gkbk53DtwzEnaIpveMoMm5EXT" />
                    </div>
                    <div>
                      <p className="font-headline-lg-mobile text-on-surface">Ananya R.</p>
                      <p className="text-label-sm text-on-surface-variant">#BK-9421</p>
                    </div>
                  </div>
                </td>
                <td className="px-gutter py-md">
                  <p className="text-on-surface font-medium">Mountain View Suite</p>
                  <p className="text-label-sm text-on-surface-variant">Leh Sanctuary Lodge</p>
                </td>
                <td className="px-gutter py-md text-on-surface font-body-md">
                  May 12 - May 16
                </td>
                <td className="px-gutter py-md">
                  <span className="px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-surface-container-high text-on-surface-variant">Website</span>
                </td>
                <td className="px-gutter py-md">
                  <span className="inline-flex items-center gap-1.5 px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-green-100 text-green-800 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Confirmed
                  </span>
                </td>
                <td className="px-gutter py-md text-right font-headline-lg-mobile text-primary">
                  ₹42,500
                </td>
                <td className="px-gutter py-md text-center">
                  <div className="flex justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-primary/5 transition-colors group">
                <td className="px-gutter py-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary-container overflow-hidden relative">
                      <Image fill className="object-cover" alt="Vikram S." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU1dF52PgIdEvZSIwf4PY8C9EsV1JYxZkos5BxsrhNSzI2mzBAmkJW9uxOjQ8OfLOWvSirSUMS1piF7jZM1UzFhBUrXOP2zzRV025M8gwaMbBUbsqswi6DM5BiIC1hh51OCTcBgE7vCJAj7LUJeKaLyzT3nzi88WN9_ObBoXvs64-12UnQLaWwBDZnfBkGZ3KuaKFT-RrHXKsVIFXC24Cf3GXATvdljzfqMB7AIpdz02FsXsCTLrna1SLtcOCZ5fhv2H7pU4TJw4k3" />
                    </div>
                    <div>
                      <p className="font-headline-lg-mobile text-on-surface">Vikram S.</p>
                      <p className="text-label-sm text-on-surface-variant">#BK-9428</p>
                    </div>
                  </div>
                </td>
                <td className="px-gutter py-md">
                  <p className="text-on-surface font-medium">Standard Forest Cabin</p>
                  <p className="text-label-sm text-on-surface-variant">Nubra Valley Retreat</p>
                </td>
                <td className="px-gutter py-md text-on-surface font-body-md">
                  May 14 - May 17
                </td>
                <td className="px-gutter py-md">
                  <span className="px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-primary-fixed text-on-primary-fixed-variant">Direct</span>
                </td>
                <td className="px-gutter py-md">
                  <span className="inline-flex items-center gap-1.5 px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-blue-100 text-blue-800 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Checked In
                  </span>
                </td>
                <td className="px-gutter py-md text-right font-headline-lg-mobile text-primary">
                  ₹28,000
                </td>
                <td className="px-gutter py-md text-center">
                  <div className="flex justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-primary/5 transition-colors group">
                <td className="px-gutter py-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden relative">
                      <Image fill className="object-cover" alt="Meera K." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCXCEqM1L3tDVTPFl9MRGN0srK75Tj5oF3Y8PiNYNAGiO-8YJOF_GuLwP1kLnJHHNAmurfEC0EhqohLvlUEw4gvMQynT3CFxHxf51d2UEkqg7C7W_kT4A4be4lBMl-rqxR3D4sVXnvvm62QQhClzvWWJEXTE8UMs-mHxEV8a-OzWzqfVG38FIe1ypx--MOJSiwkLh07v4ZarcncpWzDwdbcCwkzLR3QE7MDF6g3q8mDOSUmk3o73sfva1mQc5FiisRgnrRXV-vf36Q" />
                    </div>
                    <div>
                      <p className="font-headline-lg-mobile text-on-surface">Meera K.</p>
                      <p className="text-label-sm text-on-surface-variant">#BK-9433</p>
                    </div>
                  </div>
                </td>
                <td className="px-gutter py-md">
                  <p className="text-on-surface font-medium">Honeymoon Cottage</p>
                  <p className="text-label-sm text-on-surface-variant">Leh Sanctuary Lodge</p>
                </td>
                <td className="px-gutter py-md text-on-surface font-body-md">
                  May 18 - May 22
                </td>
                <td className="px-gutter py-md">
                  <span className="px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-surface-container-high text-on-surface-variant">Website</span>
                </td>
                <td className="px-gutter py-md">
                  <span className="inline-flex items-center gap-1.5 px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    Pending
                  </span>
                </td>
                <td className="px-gutter py-md text-right font-headline-lg-mobile text-primary">
                  ₹64,200
                </td>
                <td className="px-gutter py-md text-center">
                  <div className="flex justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-primary/5 transition-colors group">
                <td className="px-gutter py-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-on-tertiary-container overflow-hidden relative">
                      <Image fill className="object-cover" alt="Rahul & Sona" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDasogMW7SFxO5mIb2jQ42nNs9s0ZEiem26GkY8A4G6V8cRwnp9Do5TG-exL6tstiycVCVCIE9JJlSifUcwM4jwOxIpKnrgdh7aJvw0QjCfCfEr1eGDSrwpWebj5-RoN9_Eo5-MRbz8deqB7Z_0_huTNGaOaypHBKlZAmq_O1nPMHd-DJG5riR9x8IaZbQsuCCAMXtq4sOjtp4yoLTD29bIN21NEyKFP1rQ5gW1dfdon5EKjprbvraCpxB_x9qsnB62MHJiznYSNk9N" />
                    </div>
                    <div>
                      <p className="font-headline-lg-mobile text-on-surface">Rahul & Sona</p>
                      <p className="text-label-sm text-on-surface-variant">#BK-9441</p>
                    </div>
                  </div>
                </td>
                <td className="px-gutter py-md">
                  <p className="text-on-surface font-medium">Deluxe King Room</p>
                  <p className="text-label-sm text-on-surface-variant">Pangong View Camp</p>
                </td>
                <td className="px-gutter py-md text-on-surface font-body-md">
                  June 02 - June 05
                </td>
                <td className="px-gutter py-md">
                  <span className="px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-surface-container-high text-on-surface-variant">Website</span>
                </td>
                <td className="px-gutter py-md">
                  <span className="inline-flex items-center gap-1.5 px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-green-100 text-green-800 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Confirmed
                  </span>
                </td>
                <td className="px-gutter py-md text-right font-headline-lg-mobile text-primary">
                  ₹35,800
                </td>
                <td className="px-gutter py-md text-center">
                  <div className="flex justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-gutter py-md bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30">
          <p className="text-label-sm text-on-surface-variant">Showing 1 to 4 of 24 reservations</p>
          <div className="flex items-center gap-xs">
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md">1</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md">2</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md">3</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bento Grid (Secondary Information) */}
      <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="bg-surface/70 backdrop-blur-md p-md rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Occupancy Rate</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-primary">84%</span>
            <span className="text-green-600 font-label-sm flex items-center gap-1 pb-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12%
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full mt-md overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '84%' }}></div>
          </div>
        </div>
        
        <div className="bg-surface/70 backdrop-blur-md p-md rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Active Check-ins</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-primary">12</span>
            <span className="text-on-surface-variant font-label-sm pb-1">Expected today</span>
          </div>
          <div className="flex mt-md -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-400"></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-500"></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center text-[10px] text-on-primary font-bold">+9</div>
          </div>
        </div>
        
        <div className="bg-surface/70 backdrop-blur-md p-md rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Direct Revenue</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-secondary">₹1.4L</span>
            <span className="text-secondary font-label-sm flex items-center gap-1 pb-1">
              <span className="material-symbols-outlined text-[16px]">payments</span>
              34% of total
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-md">Admin-created bookings continue to lead high-value stays.</p>
        </div>
      </div>

      {/* Floating Action Button (FAB) - For New Booking Shortcut */}
      <Link href="/admin/bookings/new" className="fixed bottom-lg right-lg w-14 h-14 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 md:hidden">
        <span className="material-symbols-outlined">add</span>
      </Link>
    </>
  );
}
