import React, { useEffect, useState } from 'react';

export function AnalysisResults({ aiData, onCopyReply, isClient }) {
  if (!aiData) return null;

  const sentimentColor = aiData.sentiment?.toLowerCase() === 'positive' 
    ? '#2e7d32' 
    : aiData.sentiment?.toLowerCase() === 'negative' 
      ? '#c62828' 
      : '#e65100';

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-card { opacity: 0; animation: fadeInScale 0.4s ease-out forwards; }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}} />
      <div id="ai-results" className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-lg">
        {/* Sentiment & Rating - Replacing Sentiment Pulse (col-span-8) */}
        <section className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant relative overflow-hidden animate-card">
          <div className="flex items-center justify-between mb-lg">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>monitoring</span>
              <h3 className="font-headline-lg text-headline-lg text-primary">Sentiment & Rating</h3>
            </div>
            <span className="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-label-sm" style={{ backgroundColor: sentimentColor, color: '#fff' }}>
              {aiData.sentiment || 'Neutral'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg h-full pb-md">
            <div className="flex flex-col items-center justify-center p-md bg-surface-container-low rounded-xl">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary-container" cx="64" cy="64" fill="transparent" r="58" stroke={sentimentColor} strokeDasharray="364" strokeDashoffset={isClient ? "36" : "364"} strokeWidth="8" style={{ transition: 'stroke-dashoffset 1s ease-out' }}></circle>
                </svg>
                <span className="absolute font-display-md text-display-md">{aiData.sentiment || 'N/A'}</span>
              </div>
              <p className="font-label-md mt-md text-on-surface-variant uppercase tracking-wider">Overall Sentiment</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-md bg-surface-container-low rounded-xl">
              <div className="flex text-secondary items-center mb-md">
                {[...Array(5)].map((_, i) => {
                  const ratingVal = parseFloat((aiData.rating || "0").split('/')[0]);
                  return (
                    <span key={i} className="material-symbols-outlined text-[48px]" style={i < ratingVal ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                  );
                })}
              </div>
              <p className="font-display-md text-display-md">{aiData.rating || "N/A"}</p>
              <p className="font-label-md mt-md text-on-surface-variant uppercase tracking-wider">Suggested Rating</p>
            </div>
          </div>
        </section>

        {/* Recommended Actions - Replacing AI Recommendations (col-span-4) */}
        <section className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant animate-card delay-100 h-full">
            <div className="flex items-center gap-xs mb-md">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>tips_and_updates</span>
              <h3 className="font-headline-lg text-headline-lg text-primary">Recommended Actions</h3>
            </div>
            <div className="space-y-md">
              {aiData.suggestions && aiData.suggestions.length > 0 ? (
                <ol className="list-decimal pl-5 space-y-4 text-body-md text-on-surface">
                  {aiData.suggestions.map((action, idx) => (
                    <li key={idx} className="pl-2">
                      <div className="bg-surface-container-lowest p-sm rounded-lg border-l-4 border-secondary shadow-sm">
                        {action}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-body-md text-on-surface-variant">No recommended actions generated.</p>
              )}
            </div>
          </div>
        </section>

        {/* Highlights & Areas for Improvement - Replacing Occupancy Forecast (col-span-7) */}
        <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm animate-card delay-200">
          <div className="flex items-center justify-between mb-lg">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>checklist</span>
              <h3 className="font-headline-lg text-headline-lg text-primary">Review Details</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md h-full pb-md">
            <div className="bg-surface-container-low rounded-xl p-md">
              <h4 className="font-label-lg text-[#2e7d32] mb-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">thumb_up</span> Positive Highlights
              </h4>
              {aiData.positivePoints && aiData.positivePoints.length > 0 ? (
                <ul className="space-y-2 text-body-md text-on-surface">
                  {aiData.positivePoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="material-symbols-outlined text-[#2e7d32] text-[16px] mt-0.5">check</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body-md text-on-surface-variant">None specified.</p>
              )}
            </div>

            <div className="bg-surface-container-low rounded-xl p-md">
              <h4 className="font-label-lg text-[#c62828] mb-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">thumb_down</span> Areas for Improvement
              </h4>
              {aiData.negativePoints && aiData.negativePoints.length > 0 ? (
                <ul className="space-y-2 text-body-md text-on-surface">
                  {aiData.negativePoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="material-symbols-outlined text-[#c62828] text-[16px] mt-0.5">close</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body-md text-on-surface-variant">None specified.</p>
              )}
            </div>
          </div>
        </section>

        {/* AI Suggested Owner Reply - Replacing Competitive Analysis (col-span-5) */}
        <section className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm animate-card delay-300 flex flex-col">
          <div className="flex items-center justify-between mb-lg">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>edit_note</span>
              <h3 className="font-headline-lg text-headline-lg text-primary">Suggested Reply</h3>
            </div>
            <button 
              onClick={() => onCopyReply(aiData.ownerReply)}
              className="flex items-center gap-1 text-label-sm bg-primary text-on-primary px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span> Copy Reply
            </button>
          </div>
          
          <div className="flex-1 bg-primary-container/20 rounded-xl p-md border border-primary-container/50">
            {aiData.ownerReply ? (
              <p className="text-body-lg text-on-surface leading-relaxed italic border-l-4 border-primary pl-4 py-2">
                "{aiData.ownerReply}"
              </p>
            ) : (
              <p className="text-body-md text-on-surface-variant">No reply generated.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
