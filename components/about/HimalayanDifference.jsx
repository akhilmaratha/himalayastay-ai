"use client"

import React from "react";

export default function HimalayanDifference() {
  return (
    <section className="py-xl bg-surface">
      <div className="max-w-container-max mx-auto px-md">
        <h2 className="font-display-md text-display-md text-primary mb-xl text-center">
          The Himalayan Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Vetted Quality */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl h-[400px]">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="High-end boutique mountain lodge room"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWuwF0tMlqrhYYslDCC0Qkc58_puTCBXvM1yR6woTNFHvRDmb0mu5yObMyHWHX3O5rAMEi2VFVtszya6PDVkK7LaQSC3HnmTMkW0qDH92yZlt7-5aw_aoQ5BwjyhcNytqeiIJ1deDRPCwva3hj9fpfMvMBpjDV0CTLUPQ2Q61-sJgfymvlsuh0Wob02eQQK3wy6ruBiBPGuOsqP2OhkRYGVmVoM_UXVWtg_8E4UZ_kZNJ2DZX_wqONhM2e_MTLxn7gUQ-_uswhGLTa"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-lg text-white">
              <h3 className="font-headline-lg text-headline-lg mb-xs">
                Vetted Quality
              </h3>
              <p className="text-white/80 max-w-lg">
                Every stay in our collection is personally inspected for safety,
                comfort, and authenticity. We blend rustic soul with boutique
                hospitality standards.
              </p>
            </div>
          </div>
          {/* Local Wisdom */}
          <div className="md:col-span-4 bg-primary-container text-on-primary-container p-xl rounded-xl flex flex-col justify-end">
            <span className="material-symbols-outlined text-4xl mb-md">
              local_library
            </span>
            <h3 className="font-headline-lg text-headline-lg mb-sm">
              Local Wisdom
            </h3>
            <p className="opacity-80">
              Our guides are village elders and community leaders who hold the
              keys to the mountain's best-kept secrets and spiritual lineages.
            </p>
          </div>
          {/* Eco-Conscious Stays */}
          <div className="md:col-span-4 bg-secondary-fixed text-on-secondary-fixed p-xl rounded-xl flex flex-col justify-end">
            <span className="material-symbols-outlined text-4xl mb-md">
              forest
            </span>
            <h3 className="font-headline-lg text-headline-lg mb-sm">
              Eco-Conscious Stays
            </h3>
            <p className="opacity-80">
              From solar-powered water heating to zero-plastic guest kits, we
              lead with the land in mind.
            </p>
          </div>
          {/* Expansion Image */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl h-[300px]">
            <img
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              alt="Mountain valley at evening"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUaWWMEn6Ac8sEkKm4jiCAzQOnQmSUinoWTEYnFhEjkTKVMnD8LYqwmYZRDKXWArKWr30Khwan9EeU3x-BuBU2oQfpruzmhdosWhyotTT4pG20jwlrNNFC5h0pb7oXmmQyhpYEQZmRIuz_qDhHct0p8XRKIhlv15uEcoclPu_0FSowS0Fq7tM19K3YRvKeG3DxHJK-nGkzRt_WTFhoA7wNqZ_SJBsl-U_TysSH2rtuie7r2lT2IaUxPwYjH-KbsQtrMxrmuW-VF38B"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
