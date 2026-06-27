import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, MapPin, ArrowLeft, ShieldAlert, Award, MessageSquare, CheckCircle, Lock, X } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { useAuth } from '../context/AuthContext';

export const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, login, createBooking } = useAuth();

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState(user ? user.name : '');
  const [symptoms, setSymptoms] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Auth Pop-up State (If booking when not logged in)
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const doctor = DOCTORS.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="flex-1 bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-10 min-h-screen">
        <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold">Doctor Profile Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      // Show login/sign up popup first
      setShowAuthModal(true);
      return;
    }

    createBooking({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.image,
      date: selectedDate,
      time: selectedTime,
      patientName: patientName || user.name,
      symptoms,
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    if (isSignUp) {
      login(emailInput, nameInput || undefined);
    } else {
      login(emailInput);
    }

    setShowAuthModal(false);
    setEmailInput('');
    setNameInput('');

    // Pre-fill patient name
    setPatientName(isSignUp && nameInput ? nameInput : emailInput.split('@')[0]);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-555 hover:text-slate-900 transition-colors mb-6 text-base font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Specialists</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Details (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Profile card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 backdrop-blur-md shadow-sm">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover border border-slate-200"
              />
              <div className="flex-1 text-center md:text-left min-w-0">
                <span className="text-sm bg-blue-500/10 text-blue-600 border border-blue-550/15 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {doctor.specialty}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-850 mt-3">{doctor.name}</h2>
                <p className="text-sm text-slate-500 mt-1 flex items-center justify-center md:justify-start gap-1 font-medium">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {doctor.hospital}
                </p>

                <div className="flex flex-wrap gap-4 mt-5 justify-center md:justify-start">
                  <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                    <div className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Experience</div>
                    <div className="text-base font-bold text-slate-800 mt-0.5">{doctor.experience}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                    <div className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Rating</div>
                    <div className="text-base font-bold text-yellow-500 mt-0.5 flex items-center justify-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      {doctor.rating}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                    <div className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Reviews</div>
                    <div className="text-base font-bold text-blue-600 mt-0.5">{doctor.reviews.length} Patients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Bio */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 backdrop-blur-md shadow-sm">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-500" />
                Professional Summary
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{doctor.bio}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 backdrop-blur-md shadow-sm">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                Patient Feedback ({doctor.reviews.length})
              </h3>
              <div className="space-y-4">
                {doctor.reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold uppercase">
                          {rev.user[0]}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{rev.user}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-yellow-400 text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Calendar Widget (Right Column) */}
          <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-28 backdrop-blur-md shadow-sm">
              <h3 className="font-extrabold text-base text-slate-850 flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Book Consultation
              </h3>

              {bookingSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-600 rounded-full animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-slate-800">Booking Confirmed!</h4>
                  <p className="text-xs text-slate-500">Redirecting to dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Select Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Select Consultation Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Available Time Slots */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      Available Slots
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 rounded-lg text-sm font-semibold border transition-all ${
                            selectedTime === slot
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-350 hover:text-slate-900'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Patient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-850 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Symptoms info */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Brief Symptoms Description
                    </label>
                    <textarea
                      placeholder="e.g. Cough, mild fever, chest congestion"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-850 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/10 flex items-center justify-center gap-1.5 mt-2"
                  >
                    Confirm Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Pop-up Modal (When booking while unlogged) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl glass-panel relative animate-teddy-breath" style={{ animationDuration: '6s' }}>
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isSignUp ? 'Join Redcross to Book' : 'Login Required'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                You need a quick profile to confirm bookings and view records.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/10 mt-2"
              >
                {isSignUp ? 'Create Profile' : 'Access Booking'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                {isSignUp ? 'Already have a profile? Log In' : "New patient? Register here"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
