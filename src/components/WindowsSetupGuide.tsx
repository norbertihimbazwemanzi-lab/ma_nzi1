import React, { useState } from 'react';
import { WINDOWS_SETUP_STEPS } from '../data/portfolioData';
import { Terminal, Copy, Check, ExternalLink, AlertCircle, Laptop, FolderGit2, X } from 'lucide-react';

interface WindowsSetupGuideProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function WindowsSetupGuide({ isModal = false, onClose }: WindowsSetupGuideProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const content = (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>Windows 10 / Windows 11 Official Run Guide</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            How to Run Norbert's Portfolio & School System Locally on Windows
          </h3>
          <p className="text-xs text-slate-600">
            Follow these 6 steps to run the React + Vite frontend and optional PHP/MySQL backend on your PC.
          </p>
        </div>

        <a
          href="https://nodejs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Download Node.js LTS</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Step by Step Cards */}
      <div className="space-y-6">
        {WINDOWS_SETUP_STEPS.map((step, idx) => (
          <div key={step.step} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-slate-50/50 space-y-4">
              {/* Bullet Details */}
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                {step.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              {/* Code snippet block */}
              {step.code && (
                <div className="relative rounded-lg bg-slate-900 text-slate-100 p-3.5 font-mono text-xs overflow-x-auto">
                  <pre className="pr-12">{step.code}</pre>
                  <button
                    onClick={() => handleCopy(step.code, idx)}
                    className="absolute right-2.5 top-2.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-sans flex items-center gap-1 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Note callout */}
              {step.note && (
                <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Tip:</strong> {step.note}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Common Windows Troubleshooting Quick Help */}
      <div className="bg-slate-100/80 rounded-xl p-5 border border-slate-200 space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Troubleshooting Common Windows Errors</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">"Script execution is disabled on this system"</strong>
            <p className="text-slate-600 mb-2">Windows PowerShell security policy might block npm scripts initially.</p>
            <div className="p-1.5 bg-slate-900 text-slate-100 rounded font-mono text-[11px]">
              Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">"npm is not recognized as an internal or external command"</strong>
            <p className="text-slate-600">
              Restart PowerShell or reboot your PC after installing Node.js so Windows loads the new PATH environment variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Run on Windows Instructions</h3>
                <div className="text-xs text-slate-500">Step-by-step terminal commands for local execution</div>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="windows-guide" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            Developer Setup & Documentation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Run Norbert's Project on Windows
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Complete instructions to install Node.js, clone the repository, install npm dependencies, and launch Vite locally.
          </p>
        </div>
        {content}
      </div>
    </section>
  );
}
