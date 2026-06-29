# KVRAT.ai Design System - Developer Guide

## Quick Start

### Import Design Tokens
```tsx
import { colors, spacing, typography, radius, shadows, animation, breakpoints } from '@/src/design-system';
```

### Import Components
```tsx
// Primitives
import { Button, Input, Card, Container, Badge, Checkbox, Select, Textarea, Divider } from '@/src/components/ui/primitives';

// Blocks
import { Navbar, HeroSection, FeatureGrid, CTASection, FAQAccordion, Footer } from '@/src/components/ui/blocks';
```

---

## Design Tokens Reference

### Colors
```tsx
colors.white              // '#FFFFFF'
colors.black              // '#000000'
colors.orange[500]        // '#F97316' (primary)
colors.blue[500]          // '#3B82F6' (secondary)
colors.gray[50-900]       // Gray scale
colors.semantic.success   // '#10B981'
colors.semantic.error     // '#EF4444'
```

### Spacing (4px base)
```tsx
spacing[1]   // 4px
spacing[2]   // 8px
spacing[4]   // 16px
spacing[6]   // 24px
spacing[8]   // 32px
spacingPresets.paddingLg   // 24px
spacingPresets.gapXl       // 32px
spacingPresets.marginSectionMd  // 64px
```

### Typography
```tsx
typography.fontSize.sm    // '14px'
typography.fontSize.base  // '16px'
typography.fontSize.xl    // '20px'
typography.fontWeight.bold     // '700'
typography.fontFamily.grotesk  // 'Space Grotesk'

// Or use presets
typographyPresets.h1      // Full h1 styling
typographyPresets.bodyMd  // Medium body text
typographyPresets.labelSm // Small label
```

### Radius (via radiusPresets)
```tsx
radiusPresets.button       // md radius
radiusPresets.card         // lg radius
radiusPresets.input        // md radius
radiusPresets.badge        // 2xl radius (more rounded)
radiusPresets.pill         // full radius
```

### Shadows
```tsx
shadows.sm                 // Subtle shadow
shadows.md                 // Medium elevation
shadows.lg                 // Pronounced elevation
shadowPresets.cardHover    // Card hover state
shadowPresets.focus        // Focus ring
```

### Animation
```tsx
animation.duration.fast    // 150ms
animation.duration.base    // 200ms
animation.duration.normal  // 300ms
animation.easing.easeOut   // 'cubic-bezier(0, 0, 0.2, 1)'
motionVariants.fadeInUp    // Framer Motion variant
```

### Breakpoints
```tsx
breakpoints.sm             // '640px'
breakpoints.md             // '768px'
breakpoints.lg             // '1024px'
breakpoints.xl             // '1280px'
containerSizes.xl          // '1140px' (max-width)
```

---

## Component Examples

### Button
```tsx
import { Button } from '@/src/components/ui/primitives';

// Primary (default)
<Button onClick={handleClick}>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// Loading state
<Button isLoading>Processing...</Button>

// Disabled
<Button disabled>Disabled</Button>
```

### Input
```tsx
import { Input } from '@/src/components/ui/primitives';

<Input 
  label="Email"
  placeholder="you@example.com"
  type="email"
  error="Invalid email"
  helperText="Enter a valid email address"
/>
```

### Card
```tsx
import { Card } from '@/src/components/ui/primitives';

<Card elevated>
  <h2>Title</h2>
  <p>Card content</p>
</Card>

<Card bordered={false}>Non-bordered card</Card>
```

### Container
```tsx
import { Container } from '@/src/components/ui/primitives';

<Container size="xl">
  <h1>Page content centered</h1>
</Container>
```

### HeroSection
```tsx
import { HeroSection } from '@/src/components/ui/blocks';

<HeroSection
  headline="Transform Ideas into Products"
  subheadline="Use AI to build your next big thing"
  ctaText="Get Started"
  onCtaClick={() => navigate('/dashboard')}
/>
```

### FeatureGrid
```tsx
import { FeatureGrid } from '@/src/components/ui/blocks';

const features = [
  { icon: '⚡', title: 'Fast', description: 'Lightning quick' },
  { icon: '🔒', title: 'Secure', description: 'Bank-level security' },
];

<FeatureGrid features={features} cols={2} />
```

