// File: src/App.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function formatCurrency(n) {
  return '$' + n.toLocaleString();
}

const faqs = [
  { q: 'What is CSAI and how does it work?', a: 'CSAI integrates AI-driven voice agents with your CRM to automate calls, scheduling, follow-ups and analytics—all in real time.' },
  { q: 'How much does CSAI cost?', a: '$2,388/year plus a one-time setup fee from $499–$10k depending on plan.' },
  { q: 'What’s in the setup fee?', a: 'CRM integration, custom scripting, voice training, compliance checks & team onboarding.' },
  { q: 'How fast is go-live?', a: '1–2 weeks typical: discovery, integration, customization, training, launch.' },
  { q: 'Which CRMs work?', a: 'Salesforce, HubSpot, Zoho, Dynamics, and any REST-API-capable system.' },
  { q: 'Is data secure?', a: 'Enterprise-grade encryption, HIPAA/GDPR-compliant, SOC-2 certified hosting.' },
  { q: 'Can I tweak call scripts?', a: 'Fully. Tone, logic, fallback paths—everything is under your control.' },
  { q: 'Multiple languages?', a: 'Yes: English, Spanish, French, German, and more on demand.' },
  { q: 'Expected ROI?', a: '3–10× within 12 months via headcount savings & higher conversion.' },
  { q: 'Support?', a: '24/7 monitoring, monthly reviews, continuous optimization.' },
];

export default function App() {
  const [phone, setPhone] = useState('');

  const handleDemo = async () => {
    if (!phone) return alert('Please enter a phone number.');
    try {
      const resp = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await resp.json();
      if (resp.ok) {
        alert('✅ Great! Our assistant will call you shortly.');
        console.log(data);
      } else {
        alert('❌ Error: ' + (data.error || 'Something went wrong.'));
      }
    } catch (err) {
      alert('❌ Network error: ' + err.message);
    }
  };

  const [wage, setWage] = useState(30),
    [hours, setHours] = useState(40),
    [employees, setEmployees] = useState(3),
    [showCalc, setShowCalc] = useState(false);

  function calc() {
    const weekly = hours <= 40 ? hours : 40 + (hours - 40) * 1.5;
    const annualHuman = weekly * wage * employees * 52;
    const annualAI = 2388;
    const breakdown = {
      'Sick days': annualHuman * 0.05,
      'Late arrivals': annualHuman * 0.02,
      'Errors & retries': annualHuman * 0.03,
      'Turnover & training': annualHuman * 0.10,
      'Breaks & lunches': annualHuman * 0.03,
    };
    const other = Object.values(breakdown).reduce((a, b) => a + b, 0);
    const save = annualHuman - annualAI;
    return { annualHuman, annualAI, breakdown, other, save };
  }

  const { annualHuman, annualAI, breakdown, other, save } = calc();

  const plans = [
    { id: 'basic', fee: 499, title: 'Basic', desc: 'Solo operators—no CRM integration needed' },
    { id: 'business', fee: 1499, title: 'Business', desc: 'Small teams—CRM integration + assistant coding' },
    { id: 'enterprise', fee: 4999, title: 'Enterprise', desc: 'Large orgs—advanced compliance, custom development' },
  ];

  const [selPlan, setSelPlan] = useState(null),
    [showForm, setShowForm] = useState(false),
    [openIdx, setOpenIdx] = useState(null);

  const steps = [
    'Discovery: map KPIs & goals',
    'Integration: connect CRM/API',
    'Customization: voice scripts & logic',
    'Launch: training & go-live support',
    'Optimize: continuous tuning'
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-900 text-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between p-4">
          <span className="font-bold text-xl cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Haven City Digital</span>
          <div className="space-x-4">
            {['About', 'Calculator', 'Plans', 'Process', 'Examples', 'Testimonials', 'FAQ', 'Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-blue-400">{s}</a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-20 text-white">
        <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
          <video className="absolute inset-0 w-full h-full object-cover" src="VIDEO_SRC_HERE.mp4" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-black opacity-60" />
          <div className="relative z-10 space-y-6 max-w-xl px-6">
            <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-extrabold">
              Transform with CSAI
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-2xl">
              Connected Systems with AI handles calls, workflows & analytics 24/7—at enterprise scale.
            </motion.p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input type="tel" placeholder="Your phone number" value={phone} onChange={e => setPhone(e.target.value)} className="p-3 rounded bg-gray-800 w-64" />
              <motion.button whileHover={{ scale: 1.05 }} onClick={handleDemo} className="px-6 py-3 bg-blue-600 rounded font-semibold">
                Get a Live Call
              </motion.button>
            </div>
          </div>
        </section>

        {/* The rest of your site sections (ABOUT, CALCULATOR, PLANS, etc.) go here exactly as before */}
      </main>
    </>
  );
}
