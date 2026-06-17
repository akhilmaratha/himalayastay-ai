"use client";
import React from "react";

const rooms = [
  {
    name: "Classic Mountain View",
    price: "4,500",
    description: "Ideal for couples. Features a king-size bed, ensuite bathroom, and a private wooden deck facing the valley.",
    beds: "1 King Bed",
    guests: "2 Guests",
    size: "350 sq ft",
    popular: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3rAGA-w5pIzEe0SiGFi9g0V5C-HnCtvaedokgVU1YDyNFnga7AUPBvFRnkzWXeFxJcgh-dv9WleqZL0XRvN_z92NbCaPkCGEnTGJBiXuAbZ7jgn-rYeL5IMqivxThqnoK2YSqn4aLXdCzlUHXiDoceeHKdg3wpxJnShWK6SzpUJoPlclUzGQgkahq-4waGCoQR2fyFSDHnNM5wv91gWqcd30uZOfJoD9_hyjC_qQSvuSllWXaMRYP-zmVb1n947_5yNuXTN8wVytW",
    selected: false,
  },
  {
    name: "Heritage Family Suite",
    price: "7,200",
    description: "Spacious layout with two interconnected rooms. Includes a private sitting area with a traditional Bukhari (wood stove).",
    beds: "2 Beds",
    guests: "4 Guests",
    size: "600 sq ft",
    popular: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKfCLxBcRNi6LNPd6JGMmJDWtGWjTR1L_90g8a8ZRWOZVmCwvRB5rYxuAjJSLbRfB7OgGbfpKrVHtuKGoVVoUYOOOQGsKYkM0Yh8KrEYjlxQ4OEAIfZmbi8g49MWi2Q_wMGHRZ-svcczGCViH5Dv9DZ089rHmQD6C4rZcy6o7ZjLF_SH28s-bKINnw-jv8deJ04doyq86eLGUKEiDk90P7TroRwPaum2F3XHawhvkK5-_rROWx1nplFnO6BHLiXg7nqoD0I160hbR4",
    selected: true,
  }
];

export default function RoomSelection() {
  return (
    <section className="border-b border-surface-container-high pb-lg">
      <h3 className="font-headline-lg text-headline-lg text-primary mb-md">
        Available Rooms
      </h3>
      <div className="flex flex-col gap-md">
        {rooms.map((room, idx) => (
          <div
            key={idx}
            className="bg-surface-container-low rounded-xl p-md border border-surface-container-high shadow-ambient-sm flex flex-col md:flex-row gap-md relative overflow-hidden"
          >
            {room.popular && (
              <div className="absolute top-0 right-0 bg-secondary text-on-secondary px-sm py-1 rounded-bl-lg font-label-sm text-label-sm z-10">
                Popular for families
              </div>
            )}
            <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden shrink-0">
              <img
                alt={room.name}
                className="w-full h-full object-cover"
                src={room.image}
              />
            </div>
            <div className="grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-xs">
                  <h4 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary">
                    {room.name}
                  </h4>
                  <div className="text-right">
                    <span className="font-display-md text-display-md text-primary">
                      ₹{room.price}
                    </span>
                    <div className="text-on-surface-variant font-label-sm text-label-sm">
                      / night
                    </div>
                  </div>
                </div>
                <p className="text-on-surface-variant font-body-md text-body-md mb-sm">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-xs mb-md">
                  <span className="inline-flex items-center gap-base bg-surface px-xs py-1 rounded font-label-sm text-label-sm text-on-surface-variant border border-surface-container-high">
                    <span className="material-symbols-outlined text-[14px]">
                      bed
                    </span>{" "}
                    {room.beds}
                  </span>
                  <span className="inline-flex items-center gap-base bg-surface px-xs py-1 rounded font-label-sm text-label-sm text-on-surface-variant border border-surface-container-high">
                    <span className="material-symbols-outlined text-[14px]">
                      group
                    </span>{" "}
                    {room.guests}
                  </span>
                  <span className="inline-flex items-center gap-base bg-surface px-xs py-1 rounded font-label-sm text-label-sm text-on-surface-variant border border-surface-container-high">
                    <span className="material-symbols-outlined text-[14px]">
                      square_foot
                    </span>{" "}
                    {room.size}
                  </span>
                </div>
              </div>
              {room.selected ? (
                <button className="w-full md:w-auto self-start px-md py-xs bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors shadow-ambient-sm">
                  Selected
                </button>
              ) : (
                <button className="w-full md:w-auto self-start px-md py-xs bg-surface border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-colors">
                  Select Room
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
