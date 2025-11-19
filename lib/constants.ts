import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface SocialLink {
  platform: string
  label: string
  url: string
  icon: LucideIcon
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/edoski",
    icon: Github,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/edoardo-galli-5074321b9/",
    icon: Linkedin,
  },
  {
    platform: "twitter",
    label: "Twitter",
    url: "https://twitter.com",
    icon: Twitter,
  },
  {
    platform: "email",
    label: "Email",
    url: "mailto:contact@example.com",
    icon: Mail,
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
