import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { WebsiteLogo } from './WebsiteLogo';

interface FooterProps {
  onOpenResume: () => void;
  socialLinks?: {
    github: string;
    linkedin: string;
    whatsapp: string;
    twitter: string;
  };
}

export function Footer({ onOpenResume, socialLinks = DEVELOPER_INFO.socialLinks }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <WebsiteLogo size="md" showSubtitle={false} />
            <p className="mt-2 text-slate-500 max-w-md">
              Full-stack developer from Runda, Rwanda specializing in school management systems, React.js, Vue.js, PHP, and MySQL.
            </p>
          </div>

          {/* Social Links & Nav */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-3 text-slate-500">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors p-1"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors p-1"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 transition-colors p-1"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-600">
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
              <a href="#family" className="hover:text-blue-600 transition-colors">Family & Roots</a>
              <button onClick={onOpenResume} className="hover:text-blue-600 transition-colors">
                Curriculum Vitae
              </button>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Ihimbazwe Manzi Norbert. All rights reserved. Runda, Rwanda.
          </div>
          <div>
            Built with React.js, Vite & Tailwind CSS. Designed in White & Blue Corporate Style.
          </div>
        </div>
      </div>
    </footer>
  );
}
