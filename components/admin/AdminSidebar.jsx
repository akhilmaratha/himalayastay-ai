"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-surface-container-low dark:bg-surface-container-highest h-full w-80 fixed left-0 top-0 flex flex-col p-md gap-sm border-r border-outline-variant/30 z-40">
      <div className="mb-lg px-xs mt-4">
        <h1 className="font-display-md text-display-md font-bold text-primary">Himalayan Stays</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Admin Console</p>
      </div>
      <nav className="flex-1 flex flex-col gap-xs overflow-y-auto">
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/bookings' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/bookings"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/bookings' ? { fontVariationSettings: "'FILL' 1" } : {}}>event_available</span>
          <span className="font-label-md text-label-md">Bookings</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/calendar' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/calendar"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/calendar' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_month</span>
          <span className="font-label-md text-label-md">Calendar</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/rooms' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/rooms"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/rooms' ? { fontVariationSettings: "'FILL' 1" } : {}}>bed</span>
          <span className="font-label-md text-label-md">Rooms</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/guests' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/guests"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/guests' ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
          <span className="font-label-md text-label-md">Guests</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/reviews' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/reviews"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/reviews' ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
          <span className="font-label-md text-label-md">Reviews</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/insights' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/insights"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/insights' ? { fontVariationSettings: "'FILL' 1" } : {}}>psychology</span>
          <span className="font-label-md text-label-md">AI Insights</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/revenue' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/revenue"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/revenue' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
          <span className="font-label-md text-label-md">Revenue</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/profile' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/profile"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>home_work</span>
          <span className="font-label-md text-label-md">Property Profile</span>
        </Link>
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/gallery' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/gallery"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/gallery' ? { fontVariationSettings: "'FILL' 1" } : {}}>imagesmode</span>
          <span className="font-label-md text-label-md">Gallery</span>
        </Link>
      </nav>
      
      <div className="mt-auto pt-sm border-t border-outline-variant/30 flex flex-col gap-sm">
        <Link 
          className={`rounded-lg flex items-center gap-md p-md transition-all duration-200 ${pathname === '/admin/settings' ? 'bg-primary-container text-on-primary-container font-bold active:scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`} 
          href="/admin/settings"
        >
          <span className="material-symbols-outlined" style={pathname === '/admin/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </Link>
        <Link 
          href="/admin/bookings/new"
          className="w-full bg-primary text-on-primary py-md rounded-xl font-label-md text-label-md flex items-center justify-center gap-xs hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">add</span>
          New Booking
        </Link>
      </div>
    </aside>
  );
}
