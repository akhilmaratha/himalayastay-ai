"use client";
import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // AI Feature States
  const [analyzingId, setAnalyzingId] = useState(null);
  const [aiResults, setAiResults] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to load reviews");
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

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleAnalyze = async (reviewId, comment) => {
    setAnalyzingId(reviewId);
    try {
      const res = await fetch("/api/ai/analyze-review", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: comment })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze review");
      }
      
      setAiResults(prev => ({ ...prev, [reviewId]: data }));
    } catch(e) {
      showToast(e.message, 'error');
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .shadow-ambient-1 {
            box-shadow: 0 4px 12px rgba(45, 71, 57, 0.05);
        }
      `}} />
      
      {/* Error Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 bg-error text-on-error px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined">error</span>
          <span className="font-label-md">{toast.message}</span>
        </div>
      )}

      <div className="p-md md:p-xl max-w-container-max mx-auto w-full flex-1">
        <div className="mb-lg flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary mb-xs">Guest Reviews</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Insights and sentiments from recent stays.</p>
          </div>
          <div className="hidden sm:flex gap-sm">
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span className="font-label-md text-label-md">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-sm">download</span>
              <span className="font-label-md text-label-md">Export</span>
            </button>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
          {/* Total Reviews */}
          <div className="bg-[#F4F1EE] rounded-xl p-md border border-[#E5E0DA] shadow-ambient-1 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <p className="font-label-md text-label-md text-on-surface-variant">Total Reviews</p>
              <span className="material-symbols-outlined text-primary-container">forum</span>
            </div>
            <div>
              <p className="font-display-md text-display-md text-primary">{reviews.length}</p>
              <p className="font-label-sm text-label-sm text-primary-container mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                All time
              </p>
            </div>
          </div>
          
          {/* Average Rating */}
          <div className="bg-[#F4F1EE] rounded-xl p-md border border-[#E5E0DA] shadow-ambient-1 flex flex-col justify-between h-40 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
              <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div className="flex justify-between items-start relative z-10">
              <p className="font-label-md text-label-md text-on-surface-variant">Average Rating</p>
              <div className="flex text-secondary items-center">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
            </div>
            <div className="relative z-10">
              <p className="font-display-md text-display-md text-primary">{reviews.length > 0 ? (reviews.reduce((acc, cur) => acc + (cur.rating || 5), 0) / reviews.length).toFixed(1) : "0.0"}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Based on all time</p>
            </div>
          </div>
          
          {/* Sentiment */}
          <div className="bg-primary-container rounded-xl p-md shadow-ambient-1 flex flex-col justify-between h-40 text-on-primary">
            <div className="flex justify-between items-start">
              <p className="font-label-md text-label-md text-on-primary-container">Sentiment Analysis</p>
              <span className="material-symbols-outlined text-primary-fixed">psychology</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="font-display-md text-display-md">95%</p>
                <p className="font-label-md text-label-md text-primary-fixed">Positive</p>
              </div>
              <div className="w-full bg-tertiary-container rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-primary-fixed h-1.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-md">
          {loading ? (
            <div className="py-12 text-center text-on-surface-variant font-body-md bg-surface rounded-xl border border-[#E5E0DA]">
              <span className="material-symbols-outlined animate-spin text-primary text-display-md mb-4 block">sync</span>
              Loading reviews...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-error font-body-md bg-surface rounded-xl border border-[#E5E0DA]">
              <span className="material-symbols-outlined text-display-md mb-4 block">error</span>
              {error}
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant font-body-md bg-surface rounded-xl border border-[#E5E0DA]">
              No reviews available.
            </div>
          ) : (
            reviews.map((review, idx) => {
              const reviewId = review.id || idx;
              const isAnalyzing = analyzingId === reviewId;
              const aiData = aiResults[reviewId];

              return (
                <div key={reviewId} className="bg-surface rounded-xl p-lg border border-[#E5E0DA] shadow-ambient-1 transition-all hover:shadow-md">
                  <div className="flex flex-col md:flex-row gap-md">
                    {/* Guest Info Col */}
                    <div className="md:w-1/4 shrink-0 border-b md:border-b-0 md:border-r border-surface-container-high pb-4 md:pb-0 pr-0 md:pr-4">
                      <div className="flex items-center gap-sm mb-sm">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
                          <span className="material-symbols-outlined text-surface-tint w-full h-full flex items-center justify-center text-2xl">person</span>
                        </div>
                        <div>
                          <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">{review.user || "Guest"}</h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Recent Stay</p>
                        </div>
                      </div>
                      <div className="flex gap-1 text-secondary mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[18px]" style={i < (review.rating || 5) ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                        ))}
                      </div>
                      <p className="font-label-sm text-label-sm text-outline font-medium">Room {review.roomId}</p>
                    </div>
                    
                    {/* Review Content Col */}
                    <div className="md:w-3/4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">&quot;{review.title || "Great Experience"}&quot;</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                          {review.comment}
                        </p>
                        
                        {/* Success Response Rendering (Basic) */}
                        {aiData && (
                          <div className="mt-4 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant">
                            <h4 className="font-label-md text-primary mb-2">AI Analysis Result</h4>
                            <pre className="text-xs text-on-surface-variant overflow-x-auto">
                              {JSON.stringify(aiData, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-sm mt-4 md:mt-0 justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 border border-primary-container text-primary-container rounded-lg hover:bg-surface-container-low transition-colors font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[18px]">reply</span>
                          Reply
                        </button>
                        <button 
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors font-label-md text-label-md disabled:opacity-50" 
                          onClick={() => handleAnalyze(reviewId, review.comment)}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Spinner className="text-on-primary" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-[18px]">psychology</span>
                              Analyze with AI
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-lg flex justify-center pb-xl">
          <button className="font-label-md text-label-md text-primary-container hover:text-primary transition-colors flex items-center gap-2">
            Load More Reviews
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>
    </>
  );
}
