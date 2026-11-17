import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Heart, Compass, Target, Shield, CheckCircle2, Users, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';
import { useSEO } from '../hooks/useSEO';

interface ContextType {
  onOpenEnquiry: (service?: string) => void;
  onOpenAppointment: (service?: string) => void;
}

export const AboutPage: React.FC = () => {
  useSEO({
    title: 'About Us - Vision & Mission',
    description: 'Learn about ANNAI Integrated Child Development Centre, our vision, mission, and multidisciplinary pediatric approach in Woraiyur, Trichy.',
  });

  const { onOpenEnquiry, onOpenAppointment } = useOutletContext<ContextType>();

  const coreValues = [
    {
      title: 'Empathy & Dignity',
      desc: 'Treating every child and family with absolute patience, understanding, and respect.',
      icon: <Heart className="w-5 h-5 text-brand-royal" />,
    },
    {
      title: 'Individualised Progress',
      desc: 'Acknowledging that every developmental path is distinct; we celebrate progress at each child’s own tempo.',
      icon: <Target className="w-5 h-5 text-brand-sky" />,
    },
    {
      title: 'Parent Collaboration',
      desc: 'Empowering parents with active training, realistic techniques, and transparent communication.',
      icon: <Users className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: 'Ethical Healthcare',
      desc: 'Adhering strictly to safe, proven pediatric practices without making unsubstantiated guarantees.',
      icon: <Shield className="w-5 h-5 text-brand-royal" />,
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-ice to-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
            Organisation Profile
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mt-2">
            About ANNAI
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 font-sans">
            Dedicated to empowering children with developmental differences through integrated therapies and inclusive education.
          </p>
        </div>
      </section>

      {/* Editorial Section 1: Organisation Profile */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-royal">
                Who We Are
              </span>
              <h2 className="text-3xl font-heading font-bold text-slate-900 leading-tight">
                ANNAI – Integrated Child Development Centre
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Operating in <strong>Woraiyur, Tiruchirappalli, Tamil Nadu</strong>, ANNAI is a dedicated child development centre created to address developmental delays, neurological variations, sensory processing issues, and communication difficulties in children.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We believe that early identification coupled with structured, consistent therapy and an inclusive learning environment can transform a child’s future. In close collaboration with <strong>Magizhmathi Special School</strong> (an initiative of ANNAI Charitable Trust), our centre provides a seamless continuum of therapeutic rehabilitation and special educational support.
              </p>

              <div className="p-4 bg-brand-ice rounded-2xl border border-brand-sky/20">
                <p className="text-xs sm:text-sm text-brand-royal font-medium">
                  <strong>Brand Tagline:</strong> "{CONTACT_INFO.tagline}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80"
                  alt="Therapy session at ANNAI Centre"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="py-20 bg-brand-ice border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-8 sm:p-10 bg-white rounded-3xl border border-brand-border shadow-soft text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-ice flex items-center justify-center text-brand-royal">
                <Compass className="w-6 h-6 text-brand-royal" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900">
                Our Vision
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To build an inclusive, nurturing ecosystem where children of all neurodevelopmental and physical abilities are empowered with communication, independent daily living skills, and joyful social participation.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 bg-white rounded-3xl border border-brand-border shadow-soft text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-ice flex items-center justify-center text-brand-sky">
                <Target className="w-6 h-6 text-brand-sky" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To provide goal-driven pediatric therapies—occupational, speech, physiotherapy, and sensory integration—alongside individualized education through Magizhmathi Special School, walking alongside families with honesty, dignity, and dedicated clinical attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-600">
              The ethical compass that guides every session, classroom interaction, and family dialogue at ANNAI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-3xl border border-brand-border shadow-soft hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-ice flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 mb-2">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach to Child Development */}
      <section className="py-20 bg-brand-ice border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80"
                  alt="Child-centric development approach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                Methodology
              </span>
              <h2 className="text-3xl font-heading font-bold text-slate-900 leading-tight">
                Our Approach to Child Development
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We believe that development happens holistically. Rather than isolating therapies into disconnected slots, our therapists and educators coordinate directly to ensure consistent goals across sensory regulation, motor execution, communication, and cognitive learning.
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: '1. Multi-Disciplinary Assessment',
                    desc: 'Evaluating developmental milestones, sensory profiles, motor control, and communication needs.',
                  },
                  {
                    step: '2. Individualised Goal Setting',
                    desc: 'Formulating structured, realistic quarterly goals shared transparently with parents.',
                  },
                  {
                    step: '3. Integrated Therapy & Education',
                    desc: 'Coordinating therapies with Magizhmathi Special School routines for practical reinforcement.',
                  },
                  {
                    step: '4. Continuous Review & Home Protocols',
                    desc: 'Reviewing progress periodically and equipping parents with practical home activities.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-brand-border">
                    <h5 className="font-heading font-bold text-sm text-brand-royal">
                      {item.step}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="px-6 py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl text-sm shadow-md transition-all"
                >
                  Make an Enquiry
                </button>
                <Link
                  to="/services"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm border border-slate-200 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Therapies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

