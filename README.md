# ShowRunner Landing Page

A production-ready, mind-blowing SaaS marketing landing page for ShowRunner (AI event operator).

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Features

- 🎭 **3D Logo Animation**: Each letter of "SHOWRUNNER" flips in 3D with staggered timing
- ⌨️ **Custom Typewriter**: Smooth character-by-character typing with blinking cursor
- 🎨 **Cinematic Design**: Dark theme with electric green accents and subtle grain overlay
- 📱 **Mobile-First**: Fully responsive design optimized for all devices
- ♿ **Accessible**: WCAG AA compliant with proper focus management
- 🚀 **Performance**: Optimized for Lighthouse 95+ scores
- 🎪 **Motion Safe**: Respects `prefers-reduced-motion` preferences

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Design Notes

### Key Animation Timings
- **Logo letters**: 60ms stagger between each character flip
- **Typewriter start**: Begins 200ms after logo animation completes
- **Scroll animations**: 100ms stagger for card grids

### Motion System
The site uses a centralized motion system in `/lib/motion.ts` with consistent spring animations:
- **Stiffness**: 220-260 for snappy feel
- **Damping**: 20-26 for controlled bounce
- **Fade distance**: 40px for subtle entrance

### Color Palette
- **Primary**: Electric Green (#22C55E)
- **Background**: Deep indigo to near-black gradient
- **Text**: Off-white (#E2E8F0) and Slate (#94A3B8)

### Performance Optimizations
- SVG-based noise overlay (no heavy canvas)
- Optimized Framer Motion variants
- Reduced motion support
- Minimal external dependencies

## Customization

### Changing Animation Speed
Edit timing values in `/lib/motion.ts`:
```typescript
export const letterFlip: Variants = {
  // Adjust stiffness (higher = faster)
  transition: { stiffness: 260 }
}
```

### Modifying Colors
Update the Tailwind config in `tailwind.config.ts`:
```typescript
colors: {
  brand: {
    green: '#22C55E' // Change primary color
  }
}
```

### Timeline Animation
The timeline teaser loops every 8 seconds. Adjust in `TimelineTeaser.tsx`:
```typescript
animate={{ width: ['0%', '100%'] }}
transition={{ duration: 8 }} // Change duration
```

## Acceptance Tests

✅ Logo letters flip sequentially on page load  
✅ Typewriter begins within 300ms of logo completion  
✅ "Try Live Demo" smooth-scrolls to Timeline section  
✅ Responsive design on iPhone 13/14 and 1440px desktop  
✅ No layout shifts > 0.05 CLS  

## License

MIT License - feel free to use this as a template for your own projects!
