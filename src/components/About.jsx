import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const About = () => {
  return (
    <section id="about" className="px-auto mt-44">
      <div className="flex flex-col md:flex-row gap-14 md:gap-18 max-w-7xl mx-auto items-center">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <MotionReveal scale={0.85} y={0} className="w-full max-w-137">
            <div className="relative group overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/assets/about.png"
                alt="Savoria signature culinary dish"
                className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-3xl pointer-events-none" />
            </div>
          </MotionReveal>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          {/* Badge with decorative left and right ornamental icons */}
          <MotionReveal scale={0.8} y={0} className="flex items-center gap-2">
            <img src="/assets/iconL.png" alt="Ornament left" className="h-4 w-auto" />
            <span className="font-medium uppercase tracking-wider text-xs md:text-sm text-zinc-800">
              Crafted with Passion
            </span>
            <img src="/assets/iconR.png" alt="Ornament right" className="h-4 w-auto" />
          </MotionReveal>

          {/* Heading */}
          <MotionReveal delay={0.15}>
            <h2 className="mt-5 text-4xl md:text-5xl text-balance font-urbanist font-medium text-zinc-900 leading-tight">
              Experience dining beyond expectations
            </h2>
          </MotionReveal>

          {/* Paragraph */}
          <MotionReveal delay={0.25}>
            <p className="mt-4.5 text-zinc-600 max-w-md text-base leading-relaxed">
              We combine fresh local ingredients, creative recipes and elegant presentation to deliver a memorable experience with every visit. At Savoria, our culinary team is committed to reimagining classic recipes into sensory masterpieces.
            </p>
          </MotionReveal>

          {/* Location card pill */}
          <MotionReveal delay={0.35} className="mt-9">
            <div className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 pr-8 rounded-xl flex items-center gap-3.5 w-fit shadow-md hover:shadow-orange-500/20 transition-all duration-200">
              <img
                src="/assets/about.png"
                alt="Bistro Royale Location Preview"
                className="size-15 rounded-lg object-cover shrink-0 border border-white/20"
              />
              <div className="flex flex-col">
                <p className="font-medium text-base text-white flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {RESTAURANT_INFO.locationName}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.locationAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-100 hover:text-white flex items-center gap-0.5 underline underline-offset-2 transition-colors mt-0.5"
                >
                  View on Map
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};

export default About;

