"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [rawData, setRawData] = useState({ bookings: [], rooms: [], reviews: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  }, []);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const authRes = await fetch('/api/auth/status');
        const authData = await authRes.json();
        
        if (!authData.isAuthenticated) {
          router.push('/admin/login');
          return;
        }
        
        setUser(authData.user || { name: 'Admin', role: 'admin' });

        const [bookingsRes, roomsRes, reviewsRes] = await Promise.all([
          fetch('/api/bookings'),
          fetch('/api/rooms'),
          fetch('/api/reviews')
        ]);

        if (!bookingsRes.ok || !roomsRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const [allBookings, allRooms, allReviews] = await Promise.all([
          bookingsRes.json(),
          roomsRes.json(),
          reviewsRes.json()
        ]);

        setRawData({ bookings: allBookings, rooms: allRooms, reviews: allReviews });
      } catch (err) {
        setError(err.message);
        showToast(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    initDashboard();
  }, [router, showToast]);

  const stats = useMemo(() => {
    if (!user) return null;
    
    const isAdmin = user.role === 'admin';
    const userBookings = isAdmin ? rawData.bookings : rawData.bookings.filter(b => b.user === user.name || b.user === user.email);
    const userReviews = isAdmin ? rawData.reviews : rawData.reviews.filter(r => r.user === user.name || r.user === user.email);
    const userRooms = rawData.rooms; 

    const totalBookings = userBookings.length;
    const totalRooms = userRooms.length;
    const revenue = userBookings.reduce((sum, b) => sum + (b.totalPrice || 5000), 0);
    const totalReviews = userReviews.length;
    
    const recentBookings = [...userBookings].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);
    const recentReviews = [...userReviews].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);
    
    const upcomingCheckins = userBookings.filter(b => b.status !== 'Cancelled').slice(0, 5);

    return { totalBookings, totalRooms, revenue, totalReviews, recentBookings, recentReviews, upcomingCheckins };
  }, [user, rawData]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Spinner className="w-10 h-10 text-primary mb-4 mx-auto" />
          <p className="font-label-md text-on-surface-variant animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center text-error font-bold text-center gap-4">
        <span className="material-symbols-outlined text-6xl">error</span>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-error text-on-error rounded-lg">Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-xl">
        <h2 className="font-display-lg text-display-lg text-primary">Welcome, {user?.name || 'User'}!</h2>
        <p className="text-on-surface-variant text-body-lg mt-xs">Here is the latest overview of your properties.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-primary-fixed text-on-primary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">meeting_room</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Total Rooms</span>
            {stats?.totalRooms > 0 ? (
              <h3 className="font-display-md text-display-md text-primary mt-xs">{stats.totalRooms}</h3>
            ) : (
              <p className="font-label-md text-on-surface-variant mt-2 italic">No Rooms</p>
            )}
          </div>
        </div>

        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-secondary-fixed text-on-secondary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">book_online</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Total Bookings</span>
            {stats?.totalBookings > 0 ? (
              <h3 className="font-display-md text-display-md text-primary mt-xs">{stats.totalBookings}</h3>
            ) : (
              <p className="font-label-md text-on-surface-variant mt-2 italic">No Bookings</p>
            )}
          </div>
        </div>

        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Revenue</span>
            {stats?.revenue > 0 ? (
              <h3 className="font-display-md text-display-md text-primary mt-xs">₹{stats.revenue.toLocaleString('en-IN')}</h3>
            ) : (
              <p className="font-label-md text-on-surface-variant mt-2 italic">No Revenue Data</p>
            )}
          </div>
        </div>

        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-surface-container-highest text-on-surface-variant rounded-lg">
              <span className="material-symbols-outlined">star</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Reviews</span>
            {stats?.totalReviews > 0 ? (
              <h3 className="font-display-md text-display-md text-primary mt-xs">{stats.totalReviews}</h3>
            ) : (
              <p className="font-label-md text-on-surface-variant mt-2 italic">No Reviews</p>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-md mb-xl">
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <h4 className="font-headline-lg text-headline-lg text-primary">Upcoming Check-ins</h4>
          </div>
          <div className="p-md space-y-md flex-1">
            {stats?.upcomingCheckins?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-on-surface-variant py-8 gap-3">
                <span className="material-symbols-outlined text-4xl opacity-50">event_busy</span>
                <p className="font-body-md italic">No Guests Arriving</p>
              </div>
            ) : (
              stats?.upcomingCheckins?.map((booking, idx) => (
                <div key={idx} className="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold">
                    {booking.user?.charAt(0).toUpperCase() || 'G'}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-on-surface">{booking.user || 'Guest'}</h5>
                    <p className="text-label-sm text-on-surface-variant">{booking.dates || 'Dates TBA'}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-sm py-1 bg-secondary-fixed text-on-secondary-fixed text-[11px] rounded-full uppercase tracking-wider font-bold">
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <h4 className="font-headline-lg text-headline-lg text-primary">Recent Reviews</h4>
          </div>
          <div className="p-md space-y-md flex-1">
            {stats?.recentReviews?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-on-surface-variant py-8 gap-3">
                <span className="material-symbols-outlined text-4xl opacity-50">reviews</span>
                <p className="font-body-md italic">No Reviews Yet</p>
              </div>
            ) : (
              stats?.recentReviews?.map((review, idx) => (
                <div key={idx} className="flex flex-col gap-xs p-sm hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-on-surface">{review.user || 'Guest'}</h5>
                    <div className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined text-[16px] [font-variation-settings:'FILL'_1]">star</span>
                      <span className="font-bold text-label-sm">{review.rating || 5}/5</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2">{review.comment || 'No comment provided.'}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl shadow-sm overflow-hidden border-t-4 border-t-primary">
        <div className="p-lg flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-outline-variant/30">
          <h4 className="font-headline-lg text-headline-lg text-primary">Recent Bookings</h4>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant">
                <th className="px-lg py-md font-label-md text-label-md">Guest</th>
                <th className="px-lg py-md font-label-md text-label-md">Dates</th>
                <th className="px-lg py-md font-label-md text-label-md">Total Amount</th>
                <th className="px-lg py-md font-label-md text-label-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {stats?.recentBookings?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-on-surface-variant">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-4xl opacity-50">event_busy</span>
                      <p className="font-body-md italic">No Bookings Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                stats?.recentBookings?.map((booking, idx) => (
                  <tr key={booking._id || idx} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-lg py-md">
                      <div className="font-bold text-on-surface">{booking.user || "Guest"}</div>
                    </td>
                    <td className="px-lg py-md">
                      <div className="text-body-md">{booking.dates || "N/A"}</div>
                    </td>
                    <td className="px-lg py-md font-bold text-primary">₹{booking.totalPrice || 5000}</td>
                    <td className="px-lg py-md">
                      <span className="flex items-center gap-1 text-secondary font-bold text-label-sm">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span> {booking.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md z-50 animate-in slide-in-from-bottom-5 ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
