"use client";
import React, { useState, useEffect } from 'react';

export default function Reviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('Failed to load reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

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
          {loading ? (
            <div className="py-8 text-center text-on-surface-variant">Loading reviews...</div>
          ) : error ? (
            <div className="py-8 text-center text-error">{error}</div>
          ) : reviews.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant">You haven't written any reviews yet.</div>
          ) : (
            reviews.map((review, idx) => (
              <div key={review._id || idx} className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary font-bold">
                      {review.roomId?.title ? review.roomId.title.charAt(0) : 'R'}
                    </div>
                    <div>
                      <h4 className="font-label-md text-primary leading-tight">{review.roomId?.title || 'Unknown Room'}</h4>
                      <p className="text-label-sm text-outline">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined ${i < review.rating ? 'text-secondary' : 'text-outline-variant'}`} style={i < review.rating ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                    ))}
                  </div>
                </div>
                <p className="text-body-lg text-on-surface-variant mb-6">
                  {review.comment}
                </p>
              </div>
            ))
          )}
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
