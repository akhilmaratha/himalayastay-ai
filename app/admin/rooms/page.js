"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal and Form States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', price: '', capacity: '', location: '', status: 'Available', type: 'Boutique Stay' });
  
  // Confirmation Dialog State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  }, []);

  const fetchRooms = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const [resRooms, resDashboard] = await Promise.all([
        fetch('/api/rooms'),
        fetch('/api/dashboard')
      ]);
      if (!resRooms.ok) throw new Error('Failed to load rooms');
      const dataRooms = await resRooms.json();
      setRooms(dataRooms);
      
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
    fetchRooms();
  }, [fetchRooms]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAddSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: Number(formData.price), capacity: Number(formData.capacity) })
      });
      if (!res.ok) throw new Error('Failed to add room');
      await fetchRooms(false);
      setIsAddOpen(false);
      showToast('Room added successfully');
      setFormData({ title: '', price: '', capacity: '', location: '', status: 'Available', type: 'Boutique Stay' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  }, [formData, fetchRooms, showToast]);

  const openEditPage = useCallback((room) => {
    const id = room._id || room.id;
    router.push(`/admin/rooms/new?editId=${id}`);
  }, [router]);

  const confirmDelete = useCallback(async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/rooms/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete room');
      await fetchRooms(false);
      showToast('Room deleted successfully');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }, [deleteId, fetchRooms, showToast]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .tonal-row:nth-child(even) {
            background-color: #f6f3f2;
        }
        .ambient-shadow {
            box-shadow: 0 4px 20px -2px rgba(45, 71, 57, 0.05);
        }
      `}} />
      <div className="p-sm md:p-xl max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">Room Management</h2>
            <p className="text-on-surface-variant font-body-lg mt-xs">Oversee and optimize your boutique inventory across all locations.</p>
          </div>
          <Link href="/admin/rooms/new" className="flex items-center justify-center gap-sm bg-primary text-white px-xl py-md rounded-lg font-label-md hover:scale-[1.02] active:scale-95 transition-all duration-200 ambient-shadow">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add New Room</span>
          </Link>
        </div>
        
        <div className="bg-surface-container-low p-md rounded-xl mb-lg flex flex-col md:flex-row items-center gap-md border border-outline-variant/20">
          <div className="flex flex-col gap-xs w-full md:flex-1 md:min-w-[200px]">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Search</span>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-xl pr-md py-sm bg-surface rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-body-md transition-all" placeholder="Search by name..." type="text"/>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-md w-full md:w-auto">
            <div className="flex flex-col gap-xs flex-1">
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Room Type</span>
              <select className="w-full bg-surface py-sm px-md rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-label-md">
                <option>All Types</option>
                <option>Boutique Stay</option>
                <option>Homestay</option>
                <option>Eco-Lodge</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs flex-1">
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Status</span>
              <select className="w-full bg-surface py-sm px-md rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-label-md">
                <option>All Status</option>
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow border border-outline-variant/20 w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-high/50 border-b border-outline-variant/50">
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Room Name</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Type</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant text-center">Capacity</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Base Rate</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant">Status</th>
                  <th className="px-md py-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-md text-on-surface">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <Spinner className="w-8 h-8 text-primary mx-auto mb-4" />
                      <p className="text-on-surface-variant">Loading rooms...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-error">
                      <span className="material-symbols-outlined text-4xl mb-2">error</span>
                      <p>{error}</p>
                    </td>
                  </tr>
                ) : rooms.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <div className="flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-6xl text-outline-variant/50">bed</span>
                        <div>
                          <p className="font-display-md text-display-md text-primary">No Rooms Available</p>
                          <p className="text-on-surface-variant">Get started by creating your first room listing.</p>
                        </div>
                        <Link href="/admin/rooms/new" className="px-6 py-2 bg-primary text-white rounded-lg mt-2">
                          Create Room
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room._id || room.id} className="tonal-row group hover:bg-primary-container/5 transition-colors cursor-pointer">
                      <td className="px-md py-md">
                        <div className="flex items-center gap-md">
                          <Image
                            width={48}
                            height={48}
                            sizes="48px"
                            loading="lazy"
                            className="w-12 h-12 rounded-lg object-cover" 
                            alt={room.title} 
                            src={room.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAW2P9m0D_fbdJew7NQz7RNxeXBVy9FzoKXcBO1xRHre3eLc8yS20gVeujS0IBTF9YhsGX3LynbUZ-VzUt6a6-um2e9o-JFI7fL6UpPpCoWbQiBwKGMFzkYVheFj4V_q1TRsapk8v8mjl4OZe6L_THED34cNT2bDeGtbtm4UZtygTFHn3aqGjMbMW5MpB1Bq4Y4QBn5WYt9-1usvVLQcI7gl1SuyqfbHY6NTd2sypvucWDkX4K49qc1EPXu3xlvSr3AHZrmGv6wheNX"}
                          />
                          <div>
                            <p className="font-bold">{room.title}</p>
                            <p className="text-label-sm text-on-surface-variant">{room.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-md py-md">
                        <span className="bg-surface-container py-xs px-sm rounded-full text-label-sm whitespace-nowrap">{room.type || 'Boutique Stay'}</span>
                      </td>
                      <td className="px-md py-md text-center">
                        <div className="flex flex-col items-center leading-tight whitespace-nowrap">
                          <span className="font-bold">{room.capacity} Guests</span>
                        </div>
                      </td>
                      <td className="px-md py-md whitespace-nowrap">
                        <span className="font-display-md text-md text-primary">₹{room.price}</span>
                        <span className="text-label-sm text-on-surface-variant">/night</span>
                      </td>
                      <td className="px-md py-md">
                        <div className={`inline-flex items-center gap-xs px-sm py-1 rounded-full text-label-sm whitespace-nowrap ${room.status === 'Available' ? 'bg-primary-fixed text-on-primary-fixed' : room.status === 'Occupied' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-error-container text-on-error-container'}`}>
                          <span className={`w-2 h-2 rounded-full ${room.status === 'Available' ? 'bg-primary animate-pulse' : room.status === 'Occupied' ? 'bg-secondary' : 'bg-error'}`}></span>
                          {room.status}
                        </div>
                      </td>
                      <td className="px-md py-md text-right">
                        <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditPage(room)} className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined font-light text-icon-sm">edit</span>
                          </button>
                          <button onClick={() => setDeleteId(room._id || room.id)} className="p-xs text-on-surface-variant hover:text-error transition-colors">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-md py-md flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline-variant/50 bg-surface-container-low/30">
            <p className="text-label-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">1-{rooms.length}</span> of <span className="font-bold text-on-surface">{rooms.length}</span> rooms</p>
            <div className="flex items-center gap-xs">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 transition-colors" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-xs hidden sm:flex">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-label-md">1</button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-colors" disabled>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Occupancy Rate</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">{dashboardStats?.occupancyRate || 0}%</h4>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Nightly Rate</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">₹{dashboardStats?.avgNightlyRate || 0}</h4>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Under Maintenance</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">{dashboardStats?.maintenanceCount || 0}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-full max-w-2xl shadow-xl border border-outline-variant/30 animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div>
                <h3 className="font-display-md text-headline-sm text-on-surface mb-2">Delete Room</h3>
                <p className="text-on-surface-variant">Are you sure you want to delete this room? This action cannot be undone.</p>
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

      {/* Add Room Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-full max-w-md shadow-lg border border-outline-variant/30">
            <h3 className="text-headline-md font-display-md text-primary mb-md">Add New Room</h3>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-sm">
              <input required name="title" value={formData.title} onChange={handleInputChange} placeholder="Room Title" className="w-full p-sm border border-outline-variant rounded bg-surface" />
              <input required name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className="w-full p-sm border border-outline-variant rounded bg-surface" />
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-sm border border-outline-variant rounded bg-surface">
                <option value="Boutique Stay">Boutique Stay</option>
                <option value="Homestay">Homestay</option>
                <option value="Eco-Lodge">Eco-Lodge</option>
              </select>
              <input required type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="Capacity (Guests)" className="w-full p-sm border border-outline-variant rounded bg-surface" />
              <input required type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price per night (₹)" className="w-full p-sm border border-outline-variant rounded bg-surface" />
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-sm border border-outline-variant rounded bg-surface">
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <div className="flex justify-end gap-sm mt-md">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-md py-sm bg-surface-container-high rounded text-on-surface">Cancel</button>
                <button type="submit" className="px-md py-sm bg-primary text-white rounded">Add Room</button>
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
