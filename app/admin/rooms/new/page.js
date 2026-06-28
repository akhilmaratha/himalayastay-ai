"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AddNewStay() {
  const [step, setStep] = useState(1);
  const [activeAmenities, setActiveAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState('Homestay');

  const toggleAmenity = (amenity) => {
    setActiveAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const amenitiesList = [
    { id: 'wifi', icon: 'wifi', label: 'WiFi' },
    { id: 'fireplace', icon: 'fireplace', label: 'Fireplace' },
    { id: 'heating', icon: 'ac_unit', label: 'Heating' },
    { id: 'balcony', icon: 'balcony', label: 'Private Balcony' },
    { id: 'coffee', icon: 'coffee_maker', label: 'Tea/Coffee Maker' },
    { id: 'view', icon: 'mountain_flag', label: 'Valley View' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .step-active { color: var(--tw-colors-primary, #173124); font-weight: 700; }
        .ambient-shadow { box-shadow: 0 4px 20px -2px rgba(45, 71, 57, 0.05); }
        .tonal-row:nth-child(even) { background-color: rgba(246, 243, 242, 0.5); }
        input:focus ~ label, input:not(:placeholder-shown) ~ label,
        select:focus ~ label, select:valid ~ label {
            transform: translateY(-1.5rem) scale(0.85);
            color: var(--tw-colors-primary, #173124);
        }
      `}} />

      <div className="flex justify-between items-center mb-xl">
        <h2 className="font-display-md text-headline-lg text-primary">New Stay</h2>
        <div className="flex items-center gap-md">
          <button className="px-md py-xs rounded-full border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-high transition-colors">
            Save Draft
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-xl">
        {/* Step Progress Sidebar (Task-Specific) */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-28 flex flex-col gap-lg">
            <div className="space-y-md">

              {/* Step 1 */}
              <div
                className="flex items-center gap-md group cursor-pointer"
                onClick={() => setStep(1)}
              >
                {step > 1 ? (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md">1</div>
                )}
                <div>
                  <p className={step > 1 ? "text-on-surface-variant font-label-sm uppercase tracking-wider" : "text-primary font-label-sm uppercase tracking-wider"}>Step 1</p>
                  <p className={step === 1 ? "font-headline-lg-mobile text-primary font-bold" : "font-label-md text-on-surface-variant"}>Basic Information</p>
                </div>
              </div>

              <div className="w-px h-8 bg-outline-variant ml-4"></div>

              {/* Step 2 */}
              <div
                className={`flex items-center gap-md ${step >= 2 ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                onClick={() => step >= 2 && setStep(2)}
              >
                {step > 2 ? (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                ) : step === 2 ? (
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md">2</div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center text-outline">2</div>
                )}
                <div>
                  <p className={step === 2 ? "text-primary font-label-sm uppercase tracking-wider" : "text-outline font-label-sm uppercase tracking-wider"}>Step 2</p>
                  <p className={step === 2 ? "font-headline-lg-mobile text-primary font-bold" : "font-label-md text-outline"}>Room Details</p>
                </div>
              </div>

              <div className="w-px h-8 bg-outline-variant ml-4"></div>

              {/* Step 3 */}
              <div
                className={`flex items-center gap-md ${step >= 3 ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                onClick={() => step >= 3 && setStep(3)}
              >
                {step > 3 ? (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                ) : step === 3 ? (
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md">3</div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center text-outline">3</div>
                )}
                <div>
                  <p className={step === 3 ? "text-primary font-label-sm uppercase tracking-wider" : "text-outline font-label-sm uppercase tracking-wider"}>Step 3</p>
                  <p className={step === 3 ? "font-headline-lg-mobile text-primary font-bold" : "font-label-md text-outline"}>Gallery</p>
                </div>
              </div>

              <div className="w-px h-8 bg-outline-variant ml-4"></div>

              {/* Step 4 */}
              <div
                className={`flex items-center gap-md ${step >= 4 ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                onClick={() => step >= 4 && setStep(4)}
              >
                {step > 4 ? (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                ) : step === 4 ? (
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md">4</div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center text-outline">4</div>
                )}
                <div>
                  <p className={step === 4 ? "text-primary font-label-sm uppercase tracking-wider" : "text-outline font-label-sm uppercase tracking-wider"}>Step 4</p>
                  <p className={step === 4 ? "font-headline-lg-mobile text-primary font-bold" : "font-label-md text-outline"}>Pricing &amp; Policies</p>
                </div>
              </div>
            </div>

            <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/50 shadow-sm mt-lg">
              <p className="text-label-sm text-on-surface-variant mb-xs italic text-center">&quot;Every great journey begins with a single step.&quot;</p>
            </div>
          </div>
        </aside>

        {/* Form Content */}
        <section className="grow max-w-3xl">

          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-xl">
                <span className="text-secondary font-bold text-label-md uppercase tracking-wider mb-base block">Step 01</span>
                <h1 className="font-display-lg text-display-lg text-primary mb-sm">Basic Information</h1>
                <p className="text-body-lg text-on-surface-variant max-w-2xl">Start your listing by sharing the fundamental character of your sanctuary. This helps guests understand the essence of their future stay.</p>
              </div>

              {/* Form Card */}
              <form className="space-y-xl bg-surface/50 backdrop-blur-sm p-xl rounded-xl shadow-sm border border-outline-variant/30">
                {/* Property Name */}
                <div className="space-y-xs">
                  <label className="block font-label-md text-primary">Property Name</label>
                  <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-md px-0 focus:ring-0 focus:border-primary transition-all text-body-lg text-on-surface placeholder:text-outline-variant/60" placeholder="e.g., The Cedar Mist Retreat" type="text" />
                  <p className="text-label-sm text-on-surface-variant italic">Create a name that evokes the local landscape or heritage.</p>
                </div>

                {/* Property Type Bento Grid Select */}
                <div className="space-y-md">
                  <label className="block font-label-md text-primary">Property Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    <button
                      className={`group flex flex-col items-center justify-center p-xl bg-surface-container-low rounded-xl transition-all ${propertyType === 'Boutique Stay' ? 'border-2 border-primary shadow-md' : 'border-2 border-transparent hover:bg-surface-container-high'}`}
                      onClick={() => setPropertyType('Boutique Stay')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-display-md text-secondary mb-xs group-hover:scale-110 transition-transform">villa</span>
                      <span className="font-label-md text-primary">Boutique Stay</span>
                    </button>
                    <button
                      className={`group flex flex-col items-center justify-center p-xl bg-surface-container-low rounded-xl transition-all ${propertyType === 'Homestay' ? 'border-2 border-primary shadow-md' : 'border-2 border-transparent hover:bg-surface-container-high'}`}
                      onClick={() => setPropertyType('Homestay')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-display-md text-secondary mb-xs group-hover:scale-110 transition-transform">house</span>
                      <span className="font-label-md text-primary">Homestay</span>
                    </button>
                    <button
                      className={`group flex flex-col items-center justify-center p-xl bg-surface-container-low rounded-xl transition-all ${propertyType === 'Eco-Lodge' ? 'border-2 border-primary shadow-md' : 'border-2 border-transparent hover:bg-surface-container-high'}`}
                      onClick={() => setPropertyType('Eco-Lodge')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-display-md text-secondary mb-xs group-hover:scale-110 transition-transform">nature_people</span>
                      <span className="font-label-md text-primary">Eco-Lodge</span>
                    </button>
                  </div>
                </div>

                {/* Description (Simulated Rich Text) */}
                <div className="space-y-xs">
                  <label className="block font-label-md text-primary">Description</label>
                  <div className="bg-surface-container-low/50 rounded-xl overflow-hidden border border-outline-variant/30">
                    <div className="flex items-center gap-sm p-sm bg-surface-container-low border-b border-outline-variant/30">
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary" type="button">format_bold</button>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary" type="button">format_italic</button>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary" type="button">list</button>
                      <div className="w-px h-6 bg-outline-variant mx-xs"></div>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary" type="button">link</button>
                    </div>
                    <textarea className="w-full bg-transparent border-0 focus:ring-0 p-md text-body-md text-on-surface placeholder:text-outline-variant/60 resize-none" placeholder="Describe the soul of your stay. Talk about the morning light, the local breakfast, and the surrounding trails..." rows="6"></textarea>
                  </div>
                </div>

                {/* Location Bento Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  <div className="space-y-xs">
                    <label className="block font-label-md text-primary">Location</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline-variant">location_on</span>
                      <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-md pl-8 pr-0 focus:ring-0 focus:border-primary transition-all text-body-md text-on-surface placeholder:text-outline-variant/60" placeholder="Start typing your address..." type="text" />
                    </div>
                  </div>
                  {/* Small Map Preview Placeholder */}
                  <div className="h-40 rounded-xl overflow-hidden relative border border-outline-variant/30 group cursor-pointer">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyX3huiFcGnHgQcuSSeg8qPx82FENhCCy5ddBB0IKSujVSRZcE-yfmTJIEOxVxqBkstYhanO4APg83LTCBDYuFPDMpjmNaEgTqSzhuWNaZntczL8EiAuTKLiTCdSZ04hDxnl01uOglnrOMq3tys8cDtqhgp0FbI4qcNQOLACBz2AVmKNPIyZsLvW_PY8d9GiBa2ex9LnjDvBQusFQCtn3JqyUa7klqbHO4viI3XjdIaOOxdLGZeDfBUT-74jKH5iH9xGW0xxL6HDQm')" }}>
                    </div>
                    <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                    <div className="absolute bottom-sm right-sm bg-surface-container-lowest/90 px-md py-xs rounded-full text-label-sm shadow-sm flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span> Expand Map
                    </div>
                  </div>
                </div>

                {/* Navigation Action */}
                <div className="pt-xl border-t border-outline-variant/30 flex justify-end">
                  <button
                    className="group flex items-center gap-md px-xl py-md bg-primary text-on-primary rounded-full font-bold transition-all hover:shadow-xl active:scale-95"
                    type="button"
                    onClick={() => setStep(2)}
                  >
                    Continue to Room Details
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-xl">
                <span className="text-secondary font-bold text-label-md uppercase tracking-wider mb-base block">Step 02</span>
                <h3 className="font-display-md text-display-md text-primary mb-xs">Configure Your Rooms</h3>
                <p className="text-on-surface-variant text-body-lg">Tell us about the different sleeping arrangements available at your property. You can add multiple room types.</p>
              </div>

              {/* Room Input Form */}
              <div className="bg-surface/70 backdrop-blur-md rounded-xl border border-outline-variant/30 p-md lg:p-xl shadow-sm hover:shadow-md transition-shadow mb-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  {/* Room Name */}
                  <div className="relative col-span-2 group">
                    <input
                      className="peer w-full bg-transparent border-b border-outline-variant px-0 py-md focus:outline-none focus:border-primary transition-all text-body-md placeholder-transparent"
                      id="room_name"
                      placeholder=" "
                      type="text"
                    />
                    <label
                      className="absolute left-0 top-md text-on-surface-variant pointer-events-none transition-all font-label-md peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-primary peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-85"
                      htmlFor="room_name"
                    >
                      Room Name (e.g., &apos;Master Suite&apos;, &apos;Attic Nook&apos;)
                    </label>
                  </div>

                  {/* Max Guests */}
                  <div className="relative">
                    <select
                      className="peer w-full bg-transparent border-b border-outline-variant px-0 py-md focus:outline-none focus:border-primary appearance-none text-body-md"
                      id="max_guests"
                      defaultValue=""
                    >
                      <option disabled value="">Max Guests</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4+ People</option>
                    </select>
                    <span className="absolute right-0 top-md material-symbols-outlined pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>

                  {/* Bed Type */}
                  <div className="relative">
                    <select
                      className="peer w-full bg-transparent border-b border-outline-variant px-0 py-md focus:outline-none focus:border-primary appearance-none text-body-md"
                      id="bed_type"
                      defaultValue=""
                    >
                      <option disabled value="">Bed Type</option>
                      <option value="king">King Size</option>
                      <option value="queen">Queen Size</option>
                      <option value="twin">Twin Beds</option>
                      <option value="bunk">Bunk Beds</option>
                    </select>
                    <span className="absolute right-0 top-md material-symbols-outlined pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>

                  {/* Amenities */}
                  <div className="col-span-2">
                    <p className="font-label-md text-on-surface-variant mb-md">Amenities</p>
                    <div className="flex flex-wrap gap-sm">
                      {amenitiesList.map((amenity) => {
                        const isActive = activeAmenities.includes(amenity.id);
                        return (
                          <button
                            key={amenity.id}
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`px-md py-xs rounded-full border transition-all flex items-center gap-xs text-label-md group ${isActive ? 'bg-primary-container text-on-primary-container border-primary' : 'border-outline-variant hover:border-primary hover:text-primary'}`}
                            type="button"
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              {amenity.icon}
                            </span>
                            {amenity.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-xl flex justify-end">
                  <button className="flex items-center gap-xs bg-primary-fixed/20 text-primary-fixed-variant hover:bg-primary-fixed hover:text-on-primary-fixed px-xl py-md rounded-lg font-label-md transition-colors border border-primary/10">
                    <span className="material-symbols-outlined">add</span>
                    Add Room Type
                  </button>
                </div>
              </div>

              {/* Summary List */}
              <div className="mb-xl">
                <div className="flex items-center justify-between mb-md">
                  <h4 className="font-headline-lg text-primary">Added Rooms</h4>
                  <span className="text-label-sm text-on-surface-variant px-md py-base bg-surface-container-low rounded-full border border-outline-variant/30">2 Rooms Configured</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface/50 backdrop-blur-sm shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low/50 border-b border-outline-variant/30">
                      <tr>
                        <th className="p-md font-label-md text-on-surface-variant">Room Name</th>
                        <th className="p-md font-label-md text-on-surface-variant">Capacity</th>
                        <th className="p-md font-label-md text-on-surface-variant">Bedding</th>
                        <th className="p-md font-label-md text-on-surface-variant text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      <tr className="tonal-row group hover:bg-surface-container-lowest transition-colors">
                        <td className="p-md font-body-md font-semibold text-primary">Master Pine Suite</td>
                        <td className="p-md text-on-surface-variant">2 Guests</td>
                        <td className="p-md text-on-surface-variant">1 King Bed</td>
                        <td className="p-md text-right">
                          <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-xs text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                            <button className="p-xs text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                          </div>
                        </td>
                      </tr>
                      <tr className="tonal-row group hover:bg-surface-container-lowest transition-colors">
                        <td className="p-md font-body-md font-semibold text-primary">The Attic Nook</td>
                        <td className="p-md text-on-surface-variant">1 Guest</td>
                        <td className="p-md text-on-surface-variant">1 Twin Bed</td>
                        <td className="p-md text-right">
                          <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-xs text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                            <button className="p-xs text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-xl border-t border-outline-variant/30">
                <button
                  className="flex items-center gap-xs px-xl py-md text-on-surface-variant font-label-md hover:bg-surface-container-high rounded-lg transition-all"
                  onClick={() => setStep(1)}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back
                </button>
                <button
                  className="flex items-center gap-xs bg-primary text-on-primary px-xl py-md rounded-lg font-label-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
                  onClick={() => setStep(3)}
                >
                  Continue to Gallery
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-xl">
                <span className="text-secondary font-bold text-label-md uppercase tracking-wider mb-base block">Step 03</span>
                <h3 className="font-display-md text-display-md text-primary mb-xs">Property Gallery</h3>
                <p className="text-on-surface-variant text-body-lg">Upload high-resolution photos that showcase the atmosphere and details of your property.</p>
              </div>

              {/* Content Area: Bento Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
                {/* Upload Zone (Main Bento Item) */}
                <div className="col-span-1 lg:col-span-8">
                  <div
                    className="border-2 border-dashed border-outline-variant bg-surface/50 backdrop-blur-sm rounded-xl p-xl flex flex-col items-center justify-center min-h-[320px] transition-all duration-300 group hover:border-primary cursor-pointer hover:bg-surface-container-low"
                  >
                    <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-display-md">cloud_upload</span>
                    </div>
                    <h3 className="font-headline-lg text-headline-lg text-primary mb-xs text-center">Drag and drop high-res photos</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-md">
                      Upload at least 5 photos for a complete gallery. Recommended size: 2400x1600px. Supports JPG, PNG.
                    </p>
                    <button className="mt-lg px-xl py-md bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-sm">
                      Select Files from Device
                    </button>
                  </div>

                  {/* Photo Grid Section */}
                  <div className="mt-xl">
                    <div className="flex justify-between items-center mb-md">
                      <h4 className="font-headline-lg text-headline-lg text-primary">Manage Photos (5)</h4>
                      <div className="flex gap-xs">
                        <button className="p-xs text-primary transition-colors">
                          <span className="material-symbols-outlined">grid_view</span>
                        </button>
                        <button className="p-xs text-on-surface-variant/40 hover:text-on-surface-variant transition-colors">
                          <span className="material-symbols-outlined">list</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
                      {/* Cover Photo (Priority Item) */}
                      <div className="relative group aspect-4/3 rounded-xl overflow-hidden shadow-sm border-2 border-primary">
                        <div className="absolute top-sm left-sm bg-primary text-on-primary px-sm py-xs rounded-full font-label-sm text-label-sm flex items-center gap-xs z-10">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          Cover Photo
                        </div>
                        <div className="absolute top-sm right-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-error hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div
                          className="w-full h-full bg-surface-dim bg-cover bg-center"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCA31aIItzKtbxHeB-sg6QhrGeW5SLX3HxBe8eRgnRC63RprKc6w2xcAXD334S6wBPSX-VDCQ3G71PQxrcrawhTHO9b8phF5w9ZA6IgitP6L2oZ0kQ3kL3F0FCEBa3eGgIJbkWVcCMobWI9RPzXv9wGBmas6IQkjYNjtDcLcZX59aPNw5w_VD1RAxjk2gI-_rg0ziUMF8D4Zxt8OD4nKzTP_vWEjVGQFB-cA4DQC2ibhXKVOJ5tWLvbCIQt283-yppwO5oxM2G27BAw')" }}
                        ></div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      </div>

                      {/* Photo 2 */}
                      <div className="relative group aspect-4/3 rounded-xl overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant/30">
                        <div className="absolute top-sm right-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-xs">
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm" title="Set as Cover">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </button>
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-error hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div
                          className="w-full h-full bg-surface-dim bg-cover bg-center"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAha7GZOC_q0-yeX5kGClph8d7vCeDA3iFHXPePd-ub4bdoJUMbapv8aPBM_fYQRekccRj4zLK2iJtzQFNLGSSt2hPxiSINhkBm6pv7ELwbS4QnMuwomOe7nG-j6qhCqYHHgrqu3rL7AnaSiDOQWSn8x6Z0GlDLmpkRSqmu8McE3eyAfui3ERcwqBQJuyoqKt9YK2iIpuZIHBPsZd65V0lJ4HUd53KYHNu20NjlfDyVio2Zk1w-D99FRh4lQO_y_CBCwBf2I8DIKdz')" }}
                        ></div>
                      </div>

                      {/* Photo 3 */}
                      <div className="relative group aspect-4/3 rounded-xl overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant/30">
                        <div className="absolute top-sm right-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-xs">
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </button>
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-error hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div
                          className="w-full h-full bg-surface-dim bg-cover bg-center"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDejxEKzCqbbRHGHTK8-zJpRPNsIiHm9tFxNTIkkCS_xX7IqHh9J5Vv-WHzY5MVW6S3UH0ZmwjgMXgDXkKjwF3YGNGzNz06-whT1NPz8qH4DvXdnnAI8W7bYR7-rgaKosnEp1ZCtSZ_6fhKpbScHQqvtDKwO4EfbQODJhtVP631HDrObrO_pIgTe7yKbmG7E9YctZ3W8rMIGbE7P18E0JiFhXAhl6W_XS6DdPYAsSHNnddJG0voj1jl4Ehsngxw57XfmBdhyKYQsgKK')" }}
                        ></div>
                      </div>

                      {/* Photo 4 */}
                      <div className="relative group aspect-4/3 rounded-xl overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant/30">
                        <div className="absolute top-sm right-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-xs">
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </button>
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-error hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div
                          className="w-full h-full bg-surface-dim bg-cover bg-center"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxi4wCj2mhYu5F7fUcg-aTWZ0LRKFD70Ml3ldX9J2OBf2qXQcXrs4x6E_Ezhbc3DCr26sSkJmjyRR7LstEP8gFAAPU5RP5tlS8tjBChqNt7qRu4oRb1UGoInLABCdl8RccxTzt9afuNiy6GjlNgoYRpSKethFr2tjLGK-djrsCr-WQjF5lC1Ufx3Pbh9DKwACRY9x2fA_ctk6JyAlLLn6FHFPPFPhj2ervNah9xu67ycmr1rSPf7rPIEIc7pDnRrjndevmqhGkJwCM')" }}
                        ></div>
                      </div>

                      {/* Photo 5 */}
                      <div className="relative group aspect-4/3 rounded-xl overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant/30">
                        <div className="absolute top-sm right-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-xs">
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </button>
                          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-error hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div
                          className="w-full h-full bg-surface-dim bg-cover bg-center"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9tLPFi5uPfIh6Y5TdsfFX03HST1cg7qiKBWqVe-GvUQ7SADndqSomhs1d7l06918ortPxxWHLyseBHtmknJrhKkmt6ms7Xhf-I_pmxSyWIRSDFXZwHNx25UfvlNbl9gclxh9UKMQpeiDqgARb3HZCD7WgTOLKphKSzE0RGlUXa5RKNSCaTQeU7TkVNfCqn0lQ8UOeAQTkdmP9DJmWn_e9l-TevH_sKLZR21zdflsns1IQ3wiiycEby0AQ7RtsmuW5VD0TmsYVG6fj')" }}
                        ></div>
                      </div>

                      {/* Add More Placeholder */}
                      <div className="relative aspect-4/3 rounded-xl border-2 border-dashed border-outline-variant/50 bg-surface/30 flex flex-col items-center justify-center hover:border-primary hover:bg-surface-container transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-primary/40 text-[32px] mb-xs">add_a_photo</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Add more</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guidelines & Tips (Secondary Bento Item) */}
                <div className="col-span-1 lg:col-span-4 space-y-md">
                  <div className="bg-surface/50 backdrop-blur-sm p-md rounded-xl border border-outline-variant/30 shadow-sm">
                    <div className="flex items-center gap-sm mb-md">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                      <h5 className="font-label-md text-label-md text-primary uppercase tracking-wider">Expert Tips</h5>
                    </div>
                    <ul className="space-y-md">
                      <li className="flex gap-sm">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Properties with more than 15 photos receive 40% more bookings.</p>
                      </li>
                      <li className="flex gap-sm">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Shoot during the &apos;Golden Hour&apos; for that warm, serene Himalayan glow.</p>
                      </li>
                      <li className="flex gap-sm">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Include at least one shot of the surrounding landscape or garden.</p>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary p-md rounded-xl text-on-primary shadow-sm">
                    <h5 className="font-label-md text-label-md uppercase tracking-wider mb-sm opacity-80">Photo Standards</h5>
                    <div className="space-y-sm">
                      <div className="flex justify-between items-center text-label-sm">
                        <span>Landscape Orientation</span>
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      </div>
                      <div className="flex justify-between items-center text-label-sm">
                        <span>No Watermarks</span>
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      </div>
                      <div className="flex justify-between items-center text-label-sm">
                        <span>Minimum 2048px wide</span>
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-xl border-t border-outline-variant/30 mt-xl">
                <button
                  className="flex items-center gap-xs px-xl py-md text-on-surface-variant font-label-md hover:bg-surface-container-high rounded-lg transition-all"
                  onClick={() => setStep(2)}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back
                </button>
                <button
                  className="flex items-center gap-xs bg-primary text-on-primary px-xl py-md rounded-lg font-label-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
                  onClick={() => setStep(4)}
                >
                  Continue to Pricing
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-xl">
                <span className="text-secondary font-bold text-label-md uppercase tracking-wider mb-base block">Step 04</span>
                <h3 className="font-display-md text-display-md text-primary mb-xs">Pricing &amp; Policies</h3>
                <p className="text-on-surface-variant text-body-lg">Set your value and rules.</p>
              </div>

              <div className="space-y-xl">
                {/* Section 1: Pricing */}
                <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-xl shadow-sm border border-outline-variant/30">
                  <div className="flex items-center gap-sm mb-lg">
                    <span className="material-symbols-outlined text-primary">sell</span>
                    <h3 className="font-headline-lg text-headline-lg text-primary">Nightly Rates</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                    <div className="group">
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-xs group-focus-within:text-primary transition-colors">Base Nightly Rate (INR)</label>
                      <div className="relative">
                        <span className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">₹</span>
                        <input className="w-full pl-xl pr-md py-sm bg-transparent border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all font-display-md text-display-md text-primary" placeholder="4500" type="number" />
                      </div>
                      <p className="mt-xs font-label-sm text-label-sm text-on-surface-variant/70">Suggested for your location: ₹3,800 - ₹5,200</p>
                    </div>
                    <div className="flex flex-col justify-center bg-primary-container/10 p-md rounded-lg border border-primary-container/20">
                      <div className="flex items-center justify-between mb-xs">
                        <span className="font-label-md text-label-md text-primary">Est. Guest Price</span>
                        <span className="font-label-md text-label-md text-primary font-bold">₹5,040</span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span className="font-label-sm text-label-sm">Includes taxes &amp; fees</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Cancellation Policy */}
                <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-xl shadow-sm border border-outline-variant/30">
                  <div className="flex items-center gap-sm mb-lg">
                    <span className="material-symbols-outlined text-primary">event_busy</span>
                    <h3 className="font-headline-lg text-headline-lg text-primary">Cancellation Policy</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    {/* Flexible */}
                    <label className="relative cursor-pointer group">
                      <input defaultChecked className="peer sr-only" name="policy" type="radio" />
                      <div className="h-full p-md border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                        <h4 className="font-label-md text-label-md font-bold text-primary mb-xs">Flexible</h4>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Full refund 1 day prior to arrival. Most attractive to guests.</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    </label>
                    {/* Moderate */}
                    <label className="relative cursor-pointer group">
                      <input className="peer sr-only" name="policy" type="radio" />
                      <div className="h-full p-md border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                        <h4 className="font-label-md text-label-md font-bold text-primary mb-xs">Moderate</h4>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Full refund 5 days prior to arrival. Standard balance.</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    </label>
                    {/* Strict */}
                    <label className="relative cursor-pointer group">
                      <input className="peer sr-only" name="policy" type="radio" />
                      <div className="h-full p-md border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                        <h4 className="font-label-md text-label-md font-bold text-primary mb-xs">Strict</h4>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">50% refund up to 7 days before arrival. Maximum protection.</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Section 3: House Rules (Bento Grid Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-xl shadow-sm border border-outline-variant/30 flex flex-col">
                    <div className="flex items-center gap-sm mb-lg">
                      <span className="material-symbols-outlined text-primary">rule</span>
                      <h3 className="font-headline-lg text-headline-lg text-primary">House Rules</h3>
                    </div>
                    <div className="space-y-md flex-1">
                      <div className="flex items-center justify-between p-sm hover:bg-surface-container-high rounded-lg transition-colors group">
                        <div className="flex items-center gap-md">
                          <span className="material-symbols-outlined text-on-surface-variant">pets</span>
                          <span className="font-body-md text-body-md">Pets Allowed</span>
                        </div>
                        <input className="w-10 h-6 rounded-full bg-outline-variant border-none cursor-pointer checked:bg-primary transition-all appearance-none relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:left-5 before:transition-all" type="checkbox" />
                      </div>
                      <div className="flex items-center justify-between p-sm hover:bg-surface-container-high rounded-lg transition-colors group">
                        <div className="flex items-center gap-md">
                          <span className="material-symbols-outlined text-on-surface-variant">smoking_rooms</span>
                          <span className="font-body-md text-body-md">Smoking Allowed</span>
                        </div>
                        <input className="w-10 h-6 rounded-full bg-outline-variant border-none cursor-pointer checked:bg-primary transition-all appearance-none relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:left-5 before:transition-all" type="checkbox" />
                      </div>
                      <div className="flex items-center justify-between p-sm hover:bg-surface-container-high rounded-lg transition-colors group">
                        <div className="flex items-center gap-md">
                          <span className="material-symbols-outlined text-on-surface-variant">celebration</span>
                          <span className="font-body-md text-body-md">Parties / Events</span>
                        </div>
                        <input className="w-10 h-6 rounded-full bg-outline-variant border-none cursor-pointer checked:bg-primary transition-all appearance-none relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:left-5 before:transition-all" type="checkbox" />
                      </div>
                    </div>
                  </div>

                  {/* Summary Card (Editorial Sidebar Style) */}
                  <div className="bg-primary text-on-primary rounded-xl p-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
                    <div>
                      <h3 className="font-display-md text-display-md mb-md">Review &amp; Publish</h3>
                      <p className="font-body-md text-body-md opacity-80 mb-xl relative z-10">Your Himalayan sanctuary is almost ready to welcome guests from around the globe.</p>
                      <ul className="space-y-sm relative z-10">
                        <li className="flex items-start gap-md">
                          <span className="material-symbols-outlined text-secondary-container">verified</span>
                          <div>
                            <p className="font-label-md text-label-md">Cedar Crest Lodge</p>
                            <p className="font-label-sm text-label-sm opacity-60">Pahalgam, Jammu &amp; Kashmir</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-md">
                          <span className="material-symbols-outlined text-secondary-container">bed</span>
                          <div>
                            <p className="font-label-md text-label-md">3 Superior King Rooms</p>
                            <p className="font-label-sm text-label-sm opacity-60">High availability for Summer Season</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-md">
                          <span className="material-symbols-outlined text-secondary-container">photo_library</span>
                          <div>
                            <p className="font-label-md text-label-md">12 High-Res Images</p>
                            <p className="font-label-sm text-label-sm opacity-60">Gallery looks professional</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-xl pt-lg border-t border-on-primary/10 relative z-10">
                      <div className="flex items-center justify-between mb-md">
                        <span className="font-label-md text-label-md opacity-70">Visibility</span>
                        <span className="bg-secondary-container text-on-secondary-container px-sm py-[2px] rounded-full text-[10px] font-bold uppercase tracking-widest">Public</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-xl border-t border-outline-variant/30 mt-xl">
                <button
                  className="flex items-center gap-xs px-xl py-md text-on-surface-variant font-label-md hover:bg-surface-container-high rounded-lg transition-all"
                  onClick={() => setStep(3)}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back to Gallery
                </button>
                <Link href="/admin/rooms">
                  <button className="flex items-center gap-sm px-xl py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:scale-[1.02] active:scale-95 transition-all">
                    Publish Stay <span className="material-symbols-outlined">rocket_launch</span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
