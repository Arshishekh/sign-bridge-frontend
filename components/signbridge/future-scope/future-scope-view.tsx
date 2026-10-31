import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { FutureScopeCards } from '@/components/signbridge/future-scope/future-scope-cards'

export function FutureScopeView({ onBack, backLabel }: { onBack: () => void; backLabel: string }) {
  return (
    <section aria-labelledby="future-scope-heading" className="relative">
      <div
        className="pointer-events-none absolute -right-10 -top-10 hidden h-[340px] w-[50%] md:block"
        aria-hidden="true"
      >
        <Image
          src="/images/future-hands.png"
          alt=""
          fill
          priority
          sizes="60vw"
          className="object-cover object-right [mask-image:linear-gradient(to_right,transparent,black_35%),linear-gradient(to_bottom,black_60%,transparent)] [mask-composite:intersect]"
        />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-lime/25 bg-white/[0.03] px-4 py-2 text-sm text-white/80 backdrop-blur-md transition-colors hover:border-lime/50 hover:text-lime"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {backLabel}
      </button>

      <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-lime/90">
            <span className="h-px w-12 bg-lime/70 shadow-[0_0_8px_rgba(197,255,102,0.7)]" aria-hidden="true" />
            Future Scope
          </p>
          <h1
            id="future-scope-heading"
            className="mt-5 text-balance text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl"
          >
            More Inclusion.
            <br />
            <span className="bg-gradient-to-r from-lime to-[#a8e85a] bg-clip-text text-transparent">
              Bigger Impact.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
            SignBridge has the potential to go beyond basic sign detection and become a powerful tool for real-world
            accessibility, healthcare, and digital communication.
          </p>
        </div>

        <p className="-rotate-12 font-hand text-2xl leading-tight text-lime/90 drop-shadow-[0_0_12px_rgba(197,255,102,0.35)] md:mr-[44%] md:mt-2 md:shrink-0">
          Better
          <br />
          Communication.
          <br />A More Inclusive
          <br />
          Tomorrow.
        </p>
      </div>

      <div className="relative mt-12">
        <FutureScopeCards />
      </div>
    </section>
  )
}
