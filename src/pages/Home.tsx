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
    <div className="flex-1 bg-slate-950 text-slate-100 min-h-screen">
      {/* Specialties Filters */}
      <section className="w-full px-12 py-6 border-b border-slate-900 bg-slate-950">
        <div className="w-full">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center mb-5">
            Select Specialist
          </h2>
          <div className="flex flex-wrap items-center justify-between lg:justify-center gap-3 w-full max-w-none">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`flex-1 min-w-[120px] lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold border text-center transition-all ${
                !selectedSpecialty
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              All Doctors
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`flex-1 min-w-[120px] lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold border text-center transition-all ${
                  selectedSpecialty === specialty
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
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
            <h2 className="text-lg font-extrabold text-white flex items-center gap-1.5">
              <HeartPulse className="w-5 h-5 text-red-500" />
              Available Providers
            </h2>
            <p className="text-[11px] text-slate-500">Find and schedule a diagnostic consultation</p>
          </div>
          <span className="text-[11px] font-semibold bg-slate-950 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-lg">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/doctor/${doc.id}`)}
                className="bg-slate-900/40 border border-slate-800 hover:border-blue-500/40 rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Slimmer Image & Rating Badge */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-950">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 right-1.5 bg-slate-950/90 border border-slate-850 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-0.5 backdrop-blur-md">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                {/* Compact Info Section */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/10">
                      {doc.specialty}
                    </span>
                    <h3 className="font-bold text-xs text-white mt-2 group-hover:text-blue-400 transition-colors truncate">
                      {doc.name}
                    </h3>
                    <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">{doc.hospital}</p>
                  </div>

                  <div className="border-t border-slate-850/80 pt-2 mt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Exp: {doc.experience}</span>
                    <span className="text-blue-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Book <ArrowRight className="w-3 h-3" />
                    </span>
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
