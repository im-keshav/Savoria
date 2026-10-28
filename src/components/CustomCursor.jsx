import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const moveMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(cursor, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(follower, { x: pos.x, y: pos.y });
    });

    window.addEventListener('mousemove', moveMouse);

    // Hover effect on links and buttons
    const handleMouseEnter = () => {
      gsap.to(follower, { scale: 1.8, backgroundColor: 'rgba(249, 115, 22, 0.25)', borderColor: '#f97316', duration: 0.2 });
      gsap.to(cursor, { scale: 0.5, backgroundColor: '#ea580c', duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(249, 115, 22, 0.6)', duration: 0.2 });
      gsap.to(cursor, { scale: 1, backgroundColor: '#f97316', duration: 0.2 });
    };

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-orange-500 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500/60 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block transition-transform duration-75 ease-out"
      />
    </>
  );
};

export default CustomCursor;

