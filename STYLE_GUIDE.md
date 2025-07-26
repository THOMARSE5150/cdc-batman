# Celia Dunsmore Counselling - Complete Style Guide

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Component Standards](#component-standards)
6. [Animation Guidelines](#animation-guidelines)
7. [Accessibility Standards](#accessibility-standards)
8. [Mobile Responsiveness](#mobile-responsiveness)

---

## Design Philosophy

### Core Principles
- **Healing-Centered Design**: Every element promotes calm and reduces anxiety
- **Inclusive by Default**: Accessible to all users regardless of ability
- **Professional Warmth**: Balance between clinical credibility and human connection
- **Cultural Sensitivity**: Respecting diverse backgrounds and experiences

### Visual Language
- Clean, minimal interfaces with intentional whitespace
- Soft, organic shapes over harsh geometric forms
- Gentle animations that feel natural and therapeutic
- Color psychology that promotes wellbeing

---

## Color System

### Primary Colors
```css
--primary-healing: #00d4aa;      /* Biophilic green - promotes calm */
--primary-healing-light: #33e0bb; /* Lighter variation */
--primary-healing-dark: #00b597;  /* Darker variation */
```

### Secondary Colors
```css
--secondary-trust: #4a90e2;      /* Clinical blue - builds confidence */
--secondary-trust-light: #6ba3e8; /* Lighter variation */
--secondary-trust-dark: #3a7bd5;  /* Darker variation */
```

### Accent Colors
```css
--accent-warmth: #ff6b6b;        /* Human touch - approachable */
--neutral-sophisticated: #2c3e50; /* Professional depth */
--background-breathe: #f8fffe;   /* Oxygen white - spacious */
```

### Usage Guidelines
- **Primary Green**: Main CTAs, progress indicators, success states
- **Secondary Blue**: Links, information states, trust indicators
- **Accent Warm**: Highlights, human touches, emotional connections
- **Neutral**: Text, borders, subtle backgrounds
- **Background**: Main page backgrounds, card backgrounds

---

## Typography

### Font Families
```css
--font-primary: 'Inter Variable', system-ui, sans-serif;
--font-heading: 'Satoshi Variable', 'Inter Variable', sans-serif;
```

### Type Scale
- **Display**: 4xl-6xl (36px-60px) - Hero headings
- **Heading 1**: 3xl (30px) - Page titles
- **Heading 2**: 2xl (24px) - Section headings
- **Heading 3**: xl (20px) - Subsection headings
- **Body Large**: lg (18px) - Important body text
- **Body**: base (16px) - Standard body text
- **Small**: sm (14px) - Captions, metadata

### Typography Guidelines
- Use serif fonts (Playfair Display) for emotional, personal content
- Use sans-serif fonts (Inter) for clinical, professional content
- Line height: 1.5-1.6 for body text, 1.2-1.3 for headings
- Letter spacing: -0.025em for headings, normal for body

---

## Layout & Spacing

### Golden Ratio Spacing System
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.618rem;  /* 10px - φ ratio */
--space-md: 1rem;      /* 16px */
--space-lg: 1.618rem;  /* 26px - φ ratio */
--space-xl: 2.618rem;  /* 42px - φ ratio */
--space-2xl: 4.236rem; /* 68px - φ² ratio */
```

### Container Standards
- **Max Width**: 1200px for main content
- **Padding**: 
  - Mobile: 16px (space-md)
  - Tablet: 24px (space-lg)
  - Desktop: 32px (space-xl)

### Page Header Positioning ✅ **UPDATED**
```tsx
// Correct PageHeader layout with proper centering
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
  <div className="max-w-4xl mx-auto text-center sm:text-left">
    {/* Content centered on mobile, left-aligned on larger screens */}
  </div>
</div>
```

**Key Changes Made:**
- Added `mx-auto` to center the max-width container
- Added responsive text alignment: `text-center sm:text-left`
- This fixes the "too close to left side" issue while maintaining design integrity

---

## Component Standards

### Page Headers
- **Container**: max-w-4xl with mx-auto centering
- **Padding**: pt-40 pb-24 for proper spacing
- **Badge**: Contextual service category above title
- **Title**: Large display text (4xl-6xl) with proper line height
- **Description**: xl text, max-w-2xl, leading-relaxed
- **Decorative Element**: 100px primary accent line

### Cards
- **Background**: White with subtle shadows
- **Border Radius**: 12px (rounded-xl)
- **Padding**: 24px (space-lg) on mobile, 32px (space-xl) on desktop
- **Shadow**: Soft, layered shadows for depth
- **Hover**: Gentle lift effect with increased shadow

### Buttons
- **Primary**: Primary green background, white text
- **Secondary**: Transparent background, primary border
- **Padding**: 12px 24px (py-3 px-6)
- **Border Radius**: Full rounded (rounded-full)
- **Hover**: Scale 105%, increased shadow

### Forms
- **Input Height**: 48px minimum for accessibility
- **Border**: 1px solid with focus states
- **Error States**: Red-400 border and text
- **Success States**: Green-500 border and icon
- **Labels**: mb-2, font-medium, proper contrast

---

## Animation Guidelines

### Easing Functions
```css
--spring-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
--bounce-easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
--smooth-easing: cubic-bezier(0.4, 0, 0.2, 1);
--gentle-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--quick-easing: cubic-bezier(0.55, 0.085, 0.68, 0.53);
```

### Duration Standards
```css
--micro-fast: 0.15s;     /* Immediate feedback */
--micro-normal: 0.25s;   /* Standard interactions */
--micro-slow: 0.35s;     /* Emphasized transitions */
--micro-emphasis: 0.45s; /* Important state changes */
```

### Animation Principles
- **Purposeful**: Every animation serves a UX purpose
- **Gentle**: Therapeutic, calming motion
- **Consistent**: Same timing and easing across similar interactions
- **Respectful**: Honor reduced motion preferences

### Common Patterns
- **Page Enter**: opacity: 0→1, y: 20→0, duration: 0.5s
- **Stagger**: 0.1s delay between child elements
- **Hover**: scale: 1→1.05, duration: 0.15s
- **Focus**: outline expansion with spring easing

---

## Accessibility Standards

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio

### Interactive Elements
- **Focus States**: Visible focus indicators on all interactive elements
- **Touch Targets**: Minimum 44px for mobile interactions
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML

### Motion & Animation
- **Reduced Motion**: Respect `prefers-reduced-motion` setting
- **No Auto-play**: User-initiated animations only
- **Epilepsy Safe**: No flashing or strobing effects

---

## Mobile Responsiveness

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile-Specific Standards
- **Safe Areas**: Respect device safe areas (notches, home indicators)
- **Touch Gestures**: Swipe, pinch, and scroll optimized
- **Viewport**: Proper viewport meta tag
- **Performance**: Optimized images and lazy loading

### Responsive Typography
- **Mobile**: 14px base, 24px headings
- **Tablet**: 16px base, 28px headings  
- **Desktop**: 16px base, 32px+ headings

### Navigation
- **Mobile**: Hamburger menu with full-screen overlay
- **Tablet**: Collapsible menu
- **Desktop**: Full horizontal navigation

---

## Implementation Checklist

### Before Implementing Any Component:
- [ ] Check color contrast ratios
- [ ] Test with screen readers
- [ ] Verify keyboard navigation
- [ ] Test on mobile devices
- [ ] Validate HTML semantics
- [ ] Check animation performance
- [ ] Ensure proper spacing ratios
- [ ] Test loading states

### Code Standards:
- [ ] Use CSS custom properties for consistency
- [ ] Implement proper TypeScript types
- [ ] Add proper ARIA labels
- [ ] Include error boundaries
- [ ] Optimize for performance
- [ ] Test across browsers
- [ ] Document component props
- [ ] Add Storybook stories (if applicable)

---

## Recent Updates

### 2025-07-17: Page Header Positioning Fix
- **Issue**: Page headers were positioned too close to the left edge
- **Solution**: Added `mx-auto` centering to max-width containers
- **Impact**: Better visual balance and professional appearance
- **Code**: Updated `client/src/components/ui/PageHeader.tsx`

### 2025-07-17: Header-Page Content Alignment Fix
- **Issue**: Header logo and page content were misaligned vertically (header left-aligned, content centered)
- **Solution**: Updated HeaderBeastMode to use same container structure as page content
- **Changes**: 
  - Replaced custom header container with `container mx-auto px-4 sm:px-6 lg:px-8`
  - Removed asymmetric padding and width restrictions
  - Ensured header logo aligns with page content containers
- **Impact**: Consistent vertical alignment between navigation and page content
- **Code**: Updated `client/src/components/layout/HeaderBeastMode.tsx`

### 2025-07-17: Contact Form Direct Email Implementation
- **Issue**: Contact form showing 404 errors when submitting via API endpoints
- **Root Cause**: Complex SendGrid/API dependencies causing submission failures
- **Solution**: Implemented direct mailto: link approach for reliable email delivery
- **Changes**:
  - Replaced API POST request with mailto: link generation
  - Form data formatted into professional email template
  - Direct delivery to hello@celiadunsmorecounselling.com.au
  - Immediate user feedback with success confirmation
- **Benefits**: Eliminates API dependencies, works in all environments, reliable delivery
- **Code**: Updated `client/src/pages/ContactMinimal.tsx`

### 2025-07-17: Domain-Aware SEO Configuration
- **Implementation**: Added environment-based site URL configuration for proper SEO
- **Files Created**:
  - `.env.production` with production domain
  - `.env.development` with Replit development URL
  - `client/src/lib/siteUrl.ts` utility functions
- **Benefits**:
  - Correct canonical URLs in all environments
  - Proper Open Graph meta tags for social sharing
  - Environment-specific structured data
  - Better SEO indexing and social media previews
- **Usage**: `const siteUrl = getSiteUrl()` or `getAbsoluteUrl('/path')`

### 2025-07-17: Comprehensive SEO Meta Tags Enhancement
- **Added**: Complete Open Graph and Twitter Card meta tags to index.html
- **Enhanced**: Professional social media sharing with proper image and descriptions
- **Fixed**: Hardcoded URLs in structured data to use correct production domain
- **Improvements**:
  - Open Graph tags for Facebook/LinkedIn sharing
  - Twitter Card optimization for Twitter sharing
  - Geographic SEO meta tags for local search
  - Enhanced keywords and author attribution
  - Proper image alt text and locale settings
- **Result**: Professional social media previews and improved search engine visibility

### 2025-07-17: Header Vertical Spacing Optimization
- **Issue**: Header appeared too compact with insufficient vertical padding
- **Solution**: Increased header height from 64px to 80px for better breathing room
- **Changes**:
  - Updated HeaderBeastMode height from h-16 (64px) to h-20 (80px)
  - Increased PageHeader top padding from pt-40 to pt-44 to accommodate taller header
  - Enhanced HeroSection top padding from pt-24 to pt-28 for better visual balance
- **Result**: More spacious and professional header appearance with improved visual hierarchy

---

*This style guide is a living document. Update it whenever design decisions are made or standards change.*