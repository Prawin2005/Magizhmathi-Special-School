import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, Clock, AlertCircle, Phone, User } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

const appointmentSchema = z.object({
  parentName: z.string().min(2, 'Please enter parent/guardian name'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[0-9+\s-]{10,15}$/, 'Invalid phone number format'),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
  additionalMessage: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
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
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      parentName: '',
      phone: '',
      service: defaultService || SERVICES_DATA[0]?.title || '',
      preferredDate: '',
      preferredTime: '10:00 AM - 12:00 PM',
      additionalMessage: '',
    },
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    try {
      const stored = JSON.parse(localStorage.getItem('annai_appointments') || '[]');
      stored.push({
        id: 'APT-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        status: 'pending_confirmation',
      });
      localStorage.setItem('annai_appointments', JSON.stringify(stored));

      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      alert('There was an issue submitting your appointment request.');
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden border border-brand-border"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-sky via-brand-royal to-brand-gold" />

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
                  Appointment Request Received
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you! Our clinical team will review scheduling availability and call you to confirm your consultation time.
                </p>
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 text-left">
                  <span className="font-semibold">Note:</span> Appointment requests are subject to confirmation by our clinical coordinator and do not represent an automatic booking.
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-brand-royal hover:bg-brand-royal-dark text-white font-medium rounded-xl transition-all shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                    Schedule A Visit
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mt-1">
                    Request an Appointment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Visit our centre in Woraiyur, Tiruchirappalli for an assessment consultation.
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
                        placeholder="e.g. Ramesh Kumar"
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

                  {/* Phone */}
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

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department / Service *
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
                      <option value="Special School Consultation">
                        Magizhmathi Special School Consultation
                      </option>
                      <option value="Initial Developmental Screening">
                        Initial Multi-Disciplinary Screening
                      </option>
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Date and Time slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          {...register('preferredDate')}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all ${
                            errors.preferredDate ? 'border-red-400' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-xs text-red-500 mt-1">{errors.preferredDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Slot *
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          {...register('preferredTime')}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all"
                        >
                          <option value="09:30 AM - 11:30 AM">Morning: 09:30 AM – 11:30 AM</option>
                          <option value="11:30 AM - 01:30 PM">Afternoon: 11:30 AM – 01:30 PM</option>
                          <option value="02:30 PM - 04:30 PM">Post-Noon: 02:30 PM – 04:30 PM</option>
                          <option value="04:30 PM - 06:00 PM">Evening: 04:30 PM – 06:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Child’s Age & Specific Requirements (Optional)
                    </label>
                    <textarea
                      {...register('additionalMessage')}
                      rows={2}
                      placeholder="Any prior diagnosis or specific questions you would like addressed..."
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    * Our centre coordinator will confirm time slot availability upon review.
                  </p>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-brand-royal hover:bg-brand-royal-dark active:scale-[0.99] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Request Appointment</span>
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

