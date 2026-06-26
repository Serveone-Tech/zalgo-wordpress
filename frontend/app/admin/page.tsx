'use client';

import { useEffect, useState } from 'react';
import { getContactSubmissions, deleteContactSubmission, getPlanInquiries, deletePlanInquiry } from '@/lib/api';

const ADMIN_PASSWORD = 'zalgo@admin2024';

interface Submission {
  id: number;
  name: string;
  email: string;
  mobile: string;
  website?: string;
  message: string;
  service?: string;
  createdAt: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function Badge({ text }: { text: string }) {
  if (!text) return null;
  return (
    <span className="inline-block px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-500/25 text-teal-400 text-xs font-medium">
      {text}
    </span>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');

  const [activeTab, setActiveTab] = useState<'contacts' | 'plans'>('contacts');

  // Contacts
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Plan Inquiries
  interface PlanInq { id: number; name: string; email: string; phone: string; website?: string; plan: string; createdAt: string; }
  const [planInquiries, setPlanInquiries] = useState<PlanInq[]>([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [selectedPlanInq, setSelectedPlanInq] = useState<PlanInq | null>(null);
  const [deletePlanConfirm, setDeletePlanConfirm] = useState<PlanInq | null>(null);
  const [deletingPlan, setDeletingPlan] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    getContactSubmissions().then((res) => {
      if (res.success && Array.isArray(res.data)) setSubmissions(res.data.reverse());
      else setError('Failed to load submissions.');
      setLoading(false);
    });
    setPlanLoading(true);
    getPlanInquiries().then((res) => {
      if (res.success && Array.isArray(res.data)) setPlanInquiries(res.data);
      setPlanLoading(false);
    });
  }, [authed]);

  const handleDelete = async (s: Submission) => {
    setDeleting(true);
    const res = await deleteContactSubmission(s.id);
    if (res.success) {
      setSubmissions(prev => prev.filter(x => x.id !== s.id));
      setDeleteConfirm(null);
      setSelected(null);
    }
    setDeleting(false);
  };

  const handleDeletePlan = async (p: { id: number; name: string; email: string; phone: string; website?: string; plan: string; createdAt: string }) => {
    setDeletingPlan(true);
    const res = await deletePlanInquiry(p.id);
    if (res.success) {
      setPlanInquiries(prev => prev.filter(x => x.id !== p.id));
      setDeletePlanConfirm(null);
      setSelectedPlanInq(null);
    }
    setDeletingPlan(false);
  };

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.mobile.includes(q) ||
      (s.service || '').toLowerCase().includes(q)
    );
  });

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Zalgo Infotech — Contact Submissions</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPwError(''); }}
                placeholder="Enter admin password"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-teal-500 transition-colors placeholder-gray-500"
              />
            </div>
            {pwError && (
              <p className="text-red-400 text-xs flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {pwError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-white font-extrabold text-lg">Admin Dashboard</h1>
            <p className="text-gray-500 text-xs mt-0.5">Zalgo Infotech</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setAuthed(false); setPassword(''); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
        {/* Tab bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 pb-0">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'contacts' ? 'border-teal-500 text-teal-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Contact Submissions
            <span className="ml-2 px-1.5 py-0.5 rounded bg-gray-800 text-xs">{submissions.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'plans' ? 'border-teal-500 text-teal-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Plan Inquiries
            <span className="ml-2 px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400 text-xs">{planInquiries.length}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {activeTab === 'plans' ? (
        /* ── PLAN INQUIRIES TAB ── */
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Inquiries', value: planInquiries.length, color: 'teal' },
              { label: 'This Month', value: planInquiries.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length, color: 'blue' },
              { label: 'With Website', value: planInquiries.filter(p => p.website).length, color: 'purple' },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border border-gray-800 bg-gray-900/50">
                <div className={`text-2xl font-extrabold mb-0.5 ${stat.color === 'teal' ? 'text-teal-400' : stat.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}>{stat.value}</div>
                <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {planLoading ? (
            <div className="text-center py-20">
              <svg className="w-8 h-8 animate-spin text-teal-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-gray-500 text-sm">Loading plan inquiries...</p>
            </div>
          ) : planInquiries.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-12 h-12 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500">No plan inquiries yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {planInquiries.map((p) => (
                <div key={p.id} onClick={() => setSelectedPlanInq(p)}
                  className="group p-5 rounded-2xl border border-gray-800 bg-gray-900/40 hover:border-teal-500/40 hover:bg-gray-900/70 cursor-pointer transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/30 to-blue-500/30 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-300 font-bold text-sm uppercase">
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1.5">
                        <span className="text-white font-semibold text-sm">{p.name}</span>
                        <span className="inline-block px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-500/25 text-teal-400 text-xs font-bold">{p.plan}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                        <span>{p.email}</span>
                        <span>{p.phone}</span>
                        {p.website && <span className="text-blue-400">{p.website}</span>}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-gray-600 text-xs">{formatDate(p.createdAt)}</span>
                      <button onClick={(e) => { e.stopPropagation(); setDeletePlanConfirm(p); }}
                        className="p-1.5 rounded-lg border border-gray-700 text-gray-600 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (

        /* ── CONTACTS TAB ── */
        <div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: submissions.length, color: 'teal' },
            { label: 'This Month', value: submissions.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length, color: 'blue' },
            { label: 'With Website', value: submissions.filter(s => s.website).length, color: 'purple' },
            { label: 'With Service', value: submissions.filter(s => s.service).length, color: 'orange' },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl border border-gray-800 bg-gray-900/50">
              <div className={`text-2xl font-extrabold mb-0.5 ${
                stat.color === 'teal' ? 'text-teal-400' :
                stat.color === 'blue' ? 'text-blue-400' :
                stat.color === 'purple' ? 'text-purple-400' : 'text-orange-400'
              }`}>{stat.value}</div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or service..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-teal-500 transition-colors placeholder-gray-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <svg className="w-8 h-8 animate-spin text-teal-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-gray-500 text-sm">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-12 h-12 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">{search ? 'No results found.' : 'No submissions yet.'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                className="group p-5 rounded-2xl border border-gray-800 bg-gray-900/40 hover:border-teal-500/40 hover:bg-gray-900/70 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/30 to-blue-500/30 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-300 font-bold text-sm uppercase">
                    {s.name.charAt(0)}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                      <span className="text-white font-semibold text-sm">{s.name}</span>
                      {s.service && <Badge text={s.service} />}
                      <span className="text-gray-600 text-xs ml-auto flex-shrink-0">#{s.id}</span>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        {s.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {s.mobile}
                      </span>
                      {s.website && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          {s.website}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-1">{s.message}</p>
                  </div>

                  {/* Date + actions */}
                  <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-gray-600 text-xs">{formatDate(s.createdAt)}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm(s); }}
                        className="p-1.5 rounded-lg border border-gray-700 text-gray-600 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <svg className="w-4 h-4 text-gray-700 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
      </div>

      {/* Plan Inquiry Detail Modal */}
      {selectedPlanInq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedPlanInq(null)}>
          <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-5 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs">Plan Selected</p>
                <h3 className="text-white font-extrabold text-lg">{selectedPlanInq.plan}</h3>
              </div>
              <button onClick={() => setSelectedPlanInq(null)} className="text-white/70 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Name</p>
                  <p className="text-white text-sm font-semibold">{selectedPlanInq.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Date</p>
                  <p className="text-gray-300 text-xs">{formatDate(selectedPlanInq.createdAt)}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${selectedPlanInq.email}`} className="text-teal-400 text-sm hover:underline break-all">{selectedPlanInq.email}</a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                <a href={`tel:${selectedPlanInq.phone}`} className="text-white text-sm hover:text-teal-400 transition-colors">{selectedPlanInq.phone}</a>
              </div>
              {selectedPlanInq.website && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Website</p>
                  <a href={selectedPlanInq.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline break-all">{selectedPlanInq.website}</a>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex gap-3">
              <a href={`mailto:${selectedPlanInq.email}?subject=Your ${selectedPlanInq.plan} — Zalgo Infotech`}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold text-center transition-colors">
                Reply via Email
              </a>
              <a href={`tel:${selectedPlanInq.phone}`}
                className="flex-1 py-2.5 rounded-xl border border-gray-700 hover:border-gray-600 text-white text-sm font-bold text-center transition-colors">
                Call Client
              </a>
              <button onClick={() => setDeletePlanConfirm(selectedPlanInq)}
                className="p-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan delete confirm */}
      {deletePlanConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => !deletingPlan && setDeletePlanConfirm(null)}>
          <div className="w-full max-w-sm bg-gray-900 rounded-2xl border border-gray-700 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-white font-bold text-center text-lg mb-1">Delete Inquiry?</h3>
            <p className="text-gray-400 text-sm text-center mb-6"><span className="text-white font-semibold">{deletePlanConfirm.name}</span>&apos;s plan inquiry will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeletePlanConfirm(null)} disabled={deletingPlan}
                className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-semibold hover:border-gray-600 transition-colors disabled:opacity-50">Cancel</button>
              <button onClick={() => handleDeletePlan(deletePlanConfirm)} disabled={deletingPlan}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {deletingPlan ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Deleting...</> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500/30 to-blue-500/30 border border-teal-500/20 flex items-center justify-center text-teal-300 font-bold text-sm uppercase">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{selected.name}</p>
                  <p className="text-gray-500 text-xs">{formatDate(selected.createdAt)}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              {selected.service && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Service Requested</p>
                  <Badge text={selected.service} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-teal-400 text-sm hover:underline break-all">{selected.email}</a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone</p>
                  <a href={`tel:${selected.mobile}`} className="text-white text-sm hover:text-teal-400 transition-colors">{selected.mobile}</a>
                </div>
              </div>
              {selected.website && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Website</p>
                  <a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline break-all">{selected.website}</a>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Message</p>
                <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex items-center gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: Your WordPress Project Enquiry`}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold text-center transition-colors"
              >
                Reply via Email
              </a>
              <a
                href={`tel:${selected.mobile}`}
                className="flex-1 py-2.5 rounded-xl border border-gray-700 hover:border-gray-600 text-white text-sm font-bold text-center transition-colors"
              >
                Call Client
              </a>
              <button
                onClick={() => { setDeleteConfirm(selected); }}
                className="p-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => !deleting && setDeleteConfirm(null)}>
          <div className="w-full max-w-sm bg-gray-900 rounded-2xl border border-gray-700 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-center text-lg mb-1">Delete Submission?</h3>
            <p className="text-gray-400 text-sm text-center mb-1">
              <span className="text-white font-semibold">{deleteConfirm.name}</span>&apos;s message will be permanently deleted.
            </p>
            <p className="text-gray-600 text-xs text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-semibold hover:border-gray-600 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Deleting...
                  </>
                ) : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
