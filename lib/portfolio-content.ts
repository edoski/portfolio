export type LinkKind = "github" | "linkedin" | "email" | "resume"

export interface PortfolioLink {
  kind: LinkKind
  label: string
  href: string
  external?: boolean
}

export interface Project {
  title: string
  directory: string
  summary: string
  details: string
  focus: string[]
  outcomes: string[]
  tech: string[]
  repo: string
  demo?: string
}

export const profile = {
  name: "Edoardo Galli",
  handle: "edo",
  prompt: "edo@portfolio",
  asciiText: "edo.",
  userFile: [
    "Edoardo Galli, 22 - native English & Italian speaker studying Information Science for Management (BSc) at the University of Bologna.",
    "Focused on deep learning, AI systems, and data-intensive software.",
  ],
  location: "Bologna, Italy",
} as const

export const navigation = [
  { label: "projects", href: "#projects", command: "cd ~/projects", external: false },
  { label: "contact", href: "#contact", command: "open ~/contact", external: false },
  { label: "resume", href: "/CV_Edoardo_Galli.pdf", command: "cat resume.pdf", external: true },
] as const

export const links: PortfolioLink[] = [
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

export const primaryLinks = ["github", "resume", "email"] satisfies LinkKind[]

export const projects: Project[] = [
  {
    title: "spice",
    directory: "spice",
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

export const contactLinks = links

export function getLink(kind: LinkKind) {
  return links.find((link) => link.kind === kind)
}

export function getProject(directory: string) {
  return projects.find((project) => project.directory === directory)
}
