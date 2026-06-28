"use client";
import React from 'react';

export default function SettingsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .ambient-shadow-1 { box-shadow: 0 2px 4px rgba(23, 49, 36, 0.02); }
        .ambient-shadow-2 { box-shadow: 0 4px 12px rgba(23, 49, 36, 0.05); }
        
        /* Modern Input Styling */
        .group-input:focus-within label { transform: translateY(-1.5rem) scale(0.85); color: #173124; }
        .group-input input:not(:placeholder-shown) + label,
        .group-input textarea:not(:placeholder-shown) + label { transform: translateY(-1.5rem) scale(0.85); }

        /* Hide scrollbar */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <div className="px-sm md:px-gutter max-w-container-max mx-auto w-full pb-xl">
        {/* Page Header */}
        <div className="mb-xl">
          <h2 className="font-display-lg text-display-lg text-primary mb-2">Settings</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your property preferences and integrations.</p>
        </div>

        {/* Settings Layout */}
        <div className="flex flex-col lg:flex-row gap-xl">
          {/* Vertical Tabs (Navigation) */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar lg:sticky lg:top-24">
              <a className="whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container text-primary font-bold transition-colors font-label-md text-label-md relative" href="#profile">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                Profile
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full hidden lg:block"></span>
              </a>
              <a className="whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-label-md text-label-md" href="#account">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>manage_accounts</span>
                Account
              </a>
              <a className="whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-label-md text-label-md" href="#notifications">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
                Notifications
              </a>
              <a className="whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-label-md text-label-md" href="#whatsapp">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>chat</span>
                WhatsApp Number
              </a>
              <a className="whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-label-md text-label-md" href="#ai-settings">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>psychology</span>
                AI Settings
              </a>
            </nav>
          </aside>

          {/* Settings Content Canvas */}
          <div className="grow space-y-xl max-w-4xl">
            {/* Profile Section */}
            <section className="scroll-mt-32" id="profile">
              <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
                <h3 className="font-headline-lg text-headline-lg text-primary mb-md">Public Profile</h3>
                <div className="flex items-start gap-md mb-lg">
                  <div className="w-24 h-24 rounded-full bg-surface-variant overflow-hidden relative group cursor-pointer">
                    <img alt="Manager Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPaLbPW89yjVU_AoymBYVjbCuxh-nKZSK56ZZXLZh27xHTiXs-aDVwK6pimbmqliBHtPlUQWWorBXYdPROu7Infz1oz2o0HKecJqUnjTfYGX1KxAEE5jDiMb014S16wcTL2TRc5pvWfvhFR1Aojx-8S7FbETDVoKgDwNFEKRnGhWe_KkJBj27eHrbStsH1dKG8l_rd64RPbsA8KG3Ip7FxdvTyfrHjfdRlPaILzJAm5qNf2NFRkLe6pAtrhbgp6QvTuG69j-d3ajW1" />
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 0" }}>photo_camera</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="px-4 py-2 bg-surface border border-outline text-primary font-label-md rounded-lg hover:bg-surface-container-low transition-colors mb-2">Change Photo</button>
                    <p className="font-label-sm text-label-sm text-outline-variant">JPG, GIF or PNG. Max size of 5MB.</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group-input border-b border-outline-variant hover:border-primary transition-colors">
                      <input className="w-full bg-transparent border-none px-0 py-2 pt-6 focus:ring-0 text-body-md text-on-surface" id="firstName" placeholder=" " type="text" defaultValue="Rahul" />
                      <label className="absolute left-0 top-4 text-outline transition-all duration-200 pointer-events-none font-label-md" htmlFor="firstName">First Name</label>
                    </div>
                    <div className="relative group-input border-b border-outline-variant hover:border-primary transition-colors">
                      <input className="w-full bg-transparent border-none px-0 py-2 pt-6 focus:ring-0 text-body-md text-on-surface" id="lastName" placeholder=" " type="text" defaultValue="Sharma" />
                      <label className="absolute left-0 top-4 text-outline transition-all duration-200 pointer-events-none font-label-md" htmlFor="lastName">Last Name</label>
                    </div>
                  </div>
                  <div className="relative group-input border-b border-outline-variant hover:border-primary transition-colors">
                    <input className="w-full bg-transparent border-none px-0 py-2 pt-6 focus:ring-0 text-body-md text-on-surface" id="email" placeholder=" " type="email" defaultValue="rahul@peakstay.com" />
                    <label className="absolute left-0 top-4 text-outline transition-all duration-200 pointer-events-none font-label-md" htmlFor="email">Email Address</label>
                  </div>
                  <div className="relative group-input border-b border-outline-variant hover:border-primary transition-colors">
                    <textarea className="w-full bg-transparent border-none px-0 py-2 pt-6 focus:ring-0 text-body-md text-on-surface resize-none" id="bio" placeholder=" " rows="3" defaultValue="Passionate about sharing the beauty of the Himalayas. Over 10 years of experience in boutique hospitality."></textarea>
                    <label className="absolute left-0 top-4 text-outline transition-all duration-200 pointer-events-none font-label-md" htmlFor="bio">Bio</label>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-2 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-colors" type="button">Save Changes</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
