import React from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Database, Layers, CheckCircle, Calendar, User, School } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchDemo?: () => void;
}

export function ProjectModal({ project, onClose, onLaunchDemo }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold uppercase tracking-wider">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8">
          {/* Main Visual Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Specs Bar (Zero-Pill: clean unboxed metadata with separators) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Engineering Role</span>
              <strong className="text-slate-900 font-semibold">{project.role}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">System Status</span>
              <strong className="text-emerald-700 font-semibold">{project.status}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Primary Database</span>
              <strong className="text-slate-900 font-semibold font-mono">MySQL 8 (3NF)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Frontend Stack</span>
              <strong className="text-slate-900 font-semibold">
                {project.technologies.find(t => t.includes('React') || t.includes('Vue')) || 'JavaScript'}
              </strong>
            </div>
          </div>

          {/* Overview Prose */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-slate-900">Project Overview & Business Value</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {project.fullOverview}
            </p>
          </div>

          {/* Technologies Used (Clean unboxed text list) */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Technology Stack</h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-700">
              {project.technologies.map((tech, i) => (
                <span key={tech} className="flex items-center gap-3">
                  <span className="font-medium text-slate-900">{tech}</span>
                  {i < project.technologies.length - 1 && (
                    <span className="text-slate-300" aria-hidden="true">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Key Functional Modules */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">Key Functional Capabilities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MySQL Database Schema Specification */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>MySQL Relational Database Schema</span>
              </span>
              <span className="text-slate-500 font-mono">InnoDB · UTF8mb4</span>
            </div>

            <div className="divide-y divide-slate-100 bg-white">
              {project.databaseSchema.map((tbl) => (
                <div key={tbl.table} className="p-3.5 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-700">TABLE `{tbl.table}`</span>
                    <span className="text-slate-500">{tbl.description}</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 overflow-x-auto">
                    {tbl.columns.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Developed by Ihimbazwe Manzi Norbert · Available for deployment & customization.
            </div>

            <div className="flex items-center gap-2">
              {project.demoAvailable && onLaunchDemo && (
                <button
                  onClick={() => {
                    onClose();
                    onLaunchDemo();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <School className="w-3.5 h-3.5" />
                  <span>Launch in Live Demo</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
