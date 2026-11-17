import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CONTACT_INFO, SERVICES_DATA } from '../data/mockData';
import annaiTrustLogo from '../assets/annai-trust-logo.png';
import magizhmathiCrest from '../assets/magizhmathi-crest.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-royal text-white border-t border-brand-royal-light relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-royal to-[#072F33] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Official Logos (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="footer" inverted={true} />
            
            <p className="text-brand-ice/80 text-sm leading-relaxed max-w-sm font-sans pt-1">
              <strong className="text-white">ANNAI – Integrated Child Development Centre</strong> is committed to nurturing children with diverse developmental needs through specialized pediatric therapies, early intervention, and inclusive special education.
            </p>

            {/* Official Logos Showcase */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="p-2 bg-white rounded-xl shadow-xs">
                <img
                  src={annaiTrustLogo}
                  alt="ANNAI Charitable Trust Official Logo"
                  className="h-12 sm:h-14 w-auto object-contain scale-105"
                />
              </div>
              <div className="p-2 bg-white rounded-xl shadow-xs">
                <img
                  src={magizhmathiCrest}
                  alt="Magizhmathi Crest"
                  className="h-12 sm:h-14 w-auto object-contain scale-110"
                />
              </div>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl max-w-sm space-y-1">
              <div className="flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-brand-gold" />
                <span>Our Core Belief</span>
              </div>
              <p className="text-xs text-slate-200 italic">
                "{CONTACT_INFO.tagline}"
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-ice/80 font-sans">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/special-school" className="hover:text-white hover:underline transition-colors">
                  Special School
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-white hover:underline transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white hover:underline transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Services */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">
              Therapies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-ice/80 font-sans">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services#${srv.slug}`}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">
              Centre Location
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-brand-ice/80 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{CONTACT_INFO.phonePlaceholder}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="truncate">{CONTACT_INFO.emailPlaceholder}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Admin Link & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-ice/60">
          <p>
            &copy; {new Date().getFullYear()} ANNAI – Integrated Child Development Centre. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/admin"
              className="text-brand-ice/50 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-1"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
