import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, MapPin, ChevronRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CONTACT_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Special School', path: '/special-school' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification Bar - Visible on Medium/Large screens */}
      <div className="bg-brand-royal text-white text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Woraiyur, Tiruchirappalli, Tamil Nadu</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="italic text-brand-ice text-xs">
              "Every Child Deserves a Chance to Shine"
            </span>
            <span className="text-white/20">|</span>
            <a
              href={`tel:${CONTACT_INFO.phonePlaceholder.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-brand-gold font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{CONTACT_INFO.phonePlaceholder}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white shadow-soft py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo variant="navbar" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-brand-royal bg-brand-ice font-bold'
                      : 'text-slate-700 hover:text-brand-royal hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Action CTAs & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-royal hover:bg-brand-royal-dark text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <span>Make an Enquiry</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-brand-royal hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 top-[65px] bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-h-[85vh] overflow-y-auto px-6 py-6 shadow-xl border-b border-brand-border flex flex-col justify-between animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'text-brand-royal bg-brand-ice'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              ))}
            </div>

            {/* Mobile CTAs & Quick Info */}
            <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl text-center shadow-md"
              >
                Make an Enquiry
              </button>

              <div className="pt-3 text-xs text-slate-500 space-y-1.5">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-sky flex-shrink-0" />
                  <span>Woraiyur, Tiruchirappalli, Tamil Nadu</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-sky flex-shrink-0" />
                  <span>{CONTACT_INFO.phonePlaceholder}</span>
                </p>
                <div className="pt-2 text-[11px] text-brand-sky font-medium">
                  Magizhmathi Special School – An initiative of ANNAI Charitable Trust
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

