"use client";
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function NewBooking() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    user: '',
    email: '',
    phone: '',
    country: 'India',
    dates: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    roomId: '',
    specialRequests: '',
    status: 'Confirmed'
  });

  const rooms = [
    { id: '101', name: 'Master Pine Suite', desc: 'King Bed • Mountain View • Private Balcony', price: 12500, status: 'Available', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_PEOPfZzoAG_bg5-aNopDGbAPXHC2b4pn5UNIdoDTtUB5HMzUzJqz_pMcGMufRPolcYKzQ1OJB8KgASREQj4ac22vntpdhg60t_kxA97V4R00yIQB2HvOjQi8uYHT9Y-SyFsO2bGqafnOj2AYQ4EB7n-JG-ieqgTvP-plpHlNHPRH3OIlK8hZ30GoibE7Id-F7EQQETmgGPkHEZfcrJyaP6Um-8W25sXS_pYWKHUa2eFWCWfOgEot9-rnZ0tuhOgu_u82Ux23bHFO' },
    { id: '102', name: 'The Attic Nook', desc: 'Queen Bed • Skylight • Reading Corner', price: 8200, status: 'Available', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHonSnNHxXeD_B-EYGbTM7QybyGjpRPxQoLfw6QTQQpYeryrJBTkZAxPE4cTtrWBvIpkJJKeBNTKIkSfbe3rlTAIkFY_5iXlU8MrKh2HsR0jjDxKz7KubwgmPv2b-isVh9kLv7tjO0NXnBGGj34k1csLlPjDORNy4ls0Im-7YlI__hkYYCHn7UDcQw7gos09YncsivnShkQ45vm8gZn9EJZ4UkJavMCqO9uB5YvY2SZQZYyfs69-GTt7AenOyv0jeHONwqJm9uWSxp' },
    { id: '103', name: 'Stone Hearth Studio', desc: 'Double Bed • Fireplace Access', price: 6800, status: 'Occupied', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBntB526KzqXf9CUcvQRjzR9lFzOYL57zo58rv3UUOuHgfYNcF2ZN5muQ0swOepx21kqMRWqKQdOJnr4RlrNSsKAb0w75FSl0BcQnYDbLpBFc-hnH0nPz__26vKJG-I6j7u5joNI9pNW_mzEwcECsQP0X7mtoJoqvN0Qau0F_CI3tqFdEkBha1MFCBVLeIbVpEVpfBFiEkw2Lldv81dHVQdz2e6jWmutBOKzeRQWcB583Ry-azW3HI0D1oXds3-8m3cgqcvK-fYDBsj' }
  ];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const calculateTotal = useCallback(() => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomId) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const room = rooms.find(r => r.id === formData.roomId);
    if (!room) return 0;
    
    const baseRate = room.price * nights;
    const serviceFee = baseRate * 0.10;
    const tourismTax = 1200;
    return baseRate + serviceFee + tourismTax;
  }, [formData.checkIn, formData.checkOut, formData.roomId, rooms]);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.user || !formData.roomId || !formData.checkIn || !formData.checkOut) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const dates = `${new Date(formData.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(formData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: formData.user,
          roomId: formData.roomId,
          dates,
          status: formData.status,
          totalPrice: calculateTotal()
        })
      });
      
      if (!res.ok) throw new Error('Failed to create booking');
      
      showToast('Booking created successfully', 'success');
      setTimeout(() => router.push('/admin/bookings'), 1500);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [formData, calculateTotal, router, showToast]);

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 ${toast.type === 'error' ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}>
          <span className="material-symbols-outlined">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
          <span className="font-label-md">{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-xl gap-4">
        <div>
          <h3 className="font-display-lg text-display-lg text-primary mb-xs">Create Manual Booking</h3>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">Enter the reservation details for guests booking directly via phone or walk-in. Prices update dynamically based on selections.</p>
        </div>
        <Link href="/admin/bookings" className="flex items-center gap-xs text-secondary font-label-md hover:underline whitespace-nowrap">
          <span className="material-symbols-outlined text-sm" data-icon="arrow_back">arrow_back</span>
          Back to Bookings
        </Link>
      </div>

      {/* Bento-ish Form Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: Guest & Stay */}
        <div className="lg:col-span-8 space-y-gutter">
          {/* Section 1: Guest Information */}
          <section className="bg-surface/70 backdrop-blur-md p-md md:p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <div className="flex items-center justify-between mb-xl">
              <h4 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm">
                <span className="material-symbols-outlined" data-icon="person">person</span>
                Guest Information
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Full Name *</label>
                <input required name="user" value={formData.user} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" placeholder="e.g. Rahul Sharma" type="text" />
              </div>
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Email Address</label>
                <input name="email" value={formData.email} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" placeholder="rahul.sharma@example.com" type="email" />
              </div>
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" placeholder="+91 98765 43210" type="tel" />
              </div>
              <div className="flex flex-col gap-xs group">
                <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Country/Region</label>
                <select name="country" value={formData.country} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md appearance-none">
                  <option>India</option>
                  <option>United Kingdom</option>
                  <option>USA</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Stay Details */}
          <section className="bg-surface/70 backdrop-blur-md p-md md:p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <h4 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm mb-xl">
              <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
              Stay Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Check-in *</label>
                  <input required name="checkIn" value={formData.checkIn} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" type="date" />
                </div>
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Check-out *</label>
                  <input required name="checkOut" value={formData.checkOut} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" type="date" />
                </div>
              </div>
              <div className="md:col-span-4 grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Adults</label>
                  <input name="adults" value={formData.adults} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" min="1" type="number" />
                </div>
                <div className="flex flex-col gap-xs group">
                  <label className="font-label-sm text-primary uppercase tracking-wider group-focus-within:font-bold transition-all">Children</label>
                  <input name="children" value={formData.children} onChange={handleInputChange} className="border-0 border-b border-outline-variant bg-transparent px-0 py-2 focus:ring-0 focus:border-primary outline-none transition-all font-body-md" min="0" type="number" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Room Selection */}
          <section className="bg-surface/70 backdrop-blur-md p-md md:p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <h4 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm mb-xl">
              <span className="material-symbols-outlined" data-icon="bed">bed</span>
              Room Selection *
            </h4>
            <div className="space-y-md">
              {rooms.map(room => (
                <label key={room.id} className={`flex flex-col sm:flex-row items-start sm:items-center gap-md p-md rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border-b border-outline-variant last:border-0 group ${room.status !== 'Available' ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}>
                  <div className="flex items-center gap-md w-full sm:w-auto">
                    <input required disabled={room.status !== 'Available'} name="roomId" value={room.id} checked={formData.roomId === room.id} onChange={handleInputChange} className="w-5 h-5 accent-primary border-outline-variant cursor-pointer" type="radio" />
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 relative">
                      <Image fill sizes="(max-width: 64px) 100vw, 64px" loading="lazy" className="object-cover" alt={room.name} src={room.img} />
                    </div>
                  </div>
                  <div className="flex-1 mt-2 sm:mt-0">
                    <p className="font-label-md text-primary">{room.name}</p>
                    <p className="text-label-sm text-on-surface-variant">{room.desc}</p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0 w-full sm:w-auto flex justify-between sm:block">
                    <p className="font-label-md text-primary">₹{room.price.toLocaleString()} <span className="text-label-sm font-normal text-on-surface-variant">/ night</span></p>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${room.status === 'Available' ? 'text-green-600' : 'text-error'}`}>{room.status}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Payment & Summary */}
        <aside className="lg:col-span-4 space-y-gutter lg:sticky lg:top-28">
          {/* Summary Card */}
          <section className="bg-primary text-on-primary p-md md:p-xl rounded-xl shadow-lg">
            <h4 className="font-display-md text-display-md mb-xl">Booking Summary</h4>
            <div className="space-y-md border-b border-primary-fixed-dim/30 pb-xl mb-xl">
              <div className="flex justify-between font-label-md opacity-80">
                <span>Base Rate</span>
                <span>₹{((calculateTotal() - (calculateTotal() > 0 ? 1200 : 0)) / 1.1 || 0).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
              </div>
              <div className="flex justify-between font-label-md opacity-80">
                <span>Service Fee (10%)</span>
                <span>₹{(((calculateTotal() - (calculateTotal() > 0 ? 1200 : 0)) / 1.1 * 0.1) || 0).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
              </div>
              <div className="flex justify-between font-label-md opacity-80">
                <span>Tourism Tax</span>
                <span>₹{calculateTotal() > 0 ? '1,200' : '0'}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-xl">
              <div>
                <p className="font-label-sm opacity-70 uppercase tracking-widest">Total Amount</p>
                <p className="font-display-md text-display-md">₹{calculateTotal().toLocaleString()}</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-20" data-icon="payments">payments</span>
            </div>
            
            <div className="space-y-md">
              <label className="block font-label-sm uppercase tracking-wider mb-xs">Payment Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-primary-fixed-dim text-primary py-sm px-md rounded-lg font-label-md text-sm border-2 border-primary-fixed-dim outline-none focus:ring-2 focus:ring-white transition-all">
                <option value="Confirmed">Confirmed & Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </section>

          {/* Special Requests */}
          <section className="bg-surface/70 backdrop-blur-md p-md md:p-xl rounded-xl shadow-sm border border-outline-variant/50">
            <label className="font-headline-lg text-headline-lg text-primary block mb-md">Special Requests</label>
            <textarea 
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="w-full h-32 bg-surface-container-low border-none rounded-lg p-md text-body-md focus:ring-2 focus:ring-primary transition-all resize-none outline-none" 
              placeholder="e.g. Dietary restrictions, late arrival, extra towels..."
            ></textarea>
          </section>

          {/* Action Buttons */}
          <div className="space-y-md">
            <button disabled={loading} type="submit" className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-xl rounded-xl font-headline-lg shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-70">
              {loading ? <Spinner className="w-6 h-6 text-white" /> : null}
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
            <button type="button" onClick={() => router.push('/admin/bookings')} className="w-full bg-surface-container text-on-surface-variant py-md rounded-xl font-label-md border border-outline-variant hover:bg-surface-variant transition-colors">
              Cancel & Discard
            </button>
          </div>
        </aside>
      </form>
    </>
  );
}
