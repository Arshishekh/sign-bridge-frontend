import {
  Cloud,
  Crosshair,
  Globe,
  HeartPulse,
  Languages,
  Lightbulb,
  Sparkle,
  Stethoscope,
  TrendingUp,
  Users,
  Video,
} from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'

type ScopeCard = {
  number: string
  icon: typeof Video
  title: string
  subtitle: string
  visual: ReactNode
  body: string
  tagIcon: typeof Video
  tag: string
}

const possibilities = [
  { icon: Languages, label: 'More ISL words and sentences' },
  { icon: Crosshair, label: 'Better recognition accuracy' },
  { icon: Cloud, label: 'Real-time communication across platforms' },
  { icon: Globe, label: 'Multi-language support (in the future)' },
]

const cards: ScopeCard[] = [
  {
    number: '01',
    icon: HeartPulse,
    title: 'Medical Uses',
    subtitle: 'Better care. No communication barriers.',
    visual: (
      <PhotoVisual src="/images/future-medical.png" alt="A patient signing to a doctor across a clinic desk">
        <p className="absolute left-1/2 top-[18%] max-w-[46%] rounded-xl border border-lime/40 bg-[#06150f]/80 px-3.5 py-2.5 text-sm leading-snug text-white/95 shadow-[0_0_24px_rgba(197,255,102,0.2)] backdrop-blur-md after:absolute after:-bottom-1.5 after:left-5 after:size-3 after:rotate-45 after:border-b after:border-r after:border-lime/40 after:bg-[#06150f]">
          I have a fever and body pain.
        </p>
      </PhotoVisual>
    ),
    body: 'SignBridge can be used in local clinics where a sign language interpreter may not be available. It helps patients with hearing or speech impairments communicate their symptoms directly to doctors through sign-to-text and text-to-speech conversion, reducing communication barriers when they visit a clinic alone.',
    tagIcon: Stethoscope,
    tag: 'Accessible Healthcare',
  },
  {
    number: '02',
    icon: Video,
    title: 'Integration with Video Calls',
    subtitle: 'Be heard. Be seen. Be part of the conversation.',
    visual: (
      <PhotoVisual src="/images/future-video-call.png" alt="A person signing on a video call with a doctor">
        <p className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-lime/40 bg-[#06150f]/85 px-3 py-1.5 text-sm text-white shadow-[0_0_20px_rgba(197,255,102,0.2)] backdrop-blur-md">
          <span className="size-1.5 animate-pulse rounded-full bg-lime" aria-hidden="true" />
          <span className="sr-only">Live caption: </span>I have a fever
        </p>
      </PhotoVisual>
    ),
    body: 'The system can be integrated into video-calling platforms to enable people with disabilities to participate more actively in online consultations, meetings, interviews, and educational sessions. This ensures equal access to communication, no matter where they are.',
    tagIcon: Users,
    tag: 'Inclusive Digital Communication',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'More Possibilities Ahead',
    subtitle: 'Smarter. Faster. More Inclusive.',
    visual: (
      <div className="flex gap-3 rounded-2xl bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.18),transparent_65%)] p-3">
        <div className="relative hidden w-2/5 shrink-0 sm:block lg:hidden xl:block">
          <Image
            src="/images/isl-hand-card.png"
            alt=""
            fill
            sizes="200px"
            className="object-contain mix-blend-screen"
          />
          <Sparkle className="absolute right-3 top-3 size-4 fill-lime/60 text-lime" aria-hidden="true" />
        </div>
        <ul className="flex flex-1 flex-col gap-2.5">
          {possibilities.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl border border-lime/20 bg-[#061d18]/50 px-3 py-2.5 text-xs leading-snug text-white/85"
            >
              <Icon className="size-5 shrink-0 text-lime" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    ),
    body: 'Further improvements could include support for more ISL words and sentences, better recognition accuracy, and real-time communication across different digital platforms. These developments could make SignBridge a more accessible and practical communication tool for everyday life.',
    tagIcon: Lightbulb,
    tag: 'A More Inclusive Future',
  },
]

function PhotoVisual({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/[0.06]">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
      {children}
    </div>
  )
}

export function FutureScopeCards() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {cards.map(({ number, icon: Icon, title, subtitle, visual, body, tagIcon: TagIcon, tag }) => (
        <li
          key={number}
          className="flex flex-col rounded-[24px] border border-lime/20 bg-gradient-to-b from-[#071a14]/80 to-[#040d0a]/80 p-5 shadow-[0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-xl transition-colors hover:border-lime/40"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-lime/25 bg-lime/[0.06] text-lg text-lime">
              {number}
            </span>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-lime/25 text-lime">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-medium leading-tight">{title}</h2>
              <p className="mt-1 text-xs text-white/60">{subtitle}</p>
            </div>
          </div>

          <div className="mt-5">{visual}</div>

          <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-white/75">{body}</p>

          <p className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4 text-sm text-lime">
            <span className="flex size-10 items-center justify-center rounded-full border border-lime/25">
              <TagIcon className="size-5" aria-hidden="true" />
            </span>
            {tag}
          </p>
        </li>
      ))}
    </ul>
  )
}
