export type LinkKind = "github" | "linkedin" | "email" | "resume"

export interface PortfolioLink {
  kind: LinkKind
  label: string
  href: string
  external?: boolean
  display?: string
}

export interface TimelineEntry {
  title: string
  organization: string
  period: string
  note?: string
}

export interface Publication {
  title: string
  authors: string[]
  venue: string
  venueFull: string
  year: string
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
  citationName: "E. Galli",
  summary: [
    { text: "deep learning", emphasis: true },
    { text: " and ", emphasis: false },
    { text: "data-intensive AI systems", emphasis: true },
    { text: ".", emphasis: false },
  ],
  now: [
    { text: "software engineer", emphasis: true },
    { text: " at ", emphasis: false },
    { text: "Amoreg", emphasis: true },
    { text: "; M.Sc. ", emphasis: false },
    { text: "artificial intelligence", emphasis: true },
    { text: " at the ", emphasis: false },
    { text: "University of Bologna", emphasis: true },
    { text: ".", emphasis: false },
  ],
} as const

export const experience: TimelineEntry[] = [
  {
    title: "Software Engineer",
    organization: "Amoreg",
    period: "Oct 2026 – now",
  },
  {
    title: "Research Intern",
    organization: "DISI, University of Bologna",
    period: "Apr – Sep 2026",
  },
]

export const education: TimelineEntry[] = [
  {
    title: "M.Sc. Artificial Intelligence",
    organization: "University of Bologna",
    period: "Sep 2026 – now",
  },
  {
    title: "B.Sc. Information Science for Management",
    organization: "University of Bologna",
    period: "Sep 2021 – Sep 2026",
    note: "109/110",
  },
]

export const publications: Publication[] = [
  {
    title: "KAIROS: A Predictive Framework for Cost Optimization in Blockchain Environments",
    authors: ["I. Zyrianoff", "E. Galli", "A. Esposito", "L. Gigli", "M. Di Felice", "F. Montori"],
    venue: "IEEE CCNC",
    venueFull: "IEEE Consumer Communications & Networking Conference",
    year: "2027",
  },
]

export function getPublicationsByYear() {
  const years = [...new Set(publications.map((publication) => publication.year))]
    .sort((a, b) => b.localeCompare(a))

  return years.map((year) => ({
    year,
    publications: publications.filter((publication) => publication.year === year),
  }))
}

export const navigation = [
  { label: "projects", href: "/projects", command: "cd ~/projects", external: false },
  { label: "contact", href: "/#contact", command: "open ~/contact", external: false },
  { label: "resume", href: "/CV_Edoardo_Galli.pdf", command: "cat resume.pdf", external: true },
] as const

