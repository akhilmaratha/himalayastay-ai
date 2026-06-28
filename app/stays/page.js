"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "../../components/stays/CategoryFilter";
import FilterSidebar from "../../components/stays/FilterSidebar";
import PropertyCard from "../../components/stays/PropertyCard";

export default function StaysPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="grow pt-[80px] pb-xl relative">
      <CategoryFilter />
      <div className="max-w-container-max mx-auto px-md grid grid-cols-1 md:grid-cols-12 gap-gutter pt-8">
        <FilterSidebar />
        
        {/* Property Grid */}
        <div className="col-span-1 md:col-span-9">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="font-display-md text-display-md text-primary hidden md:block">
              Overlooking the Peaks
            </h1>
            {/* Mobile Filter Button */}
            <button className="md:hidden flex items-center gap-2 border border-outline-variant rounded-full px-4 py-2 text-label-md text-primary">
              <span className="material-symbols-outlined text-sm">tune</span>
              Filters
            </button>
          </div>
          
          {/* Grid */}
          {loading ? (
            <div className="py-12 text-center text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined animate-spin text-primary text-display-md mb-4 block">sync</span>
              Loading stays...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-error font-body-md">
              <span className="material-symbols-outlined text-display-md mb-4 block">error</span>
              Error: {error}
            </div>
          ) : properties.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined text-display-md mb-4 block">search_off</span>
              No stays found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, idx) => (
                <PropertyCard key={property.id || idx} {...property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}