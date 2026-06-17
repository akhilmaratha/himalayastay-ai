import React from "react";
import MinimalHeader from "../../components/checkout/MinimalHeader";
import GuestForm from "../../components/checkout/GuestForm";
import BookingSummary from "../../components/checkout/BookingSummary";
import MinimalFooter from "../../components/checkout/MinimalFooter";

export default function CheckoutPage() {
  return (
    <div className="grow flex flex-col min-h-screen bg-surface">
      <MinimalHeader />
      <main className="grow flex items-center justify-center p-sm md:p-lg">
        <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <GuestForm />
          <BookingSummary />
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
}
