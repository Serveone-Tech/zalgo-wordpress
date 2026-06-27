'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCaseStudy, caseStudies } from '@/lib/case-studies';

type Accent = { border: string; text: string; bg: string; badge: string; glow: string };

function GallerySection({ gallery, accent, accentBg }: { gallery: string[]; accent: Accent; accentBg: string }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActive(i => (i + 1) % gallery.length);

  return (
    <section className="py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-1 h-7 rounded-full ${accentBg}`} />
          <h2 className="text-xl font-bold text-white">Project Gallery</h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-gray-900">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <Image
              src={gallery[active]}
              alt={`Gallery image ${active + 1}`}
              fill
              className="object-cover object-top transition-opacity duration-300"
            />
          </div>
          {gallery.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === active ? `${accentBg} scale-125` : 'bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex gap-3 mt-4">
            {gallery.map((img, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all ${i === active ? accent.border : 'border-white/5 opacity-60 hover:opacity-100'}`}
                style={{ aspectRatio: '16/9' }}
              >
                <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const accentMap: Record<string, { border: string; text: string; bg: string; badge: string; glow: string }> = {
  teal:   { border: 'border-teal-500',   text: 'text-teal-400',   bg: 'bg-teal-500/10',   badge: 'bg-teal-500/20 text-teal-300 border border-teal-500/40',   glow: 'shadow-teal-500/20' },
  orange: { border: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/10', badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/40', glow: 'shadow-orange-500/20' },
  purple: { border: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10', badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/40', glow: 'shadow-purple-500/20' },
  blue:   { border: 'border-blue-500',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',   glow: 'shadow-blue-500/20' },
  yellow: { border: 'border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10', badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40', glow: 'shadow-yellow-500/20' },
  green:  { border: 'border-green-500',  text: 'text-green-400',  bg: 'bg-green-500/10',  badge: 'bg-green-500/20 text-green-300 border border-green-500/40',  glow: 'shadow-green-500/20' },
};

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!cs) notFound();

  const accent = accentMap[cs.accentColor] ?? accentMap.teal;
  const accentBg = accent.border.replace('border-', 'bg-');
  const otherProjects = caseStudies.filter(p => p.slug !== cs.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Sticky Nav ── */}
      <div className="border-b border-white/5 bg-gray-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/portfolio" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Projects
          </Link>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${accent.badge}`}>{cs.category}</span>
            {cs.url && cs.url !== '#' && (
              <a href={cs.url} target="_blank" rel="noopener noreferrer"
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold ${accent.text} hover:opacity-80 transition-opacity`}>
                Visit Live Site
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className={`relative transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background image — blurred */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src={cs.image} alt="" fill className="object-cover scale-110 blur-2xl opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12">
          {/* Breadcrumb chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-gray-500">
            <span>{cs.client}</span>
            <span className="text-gray-700">·</span>
            <span>{cs.category}</span>
            <span className="text-gray-700">·</span>
            <span>{cs.duration}</span>
          </div>

          <div className="max-w-3xl mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {cs.title}
            </h1>
            <p className={`text-base md:text-lg font-semibold mb-4 ${accent.text}`}>{cs.subtitle}</p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">{cs.description}</p>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {cs.tech.map(t => (
              <span key={t} className={`text-xs font-semibold px-3 py-1 rounded-full ${accent.badge}`}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Project Screenshot ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-0">
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${accent.glow}`}>
            {/* Browser chrome bar */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-3 flex-1 bg-gray-700/60 rounded px-3 py-1 text-xs text-gray-400 truncate">
                {cs.url && cs.url !== '#' ? cs.url : 'zalgoinfotech.in'}
              </div>
            </div>
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src={cs.image}
                alt={cs.title}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Results Strip ── */}
      <section className="mt-0 py-14 border-y border-white/5 bg-gray-900/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {cs.results.map((r, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl md:text-4xl font-black mb-1.5 ${accent.text}`}>{r.metric}</div>
                <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left col — overview, challenge, solution, testimonial */}
            <div className="lg:col-span-2 space-y-14">

              {/* Overview */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-1 h-7 rounded-full ${accentBg}`} />
                  <h2 className="text-xl font-bold text-white">Project Overview</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">{cs.overview}</p>
              </div>

              {/* Challenge */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 rounded-full bg-red-500" />
                  <h2 className="text-xl font-bold text-white">The Challenge</h2>
                </div>
                <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-6">
                  <p className="text-gray-300 leading-relaxed">{cs.challenge}</p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-1 h-7 rounded-full ${accentBg}`} />
                  <h2 className="text-xl font-bold text-white">Our Solution</h2>
                </div>
                <div className={`${accent.bg} border ${accent.border}/20 rounded-2xl p-6`}>
                  <p className="text-gray-300 leading-relaxed">{cs.solution}</p>
                </div>
              </div>

              {/* Project Delivery Highlights */}
              {cs.highlights && cs.highlights.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-1 h-7 rounded-full ${accentBg}`} />
                    <h2 className="text-xl font-bold text-white">Project Delivery Highlights</h2>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">A performance-driven website solution delivered with a focus on scalability, user experience, responsive design, and long-term business growth.</p>
                  <div className="grid grid-cols-3 gap-4">
                    {cs.highlights.map((h, i) => (
                      <div key={i} className="bg-gray-900 border border-white/5 rounded-2xl p-5 text-center">
                        <div className={`w-12 h-12 rounded-xl ${accent.bg} border ${accent.border}/20 flex items-center justify-center mx-auto mb-3`}>
                          {i === 0 && <svg className={`w-5 h-5 ${accent.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                          {i === 1 && <svg className={`w-5 h-5 ${accent.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                          {i === 2 && <svg className={`w-5 h-5 ${accent.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        </div>
                        <p className={`text-xl font-extrabold ${accent.text} mb-1`}>{h.value}</p>
                        <p className="text-white font-semibold text-xs mb-2">{h.label}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{h.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {cs.testimonial && (
                <div className={`relative rounded-2xl border ${accent.border}/20 ${accent.bg} p-8`}>
                  <svg className={`w-8 h-8 mb-4 ${accent.text} opacity-40`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-white text-lg leading-relaxed italic mb-6">
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${accentBg} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{cs.testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{cs.testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{cs.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">

              {/* Project Info */}
              <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Project Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Client', value: cs.client },
                    { label: 'Category', value: cs.category },
                    { label: 'Duration', value: cs.duration },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-500 text-xs">{label}</span>
                      <span className="text-gray-200 text-xs font-semibold">{value}</span>
                    </div>
                  ))}
                  {cs.url && cs.url !== '#' && (
                    <a href={cs.url} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-semibold ${accent.text} pt-1`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Live Site
                    </a>
                  )}
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">What We Delivered</h3>
                <ul className="space-y-3">
                  {cs.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accent.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-400 text-xs leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="bg-gray-900 border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.tech.map(t => (
                    <span key={t} className={`text-xs font-medium px-2.5 py-1 rounded-lg ${accent.badge}`}>{t}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className={`${accent.bg} border ${accent.border}/25 rounded-2xl p-6 text-center`}>
                <p className="text-white font-bold text-sm mb-1.5">Want similar results?</p>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">Let&apos;s build something great for your business too.</p>
                <Link href="/contact"
                  className={`block w-full py-3 rounded-xl font-bold text-sm text-white text-center ${accentBg} hover:opacity-90 transition-opacity`}>
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Gallery ── */}
      {cs.gallery && cs.gallery.length > 0 && (
        <GallerySection gallery={cs.gallery} accent={accent} accentBg={accentBg} />
      )}

      {/* ── More Case Studies ── */}
      <section className="py-16 px-6 border-t border-white/5 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">More Case Studies</h2>
            <Link href="/portfolio" className="text-xs text-gray-400 hover:text-white transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {otherProjects.map(p => {
              const oa = accentMap[p.accentColor] ?? accentMap.teal;
              return (
                <Link key={p.slug} href={`/portfolio/${p.slug}`}
                  className="group bg-gray-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative w-full bg-gray-800 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <Image src={p.image} alt={p.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${oa.badge}`}>{p.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-teal-400 transition-colors mb-3">
                      {p.title}
                    </h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${oa.text}`}>
                      View Case Study
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
