import gsap from "gsap";
import ReactDOM from "react-dom/client";
import React from 'react';
import { 
  FaKey, FaUser, FaShieldAlt, FaLockOpen, FaUserLock, 
  FaFingerprint, FaUserShield, FaCheckCircle, FaShieldVirus, 
  FaUserCheck, FaUserCog, FaUserSecret, FaUserNinja, FaUserTie, 
  FaUserAstronaut, FaUserGraduate, FaUserMd, FaUserPlus, 
  FaUserEdit, FaUserFriends, FaUserClock,  
  FaUserTag, FaUserSlash, FaUserTimes, FaUserMinus, 
  FaUserAlt, FaUserCircle, FaUserInjured, FaUserNurse 
} from "react-icons/fa";

// Icon configurations
export const iconConfigs = [
  { icon: FaKey, size: 'text-4xl' },
  { icon: FaUser, size: 'text-3xl' },
  { icon: FaShieldAlt, size: 'text-5xl' },
  { icon: FaLockOpen, size: 'text-4xl' },
  { icon: FaUserLock, size: 'text-3xl' },
  { icon: FaFingerprint, size: 'text-5xl' },
  { icon: FaUserShield, size: 'text-4xl' },
  { icon: FaCheckCircle, size: 'text-3xl' },
  { icon: FaShieldVirus, size: 'text-4xl' },
  { icon: FaUserCheck, size: 'text-3xl' },
  { icon: FaUserCog, size: 'text-4xl' },
  { icon: FaUserSecret, size: 'text-3xl' },
  { icon: FaUserNinja, size: 'text-4xl' },
  { icon: FaUserTie, size: 'text-3xl' },
  { icon: FaUserAstronaut, size: 'text-4xl' },
  { icon: FaUserGraduate, size: 'text-3xl' },
  { icon: FaUserMd, size: 'text-4xl' },
  { icon: FaUserPlus, size: 'text-3xl' },
  { icon: FaUserEdit, size: 'text-4xl' },
  { icon: FaUserFriends, size: 'text-3xl' },
  { icon: FaUserClock, size: 'text-4xl' },
  { icon: FaUserTag, size: 'text-4xl' },
  { icon: FaUserSlash, size: 'text-3xl' },
  { icon: FaUserTimes, size: 'text-4xl' },
  { icon: FaUserMinus, size: 'text-3xl' },
  { icon: FaUserAlt, size: 'text-4xl' },
  { icon: FaUserCircle, size: 'text-3xl' },
  { icon: FaUserInjured, size: 'text-4xl' },
  { icon: FaUserNurse, size: 'text-3xl' }
];

// Color configurations
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

// Create animation for an icon
export const createAnimation = (element, startX, startY) => {
  const timeline = gsap.timeline({ repeat: -1 });
  
  // Generate 6 random points for more complex movement
  const points = Array.from({ length: 6 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.1
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
      duration: Math.random() * 4 + 3,
      ease: "power1.inOut",
    });
  });

  return timeline;
};

// Create floating background icons
export const createFloatingIcons = (container) => {
  const timelines = [];

  iconConfigs.forEach(({ icon: Icon, size }) => {
    // Create 3 instances of each icon
    for (let i = 0; i < 3; i++) {
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