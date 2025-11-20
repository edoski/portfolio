import { SiGithub, SiLinkedin } from "react-icons/si"
import { LuMail } from "react-icons/lu"
import type { IconType } from "react-icons"

export interface SocialLink {
  platform: string
  label: string
  url: string
  icon: IconType
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/edoski",
    icon: SiGithub,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/edoardo-galli-5074321b9/",
    icon: SiLinkedin,
  },
  {
    platform: "email",
    label: "Email",
    url: "mailto:edoski.dev@gmail.com",
    icon: LuMail,
  },
]

export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  directory: string
}

export const PROJECTS: Project[] = [
  {
    title: "sweng-notes",
    description: "a real-time collaborative note editor.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Liveblocks", "Convex"],
    github: "https://github.com/edoski/sweng-notes",
    demo: "https://sweng-notes.vercel.app",
    directory: "sweng-notes",
  },
  {
    title: "portfolio",
    description: "edo's developer portfolio.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "WebGL"],
    github: "https://github.com/edoski/portfolio",
    demo: "https://edoski.com",
    directory: "portfolio",
  },
  {
    title: "bostarter",
    description: "a kickstarter-like platform for managing projects.",
    tech: ["PHP", "MySQL", "MongoDB", "Docker", "Apache"],
    github: "https://github.com/edoski/bostarter",
    demo: "#",
    directory: "bostarter",
  },
  {
    title: "pubsub",
    description: "a terminal-based, publish-subscribe protocol for texts.",
    tech: ["Java", "Sockets", "Multithreaded", "ExecutorService"],
    github: "https://github.com/edoski/pubsub",
    demo: "#",
    directory: "pubsub",
  },
]

export interface BioSegment {
  text: string
  bold?: boolean
}

export interface TerminalBio {
  segments: BioSegment[]
  mobileBreakAfter: number[]
}

export const TERMINAL_BIO: TerminalBio = {
  segments: [
    { text: "\"aspiring software engineer, studying " },
    { text: "Computer Science (BSc)", bold: true },
    { text: " at the " },
    { text: "University of Bologna", bold: true },
    { text: ".\"" },
  ],
  mobileBreakAfter: [0, 2],
}