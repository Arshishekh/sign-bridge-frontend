import { ArrowRight, Hand, MessageSquareMore, Users, Volume2 } from 'lucide-react'
import { Fragment } from 'react'

const steps = [
  { icon: Hand, title: 'Hand Gesture', line1: 'Detected with', line2: 'MediaPipe' },
  { icon: MessageSquareMore, title: 'Text', line1: 'Recognized with', line2: 'AI models' },
  { icon: Volume2, title: 'Voice', line1: 'Converted to', line2: 'speech' },
]

export function Hero({ onKnowMore }: { onKnowMore: () => void }) {
  return (
    <section aria-labelledby="hero-heading" className="flex flex-col">
      <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-lime/80">
        ISL Detection &amp; Conversion System
      </p>

      <h1
        id="hero-heading"
        className="mt-6 text-balance text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl"
      >
        Beyond words.
        <br />
        Into{' '}
        <span className="bg-gradient-to-r from-lime to-[#9be86a] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(197,255,102,0.25)]">
          understanding.
        </span>
      </h1>

      <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/75 sm:text-[17px]">
        SignBridge uses advanced AI to detect Indian Sign Language and convert it into text and
        speech — helping bridge communication gaps and create a more inclusive world.
      </p>

      <ol id="how-it-works" className="mt-10 flex flex-wrap items-start gap-4 sm:gap-6">
        {steps.map((step, i) => (
          <Fragment key={step.title}>
            <li className="flex w-28 flex-col">
              <span className="flex size-[60px] items-center justify-center rounded-full border border-lime/50 bg-lime/[0.04] text-lime shadow-[0_0_24px_rgba(197,255,102,0.18),inset_0_0_12px_rgba(197,255,102,0.08)]">
                <step.icon className="size-6" aria-hidden="true" />
              </span>
              <span className="mt-5 text-sm font-medium uppercase tracking-wide">{step.title}</span>
              <span className="mt-2 text-[13px] leading-snug text-white/65">
                {step.line1}
                <br />
                {step.line2}
              </span>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="flex h-[60px] items-center text-lime/80">
                <ArrowRight className="size-5" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>

      <button
        type="button"
        onClick={onKnowMore}
        aria-label="Know more about SignBridge's future scope"
        className="group mt-14 flex w-full max-w-xs items-center gap-4 rounded-2xl border border-lime/20 bg-[#061d18]/40 p-4 text-left backdrop-blur-md transition-colors hover:border-lime/40"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lime/10 text-lime">
          <Users className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm leading-snug text-white/90">
          Inclusion isn&apos;t a feature,
          <br />
          it&apos;s a foundation.
        </span>
        <ArrowRight
          className="ml-auto size-4 text-lime transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </section>
  )
}
