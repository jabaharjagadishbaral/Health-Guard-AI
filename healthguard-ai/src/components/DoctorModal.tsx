import React, { useState } from 'react';
import { X, Stethoscope, Star, Calendar, ShieldAlert, PhoneCall, CheckCircle2, MapPin } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({ isOpen, onClose }) => {
  const [bookedDoctorId, setBookedDoctorId] = useState<string | null>(null);

  if (!isOpen) return null;

  const doctors: Doctor[] = [
    {
      id: 'doc-1',
      name: 'Dr. Evelyn Reed, MD',
      specialty: 'General Internal Medicine & Triage',
      hospital: 'Metro Health Academic Medical Center',
      rating: 4.9,
      reviewsCount: 312,
      nextAvailable: 'Today at 3:30 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
      location: 'Virtual Telehealth',
    },
    {
      id: 'doc-2',
      name: 'Dr. Aris Thorne, MD',
      specialty: 'Cardiologist & Vascular Health',
      hospital: 'St. Jude Heart Institute',
      rating: 4.95,
      reviewsCount: 428,
      nextAvailable: 'Tomorrow at 10:00 AM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
      location: 'Virtual / In-Clinic',
    },
    {
      id: 'doc-3',
      name: 'Dr. Maya Lin, MD',
      specialty: 'Dermatology & Allergy Specialist',
      hospital: 'Pacific Skin & Wellness Center',
      rating: 4.88,
      reviewsCount: 194,
      nextAvailable: 'Today at 5:15 PM',
      image: 'https://images.unsplash.com/photo-1594824813566-78a901017d81?w=200&auto=format&fit=crop&q=80',
      location: 'Virtual Telehealth',
    },
  ];

  const handleBook = (id: string) => {
    setBookedDoctorId(id);
    setTimeout(() => {
      alert("Virtual Consultation appointment request sent successfully! You will receive confirmation via email.");
      setBookedDoctorId(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border border-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-teal-100 text-teal-700">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Connect with a Verified Doctor</h3>
            <p className="text-xs text-slate-500 font-medium">Escalate from AI triage to a live video consultation in minutes.</p>
          </div>
        </div>

        {/* Emergency Alert Banner */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs mb-6 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Life-Threatening Symptoms?</strong>
            <p className="mt-0.5 text-rose-700">
              If you are experiencing severe chest tightness, sudden facial weakness, or severe hemorrhage, call <strong>911</strong> or go to the nearest emergency room immediately.
            </p>
          </div>
        </div>

        {/* Doctors Directory List */}
        <div className="space-y-4">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-slate-50/60 hover:bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{doc.name}</h4>
                  <p className="text-xs font-semibold text-teal-700">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" /> {doc.hospital}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> {doc.rating}
                    </span>
                    <span className="text-[11px] text-slate-400">({doc.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="w-full sm:w-auto text-right flex flex-col sm:items-end gap-2">
                <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" /> {doc.nextAvailable}
                </div>
                <button
                  onClick={() => handleBook(doc.id)}
                  disabled={bookedDoctorId === doc.id}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {bookedDoctorId === doc.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-spin" /> Requesting...
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-3.5 h-3.5" /> Book Consultation
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
