"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BookingSuccess() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speed = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        const colors = ['#2D4739', '#8E4D2E', '#FEAA84', '#173124'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 1;
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.005;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const createParticles = () => {
      if (particles.length < 40) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      createParticles();
      particles = particles.filter((p) => p.opacity > 0 && p.y < canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const startTimeout = setTimeout(() => {
      animate();
      const stopTimeout = setTimeout(() => {
        const stopInterval = setInterval(() => {
          if (particles.length === 0) {
            clearInterval(stopInterval);
            cancelAnimationFrame(animationFrameId);
            if (canvas) canvas.style.display = 'none';
          }
        }, 100);
      }, 3000);
      return () => clearTimeout(stopTimeout);
    }, 300);

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .success-checkmark {
            animation: check-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes check-bounce {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        .confetti-canvas {
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 100;
        }
      `}} />
      <canvas ref={canvasRef} className="confetti-canvas" id="confetti"></canvas>

      {/* Success Hero Section */}
      <section className="text-center mb-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container text-on-primary-container mb-md success-checkmark">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h2 className="font-display-lg text-display-lg text-primary mb-xs">Booking Confirmed Successfully</h2>
        <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto">The reservation for Rahul Sharma has been secured and logged in the Himalayan Sanctuary system.</p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Main Summary Card */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          <div className="bg-surface/70 backdrop-blur-md border border-outline-variant/50 p-md rounded-xl flex flex-col md:flex-row gap-md shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-300">
            <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden relative">
              <Image fill className="object-cover transition-transform duration-700 hover:scale-105" alt="Sky View Suite" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj8jSV-gsiPiQi5Q-gW-UqhMr3-FVrsX76bv12UdZj9fImpGFtyCXfYzPb0uAm-yuG8MO_hW4P8WEGlncx9wo568lPCp7hcSd-jcO41DHKtYat_KQUeE3R-kUddIuYnAYTA3ogUPBFkmUMPC3vWpVyMSCOn2gc5KiGD1z-aVTx-EMcQPhPPTjWRkLqztOYwTrv0-Gyq3eSTExkE30FkTjwsfPEjFg-tUTBHPsgvR1MjtfZh6xJL4R3xQ6Ozh8NcpAeDy25x6YhwcRK" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-xs">
                  <span className="text-label-sm font-label-sm px-sm py-1 bg-primary-fixed text-on-primary-fixed rounded-full">Sky View Suite</span>
                  <span className="text-on-surface-variant font-label-md">ID: <strong className="text-primary">HS-7829</strong></span>
                </div>
                <h3 className="font-display-md text-display-md text-primary mb-base">Rahul Sharma</h3>
                <div className="flex items-center space-x-md text-on-surface-variant">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-sm mr-xs">calendar_today</span>
                    <span className="text-body-md">Oct 12 - Oct 15, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-sm mr-xs">group</span>
                    <span className="text-body-md">2 Guests</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-md mt-md pt-md border-t border-outline-variant/10">
                <div>
                  <p className="text-label-sm text-on-surface-variant mb-base">Check-in</p>
                  <p className="font-label-md">After 2:00 PM</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant mb-base">Check-out</p>
                  <p className="font-label-md">Before 11:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <button className="flex items-center p-md bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl text-left group hover:bg-primary-container hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mr-md group-hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white">event_repeat</span>
              </div>
              <div>
                <p className="font-label-md">View on Calendar</p>
                <p className="text-label-sm opacity-70 group-hover:text-white/70 text-on-surface-variant">See room availability schedule</p>
              </div>
            </button>
            <button className="flex items-center p-md bg-surface/70 backdrop-blur-md border border-outline-variant/50 rounded-xl text-left group hover:bg-primary transition-all text-on-surface shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mr-md group-hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white">receipt_long</span>
              </div>
              <div className="group-hover:text-white">
                <p className="font-label-md">Download Receipt</p>
                <p className="text-label-sm opacity-70 group-hover:text-white/70 text-on-surface-variant">Export PDF for your records</p>
              </div>
            </button>
          </div>
        </div>

        {/* Side Panels */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          {/* Financial Breakdown */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/50 shadow-sm">
            <h4 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-md">Payment Details</h4>
            <div className="space-y-sm text-body-md mb-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Standard Rate (3 nights)</span>
                <span>₹36,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Resort Fee & Service</span>
                <span>₹2,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Taxes (GST)</span>
                <span>₹4,000</span>
              </div>
            </div>
            <div className="pt-md border-t border-outline-variant/30 flex justify-between items-center">
              <span className="font-label-md text-primary">Total Paid</span>
              <span className="font-display-md text-display-md text-primary">₹42,450</span>
            </div>
            <div className="mt-md flex items-center justify-center space-x-xs text-secondary py-xs bg-secondary-fixed/30 rounded-lg">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-label-sm">Payment Verified</span>
            </div>
          </div>

          {/* Secondary Actions List */}
          <div className="space-y-sm">
            <button className="w-full py-md px-md rounded-lg border border-primary text-primary font-label-md hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined">send</span>
              Send Confirmation to Guest
            </button>
            <Link href="/admin/bookings/new" className="w-full py-md px-md rounded-lg bg-surface-container-high text-on-surface-variant font-label-md hover:bg-surface-variant transition-all flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined">add_circle</span>
              Create Another Booking
            </Link>
          </div>

          {/* Atmospheric Visual */}
          <div className="rounded-xl overflow-hidden h-40 relative group shadow-sm">
            <Image fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Atmospheric Visual" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBjoigRNqRJPD3q4HBsppTnjF3-5aazwAj5uEUoMzgQ6of8e8rtWWOcI0141PzIxzLcoOfv2_oipwS_XTRoMTtyj8ZVoyIUSI37-txqFvPuTQUmuNvdPYwU4eHjdSmjV35T1oVNFXbH9Tos-W1loOaQ01yEYKeOd7tptPlAe5CrbJyhxW5tBPHxlv-yf9csuxjZyZ6x1HkQcKv2i_fNYdjpm-_Ub7Ex8_3ueuM1mffHk46JMp62udSeS_UVrqZOArROluGZoCBxOpD" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-md">
              <p className="font-display-md italic opacity-90">&quot;Rooted in Serenity&quot;</p>
              <p className="text-label-sm uppercase tracking-widest mt-xs">PeakStay Sanctuary</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
