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
  category: ProjectCategory
  summary: string
  tech: string[]
  repo: string
  demo?: string
  detail: ProjectDetail
}

export interface ProjectDetail {
  tagline: string
  overview: string[]
  implementation: string[]
  capabilities: ProjectCapability[]
  status: string
  artifacts?: string[]
}

export interface ProjectCapability {
  title: string
  description: string
}

export type ProjectCategory = "ai" | "systems" | "web"

export const projectCategoryOrder = ["ai", "systems", "web"] satisfies ProjectCategory[]

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

export const spokenLanguages = [
  {
    language: "English",
    level: "native",
    credential: "IELTS Academic 8.5",
  },
  {
    language: "Italian",
    level: "native",
  },
] as const

export const skillGroups = [
  {
    label: "ai/ml",
    skills: ["PyTorch", "scikit-learn", "Optuna", "pandas", "Polars"],
  },
  {
    label: "code",
    skills: ["Python", "TypeScript", "Java", "PHP", "SQL"],
  },
  {
    label: "web",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "backend",
    skills: ["Pydantic", "Convex", "MySQL", "MongoDB", "Docker"],
  },
] as const

export const navigation = [
  { label: "projects", href: "/projects", command: "cd ~/projects", external: false },
  { label: "contact", href: "/#contact", command: "open ~/contact", external: false },
  { label: "resume", href: "/CV_Edoardo_Galli.pdf", command: "cat resume.pdf", external: true },
] as const

