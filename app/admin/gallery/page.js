"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rooms');
      if (!res.ok) throw new Error('Failed to load images');
      const data = await res.json();
      
      // Extract all images from all rooms
      const allImages = [];
      data.forEach(room => {
        if (room.images && room.images.length > 0) {
          room.images.forEach(img => {
            allImages.push({
              url: img.url,
              key: img.key,
              roomTitle: room.title,
              roomId: room._id || room.id
            });
          });
        }
      });
      setImages(allImages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload photo');
      showToast('Photo uploaded successfully! Note: API does not link it to a room automatically.', 'success');
      // Optionally refetch images if the backend auto-links, but here we just alert
      // fetchImages();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (key) => {
    if (!key) {
      showToast("Cannot delete this image (no key found).", "error");
      return;
    }
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/upload?key=${key}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete photo');
      showToast('Photo deleted successfully!', 'success');
      // Remove from UI
      setImages(prev => prev.filter(img => img.key !== key));
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
      `}} />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 ${toast.type === 'error' ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}>
          <span className="material-symbols-outlined">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
          <span className="font-label-md">{toast.message}</span>
        </div>
      )}

      <div className="px-sm md:px-gutter max-w-container-max mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface mb-xs hidden md:block">Gallery</h2>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-xs md:hidden">Gallery</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage the visual narrative of your property.</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="bg-primary-container text-on-primary-container font-label-md text-label-md px-md py-sm rounded-full flex items-center justify-center gap-xs hover:bg-primary-container/90 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>upload</span>
            {isUploading ? 'Uploading...' : 'Upload Photos'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-sm mb-lg border-b border-surface-variant pb-xs">
          <button className="font-label-md text-label-md text-primary border-b-2 border-primary pb-xs px-xs">All Photos</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-xs px-xs">Rooms</button>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md auto-rows-[250px] pb-xl">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <p className="text-on-surface-variant font-body-md animate-pulse">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="col-span-full flex justify-center py-10">
              <p className="text-error font-body-md">{error}</p>
            </div>
          ) : images.length === 0 ? (
            <div className="col-span-full flex justify-center py-10">
              <p className="text-on-surface-variant font-body-md">No photos found. Upload some to get started!</p>
            </div>
          ) : (
            images.map((img, idx) => (
              <div 
                key={idx} 
                className={`gallery-item relative rounded-xl overflow-hidden group shadow-sm border border-surface-variant ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
              >
                <img alt={img.roomTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img.url} />
                <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
                  <div className="flex justify-between items-start">
                    <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Rooms</span>
                    <div className="flex gap-xs">
                      <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                      </button>
                      <button onClick={() => handleDelete(img.key)} className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-white font-label-md text-label-md truncate">{img.roomTitle}</p>
                </div>
              </div>
            ))
          )}
          
          <div onClick={handleUploadClick} className="gallery-item relative rounded-xl overflow-hidden group shadow-sm border-surface-variant bg-surface-container flex items-center justify-center border-dashed border-2 hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="text-center">
              <span className="material-symbols-outlined text-outline text-display-md mb-xs" style={{ fontVariationSettings: "'FILL' 0" }}>add_photo_alternate</span>
              <p className="font-label-md text-label-md text-on-surface-variant">Click to upload images</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

