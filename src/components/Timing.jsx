import React from 'react';
import MotionReveal from './MotionReveal';
import { OPENING_HOURS } from '../data/restaurantData';

export const Timing = () => {
  return (
    <section id="timing" className="px-auto mt-44">
      <MotionReveal
        scale={0.85}
        y={0}
        className="w-full max-w-5xl h-162.5 rounded-3xl bg-cover bg-center flex items-center justify-center md:justify-start px-6 md:px-14 overflow-hidden mx-auto bg-[url('/assets/restro-timing.png')] shadow-2xl relative"
      >
        {/* Hours Card */}
        <div className="bg-white rounded-3xl p-8 w-full max-w-xs shadow-xl relative z-10">
          <MotionReveal delay={0.2}>
            <h3 className="text-xl mb-8 font-medium font-urbanist text-zinc-900 border-b pb-4 border-slate-100">
              Opening time:
            </h3>
          </MotionReveal>

          <div className="space-y-6">
            {OPENING_HOURS.map((item, idx) => (
              <MotionReveal
                key={item.day}
                delay={idx * 0.08}
                className="flex justify-between items-center text-sm"
              >
                <span className="font-medium text-zinc-500">
                  {item.day}
                </span>
                <span
                  className={`font-medium ${
                    item.hours === 'Closed'
                      ? 'text-orange-500 font-semibold'
                      : 'text-zinc-800'
                  }`}
                >
                  {item.hours}
                </span>
              </MotionReveal>
            ))}
          </div>
        </div>
      </MotionReveal>
    </section>
  );
};

export default Timing;

