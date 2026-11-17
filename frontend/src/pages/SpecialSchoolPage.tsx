import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Users,
  Palette,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { SPECIAL_SCHOOL_DATA, CONTACT_INFO } from '../data/mockData';
import { useSEO } from '../hooks/useSEO';

interface ContextType {
  onOpenEnquiry: (service?: string) => void;
  onOpenAppointment: (service?: string) => void;
}

export const SpecialSchoolPage: React.FC = () => {
  useSEO({
    title: 'Magizhmathi Special School - Inclusive Education',
    description: 'Magizhmathi Special School in Woraiyur, Tiruchirappalli: Individualised educational plans (IEPs), life skills, and activity-based learning.',
  });

  const { onOpenEnquiry } = useOutletContext<ContextType>();

  const icons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-6 h-6 text-brand-royal" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6 text-brand-royal" />,
    Palette: <Palette className="w-6 h-6 text-brand-royal" />,
    Users: <Users className="w-6 h-6 text-brand-royal" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-brand-royal" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-brand-royal" />,
  };

  return (
    <div className="bg-white">
      {/* Hero Banner for Magizhmathi Special School */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-royal via-[#083C41] to-brand-royal text-white py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(7,139,197,0.25),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-gold text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{SPECIAL_SCHOOL_DATA.subheading}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
                {SPECIAL_SCHOOL_DATA.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-xl">
                A dedicated, caring educational haven located in <strong>Woraiyur, Tiruchirappalli</strong>, providing activity-based schooling, personalized learning paces, and daily functional life skills.
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-ice/90">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{SPECIAL_SCHOOL_DATA.location}</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry('Magizhmathi Special School Admission')}
                  className="px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-slate-900 font-bold rounded-2xl text-sm shadow-lg transition-all active:scale-95"
                >
                  Apply for Admission
                </button>

                <button
                  onClick={() => onOpenEnquiry('Visit Magizhmathi School Campus')}
                  className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl text-sm border border-white/30 transition-all"
                >
                  Schedule Campus Walkthrough
                </button>
              </div>
            </div>

            {/* School Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3] bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
                  alt="Magizhmathi Special School Classroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Highlights (IEP, Life skills, etc.) */}
      <section className="py-20 bg-brand-ice border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              Educational Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Key Pillars of Learning
            </h2>
            <p className="text-sm text-slate-600">
              Designed to equip special learners with self-confidence, practical independence, and conceptual mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {SPECIAL_SCHOOL_DATA.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-3xl border border-brand-border shadow-soft hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-ice flex items-center justify-center mb-5">
                  {icons[item.icon] || <CheckCircle2 className="w-6 h-6 text-brand-royal" />}
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classroom Activities & Daily Routine */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                Day in the Life
              </span>
              <h2 className="text-3xl font-heading font-bold text-slate-900 leading-tight">
                Classroom Activities & Daily Rhythm
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Consistency, predictable schedules, and low sensory distress allow our students to flourish. Each day combines academic instruction, sensory regulation routines, social play, and practical self-care.
              </p>

              <div className="space-y-3 pt-2">
                {SPECIAL_SCHOOL_DATA.scheduleDetails.map((slot, i) => (
                  <div
                    key={i}
                    className="p-4 bg-brand-ice rounded-2xl border border-brand-border flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-xl bg-white text-brand-royal shadow-2xs mt-0.5">
                      <Clock className="w-4 h-4 text-brand-sky" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-brand-royal">
                        {slot.time}
                      </h4>
                      <p className="text-xs text-slate-600 font-sans mt-0.5">
                        {slot.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80"
                  alt="Activity based art & craft"
                  className="rounded-3xl shadow-md object-cover h-60 w-full"
                />
                <div className="p-5 bg-brand-ice rounded-3xl text-left border border-brand-border">
                  <span className="text-xs font-bold text-brand-royal uppercase">
                    Therapy Integration
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Therapists work directly alongside educators inside the classroom.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-5 bg-brand-royal text-white rounded-3xl text-left shadow-sm">
                  <span className="text-xs font-bold text-brand-gold uppercase">
                    Parental Engagement
                  </span>
                  <p className="text-xs text-slate-200 mt-1">
                    Monthly parent teacher circles & individualized milestone tracking.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80"
                  alt="Group social learning"
                  className="rounded-3xl shadow-md object-cover h-60 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Involvement & Trust Callout */}
      <section className="py-16 bg-brand-ice border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
            Join Our Community
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
            Admissions Open at Magizhmathi Special School
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-xl mx-auto">
            We welcome parents to visit our centre in Woraiyur, interact with our special educators, and discuss how we can create a happy, supportive learning journey for your child.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Magizhmathi Special School Admission')}
              className="px-6 py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl text-sm shadow-md transition-all"
            >
              Contact Admissions
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm border border-slate-200 transition-all flex items-center gap-1.5"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

