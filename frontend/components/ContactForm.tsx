'use client';

import { useState } from 'react';
import { submitContactForm, ContactFormData } from '@/lib/api';

interface FormErrors {
  name?: string;
  email?: string;
  website?: string;
  mobile?: string;
  message?: string;
}

const services = [
  'WordPress Website',
  'WooCommerce Store',
  'WordPress Maintenance',
  'Speed Optimization',
  'WordPress Security',
  'Custom Plugin',
  'Website Migration',
  'Other',
];

function FloatingInput({
  id, name, type = 'text', label, value, onChange, error, disabled, placeholder, required,
}: {
  id: string; name: string; type?: string; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string;
  disabled?: boolean; placeholder?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <div className={`relative rounded-xl transition-all duration-200 border ${
        error
          ? 'border-red-500/60 bg-red-950/20'
          : active
          ? 'border-teal-500/70 bg-gray-800/80 shadow-[0_0_0_3px_rgba(20,184,166,0.08)]'
          : 'border-gray-700/80 bg-gray-800/50 hover:border-gray-600'
      }`}>
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-150 pointer-events-none select-none
            ${active ? 'top-2 text-[10px] font-semibold tracking-wider uppercase text-teal-400' : 'top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium'}`}
        >
          {label}{required && <span className="text-teal-400 ml-0.5">*</span>}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ''}
          disabled={disabled}
          className="w-full bg-transparent pt-7 pb-2.5 px-4 text-white text-sm outline-none border-none disabled:opacity-50 rounded-xl placeholder-gray-500"
        />
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5 ml-1 font-medium">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData & { service: string }>({
    name: '', email: '', website: '', mobile: '', message: '', service: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [msgFocused, setMsgFocused] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email';
    if (!formData.mobile.trim()) e.mobile = 'Phone number is required';
    if (!formData.message.trim()) e.message = 'Please tell us about your project';
    else if (formData.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validate()) return;
    setIsLoading(true);
    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmitStatus({ type: 'success', message: response.message || 'Message sent!' });
        setFormData({ name: '', email: '', website: '', mobile: '', message: '', service: '' });
      } else {
        setSubmitStatus({ type: 'error', message: response.message || 'Failed to send. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitStatus?.type === 'success') {
    return (
      <div className="text-center py-14">
        <div className="w-20 h-20 rounded-full bg-teal-500/15 border-2 border-teal-500/60 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-400 mb-1">Thank you for reaching out to Zalgo Infotech.</p>
        <p className="text-teal-400 font-semibold">We&apos;ll get back to you within 24 hours.</p>
        <div className="mt-8 p-4 rounded-xl bg-gray-800/60 border border-gray-700 inline-block">
          <p className="text-sm text-gray-300">
            Explore our{' '}
            <a href="/portfolio" className="text-teal-400 hover:underline font-medium">WordPress portfolio</a>{' '}
            or check our{' '}
            <a href="/services" className="text-teal-400 hover:underline font-medium">services</a>{' '}
            while you wait.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

      {/* Service selector */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">What do you need help with?</p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFormData(p => ({ ...p, service: p.service === s ? '' : s }))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border ${
                formData.service === s
                  ? 'bg-teal-600 border-teal-500 text-white shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                  : 'bg-gray-800/70 border-gray-700 text-gray-400 hover:border-teal-500/50 hover:text-teal-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FloatingInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleChange} error={errors.name} disabled={isLoading} placeholder="John Doe" required />
        <FloatingInput id="email" name="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} error={errors.email} disabled={isLoading} placeholder="you@example.com" required />
      </div>

      {/* Phone + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FloatingInput id="mobile" name="mobile" type="tel" label="Phone Number" value={formData.mobile} onChange={handleChange} error={errors.mobile} disabled={isLoading} placeholder="+91 98765 43210" required />
        <FloatingInput id="website" name="website" label="Website (Optional)" value={formData.website || ''} onChange={handleChange} error={errors.website} disabled={isLoading} placeholder="https://yoursite.com" />
      </div>

      {/* Message */}
      <div>
        <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${
          errors.message
            ? 'border-red-500/60 bg-red-950/20'
            : msgFocused || formData.message
            ? 'border-teal-500/70 bg-gray-800/80 shadow-[0_0_0_3px_rgba(20,184,166,0.08)]'
            : 'border-gray-700/80 bg-gray-800/50 hover:border-gray-600'
        }`}>
          <label className="block pt-3 px-4 text-[10px] font-semibold tracking-wider uppercase text-teal-400 select-none">
            Your Message <span className="text-teal-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setMsgFocused(true)}
            onBlur={() => setMsgFocused(false)}
            placeholder="Tell us about your WordPress project — what you need, your timeline, budget..."
            rows={5}
            disabled={isLoading}
            className="w-full bg-transparent border-0 outline-none px-4 pb-3 pt-1 text-white text-sm resize-none disabled:opacity-50 placeholder-gray-500/70 block"
          />
          <div className="flex items-center justify-between px-4 pb-2.5 border-t border-gray-700/40">
            <span className="text-gray-600 text-xs">Describe your project in detail for a faster response</span>
            <span className={`text-xs font-medium tabular-nums ${formData.message.length > 450 ? 'text-orange-400' : 'text-gray-600'}`}>
              {formData.message.length}/500
            </span>
          </div>
        </div>
        {errors.message && (
          <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5 ml-1 font-medium">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message}
          </p>
        )}
      </div>

      {/* Error status */}
      {submitStatus?.type === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/25">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-300 text-sm leading-relaxed">{submitStatus.message}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-200
          bg-gradient-to-r from-teal-600 to-teal-500 text-white
          hover:from-teal-500 hover:to-teal-400
          hover:shadow-xl hover:shadow-teal-500/25 hover:-translate-y-0.5
          disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none
          active:translate-y-0 group"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending Your Message...
            </>
          ) : (
            <>
              Send Message — Get Free Consultation
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </span>
      </button>

      <div className="flex items-center justify-center gap-6 pt-1">
        {[
          { icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>, text: '100% Confidential' },
          { icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: '24h Response' },
          { icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'No Spam Ever' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-gray-500 text-xs">
            <span className="text-gray-600">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </form>
  );
}