### FAQAccordion
```tsx
import { FAQAccordion } from '@/src/components/ui/blocks';

const faqs = [
  { question: 'How it works?', answer: 'Simply...' },
  { question: 'Pricing?', answer: 'We offer...' },
];

<FAQAccordion items={faqs} title="FAQ" />
```

---

## Common Patterns

### Responsive Layout
```tsx
import { Container } from '@/src/components/ui/primitives';
import { colors, spacing } from '@/src/design-system';

<Container size="xl">
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing[6],
  }}>
    {/* Grid items */}
  </div>
</Container>
```

### Styled Component
```tsx
import { colors, spacing, typography } from '@/src/design-system';

const MyComponent = () => (
  <div style={{
    backgroundColor: colors.gray[50],
    padding: spacing[6],
    borderRadius: '8px',
    fontSize: typography.fontSize.base,
    color: colors.gray[900],
  }}>
    Content
  </div>
);
```

### Interactive Component
```tsx
import { Button } from '@/src/components/ui/primitives';
import { colors, animation } from '@/src/design-system';

const [hovered, setHovered] = useState(false);

<Button
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  style={{
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    transition: `transform ${animation.duration.fast}ms ${animation.easing.easeOut}`,
  }}
>
  Hover me
</Button>
```

---

## Best Practices

### ✅ DO

- Use design system tokens for all values
- Create reusable components from primitives
- Use TypeScript interfaces
- Use semantic color names (success, error, etc.)
- Keep components composable and simple
- Document component props
- Test responsive behavior

### ❌ DON'T

- Hardcode colors or spacing values
- Create one-off styled components
- Mix design system with inline styling
- Use px units directly (use spacing tokens)
- Create duplicate components
- Skip TypeScript types
- Ignore accessibility (ARIA labels)

---

## Adding New Components

### 1. Create Primitive Component
```tsx
// src/components/ui/primitives/MyComponent.tsx
import React from 'react';
import { colors, spacing } from '@/src/design-system';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'alt';
  children: React.ReactNode;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          color: colors.black,
          padding: spacing[4],
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

### 2. Export from Index
```tsx
// src/components/ui/primitives/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### 3. Use Immediately
```tsx
import { MyComponent } from '@/src/components/ui/primitives';

<MyComponent variant="default">Content</MyComponent>
```

---

## Troubleshooting

### Colors not applying?
- Ensure you're importing from `@/src/design-system`
- Check color exists in the tokens file
- Verify CSS property name (e.g., `color` not `textColor`)

### Component not rendering?
- Check import path
- Ensure component is exported from index.ts
- Verify props interface is correct
- Check console for TypeScript errors

### Styling conflicts?
- Never use inline `style` with Tailwind classes
- Use design system tokens exclusively
- Don't override with !important

### Performance issues?
- Memoize components with `React.memo` if needed
- Use Framer Motion sparingly
- Keep animations under 300ms
- Avoid re-renders with proper key props

---

## File Organization

```
Keep related files together:
src/components/
├── ui/
│   ├── primitives/     ← Atomic, single-use components
│   ├── blocks/         ← Composed from primitives
│   └── index.ts
├── sections/           ← Page sections
└── layout/             ← Layout wrappers

src/design-system/
├── tokens/            ← Individual token files
└── index.ts          ← Centralized export
```

---

## Performance Tips

1. **Use Container for responsive layouts** - Built-in max-width and padding
2. **Use primitives as building blocks** - Reduces code duplication
3. **Lazy load heavy sections** - Use dynamic imports for large components
4. **Memoize expensive renders** - Use React.memo selectively
5. **Keep animations short** - 150-300ms is ideal
6. **Use CSS variables** - For runtime theme changes (future)

---

## Accessibility Checklist

- [ ] All inputs have associated labels
- [ ] Buttons have descriptive text
- [ ] Color not the only indicator
- [ ] Contrast ratios meet WCAG AA
- [ ] Keyboard navigation works
- [ ] ARIA attributes where needed
- [ ] Semantic HTML used
- [ ] Error messages are clear

---

## Resources

- **Design System:** `/apps/kvrat-landing/src/design-system/`
- **Components:** `/apps/kvrat-landing/src/components/ui/`
- **Sections:** `/apps/kvrat-landing/src/components/sections/`
- **Build:** `npm run build` in kvrat-landing directory
- **Dev:** `npm run dev` for local development
