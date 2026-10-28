import React from 'react';
import { Star, ArrowRight, MessageSquare, Heart, Clock } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { BOOKING_STEPS, FEATURED_TESTIMONIAL } from '../data/restaurantData';

export const BookingProcess = ({ onOpenBooking }) => {
  return (
    <section id="booking-process" className="px-auto mt-44">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-25 items-center">
        {/* Left Column: Heading & Featured Testimonial Quote */}
        <div className="flex flex-col text-center md:text-left">
          <MotionReveal delay={0.15}>
            <p className="text-orange-500 font-medium uppercase tracking-wider text-sm mb-4">
              Table Reservation Process
            </p>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <h2 className="text-4xl md:text-5xl mb-12 font-urbanist font-medium text-zinc-900 leading-tight">
              Reserve your table in three simple steps
            </h2>
          </MotionReveal>

          {/* Testimonial Quote Box */}
          <div className="bg-slate-50/80 p-6 md:p-8 rounded-3xl border border-slate-100 max-w-md max-md:mx-auto">
            <MotionReveal className="flex gap-0.5 mb-4 justify-center md:justify-start">
              {[...Array(FEATURED_TESTIMONIAL.rating)].map((_, i) => (
                <Star key={i} className="size-4 fill-orange-500 text-orange-500" />
              ))}
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="text-zinc-700 max-w-sm max-md:mx-auto mb-6 text-sm md:text-base leading-relaxed italic">
                "{FEATURED_TESTIMONIAL.quote}"
              </p>
            </MotionReveal>

            <MotionReveal className="flex items-center justify-center md:justify-start gap-3">
              <img
                src={FEATURED_TESTIMONIAL.authorImg}
                alt={FEATURED_TESTIMONIAL.authorName}
                className="size-12 rounded-full object-cover ring-2 ring-orange-500/30"
              />
              <div className="text-left">
                <span className="text-lg font-urbanist font-medium text-zinc-900 block">
                  {FEATURED_TESTIMONIAL.authorName}
                </span>
                <span className="text-xs text-zinc-500">Verified Dinner Guest</span>
              </div>
            </MotionReveal>
          </div>

          {/* Direct booking trigger button */}
          <MotionReveal delay={0.35} className="mt-8 flex justify-center md:justify-start">
            <button
              onClick={onOpenBooking}
              className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-full font-medium inline-flex items-center gap-2 shadow-md hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer text-base"
            >
              <span>Begin Online Reservation</span>
              <ArrowRight className="size-4" />
            </button>
          </MotionReveal>
        </div>

        {/* Right Column: Step-by-Step Guide */}
        <div className="space-y-10 text-left">
          {BOOKING_STEPS.map((step, idx) => (
            <MotionReveal
              key={idx}
              y={150}
              delay={idx * 0.15}
              className="flex items-start gap-8 group"
            >
              <span className="text-orange-500 font-medium text-xl shrink-0 font-urbanist group-hover:scale-110 transition-transform">
                {step.number}
              </span>
              <div className="flex flex-col">
                <h3 className="text-xl mb-2 font-urbanist font-medium text-zinc-900 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>

                {/* Badges preview for each step */}
                {idx === 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-100">
                      <Clock className="size-3" /> Lunch & Dinner Service
                    </span>
                    <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                      Live Seat Availability Check
                    </span>
                  </div>
                )}
                {idx === 1 && (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full border border-rose-100">
                      <Heart className="size-3" /> Romantic Date
                    </span>
                    <span className="text-[11px] font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-100">
                      🎂 Birthday & Anniversary Special
                    </span>
                    <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                      💼 Business Dining
                    </span>
                  </div>
                )}
                {idx === 2 && (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                      <MessageSquare className="size-3 text-emerald-600" /> Instant WhatsApp to Owner & Guest
                    </span>
                  </div>
                )}
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
