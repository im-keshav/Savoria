import React, { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import SignatureDishes from './components/SignatureDishes';
import Features from './components/Features';
import BookingProcess from './components/BookingProcess';
import Timing from './components/Timing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const handleOpenBooking = () => {
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  const handleAddToOrder = (dish) => {
    setOrderItems((prev) => {
      if (prev.some((d) => d.id === dish.id)) {
        return prev.filter((d) => d.id !== dish.id);
      }
      return [...prev, dish];
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white">
      {/* Lenis Smooth Scroll Engine */}
      <SmoothScroll />

      {/* Top Fixed Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Sections */}
      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <About />
        <Stats />
        <SignatureDishes onAddToOrder={handleAddToOrder} orderItems={orderItems} />
        <Features />
        <BookingProcess onOpenBooking={handleOpenBooking} />
        <Timing />
        <Testimonials />
        <FAQ />
        <CTA onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        selectedDishes={orderItems}
      />
    </div>
  );
}

export default App;

