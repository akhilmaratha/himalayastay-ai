"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/status");
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await signOut({ redirect: false });
      showToast("Logged out successfully! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error("Logout failed", error);
      showToast("Failed to logout", "error");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md dark:shadow-none ${
        scrolled ? "bg-surface/95 shadow-sm" : "bg-surface/80"
      } dark:bg-surface-container/80`}
      id="top-nav"
    >
      <div className="max-w-container-max mx-auto px-md flex items-center justify-between h-20">
        {/* Brand */}
        <Link
          href="/"
          className="font-display-md text-display-md font-bold text-primary dark:text-inverse-primary tracking-tight"
        >
          Himalayan Stays
        </Link>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-lg">
          <Link
            href="/"
            className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors duration-300 opacity-80"
          >
            Explore
          </Link>
          <Link
            href="/stays"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
          >
            Stays
          </Link>
          {/* <Link
            href="#"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
          >
            Experiences
          </Link> */}
          <Link
            href="/about"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
          >
            About
          </Link>
        </div>
        {/* Actions */}
        <div className="hidden md:flex items-center gap-md">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              Logout
            </button>
          )}
          <Link
            href="/booking"
            className="bg-primary-container text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors duration-300 ambient-shadow-1"
          >
            Book Now
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-on-surface p-2">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            menu
          </span>
        </button>
      </div>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-md rounded shadow-lg text-white font-label-md z-50 ${toast.type === 'error' ? 'bg-error' : 'bg-primary'}`}>
          {toast.message}
        </div>
      )}
    </nav>
  );
}
