import React from 'react';

export default function Profile() {
  return (
    <main className="flex-1 w-full flex flex-col p-sm md:p-xl gap-xl pb-24 md:pb-xl">
      <div className="mb-md">
        <h1 className="font-display-lg text-display-lg text-primary">Welcome home, Tenzin.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Manage your mountain profile and track your journey through the peaks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Identity & Bio (Main Form) */}
        <div className="col-span-1 lg:col-span-8 space-y-md">
          <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)]">
            <div className="flex flex-col md:flex-row gap-lg items-start">
              {/* Avatar Section */}
              <div className="shrink-0 flex flex-col items-center gap-4 group">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-container shadow-sm group-hover:border-primary-fixed transition-colors">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCogpRs8ocHk3W5OolXOKk5c2SPDv_v9BP9C78i-Tu0Teh0VX4rDvr5F2ut0x04IctIvqwtCp6vIF5f8bvaDJZRRaGD9FyK9vXQbZZf_Nun9THQPvYUdpNV3DEbVLkHaX96SE2Vw-1KlnCTWDp70XcrxTlCK1oF3q7miWOHzzOz61wYD2i1ZWW4th7ZI5_2qbxOgn_puip0vtnQrPlcuUDUT_QOhezhpuobN5GuCD21YHIqvzl12FDTlatBhp9szoMEndjyDhfka-jS"
                    alt="Traveler Avatar"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                  </div>
                </div>
                <button className="text-primary font-label-md text-label-md hover:underline">Change Photo</button>
              </div>

              {/* Basic Info Fields */}
              <div className="grow w-full space-y-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="flex flex-col group">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1 group-focus-within:text-primary group-focus-within:font-bold transition-all">Full Name</label>
                    <input 
                      className="border-0 border-b border-outline-variant bg-transparent focus:ring-0 focus:border-primary transition-all px-0 py-2 font-body-lg text-body-lg text-primary outline-none" 
                      type="text" 
                      defaultValue="Tenzin Gyatso"
                    />
                  </div>
                  <div className="flex flex-col group">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1 group-focus-within:text-primary group-focus-within:font-bold transition-all">Email Address</label>
                    <input 
                      className="border-0 border-b border-outline-variant bg-transparent focus:ring-0 focus:border-primary transition-all px-0 py-2 font-body-lg text-body-lg text-primary outline-none" 
                      type="email" 
                      defaultValue="tenzin.peak@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col group">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1 group-focus-within:text-primary group-focus-within:font-bold transition-all">Phone Number</label>
                    <input 
                      className="border-0 border-b border-outline-variant bg-transparent focus:ring-0 focus:border-primary transition-all px-0 py-2 font-body-lg text-body-lg text-primary outline-none" 
                      type="tel" 
                      defaultValue="+91 98765-43210"
                    />
                  </div>
                  <div className="flex flex-col group">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1 group-focus-within:text-primary group-focus-within:font-bold transition-all">Base Location</label>
                    <input 
                      className="border-0 border-b border-outline-variant bg-transparent focus:ring-0 focus:border-primary transition-all px-0 py-2 font-body-lg text-body-lg text-primary outline-none" 
                      type="text" 
                      defaultValue="Manali, HP"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Bio */}
            <div className="mt-lg group">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block group-focus-within:text-primary group-focus-within:font-bold transition-all">Traveler Bio</label>
              <textarea 
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface" 
                placeholder="Tell your mountain story..." 
                rows="4"
                defaultValue="An avid hiker and photography enthusiast who finds peace in the high altitudes of Spiti and Ladakh. Seeking authentic homestays that bridge the gap between tradition and comfort. Member of the Himalayan Stays community since 2021."
              ></textarea>
            </div>
            
            <div className="mt-lg flex flex-wrap justify-end gap-4">
              <button className="px-8 py-3 border border-outline text-secondary font-label-md text-label-md rounded-full hover:bg-surface-container-high transition-all">Discard Changes</button>
              <button className="px-8 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-full hover:shadow-lg active:scale-95 transition-all">Save Profile</button>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Loyalty Cards */}
        <div className="col-span-1 lg:col-span-4 space-y-md">
          {/* Membership Tier Card */}
          <div className="relative overflow-hidden bg-primary text-on-primary p-lg rounded-xl shadow-[0_12px_40px_-4px_rgba(45,71,57,0.08)] h-64 flex flex-col justify-between">
            {/* Subtle Background Decoration */}
            <div className="absolute -right-10 -top-10 w-48 h-48 opacity-10">
              <span className="material-symbols-outlined text-[180px]">filter_hdr</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary-fixed">star</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">Member Status</span>
              </div>
              <h3 className="font-display-md text-display-md leading-none">Cloud Walker</h3>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="font-label-md text-label-md opacity-80">Progress to Peak Master</p>
                <p className="font-label-md text-label-md">85%</p>
              </div>
              <div className="w-full bg-primary-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-fixed h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(255,182,149,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Mountain Credits Summary */}
          <div className="bg-surface-container-high p-lg rounded-xl border border-outline-variant">
            <div className="flex justify-between items-center mb-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">payments</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Mountain Credits</span>
              </div>
              <button className="text-primary material-symbols-outlined hover:bg-surface-dim rounded-full transition-colors">chevron_right</button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-md text-display-md text-primary">12,450</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Pts</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Worth approximately <span className="font-semibold text-secondary">₹1,245.00</span> on your next booking.</p>
            <button className="w-full mt-6 py-2 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary hover:text-on-primary transition-all">Redeem Credits</button>
          </div>

          {/* Quick Actions List */}
          <div className="bg-white p-lg rounded-xl border border-outline-variant shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)]">
            <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">Account Security</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">lock</span>
                  <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Change Password</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </li>
              <li className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">shield</span>
                  <span className="font-body-md text-body-md group-hover:text-primary transition-colors">Two-Factor Auth</span>
                </div>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase">Enabled</span>
              </li>
              <li className="flex items-center justify-between cursor-pointer group mt-6 pt-4 border-t border-surface-container">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error opacity-70 group-hover:opacity-100 transition-opacity">delete_forever</span>
                  <span className="font-body-md text-body-md text-error opacity-70 group-hover:opacity-100 transition-opacity">Deactivate Account</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary Section: Recent Stay Memory */}
      <section className="mt-xl">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-md">Your Recent Journeys</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="bg-surface-container rounded-xl overflow-hidden group cursor-pointer border border-outline-variant">
            <div className="h-48 overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLdzOSDC_FC5e3irXnvit1Vop3hZ9J5Tb3OOZrp1UgEwTpStqZqYSW2Da9WmKquZ_FjSMhSshUCBIYJgeY8xBpQmxKB7nxHdRPauxA_3BJbfQlsU7DZOlkMU0qvDLi04MSnEKQGWlQsY-YLZTyJnhI8cddS9_4_maWXA03d-TJKKp8KE8pIFbXmu0VYBPv_eYCWIP-vyB4p6TLIVmDE-VANiL0ASXjZlfQCeudw1gI97rFbN899f2iO-x5a8LKB1_7f3AxkafqFQ1r"
                alt="Cedar Whispers Estate"
              />
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-label-md text-label-md text-primary">Cedar Whispers Estate</h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">May 2023</span>
              </div>
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-sm text-label-sm">Reviewed</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container rounded-xl overflow-hidden group cursor-pointer border border-outline-variant">
            <div className="h-48 overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkkW3eKTMeE3dQ9rZ2oNjd8p1JAsogfwMjdUiq_TDzBNoWO1x-KXOjdyCrpQ29F0QgQvmy7FLwqjMNepoayK3bhIPaH-orPyIN7esX8D4AuVrkfYMpTf1RjFE5lf4mr65JuwEbYsp3bsqBrW3LGORIYyaARM1b0aL3zyc4jnJLfxsqcwia5nAPXHTOdN30T8D49OdOjTgBlAInB4EBQPdBc5dmOWSvPVm0foh1DMV3aZumbjoD706wz8D8s0ZY3wLIsKTvSX1UbvB9"
                alt="Nomad's Retreat"
              />
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-label-md text-label-md text-primary">Nomad's Retreat, Kaza</h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Dec 2023</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">rate_review</span>
                <span className="font-label-sm text-label-sm">Add a Review</span>
              </div>
            </div>
          </div>
          <div className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-lg group hover:bg-surface-container transition-all cursor-pointer min-h-[266px]">
            <span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform">add_circle</span>
            <p className="font-label-md text-label-md text-primary">Plan a New Journey</p>
            <p className="font-body-md text-body-md text-on-surface-variant text-center mt-1">Discover hidden peaks</p>
          </div>
        </div>
      </section>
    </main>
  );
}
