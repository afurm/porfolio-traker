import { SpringValue, animated } from '@react-spring/web'

// Common spring configs
export const springConfigs = {
    gentle: {
        tension: 170,
        friction: 14
    },
    wobbly: {
        tension: 180,
        friction: 12
    },
    stiff: {
        tension: 300,
        friction: 20
    },
    slow: {
        tension: 120,
        friction: 14
    },
    molasses: {
        tension: 80,
        friction: 20
    }
}

// Fade animation
export const useFadeAnimation = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    config: springConfigs.gentle
})

// Slide animation
export const useSlideAnimation = (isVisible: boolean) => ({
    y: isVisible ? 0 : 50,
    opacity: isVisible ? 1 : 0,
    config: springConfigs.gentle
})

// Scale animation
export const useScaleAnimation = (isVisible: boolean) => ({
    scale: isVisible ? 1 : 0.9,
    opacity: isVisible ? 1 : 0,
    config: springConfigs.wobbly
})

// Number animation
export const useNumberAnimation = (value: number) => ({
    number: value,
    from: { number: 0 },
    config: springConfigs.molasses
})

// Hover animation
export const useHoverAnimation = (isHovered: boolean) => ({
    scale: isHovered ? 1.05 : 1,
    config: springConfigs.gentle
})

// Export animated components
export { animated } 