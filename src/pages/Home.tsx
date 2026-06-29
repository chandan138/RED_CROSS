import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, HeartPulse } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { searchQuery, setSearchQuery } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const navigate = useNavigate();

  const specialties = Array.from(new Set(DOCTORS.map(d => d.specialty)));

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 min-h-screen">
      {/* Specialties Filters */}
      <section className="w-full px-4 sm:px-8 md:px-12 py-8 border-b border-slate-200/80 bg-white">
        <div className="w-full">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 text-center mb-6">
            Select Specialist
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-base font-extrabold border text-center transition-all ${
                !selectedSpecialty
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              All Doctors
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-base font-extrabold border text-center transition-all ${
                  selectedSpecialty === specialty
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Cards Grid (Directly below select specialist) */}
      <section className="px-6 py-8 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-1.5">
              <HeartPulse className="w-5 h-5 text-red-500" />
              Available Providers
            </h2>
            <p className="text-xs text-slate-500">Find and schedule a diagnostic consultation</p>
          </div>
          <span className="text-xs font-semibold bg-white text-blue-600 border border-blue-200 px-2.5 py-1 rounded-lg">
            {filteredDoctors.length} Providers Found
          </span>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-900 rounded-2xl bg-slate-900/10">
            <p className="text-slate-400 text-xs font-medium">No doctors match your filters.</p>
            <button
              onClick={() => { setSelectedSpecialty(null); setSearchQuery(''); }}
              className="text-[11px] text-blue-400 hover:underline mt-1 font-semibold"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          /* Grid of smaller doctor cards */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/doctor/${doc.id}`)}
                className="bg-white border border-slate-200 hover:border-blue-500/40 rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Larger Image & Rating Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 border border-slate-200 text-amber-500 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-0.5 backdrop-blur-md">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                {/* Generous Info Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/10">
                      {doc.specialty}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-800 mt-2.5 group-hover:text-blue-600 transition-colors truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate mt-1">{doc.hospital}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center text-sm">
                    <span className="text-slate-500">Exp: {doc.experience}</span>
                    <span className="text-blue-500 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Book <ArrowRight className="w-3.5 h-3.5" />                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
