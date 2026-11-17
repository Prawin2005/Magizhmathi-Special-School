import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  Award,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Shield,
  Star,
  ChevronRight,
  Activity,
  HeartPulse,
  Smile,
  Compass,
} from 'lucide-react';
import { SERVICES_DATA, FACILITIES_DATA, GALLERY_DATA, TESTIMONIALS_DATA, CONTACT_INFO } from '../data/mockData';
import magizhmathiCrest from '../assets/magizhmathi-crest.png';
import magizhmathiLogo from '../assets/magizhmathi-logo.png';
import { useSEO } from '../hooks/useSEO';

interface ContextType {
  onOpenEnquiry: (service?: string) => void;
  onOpenAppointment: (service?: string) => void;
}

export const HomePage: React.FC = () => {
  useSEO({
    title: 'Every Child Deserves a Chance to Shine',
    description: 'Specialised therapies, early intervention, and inclusive special education at ANNAI Integrated Child Development Centre in Woraiyur, Tiruchirappalli.',
  });

  const { onOpenEnquiry, onOpenAppointment } = useOutletContext<ContextType>();

  const serviceIcons: Record<string, React.ReactNode> = {
    'occupational-therapy': <Activity className="w-6 h-6 text-brand-sky" />,
    'speech-therapy': <MessageSquare className="w-6 h-6 text-brand-sky" />,
    'physiotherapy': <HeartPulse className="w-6 h-6 text-brand-sky" />,
    'sensory-integration': <Sparkles className="w-6 h-6 text-brand-sky" />,
    'behavioural-intervention': <Smile className="w-6 h-6 text-brand-sky" />,
    'early-intervention': <Compass className="w-6 h-6 text-brand-sky" />,
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-ice/80 via-white to-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ice border border-brand-sky/20 text-brand-royal text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span>Woraiyur, Tiruchirappalli, Tamil Nadu</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Every Child Deserves <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-royal via-brand-sky to-brand-royal">
                  a Chance to Shine.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-sans">
                Supporting every child's unique journey through specialised therapies, early intervention, rehabilitation and inclusive education at <span className="font-semibold text-brand-royal">ANNAI Integrated Child Development Centre</span>.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-2xl shadow-soft hover:shadow-card transition-all duration-200 active:scale-95"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onOpenEnquiry()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-ice hover:bg-brand-sky/15 text-brand-royal border border-brand-sky/30 font-semibold rounded-2xl transition-all duration-200 active:scale-95"
                >
                  <span>Make an Enquiry</span>
                </button>
              </div>

              {/* Value Highlights */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-100 text-left">
                <div className="space-y-1">
                  <span className="block text-2xl font-extrabold font-heading text-brand-royal">6+</span>
                  <span className="block text-xs text-slate-500 font-medium">Core Therapies</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-extrabold font-heading text-brand-sky">1-on-1</span>
                  <span className="block text-xs text-slate-500 font-medium">Focused Attention</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-extrabold font-heading text-brand-gold">Holistic</span>
                  <span className="block text-xs text-slate-500 font-medium">School & Therapy</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background aura */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-sky/20 to-brand-gold/15 rounded-3xl blur-2xl -z-10" />

                {/* Main Hero Photograph */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80"
                    alt="Pediatric therapy session at ANNAI Child Development Centre"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Floating Magizhmathi School Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/50 text-left">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={magizhmathiCrest}
                          alt="Magizhmathi Crest"
                          className="w-14 h-14 object-contain rounded-xl bg-white p-0.5 border border-brand-border scale-110"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                            Special School Wing
                          </span>
                          <h4 className="text-sm font-heading font-bold text-brand-royal">
                            Magizhmathi Special School
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            An initiative of ANNAI Charitable Trust
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/special-school"
                        className="p-2 rounded-xl bg-brand-ice text-brand-royal hover:bg-brand-royal hover:text-white transition-colors flex-shrink-0"
                        aria-label="View Special School"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Stat Badge */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-brand-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-ice flex items-center justify-center text-brand-royal">
                    <Heart className="w-5 h-5 fill-brand-royal" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-900 font-heading">
                      Compassionate Care
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Child-centric approach
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ORGANISATION INTRODUCTION */}
      <section className="py-20 bg-brand-ice border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Speech and language intervention"
                  className="rounded-2xl shadow-md object-cover h-48 w-full"
                />
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-brand-border text-left">
                  <Shield className="w-6 h-6 text-brand-royal mb-2" />
                  <h5 className="font-heading font-bold text-sm text-slate-900">Safe Environment</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Structured, non-judgmental & supportive facility for every child.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-5 bg-brand-royal text-white rounded-2xl shadow-md text-left">
                  <Users className="w-6 h-6 text-brand-gold mb-2" />
                  <h5 className="font-heading font-bold text-sm">Parent Partnership</h5>
                  <p className="text-xs text-white/80 mt-1">
                    Regular progress reviews & practical home-support guidance.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80"
                  alt="Sensory Integration room"
                  className="rounded-2xl shadow-md object-cover h-48 w-full"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                  About Our Centre
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-1">
                  A Dedicated Centre for Child Development & Inclusive Special Education
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Located in <strong>Woraiyur, Tiruchirappalli</strong>, <span className="font-semibold text-brand-royal">ANNAI – Integrated Child Development Centre</span> was founded to ensure that children with sensory, physical, speech, and developmental variations receive timely, dignified, and professional intervention.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Working hand-in-hand with <strong>Magizhmathi Special School</strong> (an initiative of ANNAI Charitable Trust), our multi-disciplinary team combines evidence-based therapies with tailored academic programs so that every child can realize their fullest potential.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Individualised treatment protocols',
                  'Sensory processing & motor enhancement',
                  'Speech clarity & expressive communication',
                  'Life skills training for daily independence',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-sky flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-royal hover:bg-brand-royal-dark text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                >
                  <span>Read Full Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onOpenAppointment()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold rounded-xl transition-all"
                >
                  <Calendar className="w-4 h-4 text-brand-sky" />
                  <span>Request an Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              Comprehensive Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Our Specialised Therapies & Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Each therapy at ANNAI is structured around individual evaluation, realistic milestone setting, and compassionate execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-brand-border hover:border-brand-sky/40 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm">
                      {serviceIcons[service.id]}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-brand-royal transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      <span className="text-[11px] font-bold text-brand-royal uppercase tracking-wider">
                        Key Focus Areas:
                      </span>
                      <ul className="space-y-1">
                        {service.keyFocusAreas.slice(0, 2).map((focus, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-sky mt-1.5 flex-shrink-0" />
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-slate-100">
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-xs font-bold text-brand-royal hover:text-brand-sky transition-colors flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenEnquiry(service.title)}
                    className="text-xs px-3.5 py-1.5 rounded-lg bg-brand-ice text-brand-royal hover:bg-brand-royal hover:text-white font-semibold transition-all"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl shadow-md transition-all text-sm"
            >
              <span>Explore All 6 Therapy Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE ANNAI */}
      <section className="py-20 bg-brand-ice border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              The ANNAI Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Why Parents Trust ANNAI
            </h2>
            <p className="text-sm text-slate-600">
              A blend of pediatric expertise, respectful compassion, and an empowering special education ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                title: 'Individualised Attention',
                description: 'Custom therapy roadmaps based on systematic assessment rather than a one-size-fits-all model.',
                icon: <UserCheckIcon />,
              },
              {
                title: 'Integrated Services',
                description: 'Occupational, speech, physiotherapy, and sensory therapy all coordinated under one roof.',
                icon: <Award className="w-6 h-6 text-brand-sky" />,
              },
              {
                title: 'Inclusive Special School',
                description: 'Direct synergy with Magizhmathi Special School for daily structured living and education.',
                icon: <Sparkles className="w-6 h-6 text-brand-sky" />,
              },
              {
                title: 'Active Family Counseling',
                description: 'Equipping parents with realistic techniques to foster positive growth in home settings.',
                icon: <Heart className="w-6 h-6 text-brand-sky" />,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-3xl border border-brand-border shadow-soft hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-ice flex items-center justify-center mb-4 text-brand-royal">
                  {feature.icon}
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPECIAL SCHOOL PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl bg-gradient-to-br from-brand-royal to-[#072F33] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            {/* Background embellishment */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-brand-gold text-xs font-semibold">
                  <span>Educational Initiative</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                  Magizhmathi Special School
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans max-w-xl">
                  An initiative of <strong>ANNAI Charitable Trust</strong> located in Woraiyur, Tiruchirappalli. Magizhmathi provides specialized schooling with individualised educational plans (IEPs), life-skills training, and therapy-integrated classrooms.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Individualised Learning Plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Low Student-Teacher Ratio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Practical Daily Life Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Activity-Based Curriculum</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to="/special-school"
                    className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-slate-900 font-semibold rounded-xl transition-all shadow-md text-sm"
                  >
                    Explore Special School
                  </Link>

                  <button
                    onClick={() => onOpenEnquiry('Magizhmathi Special School Admission')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all text-sm"
                  >
                    Admission Enquiry
                  </button>
                </div>
              </div>

              {/* School Photo Preview & Official Logo */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white/95 rounded-3xl p-5 shadow-xl border-4 border-white/20 text-center">
                  <img
                    src={magizhmathiLogo}
                    alt="Magizhmathi Special School Official Crest"
                    className="max-h-48 mx-auto w-auto object-contain drop-shadow"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-[16/9] bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                    alt="Magizhmathi Special School Classrooms"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FACILITIES PREVIEW */}
      <section className="py-20 bg-brand-ice border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Modern & Child-Safe Facilities
            </h2>
            <p className="text-sm text-slate-600">
              Equipped with purposeful therapeutic apparatus designed for children's comfort and developmental stimulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {FACILITIES_DATA.slice(0, 3).map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card transition-all"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={facility.imageUrl}
                    alt={facility.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-sky">
                    {facility.category}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-slate-900">
                    {facility.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl text-sm transition-all"
            >
              <span>View All Centre Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PARENT TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              Words From Families
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Parent Reflections
            </h2>
            <p className="text-sm text-slate-600">
              Real voices from parents whose children have experienced care at ANNAI and Magizhmathi Special School.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="p-6 bg-brand-ice/50 rounded-3xl border border-brand-border shadow-xs hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-sans">
                    "{t.message}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/60 mt-6">
                  <h5 className="font-heading font-bold text-sm text-slate-900">
                    {t.displayName}
                  </h5>
                  <p className="text-xs text-brand-sky font-medium mt-0.5">
                    {t.parentOf}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="py-20 bg-brand-ice border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
              Moments of Joy & Growth
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Centre Gallery Highlights
            </h2>
            <p className="text-sm text-slate-600">
              Every step forward is a celebration. Take a glimpse into our therapy routines and learning spaces.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_DATA.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-200 shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end text-left">
                  <p className="text-white text-xs font-semibold leading-snug">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-royal hover:text-brand-sky transition-colors"
            >
              <span>View Full Gallery (LightBox & Categories)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-royal text-white rounded-3xl p-8 sm:p-12 text-center shadow-card relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                Ready to Discuss Your Child's Development?
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                Our team at <strong>Woraiyur, Tiruchirappalli</strong> is here to assist you with compassionate evaluations and guidance.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-slate-900 font-semibold rounded-xl text-sm transition-all shadow-md"
                >
                  Make an Enquiry
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/20 transition-all"
                >
                  View Location & Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function UserCheckIcon() {
  return <Users className="w-6 h-6 text-brand-sky" />;
}

