import gsap from "gsap";

export function setupStartpageAnimations(floatingButtonRef) {
  // Floating Elements Animation
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    gsap.to(element, {
      y: Math.random() * 50 - 25,
      x: Math.random() * 50 - 25,
      rotation: Math.random() * 360,
      duration: Math.random() * 3 + 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2
    });
  });

  // Floating Button Animation
  if (floatingButtonRef && floatingButtonRef.current) {
    gsap.to(floatingButtonRef.current, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }

  // Background Animation
  gsap.to(".gradient-bg", {
    backgroundPosition: "100% 100%",
    duration: 20,
    repeat: -1,
    ease: "none"
  });
}

export function cleanupStartpageAnimations(floatingButtonRef) {
  gsap.killTweensOf(".floating-element");
  gsap.killTweensOf(".gradient-bg");
  if (floatingButtonRef && floatingButtonRef.current) {
    gsap.killTweensOf(floatingButtonRef.current);
  }
} 