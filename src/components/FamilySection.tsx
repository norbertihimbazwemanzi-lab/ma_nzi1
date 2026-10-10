import React, { useState } from 'react';
import { Heart, Users, MapPin, Phone, ShieldCheck, Edit, Plus, Trash2, Camera, Upload, UserPlus, Sparkles } from 'lucide-react';

export interface FamilyImage {
  url: string;
  caption: string;
  tag: string;
}

export interface FamilyContact {
  label: string;
  name: string;
  phone: string;
  location: string;
  role: string;
}

export interface FriendEntry {
  id: string;
  name: string;
  role: string;
  phone: string;
  location: string;
  image?: string;
  note: string;
}

interface FamilySectionProps {
  familyInfo: {
    title: string;
    subtitle: string;
    images: FamilyImage[];
    contacts: FamilyContact[];
    friends?: FriendEntry[];
  };
  isAdminLoggedIn?: boolean;
  onOpenAdminDashboard?: () => void;
  onAddNewFriend?: () => void;
}

export function FamilySection({ 
  familyInfo, 
  isAdminLoggedIn = false, 
  onOpenAdminDashboard,
  onAddNewFriend
}: FamilySectionProps) {
  const [activeTab, setActiveTab] = useState<'family' | 'friends'>('family');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const friendsList = familyInfo.friends || [];

  return (
    <section id="family" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Heritage, Support & Community</span>
              <span aria-hidden="true">·</span>
              <span>Runda, Rwanda</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Family & Friends from Runda
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              The people who shape my journey: my family's heritage and the close friends and fellow developers I studied with in Runda.
            </p>
          </div>

          {/* Section View Tabs (Family vs Friends) + Admin Action */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setActiveTab('family')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'family'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Family & Roots</span>
              </button>
              <button
                onClick={() => setActiveTab('friends')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'friends'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Friends & Peers ({friendsList.length})</span>
              </button>
            </div>

            {isAdminLoggedIn && onOpenAdminDashboard && (
              <button
                onClick={onOpenAdminDashboard}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Edit className="w-3.5 h-3.5 text-blue-600" />
                <span>Manage Family & Friends</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: FAMILY VIEW */}
        {activeTab === 'family' && (
          <div className="space-y-12">
            {/* Family Images Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Main Visual Photo Highlight */}
              <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="relative aspect-16/10 sm:aspect-16/9 bg-slate-200">
                  <img
                    src={familyInfo.images[activeImageIndex]?.url || familyInfo.images[0]?.url}
                    alt="Norbert's Family in Rwanda"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white max-w-xl">
                      <div className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-1">
                        {familyInfo.images[activeImageIndex]?.tag || "Family Moments"}
                      </div>
                      <p className="text-sm sm:text-base font-medium text-white/95 leading-snug">
                        "{familyInfo.images[activeImageIndex]?.caption}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnail switcher */}
                {familyInfo.images.length > 1 && (
                  <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 overflow-x-auto">
                    {familyInfo.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIndex === idx ? 'border-blue-600 scale-102 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Side Narrative & Philosophy */}
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>My Roots & Inspiration</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Everything I build stems from the strong work ethic instilled by my family in Runda. In our community, education is considered the greatest gift. Watching the dedication of parents and local teachers inspired me to devote my programming skills to making school management efficient, transparent, and error-free.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
                    <span>Location: Runda, Kamonyi District</span>
                    <span aria-hidden="true"> · </span>
                    <span>Southern Province, Rwanda</span>
                  </div>
                </div>

                <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200">
                  <div className="text-xs font-bold text-blue-900 mb-1">Guiding Principle</div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    "Ubumwe, Umurava no Gukorera hamwe" (Unity, diligence, and collaboration). Every school database and application is built with the utmost respect for truth, transparency, and service.
                  </p>
                </div>
              </div>
            </div>

            {/* Family Contacts & References Strip */}
            <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50/40">
              <div className="max-w-2xl mb-6">
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Family & Emergency Contacts
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Trusted Family Contacts & Home Reference
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Provided for school institutional contracts, official agreements, and emergency contact verification in Runda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {familyInfo.contacts.map((contact, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-700 uppercase">{contact.label}</span>
                      <span className="text-[11px] text-slate-400 font-medium">{contact.role}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{contact.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{contact.location}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600 font-semibold">
                          {contact.phone}
                        </a>
                      </div>
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FRIENDS VIEW */}
        {activeTab === 'friends' && (
          <div className="space-y-8">
            {/* Friends Cohort Hero Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 aspect-16/10 sm:aspect-16/9 bg-slate-200 overflow-hidden">
                <img
                  src="/src/assets/images/friends_cohort_runda_1791623326018.jpg"
                  alt="Runda Software Engineering Cohort and Friends"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Camaraderie & Coding in Runda</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Friends, Classmates & Collaborative Peers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Coding is stronger together. These are my close friends, fellow software engineering students, and collaborators who share the journey of building digital solutions in Rwanda.
                </p>

                {isAdminLoggedIn && onOpenAdminDashboard && (
                  <button
                    onClick={onOpenAdminDashboard}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Friend / Peer</span>
                  </button>
                )}
              </div>
            </div>

            {/* Friends Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {friendsList.map((friend) => (
                <div key={friend.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={friend.image || "/src/assets/images/developer_portrait_1791620332954.jpg"}
                          alt={friend.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{friend.name}</h4>
                        <div className="text-xs text-blue-700 font-medium">{friend.role}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      "{friend.note}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{friend.location}</span>
                    </div>
                    {friend.phone && (
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <a href={`tel:${friend.phone}`} className="hover:text-blue-600 font-semibold text-slate-700">
                          {friend.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