export const contactDetails = [
  {
    label: "status",
    value:
      "M.Sc. AI student open to junior and internship roles across full-stack and AI/ML engineering.",
  },
  {
    label: "location",
    value: "Bologna, Italy; remote-friendly.",
  },
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

const featuredProjectCatalog: Project[] = [
  {
    title: "spice",
    directory: "spice",
    category: "ai",
    summary: "Temporal fee-decision deep learning pipeline.",
    tech: ["Python", "PyTorch", "Optuna", "Polars", "Pydantic", "web3.py"],
    repo: "https://github.com/edoski/spice",
    detail: {
      tagline: "Temporal ML research pipeline for EVM fee-timing decisions.",
      overview: [
        "SPICE turns blockchain block history into supervised temporal decision problems. It acquires canonical EVM block data, builds fee-dynamics features, trains neural sequence models, decodes predictions into timing offsets, and evaluates those decisions with replay-style economic metrics.",
        "The project is structured as a research and operations system rather than a notebook. Typed YAML surfaces define experiments, workflows persist corpora, Optuna studies, model artifacts, evaluations, and benchmark result indexes.",
      ],
      implementation: [
        "A Typer CLI and benchmark runner resolve configuration surfaces into acquisition, training, tuning, prediction, and evaluation workflows.",
        "The pipeline builds or loads a corpus, constructs feature tables, compiles temporal examples, tensorizes sequences, trains model families, decodes outputs into fee-delay decisions, then scores them through evaluator contracts.",
      ],
      capabilities: [
        {
          title: "EVM corpus acquisition",
          description: "Collects block-history data for Ethereum, Polygon, and Avalanche through RPC providers.",
        },
        {
          title: "Sequence model comparison",
          description: "Runs LSTM, Transformer, and Transformer-LSTM families through repeatable training and tuning loops.",
        },
        {
          title: "Economic replay evaluation",
          description: "Scores decoded timing offsets with temporal replay evaluators instead of only model-loss metrics.",
        },
        {
          title: "Durable experiment state",
          description: "Stores corpora, studies, artifacts, evaluations, catalogs, and transfer outputs under explicit roots.",
        },
      ],
      status:
        "Mature thesis/research pipeline, versioned 0.1.0, with broad pytest coverage and checked-in experiment specs. It is not presented as a production trading system.",
      artifacts: [
        "Architecture docs and ADRs",
        "Benchmark SQLite results",
        "Generated benchmark figures",
      ],
    },
  },
  {
    title: "journal",
    directory: "journal",
    category: "systems",
    summary: "Personal analytics journal pipeline.",
    tech: ["Python", "Pydantic", "pytest", "Obsidian"],
    repo: "https://github.com/edoski/journal",
    detail: {
      tagline: "Local-first automation for Obsidian journal analytics.",
      overview: [
        "journal-sync is a personal knowledge and life-tracking sync engine for a Markdown vault. It updates daily, weekly, monthly, quarterly, and yearly notes from Flow focus sessions, iCloud Shortcut payloads, reminders, goals, grades, media logs, and vault context.",
        "The codebase emphasizes deterministic Markdown rendering, typed contracts, strict parsers, cache-backed adapters, and file-safe note updates. It is a CLI-backed automation tool rather than a web app.",
      ],
      implementation: [
        "CLI commands dispatch into application services through runtime wiring. Ports define local integrations; adapters bind Flow SQLite, iCloud status JSON, Obsidian notes, schedules, reminders, goals, media scans, and JSON caches.",
        "Domain modules parse source notes, compute metrics and windows, reconcile goals, then render stable Markdown tables, text charts, and summary blocks back into the vault.",
      ],
      capabilities: [
        {
          title: "Daily sync",
          description: "Combines focus sessions, shortcut status, schedule rules, reminders, goals, and vault state.",
        },
        {
          title: "Period reports",
          description: "Builds week, month, quarter, and year summaries with deltas, targets, moving averages, and text charts.",
        },
        {
          title: "Goal reconciliation",
          description: "Carries active goals through daily and period notes while preserving local Markdown structure.",
        },
        {
          title: "Media and grades",
          description: "Imports Obsidian media, Kindle annotations, and university grade projections into dedicated notes.",
        },
      ],
      status:
        "Internal automation tool, versioned 0.0.0, with extensive tests, snapshot baselines, import rules, mutation tooling, and type/lint configuration.",
      artifacts: [
        "Shortcut status contract docs",
        "Grade sync docs",
        "Snapshot render baselines",
      ],
    },
  },
  {
    title: "sweng-notes",
    directory: "sweng-notes",
    category: "web",
    summary: "Real-time collaborative note editor.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Liveblocks", "Convex"],
    repo: "https://github.com/edoski/sweng-notes",
    demo: "https://sweng-notes.vercel.app",
    detail: {
      tagline: "Permissioned collaborative notes with live editing and version history.",
      overview: [
        "sweng-notes is a collaborative note-taking app where users create, organize, share, and edit notes together. It supports live presence, cursor tracking, owner/editor/reader roles, full-text search, tag filtering, version snapshots, restore flows, and collaborator mentions.",
        "The app is built as a type-safe serverless web product: Next.js and React for the workspace UI, Convex for backend state, Clerk for authentication, and Liveblocks for realtime collaboration.",
      ],
      implementation: [
        "The UI is split across App Router workspace surfaces, dialogs, tabs, and a TipTap editor. Convex owns notes, users, tags, permissions, and versions.",
        "Liveblocks rooms are created per note. Room authorization is checked server-side through Convex, then users receive full or read access based on their note permission.",
      ],
      capabilities: [
        {
          title: "Realtime editing",
          description: "TipTap and Liveblocks provide collaborative editing, presence, and cursors per note room.",
        },
        {
          title: "Granular sharing",
          description: "Owner, editor, and reader roles control write access and collaboration rights.",
        },
        {
          title: "Search and tags",
          description: "Convex queries support title/content search plus tag, author, and date filters.",
        },
        {
          title: "Version history",
          description: "Snapshots make note history inspectable and restorable.",
        },
      ],
      status:
        "Private 0.1.0 app, but beyond prototype: documented manual and architecture, deployed demo, local setup flow, and focused Convex/Liveblocks test coverage.",
      artifacts: [
        "Developer manual",
        "Architecture guide",
        "User documentation PDF",
      ],
    },
  },
  {
    title: "stackoverflow-survey-2025-analysis",
    directory: "stackoverflow-survey-2025-analysis",
    category: "ai",
    summary: "AI trust analysis from Stack Overflow's 2025 survey.",
    tech: ["Python", "scikit-learn", "pandas", "statsmodels", "seaborn"],
    repo: "https://github.com/edoski/stackoverflow-survey-2025-analysis",
    detail: {
      tagline: "Statistical ML analysis of AI trust and compensation in the 2025 developer survey.",
      overview: [
        "This academic analysis studies two questions from the Stack Overflow 2025 Developer Survey: binary prediction of developer AI trust and linear modeling of EUR compensation from professional experience.",
        "The workflow is script-driven. It includes the local survey dataset, preprocessing pipelines, EDA generation, classification modeling, regression diagnostics, PDFs for context, and generated plot artifacts.",
      ],
      implementation: [
        "EDA, classification, and regression each have their own runnable script. Shared preprocessing handles validation, plausibility filters, IQR outlier handling, category reduction, and ordinal mappings.",
        "Classification uses sklearn pipelines with ColumnTransformer so encoding and scaling stay inside the training flow. Regression emits global and per-country diagnostics with residual and QQ plots.",
      ],
      capabilities: [
        {
          title: "AI trust classification",
          description: "Compares Logistic Regression with linear, polynomial, and RBF SVM candidates.",
        },
        {
          title: "Compensation regression",
          description: "Models EUR compensation against work experience with train/test evaluation.",
        },
        {
          title: "Exploratory analysis",
          description: "Generates plots for compensation, experience, AI trust, employment mix, and correlations.",
        },
        {
          title: "Statistical validation",
          description: "Uses repeated runs, cross-validation, confidence intervals, confusion matrices, and residual diagnostics.",
        },
      ],
      status:
        "Mature academic analysis repository with generated outputs and reproducible seeds. It is not packaged as an app or library, and no dedicated test suite is present.",
      artifacts: [
        "Classification diagnostics",
        "EDA plot folders",
        "Regression residual and per-country plots",
      ],
    },
  },
]

