import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, AlertCircle, Phone, Mail, User } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

const enquirySchema = z.object({
  parentName: z.string().min(2, 'Please enter parent/guardian name'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[0-9+\s-]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please write a brief note (minimum 10 characters)'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to be contacted regarding this enquiry' }),
  }),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = '',
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      parentName: '',
      phone: '',
      email: '',
      service: defaultService || SERVICES_DATA[0]?.title || '',
      message: '',
      consent: true,
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true);
    try {
      // Phase 1/2 frontend demo state + Phase 5 backend API bridge
      const storedEnquiries = JSON.parse(localStorage.getItem('annai_enquiries') || '[]');
      storedEnquiries.push({
        id: 'ENQ-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      localStorage.setItem('annai_enquiries', JSON.stringify(storedEnquiries));

      // Simulate slight network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      alert('There was an issue submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden border border-brand-border"
          >
            {/* Header pattern */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-royal via-brand-sky to-brand-gold" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900">
                  Enquiry Received
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to <span className="font-semibold text-brand-royal">ANNAI Integrated Child Development Centre</span>. Our developmental care coordinator will review your request and get in touch with you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-brand-royal hover:bg-brand-royal-dark text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                    Make An Enquiry
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mt-1">
                    Child Development Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Every child deserves individual attention. Share your details and we will reach out with supportive guidance.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        {...register('parentName')}
                        type="text"
                        placeholder="e.g. Priya Sundaram"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                          errors.parentName ? 'border-red-400 ring-red-100' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.parentName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.parentName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
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
                            errors.phone ? 'border-red-400 ring-red-100' : 'border-slate-200'
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
                            errors.email ? 'border-red-400 ring-red-100' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service / Therapy Required *
                    </label>
                    <select
                      {...register('service')}
                      className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                        errors.service ? 'border-red-400' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="Magizhmathi Special School Admission">
                        Magizhmathi Special School (Admission Enquiry)
                      </option>
                      <option value="General Comprehensive Developmental Assessment">
                        General Comprehensive Developmental Assessment
                      </option>
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Child’s Age & Note *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="Please mention your child's age, key observations or questions..."
                      className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all resize-none ${
                        errors.message ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Consent checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        {...register('consent')}
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-royal focus:ring-brand-sky"
                      />
                      <span className="text-xs text-slate-500 leading-snug">
                        I consent to ANNAI Integrated Child Development Centre contacting me regarding my child's developmental evaluation.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-red-500 mt-1">{errors.consent.message}</p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-brand-royal hover:bg-brand-royal-dark active:scale-[0.99] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

