# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a developer portfolio website built with Next.js 16 (App Router), showcasing a terminal-inspired design aesthetic. The site uses shadcn/ui components with Tailwind CSS v4 and features typewriter animations for text display.

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
2. `TerminalHero` - Hero section with typewriter effect and terminal window styling
3. `ProjectsSection` - Portfolio projects display
4. `SkillsSection` - Technical skills showcase
5. `ContactSection` - Contact information and form

### Component Organization
- `components/` - Feature components (navbar, terminal-hero, projects-section, skills-section, contact-section)
- `components/ui/` - shadcn/ui primitives (52 components including button, card, form, etc.)
- `app/` - Next.js App Router pages and layouts
- `hooks/` - Custom React hooks (use-toast, use-mobile)
- `lib/` - Utilities (primarily `cn()` utility for className merging)
- `public/` - Static assets
- `styles/` - Global styles (if any beyond globals.css)

### Styling System
- Uses Tailwind CSS v4 with PostCSS configuration
- Design tokens defined as CSS variables in OKLCH color space (`app/globals.css`)
- Terminal-themed colors: `--terminal-green`, `--terminal-orange`, `--terminal-cursor`
- Access colors via `var(--color-*)` syntax or `color:var(--color-terminal-orange)` in Tailwind
- Custom animations: `blink` (cursor), `typewriter` (text typing effect)
- Uses Geist Sans and Geist Mono fonts (configured in `layout.tsx`)
- shadcn/ui configuration: New York style, RSC enabled, neutral base color

### Path Aliases
- `@/*` maps to repository root
- shadcn component aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

### Client vs Server Components
- Most feature components are client components (`"use client"`) due to interactivity (typewriter effects, animations)
- Root layout is a server component
- UI primitives may be server or client depending on interactivity needs

### Key Implementation Details
- **Terminal aesthetic**: Components use terminal-style prompts (`$`, `>`), monospace fonts, and terminal color palette
- **Typewriter effect**: Implemented in `TerminalHero` using `useState`, `useEffect`, and intervals (50ms per character)
- **Responsive design**: Mobile-first with `md:` breakpoints for desktop variations
- **Analytics**: Vercel Analytics integrated in root layout
- **Image optimization**: Disabled (`unoptimized: true`) for portability

## Adding shadcn/ui Components

Use the shadcn CLI to add new components:
```bash
pnpm dlx shadcn@latest add [component-name]
```

This will automatically place components in `components/ui/` following the existing configuration.

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
