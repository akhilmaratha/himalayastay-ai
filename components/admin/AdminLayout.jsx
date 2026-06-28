import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-80 flex-1 p-lg max-w-[1400px]">
        <AdminHeader />
        {children}
      </main>
      {/* Background Elements */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary-fixed/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed top-0 left-64 w-64 h-64 bg-secondary-fixed/10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
    </div>
  );
}
