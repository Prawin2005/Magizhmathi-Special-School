import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Calendar,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  LogOut,
  Trash2,
  Eye,
  Filter,
  Plus,
  ArrowLeft,
  Mail,
  Phone,
  KeyRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA, GALLERY_DATA, TESTIMONIALS_DATA } from '../data/mockData';
import magizhmathiCrest from '../assets/magizhmathi-crest.png';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('annai_admin_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'appointments' | 'gallery'>('overview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Local state for interactive admin testing
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>(GALLERY_DATA);

  // New gallery item input state
  const [newTitle, setNewTitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Therapy Sessions');

  useEffect(() => {
    // Load local enquiries or populate with default samples
    const storedEnquiries = JSON.parse(localStorage.getItem('annai_enquiries') || '[]');
    if (storedEnquiries.length === 0) {
      const sample = [
        {
          id: 'ENQ-101',
          parentName: 'Sundar Rajan',
          phone: '+91 98401 23456',
          email: 'sundar.r@example.com',
          service: 'Speech & Language Therapy',
          message: 'Looking for speech clarity therapy for my 4 year old boy.',
          status: 'new',
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 'ENQ-102',
          parentName: 'Meenakshi Iyer',
          phone: '+91 97910 87654',
          email: 'meenakshi@example.com',
          service: 'Sensory Integration',
          message: 'Child gets anxious in noisy spaces, requesting initial assessment.',
          status: 'contacted',
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem('annai_enquiries', JSON.stringify(sample));
      setEnquiries(sample);
    } else {
      setEnquiries(storedEnquiries);
    }

    const storedApts = JSON.parse(localStorage.getItem('annai_appointments') || '[]');
    if (storedApts.length === 0) {
      const sampleApts = [
        {
          id: 'APT-201',
          parentName: 'Karthik Narayanan',
          phone: '+91 94440 11223',
          service: 'Occupational Therapy',
          preferredDate: '2026-11-20',
          preferredTime: '10:00 AM - 12:00 PM',
          status: 'pending',
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      localStorage.setItem('annai_appointments', JSON.stringify(sampleApts));
      setAppointments(sampleApts);
    } else {
      setAppointments(storedApts);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      localStorage.setItem('annai_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Please enter admin credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('annai_admin_auth');
    setIsAuthenticated(false);
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;
    const newItem = {
      id: 'g-' + Date.now(),
      title: newTitle,
      imageUrl: newImageUrl,
      category: newCategory,
      mediaType: 'image',
      caption: 'Added via Admin Portal',
    };
    setGalleryList([newItem, ...galleryList]);
    setNewTitle('');
    setNewImageUrl('');
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryList(galleryList.filter((item) => item.id !== id));
  };

  const updateEnquiryStatus = (id: string, newStatus: string) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    localStorage.setItem('annai_enquiries', JSON.stringify(updated));
  };

  const updateAppointmentStatus = (id: string, newStatus: string) => {
    const updated = appointments.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setAppointments(updated);
    localStorage.setItem('annai_appointments', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-ice flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-brand-border shadow-card text-left space-y-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-royal hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <div className="p-2 rounded-xl bg-brand-ice text-brand-royal">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <img
              src={magizhmathiCrest}
              alt="ANNAI & Magizhmathi Official Logo"
              className="w-14 h-14 object-contain mx-auto"
            />
            <h2 className="text-2xl font-heading font-bold text-slate-900">
              Admin Portal
            </h2>
            <p className="text-xs text-slate-500">
              ANNAI Integrated Child Development Centre & Magizhmathi Special School.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@annai-centre.org"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  required
                />
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
              <span className="font-semibold text-slate-700">Demo Login:</span> Any email & password can be entered for local evaluation prior to Supabase connection.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-royal hover:bg-brand-royal-dark text-white font-semibold rounded-xl text-sm shadow-md transition-all"
            >
              Sign In to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={magizhmathiCrest} alt="Logo" className="w-8 h-8 object-contain" />
            <Link to="/" className="text-brand-royal font-heading font-extrabold text-xl">
              ANNAI <span className="text-xs text-brand-sky font-semibold font-sans uppercase">Admin</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Woraiyur Centre Management
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-brand-royal transition-colors"
            >
              View Public Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
            { id: 'appointments', label: `Appointments (${appointments.length})` },
            { id: 'gallery', label: `Gallery Items (${galleryList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-royal text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 text-left">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Total Enquiries
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-heading font-extrabold text-slate-900">
                    {enquiries.length}
                  </span>
                  <span className="text-xs text-brand-sky font-medium">Recorded</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Pending Appointments
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-heading font-extrabold text-amber-600">
                    {appointments.filter((a) => a.status !== 'confirmed').length}
                  </span>
                  <span className="text-xs text-amber-600 font-medium">To Review</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Active Services
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-heading font-extrabold text-brand-royal">
                    {SERVICES_DATA.length}
                  </span>
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Gallery Photos
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-heading font-extrabold text-slate-900">
                    {galleryList.length}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Published</span>
                </div>
              </div>
            </div>

            {/* Recent Enquiries & Appointments Quick view */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Enquiries */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Recent Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-brand-royal font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{item.parentName}</span>
                        <p className="text-slate-500">{item.service}</p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'new'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Recent Appointments
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs text-brand-royal font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {appointments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{apt.parentName}</span>
                        <p className="text-slate-500">
                          {apt.preferredDate} ({apt.preferredTime})
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700">
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enquiries Management */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Enquiry Management
                </h3>
                <p className="text-xs text-slate-500">
                  Review parent submissions, requested services, and manage communication follow-up.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <th className="py-3 px-4">Parent Name</th>
                    <th className="py-3 px-4">Phone & Email</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Message / Notes</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {enq.parentName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-700">{enq.phone}</div>
                        <div className="text-slate-400">{enq.email}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-brand-royal">
                        {enq.service}
                      </td>
                      <td className="py-3 px-4 max-w-xs text-slate-600 line-clamp-2">
                        {enq.message}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            enq.status === 'new'
                              ? 'bg-blue-100 text-blue-700'
                              : enq.status === 'contacted'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="new">Mark New</option>
                          <option value="contacted">Mark Contacted</option>
                          <option value="completed">Mark Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 text-left">
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Appointment Requests
              </h3>
              <p className="text-xs text-slate-500">
                Manage slot requests for developmental assessments and campus visits.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <th className="py-3 px-4">Parent</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date & Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {apt.parentName}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {apt.phone}
                      </td>
                      <td className="py-3 px-4 font-medium text-brand-royal">
                        {apt.service}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{apt.preferredDate}</div>
                        <div className="text-slate-500">{apt.preferredTime}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700">
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={apt.status}
                          onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirm Slot</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 text-left">
            {/* Add new photo form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Add New Photo to Gallery
              </h3>
              <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Fine Motor Exercise"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Therapy Sessions">Therapy Sessions</option>
                    <option value="Classrooms">Classrooms</option>
                    <option value="Sensory & Play">Sensory & Play</option>
                    <option value="Events & Activities">Events & Activities</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-brand-royal text-white font-semibold text-xs rounded-xl shadow-xs"
                  >
                    Add Photo
                  </button>
                </div>
              </form>
            </div>

            {/* Gallery list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="h-36 bg-slate-100 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] rounded-md font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[160px]">
                      {item.title}
                    </span>
                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

