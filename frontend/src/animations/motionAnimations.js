import gsap from "gsap";

// Main icons animation (envelope and lock)
export const createMainIconsAnimation = (envelopeRef, lockRef) => {
  const envelopeTimeline = gsap.timeline({ repeat: -1 });
  envelopeTimeline
    .to(envelopeRef.current, {
      y: -15,
      rotation: 5,
      opacity: 0.8,
      duration: 2,
      ease: "power1.inOut",
    })
    .to(envelopeRef.current, {
      y: 0,
      rotation: -5,
      opacity: 0.4,
      duration: 2,
      ease: "power1.inOut",
    });

  const lockTimeline = gsap.timeline({ repeat: -1 });
  lockTimeline
    .to(lockRef.current, {
      y: 15,
      rotation: -5,
      opacity: 0.8,
      duration: 2.5,
      ease: "power1.inOut",
    })
    .to(lockRef.current, {
      y: 0,
      rotation: 5,
      opacity: 0.4,
      duration: 2.5,
      ease: "power1.inOut",
    });

  return [envelopeTimeline, lockTimeline];
};

// Card floating animation
export const createCardAnimation = (cardRef) => {
  const cardTimeline = gsap.timeline({ repeat: -1 });
  cardTimeline
    .to(cardRef.current, {
      y: -10,
      rotation: 1,
      duration: 3,
      ease: "power1.inOut",
    })
    .to(cardRef.current, {
      y: 0,
      rotation: -1,
      duration: 3,
      ease: "power1.inOut",
    });

  return cardTimeline;
};

// Title floating animation
export const createTitleAnimation = (titleRef) => {
  const titleTimeline = gsap.timeline({ repeat: -1 });
  titleTimeline
    .to(titleRef.current, {
      y: -5,
      scale: 1.02,
      duration: 2,
      ease: "power1.inOut",
    })
    .to(titleRef.current, {
      y: 0,
      scale: 1,
      duration: 2,
      ease: "power1.inOut",
    });

  return titleTimeline;
};

// Button floating animation
export const createButtonAnimation = (buttonRef) => {
  const buttonTimeline = gsap.timeline({ repeat: -1 });
  buttonTimeline
    .to(buttonRef.current, {
      y: -3,
      scale: 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      duration: 2,
      ease: "power1.inOut",
    })
    .to(buttonRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      duration: 2,
      ease: "power1.inOut",
    });

  return buttonTimeline;
};

// Gradient background animation
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