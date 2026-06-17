"use client";
import React from "react";

export default function GuestForm() {
  return (
    <div className="lg:col-span-7 flex flex-col gap-lg">
      <div>
        <h1 className="font-display-md text-display-md text-on-surface mb-xs">
          Guest Details
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Please provide your information to secure your stay.
        </p>
      </div>
      <form
        className="flex flex-col gap-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <div className="input-group">
            <input
              className="form-input-minimal font-body-md text-body-md"
              id="firstName"
              placeholder=" "
              type="text"
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-group">
            <input
              className="form-input-minimal font-body-md text-body-md"
              id="lastName"
              placeholder=" "
              type="text"
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className="input-group">
          <input
            className="form-input-minimal font-body-md text-body-md"
            id="email"
            placeholder=" "
            type="email"
          />
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="input-group">
          <input
            className="form-input-minimal font-body-md text-body-md"
            id="phone"
            placeholder=" "
            type="tel"
          />
          <label htmlFor="phone">Phone Number</label>
        </div>
        <div className="input-group mt-sm">
          <textarea
            className="form-input-minimal font-body-md text-body-md resize-none"
            id="requests"
            placeholder=" "
            rows="3"
          ></textarea>
          <label htmlFor="requests">Special Requests (Optional)</label>
        </div>
      </form>
    </div>
  );
}
