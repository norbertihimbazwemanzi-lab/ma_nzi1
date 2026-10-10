import React from 'react';
import { ArrowRight, Code2, Database, School, CheckCircle2, MapPin, Mail, Github, Linkedin, MessageCircle, ExternalLink } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  developerInfo: {
    name: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    avatarUrl: string;
    socialLinks?: {
      github: string;
      linkedin: string;
      whatsapp: string;
      twitter: string;
    };
  };
  isAdminLoggedIn: boolean;
  onOpenAdminDashboard: () => void;
}

export function Hero({ 
  onOpenResume, 
  developerInfo,
  isAdminLoggedIn,
  onOpenAdminDashboard
}: HeroProps) {
  const socials = developerInfo.socialLinks || DEVELOPER_INFO.socialLinks;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero: 2-column balanced grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch mb-14">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed kicker (no pill) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-4">
              <span>Full-Stack Developer</span>
              <span aria-hidden="true">·</span>
              <span>Studied in Runda, Rwanda</span>
              <span aria-hidden="true">·</span>
              <span>School Systems Specialist</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              {developerInfo.name}
            </h1>

            {/* Subtitle & Value Proposition */}
            <p className="mt-4 text-lg sm:text-xl font-medium text-slate-700 leading-snug text-balance">
              {developerInfo.title}
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {developerInfo.bio}
            </p>

            {/* Primary Action Row with Social Media Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-2"
              >
                <span>View Projects & Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#family"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Family & Roots in Runda</span>
              </a>

              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 text-xs sm:text-sm font-medium rounded-lg transition-colors"
              >
                Download CV
              </button>
            </div>

            {/* Social Media Channels Row */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1">Social Channels:</span>
              
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-slate-900" />
                <span>GitHub</span>
              </a>

              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
              </a>

              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors"
              >
                <span>X / Twitter</span>
              </a>
            </div>

            {/* Direct contact line */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Runda, Rwanda</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <a href={`mailto:${developerInfo.email || DEVELOPER_INFO.email}`} className="hover:text-blue-600 font-mono">
                  {developerInfo.email || DEVELOPER_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Available for School & Web Projects</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-200/80 mb-4 group">
                <img
                  src={developerInfo.avatarUrl}
                  alt={developerInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Admin Quick Photo Edit Overlay */}
                {isAdminLoggedIn && (
                  <button
                    onClick={onOpenAdminDashboard}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg backdrop-blur-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>Change Photo</span>
                  </button>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <div className="text-xs font-semibold text-blue-200 uppercase tracking-wide">Developer Profile</div>
                    <div className="text-lg font-bold">{developerInfo.name}</div>
                    <div className="text-xs text-slate-200">Full-Stack Engineer · {developerInfo.location}</div>
                  </div>
                </div>
              </div>

              {/* Quick Tech Snapshot below portrait */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200/80">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-600" />
                    Frontend Frameworks
                  </span>
                  <span className="font-semibold text-slate-900">React.js · Vue.js · JavaScript</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200/80">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                    Backend & Database
                  </span>
                  <span className="font-semibold text-slate-900">PHP 8 · MySQL Relational DB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200/80">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-blue-600" />
                    Primary Specialty
                  </span>
                  <span className="font-semibold text-blue-700">School ERP & Grade Engines</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip Placed Below the Hero Split */}
        <div className="pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums">4+</div>
              <div className="text-xs font-semibold text-slate-900 mt-1">School System Modules</div>
              <p className="text-xs text-slate-500 mt-0.5">Enrollment, Grading, Attendance & Fees</p>
            </div>

            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums">100%</div>
              <div className="text-xs font-semibold text-slate-900 mt-1">Normalized Relational DB</div>
              <p className="text-xs text-slate-500 mt-0.5">Structured MySQL 3NF Schemas</p>
            </div>

            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums">5+</div>
              <div className="text-xs font-semibold text-slate-900 mt-1">Core Technologies</div>
              <p className="text-xs text-slate-500 mt-0.5">React, Vue, JS, PHP, and MySQL</p>
            </div>

            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums">&lt;60s</div>
              <div className="text-xs font-semibold text-slate-900 mt-1">Class Roll Call & Reports</div>
              <p className="text-xs text-slate-500 mt-0.5">Optimized for fast daily workflows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
