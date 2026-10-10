import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Code2, Database, School } from 'lucide-react';
import { DEVELOPER_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  onClose: () => void;
}

export function ResumeModal({ onClose }: ResumeModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Sticky Actions Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Curriculum Vitae / Professional Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-10 space-y-8 text-slate-800">
          {/* Header Lockup */}
          <div className="border-b border-slate-300 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {DEVELOPER_INFO.name}
            </h1>
            <div className="text-base font-semibold text-blue-700 mt-1">
              Full-Stack Developer · School Systems Specialist
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Runda, Rwanda</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <a href={`mailto:${DEVELOPER_INFO.email}`} className="font-mono text-slate-900">
                  {DEVELOPER_INFO.email}
                </a>
              </span>
              <span aria-hidden="true">·</span>
              <span>Available for Onsite & Remote Roles</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Full-stack developer from Runda with hands-on expertise building enterprise School Management Systems (SMS) and modern responsive web applications. Specialized in end-to-end institutional workflows: automated continuous assessment & term report card calculation, daily student attendance roll-call registers, bursar tuition payment reconciliation, and role-based access control. Experienced across the full modern web stack using React.js, Vue.js, JavaScript, PHP 8, and normalized MySQL relational databases.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Technical Skill Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <strong className="text-slate-900 block font-semibold">Frontend Engineering:</strong>
                <p className="text-slate-600">React.js, Vue.js, JavaScript (ES6+), HTML5, Tailwind CSS, CSS3, Vite</p>
              </div>
              <div className="space-y-1">
                <strong className="text-slate-900 block font-semibold">Backend & Databases:</strong>
                <p className="text-slate-600">PHP 8 (OOP, MVC), MySQL (3NF Relational Schemas, Transactions, Joins), REST APIs</p>
              </div>
              <div className="space-y-1">
                <strong className="text-slate-900 block font-semibold">School System Domain:</strong>
                <p className="text-slate-600">Grading Algorithms, Term Transcripts, Daily Roll-Call Registers, Bursar Invoicing, Guardian SMS</p>
              </div>
              <div className="space-y-1">
                <strong className="text-slate-900 block font-semibold">Tools & Deployment:</strong>
                <p className="text-slate-600">Git/GitHub, Apache/XAMPP, Windows Terminal, VS Code, Postman</p>
              </div>
            </div>
          </div>

          {/* Key Projects & Systems Built */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
              Key School Systems & Engineering Projects
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>EduRunda Enterprise School Management System (SMS)</span>
                  <span className="text-slate-500 font-normal">2025 - 2026</span>
                </div>
                <div className="text-blue-700 font-medium">Lead Full-Stack Developer · PHP, MySQL, React.js, Tailwind CSS</div>
                <p className="text-slate-600 mt-1">
                  Engineered an all-in-one institutional ERP managing student biographical profiles, class rosters, timetable scheduling, and emergency contacts. Replaced manual paperwork across administrative departments with 100% relational integrity.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>Academix Automated Grading & Report Card Engine</span>
                  <span className="text-slate-500 font-normal">2025</span>
                </div>
                <div className="text-blue-700 font-medium">Full-Stack Architect · React.js, PHP, MySQL, FPDF</div>
                <p className="text-slate-600 mt-1">
                  Developed automated score calculation for continuous assessments (40%) and term exams (60%). Generates Rwandan curriculum grades, rank distributions, and batch print-ready PDF report cards in seconds.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>AttendTrack Pro - Daily Attendance Register & SMS Gateway</span>
                  <span className="text-slate-500 font-normal">2025</span>
                </div>
                <div className="text-blue-700 font-medium">Full-Stack Developer · PHP, MySQL, JavaScript, SMS Gateway</div>
                <p className="text-slate-600 mt-1">
                  Built a touch-friendly morning roll call portal allowing teachers to mark classroom presence in under 60 seconds with instant automated parent SMS notifications for absent students.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>SchoolFee Bursary & Tuition Reconciliation System</span>
                  <span className="text-slate-500 font-normal">2025 - 2026</span>
                </div>
                <div className="text-blue-700 font-medium">Backend & Database Engineer · PHP 8, MySQL Relational DB</div>
                <p className="text-slate-600 mt-1">
                  Implemented multi-installment fee tracking with real-time balance calculations, audit logs, and verified printable receipts.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Education & Academic Background
            </h2>
            <div className="text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-900">
                <span>Studies in Runda, Rwanda</span>
                <span className="text-slate-500 font-normal">Software Development & Computer Information Systems</span>
              </div>
              <p className="text-slate-600 mt-1">
                Comprehensive training in software engineering, object-oriented systems, relational database architecture, algorithms, and practical web application delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
