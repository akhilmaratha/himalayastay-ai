"use client";
import React from "react";

export default function ImageGallery() {
  return (
    <section className="mb-xl">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-base h-[400px] md:h-[560px] rounded-xl overflow-hidden shadow-ambient-sm relative">
        {/* Main Large Image */}
        <div className="col-span-1 md:col-span-2 md:row-span-2 relative group cursor-pointer h-full">
          <img
            alt="Main view of Oak Ridge Homestay exterior"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMXwQNS-NCCi3_Q_o790fXQNek4AyGuB-koWsmSl6CKxqmBkeAXjuUiprGnT-9s2n2EUwBdPaHbBeAGWhAMGHe-S0IdF7xrnfCKTfBIi4_KNubuQjOHSyC2aj-bUYfRRq7e3c7xiCvdsLK7I3F2cvfDXMsFWK8hnxdGP0ZLyDkzGj_TzvWijBBiEzcoTAcGzTAAhfRywwZ_3e7aSzlMDvQ2EO3yDjFB0pvDsuFNttaF6cqlDeN1CjyUcQnECUYLjD85VmLc3DGxVIw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        {/* Small Images */}
        <div className="hidden md:block relative group cursor-pointer overflow-hidden">
          <img
            alt="Cozy interior living room"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbI8X9RRyCEphZOLrDgIGttGsjePXpzXSlRjimWkGBNVXxwsZS_tw4YyAX0g4F3F1uknchU2mktDFY7jdOgS0jU3O34-aNQQAY1AXRkowodtfhm6oxYuw9NNTIxeIl61Ta2j2zf3EbrDSLH6dn_KUHVHvKVyTndEXCjXnorex0g2UVhxTLqElC7YORJD87lvtqhqIOEE86YPmlTJmjd1w8DdaZBci6iZh9abBgmA3X0XBzwjJqaUUXJexcyTq508vgqhbHE4kQWNqo"
          />
        </div>
        <div className="hidden md:block relative group cursor-pointer overflow-hidden">
          <img
            alt="Bedroom view"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALJcAFRuhj0ftNAsDlgwPSaIIohr4QUTMt0YeiMt9DSIaUAXUTW06VS21z93ngGpcNewWWwh_KquSD0GuTYjj1XYUYhBZDX4O_reL-2-Z1zoc_jO2S0vJxvlTPi78qDl2KSOPo-aNTTS5PbOMJ9Dx4IQVGaJsJYKrj9GWNaVB3aTqNokjT4ALLakFhZPq3DK0JLBiWzn9tXBmA-N7OqGqeDy-BEgkTZd83wZ0gIp-RUzVVh7-YlSzYt8Sh9IMC6_Mnfv3KbzfZJpO7"
          />
        </div>
        <div className="hidden md:block relative group cursor-pointer overflow-hidden">
          <img
            alt="Balcony view"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7QSCHNB4ViCGCI-vvyN9MXFvS5r-Cg4BAYX8R9TuaoQCl5J4mc8SkkLL8QVEs-x-rXCWQLvhYPyX7mP9ElBQI__kHsU1rrPRlM9j1hmo3cme_77a0QbjZwD8tDXYjNailEXNm9b7E3pGscZSIHx1Naq5du7sP6VVU8g2Vxesmt1XIGlX2LG2pt61sUEsHgCddAKaAt0G3vpA0O2YaVSkxBlQicDswZNY7W1YDk87ToDHmvMwmqknkhjbdmymDzmE8Nj9IvRyyiPin"
          />
        </div>
        <div className="hidden md:block relative group cursor-pointer overflow-hidden">
          <img
            alt="Dining area"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmiJC7CiqxNKOFvKOvCXIXllovKs7IbOvE82dqxaIa4lFrExxFlf4FeVt214pBGTa_XjGBSIQxh0eO6tunMg9pOODJwAKFL65E6ezRaXdZMbVV9BGbduZGv1zdUWhRoYI-bBPKdAP6bkF7b9UimOZX7roWuE9ee7S5q_EklU7CYfaO-0NR_GghNAoFysGc9XzzQTxQRpN1Xt5C_RYAvjKBIpazHgcfsYR4GiW6EGThkoTl_mn7FzwHh7Cqrx9eXXx4kNGZZiQCI_mM"
          />
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center transition-opacity hover:bg-primary/30">
            <span className="bg-surface/90 backdrop-blur-sm px-sm py-xs rounded-full font-label-md text-label-md text-primary flex items-center gap-xs shadow-ambient-sm">
              <span className="material-symbols-outlined text-[18px]">
                grid_view
              </span>
              Show all photos
            </span>
          </div>
        </div>
        {/* Mobile view all button */}
        <button className="md:hidden absolute bottom-sm right-sm bg-surface/90 backdrop-blur-sm px-sm py-xs rounded-full font-label-md text-label-md text-primary flex items-center gap-xs shadow-ambient-md">
          <span className="material-symbols-outlined text-[18px]">
            grid_view
          </span>
          12 Photos
        </button>
      </div>
    </section>
  );
}
