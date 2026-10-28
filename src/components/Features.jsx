import React from 'react';
import { ChefHat, Leaf, Heart } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { FEATURES } from '../data/restaurantData';

const ICON_MAP = {
  ChefHat: ChefHat,
  Leaf: Leaf,
  Heart: Heart
};

export const Features = () => {
  return (
    <section id="features" className="px-auto mt-44">
      {/* Header */}
      <div className="text-center mb-16">
        <MotionReveal delay={0.15}>
          <p className="text-orange-500 font-medium uppercase tracking-wider text-sm mb-3.5">
            What Sets Us Apart
          </p>
        </MotionReveal>
        <MotionReveal delay={0.25}>
          <h2 className="text-4xl md:text-5xl max-w-lg mx-auto text-balance font-urbanist font-medium text-zinc-900 leading-tight">
            Crafting memorable dining experiences
          </h2>
        </MotionReveal>
      </div>

      {/* Main 2-column showcase */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-14 max-w-7xl mx-auto">
        {/* Features List */}
        <div className="space-y-10 max-w-md w-full">
          {FEATURES.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || ChefHat;
            return (
              <MotionReveal
                key={idx}
                y={150}
                delay={idx * 0.15}
                className="flex items-start gap-4 text-left group"
              >
                <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-100 transition-colors">
                  <IconComponent className="text-orange-500 size-5" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 font-urbanist font-medium text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 max-w-sm text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* Chef Image */}
        <div className="w-full md:w-auto flex justify-center">
          <MotionReveal x={50} y={0}>
            <div className="relative group overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/assets/chef.png"
                alt="Executive Chef"
                className="w-full max-w-sm h-111 object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-medium uppercase tracking-wider text-orange-400">Master Culinary Director</p>
                  <p className="text-xl font-urbanist font-semibold">Chef Laurent Rossi</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};

export default Features;

