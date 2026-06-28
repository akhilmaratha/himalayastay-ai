"use client";

import React, { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('security');

  return (
    <main className="flex-1 w-full flex flex-col md:flex-row gap-12 p-sm md:p-xl pb-24 md:pb-xl">
      {/* Sidebar Navigation for Settings */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="md:sticky md:top-24">
          <div className="mb-8">
            <h2 className="font-display-md text-display-md text-primary mb-2">Settings</h2>
            <p className="text-on-surface-variant font-body-md">Manage your account preferences and security.</p>
          </div>
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all active:scale-95 ${activeTab === 'security' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-variant'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'security' ? { fontVariationSettings: "'FILL' 1" } : {}}>security</span>
              <span className="font-label-md">Account Security</span>
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all active:scale-95 ${activeTab === 'notifications' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-variant'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'notifications' ? { fontVariationSettings: "'FILL' 1" } : {}}>notifications</span>
              <span className="font-label-md">Notifications</span>
            </button>
            <button 
              onClick={() => setActiveTab('payment')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all active:scale-95 ${activeTab === 'payment' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-variant'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'payment' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
              <span className="font-label-md">Payment Methods</span>
            </button>
            <div className="h-px bg-outline-variant my-4"></div>
            <button className="text-error flex items-center gap-3 px-4 py-3 hover:bg-error-container rounded-lg cursor-pointer transition-transform active:scale-95">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md">Log Out</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Content Canvas */}
      <div className="grow">
        {/* Account Security Section */}
        {activeTab === 'security' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-gutter">
              <div className="mb-4">
                <h3 className="font-headline-lg text-headline-lg text-primary">Login & Security</h3>
                <p className="text-on-surface-variant font-body-md mt-1">Protect your account with robust security standards.</p>
              </div>

              {/* Password Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_12px_-2px_rgba(45,71,57,0.04),0_2px_4px_-1px_rgba(45,71,57,0.02)]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-label-md text-on-surface text-lg">Password</h4>
                    <p className="text-on-surface-variant font-body-md">Last changed 4 months ago</p>
                  </div>
                  <button className="text-primary font-label-md underline hover:text-secondary">Update</button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    <input 
                      className="peer w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary border-t-0 border-x-0 pt-6 pb-2 px-0 focus:ring-0 transition-all text-body-lg outline-none group-focus-within:scale-[1.01]" 
                      placeholder=" " 
                      type="password"
                    />
                    <label className="absolute left-0 top-1 text-on-surface-variant font-label-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary transition-all pointer-events-none">Current Password</label>
                  </div>
                </div>
              </div>

              {/* 2FA Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_12px_-2px_rgba(45,71,57,0.04),0_2px_4px_-1px_rgba(45,71,57,0.02)]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-on-surface text-lg">Two-factor authentication</h4>
                      <p className="text-on-surface-variant font-body-md">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" defaultChecked />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:inset-s-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Browser History Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_12px_-2px_rgba(45,71,57,0.04),0_2px_4px_-1px_rgba(45,71,57,0.02)]">
                <h4 className="font-label-md text-on-surface text-lg mb-4">Device History</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
                    <div className="flex gap-4 items-center">
                      <span className="material-symbols-outlined text-secondary">desktop_windows</span>
                      <div>
                        <p className="font-label-md text-on-surface">MacBook Pro · London, UK</p>
                        <p className="text-on-surface-variant text-sm">Active now · Chrome Browser</p>
                      </div>
                    </div>
                    <span className="text-primary font-label-sm">This device</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <span className="material-symbols-outlined text-secondary">smartphone</span>
                      <div>
                        <p className="font-label-md text-on-surface">iPhone 15 · Shimla, India</p>
                        <p className="text-on-surface-variant text-sm">2 days ago · Safari Browser</p>
                      </div>
                    </div>
                    <button className="text-error font-label-sm hover:underline">Log out</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Notifications Section */}
        {activeTab === 'notifications' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-gutter">
              <div className="mb-4">
                <h3 className="font-headline-lg text-headline-lg text-primary">Notification Preferences</h3>
                <p className="text-on-surface-variant font-body-md mt-1">Decide how you'd like to be contacted for stays and updates.</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_12px_-2px_rgba(45,71,57,0.04),0_2px_4px_-1px_rgba(45,71,57,0.02)]">
                <table className="w-full text-left">
                  <thead className="bg-surface-container text-on-surface font-label-md">
                    <tr>
                      <th className="p-6">Feature</th>
                      <th className="p-6 text-center">Email</th>
                      <th className="p-6 text-center">Push</th>
                      <th className="p-6 text-center">SMS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr>
                      <td className="p-6">
                        <p className="font-label-md">Booking Confirmations</p>
                        <p className="text-xs text-on-surface-variant">Updates regarding your stay reservations</p>
                      </td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" defaultChecked /></td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" defaultChecked /></td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" defaultChecked /></td>
                    </tr>
                    <tr className="bg-surface-container-low/30">
                      <td className="p-6">
                        <p className="font-label-md">Travel Recommendations</p>
                        <p className="text-xs text-on-surface-variant">Personalized picks based on your history</p>
                      </td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" defaultChecked /></td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" /></td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" /></td>
                    </tr>
                    <tr>
                      <td className="p-6">
                        <p className="font-label-md">Exclusive Offers</p>
                        <p className="text-xs text-on-surface-variant">Seasonal discounts and partner deals</p>
                      </td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" /></td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" defaultChecked /></td>
                      <td className="p-6 text-center"><input className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 cursor-pointer accent-primary" type="checkbox" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Payment Methods Section */}
        {activeTab === 'payment' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-gutter">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-headline-lg text-headline-lg text-primary">Payment Methods</h3>
                  <p className="text-on-surface-variant font-body-md mt-1">Securely manage your cards and billing info.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:bg-primary-container transition-all">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Add New Card
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="relative h-48 rounded-xl p-6 overflow-hidden bg-primary text-on-primary shadow-[0_4px_12px_-2px_rgba(45,71,57,0.04),0_2px_4px_-1px_rgba(45,71,57,0.02)] flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-1">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                      <path d="M0 100 C 20 0, 50 0, 100 100" fill="none" stroke="white" strokeWidth="0.5"></path>
                      <path d="M0 80 C 30 20, 60 20, 100 80" fill="none" stroke="white" strokeWidth="0.5"></path>
                    </svg>
                  </div>
                  <div className="flex justify-between items-start z-10">
                    <span className="material-symbols-outlined text-4xl">contactless</span>
                    <span className="font-display-md italic opacity-80">VISA</span>
                  </div>
                  <div className="z-10">
                    <p className="font-label-md tracking-widest text-lg mb-1">•••• •••• •••• 4242</p>
                    <div className="flex justify-between items-end">
                      <p className="font-label-sm uppercase">Arjun Sharma</p>
                      <p className="font-label-sm">12/26</p>
                    </div>
                  </div>
                </div>
                {/* Card 2 (Empty state/Add) */}
                <div className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-6 text-on-surface-variant hover:border-primary hover:text-primary transition-all cursor-pointer bg-surface-container-low/20 h-48">
                  <span className="material-symbols-outlined text-4xl mb-2">add_card</span>
                  <p className="font-label-md">Add Backup Payment</p>
                </div>
              </div>
              {/* Billing History */}
              <div className="mt-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_12px_-2px_rgba(45,71,57,0.04),0_2px_4px_-1px_rgba(45,71,57,0.02)]">
                <h4 className="font-label-md text-on-surface text-lg mb-6">Recent Transactions</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
                    <div>
                      <p className="font-label-md text-on-surface">Wildflower Retreat - 3 Nights</p>
                      <p className="text-on-surface-variant text-sm">Oct 14, 2024 · Visa ending 4242</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">$450.00</p>
                      <button className="text-xs text-secondary underline">Download PDF</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-label-md text-on-surface">Mountain Trek Experience</p>
                      <p className="text-on-surface-variant text-sm">Sep 28, 2024 · Visa ending 4242</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">$120.00</p>
                      <button className="text-xs text-secondary underline">Download PDF</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
