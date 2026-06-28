"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StayHeader from "../../../components/booking/StayHeader";
import ImageGallery from "../../../components/booking/ImageGallery";
import HostInfo from "../../../components/booking/HostInfo";
import AmenitiesList from "../../../components/booking/AmenitiesList";
import RoomSelection from "../../../components/booking/RoomSelection";
import BookingWidget from "../../../components/booking/BookingWidget";

export default function BookingPage() {
  const params = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${params.id}`);
        if (!res.ok) throw new Error("Failed to load room details");
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchRoom();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="grow pt-[104px] pb-xl flex justify-center items-center h-64">
        <div className="py-12 text-center text-on-surface-variant font-body-md">
          <span className="material-symbols-outlined animate-spin text-primary text-display-md mb-4 block">sync</span>
          Loading stay details...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="grow pt-[104px] pb-xl flex justify-center items-center h-64">
        <div className="py-12 text-center text-error font-body-md">
          <span className="material-symbols-outlined text-display-md mb-4 block">error</span>
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="grow pt-[104px] pb-xl">
      <div className="max-w-container-max mx-auto px-sm md:px-md">
        <StayHeader room={room} />
        <ImageGallery />
        {/* Main Content & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-gutter relative">
          {/* Left Column (Content) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-xl">
            <HostInfo />
            <AmenitiesList amenities={room?.amenities} />
            <RoomSelection room={room} />
          </div>
          {/* Right Column (Sticky Booking Widget) */}
          <BookingWidget room={room} />
        </div>
      </div>
    </main>
  );
}