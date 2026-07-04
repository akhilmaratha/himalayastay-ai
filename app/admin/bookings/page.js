"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal & Toast State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [statusInput, setStatusInput] = useState('');
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const fetchBookings = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (!res.ok) throw new Error('Failed to load bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(false);
  }, []);

  const openEditModal = (booking) => {
    setCurrentBooking(booking);
    setStatusInput(booking.status || 'Pending');
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/bookings/${currentBooking._id || currentBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusInput })
      });
      if (!res.ok) throw new Error('Failed to update status');
      await fetchBookings();
      setIsEditOpen(false);
      showToast('Booking status updated successfully');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-lg">
        <div>
          <h2 className="font-display-lg text-display-lg text-primary">Booking Management</h2>
          <p className="text-on-surface-variant text-body-lg mt-xs max-w-2xl">Manage and track all guest reservations across your properties with real-time updates and seamless oversight.</p>
        </div>
        <Link href="/admin/bookings/new" className="bg-primary hover:bg-primary-container text-on-primary px-xl py-sm rounded-lg flex items-center gap-xs transition-all duration-300 transform hover:-translate-y-1 shadow-md">
          <span className="material-symbols-outlined">add</span>
          <span className="font-label-md">New Booking</span>
        </Link>
      </div>

      {/* Filter Bar Section */}
      <div className="bg-surface/70 backdrop-blur-md rounded-xl p-sm shadow-sm hover:shadow-md transition-shadow mb-md flex flex-wrap items-center justify-between gap-md border border-outline-variant/20">
        <div className="flex items-center gap-xs">
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 bg-primary text-on-primary">All Bookings</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high">Upcoming</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high">Checked-In</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high">Completed</button>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs text-on-surface-variant px-sm py-xs rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span className="font-label-sm">May 1 - May 31, 2024</span>
          </div>
          <button className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="font-label-sm">Filters</span>
          </button>
        </div>
      </div>

      {/* Table Section (The Guest List) */}
      <div className="bg-surface/70 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-outline-variant/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Guest Name</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Property / Room</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Stay Dates</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Source</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider">Status</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider text-right">Amount</th>
                <th className="px-gutter py-md font-label-sm text-outline uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                <tr><td colSpan="7" className="text-center py-8">Loading bookings...</td></tr>
              ) : error ? (
                <tr><td colSpan="7" className="text-center py-8 text-error">{error}</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-8">No bookings found.</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id || booking.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-gutter py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden relative flex items-center justify-center text-primary font-bold">
                          {booking.user ? booking.user.charAt(0) : 'G'}
                        </div>
                        <div>
                          <p className="font-headline-lg-mobile text-on-surface">{booking.user || 'Guest'}</p>
                          <p className="text-label-sm text-on-surface-variant">#{String(booking._id || booking.id).slice(-4)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-gutter py-md">
                      <p className="text-on-surface font-medium">Room ID: {booking.roomId || 'N/A'}</p>
                    </td>
                    <td className="px-gutter py-md text-on-surface font-body-md">
                      {booking.dates || 'N/A'}
                    </td>
                    <td className="px-gutter py-md">
                      <span className="px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-surface-container-high text-on-surface-variant">Website</span>
                    </td>
                    <td className="px-gutter py-md">
                      <span className={`inline-flex items-center gap-1.5 px-sm py-1 rounded-full text-[11px] font-bold uppercase ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : booking.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200'} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-600' : booking.status === 'Cancelled' ? 'bg-red-600' : 'bg-amber-600'}`}></span>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-gutter py-md text-right font-headline-lg-mobile text-primary">
                      ₹{booking.totalPrice || 0}
                    </td>
                    <td className="px-gutter py-md text-center">
                      <div className="flex justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        <button onClick={() => openEditModal(booking)} className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-gutter py-md bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30">
          <p className="text-label-sm text-on-surface-variant">Showing 1 to {bookings.length} of {bookings.length} reservations</p>
          <div className="flex items-center gap-xs">
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md">1</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md">2</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md">3</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bento Grid (Secondary Information) */}
      <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="bg-surface/70 backdrop-blur-md p-md rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Occupancy Rate</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-primary">84%</span>
            <span className="text-green-600 font-label-sm flex items-center gap-1 pb-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12%
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full mt-md overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '84%' }}></div>
          </div>
        </div>
        
        <div className="bg-surface/70 backdrop-blur-md p-md rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Active Check-ins</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-primary">12</span>
            <span className="text-on-surface-variant font-label-sm pb-1">Expected today</span>
          </div>
          <div className="flex mt-md -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-400"></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-500"></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center text-[10px] text-on-primary font-bold">+9</div>
          </div>
        </div>
        
        <div className="bg-surface/70 backdrop-blur-md p-md rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">Direct Revenue</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-secondary">₹1.4L</span>
            <span className="text-secondary font-label-sm flex items-center gap-1 pb-1">
              <span className="material-symbols-outlined text-[16px]">payments</span>
              34% of total
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-md">Admin-created bookings continue to lead high-value stays.</p>
        </div>
      </div>

      {/* Floating Action Button (FAB) - For New Booking Shortcut */}
      <Link href="/admin/bookings/new" className="fixed bottom-lg right-lg w-14 h-14 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 md:hidden">
        <span className="material-symbols-outlined">add</span>
      </Link>

      {/* Edit Status Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-surface p-xl rounded-xl w-full max-w-sm shadow-lg border border-outline-variant/30">
            <h3 className="text-headline-md font-display-md text-primary mb-md">Update Status</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-sm">
              <select 
                value={statusInput} 
                onChange={(e) => setStatusInput(e.target.value)} 
                className="p-sm border rounded w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="flex justify-end gap-sm mt-md">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-md py-sm bg-surface-container-high rounded text-on-surface">Cancel</button>
                <button type="submit" className="px-md py-sm bg-primary text-white rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </>
  );

}
