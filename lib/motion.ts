import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      damping: 24, 
      stiffness: 220 
    } 
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring', 
      damping: 20, 
      stiffness: 220 
    } 
  }
}

export const letterFlip: Variants = {
  hidden: { 
    rotateX: 90, 
    y: 8, 
    opacity: 0 
  },
  show: { 
    rotateX: 0, 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 26
    }
  }
}

export function staggerParent(gap = 0.12): Variants {
  return {
    hidden: {},
    show: { 
      transition: { 
        staggerChildren: gap 
      } 
    }
  }
}

// Motion-safe variants for reduced motion preference
export const motionSafe = {
  fadeUp: {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { duration: 0.3 } 
    }
  },
  scaleIn: {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { duration: 0.3 } 
    }
  },
  letterFlip: {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { duration: 0.3 } 
    }
  }
}
