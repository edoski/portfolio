type LinkKind = "github" | "linkedin" | "email" | "resume"

export interface PortfolioLink {
  kind: LinkKind
  label: string
  href: string
  external?: boolean
}

export interface Project {
  title: string
  directory: string
  category: ProjectCategory
  summary: string
  details: string
  focus: string[]
  outcomes: string[]
  tech: string[]
  repo: string
  demo?: string
}

export type ProjectCategory = "ai" | "systems" | "web"

export const profile = {
  name: "Edoardo Galli",
  handle: "edo",
  prompt: "edo@portfolio",
  asciiText: "edo.",
  location: "Bologna, Italy",
} as const

export const education = [
  {
    title: "M.Sc. Artificial Intelligence",
    institution: "University of Bologna",
  },
  {
    title: "B.Sc. Information Science for Management",
    institution: "University of Bologna",
  },
  {
    title: "International Baccalaureate Diploma",
    institution: "International School of Bologna",
  },
] as const

export const navigation = [
  { label: "projects", href: "/#projects", command: "cd ~/projects", external: false },
  { label: "contact", href: "/#contact", command: "open ~/contact", external: false },
  { label: "resume", href: "/CV_Edoardo_Galli.pdf", command: "cat resume.pdf", external: true },
] as const

export const contactLinks: PortfolioLink[] = [
  {
    kind: "github",
    label: "GitHub",
    href: "https://github.com/edoski",
    external: true,
  },
  {
    kind: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/edoardo-galli-5074321b9/",
    external: true,
  },
  {
    kind: "email",
    label: "Email",
    href: "mailto:edoski.dev@gmail.com",
  },
  {
    kind: "resume",
    label: "Resume",
    href: "/CV_Edoardo_Galli.pdf",
    external: true,
  },
]

export const featuredProjects: Project[] = [
  {
    title: "spice",
    directory: "spice",
    category: "ai",
    summary: "Temporal fee-decision deep learning pipeline.",
    details:
      "End-to-end thesis pipeline turning EVM block history into temporal deep learning problems. LSTM, Transformer, and hybrid model families with Optuna tuning and reproducible workflows.",
    focus: [
      "Temporal modelling over EVM block-history sequences.",
      "Reproducible training and tuning workflows for model comparison.",
      "Data contracts around feature generation and experiment configuration.",
    ],
    outcomes: [
      "Compared LSTM, Transformer, and hybrid model families.",
      "Built Optuna-driven tuning loops around repeatable experiments.",
      "Turned raw chain history into supervised deep learning datasets.",
    ],
    tech: ["Python", "PyTorch", "Optuna", "Polars", "Pydantic", "web3.py"],
    repo: "https://github.com/edoski/spice",
  },
  {
    title: "journal",
    directory: "journal",
    category: "systems",
    summary: "Personal analytics journal pipeline.",
    details:
      "Automation system syncing Flow focus data, goals, reminders, and daily metrics into Obsidian. Typed contracts, protocol ports, and snapshot-based period reports.",
    focus: [
      "Personal data automation across focus sessions and daily planning.",
      "Typed ports around external tools and local Obsidian files.",
      "Period reports generated from snapshot-based metrics.",
    ],
    outcomes: [
      "Synced Flow focus data, goals, reminders, and daily metrics.",
      "Used Pydantic contracts to keep automation inputs explicit.",
      "Produced daily and period views inside the Obsidian workspace.",
    ],
    tech: ["Python", "Pydantic", "pytest", "Obsidian"],
    repo: "https://github.com/edoski/journal",
  },
  {
    title: "sweng-notes",
    directory: "sweng-notes",
    category: "web",
    summary: "Real-time collaborative note editor.",
    details:
      "A shared writing workspace built around typed React surfaces, Liveblocks presence, and Convex-backed collaboration.",
    focus: [
      "Real-time document editing with presence-aware collaboration.",
      "Typed product surfaces across Next.js and React.",
      "Backend state flows through Convex with Liveblocks interaction state.",
    ],
    outcomes: [
      "Delivered a working collaborative editor with live presence.",
      "Separated durable document state from collaboration UI state.",
      "Kept the interface fast and direct for shared writing sessions.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Liveblocks", "Convex"],
    repo: "https://github.com/edoski/sweng-notes",
    demo: "https://sweng-notes.vercel.app",
  },
  {
    title: "stackoverflow-survey-2025-analysis",
    directory: "stackoverflow-survey-2025-analysis",
    category: "ai",
    summary: "AI trust analysis from the Stack Overflow 2025 Developer Survey.",
    details:
      "Logistic regression and SVM classifiers with leakage-safe preprocessing, GridSearchCV, and reproducible statistical analysis workflow.",
    focus: [
      "Leakage-safe preprocessing for survey-derived classification tasks.",
      "Statistical modelling around AI trust and developer sentiment.",
      "Reproducible notebooks and scripts for inspecting model behaviour.",
    ],
    outcomes: [
      "Trained interpretable logistic regression and SVM baselines.",
      "Used GridSearchCV for controlled estimator comparison.",
      "Produced analysis artifacts with clear feature and metric traceability.",
    ],
    tech: ["Python", "scikit-learn", "pandas", "statsmodels", "seaborn"],
    repo: "https://github.com/edoski/stackoverflow-survey-2025-analysis",
  },
]

