"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // AI Feature States
  const [analyzingId, setAnalyzingId] = useState(null);
  const [aiResults, setAiResults] = useState({});
  const [aiErrors, setAiErrors] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const resultRefs = useRef({});

  const [toast, setToast] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    user: '',
    roomId: '',
    rating: 5,
    title: '',
    comment: ''
  });
  const [isSaving, setIsSaving] = useState(false);

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

  useEffect(() => {
    fetchReviews();
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleDelete = async (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete review");
      setReviews(prev => prev.filter(r => (r._id || r.id) !== reviewId));
      showToast("Review deleted successfully", "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleAnalyze = async (reviewId, comment) => {
    if (!comment || comment.trim().length === 0) {
      setAiErrors(prev => ({ ...prev, [reviewId]: "Review comment is empty. Cannot analyze." }));
      return;
    }

    setAnalyzingId(reviewId);
    setAiErrors(prev => ({ ...prev, [reviewId]: null }));
    
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
      
      // Smooth scroll to result
      setTimeout(() => {
        if (resultRefs.current[reviewId]) {
          resultRefs.current[reviewId].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
      
    } catch(e) {
      setAiErrors(prev => ({ ...prev, [reviewId]: e.message || "An unexpected error occurred during analysis." }));
      showToast("Analysis failed", 'error');
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingReview(null);
    setFormData({ user: '', roomId: '', rating: 5, title: '', comment: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setFormData({
      user: review.user || '',
      roomId: review.roomId || '',
      rating: review.rating || 5,
      title: review.title || '',
      comment: review.comment || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingReview ? `/api/reviews/${editingReview._id || editingReview.id}` : '/api/reviews';
      const method = editingReview ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error(`Failed to ${editingReview ? 'update' : 'add'} review`);
      await fetchReviews();
      setIsModalOpen(false);
      showToast(`Review ${editingReview ? 'updated' : 'added'} successfully`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .shadow-ambient-1 {
            box-shadow: 0 4px 12px rgba(45, 71, 57, 0.05);
        }
        .skeleton-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}} />
      
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 ${toast.type === 'error' ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}>
          <span className="material-symbols-outlined">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
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
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors shadow-sm">
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="font-label-md text-label-md">Add Review</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span className="font-label-md text-label-md">Filter</span>
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
              const reviewId = review._id || review.id || idx;
              const isAnalyzing = analyzingId === reviewId;
              const aiData = aiResults[reviewId];
              const aiError = aiErrors[reviewId];
              const isAnyAnalyzing = analyzingId !== null;

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
                          <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface flex items-center gap-1">
                            {review.user || "Guest"}
                            {aiData && !isAnalyzing && (
                              <span className="ml-1 px-1.5 py-0.5 bg-primary-container text-on-primary-container text-[10px] uppercase font-bold rounded flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[12px]">psychology</span> AI
                              </span>
                            )}
                          </h4>
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
                        
                        {/* Loading Skeleton */}
                        {isAnalyzing && (
                          <div className="mt-4 p-lg bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm animate-in fade-in">
                             <div className="flex items-center gap-2 mb-4">
                               <Spinner className="text-primary w-5 h-5" />
                               <span className="font-label-md text-primary animate-pulse">AI is analyzing this review...</span>
                             </div>
                             <div className="space-y-3">
                               <div className="h-4 bg-surface-container-high rounded w-3/4 skeleton-pulse"></div>
                               <div className="h-4 bg-surface-container-high rounded w-1/2 skeleton-pulse"></div>
                               <div className="h-16 bg-surface-container-high rounded w-full skeleton-pulse mt-4"></div>
                             </div>
                          </div>
                        )}

                        {/* Error State */}
                        {aiError && !isAnalyzing && (
                          <div className="mt-4 p-md bg-error/10 border border-error/20 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2 text-error">
                              <span className="material-symbols-outlined">error</span>
                              <span className="font-label-md">{aiError}</span>
                            </div>
                            <button 
                              onClick={() => handleAnalyze(reviewId, review.comment)}
                              className="px-3 py-1.5 bg-error text-on-error rounded-lg text-sm font-medium hover:bg-error/90 transition-colors"
                            >
                              Retry
                            </button>
                          </div>
                        )}

                        {/* AI Analysis Result */}
                        {aiData && !isAnalyzing && (
                          <div ref={el => resultRefs.current[reviewId] = el} className="mt-4 p-lg bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm animate-in fade-in slide-in-from-top-4">
                            <div className="flex items-center justify-between mb-md border-b border-surface-container-high pb-sm">
                              <div className="flex items-center gap-xs">
                                <span className="material-symbols-outlined text-primary">psychology</span>
                                <h4 className="font-headline-sm text-headline-sm text-primary">AI Insights & Action Plan</h4>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-md">
                              <div>
                                <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Sentiment</p>
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: aiData.sentiment?.toLowerCase() === 'positive' ? '#e8f5e9' : aiData.sentiment?.toLowerCase() === 'negative' ? '#ffebee' : '#fff3e0', color: aiData.sentiment?.toLowerCase() === 'positive' ? '#2e7d32' : aiData.sentiment?.toLowerCase() === 'negative' ? '#c62828' : '#e65100' }}>
                                  <span className="material-symbols-outlined text-[16px]">
                                    {aiData.sentiment?.toLowerCase() === 'positive' ? 'sentiment_satisfied' : aiData.sentiment?.toLowerCase() === 'negative' ? 'sentiment_dissatisfied' : 'sentiment_neutral'}
                                  </span>
                                  {aiData.sentiment || "Neutral"}
                                </div>
                              </div>
                              <div>
                                <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Suggested Rating</p>
                                <div className="flex items-center gap-1 font-body-lg font-medium text-secondary bg-secondary-container/30 px-3 py-1 rounded-full inline-flex">
                                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                  {aiData.rating || "N/A"}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-md">
                              {aiData.positivePoints && aiData.positivePoints.length > 0 && (
                                <div className="bg-[#f0f7f1] rounded-lg p-md border border-[#c8e6c9]">
                                  <div className="flex items-center gap-xs text-[#2e7d32] mb-sm">
                                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                                    <h5 className="font-label-md font-bold">Positive Points</h5>
                                  </div>
                                  <ul className="list-disc pl-5 text-sm text-[#1b5e20] space-y-1 marker:text-[#4caf50]">
                                    {aiData.positivePoints.map((pt, i) => <li key={i}>{pt}</li>)}
                                  </ul>
                                </div>
                              )}
                              
                              {aiData.negativePoints && aiData.negativePoints.length > 0 && (
                                <div className="bg-[#fff0f0] rounded-lg p-md border border-[#ffcdd2]">
                                  <div className="flex items-center gap-xs text-[#c62828] mb-sm">
                                    <span className="material-symbols-outlined text-sm">thumb_down</span>
                                    <h5 className="font-label-md font-bold">Areas of Concern</h5>
                                  </div>
                                  <ul className="list-disc pl-5 text-sm text-[#b71c1c] space-y-1 marker:text-[#ef5350]">
                                    {aiData.negativePoints.map((pt, i) => <li key={i}>{pt}</li>)}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {aiData.suggestions && aiData.suggestions.length > 0 && (
                              <div className="mb-md bg-[#fff8e1] p-md rounded-lg border border-[#ffecb3]">
                                <div className="flex items-center gap-xs text-[#f57f17] mb-sm">
                                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                                  <h5 className="font-label-md font-bold">Improvement Suggestions</h5>
                                </div>
                                <ul className="list-disc pl-5 text-sm text-[#e65100] space-y-1 marker:text-[#ffb300]">
                                  {aiData.suggestions.map((sug, i) => <li key={i}>{sug}</li>)}
                                </ul>
                              </div>
                            )}

                            {aiData.ownerReply && (
                              <div className="bg-primary-container p-md rounded-lg relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                <div className="flex items-center justify-between mb-sm text-on-primary-container pl-2">
                                  <div className="flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-sm">edit_note</span>
                                    <h5 className="font-label-md font-bold">AI Generated Reply</h5>
                                  </div>
                                  <button 
                                    className={`text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors font-medium shadow-sm ${copiedId === reviewId ? 'bg-green-500 text-white' : 'bg-primary text-on-primary hover:bg-primary/90'}`}
                                    onClick={() => handleCopy(aiData.ownerReply, reviewId)}
                                  >
                                    <span className="material-symbols-outlined text-[14px]">
                                      {copiedId === reviewId ? 'check' : 'content_copy'}
                                    </span> 
                                    {copiedId === reviewId ? 'Copied!' : 'Copy Reply'}
                                  </button>
                                </div>
                                <p className="text-sm text-on-primary-container/90 italic leading-relaxed pl-3 font-medium">
                                  &quot;{aiData.ownerReply}&quot;
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-sm mt-4 md:mt-0 justify-end">
                        <button 
                          onClick={() => openEditModal(review)} 
                          disabled={isAnyAnalyzing}
                          className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-low transition-colors font-label-md text-label-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(reviewId)} 
                          disabled={isAnyAnalyzing}
                          className="flex items-center gap-2 px-4 py-2 border border-error text-error rounded-lg hover:bg-error/10 transition-colors font-label-md text-label-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                          Delete
                        </button>
                        <button 
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors font-label-md text-label-md disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md" 
                          onClick={() => handleAnalyze(reviewId, review.comment)}
                          disabled={isAnyAnalyzing}
                        >
                          <span className="material-symbols-outlined text-[18px]">psychology</span>
                          {aiData ? 'Re-Analyze' : 'Analyze with AI'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-[90vw] max-w-[500px] shadow-lg border border-outline-variant/30 relative">
            <h3 className="text-headline-md font-display-md text-primary mb-md">{editingReview ? 'Edit Review' : 'Add New Review'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
              <input required name="user" value={formData.user} onChange={handleInputChange} placeholder="Guest Name" className="w-full p-sm border border-outline-variant rounded bg-surface focus:border-primary outline-none" />
              <input required name="roomId" value={formData.roomId} onChange={handleInputChange} placeholder="Room ID" className="w-full p-sm border border-outline-variant rounded bg-surface focus:border-primary outline-none" />
              <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Review Title" className="w-full p-sm border border-outline-variant rounded bg-surface focus:border-primary outline-none" />
              <select name="rating" value={formData.rating} onChange={handleInputChange} className="w-full p-sm border border-outline-variant rounded bg-surface focus:border-primary outline-none">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              <div className="relative">
                <textarea 
                  required 
                  name="comment" 
                  value={formData.comment} 
                  onChange={handleInputChange} 
                  placeholder="Review Comment..." 
                  maxLength={500}
                  className="w-full p-sm pb-8 border border-outline-variant rounded bg-surface focus:border-primary outline-none min-h-[120px] resize-none"
                ></textarea>
                <div className={`absolute bottom-2 right-2 text-xs font-medium ${formData.comment.length > 450 ? 'text-error' : 'text-on-surface-variant'}`}>
                  {formData.comment.length} / 500
                </div>
              </div>

              <div className="flex justify-end gap-sm mt-md">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-md py-sm border border-outline-variant rounded hover:bg-surface-container-low transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-md py-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-70 shadow-sm">{isSaving ? 'Saving...' : 'Save Review'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
