import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { EnquiryModal } from '../components/EnquiryModal';
import { AppointmentModal } from '../components/AppointmentModal';

export const MainLayout: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleOpenEnquiry = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsEnquiryOpen(true);
  };

  const handleOpenAppointment = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />

      <main className="flex-1">
        <Outlet
          context={{
            onOpenEnquiry: handleOpenEnquiry,
            onOpenAppointment: handleOpenAppointment,
          }}
        />
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Reusable Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultService={selectedService}
      />
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
};

