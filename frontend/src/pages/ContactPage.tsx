import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Calendar,
  CheckCircle,
  AlertCircle,
  User,
} from 'lucide-react';
import { CONTACT_INFO, SERVICES_DATA } from '../data/mockData';
import { useSEO } from '../hooks/useSEO';

const contactFormSchema = z.object({
  parentName: z.string().min(2, 'Please enter your name'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[0-9+\s-]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please write a brief note (minimum 10 characters)'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please consent to be contacted regarding your query' }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Contact Us & Location (Woraiyur, Trichy)',
    description: 'Contact ANNAI Integrated Child Development Centre in Woraiyur, Tiruchirappalli. Location map, WhatsApp chat, phone and online consultation enquiry.',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      parentName: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      consent: true,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const stored = JSON.parse(localStorage.getItem('annai_enquiries') || '[]');
      stored.push({
        id: 'ENQ-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      localStorage.setItem('annai_enquiries', JSON.stringify(stored));

      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      alert('Error submitting enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    CONTACT_INFO.whatsappMessage
  )}`;

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-ice to-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mt-2">
            Contact & Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 font-sans">
            We are here to support your family. Visit our centre in Woraiyur or connect with our developmental care coordinator.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Cards & Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                  Centre Address
                </span>
                <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
                  ANNAI Integrated Child Development Centre
                </h2>
                <p className="text-xs text-brand-royal font-semibold mt-1">
                  Magizhmathi Special School – An initiative of ANNAI Charitable Trust
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {/* Location */}
                <div className="p-5 bg-brand-ice rounded-2xl border border-brand-border flex items-start gap-4">
                  <div className="p-3 bg-white text-brand-royal rounded-xl shadow-xs">
                    <MapPin className="w-5 h-5 text-brand-royal" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      Our Location
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-sans">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-5 bg-brand-ice rounded-2xl border border-brand-border flex items-start gap-4">
                  <div className="p-3 bg-white text-brand-royal rounded-xl shadow-xs">
                    <Phone className="w-5 h-5 text-brand-royal" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      Phone Call
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-sans">
                      <a
                        href={`tel:${CONTACT_INFO.phonePlaceholder.replace(/[^0-9+]/g, '')}`}
                        className="font-semibold text-brand-royal hover:underline"
                      >
                        {CONTACT_INFO.phonePlaceholder}
                      </a>
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      (Verified helpline number placeholder)
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-start gap-4">
                  <div className="p-3 bg-white text-[#25D366] rounded-xl shadow-xs">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      WhatsApp Messaging
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-sans">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1ea952] hover:underline"
                      >
                        Click to chat directly on WhatsApp
                      </a>
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Instant response during operating hours
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 bg-brand-ice rounded-2xl border border-brand-border flex items-start gap-4">
                  <div className="p-3 bg-white text-brand-royal rounded-xl shadow-xs">
                    <Mail className="w-5 h-5 text-brand-royal" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      Email Communication
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-sans">
                      <a
                        href={`mailto:${CONTACT_INFO.emailPlaceholder}`}
                        className="font-semibold text-brand-royal hover:underline"
                      >
                        {CONTACT_INFO.emailPlaceholder}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-5 bg-brand-ice rounded-2xl border border-brand-border flex items-start gap-4">
                  <div className="p-3 bg-white text-brand-royal rounded-xl shadow-xs">
                    <Clock className="w-5 h-5 text-brand-royal" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      Working Hours
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-sans">
                      {CONTACT_INFO.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-card text-left">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                    Send a Message
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mt-1">
                    Enquiry & Consultation Request
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below. Our clinical care team will contact you to schedule an initial consultation.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-slate-900">
                      Thank You!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your enquiry has been received by ANNAI – Integrated Child Development Centre. We will contact you at the provided phone number.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        reset();
                      }}
                      className="px-6 py-2.5 bg-brand-royal text-white font-medium rounded-xl text-sm shadow-md"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent / Guardian Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          {...register('parentName')}
                          type="text"
                          placeholder="Your full name"
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                            errors.parentName ? 'border-red-400' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.parentName && (
                        <p className="text-xs text-red-500 mt-1">{errors.parentName.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            {...register('phone')}
                            type="tel"
                            placeholder="+91 98765 43210"
                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                              errors.phone ? 'border-red-400' : 'border-slate-200'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="parent@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                              errors.email ? 'border-red-400' : 'border-slate-200'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service of Interest *
                      </label>
                      <select
                        {...register('service')}
                        className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                          errors.service ? 'border-red-400' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select a service / department...</option>
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                        <option value="Magizhmathi Special School Admission">
                          Magizhmathi Special School (Admissions)
                        </option>
                        <option value="Multi-Disciplinary Assessment">
                          Comprehensive Developmental Assessment
                        </option>
                      </select>
                      {errors.service && (
                        <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Child’s Age & Details *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        placeholder="Please share your child's age, specific concerns, or any prior evaluations..."
                        className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all resize-none ${
                          errors.message ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          {...register('consent')}
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-royal focus:ring-brand-sky"
                        />
                        <span className="text-xs text-slate-500 leading-snug">
                          I consent to ANNAI contacting me regarding my child's developmental consultation.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-xs text-red-500 mt-1">{errors.consent.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Enquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-card border border-brand-border bg-slate-100">
            <div className="p-4 bg-brand-ice flex items-center justify-between border-b border-brand-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-royal" />
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-800">
                  Google Maps Location: Woraiyur, Tiruchirappalli
                </span>
              </div>
              <span className="text-[11px] text-slate-500">Tamil Nadu 620003</span>
            </div>

            <div className="w-full h-80 sm:h-96 relative">
              <iframe
                title="ANNAI Integrated Child Development Centre Location Map"
                src={CONTACT_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

