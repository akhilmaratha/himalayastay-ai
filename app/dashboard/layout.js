"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await signOut({ redirect: false });
      showToast("Logged out successfully! Redirecting...", "success");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (error) {
      showToast("Failed to logout", "error");
    }
  };

  return (
    <div className="flex max-w-container-max mx-auto min-h-screen pt-20">
      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-low h-[calc(100vh-5rem)] sticky top-20 border-r border-surface-container-highest shrink-0">
        <div className="p-md">
          {/* User Profile */}
          <div className="flex items-center gap-sm mb-lg">
            <img 
              alt="Traveler Profile" 
              className="w-12 h-12 rounded-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBosFF3aAPq9XiwlMxQz0Pq70QFbmsnpxvZdQ7l2vcEBIPqh8VU1qbGXhX5Q8qHjkZSPfbnpP1W51pPEjTz_hPq05s7i4NQ9daJiiTmPcgNCAP0lGvjoeCzMucOgw1b_qglLKZ-hE3fKCp0k09vUTG_wqb7DrMWDtL7c0uHVXDEf9hdB41atMwtaO5YMORfDBLMf7xtwqpEZT00jlV1lXRMKCIvzUyctA0z9yDchGLmEmYt9Fkq1qRMf3gxk1OthFy62WYMAUTTSxwA"
            />
            <div>
              <p className="font-label-md text-label-md text-on-surface">Alex Explorer</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Traveler</p>
            </div>
          </div>
          <nav className="flex flex-col gap-sm">
            <Link 
              className={`flex items-center gap-sm p-sm rounded-lg transition-all duration-200 ${pathname === '/dashboard' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
              href="/dashboard"
            >
              <span className="material-symbols-outlined" style={pathname === '/dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>luggage</span>
              My Bookings
            </Link>
            <Link 
              className={`flex items-center gap-sm p-sm rounded-lg transition-all duration-200 ${pathname === '/dashboard/saved' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
              href="/dashboard/saved"
            >
              <span className="material-symbols-outlined" style={pathname === '/dashboard/saved' ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
              Saved Stays
            </Link>
            <Link 
              className={`flex items-center gap-sm p-sm rounded-lg transition-all duration-200 ${pathname === '/dashboard/reviews' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
              href="/dashboard/reviews"
            >
              <span className="material-symbols-outlined" style={pathname === '/dashboard/reviews' ? { fontVariationSettings: "'FILL' 1" } : {}}>rate_review</span>
              Reviews
            </Link>
            <Link 
              className={`flex items-center gap-sm p-sm rounded-lg transition-all duration-200 ${pathname === '/dashboard/profile' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
              href="/dashboard/profile"
            >
              <span className="material-symbols-outlined" style={pathname === '/dashboard/profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
              Profile
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-md flex flex-col gap-sm">
          <Link 
            className={`flex items-center gap-sm p-sm rounded-lg transition-all duration-200 ${pathname === '/dashboard/settings' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
            href="/dashboard/settings"
          >
            <span className="material-symbols-outlined" style={pathname === '/dashboard/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
            Settings
          </Link>
          {/* <Link className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
            <span className="material-symbols-outlined">help</span>
            Support
          </Link> */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-sm p-sm text-error hover:bg-surface-container-high rounded-lg transition-colors duration-200 w-full text-left font-label-md"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      {children}

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-surface border-t border-surface-container-highest flex items-center justify-around z-40">
        <Link className={`flex flex-col items-center justify-center gap-xs w-16 transition-colors ${pathname === '/dashboard' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="/dashboard">
          <span className={`material-symbols-outlined ${pathname === '/dashboard' ? 'bg-primary-container text-on-primary-container px-md py-[2px] rounded-full' : ''}`} style={pathname === '/dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>luggage</span>
          <span className="font-label-sm text-label-sm">Bookings</span>
        </Link>
        <Link className={`flex flex-col items-center justify-center gap-xs w-16 transition-colors ${pathname === '/dashboard/saved' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="/dashboard/saved">
          <span className={`material-symbols-outlined ${pathname === '/dashboard/saved' ? 'bg-primary-container text-on-primary-container px-md py-[2px] rounded-full' : ''}`} style={pathname === '/dashboard/saved' ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
          <span className="font-label-sm text-label-sm">Saved</span>
        </Link>
        <Link className="flex flex-col items-center justify-center gap-xs text-on-surface-variant hover:text-primary w-16 transition-colors" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </Link>
      </nav>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md z-50 ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
