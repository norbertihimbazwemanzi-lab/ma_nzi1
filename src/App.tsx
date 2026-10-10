/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { FamilySection } from './components/FamilySection';
import { SchoolSystemDemo } from './components/SchoolSystemDemo';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ProjectFormModal } from './components/ProjectFormModal';
import { Project, PROJECTS, DEVELOPER_INFO } from './data/portfolioData';
import { CheckCircle2, Globe } from 'lucide-react';

const DEFAULT_DEV_INFO = {
  name: DEVELOPER_INFO.name,
  shortName: DEVELOPER_INFO.shortName,
  title: DEVELOPER_INFO.title,
  bio: DEVELOPER_INFO.bio,
  location: DEVELOPER_INFO.location,
  email: DEVELOPER_INFO.email,
  phone: DEVELOPER_INFO.phone,
  avatarUrl: '/src/assets/images/developer_portrait_1791620332954.jpg',
  socialLinks: DEVELOPER_INFO.socialLinks,
  familyInfo: DEVELOPER_INFO.familyInfo,
};

export default function App() {
  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('manzi_admin_logged_in') === 'true';
  });

  // Universal Sync Status Toast
  const [universalSyncNotice, setUniversalSyncNotice] = useState<string | null>(null);

  // Developer info & projects state
  const [developerInfo, setDeveloperInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('manzi_developer_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_DEV_INFO,
          ...parsed,
          socialLinks: parsed.socialLinks || DEFAULT_DEV_INFO.socialLinks,
          familyInfo: parsed.familyInfo || DEFAULT_DEV_INFO.familyInfo,
        };
      }
      return DEFAULT_DEV_INFO;
    } catch {
      return DEFAULT_DEV_INFO;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('manzi_projects');
      return saved ? JSON.parse(saved) : PROJECTS;
    } catch {
      return PROJECTS;
    }
  });

  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminDashboardModalOpen, setIsAdminDashboardModalOpen] = useState(false);
  const [isProjectFormModalOpen, setIsProjectFormModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // Sync to local cache
  useEffect(() => {
    localStorage.setItem('manzi_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // 1. UNIVERSAL LOAD: Fetch live universal portfolio data on page mount
  useEffect(() => {
    let isMounted = true;
    async function loadUniversalData() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (!isMounted) return;

          if (data.developerInfo) {
            setDeveloperInfo((prev: any) => {
              const merged = {
                ...prev,
                ...data.developerInfo,
                socialLinks: data.developerInfo.socialLinks || prev.socialLinks,
                familyInfo: data.developerInfo.familyInfo || prev.familyInfo,
              };
              localStorage.setItem('manzi_developer_info', JSON.stringify(merged));
              return merged;
            });
          }

          if (Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects);
            localStorage.setItem('manzi_projects', JSON.stringify(data.projects));
          }
        }
      } catch (err) {
        console.warn('Initial server sync using local cached fallback:', err);
      }
    }

    loadUniversalData();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. UNIVERSAL SAVE: Save to server disk permanently for all users worldwide
  const saveUniversallyToServer = useCallback(async (
    targetDevInfo: any,
    targetProjects: Project[],
    actionLabel = 'Changes'
  ) => {
    // Keep local cache updated immediately
    localStorage.setItem('manzi_developer_info', JSON.stringify(targetDevInfo));
    localStorage.setItem('manzi_projects', JSON.stringify(targetProjects));

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          developerInfo: targetDevInfo,
          projects: targetProjects,
        }),
      });

      if (res.ok) {
        setUniversalSyncNotice(`${actionLabel} saved permanently on server for everyone!`);
      } else {
        setUniversalSyncNotice(`${actionLabel} saved locally.`);
      }
    } catch {
      setUniversalSyncNotice(`${actionLabel} saved locally (offline mode).`);
    }

    setTimeout(() => {
      setUniversalSyncNotice(null);
    }, 4000);
  }, []);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminDashboardModalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminDashboardModalOpen(false);
  };

  const handleUpdateDeveloperInfo = (updated: any) => {
    setDeveloperInfo(updated);
    saveUniversallyToServer(updated, projects, 'Profile & details');
  };

  const handleOpenAddProject = () => {
    setProjectToEdit(null);
    setIsProjectFormModalOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setProjectToEdit(proj);
    setIsProjectFormModalOpen(true);
  };

  const handleSaveProject = (savedProj: Project) => {
    setProjects(prev => {
      const existsIndex = prev.findIndex(p => p.id === savedProj.id);
      let next: Project[];
      if (existsIndex >= 0) {
        next = [...prev];
        next[existsIndex] = savedProj;
      } else {
        next = [savedProj, ...prev];
      }
      saveUniversallyToServer(developerInfo, next, `Project "${savedProj.title}"`);
      return next;
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const projToDelete = projects.find(p => p.id === projectId);
    const title = projToDelete ? projToDelete.title : 'Project';
    setProjects(prev => {
      const next = prev.filter(p => p.id !== projectId);
      saveUniversallyToServer(developerInfo, next, `Deleted "${title}"`);
      return next;
    });
  };

  const handleResetAllData = async () => {
    setDeveloperInfo(DEFAULT_DEV_INFO);
    setProjects(PROJECTS);
    localStorage.removeItem('manzi_developer_info');
    localStorage.removeItem('manzi_projects');

    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          developerInfo: DEFAULT_DEV_INFO,
          projects: PROJECTS,
        }),
      });
      setUniversalSyncNotice('Portfolio reset to default template on server for all users.');
    } catch {
      setUniversalSyncNotice('Portfolio reset locally.');
    }

    setTimeout(() => setUniversalSyncNotice(null), 3500);
  };

  const handleScrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative">
      {/* Universal Persistence Notification Toast */}
      {universalSyncNotice && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium text-slate-100">{universalSyncNotice}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        </div>
      )}

      {/* Top Bar Navigation (Clean 3-Zone Contract: About, Skills, Projects, Family & Friends, Contact) */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardModalOpen(true)}
        onLogoutAdmin={handleAdminLogout}
      />

      <main className="flex-1">
        {/* Split-Screen Hero with editable profile, photo, and social media channels */}
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)}
          developerInfo={developerInfo}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminDashboard={() => setIsAdminDashboardModalOpen(true)}
        />

        {/* About Norbert & School Systems Architecture */}
        <About />

        {/* Technical Skill Matrix */}
        <Skills />

        {/* Projects & School Systems Section with summary metrics card and category filter */}
        <Projects 
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onLaunchDemo={handleScrollToDemo}
          isAdminLoggedIn={isAdminLoggedIn}
          onAddNewProject={handleOpenAddProject}
          onEditProject={handleOpenEditProject}
          onDeleteProject={handleDeleteProject}
        />

        {/* Interactive Live School Management Suite Simulation */}
        <section id="demo" className="py-16 bg-slate-100/60 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
                Live Prototype Laboratory
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Test the School Management System Live
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Experience Norbert's school logic in action: compute Rwandan curriculum marks, test roll-call registers, and simulate fee installment receipts.
              </p>
            </div>

            <SchoolSystemDemo />
          </div>
        </section>

        {/* Family & Roots in Runda (Photos, Story & Contacts, Friends) */}
        <FamilySection 
          familyInfo={developerInfo.familyInfo}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminDashboard={() => setIsAdminDashboardModalOpen(true)}
        />

        {/* Direct Contact & Collaboration Form with Social Media */}
        <Contact />
      </main>

      {/* Quiet Corporate Footer with Social Links */}
      <Footer 
        onOpenResume={() => setIsResumeOpen(true)}
        socialLinks={developerInfo.socialLinks}
      />

      {/* MODALS */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onLaunchDemo={handleScrollToDemo}
        />
      )}

      {isResumeOpen && (
        <ResumeModal
          onClose={() => setIsResumeOpen(false)}
        />
      )}

      {/* Admin Login Modal (Clean, secure authentication form) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Dashboard Modal (Profile, Photo, Family, Friends, Projects, Backups) */}
      <AdminDashboardModal
        isOpen={isAdminDashboardModalOpen}
        onClose={() => setIsAdminDashboardModalOpen(false)}
        developerInfo={developerInfo}
        onUpdateDeveloperInfo={handleUpdateDeveloperInfo}
        projects={projects}
        onAddNewProject={handleOpenAddProject}
        onEditProject={handleOpenEditProject}
        onDeleteProject={handleDeleteProject}
        onResetAllData={handleResetAllData}
        onLogout={handleAdminLogout}
      />

      {/* Add / Edit Project Modal */}
      <ProjectFormModal
        isOpen={isProjectFormModalOpen}
        projectToEdit={projectToEdit}
        onClose={() => setIsProjectFormModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
}
