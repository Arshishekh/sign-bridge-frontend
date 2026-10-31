import { Hand, Sparkle } from 'lucide-react'

const links = [
  { label: 'Home', href: '#', active: true },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader({ onAbout }: { onAbout: () => void }) {
  return (
    <header className="flex items-center justify-between gap-6 pt-8">
      <div className="flex items-center gap-12">
        <a href="#" className="flex items-center gap-2.5" aria-label="SignBridge home">
          <Hand className="size-8 text-lime drop-shadow-[0_0_10px_rgba(197,255,102,0.6)]" strokeWidth={2.25} aria-hidden="true" />
          <span className="text-2xl font-semibold tracking-tight">SignBridge</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10 text-sm text-white/80">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={
                    link.label === 'About'
                      ? (e) => {
                          e.preventDefault()
                          onAbout()
                        }
                      : undefined
                  }
                  aria-current={link.active ? 'page' : undefined}
                  className={
                    link.active
                      ? 'relative py-2 text-lime after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-lime'
                      : 'py-2 transition-colors hover:text-white'
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="hidden items-center gap-2 rounded-full border border-lime/30 bg-white/[0.03] px-4 py-2.5 text-xs text-white/80 backdrop-blur-md lg:flex">
        <Sparkle className="size-3.5 fill-lime text-lime" aria-hidden="true" />
        Bridging Silence. Building Inclusion.
      </p>
    </header>
  )
}
