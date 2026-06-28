import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex max-w-container-max mx-auto min-h-screen pt-20">
      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-low h-[calc(100vh-5rem)] sticky top-20 border-r border-surface-container-highest">
        <div className="p-md">
          {/* User Profile */}
          <div className="flex items-center gap-sm mb-lg">
            <img 
              alt="Traveler Profile" 
              className="w-12 h-12 rounded-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBosFF3aAPq9XiwlMxQz0Pq70QFbmsnpxvZdQ7l2vcEBIPqh8VU1qbGXhX5Q8qHjkZSPfbnpP1W51pPEjTz_hPq05s7i4NQ9daJiiTmPcgNCAP0lGvjoeCzMucOgw1b_qglLKZ-hE3fKCp0k09vUTG_wqb7DrMWDtL7c0uHVXDEf9hdB41atMwtaO5YMORfDBLMf7xtwqpEZT00jlV1lXRMKCIvzUyctA0z9yDchGLmEmYt9Fkq1qRMf3gxk1OthFy62WYMAUTTSxwA"
            />
            <div>
              <p className="font-label-md text-label-md text-on-surface">Alex Explorer</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Traveler</p>
            </div>
          </div>
          <nav className="flex flex-col gap-sm">
            <Link className="flex items-center gap-sm p-sm bg-primary-container text-on-primary-container rounded-lg font-bold transition-transform duration-150 active:scale-95" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>luggage</span>
              My Bookings
            </Link>
            <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">favorite</span>
              Saved Stays
            </Link>
            <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">rate_review</span>
              Reviews
            </Link>
            <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">person</span>
              Profile
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-md flex flex-col gap-sm">
          <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
          <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
            <span className="material-symbols-outlined">help</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col p-sm md:p-xl gap-xl pb-24 md:pb-xl">
        <header className="flex flex-col gap-xs">
          <h1 className="font-display-lg text-display-lg text-primary hidden md:block">My Bookings</h1>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary md:hidden">My Bookings</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your upcoming retreats and view past adventures in the Himalayas.</p>
        </header>

        {/* Upcoming Trips */}
        <section className="flex flex-col gap-md">
          <h2 className="font-headline-lg text-headline-lg text-on-surface hidden md:block">Upcoming Trips</h2>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:hidden">Upcoming Trips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {/* Booking Card 1 */}
            <article className="bg-surface rounded-xl ambient-shadow-1 border border-surface-container-highest overflow-hidden flex flex-col sm:flex-row group transition-all duration-300 hover:ambient-shadow-2">
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <div className="absolute top-sm left-sm bg-surface/90 backdrop-blur-sm px-xs py-base rounded-md flex items-center gap-base z-10">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="font-label-sm text-label-sm text-primary">Confirmed</span>
                </div>
                <img 
                  alt="Cozy wooden cabin interior in the mountains" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAadiU-uFgEKdFqtPtR59tbjmzhBlp2rc7hV0JVgueD43yx_CNMMg3Vzb5S2JhE7Eg6vvBVaiuJNkA1JlAPDhQduW8viXkV65raTzZ9DH2M1hmSlWBGynPoafiirHg2GqwaQ4MgcsNvn2EBRC1wKOPgcIShhkulVwVg46mhRHOGeyEjGLEeFwmy5VDLDSm9rgOYuT_fM0n4vhfSvZsPAoNTEYS0g6IyLVSjgJVFEuGzEhF59EDtmV6x8KXTToGvwDi0Qe9omANu5641"
                />
              </div>
              <div className="p-md flex flex-col justify-between sm:w-3/5 gap-sm">
                <div>
                  <div className="flex justify-between items-start mb-xs">
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">The Pine Lodge</h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-sm">Manali, Himachal Pradesh</p>
                  <div className="grid grid-cols-2 gap-sm mb-sm bg-surface-container-low p-sm rounded-lg">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Check-in</p>
                      <p className="font-label-md text-label-md text-on-surface">Oct 12, 2024</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Check-out</p>
                      <p className="font-label-md text-label-md text-on-surface">Oct 16, 2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-sm pt-sm border-t border-surface-container-highest">
                  <button className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-xs px-sm rounded-lg hover:bg-tertiary-container transition-colors duration-200">
                    View Details
                  </button>
                  <button className="flex-1 border border-outline font-label-md text-label-md text-primary py-xs px-sm rounded-lg hover:bg-surface-container-low transition-colors duration-200 flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                    Host
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Past Bookings */}
        <section className="flex flex-col gap-md">
          <h2 className="font-headline-lg text-headline-lg text-on-surface hidden md:block">Past Adventures</h2>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:hidden">Past Adventures</h2>
          <div className="bg-surface rounded-xl ambient-shadow-1 border border-surface-container-highest overflow-hidden">
            <ul className="flex flex-col">
              {/* Past Booking Item 1 */}
              <li className="flex flex-col sm:flex-row items-start sm:items-center p-md border-b border-surface-container-highest last:border-b-0 hover:bg-surface-container-low transition-colors duration-200 gap-md">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img 
                    alt="Stone exterior of a boutique hotel in the Himalayas" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB1RwyrBG7hgb9Jtuj78TX86wsTZgcwPpX3an0FrKNk-SfMlJ9E3bL5lF3NvWZP-UiD6plIrJJYdF-MVoS7r8RNcbtr2SmD5ASgEUVy5Yt8BTYCs5xzth_JbULdJgOf6ZIs8djUHjxIIfQaEysyac_SMHqrLqojMUiga4ypaPTVnfMARqngBXp_FalCiyTu21M-JIpXa2LoRpjIn3JE06R4X5IQeYIFDDAan6-XtAx0Citva7--s9AZJsuuaZYu5Quf8scDHheZutA"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-label-md text-label-md text-primary">Valley View Heritage</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Shimla, Himachal Pradesh</p>
                  <p className="font-label-sm text-label-sm text-outline mt-xs">Completed · May 10 - May 14, 2024</p>
                </div>
                <div className="flex gap-sm w-full sm:w-auto mt-sm sm:mt-0">
                  <button className="flex-1 sm:flex-none border border-outline font-label-md text-label-md text-primary py-xs px-sm rounded-lg hover:bg-surface-container-high transition-colors duration-200">
                    Book Again
                  </button>
                  <button className="flex-1 sm:flex-none bg-surface-container-high font-label-md text-label-md text-primary py-xs px-sm rounded-lg hover:bg-surface-dim transition-colors duration-200 flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">rate_review</span>
                    Review
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-surface border-t border-surface-container-highest flex items-center justify-around z-40">
        <Link className="flex flex-col items-center justify-center gap-xs text-primary w-16" href="#">
          <span className="material-symbols-outlined bg-primary-container text-on-primary-container px-md py-[2px] rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>luggage</span>
          <span className="font-label-sm text-label-sm">Bookings</span>
        </Link>
        <Link className="flex flex-col items-center justify-center gap-xs text-on-surface-variant hover:text-primary w-16 transition-colors" href="#">
          <span className="material-symbols-outlined">favorite</span>
          <span className="font-label-sm text-label-sm">Saved</span>
        </Link>
        <Link className="flex flex-col items-center justify-center gap-xs text-on-surface-variant hover:text-primary w-16 transition-colors" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </Link>
      </nav>
    </div>
  );
}