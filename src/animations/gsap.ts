import gsap from 'gsap';

// Fade in animation
export const fadeIn = (element: HTMLElement) => {
  return gsap.from(element, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
  });
};

// Slide up animation
export const slideUp = (element: HTMLElement) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
  });
};

// Scale animation
export const scaleIn = (element: HTMLElement) => {
  return gsap.from(element, {
    scale: 0.9,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)',
  });
};

// Stagger animation
export const staggerChildren = (elements: HTMLElement[], staggerAmount = 0.1) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: staggerAmount,
    ease: 'power2.out',
  });
};

// Number counter animation
export const animateNumber = (
  element: HTMLElement,
  endValue: number,
  duration = 1,
  prefix = '',
  suffix = ''
) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = prefix + Math.round(obj.value).toString() + suffix;
    },
  });
};
