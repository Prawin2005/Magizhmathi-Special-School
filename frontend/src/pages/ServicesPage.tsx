import React, { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  MessageSquare,
  Activity,
  HeartPulse,
  Sparkles,
  Smile,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { useSEO } from '../hooks/useSEO';

interface ContextType {
  onOpenEnquiry: (service?: string) => void;
  onOpenAppointment: (service?: string) => void;
}

export const ServicesPage: React.FC = () => {
  useSEO({
    title: 'Specialised Therapies & Services',
    description: 'Explore our 6 core pediatric therapies: Occupational Therapy, Speech & Language, Physiotherapy, Sensory Integration, Behavioural and Early Intervention.',
  });

  const { onOpenEnquiry, onOpenAppointment } = useOutletContext<ContextType>();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const serviceIcons: Record<string, React.ReactNode> = {
    'occupational-therapy': <Activity className="w-6 h-6 text-brand-royal" />,
    'speech-therapy': <MessageSquare className="w-6 h-6 text-brand-royal" />,
    'physiotherapy': <HeartPulse className="w-6 h-6 text-brand-royal" />,
    'sensory-integration': <Sparkles className="w-6 h-6 text-brand-royal" />,
    'behavioural-intervention': <Smile className="w-6 h-6 text-brand-royal" />,
    'early-intervention': <Compass className="w-6 h-6 text-brand-royal" />,
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-ice to-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
            Comprehensive Clinical Therapies
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mt-2">
            Our Specialised Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 font-sans">
            Evidence-informed, individualized therapies focused on child independence, functional movement, clear communication, and sensory regulation.
          </p>

          {/* Quick Jump Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {SERVICES_DATA.map((srv) => (
              <a
                key={srv.id}
                href={`#${srv.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-brand-ice border border-brand-border hover:border-brand-sky/40 text-xs font-semibold text-slate-700 hover:text-brand-royal transition-all shadow-2xs"
              >
                {srv.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services List - Alternating layouts */}
      <div className="divide-y divide-brand-border">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;

          return (
            <section
              key={service.id}
              id={service.slug}
              className={`py-20 scroll-mt-20 ${isEven ? 'bg-brand-ice/60' : 'bg-white'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-white aspect-[4/3] bg-slate-100">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 shadow-md">
                        {serviceIcons[service.id]}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 space-y-6 text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-ice text-brand-sky text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Therapy Program {index + 1}</span>
                      </div>
                      <h2 className="text-3xl font-heading font-bold text-slate-900">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                      {service.fullDescription}
                    </p>

                    {/* Key Focus Areas */}
                    <div className="p-5 bg-white rounded-2xl border border-brand-border space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-royal">
                        Key Focus Areas:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.keyFocusAreas.map((focus, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-sky flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700 font-medium">
                              {focus}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Expected Developmental Gains:
                      </h5>
                      <ul className="space-y-1.5">
                        {service.benefits.map((b, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => onOpenEnquiry(service.title)}
                        className="px-6 py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-95"
                      >
                        Enquire for {service.title}
                      </button>

                      <button
                        onClick={() => onOpenAppointment(service.title)}
                        className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-brand-sky" />
                        <span>Request Assessment Slot</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Clinical Disclaimer Notice (as mandated by implementation guide) */}
      <section className="py-12 bg-slate-50 border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-sky" />
            <span>Ethical Healthcare & Development Standards</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Every child possesses unique neurodevelopmental traits. Therapies at ANNAI – Integrated Child Development Centre are tailored based on individual clinical evaluation. We do not make unsupported medical claims or guarantee treatment timelines.
          </p>
        </div>
      </section>
    </div>
  );
};

