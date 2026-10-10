import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolOrOrg, setSchoolOrOrg] = useState('');
  const [projectType, setProjectType] = useState('School Management System (SMS)');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          schoolOrOrg: schoolOrOrg.trim(),
          projectType,
          message: message.trim(),
        }),
      });
    } catch (err) {
      console.warn('Could not post inquiry to database endpoint:', err);
    }

    setTimeout(() => {
      setStatus('success');
      // Construct mailto link as direct fallback
      const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${name} (${schoolOrOrg || 'Individual'})`);
      const body = encodeURIComponent(`Hello Norbert,\n\nMy name is ${name} from ${schoolOrOrg || 'N/A'}.\n\nProject interest: ${projectType}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${DEVELOPER_INFO.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            Inquiries & Collaboration
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact Ihimbazwe Manzi Norbert
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Available for school management software development, full-stack web engineering, and technical consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="font-bold text-slate-900 text-base">Direct Channels</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Direct Email</span>
                    <a href={`mailto:${DEVELOPER_INFO.email}`} className="font-semibold text-slate-900 hover:text-blue-600 font-mono">
                      {DEVELOPER_INFO.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="mt-1 flex items-center gap-1 text-[11px] text-blue-700 hover:text-blue-900 font-medium"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy email address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Primary Location</span>
                    <strong className="text-slate-900 font-semibold">Runda, Kamonyi / Kigali, Rwanda</strong>
                    <p className="text-slate-500 mt-0.5">Available for onsite school consultations & remote engagements</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links in Contact Card */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">Connect on Social Media</span>
                  <span className="text-[11px] text-blue-700 font-medium">Direct Inquiries</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <a
                    href={DEVELOPER_INFO.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="block font-semibold group-hover:text-blue-600 transition-colors">GitHub</span>
                      <span className="text-[11px] text-slate-500 font-mono">@manzi-norbert</span>
                    </div>
                    <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                  </a>

                  <a
                    href={DEVELOPER_INFO.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-blue-900 font-medium flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="block font-semibold group-hover:text-blue-700 transition-colors">LinkedIn</span>
                      <span className="text-[11px] text-blue-600">Norbert Manzi</span>
                    </div>
                    <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                  </a>

                  <a
                    href={DEVELOPER_INFO.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-900 font-medium flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="block font-semibold group-hover:text-emerald-700 transition-colors">WhatsApp</span>
                      <span className="text-[11px] text-emerald-600 font-mono">Direct Chat</span>
                    </div>
                    <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                  </a>

                  <a
                    href={DEVELOPER_INFO.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="block font-semibold group-hover:text-blue-600 transition-colors">X / Twitter</span>
                      <span className="text-[11px] text-slate-500 font-mono">@manzi_norbert</span>
                    </div>
                    <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Family Contact Reference in Contact Card */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-semibold text-slate-800 block mb-1">Family & Home Reference:</span>
                <p className="text-[11px] text-slate-500">
                  Family Estate in Runda Sector, Kamonyi. See the <a href="#family" className="text-blue-600 hover:underline font-semibold">Family & Roots section</a> for trusted contacts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            {status === 'success' ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Ready & Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your email client has been prepared with your inquiry. Norbert will review your requirements and respond shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base mb-1">Send a Direct Inquiry</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Fill in details about your school, project scope, or opportunity to get in touch with Norbert.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jean Claude Mugabo"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. director@school.rw"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">School / Organization Name</label>
                    <input
                      type="text"
                      value={schoolOrOrg}
                      onChange={(e) => setSchoolOrOrg(e.target.value)}
                      placeholder="e.g. GS Runda or Company"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Project Category</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="School Management System (SMS)">School Management System (SMS)</option>
                      <option value="Grading & Automated Report Cards">Grading & Automated Report Cards</option>
                      <option value="Student Attendance Register">Student Attendance Register</option>
                      <option value="Custom Web Application (React / Vue / PHP)">Custom Web Application (React / Vue / PHP)</option>
                      <option value="Full-Time Developer Hiring Opportunity">Full-Time Developer Hiring Opportunity</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Message & Project Scope *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your current school processes, specific features needed, or timeline..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === 'sending' ? 'Preparing Email...' : 'Send Inquiry to Norbert'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
