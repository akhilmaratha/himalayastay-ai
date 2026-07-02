"use client";
import React, { useState } from 'react';

export default function PropertyProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to update profile');
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .input-underline {
            border-bottom: 1px solid #c2c8c2; /* outline-variant */
        }
        .input-underline:focus-within {
            border-bottom-color: #173124; /* primary */
        }
        
        /* Level 1 Card Shadow */
        .shadow-level-1 {
            box-shadow: 0 4px 12px rgba(23, 49, 36, 0.02); /* Using primary color for tint */
            border: 1px solid #e5e2e1; /* surface-variant */
        }
      `}} />
      <div className="px-sm md:px-md lg:px-xl max-w-container-max mx-auto w-full overflow-x-hidden pb-xl">
        {/* Page Header */}
        <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Property Profile</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage how your homestay appears to guests across platforms.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-lg border border-outline text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors duration-200">
              View Live Listing
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors duration-200 shadow-sm"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-xl">
            {/* Basic Information Card */}
            <section className="bg-surface shadow-level-1 rounded-xl p-md md:p-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Basic Information</h3>
              </div>
              <div className="space-y-6">
                <div className="group input-underline pb-2 relative">
                  <label className="font-label-sm text-label-sm text-outline group-focus-within:text-primary transition-colors">Homestay Name</label>
                  <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-on-surface mt-1 placeholder:text-outline-variant" type="text" defaultValue="The Whispering Pines Homestay" />
                </div>
                <div className="group input-underline pb-2 relative">
                  <label className="font-label-sm text-label-sm text-outline group-focus-within:text-primary transition-colors">Tagline / Short Description</label>
                  <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-on-surface mt-1 placeholder:text-outline-variant" type="text" defaultValue="A serene retreat amidst the Deodar forests." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group input-underline pb-2 relative">
                    <label className="font-label-sm text-label-sm text-outline group-focus-within:text-primary transition-colors">Contact Number</label>
                    <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-on-surface mt-1 placeholder:text-outline-variant" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="group input-underline pb-2 relative">
                    <label className="font-label-sm text-label-sm text-outline group-focus-within:text-primary transition-colors">Support Email</label>
                    <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-on-surface mt-1 placeholder:text-outline-variant" type="email" defaultValue="hello@whisperingpines.com" />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Story & Description */}
            <section className="bg-surface shadow-level-1 rounded-xl p-md md:p-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface">The Story</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-surface-container-low rounded-lg p-4 border border-surface-variant focus-within:border-primary transition-colors">
                  <label className="font-label-sm text-label-sm text-outline mb-2 block">Full Description</label>
                  <textarea className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-on-surface resize-none" rows={6} defaultValue={"Nestled in the heart of the Himalayas, The Whispering Pines offers an authentic homestay experience combined with modern comforts. Our ancestral home has been carefully restored to preserve traditional Kath Kuni architecture while providing guests with spacious, warm rooms overlooking the valley.\n\nWake up to the sound of local birds, enjoy farm-to-table meals prepared with organic ingredients from our garden, and spend evenings around the 'bukhari' (traditional heater) sharing stories."}></textarea>
                </div>
                <div className="bg-surface-container-low rounded-lg p-4 border border-surface-variant focus-within:border-primary transition-colors">
                  <label className="font-label-sm text-label-sm text-outline mb-2 block">About The Hosts</label>
                  <textarea className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-on-surface resize-none" rows={4} defaultValue={"We are the Sharma family, locals of this valley for generations. Raj manages the farm and treks, while Sunita creates culinary magic in the kitchen. We love sharing our culture and the hidden trails of the region with our guests."}></textarea>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Forms */}
          <div className="lg:col-span-4 space-y-xl">
            {/* Location Settings */}
            <section className="bg-surface shadow-level-1 rounded-xl p-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Location Map</h3>
              </div>
              <div className="aspect-video bg-surface-container rounded-lg mb-4 overflow-hidden relative">
                <img alt="Map view of homestay location" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_WQ6GnmTmPLceuKWQANkbRTOdxenGlPe4W9WexTsS_LEiLqIucx7Hvq11iFMThdVKyUOeDAWJWPyYyv4-hwH6kCwCoPqW-05JI862PijBd4P0ZCa4XcZa8hRQQGs-wYG_r2eg8JzIzSmYjmVd2OZXZ07q1VQadC94FsZHSNAmAVMBrUe7G7YKWA1Naw5XkAWG6uakn1fukW_s1jGeeSNOY69B1jofKAaUf3NQSwCUgMgUPUVn-ZkohbNt09nO9yYljBC-qUHYlT5m" />
                <div className="absolute inset-0 bg-linear-to-t from-surface/50 to-transparent"></div>
                <button className="absolute bottom-4 right-4 bg-surface text-primary px-3 py-1.5 rounded-md font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-colors">Edit Pin</button>
              </div>
              <div className="group input-underline pb-2 relative">
                <label className="font-label-sm text-label-sm text-outline group-focus-within:text-primary transition-colors">Full Address</label>
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-on-surface mt-1" type="text" defaultValue="Village Vashisht, Near Hot Springs, Manali, HP 175131" />
              </div>
            </section>
            
            {/* Amenities Checklist */}
            <section className="bg-surface shadow-level-1 rounded-xl p-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">done_all</span>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Facilities</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-md cursor-pointer transition-colors">
                  <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md text-on-surface">High-Speed WiFi</span>
                </label>
                <label className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-md cursor-pointer transition-colors">
                  <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md text-on-surface">Free Parking on Premises</span>
                </label>
                <label className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-md cursor-pointer transition-colors">
                  <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md text-on-surface">Home-cooked Meals (On Order)</span>
                </label>
                <label className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-md cursor-pointer transition-colors">
                  <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md text-on-surface">Pet Friendly</span>
                </label>
                <label className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-md cursor-pointer transition-colors">
                  <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md text-on-surface">Heater / Bukhari</span>
                </label>
                <label className="flex items-center gap-3 p-2 hover:bg-surface-container-low rounded-md cursor-pointer transition-colors">
                  <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md text-on-surface">Washing Machine</span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