const projectIndexCatalog: Project[] = [
  ...featuredProjectCatalog,
  {
    title: "portfolio",
    directory: "portfolio",
    category: "web",
    summary: "Developer portfolio with a terminal-minimal interface.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
    repo: "https://github.com/edoski/portfolio",
    demo: "https://edoski.com",
    detail: {
      tagline: "Terminal-minimal developer portfolio with a focused ASCII signature mark.",
      overview: [
        "This site presents my profile, education, projects, contact links, resume, repositories, and demos through a black-and-monochrome terminal-inspired interface.",
        "The design uses shell cues, dense project cards, shadcn/ui surfaces, and one orange Three.js ASCII mark as the signature visual. Portfolio facts live in a single typed content module so sections and project routes stay data-driven.",
      ],
      implementation: [
        "Next.js App Router composes server-rendered portfolio sections for the home page, static project index, and generated project detail pages.",
        "Browser-only behavior is isolated into small client islands: ASCII rendering, pointer tilt cards, contact links, tech badges, and route/session navigation helpers.",
      ],
      capabilities: [
        {
          title: "Static project system",
          description: "Generates index and detail pages from centralized typed project content.",
        },
        {
          title: "Signature visual",
          description: "Uses Three.js for the hero ASCII mark without adding an ambient animated background.",
        },
        {
          title: "Terminal-minimal UI",
          description: "Combines shell cues, grid/vignette background, shadcn primitives, and monochrome cards.",
        },
        {
          title: "Small client islands",
          description: "Keeps sections server-rendered unless they need browser-only interaction.",
        },
      ],
      status:
        "Active personal site, private 0.1.0 app. Production build, linting, manifest/icons, cache headers, analytics, and static project routes are configured.",
      artifacts: [
        "Domain context docs",
        "Typed portfolio content module",
        "Resume and PWA assets",
      ],
    },
  },
  {
    title: "bostarter",
    directory: "bostarter",
    category: "web",
    summary: "Kickstarter-like platform for managing projects.",
    tech: ["PHP", "MySQL", "MongoDB", "Docker", "Apache"],
    repo: "https://github.com/edoski/bostarter",
    detail: {
      tagline: "Dockerized PHP/MySQL crowdfunding platform for software and hardware projects.",
      overview: [
        "BOSTARTER is a university database-course project modeling a crowdfunding domain with users, creators, admins, projects, rewards, financing, comments, software-role applications, skills, and hardware components.",
        "The portfolio value is in the database-backed product behavior: MySQL constraints, stored procedures, triggers, views, and an event encode domain rules while PHP pages expose them through a Bootstrap interface.",
      ],
      implementation: [
        "Docker Compose runs a PHP 8.2 Apache app, MySQL 8.0 primary database, and MongoDB logging database. The Dockerfile installs PDO MySQL and MongoDB extensions, seeds data, then starts Apache.",
        "PHP is split into public pages, action handlers, UI components, shared functions, and config. Action handlers call stored procedures through a shared EventPipeline that handles validation, redirects, errors, and MongoDB logs.",
      ],
      capabilities: [
        {
          title: "Campaign management",
          description: "Supports project creation, browsing, rewards, financing flows, and creator funding history.",
        },
        {
          title: "Role-based users",
          description: "Models normal users, creators, and admins, including an admin security code.",
        },
        {
          title: "Software staffing",
          description: "Handles project applications with skill-level eligibility checks.",
        },
        {
          title: "Admin operations",
          description: "Includes skill management, platform statistics, and MongoDB-backed activity logs.",
        },
      ],
      status:
        "Complete course project with Dockerized runtime, seeded data, SQL schema, screenshots, ERD, and report docs. No meaningful test suite is present.",
      artifacts: [
        "Database report",
        "ERD diagram",
        "Screen captures for main flows",
      ],
    },
  },
  {
    title: "pubsub",
    directory: "pubsub",
    category: "systems",
    summary: "Terminal publish-subscribe protocol for text messages.",
    tech: ["Java", "Sockets", "Multithreaded", "ExecutorService"],
    repo: "https://github.com/edoski/pubsub",
    detail: {
      tagline: "Terminal publish-subscribe protocol over Java sockets.",
      overview: [
        "pubsub is a Java socket application for topic-based terminal messaging. Clients register as publishers or subscribers, exchange messages by topic, and inspect topic history through command-driven flows.",
        "The project focuses on network programming and concurrency: a server accepts multiple clients, dispatches each connection through a thread pool, and stores topic and user state in concurrent collections.",
      ],
      implementation: [
        "ServerSocket accepts clients and runs ClientHandler instances with ExecutorService. Each handler processes registration, show, list, listall, quit, and message broadcast commands.",
        "The server exposes operator commands for topic inspection, message deletion, topic clearing, user lookup, client kicking, and exporting messages by topic or user.",
      ],
      capabilities: [
        {
          title: "Publisher/subscriber roles",
          description: "Publishers can send and list their messages; subscribers can read topic history.",
        },
        {
          title: "Concurrent client handling",
          description: "Uses a cached thread pool plus concurrent maps and queues for active clients and topic messages.",
        },
        {
          title: "Inspect mode",
          description: "Lets the server pause topic writes, inspect messages, delete entries, and resume queued client commands.",
        },
        {
          title: "Message export",
          description: "Writes topic or user message histories to timestamped log files.",
        },
      ],
      status:
        "Course-style Java project with source files and assignment documentation. It is functional and protocol-focused, but has no README, build file, or automated tests.",
      artifacts: [
        "Assignment PDFs",
        "Server/client source files",
        "Formatted terminal message protocol",
      ],
    },
  },
]

export function getFeaturedProjects() {
  return featuredProjectCatalog
}

export function getProjectIndexProjects() {
  return projectIndexCatalog
}

export function getProjectsByCategory() {
  return projectCategoryOrder.map((category) => ({
    category,
    projects: projectIndexCatalog.filter((project) => project.category === category),
  }))
}

export function getProjectDirectories() {
  return projectIndexCatalog.map((project) => project.directory)
}

export function getProject(directory: string) {
  return projectIndexCatalog.find((project) => project.directory === directory)
}
