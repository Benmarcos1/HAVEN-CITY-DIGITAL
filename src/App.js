// File: src/App.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function formatCurrency(n){ return '$'+n.toLocaleString(); }

const faqs = [
  { q:'What is CSAI and how does it work?',
    a:'CSAI integrates AI-driven voice agents with your CRM to automate calls, scheduling, follow-ups and analytics—all in real time.' },
  { q:'How much does CSAI cost?',
    a:'$2,388/year plus a one-time setup fee from $499–$10k depending on plan.' },
  { q:'What’s in the setup fee?',
    a:'CRM integration, custom scripting, voice training, compliance checks & team onboarding.' },
  { q:'How fast is go-live?',
    a:'1–2 weeks typical: discovery, integration, customization, training, launch.' },
  { q:'Which CRMs work?',
    a:'Salesforce, HubSpot, Zoho, Dynamics, and any REST-API-capable system.' },
  { q:'Is data secure?',
    a:'Enterprise-grade encryption, HIPAA/GDPR-compliant, SOC-2 certified hosting.' },
  { q:'Can I tweak call scripts?',
    a:'Fully. Tone, logic, fallback paths—everything is under your control.' },
  { q:'Multiple languages?',
    a:'Yes: English, Spanish, French, German, and more on demand.' },
  { q:'Expected ROI?',
    a:'3–10× within 12 months via headcount savings & higher conversion.' },
  { q:'Support?',
    a:'24/7 monitoring, monthly reviews, continuous optimization.' },
];

