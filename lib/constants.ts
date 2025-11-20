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
    title: "AI-Powered Task Manager",
    description: "A smart productivity app that uses machine learning to prioritize tasks and optimize workflows.",
    tech: ["React", "Node.js", "TensorFlow", "MongoDB"],
    github: "#",
    demo: "#",
    directory: "ai-task-manager",
  },
  {
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on Ethereum with smart contracts.",
    tech: ["Solidity", "Web3.js", "React", "IPFS"],
    github: "#",
    demo: "#",
    directory: "blockchain-voting",
  },
  {
    title: "Real-time Collaboration Tool",
    description: "WebRTC-based platform for seamless team collaboration with live document editing.",
    tech: ["WebRTC", "Socket.io", "Vue.js", "Express"],
    github: "#",
    demo: "#",
    directory: "realtime-collab",
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
    { text: "\"software engineer, studying " },
    { text: "Computer Science (BSc)", bold: true },
    { text: " at the " },
    { text: "University of Bologna", bold: true },
    { text: ".\"" },
  ],
  mobileBreakAfter: [0, 2],
}