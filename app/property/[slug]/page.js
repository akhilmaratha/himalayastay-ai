"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function PropertyDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/rooms/${slug}`);
        if (!res.ok) throw new Error("Property not found");
        const data = await res.json();
        setProperty(data.data || data); // Depending on response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-primary">
        <span className="material-symbols-outlined animate-spin text-display-md">sync</span>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background text-error">
        <span className="material-symbols-outlined text-display-lg mb-4">error</span>
        <h1 className="font-display-md text-headline-lg">{error || "Property Not Found"}</h1>
        <button onClick={() => router.push("/")} className="mt-8 px-6 py-2 bg-primary text-on-primary rounded-lg">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background pb-20">
      {/* Header / Images */}
      <div className="max-w-container-max mx-auto px-4 md:px-8 pt-8">
        <h1 className="font-display-lg text-display-md md:text-display-lg text-primary mb-2">
          {property.title}
        </h1>
        <div className="flex items-center gap-4 text-on-surface-variant mb-6">
          <span className="flex items-center gap-1 font-label-md">
            <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            {property.rating || 'New'}
          </span>
          <span className="flex items-center gap-1 font-label-md">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            {property.location}
          </span>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden">
          <div className="md:col-span-2 relative h-full group">
            {property.images && property.images[0] ? (
              <Image src={property.images[0].url} alt={property.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-surface-variant"></div>
            )}
          </div>
          <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-4 h-full">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="relative h-full w-full group overflow-hidden">
                {property.images && property.images[idx] ? (
                  <Image src={property.images[idx].url} alt={`${property.title} ${idx}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-surface-variant"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-display-md text-headline-md text-primary mb-4">About this stay</h2>
            <p className="font-body-lg text-on-surface-variant whitespace-pre-wrap leading-relaxed mb-8">
              {property.description}
            </p>
            
            {/* Rooms Section */}
            {property.rooms && property.rooms.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display-md text-headline-sm text-primary mb-4">Available Rooms</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.rooms.map((room, i) => (
                    <div key={i} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                      <h4 className="font-label-lg font-bold text-primary mb-2">{room.name}</h4>
                      <p className="font-body-md text-on-surface-variant flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[18px]">group</span>
                        {room.capacity} Guests
                      </p>
                      <p className="font-body-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">bed</span>
                        {room.bedType}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-28 bg-surface border border-outline-variant rounded-2xl p-6 shadow-xl">
              <div className="flex items-end gap-2 mb-6">
                <span className="font-display-md text-display-sm font-bold text-primary">₹{property.price}</span>
                <span className="font-body-md text-on-surface-variant mb-1">/ night</span>
              </div>
              
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-lg hover:bg-primary/90 transition-colors mb-4">
                Reserve
              </button>
              
              <div className="text-center">
                <p className="font-body-sm text-on-surface-variant">You won&apos;t be charged yet</p>
              </div>
              
              {property.houseRules && (
                <div className="mt-6 pt-6 border-t border-outline-variant">
                  <h4 className="font-label-md font-bold text-primary mb-3">House Rules</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">{property.houseRules.petsAllowed ? 'check' : 'close'}</span>
                      Pets Allowed
                    </li>
                    <li className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">{property.houseRules.smokingAllowed ? 'check' : 'close'}</span>
                      Smoking Allowed
                    </li>
                    <li className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">{property.houseRules.eventsAllowed ? 'check' : 'close'}</span>
                      Events Allowed
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
