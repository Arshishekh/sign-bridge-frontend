import { ArrowDown, Sparkle } from 'lucide-react'
import { SiteHeader } from '@/components/signbridge/site-header'
import { Hero } from '@/components/signbridge/hero'
import { AuthCard } from '@/components/signbridge/auth-card'
import { AuraBackground } from '@/components/signbridge/aura-background'

export function LandingView({
  onAuthenticated,
  onOpenFutureScope,
}: {
  onAuthenticated: (name: string) => void
  onOpenFutureScope: () => void
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020b08] via-[#04110d] to-[#051410] text-white">
      <AuraBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 sm:px-10 lg:px-16">
        <SiteHeader onAbout={onOpenFutureScope} />

        <main className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1fr_480px] lg:gap-16 lg:py-14">
          <Hero onKnowMore={onOpenFutureScope} />
          <AuthCard onAuthenticated={onAuthenticated} />
        </main>

        <footer className="flex items-center justify-between gap-4 pb-8 text-xs text-white/60">
          <p className="flex items-center gap-2">
            <Sparkle className="size-4 text-lime" aria-hidden="true" />
            More than technology. A bridge.
          </p>
          <a
            href="#how-it-works"
            className="hidden items-center gap-3 transition-colors hover:text-white sm:flex"
          >
            <span className="h-px w-8 bg-white/20" aria-hidden="true" />
            <span className="flex size-9 items-center justify-center rounded-full border border-lime/30 text-lime">
              <ArrowDown className="size-4" aria-hidden="true" />
            </span>
            <span className="border-b border-white/20 pb-0.5">Scroll to explore</span>
          </a>
        </footer>
      </div>
    </div>
  )
}
