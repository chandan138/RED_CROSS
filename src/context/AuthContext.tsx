import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  userEmail: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  patientName: string;
  symptoms: string;
}

export interface DoctorReport {
  id: string;
  userEmail: string;
  doctorId: string;
  doctorName: string;
  fileName: string;
  fileSize: string;
  notes: string;
  uploadedAt: string;
}

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  bookings: Booking[];
  reports: DoctorReport[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  login: (email: string, name?: string) => boolean;
  signup: (name: string, email: string) => boolean;
  logout: () => void;
  createBooking: (booking: Omit<Booking, 'id' | 'userEmail' | 'status'>) => void;
  uploadReport: (report: Omit<DoctorReport, 'id' | 'userEmail' | 'uploadedAt'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reports, setReports] = useState<DoctorReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('redcross_user');
    const storedBookings = localStorage.getItem('redcross_bookings');
    const storedReports = localStorage.getItem('redcross_reports');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBookings) setBookings(JSON.parse(storedBookings));
    if (storedReports) setReports(JSON.parse(storedReports));
  }, []);

  // Sync state to localStorage
  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('redcross_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('redcross_user');
    }
  };

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('redcross_bookings', JSON.stringify(newBookings));
  };

  const saveReports = (newReports: DoctorReport[]) => {
    setReports(newReports);
    localStorage.setItem('redcross_reports', JSON.stringify(newReports));
  };

  const login = (email: string, name?: string): boolean => {
    // For simplicity, we auto-create/login the user
    const finalName = name || email.split('@')[0];
    saveUser({ name: finalName, email });
    return true;
  };

  const signup = (name: string, email: string): boolean => {
    saveUser({ name, email });
    return true;
  };

  const logout = () => {
    saveUser(null);
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'userEmail' | 'status'>) => {
    if (!user) return;
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      userEmail: user.email,
      status: 'Upcoming',
    };
    saveBookings([newBooking, ...bookings]);
  };

  const uploadReport = (reportData: Omit<DoctorReport, 'id' | 'userEmail' | 'uploadedAt'>) => {
    if (!user) return;
    const newReport: DoctorReport = {
      ...reportData,
      id: `report-${Date.now()}`,
      userEmail: user.email,
      uploadedAt: new Date().toLocaleDateString(),
    };
    saveReports([newReport, ...reports]);
  };

  const userBookings = bookings.filter((b) => b.userEmail === user?.email);
  const userReports = reports.filter((r) => r.userEmail === user?.email);

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings: userBookings,
        reports: userReports,
        searchQuery,
        setSearchQuery,
        login,
        signup,
        logout,
        createBooking,
        uploadReport,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
