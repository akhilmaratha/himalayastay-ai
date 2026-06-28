"use client";
import React, { useEffect, useState } from 'react';

export default function InsightsPage() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsClient(true);
    });
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-card { opacity: 0; animation: fadeInScale 0.4s ease-out forwards; }
        
        /* Optional delays for staggered effect if we want them handled by CSS */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}} />
      <div className="p-sm md:p-md lg:p-lg max-w-container-max mx-auto w-full pb-xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary mb-xs">AI Insights</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">Advanced behavioral intelligence and predictive analytics for your Himalayan sanctuary.</p>
          </div>
          <button className="flex items-center gap-xs bg-primary text-on-primary px-lg py-sm rounded-full font-label-md hover:opacity-90 transition-all shadow-sm active:scale-95">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>analytics</span>
            Generate Intelligence Report
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Sentiment Pulse - Bento Large */}
          <section className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant relative overflow-hidden animate-card">
            <div className="flex items-center justify-between mb-lg">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>monitoring</span>
                <h3 className="font-headline-lg text-headline-lg text-primary">Sentiment Pulse</h3>
              </div>
              <span className="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-label-sm">Live Analysis</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg h-full">
              <div className="flex flex-col items-center justify-center p-md bg-surface-container-low rounded-xl">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-primary-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364" strokeDashoffset={isClient ? "36" : "364"} strokeWidth="8" style={{ transition: 'stroke-dashoffset 1s ease-out' }}></circle>
                  </svg>
                  <span className="absolute font-display-md text-display-md">92<span className="text-body-md">%</span></span>
                </div>
                <p className="font-label-md mt-md text-on-surface-variant uppercase tracking-wider">Positivity Score</p>
              </div>
              
              <div className="md:col-span-2 space-y-md">
                <div className="p-sm hover:bg-surface-container transition-colors rounded-lg">
                  <div className="flex justify-between mb-xs">
                    <span className="font-label-md">Hospitality & Staff</span>
                    <span className="text-primary font-bold">98%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[98%]"></div>
                  </div>
                  <p className="text-label-sm text-on-surface-variant mt-xs">&quot;Guests consistently praise the personalized welcome tea ceremony and trekking advice.&quot;</p>
                </div>
                
                <div className="p-sm hover:bg-surface-container transition-colors rounded-lg">
                  <div className="flex justify-between mb-xs">
                    <span className="font-label-md">Cleanliness</span>
                    <span className="text-primary font-bold">89%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[89%]"></div>
                  </div>
                  <p className="text-label-sm text-on-surface-variant mt-xs">&quot;Excellent maintenance of common areas; minor mentions of dust in attic rooms during dry spells.&quot;</p>
                </div>
                
                <div className="p-sm hover:bg-surface-container transition-colors rounded-lg">
                  <div className="flex justify-between mb-xs">
                    <span className="font-label-md">Food & Dining</span>
                    <span className="text-primary font-bold">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[94%]"></div>
                  </div>
                  <p className="text-label-sm text-on-surface-variant mt-xs">&quot;The local Buckwheat pancakes are a significant highlight in 40% of positive reviews.&quot;</p>
                </div>
              </div>
            </div>
          </section>

          {/* AI Recommendations - Bento Sidebar */}
          <section className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant animate-card delay-100 h-full">
              <div className="flex items-center gap-xs mb-md">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>tips_and_updates</span>
                <h3 className="font-headline-lg text-headline-lg text-primary">Recommendations</h3>
              </div>
              <div className="space-y-md">
                <div className="bg-surface-container-lowest p-md rounded-xl border-l-4 border-secondary shadow-sm">
                  <h4 className="font-label-md text-secondary mb-xs uppercase">Dynamic Pricing</h4>
                  <p className="text-body-md mb-md">Suggesting a 10% rate increase for the upcoming Apple Blossom Festival (Apr 12-18).</p>
                  <button className="text-label-md text-primary font-bold hover:underline flex items-center gap-xs">Apply Now <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span></button>
                </div>
                <div className="bg-surface-container-lowest p-md rounded-xl border-l-4 border-primary shadow-sm">
                  <h4 className="font-label-md text-primary mb-xs uppercase">Guest Experience</h4>
                  <p className="text-body-md mb-md">Guests frequently mention cold nights; consider adding extra heaters or electric blankets to the Oak Room.</p>
                  <button className="text-label-md text-primary font-bold hover:underline flex items-center gap-xs">Add to Tasks <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>add</span></button>
                </div>
              </div>
            </div>
          </section>

          {/* Occupancy Forecast - Bento Wide */}
          <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm animate-card delay-200">
            <div className="flex items-center justify-between mb-lg">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>query_stats</span>
                <h3 className="font-headline-lg text-headline-lg text-primary">Occupancy Forecast</h3>
              </div>
              <div className="flex gap-xs">
                <button className="px-sm py-xs rounded-full bg-primary-container text-on-primary text-label-sm">Next 30 Days</button>
                <button className="px-sm py-xs rounded-full text-on-surface-variant text-label-sm hover:bg-surface-container transition-colors">90 Days</button>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-sm pt-md px-md">
              <div className="flex-1 flex flex-col items-center gap-xs">
                <div className="w-full bg-surface-container-high rounded-t-lg relative group h-32">
                  <div className="absolute bottom-0 w-full bg-primary h-[40%] rounded-t-lg transition-all group-hover:h-[45%]"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-xs py-1 rounded">40%</div>
                </div>
                <span className="text-[10px] text-on-surface-variant font-medium">WEEK 1</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-xs">
                <div className="w-full bg-surface-container-high rounded-t-lg relative group h-32">
                  <div className="absolute bottom-0 w-full bg-primary h-[65%] rounded-t-lg transition-all group-hover:h-[70%]"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-xs py-1 rounded">65%</div>
                </div>
                <span className="text-[10px] text-on-surface-variant font-medium">WEEK 2</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-xs">
                <div className="w-full bg-surface-container-high rounded-t-lg relative group h-32">
                  <div className="absolute bottom-0 w-full bg-secondary-container h-[85%] rounded-t-lg transition-all"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-xs py-1 rounded">85%</div>
                </div>
                <span className="text-[10px] text-on-surface-variant font-medium">WEEK 3</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-xs">
                <div className="w-full bg-surface-container-high rounded-t-lg relative group h-32">
                  <div className="absolute bottom-0 w-full bg-primary h-[55%] rounded-t-lg transition-all group-hover:h-[60%]"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-xs py-1 rounded">55%</div>
                </div>
                <span className="text-[10px] text-on-surface-variant font-medium">WEEK 4</span>
              </div>
            </div>
            
            <div className="mt-lg p-md bg-surface-container-low rounded-xl flex items-start gap-md">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>info</span>
              <p className="text-body-md text-on-surface-variant italic">&quot;Predicted surge in Week 3 correlates with regional clear-sky forecasts and the onset of the peak flowering season. We recommend securing staff availability for this period.&quot;</p>
            </div>
          </section>

          {/* Competitive Analysis - Bento Square */}
          <section className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm animate-card delay-300 flex flex-col">
            <div className="flex items-center gap-xs mb-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>compare_arrows</span>
              <h3 className="font-headline-lg text-headline-lg text-primary">Competitive Analysis</h3>
            </div>
            
            <div className="space-y-lg flex-1">
              <div>
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-label-md">Average Daily Rate (ADR)</span>
                  <span className="text-label-sm bg-tertiary-fixed px-sm py-0.5 rounded-full">Top 15%</span>
                </div>
                <div className="flex items-end gap-md">
                  <span className="font-display-md text-display-md">₹14,500</span>
                  <span className="text-on-surface-variant font-label-sm pb-1.5">vs Region Avg ₹11,200</span>
                </div>
              </div>
              
              <div>
                <span className="font-label-md block mb-md">Regional Comparison Pillars</span>
                <div className="space-y-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-body-md">Guest Rating</span>
                    <div className="flex gap-1 text-primary">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
                      <span className="ml-2 font-bold text-on-surface">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-body-md">Amenities Range</span>
                    <span className="font-bold text-primary">Above Average</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-body-md">Value for Money</span>
                    <span className="font-bold text-secondary">Balanced</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-xl border-t border-outline-variant pt-md">
              <div 
                className="w-full h-32 bg-cover bg-center rounded-lg grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrFkv2kMj_Wlb7OD83oTlwZWS5L0UscAiAvVcEAPdrGhwHenHzLmimdQiER7KcEXVPTtBF57jQag6ILPiN0cFh7qLKIIBkSgnj5UbhwHvLqjH5L8FqAncQa9rzq0gFsDICRVkugq4G5O_hhFB77kcB1RjFYCFSUjFI7FEV0cdn7s8l200pL3Z8k5XrtdyBKSmJuILN-sm6_p6WsrjsPyESBMQd042bPS20nRYsDZ033AzIV1U0NC0gjBCfQD3iTE3rmKytaospipip')" }}
              ></div>
              <p className="text-[11px] text-on-surface-variant mt-sm text-center uppercase tracking-widest">Visual comparison with 12 local competitors</p>
            </div>
          </section>

          {/* Footer Stats */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-gutter mt-md">
            <div className="p-md bg-surface-container rounded-xl border border-outline-variant">
              <p className="font-label-md text-on-surface-variant mb-xs">Active guest threads</p>
              <p className="font-display-md text-display-md">248</p>
            </div>
            <div className="p-md bg-surface-container rounded-xl border border-outline-variant">
              <p className="font-label-md text-on-surface-variant mb-xs">AI Confidence level</p>
              <p className="font-display-md text-display-md">96.4%</p>
            </div>
            <div className="p-md bg-surface-container rounded-xl border border-outline-variant">
              <p className="font-label-md text-on-surface-variant mb-xs">Response automation</p>
              <p className="font-display-md text-display-md">42%</p>
            </div>
            <div className="p-md bg-surface-container rounded-xl border border-outline-variant">
              <p className="font-label-md text-on-surface-variant mb-xs">Insight alerts</p>
              <p className="font-display-md text-display-md">12</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