export const contactLinks: PortfolioLink[] = [
  {
    kind: "github",
    label: "GitHub",
    href: "https://github.com/edoski",
    display: "github.com/edoski",
    external: true,
  },
  {
    kind: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/edoardo-galli-5074321b9/",
    display: "in/edoardo-galli-5074321b9",
    external: true,
  },
  {
    kind: "email",
    label: "Email",
    href: "mailto:edoski.dev@gmail.com",
    display: "edoski.dev@gmail.com",
  },
  {
    kind: "resume",
    label: "Resume",
    href: "/CV_Edoardo_Galli.pdf",
    display: "CV_Edoardo_Galli.pdf",
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
        "KAIROS learns from finalized EVM block history to choose a low-base-fee block within a fixed future horizon. It builds causal samples from Blockweaver datasets, compares sequence models on Ethereum, Polygon, and Avalanche, and scores their timing decisions with per-origin economic metrics.",
        "The project extends the temporal experiment from SPICE and underpins the IEEE CCNC 2027 paper on KAIROS. Staged feature, context, HPO, and horizon studies run as Slurm GPU campaigns, and the selected models ship in an Expo/ExecuTorch demo.",
      ],
      implementation: [
        "The Python pipeline resolves UUID-addressed Blockweaver datasets, builds causal block features and historical windows, and trains LSTM, Transformer, and Transformer-LSTM models with PyTorch Lightning. Candidates are selected by validation optimality gap, and held-out analysis adds a fixed-deadline rolling policy and time-clustered bootstrap intervals.",
        "Servatus handles durable campaigns, atomic publication, and OpenSSH/Slurm/Apptainer submission. An isolated exporter converts twelve selected models to XNNPACK ExecuTorch programs with parity checks, and the Expo app runs them on-device over public RPC without a server fallback.",
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
          title: "Held-out economic evaluation",
          description: "Reports optimality gap and base-fee and P50 fee-inclusive savings with UTC-hour bootstrap intervals.",
        },
        {
          title: "On-device inference",
          description: "Bundles twelve parity-checked models, three chains by four horizons, into a serverless Expo app.",
        },
      ],
      status:
        "Public MIT-licensed research code released as v1.0.0, with data and trained models archived on Zenodo. The mobile demo has run on an iOS Simulator build, not physical devices, and KAIROS is not a production transaction service.",
      artifacts: [
        "Study, artifact, and evaluation objects",
        "Zenodo data and model release",
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
        "Blockweaver downloads feature-selected EVM block ranges through JSON-RPC or Google BigQuery into immutable, UUID-addressed Parquet or CSV datasets. Chains, sources, and providers are configuration rather than code, and each successful request publishes one data file with one canonical manifest.",
        "The tool is built for reproducible research inputs: it resolves block or time ranges against finalized chain state, resumes only exact request bindings, and keeps source-specific acquisition behind one artifact contract. KAIROS loads its block corpora as Blockweaver datasets through the public loader.",
      ],
      implementation: [
        "A Typer CLI loads strict TOML configuration. aiohttp batches EVM JSON-RPC requests; the optional BigQuery source discovers compatible schemas, enforces a dry-run byte cap, and streams bounded pages; Polars builds the same typed tables for either source.",
        "Complete chunks are digest-bound before reuse. The assembled candidate is validated, synced, and atomically published without replacement; its manifest records schema, provenance, finality, verification samples, and a SHA-256 digest without secrets. A read-only Python loader applies the same strict validator as verify.",
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
          description: "Validates artifact integrity offline from the CLI or Python; RPC verification refreshes finality and checks ancestry and deterministic row samples, and independently verifies BigQuery acquisitions before publication.",
        },
        {
          title: "Recoverable publication",
          description: "Resumes validated checkpoints and atomically publishes immutable two-file artifacts under their dataset UUID without overwriting destinations.",
        },
      ],
      status:
        "Public MIT-licensed Python CLI and library, released as 0.3.4 on PyPI through Trusted Publishing, with over 100 CLI-level tests against fake JSON-RPC and BigQuery services in Linux and macOS CI.",
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
    summary: "Obsidian journal automation and AI tutor memory.",
    tech: ["Python", "Swift", "TypeScript", "Obsidian"],
    repo: "https://github.com/edoski/journal",
    detail: {
      tagline: "Local-first journal analytics and durable study memory for AI tutors.",
      overview: [
        "Journal is local-first Python automation for an Obsidian vault. Its sync package turns Flow focus sessions and iCloud Shortcut payloads into deterministic daily, weekly, monthly, and yearly analytics, maintains media and university-grade workflows, and runs on schedule through a background macOS app.",
        "Its learning package gives AI tutors in Pi, Claude, and Codex durable per-course memory. Each course directory owns a study workspace that separates learner evidence, revisable tutor knowledge, unfinished tasks, and a course route; planning reads recorded study time from the journal through one read-only interface.",
      ],
      implementation: [
        "Sync commands dispatch through application services over small ports. Adapters read Flow SQLite, iCloud status JSON, schedules, and Obsidian Markdown; writers render typed chart and table specs back through locked, atomic note publication. A Swift AppKit app bundles a signed Python runtime for LaunchAgents and Flow session prompts.",
        "A standard-library Python agent CLI answers five read verbs with whole items packed into UTF-8 byte budgets, and publishes field patches under revision and digest checks, locks, and atomic replacement. One canonical skill owns the teaching workflow; a TypeScript Pi extension adds tools, quizzes, and live Obsidian lesson notes.",
      ],
      capabilities: [
        {
          title: "Journal analytics",
          description: "Builds daily, weekly, monthly, and yearly Obsidian reports from Flow sessions, schedules, training, sleep, and media.",
        },
        {
          title: "Native macOS runtime",
          description: "Runs scheduled sync plus Flow session titling, pause reminders, and undo previews from a signed background app.",
        },
        {
          title: "Revisable study memory",
          description: "Records attempts as append-only evidence with linked corrections, kept apart from tutor knowledge, tasks, and preferences.",
        },
        {
          title: "Bounded retrieval",
          description: "Resumes a course in one call, returning whole evidence and knowledge within byte budgets and listing every omission.",
        },
      ],
      status:
        "Active public personal project with a standard-library-only Python runtime, strict mypy, import contracts, rendering snapshots, and Python and Pi adapter tests. The learning subsystem stores study memory for agents; it has no vector store or numerical mastery model.",
      artifacts: [
        "Canonical tutor skill and references",
        "Native-host acceptance protocol",
        "Snapshot render baselines",
      ],
    },
  },
  {
    title: "servatus",
    directory: "servatus",
    category: "systems",
    summary: "Resumable Slurm campaigns and atomic publication.",
    tech: ["Python", "Slurm", "OpenSSH", "Apptainer"],
    repo: "https://github.com/edoski/servatus",
    detail: {
      tagline: "Plan, submit, and observe resumable Slurm campaigns, then atomically publish validated outputs.",
      overview: [
        "Servatus is a zero-dependency Python library and CLI for resumable application work. Campaign keeps an append-only roster of opaque tasks and its durable attempt history, submits reviewed plans to Slurm through native OpenSSH and Apptainer, and observes their scheduler state. Workspace retains private checkpoints and atomically publishes application-validated outputs.",
        "Resilience is concentrated at submission, observation, and POSIX publication. Durable intents and receipts prevent silent duplicate submission, retries require explicit operator choices, and no-replace commits prevent concurrent corruption or overwrite. Applications retain task meaning, result schemas, validation, and completion decisions behind an opaque result probe.",
      ],
      implementation: [
        "Named profiles in SERVATUS.toml resolve a Slurm target and one homogeneous resource request. Planning collects scheduler and result evidence, packs eligible tasks into balanced single-node allocations with exact CPU, memory, and GPU totals, and binds the decision to a campaign revision and integrity digest; submission records intent before contacting Slurm and receipts after acceptance.",
        "Inspection batches bounded squeue and sacct queries per original route, matches immutable allocation identities, and reports result readiness separately from quiescence. Workspace binds hidden state to an opaque identity, and drafts, file stages, and child workspaces commit through kernel no-replace renames that expose one absent-or-complete destination.",
      ],
      capabilities: [
        {
          title: "Profile-driven campaigns",
          description: "Packs append-only task rosters into exact single-node allocations and runs them through OpenSSH, Slurm, and Apptainer.",
        },
        {
          title: "Submission recovery",
          description: "Records durable intents and receipts, reconciles ambiguous allocations by exact identity, and gates duplicate-risk retries.",
        },
        {
          title: "Bounded observation",
          description: "Inspects queue and accounting evidence, reads bounded task logs, and exports revision-bound campaign views as JSON.",
        },
        {
          title: "Atomic publication",
          description: "Retains resumable checkpoints and publishes directories, single files, and child results without partial or overwritten destinations.",
        },
      ],
      status:
        "Active public MIT-licensed alpha Python package for Linux and macOS, released as 0.11.0 on PyPI, with over 500 tests under strict Pyright in CI. It drives one concrete OpenSSH, Slurm, Apptainer, and POSIX lane without becoming a workflow engine, scheduler plugin, or experiment tracker.",
      artifacts: [
        "Typed zero-dependency package and CLI",
        "Schema-versioned campaign state and plans",
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
        "This site presents my profile, experience, education, publications, projects, contact links, resume, repositories, and demos through a black-and-monochrome terminal-inspired interface.",
        "The design uses shell cues, dense project cards, shadcn/ui surfaces, and one orange Three.js ASCII mark as the signature visual. Portfolio facts live in a single typed content module so sections and project routes stay data-driven.",
      ],
      implementation: [
        "Next.js App Router composes server-rendered portfolio sections for the home page, static project index, and generated project detail pages.",
        "Browser-only behavior is isolated into small client islands: ASCII rendering, pointer tilt cards, contact links, tech badges, pointer-traced label rules, and route/session navigation helpers.",
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
