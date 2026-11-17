import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Play, Filter, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_DATA } from '../data/mockData';
import { GalleryItem } from '../types';
import { useSEO } from '../hooks/useSEO';

export const GalleryPage: React.FC = () => {
  useSEO({
    title: 'Photo & Moments Gallery',
    description: 'Capturing moments of growth, therapy sessions, sensory experiences, and inclusive classroom joy at ANNAI.',
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Therapy Sessions',
    'Classrooms',
    'Sensory & Play',
    'Events & Activities',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-ice to-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
            Moments at ANNAI
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mt-2">
            Photo & Activity Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 font-sans">
            Capturing the joys of therapy, sensory discoveries, and inclusive classroom moments at Woraiyur.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-royal text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-soft hover:shadow-card cursor-pointer border border-brand-border"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                    {item.category}
                  </span>
                  <h4 className="text-white font-heading font-bold text-sm">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="text-slate-300 text-xs line-clamp-2 mt-1">
                      {item.caption}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-white/90">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to view</span>
                  </div>
                </div>

                {item.mediaType === 'video' && (
                  <div className="absolute top-3 right-3 p-2 bg-brand-royal text-white rounded-full shadow-md">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-md">
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
              aria-label="Close preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
              aria-label="Next item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="max-h-[70vh] flex items-center justify-center bg-black">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-left">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-white mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-400">
                    Consent & Privacy Protected
                  </div>
                </div>

                {selectedItem.caption && (
                  <p className="text-sm text-slate-300 mt-2 font-sans">
                    {selectedItem.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Child Consent Notice */}
      <section className="py-12 bg-slate-50 border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-royal" />
            <span>Child Privacy & Protection Policy</span>
          </div>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            All photography displayed on the ANNAI website adheres strictly to our child safeguarding protocol. Images are published with appropriate parent/guardian authorization.
          </p>
        </div>
      </section>
    </div>
  );
};

