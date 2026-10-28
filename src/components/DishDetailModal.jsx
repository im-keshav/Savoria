import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Flame, Sparkles, Check } from 'lucide-react';

export const DishDetailModal = ({ dish, onClose, onAddToOrder, isAdded }) => {
  if (!dish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden z-10 border border-slate-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/5 hover:bg-black/10 text-zinc-800 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close dish preview"
          >
            <X className="size-5" />
          </button>

          {/* Dish Image Stage */}
          <div className="relative bg-gradient-to-b from-orange-50/50 to-white pt-8 pb-4 flex justify-center items-center">
            <motion.img
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              src={dish.img}
              alt={dish.title}
              className="size-48 md:size-56 object-cover drop-shadow-xl"
            />
            {dish.badge && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {dish.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 pt-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-medium text-orange-600 tracking-wider">
                  {dish.category}
                </span>
                <h3 className="text-2xl font-urbanist font-medium text-zinc-900 mt-0.5">
                  {dish.title}
                </h3>
              </div>
              <span className="text-2xl font-urbanist font-semibold text-orange-500">
                {dish.price}
              </span>
            </div>

            <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
              {dish.description}
            </p>

            {/* Quick Specs */}
            <div className="flex items-center gap-6 mt-5 py-3 border-y border-slate-100 text-xs text-zinc-600">
              {dish.prepTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4 text-orange-500" />
                  <span>Prep: {dish.prepTime}</span>
                </div>
              )}
              {dish.calories && (
                <div className="flex items-center gap-1.5">
                  <Flame className="size-4 text-orange-500" />
                  <span>{dish.calories}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-orange-500" />
                <span>House Recipe</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-zinc-700 hover:bg-slate-50 font-medium text-sm transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => onAddToOrder(dish)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="size-4" /> Added to Order
                  </>
                ) : (
                  <>Add to Table Order</>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DishDetailModal;

