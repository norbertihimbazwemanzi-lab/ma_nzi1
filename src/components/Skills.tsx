import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Database, School, Wrench, CheckCircle } from 'lucide-react';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const icons = [
    <Code2 className="w-4 h-4 text-blue-600" key="frontend" />,
    <Database className="w-4 h-4 text-indigo-600" key="backend" />,
    <School className="w-4 h-4 text-emerald-600" key="school" />,
    <Wrench className="w-4 h-4 text-slate-600" key="tools" />,
  ];

  const current = SKILL_CATEGORIES[selectedCategory];

  return (
    <section id="skills" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            Technical Competencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Full-Stack Skill Matrix & Academic Systems Domain
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Expertise built through hands-on development in Runda, specializing in React.js, Vue.js, PHP, and normalized MySQL schemas.
          </p>
        </div>

        {/* Category Navigation (Interactive Buttons - permitted by Zero-Pill Discipline) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl mb-8 max-w-fit">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                selectedCategory === idx
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {icons[idx]}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Content */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {icons[selectedCategory]}
              <span>{current.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {current.description}
            </p>
          </div>

          {/* Clean Unboxed Skill List (No Pills) */}
          <div className="divide-y divide-slate-200">
            {current.skills.map((skill) => (
              <div key={skill.name} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="md:w-1/3">
                  <div className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{skill.name}</span>
                  </div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="text-xs text-slate-500 mt-0.5 ml-5.5 flex items-center gap-2">
                    <span className="font-medium text-blue-700">{skill.level}</span>
                    <span aria-hidden="true">·</span>
                    <span>{skill.years}</span>
                  </div>
                </div>

                <div className="md:w-2/3 ml-5.5 md:ml-0">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {skill.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs font-semibold text-blue-700 uppercase">Frontend Architecture</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Component-Driven SPAs</div>
            <p className="text-xs text-slate-500 mt-1">
              Reactive state handling in React and Vue for live calculation of academic scores with zero page reload latency.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs font-semibold text-indigo-700 uppercase">Backend & Logic</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Secure PHP REST Endpoints</div>
            <p className="text-xs text-slate-500 mt-1">
              Session management, cryptographic password hashing, role-based authorization gates, and automated PDF builders.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs font-semibold text-emerald-700 uppercase">Database Architecture</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Relational Integrity in MySQL</div>
            <p className="text-xs text-slate-500 mt-1">
              Third normal form schemas with cascading foreign keys to prevent orphan attendance marks and balance discrepancies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
