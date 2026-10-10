import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import { 
  X, 
  User, 
  Briefcase, 
  Upload, 
  Trash2, 
  Edit, 
  Plus, 
  Check, 
  RotateCcw, 
  LogOut, 
  ShieldCheck, 
  Download,
  AlertTriangle,
  Heart,
  Share2,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerInfo: any;
  onUpdateDeveloperInfo: (updated: any) => void;
  projects: Project[];
  onAddNewProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onResetAllData: () => void;
  onLogout: () => void;
}

export function AdminDashboardModal({
  isOpen,
  onClose,
  developerInfo,
  onUpdateDeveloperInfo,
  projects,
  onAddNewProject,
  onEditProject,
  onDeleteProject,
  onResetAllData,
  onLogout,
}: AdminDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'family' | 'projects' | 'data'>('profile');
  
  // Profile form state
  const [name, setName] = useState(developerInfo.name || '');
  const [title, setTitle] = useState(developerInfo.title || '');
  const [bio, setBio] = useState(developerInfo.bio || '');
  const [location, setLocation] = useState(developerInfo.location || '');
  const [email, setEmail] = useState(developerInfo.email || '');
  const [avatarUrl, setAvatarUrl] = useState(developerInfo.avatarUrl || '');

  // Social links state
  const [github, setGithub] = useState(developerInfo.socialLinks?.github || 'https://github.com/manzi-norbert');
  const [linkedin, setLinkedin] = useState(developerInfo.socialLinks?.linkedin || 'https://linkedin.com/in/ihimbazwe-manzi-norbert');
  const [whatsapp, setWhatsapp] = useState(developerInfo.socialLinks?.whatsapp || 'https://wa.me/250780000000');
  const [twitter, setTwitter] = useState(developerInfo.socialLinks?.twitter || 'https://x.com/manzi_norbert');

  // Family & Friends Info state
  const initialFamily = developerInfo.familyInfo || {
    title: "Family & Roots in Runda",
    subtitle: "My support system, inspiration, and heritage in Kamonyi District, Rwanda.",
    images: [],
    contacts: [],
    friends: []
  };
  const [familyTitle, setFamilyTitle] = useState(initialFamily.title);
  const [familySubtitle, setFamilySubtitle] = useState(initialFamily.subtitle);
  const [familyImages, setFamilyImages] = useState<any[]>(initialFamily.images || []);
  const [familyContacts, setFamilyContacts] = useState<any[]>(initialFamily.contacts || []);
  const [familyFriends, setFamilyFriends] = useState<any[]>(initialFamily.friends || []);

  // New friend subform state
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendRole, setNewFriendRole] = useState('Fellow Software Engineer');
  const [newFriendPhone, setNewFriendPhone] = useState('+250 78');
  const [newFriendLocation, setNewFriendLocation] = useState('Runda / Kigali');
  const [newFriendNote, setNewFriendNote] = useState('Classmate and developer peer from Runda.');
  const [newFriendImage, setNewFriendImage] = useState('/src/assets/images/developer_portrait_1791620332954.jpg');
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  if (!isOpen) return null;

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFamilyPhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const newImg = {
            url: reader.result,
            caption: "Family moment in Rwanda",
            tag: "Family Memory"
          };
          setFamilyImages([newImg, ...familyImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfileAndSocials = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDeveloperInfo({
      ...developerInfo,
      name,
      title,
      bio,
      location,
      email,
      avatarUrl,
      socialLinks: {
        github,
        linkedin,
        whatsapp,
        twitter,
      },
    });
    setSaveSuccessMessage("Saved permanently to server! All visitors worldwide will now see your updated profile & photo.");
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  const handleSaveFamily = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDeveloperInfo({
      ...developerInfo,
      familyInfo: {
        title: familyTitle,
        subtitle: familySubtitle,
        images: familyImages,
        contacts: familyContacts,
        friends: familyFriends,
      }
    });
    setSaveSuccessMessage("Saved permanently to server! Family photos, friends, and contacts are updated for everyone.");
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  const handleExportJson = () => {
    const data = {
      developerInfo: {
        name,
        title,
        bio,
        location,
        email,
        avatarUrl,
        socialLinks: { github, linkedin, whatsapp, twitter },
        familyInfo: { title: familyTitle, subtitle: familySubtitle, images: familyImages, contacts: familyContacts, friends: familyFriends },
      },
      projects,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `norbert_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900 text-lg">Admin Control Center</h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Logged In
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-600" />
                  <span>Permanent Server Storage Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">Every change you save is instantly stored on the server for all visitors.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 bg-slate-50/60 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile, Photo & Socials</span>
          </button>

          <button
            onClick={() => setActiveTab('family')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'family'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Family & Roots in Runda</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'data'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {saveSuccessMessage && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* TAB 1: PROFILE, PHOTO & SOCIALS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfileAndSocials} className="space-y-6">
              {/* Photo Upload Section */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                  Developer Profile Photo
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-md shrink-0">
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo from PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setAvatarUrl('/src/assets/images/developer_portrait_1791620332954.jpg')}
                        className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 rounded-lg transition-colors"
                      >
                        Reset to Default Photo
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="Image URL or local path..."
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Runda, Rwanda"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Social Media Links Fields */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Social Media Links
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">WhatsApp Link / Number</label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="https://wa.me/2507..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">X / Twitter Link</label>
                    <input
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="https://x.com/..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bio & Background Description</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Profile & Social Media</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: FAMILY & ROOTS */}
          {activeTab === 'family' && (
            <form onSubmit={handleSaveFamily} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={familyTitle}
                    onChange={(e) => setFamilyTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={familySubtitle}
                    onChange={(e) => setFamilySubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Photos upload list */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Family Photos Gallery
                  </div>
                  <label className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Family Photo from PC</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddFamilyPhotoFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {familyImages.map((img, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <div className="aspect-16/10 rounded overflow-hidden bg-slate-200">
                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={img.caption}
                        onChange={(e) => {
                          const updated = [...familyImages];
                          updated[idx].caption = e.target.value;
                          setFamilyImages(updated);
                        }}
                        placeholder="Photo caption..."
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                      />
                      <div className="flex justify-between items-center text-xs">
                        <input
                          type="text"
                          value={img.tag}
                          onChange={(e) => {
                            const updated = [...familyImages];
                            updated[idx].tag = e.target.value;
                            setFamilyImages(updated);
                          }}
                          placeholder="Tag (e.g. Homestead)"
                          className="w-1/2 px-2 py-1 text-xs border border-slate-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setFamilyImages(familyImages.filter((_, i) => i !== idx))}
                          className="text-rose-600 hover:text-rose-800 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family Contacts in Runda */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Verified Family & Emergency Contacts
                </div>

                {familyContacts.map((c, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-500 mb-1">Contact Label</label>
                      <input
                        type="text"
                        value={c.label}
                        onChange={(e) => {
                          const updated = [...familyContacts];
                          updated[idx].label = e.target.value;
                          setFamilyContacts(updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => {
                          const updated = [...familyContacts];
                          updated[idx].name = e.target.value;
                          setFamilyContacts(updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={c.phone}
                        onChange={(e) => {
                          const updated = [...familyContacts];
                          updated[idx].phone = e.target.value;
                          setFamilyContacts(updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-500 mb-1">Residence Location</label>
                      <input
                        type="text"
                        value={c.location}
                        onChange={(e) => {
                          const updated = [...familyContacts];
                          updated[idx].location = e.target.value;
                          setFamilyContacts(updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Role / Relationship</label>
                      <input
                        type="text"
                        value={c.role}
                        onChange={(e) => {
                          const updated = [...familyContacts];
                          updated[idx].role = e.target.value;
                          setFamilyContacts(updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Friends & Peers from Runda Management */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Close Friends & Runda Peers ({familyFriends.length})
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Add fellow developers, classmates, and friends from Runda to your community showcase.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddFriendForm(!showAddFriendForm)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddFriendForm ? 'Close Form' : 'Add New Friend'}</span>
                  </button>
                </div>

                {/* Add Friend Subform */}
                {showAddFriendForm && (
                  <div className="p-4 bg-white rounded-xl border border-blue-200 space-y-3">
                    <h5 className="font-bold text-xs text-slate-900">New Friend Details</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">Friend's Full Name *</label>
                        <input
                          type="text"
                          value={newFriendName}
                          onChange={(e) => setNewFriendName(e.target.value)}
                          placeholder="e.g. Christian Mugabo"
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">Role / Title *</label>
                        <input
                          type="text"
                          value={newFriendRole}
                          onChange={(e) => setNewFriendRole(e.target.value)}
                          placeholder="e.g. Full-Stack Developer & Peer"
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">Phone / WhatsApp</label>
                        <input
                          type="text"
                          value={newFriendPhone}
                          onChange={(e) => setNewFriendPhone(e.target.value)}
                          placeholder="+250 78..."
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">Location</label>
                        <input
                          type="text"
                          value={newFriendLocation}
                          onChange={(e) => setNewFriendLocation(e.target.value)}
                          placeholder="Runda / Kigali"
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-600 mb-1 font-medium">Friendship Note / Shared Projects</label>
                        <input
                          type="text"
                          value={newFriendNote}
                          onChange={(e) => setNewFriendNote(e.target.value)}
                          placeholder="Classmate and longtime friend sharing web programming sessions..."
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newFriendName.trim()) return;
                          const newFriend = {
                            id: `friend-${Date.now()}`,
                            name: newFriendName.trim(),
                            role: newFriendRole.trim(),
                            phone: newFriendPhone.trim(),
                            location: newFriendLocation.trim(),
                            note: newFriendNote.trim(),
                            image: newFriendImage || '/src/assets/images/developer_portrait_1791620332954.jpg',
                          };
                          setFamilyFriends([...familyFriends, newFriend]);
                          setNewFriendName('');
                          setShowAddFriendForm(false);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Add Friend to Section</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Friends List */}
                <div className="divide-y divide-slate-200 bg-white rounded-xl border border-slate-200 overflow-hidden">
                  {familyFriends.map((friend) => (
                    <div key={friend.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{friend.name}</div>
                        <div className="text-blue-700 font-medium">{friend.role} · {friend.location}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{friend.note}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFamilyFriends(familyFriends.filter((f) => f.id !== friend.id))}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove friend"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Family & Friends Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Portfolio Project Entries</h4>
                  <p className="text-xs text-slate-500">Add new school systems or web applications, edit details, or remove projects.</p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onAddNewProject();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                          <span className="text-[11px] font-mono text-blue-700">({proj.category})</span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">{proj.tagline}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {proj.technologies.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => {
                          onClose();
                          onEditProject(proj);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setProjectToDelete(proj)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors border border-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BACKUP & RESET */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Export Portfolio Backup</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Download a JSON file containing all your customized profile data, family information, photos, and project records.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleExportJson}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>
              </div>

              <div className="p-5 bg-rose-50/50 rounded-xl border border-rose-200 space-y-2">
                <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Reset to Factory Defaults</span>
                </h4>
                <p className="text-xs text-rose-700">
                  This will reset all your custom edits, uploaded photos, and added projects back to the initial default portfolio template.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to restore default template projects and profile? All custom edits will be reset.")) {
                        onResetAllData();
                        onClose();
                      }
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Initial Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {projectToDelete && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-slate-900 text-base">Delete Project?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <strong className="text-slate-900">{projectToDelete.title}</strong>? This action will remove it from your portfolio.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
