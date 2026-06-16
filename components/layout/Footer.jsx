"use client"
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-xl bg-primary dark:bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-md flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-display-md text-display-md text-on-primary mb-2">
            Himalayan Stays
          </span>
          <span className="font-body-md text-body-md text-on-primary/80">
            © 2024 Himalayan Stays. Rooted in the peaks.
          </span>
        </div>
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="#"
            className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed-dim transition-colors opacity-90"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed-dim transition-colors opacity-90"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed-dim transition-colors opacity-90"
          >
            Sustainability
          </Link>
          <Link
            href="#"
            className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed-dim transition-colors opacity-90"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
