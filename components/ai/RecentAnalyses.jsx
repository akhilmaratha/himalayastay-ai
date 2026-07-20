import React from 'react';

export function RecentAnalyses({ recentAnalyses, onLoadAnalysis }) {
  if (!recentAnalyses || recentAnalyses.length === 0) return null;

  return (
    <div className="mt-xl">
      <h3 className="font-headline-md text-primary mb-md">Recent Analyses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-md">
        {recentAnalyses.map((item, index) => (
          <div 
            key={item.id || index} 
            className="p-md bg-surface-container rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
            onClick={() => onLoadAnalysis(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLoadAnalysis(item);
              }
            }}
          >
            <div>
              <div className="flex justify-between items-start mb-sm">
                <span className="font-label-sm text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded">
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <span className="font-label-sm font-bold" style={{
                  color: item.data.sentiment?.toLowerCase() === 'positive' ? '#2e7d32' : item.data.sentiment?.toLowerCase() === 'negative' ? '#c62828' : '#e65100'
                }}>
                  {item.data.sentiment || 'Neutral'}
                </span>
              </div>
              <p className="text-body-sm text-on-surface line-clamp-3 italic">
                "{item.reviewText}"
              </p>
            </div>
            <div className="mt-sm pt-sm border-t border-outline-variant flex justify-between items-center text-primary">
              <span className="text-label-sm font-medium">Load Result</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
