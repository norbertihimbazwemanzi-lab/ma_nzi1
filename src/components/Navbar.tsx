import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { WebsiteLogo } from './WebsiteLogo';

interface NavbarProps {
  onOpenResume: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onLogoutAdmin: () => void;
  customLogoUrl?: string;
}

export function Navbar({ 
  onOpenResume, 
  isAdminLoggedIn,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onLogoutAdmin,
  customLogoUrl
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Website Logo with Rwanda flag emblem */}
          <a href="#" className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity">
            <WebsiteLogo customLogoUrl={customLogoUrl} size="md" />
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links (No social media here) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              About
            </a>
            <a href="#skills" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Projects
            </a>
            <a href="#family" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Family & Friends
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Admin Control (Clean: NO social media as requested) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAdminDashboard}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Log out of Admin"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                title="Admin Login"
              >
                Admin
              </button>
            )}

            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              View CV
            </button>
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              About Norbert
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Technical Skills
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Projects & School Systems
            </a>
            <a 
              href="#family" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Family & Friends
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Contact & Social Media
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-left hover:text-blue-600 py-1"
            >
              View Printable CV
            </button>
            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="text-left text-emerald-700 font-semibold py-1"
              >
                Admin Control Center
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="text-left text-slate-600 hover:text-blue-600 py-1 font-medium"
              >
                Admin Login
              </button>
            )}
          </nav>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block py-2.5 px-4 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Contact Ihimbazwe Manzi Norbert
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
