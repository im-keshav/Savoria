import React, { useState } from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter, Youtube, Send, Check } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { FOOTER_QUICK_LINKS, FOOTER_SITEMAP, RESTAURANT_INFO } from '../data/restaurantData';
import Logo from './Logo';

const SOCIAL_LINKS = [
  { icon: <Instagram className="size-4 text-zinc-700" />, href: '#', label: 'Instagram' },
  { icon: <Facebook className="size-4 text-zinc-700" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="size-4 text-zinc-700" />, href: '#', label: 'Twitter' },
  { icon: <Youtube className="size-4 text-zinc-700" />, href: '#', label: 'YouTube' }
];

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const list = JSON.parse(localStorage.getItem('savoria_newsletter') || '[]');
      list.push({ email, date: new Date().toISOString() });
      localStorage.setItem('savoria_newsletter', JSON.stringify(list));
    } catch {
      // ignore
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative mt-24 md:mt-40 overflow-hidden bg-white border-t border-slate-100 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto relative z-10 pt-12 md:pt-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 pb-8">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <MotionReveal>
              <a href="#" className="inline-block">
                <Logo size="default" />
              </a>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="mt-3.5 text-xs sm:text-sm text-zinc-600 max-w-sm leading-relaxed">
                Serving freshly prepared dishes with authentic flavors, premium ingredients and exceptional hospitality every day.
              </p>
            </MotionReveal>

            {/* Quick Contact Pills for Mobile & Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 w-full max-w-sm">
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200/80 transition-colors group"
              >
                <div className="size-7 rounded-lg bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="size-3.5" />
                </div>
                <span className="text-xs text-zinc-700 group-hover:text-orange-600 truncate font-medium">
                  {RESTAURANT_INFO.email}
                </span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200/80 transition-colors group"
              >
                <div className="size-7 rounded-lg bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="size-3.5" />
                </div>
                <span className="text-xs text-zinc-700 group-hover:text-orange-600 font-medium">
                  {RESTAURANT_INFO.phone}
                </span>
              </a>
            </div>

            {/* Newsletter inline signup */}
            <MotionReveal delay={0.15} className="mt-5 w-full max-w-sm">
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter email for culinary updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 text-xs rounded-full border border-slate-200 w-full focus:outline-none focus:border-orange-500 bg-slate-50/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full shrink-0 shadow-xs transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="size-3.5" /> : <Send className="size-3.5" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-green-600 mt-1 font-medium">✓ Subscribed to Savoria VIP list!</p>
              )}
            </MotionReveal>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-5">
              {SOCIAL_LINKS.map((soc, idx) => (
                <MotionReveal key={idx} delay={idx * 0.04}>
                  <a
                    href={soc.href}
                    aria-label={soc.label}
                    className="size-8 rounded-full border border-slate-200 hover:border-orange-500 hover:bg-orange-50 grid place-content-center transition-colors"
                  >
                    {soc.icon}
                  </a>
                </MotionReveal>
              ))}
            </div>
          </div>

          {/* Clean 2-column Navigation on Mobile */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-2 text-left">
            {/* Quick Links */}
            <div>
              <p className="font-bold font-urbanist text-zinc-900 mb-3 text-sm tracking-wide">
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {FOOTER_QUICK_LINKS.map((link, idx) => (
                  <MotionReveal key={link.name} delay={idx * 0.03}>
                    <a
                      href={link.href}
                      className="text-zinc-600 hover:text-orange-500 text-xs sm:text-sm transition-colors block py-0.5"
                    >
                      {link.name}
                    </a>
                  </MotionReveal>
                ))}
              </div>
            </div>

            {/* Sitemap & Policies */}
            <div>
              <p className="font-bold font-urbanist text-zinc-900 mb-3 text-sm tracking-wide">
                Sitemap
              </p>
              <div className="flex flex-col gap-2">
                {FOOTER_SITEMAP.map((item, idx) => (
                  <MotionReveal key={item.name} delay={idx * 0.03}>
                    <a
                      href={item.href}
                      className="text-zinc-600 hover:text-orange-500 text-xs sm:text-sm transition-colors block py-0.5"
                    >
                      {item.name}
                    </a>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Operating Hours summary */}
          <div className="text-left">
            <p className="font-bold font-urbanist text-zinc-900 mb-3 text-sm tracking-wide">
              Visiting Hours
            </p>
            <div className="text-xs text-zinc-600 space-y-2">
              <p className="flex justify-between border-b border-slate-100 pb-1">
                <span>Mon, Wed:</span>
                <strong className="text-zinc-800">10 AM – 9 PM</strong>
              </p>
              <p className="flex justify-between border-b border-slate-100 pb-1">
                <span>Tue, Thu, Sat:</span>
                <strong className="text-zinc-800">10/11 AM – 10 PM</strong>
              </p>
              <p className="flex justify-between border-b border-slate-100 pb-1">
                <span>Friday:</span>
                <strong className="text-zinc-800">10 AM – 11 PM</strong>
              </p>
              <p className="flex justify-between pb-0.5">
                <span>Sunday:</span>
                <strong className="text-zinc-800">12 PM – 9 PM</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Big Name in Footer - Refined Proportions & Positioned Lower */}
        <div className="w-full text-center select-none pointer-events-none overflow-hidden pt-2 pb-0 mt-4 md:mt-6 -mb-3 md:-mb-5">
          <span className="font-urbanist font-black text-[11vw] sm:text-[11vw] md:text-[11.5vw] leading-none text-slate-100 md:text-slate-200/90 tracking-widest uppercase block whitespace-nowrap translate-y-1 md:translate-y-2">
            SAVOR<span className="text-orange-500/20">IA</span>
          </span>
        </div>

        {/* Bottom bar */}
        <div className="border-t text-zinc-400 border-slate-100 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© 2026 Savoria. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <span className="text-orange-500">♥</span>
            <span>for fine dining connoisseurs</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
