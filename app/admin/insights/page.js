"use client";
import React, { useEffect, useState, useRef } from 'react';
import { ReviewInput } from '@/components/ai/ReviewInput';
import { AnalysisResults } from '@/components/ai/AnalysisResults';
import { RecentAnalyses } from '@/components/ai/RecentAnalyses';

export default function InsightsPage() {
  const [isClient, setIsClient] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [toast, setToast] = useState(null);

  const resultsRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsClient(true);
    });
    // Load recent analyses from localStorage
    try {
      const stored = localStorage.getItem('recentReviewAnalyses');
      if (stored) {
        setRecentAnalyses(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recent analyses', e);
    }
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleReviewChange = (val) => {
    setReviewText(val);
    if (aiData) setAiData(null); // Hide previous results when editing
  };

  const saveToRecent = (text, data) => {
    const newItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      reviewText: text,
      data: data
    };
    
    setRecentAnalyses(prev => {
      // Remove exact duplicates based on text if they exist
      const filtered = prev.filter(item => item.reviewText !== text);
      const updated = [newItem, ...filtered].slice(0, 5); // Keep last 5
      try {
        localStorage.setItem('recentReviewAnalyses', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return updated;
    });
  };

  const handleAnalyze = async () => {
    if (reviewText.length < 20) return;
    
    setIsLoading(true);
    setAiData(null);
    
    try {
      const res = await fetch("/api/ai/analyze-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewText })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Unable to analyze review.");
      }
      
      setAiData(data);
      saveToRecent(reviewText, data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('ai-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      
    } catch (e) {
      console.error(e);
      showToast("Unable to analyze review. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setReviewText("");
    setAiData(null);
  };

  const handleLoadAnalysis = (item) => {
    setReviewText(item.reviewText);
    setAiData(item.data);
    setTimeout(() => {
      document.getElementById('ai-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCopyReply = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Copied successfully.", "success");
    }).catch(() => {
      showToast("Failed to copy.", "error");
    });
  };

  return (
    <>
      <div className="p-sm md:p-md lg:p-lg max-w-container-max mx-auto w-full pb-xl">
        
        {/* Error/Success Toast */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-5 ${
            toast.type === 'error' ? 'bg-error text-on-error' : 'bg-primary text-on-primary'
          }`}>
            <span className="material-symbols-outlined">
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <span className="font-label-md">{toast.message}</span>
          </div>
        )}

        <ReviewInput 
          reviewText={reviewText}
          setReviewText={handleReviewChange}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          isLoading={isLoading}
        />

        <div ref={resultsRef}>
          <AnalysisResults 
            aiData={aiData} 
            isClient={isClient}
            onCopyReply={handleCopyReply}
          />
        </div>

        <RecentAnalyses 
          recentAnalyses={recentAnalyses}
          onLoadAnalysis={handleLoadAnalysis}
        />
        
      </div>
    </>
  );
}
