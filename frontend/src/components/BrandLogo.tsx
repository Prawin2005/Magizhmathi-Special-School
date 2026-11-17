import React from 'react';
import { Link } from 'react-router-dom';
import logoCrest from '../assets/magizhmathi-crest.png';
import schoolLogo from '../assets/magizhmathi-logo.png';

interface BrandLogoProps {
  className?: string;
  variant?: 'navbar' | 'footer' | 'hero' | 'badge' | 'special-school';
  showSubtitle?: boolean;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'navbar',
  showSubtitle = true,
  inverted = false,
}) => {
  // If variant is special-school, render the full Magizhmathi emblem lockup
  if (variant === 'special-school') {
    return (
      <Link
        to="/special-school"
        className={`inline-flex flex-col items-center group transition-transform ${className}`}
        aria-label="Magizhmathi Special School"
      >
        <img
          src={schoolLogo}
          alt="Magizhmathi Special School Logo"
          className="h-28 sm:h-36 w-auto object-contain rounded-2xl group-hover:scale-105 transition-transform"
        />
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-brand-sky rounded-xl p-1 transition-all ${className}`}
      aria-label="ANNAI – Integrated Child Development Centre"
    >
      {/* Official Magizhmathi Emblem */}
      <div className="relative flex-shrink-0 h-14 sm:h-16 w-14 sm:w-16 rounded-2xl bg-white p-1 border border-brand-border shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
        <img
          src={logoCrest}
          alt="Magizhmathi Crest Logo"
          className="h-full w-full object-contain scale-110"
        />
      </div>

      {/* Primary Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span
            className={`font-heading font-extrabold tracking-wider leading-none text-xl sm:text-2xl ${inverted ? 'text-white' : 'text-brand-royal'
              }`}
          >
            ANNAI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${inverted
                ? 'bg-white/10 text-brand-gold'
                : 'bg-brand-ice text-brand-sky border border-brand-sky/20'
              }`}
          >
            Centre
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase leading-tight font-heading mt-1 ${inverted ? 'text-slate-200' : 'text-brand-sky'
              }`}
          >
            Integrated Child Development Centre
          </span>
        )}

        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] text-slate-400 font-sans">
            Magizhmathi Special School &middot; ANNAI Charitable Trust
          </span>
        </div>
      </div>
    </Link>
  );
};