export const projectIndexProjects: Project[] = [
  ...featuredProjects,
  {
    title: "portfolio",
    directory: "portfolio",
    category: "web",
    summary: "Developer portfolio with a terminal-minimal interface.",
    details:
      "Personal portfolio site built with Next.js, React, Tailwind CSS, and a focused Three.js ASCII mark. The current architecture keeps portfolio facts centralized and page sections modular.",
    focus: [
      "Terminal-minimal portfolio composition with dense project surfaces.",
      "Centralized content data for profile, links, and project facts.",
      "Small client islands for visual effects without moving whole sections client-side.",
    ],
    outcomes: [
      "Built a responsive portfolio around Next.js App Router.",
      "Retained a signature Three.js ASCII mark without ambient background animation.",
      "Consolidated portfolio content into a reusable typed module.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
    repo: "https://github.com/edoski/portfolio",
    demo: "https://edoski.com",
  },
  {
    title: "bostarter",
    directory: "bostarter",
    category: "web",
    summary: "Kickstarter-like platform for managing projects.",
    details:
      "Crowdfunding-style web platform for creating, browsing, and managing project campaigns, built with PHP services, SQL and document data stores, and a Dockerized Apache environment.",
    focus: [
      "Campaign-style project management flows.",
      "Relational and document persistence across MySQL and MongoDB.",
      "Dockerized local environment for repeatable PHP and Apache development.",
    ],
    outcomes: [
      "Implemented a project-management platform inspired by crowdfunding workflows.",
      "Used MySQL and MongoDB for different persistence needs.",
      "Packaged the runtime with Docker and Apache.",
    ],
    tech: ["PHP", "MySQL", "MongoDB", "Docker", "Apache"],
    repo: "https://github.com/edoski/bostarter",
  },
  {
    title: "pubsub",
    directory: "pubsub",
    category: "systems",
    summary: "Terminal publish-subscribe protocol for text messages.",
    details:
      "Java socket application implementing a terminal-based publish-subscribe protocol, with multithreaded client handling and ExecutorService-backed concurrency.",
    focus: [
      "Socket-based publish-subscribe communication.",
      "Concurrent client handling through Java threading primitives.",
      "Terminal-first protocol design for message exchange.",
    ],
    outcomes: [
      "Built a working publish-subscribe messaging protocol.",
      "Handled multiple clients with ExecutorService concurrency.",
      "Kept the interface terminal-based and protocol-focused.",
    ],
    tech: ["Java", "Sockets", "Multithreaded", "ExecutorService"],
    repo: "https://github.com/edoski/pubsub",
  },
]

export function getProject(directory: string) {
  return projectIndexProjects.find((project) => project.directory === directory)
}
