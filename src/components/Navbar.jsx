import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/restaurantData';
import Logo from './Logo';

export const Navbar = ({ onOpenBooking }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingClick = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.getElementById('booking-process');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-xs py-2' : 'bg-transparent py-3'
        }`}
      >
        <div className="flex items-center justify-between font-medium mx-auto max-w-7xl px-5 sm:px-8">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]">
            <Logo />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-700 hover:text-orange-500 font-medium tracking-wide transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleBookingClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 active:scale-95 cursor-pointer text-sm"
            >
              Book a table
            </button>
          </div>

          {/* Mobile Matching Luxury Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden size-10 rounded-full border border-slate-200/90 bg-white/95 backdrop-blur-sm hover:border-orange-500 text-zinc-900 flex flex-col justify-center items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <span className="w-5 h-[2px] bg-zinc-900 rounded-full" />
            <span className="w-3.5 h-[2px] bg-orange-500 rounded-full mr-1.5" />
            <span className="w-5 h-[2px] bg-zinc-900 rounded-full" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-50 transform transition-transform duration-300 flex flex-col items-center justify-center p-8 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 size-10 rounded-full border border-slate-200 bg-white hover:bg-orange-50 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          aria-label="Close Navigation Menu"
        >
          <X className="size-5 text-zinc-700" />
        </button>

        <div className="flex flex-col items-center space-y-7 font-medium text-center w-full max-w-xs">
          <div className="mb-2">
            <Logo size="large" />
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl text-zinc-800 hover:text-orange-500 transition-colors font-medium font-urbanist py-1"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileOpen(false);
              handleBookingClick({ preventDefault: () => {} });
            }}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-full text-base font-medium shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Book a table
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
