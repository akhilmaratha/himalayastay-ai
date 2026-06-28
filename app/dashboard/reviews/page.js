"use client";

import React, { useState } from 'react';

export default function Reviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <main className="flex-1 w-full flex flex-col p-sm md:p-xl gap-xl pb-24 md:pb-xl">
      {/* Page Header */}
      <div className="mb-md">
        <span className="text-secondary font-label-md uppercase tracking-[0.2em] text-[12px]">Guest Feedback</span>
        <h1 className="font-display-lg text-display-lg text-primary mt-2">Reviews & Ratings</h1>
        <p className="text-on-surface-variant mt-4 max-w-2xl text-body-lg">Share your Himalayan journey. Your insights help our hosts maintain the spirit of mountain hospitality and guide fellow travelers.</p>
      </div>

      {/* Bento Layout: Recent Trips to Review */}
      <section className="mb-xl">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Recent Stays</h2>
          <span className="text-label-sm text-outline">Pending (2)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Pending Review Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)] hover:shadow-lg transition-all group flex flex-col">
            <div className="aspect-video mb-6 overflow-hidden rounded-lg">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBXApDfBvNN_7ZxC57c_EVufhTxCJ7stDyaGmpsKDv44zDK7eZeaDKmNgHgYuPHE5EztzAkK4hSZWdkftNdnkY2IEwmWEs1yqR0ejBzoKDehxgMpiMF3a_SBbPo7KAEgm-2b4tCcr5VUTrt0lAvIzm0ZX_uuiB_Ho85lL3Cna2hCRWXPYNfuM6F26dMNuMIw-UURse8gX34kHZMEjPlxlePa7d9qNVHvjNVPPZssTwngXaG27mpN1SwDUbb8yJEQBJlhWE2LMrUJ2F"
                alt="Cedar Shadow Retreat"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="font-headline-lg text-headline-lg text-primary">Cedar Shadow Retreat</h3>
              <p className="text-label-sm text-on-surface-variant mt-1 mb-4">Manali, Himachal Pradesh • Oct 12-15, 2023</p>
              <button 
                onClick={toggleModal}
                className="w-full py-4 mt-auto bg-primary text-on-primary font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-tertiary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
                Write a Review
              </button>
            </div>
          </div>

          {/* Pending Review Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)] hover:shadow-lg transition-all group flex flex-col">
            <div className="aspect-video mb-6 overflow-hidden rounded-lg">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBStKrLCdjlVSVM94h-dezst9ATJQmmsOOkxVKyP-kSI03jC3URfMWPKcEH4JRu_deqSFYVa4rVea1Om0Pn-ucdFU6lbQPW32ikKohfcfdRR1B2vxxy6u6_aYuKM2B3ZSBephVOg9FBz0WQjBQ52l6GB3peXqpcVTY3m5Qu_f4KiuUUAxbWzPPeWXyTrKClABzaV8zSaEZuFkq9cmp3FI32HInL8D4Px9Gpz_Q50dwDmusclg4eTmIoX5i7Y8e5nX4TQkIGBq4G9iGe"
                alt="Horizon Peaks Camp"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="font-headline-lg text-headline-lg text-primary">Horizon Peaks Camp</h3>
              <p className="text-label-sm text-on-surface-variant mt-1 mb-4">Leh, Ladakh • Sep 28-30, 2023</p>
              <button 
                onClick={toggleModal}
                className="w-full py-4 mt-auto border border-primary text-primary font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My Reviews Section */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface shrink-0">My Past Reviews</h2>
          <div className="h-px flex-1 bg-outline-variant"></div>
        </div>
        
        <div className="space-y-8">
          {/* Review Item 1 */}
          <div className="bg-[#fdfcf5] border-l-4 border-primary p-8 rounded-r-xl shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrt9CR9CvDfwZIwP_KYV_AtHO81ZLRObHwjiP9yJznOMowORVYkeKOOdOktYd_ICxvlAnbHPLf4rUxA3VpkAYvcMvbahM1qJPBmVBbcP7qbm1baGnUJ1758Wn1LxSYScEyQ5ltp_7_7uxZfB46_7Csm-hOz4hfXkt-B00N-8-MN3g_Z8WOZRyKxQxOl3cbuZkUGekFrBJ2OYKi1SkjWzvYpzqfnA2wik5g0kPUURlDwI0DGBl9XmzgNtEyNzCb0Yg-WViQur1DXSnj"
                    alt="The Old Pine Lodge"
                  />
                </div>
                <div>
                  <h4 className="font-label-md text-primary leading-tight">The Old Pine Lodge</h4>
                  <p className="text-label-sm text-outline">Stayed August 2023</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
            <p className="font-display-md text-[20px] text-on-surface italic mb-4 leading-relaxed">
              "An absolute sanctuary in the heart of the mountains. The host, Tenzin, treats you like family and the morning views of the Kanchenjunga are unparalleled."
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                12 People found this helpful
              </div>
              <button className="text-secondary font-label-md hover:underline">Edit Review</button>
            </div>
          </div>

          {/* Review Item 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXQPWTZW-5FGlVO7mBaAsaYcukRJmbmd_kZaw6Lm8UilFm3No0rWhYuOZgGkSriV9DXXXchLE2vihyNI8Kywtlx9dCfSXRU1_62eNE7EC-J5lswXG3l4g_CH0c0_1kRwVAxpRnRFG1BSpyPCF1c4Zxi36dxEyah4_6X_nUUM2K7skFnyDlY-1Ed9Nj8CzLIL6OvrLvKjahmf_D21Udf1GizdoWtNCzwoTfnoiLjuzFynD94-fkEMhINNCQuWyJMmzr7IHpn56Xfr55"
                    alt="Summit Loft Suites"
                  />
                </div>
                <div>
                  <h4 className="font-label-md text-primary leading-tight">Summit Loft Suites</h4>
                  <p className="text-label-sm text-outline">Stayed June 2023</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined ${i < 4 ? 'text-secondary' : 'text-outline-variant'}`} style={i < 4 ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                ))}
              </div>
            </div>
            <p className="text-body-lg text-on-surface-variant mb-6">
              The location was perfect for hiking access. Very clean and modern. My only suggestion would be to improve the Wi-Fi connectivity as it was a bit patchy for remote work, but the environment more than makes up for it.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-label-sm text-outline bg-surface-container px-3 py-1 rounded-full">Private feedback shared with Host</span>
              <button className="text-secondary font-label-md hover:underline">View Public Thread</button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-lg text-headline-lg text-primary">Write Your Review</h3>
              <button 
                onClick={toggleModal}
                className="material-symbols-outlined text-outline hover:text-primary transition-colors"
              >
                close
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block font-label-md text-on-surface mb-3">Overall Experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star}
                      className="material-symbols-outlined text-[32px] cursor-pointer hover:text-secondary transition-colors"
                      style={(hoverRating || rating) >= star ? { fontVariationSettings: "'FILL' 1", color: '#8e4d2e' } : {}}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-label-md text-on-surface mb-2">Share your thoughts</label>
                <textarea 
                  className="w-full h-40 p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary transition-all text-body-md placeholder:text-outline/50" 
                  placeholder="Describe the atmosphere, the host, and the views..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={toggleModal}
                  className="w-full py-4 border border-outline-variant font-label-md rounded-lg hover:bg-surface-variant transition-colors"
                >
                  Cancel
                </button>
                <button 
                  className="w-full py-4 bg-primary text-on-primary font-label-md rounded-lg shadow-lg hover:bg-tertiary transition-all"
                  onClick={() => {
                    // Logic to submit review
                    toggleModal();
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
