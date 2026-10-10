import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import { ArrowUpRight, Database, School, Laptop, Plus, Edit, Trash2, Calendar, Layers, CheckCircle2, Clock } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onLaunchDemo?: () => void;
  isAdminLoggedIn?: boolean;
  onAddNewProject?: () => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export function Projects({ 
  projects, 
  onSelectProject, 
  onLaunchDemo,
  isAdminLoggedIn = false,
  onAddNewProject,
  onEditProject,
  onDeleteProject
}: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | 'School Systems' | 'Web Apps'>('All');

  // Dynamic calculations for the requested summary card
  const totalProjects = projects.length;
  const schoolSystemsCount = projects.filter(p => p.category === 'school').length;
  const webAppsCount = projects.filter(p => p.category !== 'school').length;
  const productionReadyCount = projects.filter(p => p.status === 'Production Ready').length;
  const schoolPercentage = totalProjects > 0 ? Math.round((schoolSystemsCount / totalProjects) * 100) : 0;
  
  // Format formatted timestamp
  const lastUpdated = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'School Systems') return p.category === 'school';
    if (filter === 'Web Apps') return p.category !== 'school';
    return true;
  });

  return (
    <section id="projects" className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            Engineering Catalog & Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Projects & School Management Systems
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Institutional school systems, continuous grading engines, attendance registers, and web applications built by Ihimbazwe Manzi Norbert.
          </p>
        </div>

        {/* 1. REQUESTED SUMMARY CARD: Key Metrics, Total Count, School vs Other, Last Updated */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-100 gap-3">
            <div>
              <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Engineering Metrics & Index Summary
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Active Codebase & System Distribution
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Last Updated: <strong className="text-slate-900 font-mono">{lastUpdated}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-500 font-medium">Total Projects Created</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                {totalProjects}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                <span>{productionReadyCount} Production Ready</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/80">
              <div className="text-xs text-blue-800 font-medium flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-blue-600" />
                <span>School Systems</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums mt-1">
                {schoolSystemsCount}
              </div>
              <div className="text-xs text-blue-700 mt-1">
                <span>{schoolPercentage}% of Portfolio (Core Focus)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-indigo-600" />
                <span>Web Applications & Other</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                {webAppsCount}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                <span>Learning & Community Tools</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Relational MySQL Models</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums mt-1">
                100%
              </div>
              <div className="text-xs text-slate-500 mt-1">
                <span>3NF Normalized Schemas</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTER BAR: 'All', 'School Systems', 'Web Apps' */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl self-start">
            <button
              onClick={() => setFilter('All')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalProjects})
            </button>
            <button
              onClick={() => setFilter('School Systems')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                filter === 'School Systems' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>School Systems ({schoolSystemsCount})</span>
            </button>
            <button
              onClick={() => setFilter('Web Apps')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                filter === 'Web Apps' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Web Apps ({webAppsCount})</span>
            </button>
          </div>

          {isAdminLoggedIn && onAddNewProject && (
            <button
              onClick={onAddNewProject}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {/* Projects Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0 && filter === 'All';
            return (
              <div
                key={project.id}
                className={`group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Admin Quick Action Floating Buttons */}
                {isAdminLoggedIn && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-lg border border-slate-200 shadow-sm">
                    {onEditProject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(project);
                        }}
                        className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {onDeleteProject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
                            onDeleteProject(project.id);
                          }
                        }}
                        className="p-1.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Clickable Card Body */}
                <div 
                  onClick={() => onSelectProject(project)}
                  className="cursor-pointer flex-1 flex flex-col justify-between"
                >
                  {/* Visual Image container */}
                  <div className={`relative overflow-hidden bg-slate-100 ${isFeatured ? 'aspect-16/9' : 'aspect-4/3'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Clean unboxed category kicker on image bottom */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                        {project.categoryLabel}
                      </div>
                      <div className="text-base font-bold text-white line-clamp-1">
                        {project.title}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Clean unboxed metadata with typographic separators (Zero-Pill compliant) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-blue-700">{project.status}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>MySQL Normalized</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.tagline}
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack unboxed text list */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="text-slate-500 font-mono text-[11px] truncate max-w-[80%]">
                        {project.technologies.slice(0, 4).join(' · ')}
                      </div>

                      <div className="text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
