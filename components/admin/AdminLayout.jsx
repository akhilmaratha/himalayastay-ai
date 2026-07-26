"use client";
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="lg:ml-80 flex-1 p-sm md:p-md lg:p-lg max-w-[1400px] w-full">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </main>
      {/* Background Elements */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary-fixed/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed top-0 left-64 w-64 h-64 bg-secondary-fixed/10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
    </div>
  );
}
