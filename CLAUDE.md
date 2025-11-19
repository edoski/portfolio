# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a developer portfolio website built with Next.js 16 (App Router), showcasing a terminal-inspired design aesthetic with WebGL effects. The site features custom terminal components, Three.js-based ASCII art text rendering, and shadcn/ui components styled with Tailwind CSS v4.

## Development Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Create production build (note: TypeScript errors are ignored during builds per `next.config.mjs`)
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js ESLint checks
- `pnpm exec tsc --noEmit` - Type-check without emitting files

## Architecture & Structure

### Page Composition
The main page (`app/page.tsx`) follows a single-page application pattern with these major sections in order:
1. `Navbar` - Fixed navigation with terminal-style branding and social links
2. `TerminalHero` - Hero section with WebGL terminal effects and ASCII art text rendering
3. `ProjectsSection` - Portfolio projects display
4. `ContactSection` - Contact information and form

### Component Organization
- `components/` - Feature components (navbar, terminal-hero, projects-section, contact-section) and WebGL components (FaultyTerminal, ASCIIText)
- `components/ui/` - UI primitives (button from shadcn/ui; terminal-chrome and terminal-prompt are custom components)
- `app/` - Next.js App Router pages and layouts
- `lib/` - Utilities (cn() utility, constants)
- `public/` - Static assets

### Styling System
- Uses Tailwind CSS v4 with PostCSS configuration
- Design tokens defined as CSS variables in OKLCH color space (`app/globals.css`)
- Terminal-themed colors: `--terminal-green`, `--terminal-orange`, `--terminal-cursor`
- Access colors via `var(--color-*)` syntax or `color:var(--color-terminal-orange)` in Tailwind
- Custom animations: `blink` (cursor), `typewriter` (text typing effect)
- Uses JetBrains Mono (via @fontsource/jetbrains-mono) and IBM Plex Mono (via next/font/google) for monospace text
- shadcn/ui configuration: New York style, RSC enabled, neutral base color

**ASCII Text Component Styles:**
Custom CSS in `app/globals.css` (lines 128-158) for ASCII text rendering:
- `.ascii-text-container canvas` - Pixelated image rendering for retro effect
- `.ascii-text-container pre` - Radial gradient with mix-blend-mode for visual effects

### Path Aliases
- `@/*` maps to repository root
- shadcn component aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

### Client vs Server Components
- Most feature components are client components (`"use client"`) due to interactivity (WebGL effects, animations)
- Root layout is a server component
- UI primitives may be server or client depending on interactivity needs

### WebGL & 3D Rendering

The portfolio uses WebGL-based effects for visual enhancement that require browser-only rendering:

**FaultyTerminal Component** (`components/FaultyTerminal.tsx`):
- WebGL-based retro terminal background effect using OGL library
- Shader-based effects: scanlines, glitches, CRT curvature, chromatic aberration, dither
- Mouse-reactive with smooth interpolation
- Configurable visual parameters (brightness, tint, flicker amount, etc.)
- 424 lines of TypeScript with vertex and fragment shaders

**ASCIIText Component** (`components/ASCIIText.tsx`):
- Three.js-based 3D ASCII art text renderer
- Converts text to ASCII representation using canvas texture generation
- Mouse-reactive 3D rotation with smooth damping
- Optional wave distortion effects
- Uses IBM Plex Mono font for ASCII characters
- 610 lines of TypeScript

**Browser-Only Rendering Pattern:**
Both WebGL components require client-side only rendering and must use Next.js dynamic imports:

```typescript
const Component = dynamic(
  () => import("@/components/Component"),
  { ssr: false }
)
```

**Performance Considerations:**
- Device pixel ratio capped at 2 to reduce GPU load on high-DPI displays
- FaultyTerminal is memoized with empty dependency array to prevent WebGL context recreation
- Proper cleanup in useEffect returns (context disposal, animation frame cancellation)
- ResizeObserver for responsive canvas sizing
- IntersectionObserver for lazy initialization when component becomes visible

**Dependencies:**
- `ogl@1.0.11` - Lightweight WebGL library for FaultyTerminal
- `three@0.181.2` - Three.js 3D library for ASCIIText
- `@types/three@0.181.0` - TypeScript definitions for Three.js

### ReactBits Integration

