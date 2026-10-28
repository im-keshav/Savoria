import React from 'react';
import { Plus, Minus } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { FAQS } from '../data/restaurantData';

export const FAQ = () => {
  return (
    <section id="faq" className="px-auto mt-44">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <MotionReveal delay={0.15}>
            <p className="text-orange-500 font-medium uppercase tracking-wider text-sm mb-4">
              FAQs
            </p>
          </MotionReveal>
          <MotionReveal delay={0.25}>
            <h2 className="text-4xl md:text-5xl max-w-2xl mx-auto text-balance font-urbanist font-medium text-zinc-900 leading-tight">
              Frequently Asked Questions
            </h2>
          </MotionReveal>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => (
            <MotionReveal key={idx} y={60} delay={idx * 0.08}>
              <details className="border border-slate-200 text-zinc-600 rounded-xl group transition-all duration-200 open:border-orange-200 open:bg-orange-50/20">
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer list-none hover:bg-slate-50/60 transition-colors rounded-xl [&::-webkit-details-marker]:hidden select-none">
                  <span className="text-zinc-900 font-medium pr-4 text-base md:text-lg font-urbanist">
                    {faq.question}
                  </span>
                  <span className="size-8 rounded-full bg-black/5 group-open:bg-orange-500 group-open:text-white grid place-content-center shrink-0 transition-colors">
                    <Plus className="size-4 group-open:hidden text-zinc-600" />
                    <Minus className="size-4 hidden group-open:block" />
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-sm md:text-base text-zinc-600 pt-1 border-t border-slate-100 group-open:border-orange-100">
                  {faq.answer}
                </p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

