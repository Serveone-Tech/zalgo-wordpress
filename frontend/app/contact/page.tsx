"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/ContactForm";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const faqs = [
  {
    q: "What is your typical WordPress project timeline?",
    a: "A standard WordPress website takes 2–4 weeks. WooCommerce stores and custom plugins may take 4–8 weeks depending on complexity. We provide a detailed timeline after your free consultation.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes! We offer comprehensive maintenance packages — including updates, backups, security monitoring, and bug fixes. Your site is always in safe hands.",
  },
  {
    q: "Can you migrate my existing website to WordPress?",
    a: "Absolutely. We specialise in zero-downtime migrations to WordPress from any platform — Wix, Squarespace, custom PHP, or even other CMS systems.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer fixed-price quotes after understanding your requirements. No hidden fees, no surprises. We work with budgets of all sizes — from startups to enterprises.",
  },
  {
    q: "Do you handle WordPress SEO?",
    a: "Yes — SEO is built into every project. We configure Yoast/RankMath, set up schema, optimise Core Web Vitals, and ensure your site is technically sound for Google.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-teal-500/40 bg-teal-500/4" : "border-gray-800 bg-gray-900/40 hover:border-gray-700"}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-semibold text-sm sm:text-base leading-snug">
          {q}
        </span>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 ${open ? "bg-teal-500 border-teal-500" : "border-gray-700 bg-gray-800"}`}
        >
          <svg
            className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48" : "max-h-0"}`}
      >
        <p className="px-5 sm:px-6 pb-5 text-gray-400 text-sm leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

const trustBadges = [
  {
    icon: (
      <svg
        className="w-4 h-4 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    text: "Reply within 24 hours",
  },
  {
    icon: (
      <svg
        className="w-4 h-4 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    text: "Free consultation",
  },
  {
    icon: (
      <svg
        className="w-4 h-4 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    text: "NDA available",
  },
  {
    icon: (
      <svg
        className="w-4 h-4 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    text: "No hidden fees",
  },
];

const contactMethods = [
  {
    icon: (
      <svg
        className="w-5 h-5 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "Email Us",
    value: "sales@zalgoinfotech.in",
    href: "mailto:sales@zalgoinfotech.in",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: "Call Us",
    value: "+91 92442 13326",
    href: "tel:+919244213326",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "Our Location",
    value:
      "1/65, vinay nagar sec 3, 100 feet road, s. p. ashram, gwalior, madhya pradesh, india - 474012",
    href: "https://maps.google.com/?q=1/65+Vinay+Nagar+Sec+3+100+Feet+Road+SP+Ashram+Gwalior+Madhya+Pradesh+India+474012",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon – Sat: 10 AM – 8 PM IST",
    href: "mailto:sales@zalgoinfotech.in",
  },
];

export default function Contact() {
  const faqRef = useInView();
  const formRef = useInView(0.05);
  const statsRef = useInView(0.1);

  return (
    <div className="bg-gray-950 overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,153,153,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,153,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/25 bg-teal-500/5 text-teal-400 text-sm mb-8 animate-fade-in-down">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available — we respond within 24 hours
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 animate-fade-in-up leading-tight tracking-tight">
            Let&apos;s Build Your
            <br />
            <span className="shimmer-text">WordPress Vision</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 opacity-0-init">
            Free consultation. No pressure. Expert WordPress advice tailored to
            your business goals.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-400 opacity-0-init">
            {trustBadges.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-800/80 text-gray-300 text-sm backdrop-blur-sm"
              >
                {b.icon}
                <span className="font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div
        ref={statsRef.ref}
        className="border-y border-gray-800/60 bg-gray-900/30"
      >
        <div
          className={`max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center ${statsRef.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {[
            { value: "10+", label: "Years Experience" },
            { value: "100+", label: "Projects Delivered" },
            { value: "80+", label: "Happy Clients" },
            { value: "4.8★", label: "Overall Rating" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-2xl font-extrabold text-teal-400 mb-0.5 whitespace-nowrap">
                {s.value}
              </div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={formRef.ref}
            className={`grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14 ${formRef.inView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {/* Left: Info Panel */}
            <div className="lg:col-span-2 space-y-5">
              {/* Urgency banner */}
              <div className="p-5 rounded-2xl border border-amber-500/25 bg-amber-500/5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4.5 h-4.5 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-400 font-bold text-sm">
                    Limited Slots Available
                  </p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    We take on a limited number of new projects each month to
                    guarantee quality. Book your free consultation now.
                  </p>
                </div>
              </div>

              {/* Contact methods */}
              <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50">
                <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactMethods.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-center gap-4 group rounded-xl p-3 -mx-3 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/20 transition-colors">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-white text-sm font-medium group-hover:text-teal-400 transition-colors truncate">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919244213326?text=Hi%20Zalgo%20Infotech!%20I%20need%20help%20with%20my%20WordPress%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-green-500/25 bg-green-500/5 hover:bg-green-500/8 hover:border-green-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-green-400 font-bold text-sm">
                    Chat on WhatsApp
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Quick response guaranteed
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {/* What you get */}
              <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50">
                <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-teal-500 rounded-full" />
                  What You Get — Free
                </h4>
                <ul className="space-y-2.5">
                  {[
                    "WordPress performance audit",
                    "Security vulnerability check",
                    "SEO baseline review",
                    "Actionable recommendations",
                    "No-obligation proposal",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 text-teal-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm overflow-hidden">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />

                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-gray-800/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white mb-1.5">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Tell us about your WordPress project — we&apos;ll reply
                        within 24 hours with a tailored plan.
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs font-semibold">
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="px-8 py-7">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-gray-800/60">
        <div
          ref={faqRef.ref}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            className={`text-center mb-12 ${faqRef.inView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Common questions about our WordPress services answered.
            </p>
          </div>
          <div
            className={`space-y-3 ${faqRef.inView ? "animate-fade-in-up delay-200 opacity-0-init" : "opacity-0"}`}
          >
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
          <div
            className={`text-center mt-10 ${faqRef.inView ? "animate-fade-in-up delay-400 opacity-0-init" : "opacity-0"}`}
          >
            <p className="text-gray-400 text-sm">
              Still have questions?{" "}
              <Link
                href="mailto:sales@zalgoinfotech.in"
                className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
              >
                Email us directly →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="bg-gray-950 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            {/* Map header */}
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Zalgo Infotech Office</p>
                  <p className="text-gray-500 text-xs">1/65, Vinay Nagar Sec 3, Gwalior, MP — 474012</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=1/65+Vinay+Nagar+Sec+3+100+Feet+Road+SP+Ashram+Gwalior+Madhya+Pradesh+India+474012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
              >
                Open in Maps
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            {/* Embedded Map */}
            <iframe
              title="Zalgo Infotech Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.888!2d78.1737!3d26.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmluYXkgTmFnYXIgU2VjIDMsIEdvd2FsaW9yLCBNYWRoeWEgUHJhZGVzaA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=1/65+Vinay+Nagar+Sec+3+100+Feet+Road+SP+Ashram+Gwalior+Madhya+Pradesh+India+474012"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
