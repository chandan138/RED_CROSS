import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { DoctorDetails } from './pages/DoctorDetails';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
          {/* Main Navigation Header */}
          <Navbar />

          {/* Dynamic Content Pages */}
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctor/:id" element={<DoctorDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

          {/* Persistent AI Chatbot Assistant Widget */}
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
