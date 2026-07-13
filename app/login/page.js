"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // JWT is stored in HTTP-only cookie by the backend
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex font-body-md pt-20">
      {/* Left Side: Image Canvas */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-container overflow-hidden">
        <img
          alt="Himalayan sunrise"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk0qGjIHhiMxIb2tJgyv6rlKVM-BDjEq2IBtOH3b9XcdvdoaYi9cOf4Ov6sjFQq3dkSh3Uj-uJoZ_HdifaLacqMF8sTZaD-8icl6Y09W85FivXYmcf8Js14FQFPVBIXxvRynOUSCZYe8PwyKoK7J0tzmREpBRulCgh2pmlw469yuOnTWHfGsiNAqw-r08Zr5wmzN80fC6RtAYiOnQDUxd0FcPSseG2mOw3EBuTuDUCw6tx35QOt-fjTUhr0xJwOPNWAOEaXIYCiuEB"
        />
        {/* Overlay for ambient depth */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent"></div>
        {/* Subtle branding overlay */}
        <div className="absolute bottom-xl left-xl right-xl text-on-primary">
          <h2 className="font-display-lg text-display-lg mb-sm">
            Rooted in the peaks.
          </h2>
          <p className="font-body-lg text-body-lg opacity-90 max-w-[448px]">
            Experience the quiet luxury of our curated mountain lodges. A serene
            escape designed for intentional travel.
          </p>
        </div>
      </div>
      {/* Right Side: Login Form Canvas */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-md sm:p-xl bg-surface-bright relative z-10">
        {/* Mobile/Standalone Logo */}
        <div className="absolute top-md left-md lg:hidden">
          <span className="font-display-md text-display-md font-bold text-primary">
            Himalayan Stays
          </span>
        </div>
        <div className="w-full max-w-[448px] bg-surface-container-lowest p-md sm:p-xl rounded-xl ambient-shadow-1 border border-surface-variant relative">
          {/* Logo Header for Desktop Form */}
          <div className="text-center mb-xl hidden lg:block">
            <span className="font-display-md text-display-md font-bold text-primary tracking-tight">
              Himalayan Stays
            </span>
          </div>
          <div className="mb-lg text-center lg:text-left">
            <h1 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface mb-xs">
              Welcome Back
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Log in to access your bookings and host dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-md p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-md">
            {/* Email Input */}
            <div className="relative pt-sm border-b border-outline-variant focus-within:border-primary transition-colors duration-300">
              <input
                className="peer w-full bg-transparent border-none p-0 pb-xs focus:ring-0 font-body-md text-body-md text-on-surface autofill:bg-transparent"
                id="email"
                name="email"
                placeholder=" "
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                className="absolute left-0 top-3 font-body-md text-body-md text-on-surface-variant transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85"
                htmlFor="email"
              >
                Email Address
              </label>
            </div>
            {/* Password Input */}
            <div className="relative pt-sm border-b border-outline-variant focus-within:border-primary transition-colors duration-300">
              <input
                className="peer w-full bg-transparent border-none p-0 pb-xs focus:ring-0 font-body-md text-body-md text-on-surface pr-10"
                id="password"
                name="password"
                placeholder=" "
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                className="absolute left-0 top-3 font-body-md text-body-md text-on-surface-variant transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85"
                htmlFor="password"
              >
                Password
              </label>
              <button
                aria-label="Toggle password visibility"
                className="absolute right-0 bottom-xs text-on-surface-variant hover:text-primary transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]" data-icon="visibility">
                  visibility
                </span>
              </button>
            </div>
            {/* Remember & Forgot */}
            {/* <div className="flex items-center justify-between pt-xs">
              <label className="flex items-center gap-xs cursor-pointer group">
                <input
                  className="rounded border-outline text-primary focus:ring-primary focus:ring-offset-surface-bright bg-transparent w-4 h-4 cursor-pointer"
                  type="checkbox"
                />
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                href="#"
              >
                Forgot Password?
              </Link>
            </div> */}
            {/* Submit Button */}
            <button
              className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg hover:bg-primary-container transition-colors duration-300 ambient-shadow-1 flex items-center justify-center gap-xs mt-lg disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
              <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">
                arrow_forward
              </span>
            </button>
          </form>
          {/* Divider */}
          <div className="mt-lg mb-lg relative flex items-center justify-center">
            <div className="absolute inset-x-0 border-t border-surface-variant"></div>
            <span className="relative bg-surface-container-lowest px-sm font-label-sm text-label-sm text-on-surface-variant">
              OR CONTINUE WITH
            </span>
          </div>
          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-sm w-full">
            <button
              className="flex items-center justify-center gap-xs py-2 px-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors text-on-surface font-label-md text-label-md"
              type="button"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              Sign In With Google
            </button>
          </div>
          {/* Sign Up Link */}
          <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{" "}
            <Link
              className="font-label-md text-label-md text-primary hover:text-primary-container hover:underline transition-all"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
        {/* Footer Links for standalone page */}
        <div className="mt-lg flex gap-md font-label-sm text-label-sm text-on-surface-variant opacity-70">
          <Link className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}