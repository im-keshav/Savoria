import React from 'react';
import { motion } from 'framer-motion';

export const MotionReveal = ({
  children,
  delay = 0,
  y = 50,
  x = 0,
  scale = 1,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 320,
        damping: 70,
        mass: 1
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;

