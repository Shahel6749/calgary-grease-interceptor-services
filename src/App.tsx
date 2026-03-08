import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone, Mail, MapPin, Menu, X, CheckCircle2,
  Droplets, ShieldAlert, Wrench, Clock, Star,
  ChevronRight, ArrowRight, ShieldCheck, ChevronLeft,
  Facebook, Instagram
} from 'lucide-react';

const COMPANY_NAME = "Calgary Grease Interceptor Services";
const PHONE_DISPLAY = "587-966-4633";
const PHONE_TEL = "5879664633";
const EMAIL = "colinchisholm1000@gmail.com";
const ADDRESS = "136 Edgedale Way NW, Calgary, AB T3A 2P9, Canada";
const WEBHOOK_URL = "https://hook.us2.make.com/viaijv914kfwx3kzgoshdmzqk1asvlik";


function BeforeAfterSlider({ before, after, labelBefore = "Before", labelAfter = "After" }: { before: string, after: string, labelBefore?: string, labelAfter?: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden group shadow-xl bg-slate-200 cursor-ew-resize transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={after} alt={labelAfter} className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" />

      <div
        className="absolute inset-0 top-0 left-0 right-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={before} alt={labelBefore} className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" />
      </div>

      <div
        className={`absolute top-0 bottom-0 w-1.5 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none transition-all duration-75 ${isHovered ? 'bg-primary' : 'bg-white'}`}
        style={{ left: `calc(${sliderPosition}% - 3px)` }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isHovered ? 'bg-primary scale-110' : 'bg-white scale-100'}`}>
          <ChevronLeft className={`w-6 h-6 -mr-1 transition-colors ${isHovered ? 'text-white' : 'text-primary'}`} strokeWidth={3} />
          <ChevronRight className={`w-6 h-6 -ml-1 transition-colors ${isHovered ? 'text-white' : 'text-primary'}`} strokeWidth={3} />
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize m-0 p-0"
        aria-label="Image comparison slider"
      />

      <div className={`absolute top-4 left-4 bg-dark/90 backdrop-blur-md text-white text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-full z-10 pointer-events-none transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        {labelBefore}
      </div>
      <div className={`absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-full z-10 pointer-events-none transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        {labelAfter}
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      serviceAddress: formData.get('serviceAddress'),
      serviceType: formData.get('serviceType'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      source: `${COMPANY_NAME} Website`
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-2 bg-primary transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
      <h3 className="font-display text-2xl font-bold mb-6 text-dark">Get Your Free Quote</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="sr-only">First Name</label>
          <input required type="text" name="firstName" id="firstName" placeholder="First Name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">Last Name</label>
          <input required type="text" name="lastName" id="lastName" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input required type="email" name="email" id="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone</label>
          <input required type="tel" name="phone" id="phone" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="serviceAddress" className="sr-only">Service Address</label>
        <input required type="text" name="serviceAddress" id="serviceAddress" placeholder="Service Address" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
      </div>

      <div className="mb-4">
        <label htmlFor="serviceType" className="sr-only">Service Type</label>
        <select required name="serviceType" id="serviceType" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
          <option value="">Select Service Needed...</option>
          <option value="Grease Trap Cleaning">Grease Trap Cleaning</option>
          <option value="Grease Trap Replacement">Grease Trap Replacement</option>
          <option value="Hydro Jetting">Hydro Jetting</option>
          <option value="Drain Cleaning">Drain Cleaning</option>
          <option value="Other / Emergency">Other / Emergency</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea name="message" id="message" rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"></textarea>
      </div>

      <button disabled={status === 'submitting'} type="submit" className="w-full bg-dark hover:bg-black text-white font-semibold rounded-lg px-6 py-4 transition-colors duration-200 disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer min-h-[44px] active:scale-95">
        {status === 'submitting' ? 'Sending...' : 'Request Service Now'}
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </button>

      {status === 'success' && (
        <p className="text-green-600 mt-4 text-center font-medium">Message sent successfully! We'll be in touch shortly.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-4 text-center font-medium">There was an error. Please call us directly.</p>
      )}
    </form>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-ink selection:bg-primary selection:text-white">
      {/* 1. Skip Link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:p-4 focus:rounded-lg">
        Skip to main content
      </a>

      {/* 2. Nav */}
      <header className="fixed w-full z-40 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center cursor-pointer" aria-label="Home">
              <img src="/cgis-logo.png" alt="Calgary Grease Interceptor Services Logo" className="h-10 w-auto lg:h-12" />
            </a>

            <nav aria-label="Main navigation" className="hidden md:flex space-x-8">
              <a href="#services" className="font-medium text-slate-600 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center">Services</a>
              <a href="#process" className="font-medium text-slate-600 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center">How We Work</a>
              <a href="#about" className="font-medium text-slate-600 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center">About</a>
              <a href="#reviews" className="font-medium text-slate-600 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center">Reviews</a>
            </nav>

            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">24/7 Service</p>
                <a href={`tel:${PHONE_TEL} `} className="font-display font-bold text-lg text-dark hover:text-primary transition-colors duration-200 block cursor-pointer">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer min-h-[44px] flex items-center">
                Book Now
              </a>
            </div>

            <button className="md:hidden p-2 text-slate-600 cursor-pointer min-h-[44px] flex items-center justify-center" onClick={() => setNavOpen(!navOpen)} aria-label={navOpen ? "Close menu" : "Open menu"} aria-expanded={navOpen}>
              {navOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-slate-100 py-4 px-4 absolute w-full shadow-lg"
          >
            <div className="flex flex-col space-y-4">
              <a href="#services" onClick={() => setNavOpen(false)} className="font-medium text-slate-600 cursor-pointer min-h-[44px] flex items-center">Services</a>
              <a href="#process" onClick={() => setNavOpen(false)} className="font-medium text-slate-600 cursor-pointer min-h-[44px] flex items-center">How We Work</a>
              <a href="#about" onClick={() => setNavOpen(false)} className="font-medium text-slate-600 cursor-pointer min-h-[44px] flex items-center">About</a>
              <a href="#contact" onClick={() => setNavOpen(false)} className="font-medium text-slate-600 cursor-pointer min-h-[44px] flex items-center">Contact</a>
              <hr className="border-slate-100" />
              <a href={`tel:${PHONE_TEL} `} className="bg-dark text-white px-4 py-3 rounded-lg text-center font-bold cursor-pointer min-h-[44px] flex items-center justify-center">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main id="main">
        {/* 3. Hero - Premium Full Bleed Redesign */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden z-0">
          {/* Background Image & Overlays */}
          <div className="absolute inset-0 z-[-2]">
            <img
              src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=2800"
              alt="Professional commercial kitchen and plumbing"
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-dark via-dark/80 to-dark/40 mix-blend-multiply" aria-hidden="true"></div>
          <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-dark/90 via-dark/60 to-transparent" aria-hidden="true"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full pt-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 shadow-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-bold tracking-widest text-white uppercase">Calgary's #1 Rated Local Service</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white mb-8">
                Protect Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300 drop-shadow-sm">Kitchen.</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-medium leading-relaxed">
                Specialized grease interceptor cleaning, powerful hydro jetting, and 24/7 drain solutions. Maintaining total compliance has never been this easy.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <a href="#contact" className="w-full sm:w-auto bg-primary hover:bg-emerald-400 text-white text-center px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 cursor-pointer min-h-[44px] active:scale-95 flex items-center justify-center">
                  Request Free Quote
                </a>
                <a href={`tel:${PHONE_TEL} `} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/20 text-center px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-200 flex justify-center items-center gap-3 backdrop-blur-sm cursor-pointer min-h-[44px] active:scale-95">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">24/7 Emergency</span>
                    <span>{PHONE_DISPLAY}</span>
                  </div>
                </a>
              </div>

              <div className="mt-16 flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-dark bg-slate-300 overflow-hidden"><img loading="eager" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Customer" className="w-full h-full object-cover" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-dark bg-slate-300 overflow-hidden"><img loading="eager" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Customer" className="w-full h-full object-cover" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-dark bg-slate-300 overflow-hidden"><img loading="eager" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80" alt="Customer" className="w-full h-full object-cover" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-dark bg-primary flex items-center justify-center text-white font-bold text-sm">+20</div>
                </div>
                <div className="text-white">
                  <div className="flex gap-1 text-amber-400 mb-1">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-sm font-medium text-slate-300"><span className="font-bold text-white">4.8/5</span> from 27 Google Reviews</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              className="flex w-[200%]"
            >
              {[1, 2].map((i) => (
                <svg key={i} viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-1/2 h-[60px] md:h-[100px]">
                  <path className="fill-primary" opacity="0.3" d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                  <path className="fill-primary" opacity="0.6" d="M0,80 Q360,120 720,80 T1440,80 L1440,120 L0,120 Z"></path>
                  <path className="fill-white" d="M0,90 Q360,50 720,90 T1440,90 L1440,120 L0,120 Z"></path>
                </svg>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. Trust bar */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 opacity-70">
              <div className="flex items-center gap-3 font-semibold text-slate-600"><CheckCircle2 className="w-6 h-6 text-primary" /> Licensed & Insured</div>
              <div className="flex items-center gap-3 font-semibold text-slate-600"><Clock className="w-6 h-6 text-primary" /> 24/7 Availability</div>
              <div className="flex items-center gap-3 font-semibold text-slate-600"><ShieldCheck className="w-6 h-6 text-primary" /> Municipal Compliant</div>
              <div className="flex items-center gap-3 font-semibold text-slate-600"><Star className="w-6 h-6 text-primary" /> 5-Star Rated Service</div>
              <div className="flex items-center gap-3 font-semibold text-slate-600"><MapPin className="w-6 h-6 text-primary" /> Locally Owned</div>
            </div>
          </div>
        </section>

        {/* 5. Services */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Our Expertise</h2>
              <h3 className="font-display text-4xl font-bold text-dark mb-6">Complete Grease Trap & Drain Solutions</h3>
              <p className="text-slate-600 text-lg">We specialize in keeping your commercial kitchen compliant and your drains flowing freely with our state-of-the-art equipment.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Grease Trap Cleaning",
                  desc: "Routine and emergency cleaning of commercial grease interceptors. We handle everything from small indoor traps to large exterior tanks.",
                  icon: <ShieldAlert className="w-8 h-8" aria-hidden="true" />,
                  bullets: ["Municipal compliance reporting", "Thorough scraping and vacuuming", "Odor control treatment"]
                },
                {
                  title: "Grease Trap Replacement",
                  desc: "Expert replacement and installation of new grease interceptors. We size units properly for your kitchen's specific flow rate and requirements.",
                  icon: <Wrench className="w-8 h-8" aria-hidden="true" />,
                  bullets: ["Assessment & consulting", "Professional installation", "Old unit disposal"]
                },
                {
                  title: "Hydro Jetting",
                  desc: "High-pressure water jetting to completely clear out grease, sludge, and debris from your main sewer and kitchen lines.",
                  icon: <Droplets className="w-8 h-8" aria-hidden="true" />,
                  bullets: ["Restores pipe to original diameter", "Safe for pipes", "Removes stubborn blockages"]
                },
                {
                  title: "Drain Cleaning",
                  desc: "Fast and reliable drain snaking and cleaning for floor drains, sink lines, and main sewer backups in commercial properties.",
                  icon: <CheckCircle2 className="w-8 h-8" aria-hidden="true" />,
                  bullets: ["24/7 emergency response", "Camera inspections", "Preventative maintenance"]
                }
              ].map((svc, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -15, scale: 1.03, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="h-full perspective-1000"
                >
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-300 h-full flex flex-col group relative overflow-visible">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 rounded-3xl pointer-events-none" style={{ transform: "translateZ(-10px)" }}></div>
                    <div className="flex items-start gap-6 mb-6" style={{ transform: "translateZ(30px)" }}>
                      <div className="bg-primary/10 text-primary p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                        {svc.icon}
                      </div>
                      <div className="relative w-full">
                        <div className="text-slate-200 font-display font-black text-6xl leading-none absolute -top-4 right-0 pointer-events-none transition-all duration-300 group-hover:-top-6 group-hover:text-primary/10">0{i + 1}</div>
                        <h4 className="font-display font-bold text-2xl text-dark mb-2 mt-1 relative z-10">{svc.title}</h4>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6 flex-grow relative z-10" style={{ transform: "translateZ(20px)" }}>{svc.desc}</p>
                    <ul className="space-y-3 mt-auto relative z-10" style={{ transform: "translateZ(25px)" }}>
                      {svc.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How We Work */}
        <section id="process" className="py-24 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Proven Service Protocol</h2>
                <h3 className="font-display text-4xl font-bold text-dark mb-8">Zero Downtime. Total Compliance.</h3>

                <div className="space-y-12">
                  {[
                    { title: "Priority Dispatch & Analysis", desc: "Reach out 24/7. We guarantee rapid response times, conduct thorough system evaluations, and provide transparent, upfront pricing before any work begins." },
                    { title: "Heavy-Duty Execution", desc: "Our seasoned technicians arrive fully equipped with high-capacity vacuum units and industrial hydro-jetters to completely eradicate FOG buildup and blockages." },
                    { title: "Manifests & Maintenance", desc: "Achieve complete peace of mind. We generate detailed, code-compliant reports for municipal authorities and design automated maintenance schedules to prevent future emergencies." }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-6 relative"
                    >
                      {i !== 2 && <div className="absolute left-8 top-16 bottom-[-3rem] w-0.5 bg-slate-100" />}
                      <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 border-2 border-primary flex items-center justify-center font-display font-bold text-2xl text-primary z-10">
                        {i + 1}
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-xl text-dark mb-2">{step.title}</h4>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full mt-12 lg:mt-0 relative perspective-1000 pl-4 sm:pl-10">
                <div className="relative">
                  {/* Glowing 3D backdrop */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotateZ: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-teal-200/20 rounded-[3rem] blur-3xl z-0"
                  />

                  {/* Floating Main Image Container */}
                  <motion.div
                    animate={{ y: [-15, 15, -15], rotateY: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="relative z-10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1600"
                      alt="Professional food service kitchen in operation"
                      className="rounded-[3rem] shadow-2xl w-full object-cover h-[500px] lg:h-[650px] border-[8px] border-white/80"
                    />

                    {/* Glassmorphism 3D Floating Badge 1 - Bottom Left */}
                    <motion.div
                      animate={{ y: [10, -10, 10], z: [30, 50, 30] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-10 -left-6 sm:-left-16 bg-white/70 backdrop-blur-xl border border-white p-5 sm:p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex items-center gap-4 max-w-[320px]"
                    >
                      <div className="bg-gradient-to-br from-primary to-emerald-300 p-4 rounded-2xl shadow-lg shrink-0">
                        <ShieldCheck className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-dark font-display font-extrabold text-lg leading-tight tracking-wide">100% Code<br />Compliant</p>
                      </div>
                    </motion.div>

                    {/* Glassmorphism 3D Floating Badge 2 - Top Right */}
                    <motion.div
                      animate={{ y: [-8, 8, -8], z: [20, 40, 20] }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2.5 }}
                      className="absolute top-16 -right-4 sm:-right-8 bg-dark/95 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4"
                    >
                      <div className="relative flex h-3 w-3 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </div>
                      <p className="text-white font-bold tracking-widest uppercase text-sm">Rapid Dispatch</p>
                    </motion.div>

                    {/* Decorative Spinning Geo-Rings */}
                    <motion.div
                      animate={{ rotateZ: 360 }}
                      transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                      className="absolute -inset-8 rounded-[4rem] border-2 border-primary/20 pointer-events-none -z-10 border-dashed"
                    />
                    <motion.div
                      animate={{ rotateZ: -360 }}
                      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                      className="absolute -inset-12 rounded-[5rem] border border-primary/10 pointer-events-none -z-10"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6.5 Our Work / Before and After */}
        <section id="work" className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Proven Results</h2>
              <h3 className="font-display text-4xl font-bold text-dark mb-6">See the Difference We Make</h3>
              <p className="text-slate-600 text-lg">Swipe on the images below to see the astonishing transformation our deep cleaning and hydro jetting services provide.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <BeforeAfterSlider
                before="/Calgary Grease Interceptor Services 10.jpg"
                after="/Calgary Grease Interceptor Services 12.jpg"
                labelBefore="Before Cleaning"
                labelAfter="After Service"
              />
              <BeforeAfterSlider
                before="/Calgary Grease Interceptor Services 6.jpg"
                after="/Calgary Grease Interceptor Services 5.jpg"
                labelBefore="Heavy Buildup"
                labelAfter="Lines Cleared"
              />
              <BeforeAfterSlider
                before="/Calgary Grease Interceptor Services 4.jpg"
                after="/Calgary Grease Interceptor Services 3.jpg"
                labelBefore="Blocked Interceptor"
                labelAfter="Fully Restored"
              />
            </div>
          </div>
        </section>

        {/* 7. About */}
        <section id="about" className="py-24 bg-[#0B1120] text-white relative overflow-hidden perspective-1000">
          {/* Animated 3D Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotateZ: 360, scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]"
            />
            <motion.div
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
              className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[80px]"
            />
            {/* Geometric Grid Lines overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left Side: 3D Image Presentation */}
              <div className="order-2 lg:order-1 relative">
                <motion.div
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative perspective-1000"
                >
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <img
                      src="/Calgary Grease Interceptor Services 7.jpg"
                      alt="Industrial facility operations"
                      className="rounded-3xl h-[250px] sm:h-[300px] w-full object-cover border-[6px] border-[#1E293B] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2"
                    />
                    <img
                      src="/Calgary Grease Interceptor Services 8.jpg"
                      alt="Professional equipment and services"
                      className="rounded-3xl h-[250px] sm:h-[300px] w-full object-cover mt-12 border-[6px] border-[#1E293B] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-2"
                    />
                  </div>

                  {/* 3D Glassmorphism Float Badge */}
                  <motion.div
                    animate={{ y: [0, -15, 0], rotateZ: [-2, 2, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-8 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20 w-48 h-48 flex items-center justify-center flex-col text-center z-20"
                    style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
                  >
                    <div className="bg-gradient-to-br from-primary to-emerald-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-inner blur-[0.5px]">
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-bold text-xs tracking-[0.2em] text-white uppercase">Calgary<br />Trusted</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Side: Professional Copy & Metrics */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-primary font-bold tracking-wider uppercase text-xs">Industry Leader</span>
                  </div>

                  <h3 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">Elite Commercial Infrastructure Management</h3>

                  <p className="text-slate-400 text-lg mb-6 leading-relaxed font-light">
                    Founded and directed by Colin Chisholm, {COMPANY_NAME} represents the pinnacle of commercial plumbing and grease interceptor maintenance in Alberta.
                  </p>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                    We recognize that any disruption to a high-volume commercial kitchen results in catastrophic revenue loss. Our mandate is simple: eliminate infrastructural liabilities entirely. We absorb the operational stress of grease trap maintenance and municipal compliance, ensuring your facility remains uninterrupted, efficient, and thoroughly compliant.
                  </p>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h5 className="font-display font-bold text-3xl text-white">24/7</h5>
                      </div>
                      <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Emergency Response</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h5 className="font-display font-bold text-3xl text-white">100%</h5>
                      </div>
                      <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Audit Compliant</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. Reviews */}
        <section id="reviews" className="py-24 bg-slate-50 relative overflow-hidden perspective-1000">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#10B981 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Real Testimonials</h2>
              <h3 className="font-display text-4xl font-bold text-dark mb-6">What Our Clients Output</h3>
              <p className="text-slate-600 text-lg flex items-center justify-center gap-2">
                <span className="font-bold text-dark text-xl">4.8</span>
                <span className="flex text-amber-400"><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /><Star fill="currentColor" className="w-5 h-5" /></span>
                <span>(27 Google Reviews)</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Kevin W.",
                  area: "Calgary",
                  svc: "Grease Trap Replacement",
                  text: "We had Colin take care of a large in floor grease interceptor we were replacing in a restaurant, he was professional, prompt, and provided excellent value to us. We refer him to anyone who inquires about grease trap cleaning.",
                  avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUolkxCuHohJk37qmkWhu_y-4TN-X5CWxcb_PyQpVP4EfBce766vA=w72-h72-p-rp-mo-ba3-br100"
                },
                {
                  name: "Sohail B.",
                  area: "NW Calgary",
                  svc: "Routine Maintenance",
                  text: "Colin and his team is the best. They proof to be always very reliable and very professional. We have been with them for almost 2 years, I have recommended his company to many of my co-owners and will continue to recommend him.",
                  avatar: "https://lh3.googleusercontent.com/a/ACg8ocLpyyU8qsdHlGzSA7XU8pxGANX3uoDYkYTk8hZsrPqdNYWRtg=w72-h72-p-rp-mo-ba3-br100"
                },
                {
                  name: "Martin V.",
                  area: "Rural Calgary",
                  svc: "Emergency Cleaning",
                  text: "Colin and his team are an absolute pleasure to work with. They are prompt, efficient, affordable and give great customer service. I called yesterday and they came out to my rural location next day and did some very good work.",
                  avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWirEbXs4LC0dqe1QHJXEl3EAH1jDZxv--bQaqcxZbtrbfwAhiZ=w144-h144-p-rp-mo-ba2-br100"
                }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -15, scale: 1.02, rotateX: 2 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-300 relative mt-8"
                >
                  <div className="absolute -top-8 left-8 shadow-xl rounded-full overflow-hidden border-4 border-white bg-white w-16 h-16" style={{ transform: "translateZ(30px)" }}>
                    <img src={review.avatar} alt={`${review.name} avatar`} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex text-amber-400 mb-6 pt-4" style={{ transform: "translateZ(10px)" }}>
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-currentColor" />)}
                  </div>

                  <p className="text-slate-700 italic mb-8 min-h-[120px] leading-relaxed relative z-10">"{review.text}"</p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-6" style={{ transform: "translateZ(20px)" }}>
                    <div>
                      <p className="font-bold text-dark">{review.name}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{review.area}</p>
                    </div>
                    <div className="text-xs font-semibold bg-emerald-50 text-primary py-1.5 px-3 rounded-full border border-emerald-100 shadow-sm">
                      {review.svc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CTA Banner */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">Need Immediate Service?</h2>
            <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">Blocked drains or overflowing grease traps can shut down your kitchen. We offer rapid emergency response.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                whileHover={{ y: -5, scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${PHONE_TEL}`}
                className="bg-dark text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-shadow group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Phone className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                <span style={{ transform: "translateZ(10px)" }}>Call {PHONE_DISPLAY} NOW</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.05, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="bg-white text-dark border-2 border-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span style={{ transform: "translateZ(10px)" }}>Book Maintenance</span>
              </motion.a>
            </div>
          </div>
        </section>

        {/* 10. Service Area */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Service Area</h2>
                <h3 className="font-display text-4xl font-bold text-dark mb-6">Serving the Greater Calgary Area</h3>
                <p className="text-slate-600 text-lg mb-8">Located at 136 Edgedale Way NW, we proudly serve commercial kitchens, restaurants, and facilities throughout Calgary and surrounding communities.</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['NW Calgary', 'NE Calgary', 'SW Calgary', 'SE Calgary', 'Airdrie', 'Cochrane', 'Chestermere', 'Okotoks'].map(tag => (
                    <span key={tag} className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full font-medium text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <MapPin className="w-8 h-8 text-primary shrink-0" />
                  <p className="font-medium text-slate-800">
                    <span className="block font-bold mb-1">Our Location</span>
                    {ADDRESS}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, rotateX: -2, rotateY: -2 }}
                style={{ transformStyle: "preserve-3d" }}
                className="h-[500px] w-full bg-slate-100 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow border-8 border-white perspective-1000"
              >
                <div className="w-full h-full" style={{ transform: "translateZ(20px)" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.5767234589944!2d-114.1551095!3d51.1162693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537169da55111afd%3A0x958ff720cc7a8873!2sCalgary%20Grease%20Interceptor%20Services!5e0!3m2!1sen!2sbd!4v1772939255453!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Calgary Grease Interceptor Services Location"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Questions?</h2>
              <h3 className="font-display text-4xl font-bold text-dark">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4">
              {[
                { q: "How often should my grease trap be cleaned?", a: "Bylaw typically requires cleaning when FOG (Fats, Oils, and Grease) and solids reach 25% of the trap's total liquid depth. For most busy restaurants, this means service every 4 to 8 weeks." },
                { q: "Do you submit compliance reports to the City of Calgary?", a: "Yes. After cleaning, we provide proper manifests and can help ensure your business remains fully compliant with Calgary's wastewater bylaws." },
                { q: "Are you available for after-hours service?", a: "Absolutely. We offer 24/7 service so we can clean your traps or fix drain issues outside of your regular business hours, minimizing disruption." },
                { q: "What is hydro jetting?", a: "Hydro jetting uses high-pressure water streams to blast away severe grease buildup inside pipes. It doesn't just poke a hole through a clog; it cleans the entire pipe wall." },
                { q: "Can you fix the foul smell coming from my kitchen drains?", a: "Yes. Odors are usually caused by rotting food and grease stuck in the trap or pipes. A thorough cleaning or jetting usually resolves the issue entirely." },
                { q: "What sizes of grease interceptors do you service?", a: "All sizes. From small under-sink units to massive underground concrete exterior interceptors." }
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer min-h-[44px] font-bold text-lg text-dark">
                    {faq.q}
                    <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
                      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Contact */}
        <section id="contact" className="py-24 bg-slate-50 relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Get in Touch</h2>
                <h3 className="font-display text-4xl font-bold text-dark mb-6">Ready to Book Your Service?</h3>
                <p className="text-slate-600 text-lg mb-10">Fill out the form to request a free quote or schedule service. For emergencies, please call us directly for immediate assistance.</p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us 24/7</p>
                      <a href={`tel:${PHONE_TEL} `} className="font-display font-bold text-2xl text-dark hover:text-primary transition-colors">{PHONE_DISPLAY}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                      <a href={`mailto:${EMAIL} `} className="font-display font-bold text-xl text-dark hover:text-primary transition-colors break-all">{EMAIL}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                      <address className="not-italic font-display font-bold text-xl text-dark">
                        {ADDRESS}
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Footer */}
      <footer role="contentinfo" className="bg-dark pt-20 pb-10 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <img src="/cgis-logo.png" alt="Logo" className="h-16 w-auto mb-6 bg-white p-2 rounded-lg" loading="lazy" />
              <p className="text-slate-400 mb-6 font-medium">Calgary's trusted experts in commercial grease interceptor cleaning and hydro jetting services.</p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/calgarygreaseinterceptorservices/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer" aria-label="Facebook">
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer" aria-label="Instagram">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg text-white mb-6">Our Services</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer min-h-[44px]"><ArrowRight className="w-4 h-4" aria-hidden="true" /> Grease Trap Cleaning</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer min-h-[44px]"><ArrowRight className="w-4 h-4" aria-hidden="true" /> Trap Replacement</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer min-h-[44px]"><ArrowRight className="w-4 h-4" aria-hidden="true" /> Hydro Jetting</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer min-h-[44px]"><ArrowRight className="w-4 h-4" aria-hidden="true" /> Drain Cleaning</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#process" className="hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">How We Work</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">About Us</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">Client Reviews</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-white mb-6">Contact Us</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{ADDRESS}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <a href={`tel:${PHONE_TEL} `} className="hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">{PHONE_DISPLAY}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <a href={`mailto:${EMAIL} `} className="hover:text-primary transition-colors break-all cursor-pointer min-h-[44px] flex items-center" title={EMAIL}>{EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors cursor-pointer min-h-[44px] flex items-center">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer min-h-[44px] flex items-center">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
