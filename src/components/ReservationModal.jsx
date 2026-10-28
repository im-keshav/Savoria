import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Heart,
  Cake,
  Briefcase,
  Utensils,
  Sun,
  Moon,
  MessageSquare,
  PhoneCall,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Logo from './Logo';
import {
  RESTAURANT_INFO,
  DAILY_SCHEDULES,
  DINING_OCCASIONS
} from '../data/restaurantData';

const OCCASION_ICONS = {
  Heart: Heart,
  Cake: Cake,
  Sparkles: Sparkles,
  Briefcase: Briefcase,
  Users: Users,
  Utensils: Utensils
};

const getDayName = (dateStr) => {
  if (!dateStr) return 'Monday';
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
};

export const ReservationModal = ({ isOpen, onClose, selectedDishes = [] }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Initialize with today's date
  const defaultDate = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const [formData, setFormData] = useState({
    date: defaultDate,
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequest: ''
  });

  // Calculate day and daily schedule from selected date
  const currentDayName = useMemo(() => getDayName(formData.date), [formData.date]);
  const currentSchedule = useMemo(() => DAILY_SCHEDULES[currentDayName] || DAILY_SCHEDULES.Monday, [currentDayName]);

  // Meal service selection (Lunch vs Dinner)
  const [activeMealTab, setActiveMealTab] = useState('Dinner');
  
  // Selected time slot
  const [selectedSlot, setSelectedSlot] = useState(() => {
    const sched = DAILY_SCHEDULES[getDayName(defaultDate)] || DAILY_SCHEDULES.Saturday;
    return sched.dinner[0] || sched.lunch[0] || { time: '07:30 PM', status: 'available' };
  });

  // Occasions
  const [selectedOccasion, setSelectedOccasion] = useState(DINING_OCCASIONS[0]);
  const [occasionMessage, setOccasionMessage] = useState('');
  const [surpriseCake, setSurpriseCake] = useState(false);
  const [rosePetals, setRosePetals] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'date') {
      const newDay = getDayName(value);
      const sched = DAILY_SCHEDULES[newDay];
      if (sched && !sched.isClosed) {
        const slots = activeMealTab === 'Dinner' ? sched.dinner : sched.lunch;
        const firstAvail = slots.find((s) => s.status !== 'full') || slots[0];
        if (firstAvail) setSelectedSlot(firstAvail);
      }
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleMealTabChange = (tab) => {
    setActiveMealTab(tab);
    const slots = tab === 'Dinner' ? currentSchedule.dinner : currentSchedule.lunch;
    if (slots && slots.length > 0) {
      const firstAvail = slots.find((s) => s.status !== 'full') || slots[0];
      setSelectedSlot(firstAvail);
    }
  };

  // WhatsApp formatted receipt
  const generateWhatsAppMessage = (booking, recipient = 'owner') => {
    const addOns = [];
    if (rosePetals) addOns.push('🌹 Rose Petals & Candlelight');
    if (surpriseCake) addOns.push('🎂 Celebration Sparkler Cake');

    const dishesText = selectedDishes.length > 0 
      ? `\n🍽️ *Pre-selected Dishes:* ${selectedDishes.map((d) => d.title).join(', ')}`
      : '';

    const greeting = recipient === 'owner'
      ? `🔔 *NEW SAVORIA TABLE BOOKING* (Owner Alert)`
      : `🍽️ *SAVORIA RESTAURANT - RESERVATION CONFIRMED* (Guest Receipt)`;

    return (
`${greeting}
━━━━━━━━━━━━━━━━━━━━
📋 *Booking Ref:* ${booking.id}
👤 *Guest Name:* ${booking.name}
📱 *WhatsApp:* ${booking.phone || 'Not provided'}
📧 *Email:* ${booking.email}
━━━━━━━━━━━━━━━━━━━━
📅 *Date:* ${booking.date} (${booking.day})
⏰ *Reserved Time:* ${booking.meal} Service • ${booking.time}
👥 *Party Size:* ${booking.guests} Guests
━━━━━━━━━━━━━━━━━━━━
✨ *Occasion:* ${booking.occasion}
${occasionMessage ? `💌 *Table Greeting:* "${occasionMessage}"\n` : ''}${addOns.length > 0 ? `🎁 *Add-ons:* ${addOns.join(', ')}\n` : ''}${booking.specialRequest ? `📝 *Special Notes:* ${booking.specialRequest}\n` : ''}${dishesText}
━━━━━━━━━━━━━━━━━━━━
📍 *Restaurant:* Savoria Bistro, 42 Grand Avenue, NY
📞 *Concierge:* ${RESTAURANT_INFO.phone}
🌟 *Status:* Confirmed & Table Reserved`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      day: currentDayName,
      hours: currentSchedule.hoursText,
      meal: activeMealTab,
      time: selectedSlot.time,
      occasion: selectedOccasion.title,
      occasionDetails: occasionMessage,
      addOns: { rosePetals, surpriseCake },
      preSelectedDishes: selectedDishes.map((d) => d.title),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save locally in browser storage
    try {
      const existing = JSON.parse(localStorage.getItem('savoria_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('savoria_bookings', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // ignore
    }

    setBookingConfirmed(newBooking);
    setLoading(false);
    setStep(4);
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const openWhatsApp = (target) => {
    if (!bookingConfirmed) return;
    const msg = generateWhatsAppMessage(bookingConfirmed, target);
    const encoded = encodeURIComponent(msg);

    if (target === 'owner') {
      const ownerNumber = RESTAURANT_INFO.ownerWhatsApp.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${ownerNumber}?text=${encoded}`, '_blank');
    } else {
      const clientNumber = (formData.phone || '').replace(/[^0-9]/g, '');
      if (clientNumber) {
        window.open(`https://wa.me/${clientNumber}?text=${encoded}`, '_blank');
      } else {
        window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
      }
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setBookingConfirmed(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog: Mobile Bottom Sheet + Desktop Centered Card with Fixed Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl w-full sm:max-w-xl max-h-[92dvh] sm:max-h-[88vh] z-10 flex flex-col border border-slate-100 overflow-hidden"
        >
          {/* Mobile Drag Indicator Handle */}
          <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

          {/* 1. Header (Fixed top) */}
          <div className="px-5 pt-3 sm:pt-5 pb-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <Logo size="default" />
              <div className="border-l border-slate-200 pl-2.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Table Reservation
                </span>
                <h3 className="text-xs sm:text-sm font-urbanist font-bold text-zinc-900 leading-tight">
                  {step === 1 && '1. Choose Date & Time'}
                  {step === 2 && '2. Choose Occasion'}
                  {step === 3 && '3. Guest Details'}
                  {step === 4 && '4. Reservation Confirmed!'}
                </h3>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="size-8 rounded-full hover:bg-slate-100 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* 2. Stepper Indicator (Fixed) */}
          <div className="px-5 py-2.5 bg-slate-50/60 border-b border-slate-100/80 flex items-center justify-between shrink-0">
            {[
              { num: 1, label: 'Date & Time' },
              { num: 2, label: 'Occasion' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Confirmed' }
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-1.5">
                  <div
                    className={`size-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-orange-500 text-white ring-2 ring-orange-200'
                        : 'bg-slate-200 text-zinc-400'
                    }`}
                  >
                    {isPast ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline ${
                      isActive ? 'text-zinc-900 font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              STEP 1: DATE, GUESTS & TIME SLOTS
             ========================================================================= */}
          {step === 1 && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4">
                {/* Date & Guests Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1 flex items-center gap-1">
                      <Calendar className="size-3 text-orange-500" />
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 font-medium bg-slate-50/40"
                      required
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      {currentDayName}: {currentSchedule.hoursText}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1 flex items-center gap-1">
                      <Users className="size-3 text-orange-500" />
                      Guests (Party Size)
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 font-medium bg-slate-50/40 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Dedicated table seating reserved
                    </p>
                  </div>
                </div>

                {/* Service Selector & Time Slots */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wide">
                      Select Dining Service
                    </span>
                    
                    {/* Meal Toggle */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg">
                      <button
                        type="button"
                        onClick={() => handleMealTabChange('Lunch')}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          activeMealTab === 'Lunch'
                            ? 'bg-white text-zinc-900 shadow-xs font-bold'
                            : 'text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        <Sun className="size-3 text-orange-500" />
                        <span>Lunch</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMealTabChange('Dinner')}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          activeMealTab === 'Dinner'
                            ? 'bg-white text-zinc-900 shadow-xs font-bold'
                            : 'text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        <Moon className="size-3 text-orange-500" />
                        <span>Dinner</span>
                      </button>
                    </div>
                  </div>

                  {/* Responsive Time Chips Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {(activeMealTab === 'Dinner' ? currentSchedule.dinner : currentSchedule.lunch).map((slot) => {
                      const isSelected = selectedSlot.time === slot.time;
                      const isFull = slot.status === 'full';
                      const isFast = slot.status === 'fast';

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={isFull}
                          onClick={() => handleSelectSlot(slot)}
                          className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                            isFull
                              ? 'bg-slate-50 border-slate-200 text-zinc-300 cursor-not-allowed line-through'
                              : isSelected
                              ? 'border-orange-500 bg-orange-500 text-white font-bold shadow-xs'
                              : 'border-slate-200 hover:border-orange-300 text-zinc-800 hover:bg-orange-50/20'
                          }`}
                        >
                          <span className="font-urbanist font-bold text-xs sm:text-sm block">
                            {slot.time}
                          </span>
                          <span
                            className={`text-[9px] block ${
                              isSelected
                                ? 'text-white/90'
                                : isFull
                                ? 'text-zinc-300'
                                : isFast
                                ? 'text-amber-600 font-semibold'
                                : 'text-emerald-600'
                            }`}
                          >
                            {isFull ? 'Full' : isFast ? 'Filling fast' : 'Available'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Summary Bar */}
                  <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-zinc-600 text-[11px] truncate mr-2">
                      Selected: <strong className="text-zinc-900 font-bold">{formData.date} • {activeMealTab} at {selectedSlot.time}</strong>
                    </span>
                    <span className="text-emerald-600 font-semibold text-[11px] flex items-center gap-1 shrink-0">
                      <Check className="size-3" /> Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Sticky Bottom Action Bar (Always Visible on Mobile & Desktop) */}
              <div className="px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-between shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                <div className="text-xs text-zinc-500 hidden sm:block">
                  Step 1 of 3: Date & Time Selection
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-orange-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Occasion</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 2: OCCASION SELECTION
             ========================================================================= */}
          {step === 2 && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wide">
                      Choose Dining Occasion
                    </label>
                    <span className="text-[10px] text-zinc-400">
                      Complimentary hospitality
                    </span>
                  </div>

                  {/* 3x2 Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {DINING_OCCASIONS.map((occ) => {
                      const isSelected = selectedOccasion.id === occ.id;
                      const Icon = OCCASION_ICONS[occ.icon] || Heart;
                      const cleanTitle = occ.title
                        .replace(' Candlelight Date', ' Date')
                        .replace(' & Meetings', '');

                      return (
                        <button
                          key={occ.id}
                          type="button"
                          onClick={() => setSelectedOccasion(occ)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[58px] ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50/80 text-orange-950 ring-2 ring-orange-500/20 shadow-xs'
                              : 'border-slate-200/90 hover:border-orange-200 bg-white text-zinc-700 hover:bg-slate-50/60'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className={`size-5 rounded-md flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-zinc-600'
                            }`}>
                              <Icon className="size-3" />
                            </div>
                            {isSelected && (
                              <span className="size-3.5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="mt-1">
                            <span className="font-urbanist font-bold text-xs truncate block text-zinc-900 leading-tight">
                              {cleanTitle}
                            </span>
                            <span className={`text-[9px] block truncate ${isSelected ? 'text-orange-600 font-semibold' : 'text-zinc-400'}`}>
                              {occ.badge}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Complimentary Perk Highlight */}
                <div className="bg-orange-50/80 border border-orange-200/80 px-3 py-2 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-6 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Sparkles className="size-3" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-urbanist font-bold text-zinc-900 text-xs truncate">
                          {selectedOccasion.title}
                        </span>
                        <span className="text-orange-700 font-bold text-[9px] uppercase tracking-wider bg-orange-100/90 px-1.5 py-0.2 rounded-md shrink-0">
                          Included
                        </span>
                      </div>
                      <p className="text-zinc-600 text-[10px] sm:text-[11px] truncate">
                        {selectedOccasion.complimentary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <span className="block text-[11px] font-bold text-zinc-600 uppercase mb-1.5">
                    Experience Add-Ons (Optional)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRosePetals(!rosePetals)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        rosePetals
                          ? 'border-orange-500 bg-orange-500 text-white shadow-xs font-semibold'
                          : 'border-slate-200 text-zinc-700 hover:bg-slate-50 bg-white'
                      }`}
                    >
                      <span className="truncate">🌹 Rose Petals</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 shrink-0 ${
                        rosePetals ? 'bg-white/25 text-white' : 'bg-slate-100 text-zinc-500'
                      }`}>
                        {rosePetals ? 'Added' : '+ Add'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSurpriseCake(!surpriseCake)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        surpriseCake
                          ? 'border-orange-500 bg-orange-500 text-white shadow-xs font-semibold'
                          : 'border-slate-200 text-zinc-700 hover:bg-slate-50 bg-white'
                      }`}
                    >
                      <span className="truncate">🎂 Sparkler Cake</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 shrink-0 ${
                        surpriseCake ? 'bg-white/25 text-white' : 'bg-slate-100 text-zinc-500'
                      }`}>
                        {surpriseCake ? 'Added' : '+ Add'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Table Card Greeting */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">
                    Custom Greeting on Table Card (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 'Happy Anniversary Sarah & David ❤️'"
                    value={occasionMessage}
                    onChange={(e) => setOccasionMessage(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500 font-medium bg-slate-50/40"
                  />
                </div>
              </div>

              {/* 3. Sticky Bottom Action Bar (Always Visible on Mobile & Desktop) */}
              <div className="px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-between gap-3 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-full border border-slate-200 text-zinc-600 text-xs sm:text-sm font-medium hover:bg-slate-50 cursor-pointer shrink-0"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 sm:flex-initial bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-orange-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Guest Details</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 3: GUEST & WHATSAPP DETAILS
             ========================================================================= */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 font-medium bg-slate-50/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1 flex items-center gap-1">
                      <MessageSquare className="size-3 text-emerald-500" />
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +1 555-0199 or +91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 font-medium bg-slate-50/40"
                    />
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Instant WhatsApp pass sent here.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 font-medium bg-slate-50/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                    Dietary / Chef Notes (Optional)
                  </label>
                  <textarea
                    name="specialRequest"
                    rows={2}
                    placeholder="Nut allergy, quiet booth, vegetarian..."
                    value={formData.specialRequest}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500 bg-slate-50/40"
                  />
                </div>

                {/* Minimal Summary Box */}
                <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">Reservation:</span>
                    <span className="font-bold text-zinc-900 text-[11px]">{formData.date} • {activeMealTab} at {selectedSlot.time} ({formData.guests} Guests)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">Occasion:</span>
                    <span className="font-bold text-orange-600 text-[11px]">{selectedOccasion.title}</span>
                  </div>
                </div>
              </div>

              {/* 3. Sticky Bottom Action Bar (Always Visible on Mobile & Desktop) */}
              <div className="px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-between gap-3 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-full border border-slate-200 text-zinc-600 text-xs sm:text-sm font-medium hover:bg-slate-50 cursor-pointer shrink-0"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {loading ? 'Confirming...' : 'Confirm & Send to WhatsApp ✓'}
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 4: CONFIRMATION & WHATSAPP
             ========================================================================= */}
          {step === 4 && bookingConfirmed && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-center space-y-3">
                <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="size-7" />
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-urbanist font-bold text-zinc-900">
                    Table Confirmed for {bookingConfirmed.name}!
                  </h4>
                  <p className="text-zinc-500 text-[11px] sm:text-xs mt-0.5 max-w-sm mx-auto">
                    Your table at Savoria has been reserved. Dispatch instant WhatsApp confirmations below:
                  </p>
                </div>

                {/* Clean Ticket Card */}
                <div className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-100 text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <div className="flex justify-between pb-1.5 border-b border-slate-200">
                    <span className="text-zinc-500 text-[11px]">Booking ID:</span>
                    <span className="font-mono font-bold text-orange-600 text-xs">{bookingConfirmed.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">Date & Service:</span>
                    <span className="font-bold text-zinc-900 text-[11px]">{bookingConfirmed.date} • {bookingConfirmed.meal} at {bookingConfirmed.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">Party Size:</span>
                    <span className="font-medium text-zinc-900 text-[11px]">{bookingConfirmed.guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">Occasion:</span>
                    <span className="font-medium text-orange-600 text-[11px]">{bookingConfirmed.occasion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[11px]">Client WhatsApp:</span>
                    <span className="font-medium text-zinc-900 text-[11px]">{bookingConfirmed.phone}</span>
                  </div>
                </div>

                {/* WhatsApp Dispatch Buttons */}
                <div className="space-y-2 max-w-md mx-auto pt-1">
                  <button
                    type="button"
                    onClick={() => openWhatsApp('owner')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer text-xs sm:text-sm"
                  >
                    <MessageSquare className="size-4" />
                    <span>Send Booking to Restaurant WhatsApp (Owner)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openWhatsApp('client')}
                    className="w-full bg-zinc-900 hover:bg-black text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer text-xs sm:text-sm"
                  >
                    <PhoneCall className="size-4 text-emerald-400" />
                    <span>Open / Save Receipt to My WhatsApp (Client)</span>
                  </button>
                </div>
              </div>

              {/* Sticky Bottom Close */}
              <div className="px-5 py-3 border-t border-slate-100 bg-white flex justify-center shrink-0">
                <button
                  onClick={resetAndClose}
                  className="text-zinc-400 hover:text-zinc-700 text-xs underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Done & Return to Website
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReservationModal;
