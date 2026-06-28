"use client";
import React from 'react';
import Link from 'next/link';

export default function RoomsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .tonal-row:nth-child(even) {
            background-color: #f6f3f2;
        }
        .ambient-shadow {
            box-shadow: 0 4px 20px -2px rgba(45, 71, 57, 0.05);
        }
      `}} />
      <div className="p-xl max-w-container-max mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">Room Management</h2>
            <p className="text-on-surface-variant font-body-lg mt-xs">Oversee and optimize your boutique inventory across all locations.</p>
          </div>
          <Link href="/admin/rooms/new">
            <button className="flex items-center gap-sm bg-primary text-white px-xl py-md rounded-lg font-label-md hover:scale-[1.02] active:scale-95 transition-all duration-200 ambient-shadow">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add New Room</span>
            </button>
          </Link>
        </div>
        
        {/* Filters & Controls Section */}
        <div className="bg-surface-container-low p-md rounded-xl mb-lg flex flex-wrap items-center gap-md border border-outline-variant/20">
          <div className="flex flex-col gap-xs flex-1 min-w-[200px]">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Search</span>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-xl pr-md py-sm bg-surface rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-body-md transition-all" placeholder="Search by name..." type="text"/>
            </div>
          </div>
          <div className="flex flex-col gap-xs w-48">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Room Type</span>
            <select className="w-full bg-surface py-sm px-md rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-label-md">
              <option>All Types</option>
              <option>Boutique Stay</option>
              <option>Homestay</option>
              <option>Eco-Lodge</option>
            </select>
          </div>
          <div className="flex flex-col gap-xs w-48">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Status</span>
            <select className="w-full bg-surface py-sm px-md rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-label-md">
              <option>All Status</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div className="flex items-end self-stretch">
            <button className="h-10 px-md flex items-center gap-xs text-primary font-label-md hover:bg-surface-container-high rounded-lg transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
              <span>Advanced</span>
            </button>
          </div>
        </div>

        {/* Room Inventory Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow border border-outline-variant/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-high/50 border-b border-outline-variant/50">
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Room Name</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Type</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant text-center">Capacity</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Base Rate</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Status</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-md text-on-surface">
                {/* Row 1 */}
                <tr className="tonal-row group hover:bg-primary-container/5 transition-colors cursor-pointer">
                  <td className="px-md py-md">
                    <div className="flex items-center gap-md">
                      <img className="w-12 h-12 rounded-lg object-cover" alt="Pine Valley Suite" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW2P9m0D_fbdJew7NQz7RNxeXBVy9FzoKXcBO1xRHre3eLc8yS20gVeujS0IBTF9YhsGX3LynbUZ-VzUt6a6-um2e9o-JFI7fL6UpPpCoWbQiBwKGMFzkYVheFj4V_q1TRsapk8v8mjl4OZe6L_THED34cNT2bDeGtbtm4UZtygTFHn3aqGjMbMW5MpB1Bq4Y4QBn5WYt9-1usvVLQcI7gl1SuyqfbHY6NTd2sypvucWDkX4K49qc1EPXu3xlvSr3AHZrmGv6wheNX"/>
                      <div>
                        <p className="font-bold">Pine Valley Suite</p>
                        <p className="text-label-sm text-on-surface-variant">Floor 02 • Room 204</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="bg-surface-container py-xs px-sm rounded-full text-label-sm">Boutique Stay</span>
                  </td>
                  <td className="px-md py-md text-center">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="font-bold">2 Adults</span>
                      <span className="text-label-sm text-on-surface-variant">1 Child</span>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="font-display-md text-md text-primary">₹12,500</span>
                    <span className="text-label-sm text-on-surface-variant">/night</span>
                  </td>
                  <td className="px-md py-md">
                    <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Available
                    </div>
                  </td>
                  <td className="px-md py-md text-right">
                    <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-xs text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="tonal-row group hover:bg-primary-container/5 transition-colors cursor-pointer">
                  <td className="px-md py-md">
                    <div className="flex items-center gap-md">
                      <img className="w-12 h-12 rounded-lg object-cover" alt="Cedar Ridge Loft" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRrY3SOOs3xLGhB4bd47d1U-oebnashdMEJX8ckFByzjd9wD0v29OX372PPu9tVBQP7wR00MQWqDnDvOxX1jSyGYPTTJHGyOBM3SOy-K9mufynoFL_dcJvA9sIccy7iYQiOvB7n7MxRD8tikhplopVgbJAzQvytgecG6GFFPGQxNolBy_ttCNUGqCNMXG55kNUf0X-nuq_zMa1MGAYAB5B951qnHocOAaNYqJOY_NjqYBpnGD0MgdRPxGQih77GSn4AKsC6LMk4A8S"/>
                      <div>
                        <p className="font-bold">Cedar Ridge Loft</p>
                        <p className="text-label-sm text-on-surface-variant">Main Cabin • Room 101</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="bg-surface-container py-xs px-sm rounded-full text-label-sm">Homestay</span>
                  </td>
                  <td className="px-md py-md text-center">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="font-bold">4 Adults</span>
                      <span className="text-label-sm text-on-surface-variant">2 Children</span>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="font-display-md text-md text-primary">₹8,500</span>
                    <span className="text-label-sm text-on-surface-variant">/night</span>
                  </td>
                  <td className="px-md py-md">
                    <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Occupied
                    </div>
                  </td>
                  <td className="px-md py-md text-right">
                    <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-xs text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="tonal-row group hover:bg-primary-container/5 transition-colors cursor-pointer">
                  <td className="px-md py-md">
                    <div className="flex items-center gap-md">
                      <img className="w-12 h-12 rounded-lg object-cover" alt="Summit Eco-Pod" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ54jQc5M97GRFqdZPgNAmwudseRsjrBVrKgOQGGSgqGnkzc1tJG6XxT5_OE4wNHi07zypDZrFI2zEbK6snSAAkMAaDguVxOFCJrRYQpg5MGbKqwrCONsAFE0vFx6wMdrAp0OmEa4pBosXI5r24dW3637QnRAYkz6dv-ccOXKy9pD5jYyvrn6PJiHob6yPQ3B2O2RceNDdttS-KfEH1tRb_GHLC_DaI_u8HVJcNiBbW7KzOm3bj3rlD5DtjuGiwfx1oOdTFc635UiM"/>
                      <div>
                        <p className="font-bold">Summit Eco-Pod</p>
                        <p className="text-label-sm text-on-surface-variant">Eco-Village • Pod 05</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="bg-surface-container py-xs px-sm rounded-full text-label-sm">Eco-Lodge</span>
                  </td>
                  <td className="px-md py-md text-center">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="font-bold">2 Adults</span>
                      <span className="text-label-sm text-on-surface-variant">0 Children</span>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="font-display-md text-md text-primary">₹6,200</span>
                    <span className="text-label-sm text-on-surface-variant">/night</span>
                  </td>
                  <td className="px-md py-md">
                    <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-error-container text-on-error-container text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Maintenance
                    </div>
                  </td>
                  <td className="px-md py-md text-right">
                    <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-xs text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="tonal-row group hover:bg-primary-container/5 transition-colors cursor-pointer">
                  <td className="px-md py-md">
                    <div className="flex items-center gap-md">
                      <img className="w-12 h-12 rounded-lg object-cover" alt="Mountain View Grand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqZEyPhXEyp1Ps7vf0297O0xDtqTQr86wnJTP3ajvLJoiG-WhOLo0ft2bXHTpf67yAmpxDJTn-CNVkPtLhHjctosbS94yPHH9XWFvrE7GKbbkqI3kwz3dEnW5dTQ0PoYvpTj428vrMmmdMhjKW3TMKYWxDfbinaQ9KgbkEV7xRXULQ-446CR2KqmPbohglgdNkW87hIlCU147L0M9NhJVbyfz2S86BRPz3kYBR5-iuj5NLB3qTQOYvSwobfLks6MCd_c73U726YwRo"/>
                      <div>
                        <p className="font-bold">Mountain View Grand</p>
                        <p className="text-label-sm text-on-surface-variant">Floor 03 • Room 301</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="bg-surface-container py-xs px-sm rounded-full text-label-sm">Boutique Stay</span>
                  </td>
                  <td className="px-md py-md text-center">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="font-bold">2 Adults</span>
                      <span className="text-label-sm text-on-surface-variant">2 Children</span>
                    </div>
                  </td>
                  <td className="px-md py-md">
                    <span className="font-display-md text-md text-primary">₹18,000</span>
                    <span className="text-label-sm text-on-surface-variant">/night</span>
                  </td>
                  <td className="px-md py-md">
                    <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Available
                    </div>
                  </td>
                  <td className="px-md py-md text-right">
                    <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-xs text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-md py-md flex items-center justify-between border-t border-outline-variant/50 bg-surface-container-low/30">
            <p className="text-label-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">1-4</span> of <span className="font-bold text-on-surface">24</span> rooms</p>
            <div className="flex items-center gap-xs">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 transition-colors" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-xs">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-label-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high font-label-md">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high font-label-md">3</button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overlay / Micro-widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Occupancy Rate</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">82%</h4>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Nightly Rate</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">₹9,450</h4>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Under Maintenance</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">3</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
