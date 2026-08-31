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
  name: "edoardo galli",
  handle: "edo",
  prompt: "edo@portfolio",
  asciiText: "edo.",
  location: "Bologna, Italy",
  summary: [
    { text: "deep-learning", emphasis: true },
    { text: " and ", emphasis: false },
    { text: "data-intensive AI systems", emphasis: true },
    { text: "; studying ", emphasis: false },
    { text: "artificial intelligence", emphasis: true },
    { text: " at the ", emphasis: false },
    { text: "University of Bologna", emphasis: true },
    { text: ".", emphasis: false },
  ],
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
] as const

export const experience = {
  role: "Research Intern",
  organization: "Department of Computer Science and Engineering (DISI), University of Bologna",
  period: "Apr–Aug 2026",
} as const

export const publications = [
  {
    title: "KAIROS: A Predictive Framework for Cost Optimization in Blockchain Environments",
    authors: "I. Zyrianoff, E. Galli, A. Esposito, L. Gigli, M. Di Felice, and F. Montori",
    venue: "IEEE Consumer Communications & Networking Conference (CCNC), 2027",
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
    segments: [
      { text: "open to ", emphasis: false },
      { text: "ML/AI", emphasis: true },
      { text: " engineering and ", emphasis: false },
      { text: "research", emphasis: true },
      { text: " roles.", emphasis: false },
    ],
  },
  {
    label: "location",
    segments: [
      { text: "Bologna, Italy; ", emphasis: false },
      { text: "remote-friendly", emphasis: true },
      { text: ".", emphasis: false },
    ],
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
    title: "kairos",
    directory: "kairos",
    category: "ai",
    summary: "Deep learning for low-fee transaction timing.",
    tech: ["Python", "PyTorch", "Lightning", "ExecuTorch"],
    repo: "https://github.com/edoski/kairos",
    detail: {
      tagline: "Learning when to execute blockchain transactions.",
      overview: [
        "KAIROS learns from finalized EVM block history to choose a low-base-fee block within a fixed future horizon. It turns externally built corpora into causal temporal samples, compares sequence models, and evaluates their timing decisions with mean per-origin economic metrics.",
        "The project extends the original SPICE temporal experiment into a thesis-grade research and execution system: typed experiment programs, HPO, Slurm campaigns, durable training and evaluation objects, and an Expo/ExecuTorch demo.",
      ],
      implementation: [
        "The Python pipeline loads canonical corpora, builds causal block features and historical windows, trains LSTM, Transformer, and Transformer-LSTM models with PyTorch Lightning, then selects candidates by economic optimality gap.",
        "The mobile exporter converts selected models for ExecuTorch. The Expo app reads Ethereum, Polygon, and Avalanche directly through viem and runs inference on-device without a server fallback.",
      ],
      capabilities: [
        {
          title: "Causal temporal samples",
          description: "Uses strict closed-parent history and fixed block-count horizons to prevent future-data leakage.",
        },
        {
          title: "Dual-head sequence models",
          description: "Compares three model families that predict both a target block offset and its minimum base fee.",
        },
        {
          title: "Economic evaluation",
          description: "Selects and reports models with optimality gap, fee savings, and P50 fee-inclusive evaluation.",
        },
        {
          title: "On-device inference",
          description: "Exports trained models for a serverless ExecuTorch mobile demonstration backed by direct chain reads.",
        },
      ],
      status:
        "Active public thesis/research project, versioned 0.1.0, with a complete Python/HPC system and a validated three-chain Expo/ExecuTorch on-device demo. It is not a production transaction service.",
      artifacts: [
        "Experiment programs and ADRs",
        "Durable model and evaluation objects",
        "ExecuTorch exporter and Expo app",
      ],
    },
  },
  {
    title: "blockweaver",
    directory: "blockweaver",
    category: "systems",
    summary: "Immutable, verifiable EVM block dataset acquisition.",
    tech: ["Python", "Polars", "JSON-RPC", "BigQuery"],
    repo: "https://github.com/edoski/blockweaver",
    detail: {
      tagline: "Feature-selected EVM block datasets with verifiable provenance.",
      overview: [
        "Blockweaver downloads feature-selected EVM block ranges through JSON-RPC or Google BigQuery into immutable Parquet or CSV datasets. Chains, sources, and providers are configuration rather than code, and each successful request publishes one data file with one canonical manifest.",
        "The tool is built for reproducible research inputs: it resolves block or time ranges against finalized chain state, resumes only exact request bindings, and keeps source-specific acquisition behind one artifact contract.",
      ],
      implementation: [
        "A Typer CLI loads strict TOML configuration. aiohttp batches EVM JSON-RPC requests; the optional BigQuery source discovers compatible schemas, enforces a dry-run byte cap, and streams bounded pages; Polars builds the same typed tables for either source.",
        "Complete chunks are digest-bound before reuse. The assembled candidate is validated, synced, and atomically published without replacement; its manifest records schema, provenance, finality, verification samples, and a SHA-256 digest without secrets.",
      ],
      capabilities: [
        {
          title: "Configurable acquisition",
          description: "Uses named chain, source, and provider profiles to acquire finalized EVM history through JSON-RPC or optional Google BigQuery.",
        },
        {
          title: "Feature-selected datasets",
          description: "Coalesces requested block-header and fee-history features into typed Parquet or canonical CSV output.",
        },
        {
          title: "Layered verification",
          description: "Validates artifact integrity offline; RPC verification refreshes finality and checks ancestry and deterministic row samples, and independently verifies BigQuery acquisitions before publication.",
        },
        {
          title: "Recoverable publication",
          description: "Resumes validated checkpoints and atomically publishes immutable two-file artifacts without overwriting destinations.",
        },
      ],
      status:
        "Active public MIT-licensed Python CLI, versioned 0.2.0, with focused end-to-end coverage for acquisition, recovery, publication, and verification contracts.",
      artifacts: [
        "Canonical dataset manifests",
        "Parquet and CSV block datasets",
        "Machine-readable receipts",
      ],
    },
  },
  {
    title: "journal",
    directory: "journal",
    category: "systems",
    summary: "Local-first Obsidian analytics automation.",
    tech: ["Python", "Obsidian", "SQLite"],
    repo: "https://github.com/edoski/journal",
    detail: {
      tagline: "Local-first automation for Obsidian journal analytics.",
      overview: [
        "journal-sync is local-first Python automation that turns Flow focus sessions and iCloud Shortcut payloads into deterministic daily, weekly, monthly, and yearly analytics inside an Obsidian vault.",
        "It also maintains media and university-grade workflows. The codebase emphasizes strict parsers, stable Markdown rendering, atomic note updates, advisory locks, and recoverable validation or quarantine for external payloads.",
      ],
      implementation: [
        "CLI commands dispatch daily and period sync through application services. Focused adapters read Flow SQLite, iCloud status JSON, schedules, media sources, and Obsidian Markdown.",
        "Domain modules compute metrics and reporting windows, then render stable frontmatter, tables, text charts, trends, and moving averages back into the vault through file-safe publication.",
      ],
      capabilities: [
        {
          title: "Daily sync",
          description: "Combines Flow sessions, schedule rules, training, and sleep data into Obsidian metrics and frontmatter.",
        },
        {
          title: "Period reports",
          description: "Builds weekly, monthly, and yearly Markdown reports with deterministic tables, trends, and moving averages.",
        },
        {
          title: "Media workflows",
          description: "Scans books and podcast series, regenerates series indexes, and imports Kindle annotations.",
        },
        {
          title: "Safe local operation",
          description: "Protects note updates with atomic writes, advisory locks, and recoverable external-payload validation.",
        },
      ],
      status:
        "Active public personal automation, packaged as journal-sync with a standard-library-only runtime and focused test, snapshot, import-boundary, and mutation coverage.",
      artifacts: [
        "Shortcut status contract docs",
        "Grade sync docs",
        "Snapshot render baselines",
      ],
    },
  },
  {
    title: "servatus",
    directory: "servatus",
    category: "systems",
    summary: "Resumable Slurm work and atomic publication.",
    tech: ["Python", "Slurm", "OpenSSH", "Apptainer"],
    repo: "https://github.com/edoski/servatus",
    detail: {
      tagline: "Run resumable work through Slurm and atomically publish validated outputs.",
      overview: [
        "Servatus is zero-runtime-dependency Python infrastructure for resumable application work. Campaign submits immutable ordered tasks to Slurm through native OpenSSH and Apptainer, while Workspace preserves private work and atomically publishes application-validated outputs.",
        "Resilience is concentrated at distributed submission and POSIX publication. Durable intent and receipt state prevents silent duplicate submission; identity locks and no-replace commits prevent concurrent corruption or overwrite. Applications retain task meaning, schemas, validation, and completion decisions.",
      ],
      implementation: [
        "Campaign freezes task order, arguments, and payload digests; plans balanced homogeneous allocations with exact CPU, memory, and GPU resources; renders quote-safe Slurm scripts; then records intent before submission and receipts after acceptance.",
        "Workspace binds hidden state to an application destination and opaque identity. Draft assembles same-filesystem files, syncs content, and uses a kernel-enforced no-replace rename to expose one absent-or-complete immutable directory.",
      ],
      capabilities: [
        {
          title: "Durable Slurm campaigns",
          description: "Packs ordered tasks into exact resource allocations and executes them through native OpenSSH, Slurm, and Apptainer.",
        },
        {
          title: "Submission recovery",
          description: "Uses durable intents and receipts, explicit retries, and bounded ambiguity resolution to avoid silent duplicate work.",
        },
        {
          title: "Resumable workspaces",
          description: "Preserves private checkpoints across failures while binding each workspace to one opaque request identity.",
        },
        {
          title: "Atomic publication",
          description: "Syncs and commits application-validated outputs without exposing partial or overwritten destinations.",
        },
      ],
      status:
        "Active public MIT-licensed 0.1.0 Python package on PyPI for Linux and macOS. It provides one concrete OpenSSH, Slurm, Apptainer, and POSIX implementation without becoming a workflow engine or owning application completion logic.",
      artifacts: [
        "Typed zero-dependency Python package",
        "Campaign plans, intents, and receipts",
        "Context glossary and ADRs",
      ],
    },
  },
]

const projectIndexCatalog: Project[] = [
  ...featuredProjectCatalog,
  {
    title: "sweng-notes",
    directory: "sweng-notes",
    category: "web",
    summary: "Real-time collaborative note editor.",
    tech: ["Next.js", "Convex", "Liveblocks", "TipTap"],
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
    tech: ["Python", "scikit-learn", "statsmodels"],
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
  {
    title: "portfolio",
    directory: "portfolio",
    category: "web",
    summary: "Developer portfolio with a terminal-minimal interface.",
    tech: ["Next.js", "Tailwind CSS", "Three.js"],
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
    tech: ["PHP", "MySQL", "Docker"],
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
    tech: ["Java", "Sockets", "ExecutorService"],
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
