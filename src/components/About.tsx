import React from 'react';
import { School, Layers, ShieldCheck, GraduationCap, Server, Database, Code, Cpu } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';

export function About() {
  return (
    <section id="about" className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            Background & Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Full-Stack Software Engineering Rooted in Practical Education Systems
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            I am Ihimbazwe Manzi Norbert, a full-stack developer who studied in Runda, Rwanda. I bridge the gap between complex administrative school operations and fast, intuitive web software.
          </p>
        </div>

        {/* Narrative & Core Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7 space-y-5 text-sm text-slate-600 leading-relaxed">
            <p>
              Growing up and studying in <strong className="text-slate-900">Runda</strong>, I witnessed first-hand the daily operational friction faced by primary and secondary schools. Teachers spend days manually calculating student percentages, writing repetitive report cards by hand, and hunting through paper registers. Bursars deal with disputed fee payments, and headteachers lack an instant snapshot of attendance and performance.
            </p>
            <p>
              This motivated me to specialize in <strong className="text-slate-900">School Management Systems (SMS)</strong>. By combining modern frontends with robust backend architectures, I create systems that automate continuous assessments, generate beautiful official transcripts in one click, and track student attendance with automated guardian alerts.
            </p>
            <p>
              My stack is centered on proven, production-tested technologies: <strong className="text-slate-900">React.js</strong> and <strong className="text-slate-900">Vue.js</strong> for snappy user interfaces, and <strong className="text-slate-900">PHP</strong> with <strong className="text-slate-900">MySQL</strong> for solid, relational data integrity that can run either on local campus servers (via XAMPP / Apache) or cloud hosting.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Education & Practical Training</span>
            </h3>

            <div className="border-l-2 border-blue-600 pl-4 py-1">
              <div className="font-semibold text-slate-900 text-sm">Studies in Runda, Rwanda</div>
              <div className="text-xs text-blue-700 font-medium">Software Engineering & Computer Information Systems</div>
              <p className="text-xs text-slate-500 mt-1">
                Rigorous training in Object-Oriented Programming, Relational Database Normalization, Data Structures, and Web Technologies.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-xs font-semibold text-slate-800">Key Engineering Commitments:</div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span><strong>Zero Data Loss:</strong> ACID-compliant MySQL transactions for financial tuition records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span><strong>Accessible for Non-Tech Staff:</strong> Clean, uncluttered UI requiring minimal teacher training.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span><strong>Offline/Local & Cloud Ready:</strong> Deployable on school LANs or public web servers.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3-Tier Architecture Blueprint for School Systems */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              Engineering Architecture
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              How Norbert Builds Enterprise School Systems
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              A decoupled 3-tier system architecture engineered for reliability, security, and effortless scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <Code className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-blue-700 uppercase">Tier 1 · Client Presentation</div>
                <h4 className="font-bold text-slate-900 text-base mt-1">React.js & Vue.js SPA</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Interactive single-page apps with instant grade computation, keyboard-optimized roll-call inputs, and print CSS stylesheets for clean physical report cards.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                React · Vue · Vite · Tailwind
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                  <Server className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-indigo-700 uppercase">Tier 2 · Application Logic</div>
                <h4 className="font-bold text-slate-900 text-base mt-1">PHP 8 RESTful Endpoints</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Controller actions handling student authentication, weighted grade formulas, parent SMS webhook dispatches, and PDF document rendering.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                PHP 8 OOP · MVC · REST API · FPDF
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-sky-700 uppercase">Tier 3 · Relational Store</div>
                <h4 className="font-bold text-slate-900 text-base mt-1">Normalized MySQL DB</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Strict 3NF relational schemas with foreign key integrity. Optimized indexes on student registration codes, term IDs, and fee balance ledgers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                MySQL · InnoDB · 3NF · Transactions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
