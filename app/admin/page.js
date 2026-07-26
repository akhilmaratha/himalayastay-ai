"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // 1. Authenticate
        const authRes = await fetch('/api/auth/status');
        const authData = await authRes.json();
        
        if (!authData.isAuthenticated) {
          router.push('/admin/login');
          return;
        }
        
        const currentUser = authData.user || { name: 'Admin', role: 'admin' };
        setUser(currentUser);

        // 2. Fetch Data
        const [bookingsRes, roomsRes, reviewsRes] = await Promise.all([
          fetch('/api/bookings'),
          fetch('/api/rooms'),
          fetch('/api/reviews')
        ]);

        if (!bookingsRes.ok || !roomsRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const allBookings = await bookingsRes.json();
        const allRooms = await roomsRes.json();
        const allReviews = await reviewsRes.json();

        // 3. Filter for logged-in user (if not admin)
        // If admin, show everything. If user, show only their data.
        const isAdmin = currentUser.role === 'admin';
        const userBookings = isAdmin ? allBookings : allBookings.filter(b => b.user === currentUser.name || b.user === currentUser.email);
        const userReviews = isAdmin ? allReviews : allReviews.filter(r => r.user === currentUser.name || r.user === currentUser.email);
        const userRooms = allRooms; // Rooms are shared

        // 4. Calculate Stats
        const totalBookings = userBookings.length;
        const totalRooms = userRooms.length;
        const revenue = userBookings.reduce((sum, b) => sum + (b.totalPrice || 5000), 0);
        const totalReviewsCount = userReviews.length;
        
        const recentBookings = [...userBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        const recentReviews = [...userReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        
        // Upcoming Check-ins (bookings that are Confirmed and date is in future, simplistic check)
        const upcomingCheckins = userBookings.filter(b => b.status !== 'Cancelled').slice(0, 5); // Simplistic approach for demo

        setStats({
          totalBookings,
          totalRooms,
          revenue,
          totalReviews: totalReviewsCount,
          recentBookings,
          recentReviews,
          upcomingCheckins,
        });

      } catch (err) {
        setError(err.message);
        showToast(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    initDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner className="w-10 h-10 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-error font-bold">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="mb-xl">
        <h2 className="font-display-lg text-display-lg text-primary">Welcome, {user?.name || 'User'}!</h2>
        <p className="text-on-surface-variant text-body-lg mt-xs">Here is the latest overview of your properties.</p>
      </div>

      {/* Metric Cards Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        {/* Total Rooms */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-primary-fixed text-on-primary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">meeting_room</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Total Rooms</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">{stats?.totalRooms || 0}</h3>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-secondary-fixed text-on-secondary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">book_online</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Total Bookings</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">{stats?.totalBookings || 0}</h3>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Revenue</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">₹{stats?.revenue?.toLocaleString('en-IN') || 0}</h3>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-sm bg-surface-container-highest text-on-surface-variant rounded-lg">
              <span className="material-symbols-outlined">star</span>
            </div>
          </div>
          <div className="mt-md">
            <span className="text-on-surface-variant text-label-md">Reviews</span>
            <h3 className="font-display-md text-display-md text-primary mt-xs">{stats?.totalReviews || 0}</h3>
          </div>
        </div>
      </section>

      {/* Main Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-md mb-xl">
        
        {/* Upcoming Check-ins */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl shadow-sm overflow-hidden">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <h4 className="font-headline-lg text-headline-lg text-primary">Upcoming Check-ins</h4>
          </div>
          <div className="p-md space-y-md">
            {stats?.upcomingCheckins?.length === 0 ? (
              <p className="text-on-surface-variant text-body-md text-center py-4">No upcoming check-ins.</p>
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

        {/* Recent Reviews */}
        <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl shadow-sm overflow-hidden">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <h4 className="font-headline-lg text-headline-lg text-primary">Recent Reviews</h4>
          </div>
          <div className="p-md space-y-md">
            {stats?.recentReviews?.length === 0 ? (
              <p className="text-on-surface-variant text-body-md text-center py-4">No recent reviews.</p>
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

      {/* Recent Bookings Table Section */}
      <section className="bg-surface/70 backdrop-blur-md border-x border-b border-outline-variant/50 rounded-xl shadow-sm overflow-hidden border-t-4 border-t-primary">
        <div className="p-lg flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <h4 className="font-headline-lg text-headline-lg text-primary">Recent Bookings</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
                <tr><td colSpan="4" className="text-center py-8">No recent bookings.</td></tr>
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

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md z-50 ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}

