import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle2, Shield, Sparkles, Calendar } from 'lucide-react';
import { FACILITIES_DATA } from '../data/mockData';
import { useSEO } from '../hooks/useSEO';

interface ContextType {
  onOpenEnquiry: (service?: string) => void;
  onOpenAppointment: (service?: string) => void;
}

export const FacilitiesPage: React.FC = () => {
  useSEO({
    title: 'Modern & Child-Safe Facilities',
    description: 'Child-safe, therapeutically equipped rooms: Occupational therapy, speech suites, physiotherapy space, and sensory integration chamber.',
  });

  const { onOpenEnquiry, onOpenAppointment } = useOutletContext<ContextType>();

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-ice to-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
            Infrastructure & Equipment
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mt-2">
            Centre Facilities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 font-sans">
            Child-safe, therapeutically equipped rooms specifically constructed for pediatric rehabilitation, sensory processing, and inclusive education.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {FACILITIES_DATA.map((facility) => (
              <div
                key={facility.id}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-border hover:border-brand-sky/40 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-slate-100 relative">
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-xs">
                      <span className="text-[11px] font-bold text-brand-royal uppercase tracking-wider">
                        {facility.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-brand-royal transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {facility.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Facility Highlights:
                      </span>
                      <ul className="space-y-1.5">
                        {facility.features.map((feat, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-sky flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenAppointment(facility.title)}
                    className="w-full py-2.5 bg-brand-ice hover:bg-brand-royal hover:text-white text-brand-royal text-xs font-semibold rounded-xl transition-all"
                  >
                    Request Facility Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Child Safety & Hygiene Callout */}
      <section className="py-16 bg-brand-ice border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-soft">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-brand-ice text-brand-royal flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-heading font-bold text-slate-900">
                  Safety, Hygiene & Accessibility
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  All therapy equipment and spaces at ANNAI follow non-toxic, impact-absorbing safety guidelines with regular sanitisation. Rooms are configured to eliminate unnecessary sensory overstimulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

