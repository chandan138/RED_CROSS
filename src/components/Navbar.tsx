import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, LayoutDashboard, LogIn, Lock, X, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, login, searchQuery, setSearchQuery } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

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
    navigate('/dashboard');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-250 px-6 py-4 flex items-center justify-between shadow-sm">
        {/* Left side: Logo + Search Bar */}
        <div className="flex items-center space-x-6 flex-1 max-w-xl mr-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <div className="bg-red-500 text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-800 tracking-wider flex items-center gap-1">
                RED<span className="text-red-500 font-black">CROSS</span>
              </span>
              <span className="block text-[11px] text-slate-500 -mt-1 font-semibold uppercase tracking-widest">Medical Portal</span>
            </div>
          </Link>

          {/* Search bar next to logo */}
          <div className="flex items-center flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 space-x-2 max-w-xs sm:max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Navigation / User Controls at Right Top */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-base font-medium text-slate-650 hover:text-slate-900 transition-colors">
            Find Doctor
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="flex items-center space-x-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-550 flex items-center justify-center text-xs font-bold uppercase">
                  {user.name[0]}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:inline">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-slate-400 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsSignUp(false);
                setShowAuthModal(true);
              }}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-blue-500/10"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modal Popup */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div
            className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl glass-panel relative animate-teddy-breath"
            style={{ animationDuration: '6s' }}
          >
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
                {isSignUp ? 'Create your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isSignUp ? 'Sign up to manage appointments and reports' : 'Sign in to access your dashboard'}
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
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
