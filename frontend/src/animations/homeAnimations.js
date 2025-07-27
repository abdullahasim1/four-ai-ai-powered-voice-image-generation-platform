import { motion } from "framer-motion";

// Hero section animations
export const heroAnimation = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 }
};

// Voice generator section animations
export const voiceGeneratorAnimation = {
  whileInView: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 20 },
  transition: { duration: 1 }
};

// Voice library section animations
export const voiceLibraryAnimation = {
  whileInView: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 50 },
  transition: { duration: 1 }
};

// Text section animations
export const textSectionAnimation = {
  whileInView: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: -50 },
  transition: { duration: 1 }
};

// Voice cards section animations
export const voiceCardsAnimation = {
  whileInView: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: 50 },
  transition: { duration: 1 }
};

// Voice card hover animation
export const voiceCardHoverAnimation = {
  whileHover: { scale: 1.05 }
};

// Features section animations
export const featuresAnimation = {
  whileInView: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 50 },
  transition: { duration: 1 }
};

// Feature card hover animation
export const featureCardHoverAnimation = {
  whileHover: { scale: 1.05 }
};

// Call to action section animations
export const ctaAnimation = {
  whileInView: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 50 },
  transition: { duration: 1 }
};

// Motion components
export const MotionHeader = motion.header;
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionP = motion.p;
export const MotionButton = motion.button; 