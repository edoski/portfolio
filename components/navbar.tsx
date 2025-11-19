"use client"

import { Terminal } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism navbar */}
      <div className="relative bg-background/30 backdrop-blur-[20px] border-b border-white/5 shadow-lg shadow-black/5 isolate overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-terminal-green)]/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <Terminal size={18} className="text-foreground/80" />
              <div className="font-mono text-base font-medium text-foreground flex items-center">
                <span>edo@portfolio</span>
                <span className="inline-block w-[2px] h-[14px] bg-current ml-0.5 opacity-0 group-hover:opacity-100 terminal-cursor transition-opacity"></span>
              </div>
            </a>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1 font-mono text-sm">
                <a
                  href="#about"
                  className="px-2.5 py-2 text-muted-foreground/80 hover:text-foreground hover:bg-white/5 rounded-md transition-all duration-200 group"
                >
                  <span className="text-[color:var(--color-terminal-green)]/60 group-hover:text-[color:var(--color-terminal-green)] mr-1.5 transition-colors">$</span>
                  <span className="group-hover:translate-x-0.5 inline-block transition-transform">about</span>
                </a>
                <a
                  href="#projects"
                  className="px-2.5 py-2 text-muted-foreground/80 hover:text-foreground hover:bg-white/5 rounded-md transition-all duration-200 group"
                >
                  <span className="text-[color:var(--color-terminal-green)]/60 group-hover:text-[color:var(--color-terminal-green)] mr-1.5 transition-colors">$</span>
                  <span className="group-hover:translate-x-0.5 inline-block transition-transform">projects</span>
                </a>
                <a
                  href="#contact"
                  className="px-2.5 py-2 text-muted-foreground/80 hover:text-foreground hover:bg-white/5 rounded-md transition-all duration-200 group"
                >
                  <span className="text-[color:var(--color-terminal-green)]/60 group-hover:text-[color:var(--color-terminal-green)] mr-1.5 transition-colors">$</span>
                  <span className="group-hover:translate-x-0.5 inline-block transition-transform">contact</span>
                </a>
              </div>

              {/* Divider */}
              <div className="h-5 w-px bg-muted-foreground/20"></div>

              {/* Social Links */}
              <div className="flex items-center gap-1">
                {SOCIAL_LINKS.slice(0, 2).map(({ platform, label, url, icon: Icon }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground/70 hover:text-foreground hover:bg-white/5 rounded-md transition-all duration-200 hover:scale-110"
                    title={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>
    </nav>
  )
}
