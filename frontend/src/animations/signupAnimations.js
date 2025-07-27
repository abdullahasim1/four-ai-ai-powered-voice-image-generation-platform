import gsap from "gsap";
import ReactDOM from "react-dom/client";
import React from 'react';
import { 
  FaUserPlus, FaUserEdit, FaUserCog, FaUserShield,
  FaKey, FaLock, FaUnlock, FaShieldAlt, FaUserLock,
  FaFingerprint, FaCheckCircle, FaUserCheck, FaIdCard,
  FaUserTag, FaUserClock, FaUserGraduate, FaUserTie,
  FaIdBadge, FaPassport, FaAddressCard, FaRegAddressCard,
  FaRegIdBadge, FaRegIdCard, FaUserFriends, FaUsers
} from "react-icons/fa";

// Icon configurations specific to signup
export const iconConfigs = [
  { icon: FaUserPlus, size: 'text-5xl' },
  { icon: FaUserEdit, size: 'text-4xl' },
  { icon: FaUserCog, size: 'text-4xl' },
  { icon: FaUserShield, size: 'text-5xl' },
  { icon: FaKey, size: 'text-4xl' },
  { icon: FaLock, size: 'text-3xl' },
  { icon: FaUnlock, size: 'text-4xl' },
  { icon: FaShieldAlt, size: 'text-5xl' },
  { icon: FaUserLock, size: 'text-4xl' },
  { icon: FaFingerprint, size: 'text-5xl' },
  { icon: FaCheckCircle, size: 'text-4xl' },
  { icon: FaUserCheck, size: 'text-4xl' },
  { icon: FaIdCard, size: 'text-3xl' },
  { icon: FaUserTag, size: 'text-4xl' },
  { icon: FaUserClock, size: 'text-3xl' },
  { icon: FaUserGraduate, size: 'text-4xl' },
  { icon: FaUserTie, size: 'text-3xl' },
  { icon: FaIdBadge, size: 'text-4xl' },
  { icon: FaPassport, size: 'text-3xl' },
  { icon: FaAddressCard, size: 'text-4xl' },
  { icon: FaRegAddressCard, size: 'text-3xl' },
  { icon: FaRegIdBadge, size: 'text-4xl' },
  { icon: FaRegIdCard, size: 'text-3xl' },
  { icon: FaUserFriends, size: 'text-4xl' },
  { icon: FaUsers, size: 'text-5xl' }
];

// Color configurations matching login page
export const colors = [
  'text-indigo-300/20',
  'text-indigo-400/20',
  'text-purple-300/20',
  'text-pink-300/20',
  'text-blue-300/20',
  'text-cyan-300/20',
  'text-teal-300/20',
  'text-emerald-300/20'
];

// Create a floating icon element
export const createIcon = (Icon, size, color, startX, startY, container) => {
  const element = document.createElement('div');
  element.className = `floating-icon ${size} ${color} absolute`;
  element.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 0;
    filter: blur(0.5px);
  `;
  
  element.style.left = `${startX}px`;
  element.style.top = `${startY}px`;
  
  container.appendChild(element);
  
  const root = ReactDOM.createRoot(element);
  root.render(React.createElement(Icon));

  return element;
};

// Create animation for an icon with slightly different parameters
export const createAnimation = (element, startX, startY) => {
  const timeline = gsap.timeline({ repeat: -1 });
  
  // Generate 8 random points for more complex movement
  const points = Array.from({ length: 8 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 720 - 360, // More rotation range
    scale: Math.random() * 0.6 + 0.4,
    opacity: Math.random() * 0.4 + 0.1
  }));

  points.unshift({
    x: startX,
    y: startY,
    rotation: 0,
    scale: 1,
    opacity: 0.2
  });

  points.forEach((point) => {
    timeline.to(element, {
      x: point.x,
      y: point.y,
      rotation: point.rotation,
      scale: point.scale,
      opacity: point.opacity,
      duration: Math.random() * 5 + 4, // Slightly slower animations
      ease: "power2.inOut",
    });
  });

  return timeline;
};

// Create floating background icons
export const createFloatingIcons = (container) => {
  const timelines = [];

  iconConfigs.forEach(({ icon: Icon, size }) => {
    // Create 2 instances of each icon (slightly less dense than login)
    for (let i = 0; i < 2; i++) {
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const element = createIcon(Icon, size, color, startX, startY, container);
      const timeline = createAnimation(element, startX, startY);
      timelines.push(timeline);
    }
  });

  return timelines;
};

// Cleanup function for animations
export const cleanupAnimations = (timelines) => {
  timelines.forEach(timeline => timeline.kill());
  gsap.killTweensOf(".floating-icon");
}; 