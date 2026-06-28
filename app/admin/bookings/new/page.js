import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewBooking() {
  return (
    <>
      {/* Page Header */}
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h3 className="font-display-lg text-display-lg text-primary mb-xs">Create Manual Booking</h3>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">Enter the reservation details for guests booking directly via phone or walk-in. Prices update dynamically based on selections.</p>
        </div>
        <Link href="/admin/bookings" className="flex items-center gap-xs text-secondary font-label-md hover:underline">
          <span className="material-symbols-outlined text-sm" data-icon="arrow_back">arrow_back</span>
          Back to Bookings
        </Link>
      </div>

      {/* Bento-ish Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: Guest & Stay */}
        <div className="lg:col-span-8 space-y-gutter">
          {/* Section 1: Guest Information */}
          <section className="bg-surface/70 backdrop-blur-md p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <div className="flex items-center justify-between mb-xl">
              <h4 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm">
                <span className="material-symbols-outlined" data-icon="person">person</span>
                Guest Information
              </h4>
              <div className="flex items-center gap-sm">
                <span className="font-label-md text-on-surface-variant">Returning Guest?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Full Name</label>
                <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" placeholder="e.g. Rahul Sharma" type="text" />
              </div>
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Email Address</label>
                <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" placeholder="rahul.sharma@example.com" type="email" />
              </div>
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Phone Number</label>
                <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" placeholder="+91 98765 43210" type="tel" />
              </div>
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Country/Region</label>
                <select className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md appearance-none">
                  <option>India</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Stay Details */}
          <section className="bg-surface/70 backdrop-blur-md p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <h4 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm mb-xl">
              <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
              Stay Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
              <div className="md:col-span-8 grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Check-in</label>
                  <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" type="date" />
                </div>
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Check-out</label>
                  <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" type="date" />
                </div>
              </div>
              <div className="md:col-span-4 grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Adults</label>
                  <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" min="1" type="number" defaultValue="2" />
                </div>
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Children</label>
                  <input className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" min="0" type="number" defaultValue="0" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Room Selection */}
          <section className="bg-surface/70 backdrop-blur-md p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <h4 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm mb-xl">
              <span className="material-symbols-outlined" data-icon="bed">bed</span>
              Room Selection
            </h4>
            <div className="space-y-md">
              {/* Room Item 1 */}
              <label className="flex items-center gap-md p-md rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border-b border-outline-variant last:border-0 group">
                <input defaultChecked className="w-5 h-5 accent-primary border-outline-variant cursor-pointer" name="room" type="radio" />
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
                  <Image fill className="object-cover" alt="Master Pine Suite" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_PEOPfZzoAG_bg5-aNopDGbAPXHC2b4pn5UNIdoDTtUB5HMzUzJqz_pMcGMufRPolcYKzQ1OJB8KgASREQj4ac22vntpdhg60t_kxA97V4R00yIQB2HvOjQi8uYHT9Y-SyFsO2bGqafnOj2AYQ4EB7n-JG-ieqgTvP-plpHlNHPRH3OIlK8hZ30GoibE7Id-F7EQQETmgGPkHEZfcrJyaP6Um-8W25sXS_pYWKHUa2eFWCWfOgEot9-rnZ0tuhOgu_u82Ux23bHFO" />
                </div>
                <div className="flex-1">
                  <p className="font-label-md text-primary">Master Pine Suite</p>
                  <p className="text-label-sm text-on-surface-variant">King Bed • Mountain View • Private Balcony</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-primary">₹12,500 <span className="text-label-sm font-normal text-on-surface-variant">/ night</span></p>
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Available</span>
                </div>
              </label>

              {/* Room Item 2 */}
              <label className="flex items-center gap-md p-md rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border-b border-outline-variant last:border-0 group">
                <input className="w-5 h-5 accent-primary border-outline-variant cursor-pointer" name="room" type="radio" />
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
                  <Image fill className="object-cover" alt="The Attic Nook" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHonSnNHxXeD_B-EYGbTM7QybyGjpRPxQoLfw6QTQQpYeryrJBTkZAxPE4cTtrWBvIpkJJKeBNTKIkSfbe3rlTAIkFY_5iXlU8MrKh2HsR0jjDxKz7KubwgmPv2b-isVh9kLv7tjO0NXnBGGj34k1csLlPjDORNy4ls0Im-7YlI__hkYYCHn7UDcQw7gos09YncsivnShkQ45vm8gZn9EJZ4UkJavMCqO9uB5YvY2SZQZYyfs69-GTt7AenOyv0jeHONwqJm9uWSxp" />
                </div>
                <div className="flex-1">
                  <p className="font-label-md text-primary">The Attic Nook</p>
                  <p className="text-label-sm text-on-surface-variant">Queen Bed • Skylight • Reading Corner</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-primary">₹8,200 <span className="text-label-sm font-normal text-on-surface-variant">/ night</span></p>
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Available</span>
                </div>
              </label>

              {/* Room Item 3 */}
              <label className="flex items-center gap-md p-md rounded-lg opacity-50 grayscale cursor-not-allowed border-b border-outline-variant last:border-0">
                <input disabled className="w-5 h-5 accent-primary border-outline-variant" name="room" type="radio" />
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
                  <Image fill className="object-cover" alt="Stone Hearth Studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBntB526KzqXf9CUcvQRjzR9lFzOYL57zo58rv3UUOuHgfYNcF2ZN5muQ0swOepx21kqMRWqKQdOJnr4RlrNSsKAb0w75FSl0BcQnYDbLpBFc-hnH0nPz__26vKJG-I6j7u5joNI9pNW_mzEwcECsQP0X7mtoJoqvN0Qau0F_CI3tqFdEkBha1MFCBVLeIbVpEVpfBFiEkw2Lldv81dHVQdz2e6jWmutBOKzeRQWcB583Ry-azW3HI0D1oXds3-8m3cgqcvK-fYDBsj" />
                </div>
                <div className="flex-1">
                  <p className="font-label-md text-primary">Stone Hearth Studio</p>
                  <p className="text-label-sm text-on-surface-variant">Double Bed • Fireplace Access</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-primary">₹6,800 <span className="text-label-sm font-normal text-on-surface-variant">/ night</span></p>
                  <span className="text-[10px] text-error font-bold uppercase tracking-widest">Occupied</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Payment & Summary */}
        <aside className="lg:col-span-4 space-y-gutter lg:sticky lg:top-28">
          {/* Summary Card */}
          <section className="bg-primary text-on-primary p-xl rounded-xl shadow-lg">
            <h4 className="font-display-md text-display-md mb-xl">Booking Summary</h4>
            <div className="space-y-md border-b border-primary-fixed-dim/30 pb-xl mb-xl">
              <div className="flex justify-between font-label-md opacity-80">
                <span>Base Rate (3 Nights)</span>
                <span>₹37,500</span>
              </div>
              <div className="flex justify-between font-label-md opacity-80">
                <span>Service Fee (10%)</span>
                <span>₹3,750</span>
              </div>
              <div className="flex justify-between font-label-md opacity-80">
                <span>Tourism Tax</span>
                <span>₹1,200</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-xl">
              <div>
                <p className="font-label-sm opacity-70 uppercase tracking-widest">Total Amount</p>
                <p className="font-display-md text-display-md">₹42,450</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-20" data-icon="payments">payments</span>
            </div>
            
            <div className="space-y-md">
              <label className="block font-label-sm uppercase tracking-wider mb-xs">Payment Status</label>
              <div className="grid grid-cols-2 gap-sm">
                <button className="bg-primary-fixed-dim text-primary py-sm rounded-lg font-label-md text-sm border-2 border-primary-fixed-dim hover:opacity-90 transition-opacity">
                  Paid
                </button>
                <button className="bg-transparent text-on-primary py-sm rounded-lg font-label-md text-sm border-2 border-primary-fixed-dim/50 hover:bg-white/10 transition-colors">
                  Pending
                </button>
              </div>
            </div>
          </section>

          {/* Special Requests */}
          <section className="bg-surface/70 backdrop-blur-md p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <label className="font-headline-lg text-headline-lg text-primary block mb-md">Special Requests</label>
            <textarea 
              className="w-full h-32 bg-surface-container-low border-none rounded-lg p-md text-body-md focus:ring-2 focus:ring-primary transition-all resize-none outline-none" 
              placeholder="e.g. Dietary restrictions, late arrival, extra towels..."
            ></textarea>
          </section>

          {/* Action Buttons */}
          <div className="space-y-md">
            <button className="w-full bg-primary text-on-primary py-xl rounded-xl font-headline-lg shadow-lg hover:shadow-xl active:scale-95 transition-all">
              Confirm Booking
            </button>
            <button className="w-full bg-surface-container text-on-surface-variant py-md rounded-xl font-label-md border border-outline-variant hover:bg-surface-variant transition-colors">
              Cancel & Discard
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
