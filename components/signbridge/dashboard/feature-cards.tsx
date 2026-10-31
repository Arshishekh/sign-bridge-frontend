import Image from 'next/image'
import { ArrowRight, BookOpen, Camera, Volume2 } from 'lucide-react'
import type { ReactNode } from 'react'

type Feature = {
  title: string
  description: string
  cta: string
  primary?: boolean
  art: ReactNode
}

const waveHeights = [30, 55, 40, 75, 95, 60, 85, 45, 70, 35, 55, 25]

const features: Feature[] = [
  {
    title: 'ISL Detection',
    description: 'Use your camera to detect Indian Sign Language in real-time and see the recognized text.',
    cta: 'Start Detection',
    primary: true,
    art: <DetectionArt />,
  },
  {
    title: 'Text Conversion',
    description: 'Convert detected signs into text instantly. Copy, save or use it anywhere.',
    cta: 'Get Started',
    art: <TextArt />,
  },
  {
    title: 'Speech Output',
    description: 'Listen to the converted text with natural voice and multiple language options.',
    cta: 'Try Now',
    art: <SpeechArt />,
  },
  {
    title: 'Learning Hub',
    description: 'Explore ISL alphabets, common phrases and practice signs to improve your skills.',
    cta: 'Explore',
    art: <LearningArt />,
  },
]

export function FeatureCards({ onStartDetection }: { onStartDetection: () => void }) {
  return (
    <ul id="features" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {features.map((f) => (
        <li
          key={f.title}
          className="group flex flex-col rounded-3xl border border-emerald-400/20 bg-[#061a14]/50 p-5 shadow-[0_0_40px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all hover:border-lime/35 hover:shadow-[0_0_50px_rgba(197,255,102,0.1)]"
        >
          <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl" aria-hidden="true">
            {f.art}
          </div>
          <h2 className="mt-4 text-lg font-medium">{f.title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{f.description}</p>
          <button
            type="button"
            onClick={f.primary ? onStartDetection : undefined}
            className={`mt-5 flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-all ${
              f.primary
                ? 'bg-lime text-[#0a1a0f] shadow-[0_0_24px_rgba(197,255,102,0.3)] hover:shadow-[0_0_36px_rgba(197,255,102,0.5)]'
                : 'border border-lime/35 bg-black/20 text-white hover:border-lime/70 hover:bg-lime/[0.06]'
            }`}
          >
            {f.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  )
}

function GlowCircle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex size-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] text-white shadow-[0_0_24px_rgba(16,185,129,0.25)] ${className}`}
    >
      {children}
    </span>
  )
}

function DetectionArt() {
  return (
    <>
      <Image
        src="/images/isl-hand-card.png"
        alt=""
        fill
        sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover object-center opacity-90 [mask-image:radial-gradient(circle_at_60%_50%,black_45%,transparent_75%)]"
      />
      <GlowCircle className="absolute left-2 top-1/2 -translate-y-1/2 backdrop-blur-sm">
        <Camera className="size-6" />
      </GlowCircle>
    </>
  )
}

function TextArt() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-12 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/[0.08] font-serif text-2xl">
        T
      </span>
      <ArrowRight className="size-4 text-lime" />
      <span className="relative rounded-xl border border-emerald-400/30 bg-emerald-500/[0.1] px-5 py-3 text-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        Hello
        <span className="absolute -bottom-5 -right-4 flex h-8 items-center gap-0.5">
          {[40, 80, 55, 100, 65, 35].map((h, i) => (
            <span key={i} className="w-1 rounded-full bg-lime/80" style={{ height: `${h}%` }} />
          ))}
        </span>
      </span>
    </div>
  )
}

function SpeechArt() {
  return (
    <div className="flex items-center gap-4">
      <GlowCircle className="size-16">
        <Volume2 className="size-7" />
      </GlowCircle>
      <div className="flex h-20 items-center gap-1">
        {waveHeights.map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-emerald-500/60 to-lime shadow-[0_0_8px_rgba(197,255,102,0.5)]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function LearningArt() {
  return (
    <div className="relative h-24 w-40">
      <span className="absolute right-0 top-0 h-20 w-28 rounded-lg border border-emerald-400/20 bg-emerald-500/[0.05]" />
      <span className="absolute right-4 top-3 h-20 w-28 rounded-lg border border-emerald-400/25 bg-emerald-500/[0.08]" />
      <span className="absolute right-8 top-6 flex h-20 w-28 items-end p-2 rounded-lg border border-emerald-400/30 bg-[#0a2a1f]/80 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
        <span className="flex flex-col gap-1.5">
          <span className="h-1 w-14 rounded-full bg-white/20" />
          <span className="h-1 w-10 rounded-full bg-white/15" />
        </span>
      </span>
      <span className="absolute left-0 top-8 flex size-14 items-center justify-center rounded-xl border border-lime/40 bg-[#0b2a1c] shadow-[0_0_24px_rgba(197,255,102,0.2)]">
        <BookOpen className="size-6 text-lime" />
      </span>
    </div>
  )
}
