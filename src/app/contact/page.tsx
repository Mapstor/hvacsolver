'use client';

import { useState } from 'react';
import { Metadata } from 'next';

// Note: metadata must be in a separate file for client components
// For now, we'll handle SEO through the layout or a generateMetadata in a parent

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // In production, this would send to an API endpoint
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
          Contact Us
        </h1>

        <p className="text-slate-600 mb-8">
          Have a question, found an error, or want to suggest an improvement? We&apos;d like to hear from you.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-slate-950 mb-2">Email</h2>
          <p className="text-slate-700">
            <a
              href="mailto:info@hvacsolver.com"
              className="text-[#1e3a5f] underline hover:text-[#c2410c]"
            >
              info@hvacsolver.com
            </a>
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm">
            <strong>Please note:</strong> We read every message but cannot provide individual
            HVAC diagnoses or system recommendations. For specific problems with your equipment,
            please consult a local HVAC professional who can inspect your system in person.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full sm:w-auto px-6 py-3 bg-[#c2410c] hover:bg-[#9a3412] disabled:bg-slate-400 text-white font-semibold rounded-md transition-colors"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="text-green-700 font-medium">
              Message sent. Thank you for reaching out.
            </p>
          )}

          {status === 'error' && (
            <p className="text-red-700 font-medium">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
