"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState(null);

  // Confirmation Dialog State
  const [deleteKey, setDeleteKey] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchImages = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (e) => {
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
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [showToast]);

  const confirmDelete = useCallback(async () => {
    if (!deleteKey) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/upload?key=${deleteKey}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete photo');
      showToast('Photo deleted successfully!', 'success');
      // Remove from UI
      setImages(prev => prev.filter(img => img.key !== deleteKey));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
      setDeleteKey(null);
    }
  }, [deleteKey, showToast]);

  const handleDeleteClick = useCallback((key) => {
    if (!key) {
      showToast("Cannot delete this image (no key found).", "error");
      return;
    }
    setDeleteKey(key);
  }, [showToast]);

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
            {isUploading ? <Spinner className="w-5 h-5 text-primary" /> : <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>upload</span>}
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
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <Spinner className="w-8 h-8 text-primary" />
              <p className="text-on-surface-variant font-body-md animate-pulse">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-error">
              <span className="material-symbols-outlined text-4xl">error</span>
              <p className="font-body-md">{error}</p>
            </div>
          ) : images.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <span className="material-symbols-outlined text-6xl text-outline-variant/50">photo_library</span>
              <p className="font-display-md text-display-md text-primary">No Images Found</p>
              <p className="text-on-surface-variant font-body-md">Upload some photos to start building your gallery.</p>
              <button onClick={handleUploadClick} className="mt-4 bg-primary text-white px-6 py-2 rounded-lg">
                Upload First Photo
              </button>
            </div>
          ) : (
            images.map((img, idx) => (
              <div 
                key={idx} 
                className={`gallery-item relative rounded-xl overflow-hidden group shadow-sm border border-surface-variant ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
              >
                <Image 
                  fill 
                  sizes={idx === 0 ? "(max-width: 768px) 100vw, 50vw" : idx === 3 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                  loading="lazy" 
                  alt={img.roomTitle} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={img.url} 
                />
                <div className="gallery-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-sm">
                  <div className="flex justify-between items-start">
                    <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-xs py-1 rounded backdrop-blur-sm">Rooms</span>
                    <div className="flex gap-xs">
                      <button className="w-8 h-8 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-grab">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>drag_indicator</span>
                      </button>
                      <button onClick={() => handleDeleteClick(img.key)} className="w-8 h-8 rounded-full bg-error-container/90 text-on-error-container flex items-center justify-center hover:bg-error-container transition-colors">
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

      {/* Confirmation Dialog */}
      {deleteKey && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-xl rounded-xl w-full max-w-sm shadow-xl border border-outline-variant/30 animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div>
                <h3 className="font-display-md text-headline-sm text-on-surface mb-2">Delete Photo</h3>
                <p className="text-on-surface-variant">Are you sure you want to delete this photo? This action cannot be undone.</p>
              </div>
              <div className="flex gap-sm mt-4 w-full">
                <button onClick={() => setDeleteKey(null)} disabled={isDeleting} className="flex-1 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg transition-colors">
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
    </>
  );
}