Components sourced from ReactBits (https://reactbits.dev) are managed via jsrepo:

**Installed Components:**
- FaultyTerminal - WebGL terminal background effect
- ASCIIText - Three.js ASCII art text renderer
- TiltedCard - 3D perspective tilt card with mouse-reactive rotation

**Installation Method:**
Components were installed using shadcn CLI with ReactBits registry:
```bash
npx shadcn@latest add https://reactbits.dev/r/FaultyTerminal-TS-TW.json
npx shadcn@latest add https://reactbits.dev/r/ASCIIText-TS-TW.json
npx shadcn@latest add https://reactbits.dev/r/TiltedCard-TS-TW.json
```

**Configuration:**
The `jsrepo.json` file exists for legacy compatibility but components are now installed via shadcn CLI.

**Component Variants:**
- Format: `ComponentName-LANG-STYLE.json`
- LANG: JS (JavaScript) or TS (TypeScript)
- STYLE: CSS (separate CSS) or TW (Tailwind CSS)
- This project uses: TS-TW (TypeScript + Tailwind CSS)

**TiltedCard Component** (`components/TiltedCard.tsx`):
- 3D perspective tilt effect with mouse-reactive rotation
- Spring-based physics for smooth, natural motion
- Wraps the ~/about terminal section for interactive hover effect
- Modified to accept `children` prop in addition to image content
- Uses Framer Motion (`motion` library) for animations
- Configuration: subtle scale (1.02x), 8-degree rotation amplitude

**Implementation Notes:**
- Motion values initialized with `useSpring(0, springValues)` for proper animation state
- Children wrapper uses relative positioning for correct layout flow
- Applied to terminal-hero component for 3D tilt effect on ~/about section

### Key Implementation Details
- **Terminal aesthetic**: Components use terminal-style prompts (`$`, `>`), monospace fonts, and terminal color palette
- **ASCII Art Text**: 3D text rendering using Three.js with mouse-reactive rotation and hue shifting
- **Responsive design**: Mobile-first with `md:` breakpoints for desktop variations
- **Analytics**: Vercel Analytics integrated in root layout
- **Image optimization**: Disabled (`unoptimized: true`) for portability

## Dependencies

### Core Framework
- Next.js 16.0.3 with App Router
- React 19.2.0 + React DOM 19.2.0
- TypeScript 5.x with strict mode

### Styling
- Tailwind CSS 4.1.17 with PostCSS
- @tailwindcss/postcss 4.1.17
- tw-animate-css 1.4.0 - Animation utilities

### UI Components
- shadcn/ui components (button)
- lucide-react - Icon library

### WebGL & 3D Rendering
- three@0.181.2 - Three.js for 3D ASCII art rendering
- @types/three@0.181.0 - TypeScript definitions for Three.js
- ogl@1.0.11 - Lightweight WebGL library for shader effects

### Fonts
- @fontsource/jetbrains-mono@5.2.8 - Self-hosted JetBrains Mono font
- next/font/google - IBM Plex Mono (loaded via Next.js font optimization)
- geist@1.5.1 - Installed but not currently used (legacy)

### Development Tools
- ESLint with Next.js config
- TypeScript with @types/node, @types/react, @types/react-dom

## Adding shadcn/ui Components

Use the shadcn CLI to add new components:
```bash
pnpm dlx shadcn@latest add [component-name]
```

This will automatically place components in `components/ui/` following the existing configuration.

**Note on ReactBits Components:**
For ReactBits components specifically, use the shadcn CLI with the ReactBits registry URL:
```bash
npx shadcn@latest add https://reactbits.dev/r/[ComponentName]-TS-TW.json
```

This automatically installs TypeScript + Tailwind variants of ReactBits components.

## Build Configuration Notes

- TypeScript errors do not block builds (`typescript.ignoreBuildErrors: true`)
- Images are not optimized at build time
- ESLint is run separately via `pnpm lint` and does not run during builds in Next.js 16
- These settings prioritize rapid iteration over strict validation

## Code Style

- TypeScript with strict mode enabled
- 2-space indentation (inferred from existing code)
- Component files: kebab-case filenames (e.g., `terminal-hero.tsx`)
- Component exports: PascalCase (e.g., `TerminalHero`)
- Use `cn()` utility from `@/lib/utils` for conditional className merging
- Prefer named exports for components
- Use `"use client"` directive only when component requires client-side features
- WebGL components (FaultyTerminal, ASCIIText) use default exports for dynamic import compatibility
- Browser-only components must be imported with `dynamic(..., { ssr: false })` pattern
