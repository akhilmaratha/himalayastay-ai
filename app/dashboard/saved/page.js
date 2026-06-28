"use client";

import React, { useState } from 'react';

function SavedStayCard({ 
  imageSrc, 
  location, 
  title, 
  rating, 
  reviews, 
  details, 
  price 
}) {
  const [liked, setLiked] = useState(true);

  return (
    <div className="group relative flex flex-col bg-surface rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)] border border-[#E5E0DA] transition-all hover:-translate-y-1">
      <div className="relative h-[420px] overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src={imageSrc} 
          alt={title}
        />
        <div className="absolute top-4 right-4 z-10">
          <button 
            className={`w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center transition-all ${liked ? 'text-error' : 'text-secondary'} active:scale-125`} 
            onClick={() => setLiked(!liked)}
          >
            <span className="material-symbols-outlined" style={liked ? { fontVariationSettings: "'FILL' 1" } : { fontVariationSettings: "'FILL' 0" }}>favorite</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/60 to-transparent">
          <span className="text-white/90 font-label-sm uppercase tracking-widest">{location}</span>
          <h3 className="font-display-md text-white text-[28px] mt-1">{title}</h3>
        </div>
      </div>
      <div className="p-6 flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-secondary">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-label-md">{rating} ({reviews} reviews)</span>
          </div>
          <p className="text-on-surface-variant font-body-md italic">{details}</p>
        </div>
        <div className="text-right">
          <span className="font-display-md text-primary text-[24px]">{price}</span>
          <span className="block text-on-surface-variant font-label-sm">/ night</span>
        </div>
      </div>
    </div>
  );
}

export default function SavedStays() {
  return (
    <main className="flex-1 w-full flex flex-col p-sm md:p-xl gap-xl pb-24 md:pb-xl">
      {/* Header Section */}
      <header className="mb-lg space-y-2">
        <h1 className="font-display-lg text-display-lg text-primary">Saved Stays</h1>
        <p className="text-on-surface-variant font-body-lg max-w-2xl">
          A curated collection of your favorite mountain escapes and boutique homestays across the Himalayan range.
        </p>
      </header>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-xl">
        <div className="flex items-center gap-3">
          <span className="bg-surface-container-high px-4 py-2 rounded-full font-label-md flex items-center gap-2 cursor-pointer border border-outline-variant hover:bg-surface-dim transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            All Regions
          </span>
          <span className="bg-surface-container-high px-4 py-2 rounded-full font-label-md flex items-center gap-2 cursor-pointer border border-outline-variant hover:bg-surface-dim transition-colors">
            Price Range
          </span>
        </div>
        <div className="text-on-surface-variant font-label-md">
          8 Properties Saved
        </div>
      </div>

      {/* Bento/Editorial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8">
        <SavedStayCard 
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBzTTkaBcJmOoiMQyfeCsO7_vYSqjkv35Mhan9CJecU_uqxVEB57ZPnZia_tHpcCfW0uRmKstlQKwxbyHbNigF2TPQsBv5xHg66k_9qd6ycjBupeTmXm6vpNOoEzrvb5O3XfZcQYh1x3yOAeJSiSFMR-7HHJ7CHJ2nez1SiWJXKrJ-8sNg5G0UihLO1f7u30ku9CCRTngMq9PE4khWPa1oS2jEAFy7WIq4yH3Ju3L7oiaH493fwRqJNo9lkbmzVPrHkp99HWpj-NFtj"
          location="Uttarakhand, India"
          title="Cloud Mist Villa"
          rating="4.9"
          reviews="124"
          details="Entire luxury lodge • 3 Bedrooms"
          price="₹18,500"
        />
        <SavedStayCard 
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDOXQdQhBicQVfwCBmMa1_TM8kHCx4M8NjhcLi8QJTb7JxytXCt4_KzWFYCtYQptLs-2q3cHayXof6R9thTvR27OiECu8syBVkum57y9JiDBL_xpQ2P7vftCyVcKZQThPr0zsBYI_V8R1Ib5KJwzwcygIo2eDJJ1FzZ8hbWbYJBvcn3hAr632a7S3sGCx0COaXm_sl96QoTD9Wb6t9qWa1nTsqo63VNzzNyRbNgDdAklumzGPfELqa5ZnK_9qR6dR3CNh4Etzd1L_Am"
          location="Himachal Pradesh"
          title="Cedar Hearth Cabin"
          rating="4.8"
          reviews="89"
          details="Private forest retreat • 1 Bedroom"
          price="₹12,200"
        />
        <SavedStayCard 
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAXpnHwUUOz092Md1rI7SAsL5AF-g7LZVJ8n36CRlIM8DC2KJXBqY76X3DCzjzbk2SXMpKJhcwd4azbvEA2dgwecKrgsDuFTI_DF2w7HHB8PkhxwP59MS1jcCH8DB7aCGifobB9BAZog_iDekuhIHW4lR7hOtlJ3D3wWtkBNDkgXq5CbsT4oIPp7MlclZKFNE-ZRiOHzGay2-RRhb1fMTwIK-lq-gOIcynQ-6Fs7DreHrfwN3uNM_tqYneuVXzcnCxe7LVQjv0jufpS"
          location="Leh, Ladakh"
          title="Stone River House"
          rating="5.0"
          reviews="42"
          details="Heritage stay • 2 Bedrooms"
          price="₹15,000"
        />
        <SavedStayCard 
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCrO2Pq_-tIe1euUFlEodwzrMycZbRYQA2se0arpH0sCrHSIYOuV-rB-_FMA-GRe3FYo8iR3syRzlZOOEKtRKwoBKpD2Fgpnc9-vEvsFfSb9hQWKVrxzW9Xg-Dk8jG_ZltdRjJlJ0JB_rE-YwcEmaakmTgcQV74HyDWlmxe64WogU1DWFitW8J44HoROqJk7CwThNJujAuUJ_WE2QyGJ2l4tq96n8WAkL7mjOME9ynjn0pXrqS5DtaEsDOjmO4Nm0Ibcco2fPQMNiuj"
          location="Darjeeling, West Bengal"
          title="The Tea Glasshouse"
          rating="4.9"
          reviews="210"
          details="Eco-studio • 1 Bedroom"
          price="₹9,800"
        />
      </div>
    </main>
  );
}
