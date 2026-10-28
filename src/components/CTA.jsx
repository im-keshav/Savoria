import React from 'react';
import { ArrowRight } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { CTA_FLOATING_DISHES } from '../data/restaurantData';

export const CTA = ({ onOpenBooking }) => {
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
    <section
      id="cta"
      className="relative overflow-hidden bg-orange-500 px-6 flex flex-col justify-center items-center min-h-100 md:min-h-110 mt-44 shadow-xl"
    >
      {/* Floating Dishes around the edges */}
      <div className="absolute inset-0 w-full max-w-7xl mx-auto pointer-events-none">
        {CTA_FLOATING_DISHES.map((dish, idx) => (
          <img
            key={idx}
            src={dish.src}
            alt={dish.alt}
            className={`absolute size-20 md:size-28 lg:size-35 rounded-full object-cover pointer-events-auto transition-transform duration-500 hover:scale-110 drop-shadow-2xl ${dish.className}`}
          />
        ))}
      </div>

      {/* Center Hero Banner */}
      <div className="relative z-10 text-center max-w-2xl mx-auto py-12">
        <MotionReveal>
          <h2 className="text-3xl md:text-5xl font-medium text-white font-urbanist text-balance leading-tight tracking-tight">
            Every Meal Is Made To Be Remembered
          </h2>
        </MotionReveal>

        <MotionReveal y={20} delay={0.2}>
          <p className="mt-4 text-white/95 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
            Join us for fresh ingredients, signature recipes and an unforgettable dining experience.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.3} className="flex items-center justify-center">
          <button
            onClick={handleBooking}
            className="flex items-center gap-3 bg-white text-zinc-900 pl-6 pr-2.5 py-2.5 rounded-full mt-6 transition-all duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-medium text-sm md:text-base group"
          >
            <span>Book Your Table</span>
            <span className="size-8 rounded-full bg-zinc-900 text-white grid place-content-center group-hover:bg-orange-600 transition-colors">
              <ArrowRight className="size-4" />
            </span>
          </button>
        </MotionReveal>
      </div>
    </section>
  );
};

export default CTA;

