import React from 'react';
import MotionReveal from './MotionReveal';
import { STATS } from '../data/restaurantData';

export const Stats = () => {
  return (
    <section id="stats" className="px-auto mt-32">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-25 max-w-7xl mx-auto">
        {STATS.map((stat, idx) => (
          <MotionReveal
            key={stat.number}
            delay={idx * 0.15}
            className="flex flex-col items-center text-center max-w-xs group"
          >
            <span className="text-6xl md:text-7xl font-urbanist font-light text-zinc-900 group-hover:text-orange-500 transition-colors duration-300">
              {stat.number}
            </span>
            <h3 className="text-xl font-medium mt-3 mb-2 font-urbanist text-zinc-900">
              {stat.title}
            </h3>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
              {stat.description}
            </p>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
};

export default Stats;

