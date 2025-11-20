"use client"

import DecryptedText from "@/components/DecryptedText"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <button
            onClick={scrollToTop}
            className="font-mono text-sm cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <DecryptedText
              text={`edo's portfolio © ${new Date().getFullYear()}`}
              animateOn="both"
              sequential={true}
              speed={75}
              className="text-[color:var(--color-terminal-green)]"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}