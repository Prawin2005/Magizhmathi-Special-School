import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    CONTACT_INFO.whatsappMessage
  )}`;

  return (
    <aside
      aria-label="WhatsApp enquiry options"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative group">
        {/* Tooltip — absolutely positioned to the LEFT of the button, never affects page width */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:inline-block whitespace-nowrap px-3.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us on WhatsApp
        </span>

        {/* Floating Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire via WhatsApp"
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        >
          <MessageCircle className="w-7 h-7 fill-white stroke-none" />
          {/* Pulsing badge */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-gold"></span>
          </span>
        </a>
      </div>
    </aside>
  );
};