export default function App(){
  // Hero
  const [phone,setPhone]=useState('');

  // <— REPLACED handleDemo with async Synthflow call
  const handleDemo = async () => {
    if (!phone) {
      return alert('Please enter a phone number.');
    }
    try {
      const resp = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (resp.ok) {
        alert("Great! Our assistant will call you shortly.");
      } else {
        const { error } = await resp.json();
        alert("Oops: " + (error || 'Something went wrong.'));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // Calculator
  const [wage,setWage]=useState(30),
        [hours,setHours]=useState(40),
        [employees,setEmployees]=useState(3),
        [showCalc,setShowCalc]=useState(false);

  function calc(){
    const weekly = hours<=40 ? hours : 40 + (hours-40)*1.5;
    const annualHuman = weekly*wage*employees*52;
    const annualAI    = 2388;
    const breakdown   = {
      'Sick days': annualHuman*0.05,
      'Late arrivals': annualHuman*0.02,
      'Errors & retries': annualHuman*0.03,
      'Turnover & training': annualHuman*0.10,
      'Breaks & lunches': annualHuman*0.03,
    };
    const other = Object.values(breakdown).reduce((a,b)=>a+b,0);
    const save  = annualHuman - annualAI;
    return { annualHuman,annualAI,breakdown,other,save };
  }
  const {annualHuman,annualAI,breakdown,other,save} = calc();

  // Plans
  const plans=[
    {id:'basic', fee:499,   title:'Basic',     desc:'Solo operators—no CRM integration needed'},
    {id:'business',fee:1499, title:'Business',  desc:'Small teams—CRM integration + assistant coding'},
    {id:'enterprise',fee:4999,title:'Enterprise',desc:'Large orgs—advanced compliance, custom development'}
  ];
  const [selPlan,setSelPlan]=useState(null),
        [showForm,setShowForm]=useState(false);

  // Process
  const steps=[
    'Discovery: map KPIs & goals',
    'Integration: connect CRM/API',
    'Customization: voice scripts & logic',
    'Launch: training & go-live support',
    'Optimize: continuous tuning'
  ];

  // FAQ toggle
  const [openIdx,setOpenIdx]=useState(null);

  return <>
    {/* NAV */}
    <nav className="fixed top-0 w-full bg-gray-900 text-white z-50">
      <div className="max-w-6xl mx-auto flex justify-between p-4">
        <span className="font-bold text-xl cursor-pointer" onClick={()=>window.scrollTo(0,0)}>Haven City Digital</span>
        <div className="space-x-4">
          {['About','Calculator','Plans','Process','Examples','Testimonials','FAQ','Contact'].map(s=>
            <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-blue-400">{s}</a>
          )}
        </div>
      </div>
    </nav>

    <main className="pt-20 text-white">

      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="VIDEO_SRC_HERE.mp4"
          autoPlay loop muted playsInline
        />
        <div className="absolute inset-0 bg-black opacity-60"/>
        <div className="relative z-10 space-y-6 max-w-xl px-6">
          <motion.h1 initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8}}
                    className="text-5xl md:text-6xl font-extrabold">Transform with CSAI</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
                    className="text-lg md:text-2xl">
            Connected Systems with AI handles calls, workflows & analytics 24/7—at enterprise scale.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input type="tel" placeholder="Your phone number" value={phone}
                   onChange={e=>setPhone(e.target.value)}
                   className="p-3 rounded bg-gray-800 w-64"/>
            <motion.button whileHover={{scale:1.05}} onClick={handleDemo}
                           className="px-6 py-3 bg-blue-600 rounded font-semibold">
              Get a Live Call
            </motion.button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-8">What is CSAI?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Connected Systems','Artificial Intelligence','Automated Outreach','Real-Time Analytics']
            .map((t,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
                        className="p-6 bg-gray-700 rounded hover:bg-gray-600">
              <h3 className="text-2xl font-semibold mb-2">{t}</h3>
              <p className="text-gray-300">
                Detailed benefits of {t.toLowerCase()} in your organization.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Cost Comparison Calculator</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800 p-6 rounded">
          <div className="space-y-4">
            {[
              {lbl:'Hourly Wage ($)', val:wage, fn:setWage},
              {lbl:'Hours/Week', val:hours, fn:setHours},
              {lbl:'Employees', val:employees, fn:setEmployees}
            ].map((f,i)=>(
              <div key={i}>
                <label className="block mb-1">{f.lbl}</label>
                <input type="number" value={f.val} onChange={e=>f.fn(+e.target.value)}
                       className="w-full p-2 rounded bg-gray-700"/>
              </div>
            ))}
            <motion.button whileHover={{scale:1.05}}
                           onClick={()=>setShowCalc(!showCalc)}
                           className="mt-4 px-5 py-2 bg-blue-600 rounded font-medium">
              Compare
            </motion.button>
            <AnimatePresence>
              {showCalc && (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                            className="mt-4 bg-gray-700 p-4 rounded space-y-2">
                  <p>Human Cost/yr: <strong>{formatCurrency(annualHuman)}</strong></p>
                  <p>CSAI Cost/yr: <strong>{formatCurrency(annualAI)}</strong></p>
                  <p>Other Costs: <strong>{formatCurrency(other)}</strong></p>
                  <p className="text-green-400">Savings: <strong>{formatCurrency(save)}</strong></p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    {Object.entries(breakdown).map(([k,v])=>(
                      <li key={k}>{k}: {formatCurrency(v)}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <img src="https://via.placeholder.com/400x300" alt="chart" className="rounded shadow"/>
        </div>
      </section>

      {/* PLANS & FORM */}
      <section id="plans" className="py-20 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p,i)=>(
            <motion.div key={i} whileHover={{y:-5}}
                        onClick={()=>{setSelPlan(p);setShowForm(true)}}
                        className="p-6 bg-gray-700 rounded cursor-pointer">
              <h3 className="text-2xl font-semibold">{p.title}</h3>
              <p className="text-gray-400">Fee: {formatCurrency(p.fee)}</p>
              <p className="mt-2">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showForm && selPlan && (
            <motion.form initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.8,opacity:0}}
                         className="max-w-2xl mx-auto mt-8 bg-gray-700 p-6 rounded space-y-4">
              <h3 className="text-xl">Start with {selPlan.title}</h3>
              {['Business Name','Location','Current Setup','Email'].map((ph,i)=>(
                <input key={i} placeholder={ph} className="w-full p-2 rounded bg-gray-600"/>
              ))}
              <motion.button whileHover={{scale:1.05}}
                             className="px-5 py-2 bg-blue-600 rounded font-medium">
                Submit Request
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Our Process</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.2}}
                        className="p-4 text-center">
              <div className="mx-auto mb-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                {i+1}
              </div>
              <p className="text-gray-300">{s}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-4">Audio Examples</h2>
        <p className="text-gray-300">Coming soon: live call snippets you can preview.</p>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Testimonials</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {q:'CSAI doubled our leads in 3 months.', name:'Dr. Smith, Dental Clinic'},
            {q:'Saved $50k/year in staffing costs.', name:'Jane, Med Spa Owner'}
          ].map((t,i)=>(
            <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.2}}
                        className="p-6 bg-gray-700 rounded">
              <p className="italic mb-4">“{t.q}”</p>
              <p className="font-semibold text-right">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-8">FAQs</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((f,i)=>(
            <div key={i} className="bg-gray-700 rounded">
              <button onClick={()=>setOpenIdx(openIdx===i?null:i)}
                      className="w-full flex justify-between p-4">
                <span>{f.q}</span>
                <span>{openIdx===i? '–' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIdx===i && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                              className="px-4 pb-4 text-gray-300">
                    {f.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Invest in CSAI?</h2>
        <motion.button whileHover={{scale:1.05}}
                       className="px-8 py-3 bg-blue-600 rounded font-semibold">
          Contact Sales
        </motion.button>
      </section>

    </main>
  </>;
}
