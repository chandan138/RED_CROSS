import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Clipboard, Upload, FileText, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DOCTORS } from '../data/doctors';

export const Dashboard: React.FC = () => {
  const { user, bookings, reports, uploadReport } = useAuth();
  const navigate = useNavigate();

  // Report Upload Form State
  const [selectedDocId, setSelectedDocId] = useState('');
  const [fileName, setFileName] = useState('');
  const [reportNotes, setReportNotes] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Split bookings into upcoming and completed/past
  const upcomingBookings = bookings.filter(b => b.status === 'Upcoming');

  // Find unique doctors visited/booked to suggest in dropdown for reports
  const uniqueVisitedDoctors = Array.from(
    new Map(bookings.map(b => [b.doctorId, { id: b.doctorId, name: b.doctorName }])).values()
  );

  const handleReportUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocId || !fileName) return;

    const matchedDoc = DOCTORS.find(d => d.id === selectedDocId);
    const doctorName = matchedDoc ? matchedDoc.name : 'Unknown Doctor';

    uploadReport({
      doctorId: selectedDocId,
      doctorName,
      fileName,
      fileSize: '1.2 MB', // Mock file size
      notes: reportNotes
    });

    setUploadSuccess(true);
    setFileName('');
    setReportNotes('');
    setSelectedDocId('');
    setTimeout(() => setUploadSuccess(false), 2500);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/80 pb-6 gap-4">
          <div>
            <span className="text-sm text-blue-600 font-bold tracking-widest uppercase">Patient Workspace</span>
            <h1 className="text-3xl font-black text-slate-800 mt-1">Hello, {user.name} 👋</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your appointment calendars, consultation history, and health files.</p>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
              {upcomingBookings.length}
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Scheduled</div>
              <div className="text-sm font-bold text-slate-700">Appointments</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Appointment Area (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upcoming Appointments */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Upcoming Consultations
              </h2>

              {upcomingBookings.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <p className="text-sm text-slate-500 font-medium">No scheduled appointments found.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="text-sm text-blue-400 hover:underline mt-2 font-bold"
                  >
                    Browse and book a doctor
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((book) => (
                    <div
                      key={book.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.doctorImage}
                          alt={book.doctorName}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div>
                          <h3
                            onClick={() => navigate(`/doctor/${book.doctorId}`)}
                            className="font-bold text-base text-slate-800 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1 group"
                          >
                            {book.doctorName}
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-sm text-blue-600 font-semibold">{book.doctorSpecialty}</p>
                          <p className="text-sm text-slate-500 mt-1">Patient: <span className="text-slate-700 font-medium">{book.patientName}</span></p>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-slate-200 pt-3 sm:pt-0">
                        <div className="flex items-center space-x-1.5 text-sm text-emerald-600 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/10">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{book.date} at {book.time}</span>
                        </div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Confirmed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visit History / Booked Doctors */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <Clipboard className="w-5 h-5 text-indigo-500" />
                Previously Visited Doctors
              </h2>

              {bookings.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-6">Your visit history will populate here once you make your first booking.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {uniqueVisitedDoctors.map((doc) => {
                    const fullDoc = DOCTORS.find(d => d.id === doc.id);
                    if (!fullDoc) return null;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => navigate(`/doctor/${doc.id}`)}
                        className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-indigo-500/35 transition-all cursor-pointer flex items-center space-x-3 group"
                      >
                        <img
                          src={fullDoc.image}
                          alt={fullDoc.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{fullDoc.name}</h4>
                          <p className="text-xs text-indigo-600 font-semibold">{fullDoc.specialty}</p>
                          <p className="text-xs text-slate-500 truncate">{fullDoc.hospital}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Uploaded Reports Directory */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                Uploaded Medical Reports & Records
              </h2>

              {reports.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 font-medium">No medical files uploaded yet.</p>
                  <p className="text-[10px] text-slate-400 mt-1">Use the upload tool on the right to store files for your doctors.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reports.map((rep) => (
                    <div
                      key={rep.id}
                      className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start space-x-3 relative overflow-hidden"
                    >
                      <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-855 truncate" title={rep.fileName}>{rep.fileName}</h4>
                        <p className="text-xs text-slate-500">Doctor: <span className="text-slate-700 font-medium">{rep.doctorName}</span></p>
                        {rep.notes && <p className="text-xs text-slate-500 mt-1.5 italic">Notes: "{rep.notes}"</p>}
                        <span className="inline-block text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-wide">Uploaded: {rep.uploadedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Upload Tools) */}
          <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-28 shadow-sm space-y-6">
              
              {/* Manual Report Upload */}
              <div>
                <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-emerald-500" />
                  Upload Health Report
                </h3>

                {uploadSuccess ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs">Report Saved!</h4>
                      <p className="text-[10px] text-emerald-500/80 mt-0.5">Metadata successfully updated.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReportUploadSubmit} className="space-y-4">
                    {/* Select Doctor */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Select Doctor Visited
                      </label>
                      <select
                        required
                        value={selectedDocId}
                        onChange={(e) => setSelectedDocId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="">-- Choose Doctor --</option>
                        {DOCTORS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.specialty})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* File Upload Simulation */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Report Name / File Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Blood Test Results.pdf"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Report Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Patient / Doctor Notes (Optional)
                      </label>
                      <textarea
                        placeholder="e.g. Iron levels normal, cholesterol slightly elevated"
                        value={reportNotes}
                        onChange={(e) => setReportNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-850 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedDocId || !fileName}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/10 flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Save Record</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Quick Health Tips */}
              <div className="border-t border-slate-850 pt-4 text-xs text-slate-400 space-y-2">
                <h4 className="font-semibold text-slate-350 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  Health Records Tip
                </h4>
                <p className="leading-relaxed">
                  Keeping your reports organized helps doctors diagnose complex issues accurately. Always mention changes in symptoms or duration during consultations.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
