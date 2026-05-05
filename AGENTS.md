# AGENTS.md

This file provides guidance to Codex and other coding agents when working in this repository.

## Project Overview

This is a developer portfolio website built with Next.js 16 App Router. The current design is terminal-minimal: black and monochrome UI, lightweight shell cues, shadcn/ui surfaces, a static square-grid vignette background, and one retained signature effect: the orange Three.js ASCII mark in the hero.

Domain vocabulary lives in `CONTEXT.md`. Use those terms when discussing architecture.

## Development Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Create production build (TypeScript errors are ignored during builds per `next.config.mjs`)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks
- `pnpm exec tsc --noEmit` - Type-check without emitting files

Do not run `pnpm dev` manually. Assume the user already has it running; if it is not, ask them to start it.

## Architecture & Structure

### Page Composition

`app/page.tsx` is the composition module. It renders these Portfolio Sections in order:

1. `Navbar` - navigation with terminal/developer cues
2. `TerminalHero` - Profile, ASCII Mark, biography, education, and contact action
3. `ProjectsSection` - dense Project Card grid
4. `ContactSection` - Contact Link grid
5. `Footer` - minimal site footer

### Content Module

Portfolio facts live in `lib/portfolio-content.ts`. Section modules should consume this module instead of owning URLs, project facts, contact facts, or sentinel values.

Do not reintroduce scattered constants for Profile, Project, Social Link, Contact Link, or navigation content. The content module is the seam for portfolio facts.

### Component Organization

- `components/` - Portfolio Sections plus focused modules such as `ascii-mark`, `project-card`, `contact-link`, `tech-badge`, `tilt-icon-action`, and `terminal-cue`
- `components/ui/` - shadcn/ui primitives currently used by the portfolio (`button`, `card`, `badge`)
- `app/` - Next.js App Router pages, layout, manifest, and global CSS
- `lib/` - shared utilities and portfolio content
- `public/` - static assets

### Client vs Server Components

Keep sections server-rendered unless they need browser-only behavior. Current client islands:

- `components/ascii-mark.tsx` - dynamic browser-only wrapper for `ASCIIText`
- `components/project-card.tsx` - Motion-based Project Card tilt
- `components/contact-link.tsx` and `components/tilt-icon-action.tsx` - Motion-based tilt surfaces
- `components/project-back-link.tsx` and `components/smooth-scroll-link.tsx` - route/sessionStorage navigation helpers

Avoid moving whole sections to `"use client"` for convenience.

## Styling System

- Tailwind CSS v4 with PostCSS
- Design tokens in `app/globals.css`
- Visual direction: black + monochrome UI, orange only for the ASCII Mark
- Static background: `.site-shell` square grid plus vignette, no WebGL background and no ambient RAF loop
- Fonts: JetBrains Mono via `@fontsource`; IBM Plex Mono via `next/font/google` for the ASCII Mark
- shadcn New York style, RSC enabled, neutral base color

Use shadcn primitives for UI elements before adding custom surfaces. Use Cards plus Terminal Cues rather than full terminal windows.

## Effects Policy

Retained effects:

- `ASCIIText` - Three.js ASCII Mark, dynamically imported through `AsciiMark`
- `ProjectCard` tilt - Motion springs, pointer-capable devices only, disabled for reduced motion

Avoid reintroducing the deleted ambient/scroll/text effect stack: WebGL terminal background, scroll stack, star border, typewriter, decrypted text, shiny text, fade wrappers, or generic tilt wrappers.

## Dependencies

Core:

- Next.js 16.2.4
- React 19.2.5
- TypeScript 6.x

UI:

- shadcn/ui primitives
- `@radix-ui/react-slot` for `Button asChild`
- `lucide-react` for generic UI icons
- `react-icons/si` for brand icons only

Effects:

- `three` and `@types/three` for `ASCIIText`
- `motion` for Project Card tilt

Do not add Font Awesome separately; `react-icons` is already installed. Do not add animated background packages unless they replace more code than they add and do not introduce continuous animation loops.

## Adding shadcn/ui Components

Use:

```bash
pnpm dlx shadcn@latest add [component-name]
```

This places components in `components/ui/` following `components.json`.

## Build Configuration Notes

- TypeScript errors do not block `pnpm build` because `typescript.ignoreBuildErrors` is enabled.
- Always run `pnpm exec tsc --noEmit` or `./node_modules/.bin/tsc --noEmit` when validating changes.
- ESLint runs separately via `pnpm lint`.

## Code Style

- TypeScript strict mode
- 2-space indentation
- Component files use kebab-case filenames
- Component exports use PascalCase
- Use `cn()` from `@/lib/utils` for conditional className merging
- Prefer named exports except browser-only modules that require default export compatibility
- Use `"use client"` only for modules with browser-only behavior
