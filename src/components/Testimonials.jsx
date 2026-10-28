import React from 'react';
import { Star } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { TESTIMONIALS } from '../data/restaurantData';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="px-auto mt-44">
      {/* Heading */}
      <div className="text-center mb-14">
        <MotionReveal delay={0.15}>
          <p className="text-orange-500 font-medium uppercase tracking-wider text-sm mb-4">
            Loved By Food Lovers
          </p>
        </MotionReveal>
        <MotionReveal delay={0.25}>
          <h2 className="text-4xl md:text-5xl max-w-lg mx-auto text-balance font-urbanist font-medium text-zinc-900 leading-tight">
            What Our Guests Say
          </h2>
        </MotionReveal>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {TESTIMONIALS.map((t, idx) => (
          <MotionReveal
            key={idx}
            y={80}
            delay={idx * 0.1}
            className="border border-slate-200 hover:border-orange-200 hover:bg-slate-50/60 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between text-left group hover:shadow-lg hover:shadow-slate-100"
          >
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-zinc-600 leading-relaxed mb-6 text-sm md:text-base">
                "{t.review}"
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-slate-100">
              <img
                src={t.avatar}
                alt={t.name}
                className="size-11 rounded-full object-cover shrink-0 ring-1 ring-slate-200 group-hover:ring-orange-300 transition-all"
              />
              <div>
                <p className="font-medium text-zinc-900 leading-tight mb-0.5 font-urbanist text-base">
                  {t.name}
                </p>
                <p className="text-zinc-500 text-xs">
                  {t.location}
                </p>
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

