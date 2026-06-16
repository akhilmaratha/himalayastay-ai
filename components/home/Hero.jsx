"use client";

export default function Hero() {
  return (
    <header className="relative min-h-[921px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Cinematic Himalayan Mountain View"
          className="w-full h-full object-cover object-center scale-105"
          id="hero-bg"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaPzWSigHH6QCyWKVSjsPiwASGTn3h0cK72_9UIAbaRvlFmBIjsgG4NndNbO6NOVZhO_sAv2aD9aWXIKDNOP7ACMVY9ONh_3pCOf_wfbTP88tr67aYtvukg4yhv-70ZhPMYqyQM69xa2DmTcV5uY_r-UntE0g9xcmnYWF6MOpe5wALiNkG8XQo0Bazq_v1rwPjXweTFY9eRMGnCF2A1hX3a27v1Hw549J2Baq7sS8jVIGfLSCl71DJKE2HKz2xNF7DCUJ8Q26eKD1b"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-surface"></div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-sm md:px-md flex flex-col items-center text-center mt-xl">
        <h1 className="font-display-lg text-display-lg text-white mb-sm drop-shadow-lg max-w-4xl leading-tight">
          Discover Authentic
          <br />
          Mountain Stays
        </h1>
        <p className="font-body-lg text-body-lg text-white/90 mb-xl max-w-2xl drop-shadow-md">
          Experience the quiet luxury of carefully curated homes rooted in the
          serene heights of the Himalayas.
        </p>
        {/* Search Overlay Card */}
        <div className="w-full max-w-5xl glass-panel rounded-xl p-xs md:p-sm ambient-shadow-2 border border-surface-variant/50 transform translate-y-8">
          <form className="flex flex-col md:flex-row items-center gap-xs md:gap-sm w-full" onSubmit={(e) => e.preventDefault()}>
            {/* Location */}
            <div className="flex-1 w-full relative group">
              <label className="absolute top-2 left-4 font-label-sm text-label-sm text-on-surface-variant z-10">
                Location
              </label>
              <div className="flex items-center px-4 pt-6 pb-2 bg-surface hover:bg-surface-bright border border-transparent group-hover:border-outline-variant rounded-lg transition-colors cursor-text">
                <span
                  className="material-symbols-outlined text-primary-container mr-2"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  location_on
                </span>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-on-surface placeholder-outline focus:outline-none"
                  placeholder="Where to?"
                  type="text"
                />
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>
            {/* Dates */}
            <div className="flex-1 w-full flex gap-xs">
              <div className="flex-1 relative group cursor-pointer">
                <label className="absolute top-2 left-4 font-label-sm text-label-sm text-on-surface-variant z-10">
                  Check in
                </label>
                <div className="px-4 pt-6 pb-2 bg-surface hover:bg-surface-bright border border-transparent group-hover:border-outline-variant rounded-lg transition-colors">
                  <span className="font-body-md text-body-md text-outline">
                    Add dates
                  </span>
                </div>
              </div>
              <div className="flex-1 relative group cursor-pointer">
                <label className="absolute top-2 left-4 font-label-sm text-label-sm text-on-surface-variant z-10">
                  Check out
                </label>
                <div className="px-4 pt-6 pb-2 bg-surface hover:bg-surface-bright border border-transparent group-hover:border-outline-variant rounded-lg transition-colors">
                  <span className="font-body-md text-body-md text-outline">
                    Add dates
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>
            {/* Guests & Search Button */}
            <div className="flex-1 w-full flex items-center justify-between bg-surface rounded-lg pl-4 pr-2 py-2 group hover:border-outline-variant border border-transparent transition-colors">
              <div className="relative cursor-pointer flex-1 text-left">
                <label className="block font-label-sm text-label-sm text-on-surface-variant">
                  Guests
                </label>
                <span className="font-body-md text-body-md text-outline block mt-1">
                  Add guests
                </span>
              </div>
              <button
                className="bg-primary-container text-on-primary p-4 rounded-lg hover:bg-primary transition-colors flex items-center justify-center ambient-shadow-1 group-hover:scale-105 transform duration-200"
                type="submit"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  search
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
