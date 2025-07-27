import gsap from "gsap";

// Main icons animation (user, envelope, and lock)
export const createMainIconsAnimation = (userRef, envelopeRef, lockRef) => {
  const userTimeline = gsap.timeline({ repeat: -1 });
  userTimeline
    .to(userRef.current, {
      y: -12,
      rotation: 5,
      opacity: 0.8,
      duration: 2,
      ease: "power1.inOut",
    })
    .to(userRef.current, {
      y: 0,
      rotation: -5,
      opacity: 0.4,
      duration: 2,
      ease: "power1.inOut",
    });

  const envelopeTimeline = gsap.timeline({ repeat: -1 });
  envelopeTimeline
    .to(envelopeRef.current, {
      y: 12,
      rotation: -5,
      opacity: 0.8,
      duration: 2.3,
      ease: "power1.inOut",
    })
    .to(envelopeRef.current, {
      y: 0,
      rotation: 5,
      opacity: 0.4,
      duration: 2.3,
      ease: "power1.inOut",
    });

  const lockTimeline = gsap.timeline({ repeat: -1 });
  lockTimeline
    .to(lockRef.current, {
      y: -15,
      rotation: -8,
      opacity: 0.8,
      duration: 2.6,
      ease: "power1.inOut",
    })
    .to(lockRef.current, {
      y: 0,
      rotation: 8,
      opacity: 0.4,
      duration: 2.6,
      ease: "power1.inOut",
    });

  return [userTimeline, envelopeTimeline, lockTimeline];
};

// Card floating animation with different parameters
export const createCardAnimation = (cardRef) => {
  const cardTimeline = gsap.timeline({ repeat: -1 });
  cardTimeline
    .to(cardRef.current, {
      y: -15,
      rotation: 1.5,
      duration: 4,
      ease: "power2.inOut",
    })
    .to(cardRef.current, {
      y: 0,
      rotation: -1.5,
      duration: 4,
      ease: "power2.inOut",
    });

  return cardTimeline;
};

// Title floating animation
export const createTitleAnimation = (titleRef) => {
  const titleTimeline = gsap.timeline({ repeat: -1 });
  titleTimeline
    .to(titleRef.current, {
      y: -8,
      scale: 1.03,
      duration: 2.5,
      ease: "power2.inOut",
    })
    .to(titleRef.current, {
      y: 0,
      scale: 1,
      duration: 2.5,
      ease: "power2.inOut",
    });

  return titleTimeline;
};

// Button floating animation with enhanced effects
export const createButtonAnimation = (buttonRef) => {
  const buttonTimeline = gsap.timeline({ repeat: -1 });
  buttonTimeline
    .to(buttonRef.current, {
      y: -4,
      scale: 1.04,
      boxShadow: "0 12px 20px -6px rgba(0, 0, 0, 0.2), 0 6px 8px -3px rgba(0, 0, 0, 0.1)",
      duration: 2.5,
      ease: "power2.inOut",
    })
    .to(buttonRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      duration: 2.5,
      ease: "power2.inOut",
    });

  return buttonTimeline;
};

// Gradient background animation with login page colors
export const createGradientAnimation = (gradientRef) => {
  const gradientTimeline = gsap.timeline({ repeat: -1 });
  gradientTimeline
    .to(gradientRef.current, {
      background: "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)",
      duration: 10,
      ease: "none",
    })
    .to(gradientRef.current, {
      background: "linear-gradient(45deg, #ec4899, #6366f1, #8b5cf6)",
      duration: 10,
      ease: "none",
    })
    .to(gradientRef.current, {
      background: "linear-gradient(45deg, #8b5cf6, #ec4899, #6366f1)",
      duration: 10,
      ease: "none",
    });

  return gradientTimeline;
};

// Cleanup all animations
export const cleanupAllAnimations = (timelines) => {
  timelines.forEach(timeline => {
    if (Array.isArray(timeline)) {
      timeline.forEach(t => t.kill());
    } else {
      timeline.kill();
    }
  });
  gsap.killTweensOf(".floating-icon");
}; 