import React from 'react';
import { Star } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { GUEST_AVATARS, RESTAURANT_INFO } from '../data/restaurantData';

export const Hero = ({ onOpenBooking }) => {
  const handleBooking = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.getElementById('booking-process');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex flex-col items-center min-h-screen justify-center bg-[url('/assets/heroBanner.png')] bg-cover bg-center bg-no-repeat px-4 pt-24 pb-16 overflow-hidden">
      {/* Subtle overlay gradient to ensure high contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <MotionReveal y={-20} delay={0.15}>
          <p className="text-orange-600 font-medium tracking-widest uppercase text-sm md:text-base">
            {RESTAURANT_INFO.tagline}
          </p>
        </MotionReveal>

        {/* Hero Title */}
        <MotionReveal delay={0.25}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium max-w-3xl text-center mt-5 font-urbanist text-balance text-zinc-900 leading-[1.12] tracking-tight">
            {RESTAURANT_INFO.heroHeading}
          </h1>
        </MotionReveal>

        {/* Hero Subtitle */}
        <MotionReveal delay={0.35}>
          <p className="text-zinc-600 max-w-md text-center mt-4 text-base md:text-lg leading-relaxed">
            {RESTAURANT_INFO.heroSubheading}
          </p>
        </MotionReveal>

        {/* Call to Action Button */}
        <MotionReveal delay={0.45}>
          <button
            onClick={handleBooking}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3.5 mt-8 rounded-full inline-block transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-base"
          >
            Book a table
          </button>
        </MotionReveal>

        {/* Guest Avatars and Social Proof Rating */}
        <MotionReveal delay={0.55} className="flex items-center justify-center mt-9">
          <div className="flex items-center">
            <div className="flex -space-x-3 pr-3.5">
              {GUEST_AVATARS.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt={`Savoria dining guest ${idx + 1}`}
                  className="size-10 border-2 border-white rounded-full object-cover shadow-xs hover:-translate-y-1 transition-transform duration-200"
                />
              ))}
            </div>

            <div className="text-left">
              <div className="flex items-center gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-zinc-800 text-xs md:text-sm font-medium">
                {RESTAURANT_INFO.ratingText}
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Hero;

