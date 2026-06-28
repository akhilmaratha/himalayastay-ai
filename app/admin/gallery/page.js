"use client";
import React from 'react';

export default function GalleryPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
      `}} />
      <div className="px-sm md:px-gutter max-w-container-max mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface mb-xs hidden md:block">Gallery</h2>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-xs md:hidden">Gallery</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage the visual narrative of your property.</p>
          </div>
          <button className="bg-primary-container text-on-primary-container font-label-md text-label-md px-md py-sm rounded-full flex items-center justify-center gap-xs hover:bg-primary-container/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>upload</span>
            Upload Photos
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-sm mb-lg border-b border-surface-variant pb-xs">
          <button className="font-label-md text-label-md text-primary border-b-2 border-primary pb-xs px-xs">All Photos</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-xs px-xs">Rooms</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-xs px-xs">Food</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-xs px-xs">Nature</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-xs px-xs">Activities</button>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md auto-rows-[250px] pb-xl">
          {/* Featured Large Item */}
          <div className="gallery-item relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden group shadow-sm border border-surface-variant">
            <img alt="Master Suite" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhkjtSiM4PeCdzwFZvwcuHr-WBPeaiIsuI4n2n0GR9ZWfQDMUbfGxLOMDIrCBl26RTWmjx_Agic90pqYe5HYGGSirdFcM-nV6JFNWc4dCXNtjMnkg3jd6VVgtkiLAGFV48m0lR1utqpk0fEJNa-oqhxNSK6uSNbECSh_GTou-bKhJBa6AFs6fQMFmSj65nSHMizfodlX4SIFlBHIhIPoX4fYWiSQW2suQVMhYWdVkRCK8sfg-a1u-Muemv1R4GaBC2j0w4OIDzCge0" />
            <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
              <div className="flex justify-between items-start">
                <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Rooms</span>
                <div className="flex gap-xs">
                  <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                  </button>
                </div>
              </div>
              <p className="text-white font-label-md text-label-md truncate">Master Suite - Morning View</p>
            </div>
          </div>
          
          {/* Standard Items */}
          <div className="gallery-item relative rounded-xl overflow-hidden group shadow-sm border border-surface-variant">
            <img alt="Food" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOyvs7snx1ee_OCnJQmuy9lzKMZvr77-CP3180PfzYxrjmKnKa_q4HIxTDOX5LKR5UTP8Tn71oG2qoVT4aLf9DyJoFt5MQ8o2z0zLrYWVBrWYhMu4czfkVwHtd4JUA5J_9rb5ApT3UuArF3239Asz3hcP4xpKHEAx-Dhoafjw_gqoE401OekVVOFP57hOOMOIl0vAVCw1sRA5q_AHZG5SDbaUdfGvxe7QUxkhLMq_AFVFPjXsFE79lgqvafTliMxAWZgnA4zifdrxy" />
            <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
              <div className="flex justify-between items-start">
                <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Food</span>
                <div className="flex gap-xs">
                  <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gallery-item relative rounded-xl overflow-hidden group shadow-sm border border-surface-variant">
            <img alt="Nature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8hC76mEf2ANrzepRcl179cQnNdEPmfM9GJ4y_l4s0xzdD4lnOq-sAcmmHDhSfajrb6pATzF6Xc8UDXsWjYZUodbfmdnsXTvhTVa0Ke4OPe3mlPVTwWOW1CpPVjviV7V_8_RR4-Vq3IlOz6mOtOr88_gvwB3LFDP-2ts_C6cbbVYAw78tJeX4wkpfvqMRxOYxyPwJdzxVKzEQ7MvWTD14gsdqMetfOOOhm51UpwK0yxWIhNvGSc0jQd_Xn2Oby7iaftcodohoVN9f0" />
            <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
              <div className="flex justify-between items-start">
                <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Nature</span>
                <div className="flex gap-xs">
                  <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wide Item */}
          <div className="gallery-item relative md:col-span-2 rounded-xl overflow-hidden group shadow-sm border border-surface-variant">
            <img alt="Activities" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCojMEtJSeKpiIfWigBi1sIGMoYMLg_vX8Y0iuzoo2CzLEd6WHmxyq3gEd8xaI68XsS0C46o5TiaJoVp73b73FYUcBVJxmeEpd0Kcbd_C3yS3qoq952co3vY6SDhYEzYbdgw3vTMaWtmjwDte1Zk6F5tm-cNzoGKujZh1J1P7N8JBVBqsDtyMVDgJhPjWXDxHuBnK_qzHNGXK9PyrNBCIJF0kwHBaAL5ykHCtYaJk8ffPhQI9i4WiW3vZSG1ikrDKCyhFEpku7DGf1Y" />
            <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
              <div className="flex justify-between items-start">
                <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Activities</span>
                <div className="flex gap-xs">
                  <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gallery-item relative rounded-xl overflow-hidden group shadow-sm border border-surface-variant">
            <img alt="Rooms" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBURNKkxqb5qoMkrZOPPLopLdoKEnW0CfRXkwXfyrd5XkKJLdmuh7nh4Gsk8OB8oePRaWJoMjsPHbfJzRtELV5G8vBlU8Wx7n8YnS-bjQYYYg0TkF5OeLa2EuYlO_ABJcHKpv0wzmpSJvBWthrCU-89ozD0vB7mCkTCDm3Cxk2O1BPnuhhO1_YsPKLo1lyKQWzIje5XGYD_P_9hLZswrlDY5LDgq0LT8rlLGeBcpJ3STlU_Uh02QyRZorm4DfSic8y0zCpDeyYC50Pn" />
            <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
              <div className="flex justify-between items-start">
                <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Rooms</span>
                <div className="flex gap-xs">
                  <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gallery-item relative rounded-xl overflow-hidden group shadow-sm border-surface-variant bg-surface-container flex items-center justify-center border-dashed border-2 hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="text-center">
              <span className="material-symbols-outlined text-outline text-display-md mb-xs" style={{ fontVariationSettings: "'FILL' 0" }}>add_photo_alternate</span>
              <p className="font-label-md text-label-md text-on-surface-variant">Drop images here</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
