import React from "react";
import StayHeader from "../../components/booking/StayHeader";
import ImageGallery from "../../components/booking/ImageGallery";
import HostInfo from "../../components/booking/HostInfo";
import AmenitiesList from "../../components/booking/AmenitiesList";
import RoomSelection from "../../components/booking/RoomSelection";
import BookingWidget from "../../components/booking/BookingWidget";

export default function BookingPage() {
  return (
    <main className="grow pt-[104px] pb-xl">
      <div className="max-w-container-max mx-auto px-sm md:px-md">
        <StayHeader />
        <ImageGallery />
        {/* Main Content & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-gutter relative">
          {/* Left Column (Content) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-xl">
            <HostInfo />
            <AmenitiesList />
            <RoomSelection />
          </div>
          {/* Right Column (Sticky Booking Widget) */}
          <BookingWidget />
        </div>
      </div>
    </main>
  );
}