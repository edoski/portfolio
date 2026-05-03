import { profile } from "@/lib/portfolio-content"

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}