"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal and Form States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', price: '', capacity: '', location: '', status: 'Available', type: 'Boutique Stay' });
  
  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const fetchRooms = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch('/api/rooms');
      if (!res.ok) throw new Error('Failed to load rooms');
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: Number(formData.price), capacity: Number(formData.capacity) })
      });
      if (!res.ok) throw new Error('Failed to add room');
      await fetchRooms();
      setIsAddOpen(false);
      showToast('Room added successfully');
      setFormData({ title: '', price: '', capacity: '', location: '', status: 'Available', type: 'Boutique Stay' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const openEditPage = (room) => {
    const id = room._id || room.id;
    router.push(`/admin/rooms/new?editId=${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete room');
      await fetchRooms();
      showToast('Room deleted successfully');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

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
      <div className="p-xl max-w-container-max mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">Room Management</h2>
            <p className="text-on-surface-variant font-body-lg mt-xs">Oversee and optimize your boutique inventory across all locations.</p>
          </div>
          <Link href="/admin/rooms/new" className="flex items-center gap-sm bg-primary text-white px-xl py-md rounded-lg font-label-md hover:scale-[1.02] active:scale-95 transition-all duration-200 ambient-shadow">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add New Room</span>
          </Link>
        </div>
        
        {/* Filters & Controls Section */}
        <div className="bg-surface-container-low p-md rounded-xl mb-lg flex flex-wrap items-center gap-md border border-outline-variant/20">
          <div className="flex flex-col gap-xs flex-1 min-w-[200px]">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Search</span>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-xl pr-md py-sm bg-surface rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-body-md transition-all" placeholder="Search by name..." type="text"/>
            </div>
          </div>
          <div className="flex flex-col gap-xs w-48">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Room Type</span>
            <select className="w-full bg-surface py-sm px-md rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-label-md">
              <option>All Types</option>
              <option>Boutique Stay</option>
              <option>Homestay</option>
              <option>Eco-Lodge</option>
            </select>
          </div>
          <div className="flex flex-col gap-xs w-48">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Status</span>
            <select className="w-full bg-surface py-sm px-md rounded-lg border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-label-md">
              <option>All Status</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>
          <div className="flex items-end self-stretch">
            <button className="h-10 px-md flex items-center gap-xs text-primary font-label-md hover:bg-surface-container-high rounded-lg transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
              <span>Advanced</span>
            </button>
          </div>
        </div>

        {/* Room Inventory Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow border border-outline-variant/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
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
                  <tr><td colSpan="6" className="text-center py-8">Loading rooms...</td></tr>
                ) : error ? (
                  <tr><td colSpan="6" className="text-center py-8 text-error">{error}</td></tr>
                ) : rooms.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-8">No rooms yet.</td></tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room._id || room.id} className="tonal-row group hover:bg-primary-container/5 transition-colors cursor-pointer">
                      <td className="px-md py-md">
                        <div className="flex items-center gap-md">
                          <Image
                          width={150}
                          height={150}
                          className="w-12 h-12 rounded-lg object-cover" alt={room.title} src={room.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAW2P9m0D_fbdJew7NQz7RNxeXBVy9FzoKXcBO1xRHre3eLc8yS20gVeujS0IBTF9YhsGX3LynbUZ-VzUt6a6-um2e9o-JFI7fL6UpPpCoWbQiBwKGMFzkYVheFj4V_q1TRsapk8v8mjl4OZe6L_THED34cNT2bDeGtbtm4UZtygTFHn3aqGjMbMW5MpB1Bq4Y4QBn5WYt9-1usvVLQcI7gl1SuyqfbHY6NTd2sypvucWDkX4K49qc1EPXu3xlvSr3AHZrmGv6wheNX"}/>
                          <div>
                            <p className="font-bold">{room.title}</p>
                            <p className="text-label-sm text-on-surface-variant">{room.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-md py-md">
                        <span className="bg-surface-container py-xs px-sm rounded-full text-label-sm">{room.type || 'Boutique Stay'}</span>
                      </td>
                      <td className="px-md py-md text-center">
                        <div className="flex flex-col items-center leading-tight">
                          <span className="font-bold">{room.capacity} Guests</span>
                        </div>
                      </td>
                      <td className="px-md py-md">
                        <span className="font-display-md text-md text-primary">₹{room.price}</span>
                        <span className="text-label-sm text-on-surface-variant">/night</span>
                      </td>
                      <td className="px-md py-md">
                        <div className={`inline-flex items-center gap-xs px-sm py-1 rounded-full text-label-sm ${room.status === 'Available' ? 'bg-primary-fixed text-on-primary-fixed' : room.status === 'Occupied' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-error-container text-on-error-container'}`}>
                          <span className={`w-2 h-2 rounded-full ${room.status === 'Available' ? 'bg-primary animate-pulse' : room.status === 'Occupied' ? 'bg-secondary' : 'bg-error'}`}></span>
                          {room.status}
                        </div>
                      </td>
                      <td className="px-md py-md text-right">
                        <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditPage(room)} className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined font-light text-icon-sm">edit</span>
                        </button>
                          <button onClick={() => handleDelete(room._id || room.id)} className="p-xs text-on-surface-variant hover:text-error transition-colors">
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
          
          {/* Pagination Footer */}
          <div className="px-md py-md flex items-center justify-between border-t border-outline-variant/50 bg-surface-container-low/30">
            <p className="text-label-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">1-{rooms.length}</span> of <span className="font-bold text-on-surface">{rooms.length}</span> rooms</p>
            <div className="flex items-center gap-xs">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 transition-colors" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-xs">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-label-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high font-label-md">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high font-label-md">3</button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overlay / Micro-widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Occupancy Rate</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">82%</h4>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Nightly Rate</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">₹9,450</h4>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 flex items-center gap-md ambient-shadow">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Under Maintenance</p>
              <h4 className="font-display-md text-display-md text-primary leading-none mt-xs">3</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Add Room Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-[90vw] max-w-[500px] shadow-lg border border-outline-variant/30">
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



      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
