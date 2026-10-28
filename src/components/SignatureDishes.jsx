import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MotionReveal from './MotionReveal';
import DishDetailModal from './DishDetailModal';
import { SIGNATURE_DISHES } from '../data/restaurantData';

export const SignatureDishes = ({ onAddToOrder, orderItems = [] }) => {
  const [rotations, setRotations] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState(null);

  const categories = ['All', 'Pasta', 'Mains', 'Salads', 'Seafood'];

  const filteredDishes = activeCategory === 'All'
    ? SIGNATURE_DISHES
    : SIGNATURE_DISHES.filter((d) => d.category === activeCategory);

  const handleMouseEnter = (idx) => {
    setRotations((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 180
    }));
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  return (
    <section id="dishes" className="px-auto mt-44">
      {/* Header */}
      <div className="text-center mb-12">
        <MotionReveal delay={0.15}>
          <p className="text-orange-500 font-medium uppercase tracking-wider text-sm mb-3.5">
            Chef's Signature Selection
          </p>
        </MotionReveal>
        <MotionReveal delay={0.25}>
          <h2 className="text-4xl md:text-5xl max-w-lg mx-auto text-balance font-urbanist font-medium text-zinc-900 leading-tight">
            Discover our signature dishes
          </h2>
        </MotionReveal>

        {/* Filter categories */}
        <MotionReveal delay={0.35} className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-zinc-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </MotionReveal>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-18 max-w-5xl mx-auto">
        {filteredDishes.map((dish, idx) => {
          const isAdded = orderItems.some((item) => item.id === dish.id);
          return (
            <MotionReveal
              key={dish.id}
              y={80}
              delay={idx * 0.08}
              className="flex flex-col items-center text-center shrink-0 cursor-pointer group"
              onMouseEnter={() => handleMouseEnter(idx)}
              onClick={() => handleDishClick(dish)}
            >
              {/* Rotating dish container with Framer Motion spring physics */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: rotations[idx] || 0 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  className="transition-transform duration-300 group-hover:scale-105"
                >
                  <img
                    src={dish.img}
                    alt={dish.title}
                    className="size-30 md:size-35 object-cover drop-shadow-md"
                  />
                </motion.div>
                {isAdded && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    In Order
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <h3 className="mt-5 font-medium font-urbanist text-zinc-900 text-base md:text-lg group-hover:text-orange-500 transition-colors">
                {dish.title}
              </h3>
              <p className="mt-1 text-zinc-500 font-medium text-sm">
                {dish.price}
              </p>
            </MotionReveal>
          );
        })}
      </div>

      {/* Dish Quick Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToOrder={(dish) => {
          if (onAddToOrder) onAddToOrder(dish);
        }}
        isAdded={selectedDish && orderItems.some((item) => item.id === selectedDish.id)}
      />
    </section>
  );
};

export default SignatureDishes;

