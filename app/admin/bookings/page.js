"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal & Toast State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [statusInput, setStatusInput] = useState('');
  
  // Confirmation Dialog State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  }, []);

  const fetchBookings = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const [resBookings, resDashboard] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/dashboard')
      ]);
      if (!resBookings.ok) throw new Error('Failed to load bookings');
      const dataBookings = await resBookings.json();
      setBookings(dataBookings);
      
      if (resDashboard.ok) {
        const dataDashboard = await resDashboard.json();
        setDashboardStats(dataDashboard);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings(false);
  }, [fetchBookings]);

  const openEditModal = useCallback((booking) => {
    setCurrentBooking(booking);
    setStatusInput(booking.status || 'Pending');
    setIsEditOpen(true);
  }, []);

  const handleEditSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/bookings/${currentBooking._id || currentBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusInput })
      });
      if (!res.ok) throw new Error('Failed to update status');
      await fetchBookings(false);
      setIsEditOpen(false);
      showToast('Booking status updated successfully');
    } catch (err) {
      showToast(err.message, 'error');
    }
  }, [currentBooking, statusInput, fetchBookings, showToast]);

  const confirmDelete = useCallback(async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/bookings/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete booking');
      await fetchBookings(false);
      showToast('Booking deleted successfully');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }, [deleteId, fetchBookings, showToast]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-primary">Booking Management</h2>
          <p className="text-on-surface-variant text-body-lg mt-xs max-w-2xl">Manage and track all guest reservations across your properties with real-time updates and seamless oversight.</p>
        </div>
        <Link href="/admin/bookings/new" className="bg-primary hover:bg-primary-container text-on-primary px-xl py-sm rounded-lg flex items-center justify-center gap-xs transition-all duration-300 transform hover:-translate-y-1 shadow-md whitespace-nowrap">
          <span className="material-symbols-outlined">add</span>
          <span className="font-label-md">New Booking</span>
        </Link>
      </div>

      <div className="bg-surface/70 backdrop-blur-md rounded-xl p-sm shadow-sm hover:shadow-md transition-shadow mb-md flex flex-wrap items-center justify-between gap-md border border-outline-variant/20">
        <div className="flex items-center gap-xs overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 bg-primary text-on-primary whitespace-nowrap">All Bookings</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap">Upcoming</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap">Checked-In</button>
          <button className="px-md py-xs rounded-full font-label-md transition-all duration-200 text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap">Completed</button>
        </div>
        <div className="flex items-center gap-md w-full md:w-auto">
          <div className="flex flex-1 items-center gap-xs text-on-surface-variant px-sm py-xs rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors justify-center md:justify-start">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span className="font-label-sm whitespace-nowrap">May 1 - May 31, 2024</span>
          </div>
          <button className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="font-label-sm">Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-surface/70 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
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
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <Spinner className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-on-surface-variant">Loading bookings...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-error">
                    <span className="material-symbols-outlined text-4xl mb-2">error</span>
                    <p>{error}</p>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <div className="flex flex-col items-center gap-4">
                      <span className="material-symbols-outlined text-6xl text-outline-variant/50">event_busy</span>
                      <div>
                        <p className="font-display-md text-display-md text-primary">No Bookings Found</p>
                        <p className="text-on-surface-variant">You don't have any reservations yet.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id || booking.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-gutter py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden relative flex items-center justify-center text-primary font-bold shrink-0">
                          {booking.user ? booking.user.charAt(0).toUpperCase() : 'G'}
                        </div>
                        <div>
                          <p className="font-headline-lg-mobile text-on-surface">{booking.user || 'Guest'}</p>
                          <p className="text-label-sm text-on-surface-variant">#{String(booking._id || booking.id).slice(-4)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-gutter py-md">
                      <p className="text-on-surface font-medium whitespace-nowrap">Room ID: {booking.roomId || 'N/A'}</p>
                    </td>
                    <td className="px-gutter py-md text-on-surface font-body-md whitespace-nowrap">
                      {booking.dates || 'N/A'}
                    </td>
                    <td className="px-gutter py-md">
                      <span className="px-sm py-1 rounded-full text-[11px] font-bold uppercase bg-surface-container-high text-on-surface-variant whitespace-nowrap">Website</span>
                    </td>
                    <td className="px-gutter py-md">
                      <span className={`inline-flex items-center gap-1.5 px-sm py-1 rounded-full text-[11px] font-bold uppercase ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : booking.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200'} border whitespace-nowrap`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-600' : booking.status === 'Cancelled' ? 'bg-red-600' : 'bg-amber-600'}`}></span>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-gutter py-md text-right font-headline-lg-mobile text-primary whitespace-nowrap">
                      ₹{booking.totalPrice || 0}
                    </td>
                    <td className="px-gutter py-md text-center">
                      <div className="flex justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(booking)} className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                        <button onClick={() => setDeleteId(booking._id || booking.id)} className="p-xs hover:bg-surface-container-high rounded-full text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-gutter py-md bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline-variant/30">
          <p className="text-label-sm text-on-surface-variant">Showing 1 to {bookings.length} of {bookings.length} reservations</p>
          <div className="flex items-center gap-xs">
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="hidden sm:flex gap-xs">
              <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md">1</button>
            </div>
            <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Occupancy Rate</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-primary">{dashboardStats?.occupancyRate || 0}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full mt-2 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${dashboardStats?.occupancyRate || 0}%` }}></div>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Total Bookings</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-primary">{dashboardStats?.totalBookings || 0}</span>
            <span className="text-on-surface-variant font-label-sm pb-1">All time</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Avg. Nightly Rate</p>
          <div className="flex items-end gap-sm">
            <span className="font-display-md text-display-md text-secondary">₹{dashboardStats?.avgNightlyRate || 0}</span>
          </div>
          <p className="text-label-sm text-on-surface-variant">Across all listed properties.</p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-full max-w-sm shadow-xl border border-outline-variant/30 animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div>
                <h3 className="font-display-md text-headline-sm text-on-surface mb-2">Delete Booking</h3>
                <p className="text-on-surface-variant">Are you sure you want to delete this booking? This action cannot be undone.</p>
              </div>
              <div className="flex gap-sm mt-4 w-full">
                <button onClick={() => setDeleteId(null)} disabled={isDeleting} className="flex-1 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 px-4 py-2 bg-error hover:bg-error/90 text-on-error rounded-lg transition-colors flex justify-center items-center">
                  {isDeleting ? <Spinner className="w-5 h-5 text-white" /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-full max-w-sm shadow-xl border border-outline-variant/30 animate-in zoom-in-95">
            <h3 className="text-headline-md font-display-md text-primary mb-md">Update Status</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider">Status</label>
                <select 
                  value={statusInput} 
                  onChange={(e) => setStatusInput(e.target.value)} 
                  className="p-sm bg-surface border border-outline-variant rounded-lg w-full focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-sm mt-2">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-md py-2 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-on-surface transition-colors">Cancel</button>
                <button type="submit" className="px-md py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md z-50 animate-in slide-in-from-bottom-5 ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
